package com.dino.back_end_for_TTECH.features.dashboard.application;

import com.dino.back_end_for_TTECH.features.dashboard.application.model.RevenueByDayData;
import com.dino.back_end_for_TTECH.features.dashboard.application.model.RevenueData;
import com.dino.back_end_for_TTECH.features.dashboard.application.model.SalesData;
import com.dino.back_end_for_TTECH.features.ordering.domain.Order;
import com.dino.back_end_for_TTECH.features.ordering.domain.model.OrderStatus;
import com.dino.back_end_for_TTECH.features.ordering.domain.repository.OrderRepository;
import com.dino.back_end_for_TTECH.features.profile.domain.model.Role;
import com.dino.back_end_for_TTECH.features.profile.domain.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.ZoneId;
import java.time.format.TextStyle;
import java.util.*;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class DashboardService {

    OrderRepository orderRepo;
    UserRepository userRepo;

    private static final List<String> DayList = Arrays.asList(
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday");

    private static final Set<String> CompletedOrderStatusSet = new HashSet<>(Arrays.asList(
            OrderStatus.COMPLETED.name(),
            OrderStatus.UNPAID.name(),
            OrderStatus.PENDING.name(),
            OrderStatus.CANCELED.name()
    ));

    public RevenueData calcRevenue() {
        RevenueData data = new RevenueData();

        try {
            ZoneId zoneId = ZoneId.systemDefault();
            YearMonth currentMonth = YearMonth.now(zoneId);

            Instant thisMonthStart = currentMonth.atDay(1)
                    .atStartOfDay(zoneId)
                    .toInstant();
            Instant thisMonthEnd = currentMonth.atEndOfMonth()
                    .atTime(23, 59, 59)
                    .atZone(zoneId)
                    .toInstant();

            YearMonth lastMonth = currentMonth.minusMonths(1);
            Instant lastMonthStart = lastMonth.atDay(1)
                    .atStartOfDay(zoneId)
                    .toInstant();
            Instant lastMonthEnd = lastMonth.atEndOfMonth()
                    .atTime(23, 59, 59)
                    .atZone(zoneId)
                    .toInstant();

            long thisMonthRevenue = orderRepo.findAll().stream()
                    .filter(order -> order.getOrderTime() != null)
                    .filter(order -> isInTimePeriod(order, thisMonthStart, thisMonthEnd))
                    .filter(order -> isCompletedOrder(order))
                    .mapToLong(order -> order.getTotal())
                    .sum();

            long lastMonthRevenue = orderRepo.findAll().stream()
                    .filter(order -> order.getOrderTime() != null)
                    .filter(order -> isInTimePeriod(order, lastMonthStart, lastMonthEnd))
                    .filter(order -> isCompletedOrder(order))
                    .mapToLong(order -> order.getTotal())
                    .sum();

            int percentDifference = calcPercentDifference(thisMonthRevenue, lastMonthRevenue);

            data.setThisMonthRevenue(thisMonthRevenue);
            data.setLastMonthRevenue(lastMonthRevenue);
            data.setPercentDifference(percentDifference);

        } catch (Exception e) {
            log.error(">>> Error calculating revenue", e);
        }

        return data;
    }

    public SalesData calcSales() {
        SalesData data = new SalesData();

        try {
            long totalUsers = userRepo.findAll().stream()
                    .filter(user -> user.getRoles() != null)
                    .filter(user -> user.getRoles().contains(Role.CUSTOMER))
                    .count(); // userRepo.count();

            long totalOrders = orderRepo.findAll().stream()
                    .filter(order -> order.getStatus() != null)
                    .filter(order -> isCompletedOrder(order))
                    .count(); // orderRepo.count();


            data.setUsers((int) totalUsers);
            data.setOrders((int) totalOrders);

        } catch (Exception e) {
            log.error(">>> Error calculating sales", e);
        }

        return data;
    }

    public RevenueByDayData calcRevenueByDay(Instant startDay, Instant endDay) {
        RevenueByDayData dayData = new RevenueByDayData();

        try {
            ZoneId zoneId = ZoneId.of("Asia/Ho_Chi_Minh");
            String dayName = startDay
                    .atZone(zoneId)
                    .getDayOfWeek()
                    .getDisplayName(TextStyle.FULL, Locale.ENGLISH);

            long dayRevenue = orderRepo
                    .calcRevenueByDay(startDay, endDay, CompletedOrderStatusSet);

            dayData.setId(dayName);
            dayData.setRevenue(dayRevenue);

        } catch (Exception e) {
            log.error("Error calculating revenue by day", e);
            dayData.setId("Unknown");
            dayData.setRevenue(0);
        }

        return dayData;
    }

    public List<RevenueByDayData> calcRevenueByWeek() {
        List<RevenueByDayData> weekData = new ArrayList<>();

        try {
            ZoneId zoneId = ZoneId.of("Asia/Ho_Chi_Minh");
            LocalDate today = LocalDate.now(zoneId);

            for (int i = 6; i >= 0; i--) {
                LocalDate targetDate = today.minusDays(i);

                Instant startOfDay = targetDate.atStartOfDay(zoneId).toInstant();
                Instant endOfDay = targetDate.atTime(23, 59, 59).atZone(zoneId).toInstant();

                RevenueByDayData dayData = this.calcRevenueByDay(startOfDay, endOfDay);
                weekData.add(dayData);
            }
        } catch (Exception e) {
            log.error("Error calculating revenue by this week", e);
        }

        return weekData;
    }

    private boolean isCompletedOrder(Order order) {
        if (order == null || order.getStatus() == null)
            return false;

        return CompletedOrderStatusSet.contains(order.getStatus());
    }

    private boolean isInTimePeriod(Order order, Instant from, Instant to) {
        if (order == null || order.getStatus() == null)
            return false;

        return !order.getOrderTime().isBefore(from)
                && !order.getOrderTime().isAfter(to);
    }

    private int calcPercentDifference(long thisMonth, long lastMonth) {
        if (lastMonth == 0) {
            return thisMonth > 0 ? 100 : 0;
        }

        double difference = ((double) (thisMonth - lastMonth) / lastMonth) * 100;
        return (int) Math.round(difference);
    }
}
