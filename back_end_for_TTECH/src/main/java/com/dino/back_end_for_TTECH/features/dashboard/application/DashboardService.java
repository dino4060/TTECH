package com.dino.back_end_for_TTECH.features.dashboard.application;

import com.dino.back_end_for_TTECH.features.dashboard.application.model.OverviewData;
import com.dino.back_end_for_TTECH.features.ordering.domain.Order;
import com.dino.back_end_for_TTECH.features.ordering.domain.model.Status;
import com.dino.back_end_for_TTECH.features.ordering.domain.repository.OrderRepository;
import com.dino.back_end_for_TTECH.features.product.domain.repository.ProductRepository;
import com.dino.back_end_for_TTECH.features.profile.domain.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.YearMonth;
import java.time.ZoneId;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class DashboardService {

    OrderRepository orderRepo;
    ProductRepository productRepo;
    UserRepository userRepo;

    public OverviewData overview() {
        OverviewData data = new OverviewData();

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
                    .filter(order -> isCompletedStatus(order))
                    .mapToLong(order -> order.getTotal())
                    .sum();

            long lastMonthRevenue = orderRepo.findAll().stream()
                    .filter(order -> order.getOrderTime() != null)
                    .filter(order -> isInTimePeriod(order, lastMonthStart, lastMonthEnd))
                    .filter(order -> isCompletedStatus(order))
                    .mapToLong(order -> order.getTotal())
                    .sum();

            int percentDifference = calcPercentDifference(thisMonthRevenue, lastMonthRevenue);

            data.setThisMonthRevenue(thisMonthRevenue);
            data.setLastMonthRevenue(lastMonthRevenue);
            data.setPercentDifference(percentDifference);

        } catch (Exception e) {
            log.error("Error calculating dashboard overview", e);
        }

        return data;
    }

    private boolean isCompletedStatus(Order order) {
        if (order == null || order.getStatus() == null)
            return false;

        return !order.hasStatus(Status.CANCELED);
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
