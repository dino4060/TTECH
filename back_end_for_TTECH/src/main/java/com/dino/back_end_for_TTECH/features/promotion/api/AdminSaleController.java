package com.dino.back_end_for_TTECH.features.promotion.api;

import com.dino.back_end_for_TTECH.features.promotion.application.SaleService;
import com.dino.back_end_for_TTECH.features.promotion.application.model.SaleBody;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/campaigns")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AdminSaleController {

    SaleService saleService;

    @GetMapping("/sales/{id}")
    public ResponseEntity<?> get(
            @PathVariable long id
    ) {
        var data = this.saleService.get(id);
        return ResponseEntity.ok(data);
    }


    @PostMapping("/sales")
    public ResponseEntity<?> create(
            @Valid @RequestBody SaleBody body
    ) {
        this.saleService.create(body);
        return ResponseEntity.ok(Map.of());
    }

    @PutMapping("/sales/{id}")
    public ResponseEntity<?> update(
            @PathVariable long id,
            @Valid @RequestBody SaleBody body
    ) {
        this.saleService.update(id, body);
        return ResponseEntity.ok(Map.of());
    }

    @DeleteMapping("/sales/{id}")
    public ResponseEntity<?> remove(
            @PathVariable long id
    ) {
        this.saleService.remove(id);
        return ResponseEntity.ok(Map.of());
    }
}
