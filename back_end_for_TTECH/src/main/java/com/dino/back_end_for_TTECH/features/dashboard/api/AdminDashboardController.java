package com.dino.back_end_for_TTECH.features.dashboard.api;

import com.dino.back_end_for_TTECH.features.dashboard.application.DashboardService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/dashboard")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AdminDashboardController {

    DashboardService dashboardService;

    @GetMapping("/revenue")
    public ResponseEntity<?> revenue() {
        var data = this.dashboardService.calcRevenue();
        return ResponseEntity.ok(data);
    }

    @GetMapping("/sales")
    public ResponseEntity<?> sales() {
        var data = this.dashboardService.calcSales();
        return ResponseEntity.ok(data);
    }

    @GetMapping("/revenue/weeks")
    public ResponseEntity<?> calcRevenueByWeek() {
        var data = this.dashboardService.calcRevenueByWeek();
        return ResponseEntity.ok(data);
    }
}
