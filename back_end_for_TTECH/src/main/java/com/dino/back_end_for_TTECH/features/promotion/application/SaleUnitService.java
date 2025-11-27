package com.dino.back_end_for_TTECH.features.promotion.application;

import com.dino.back_end_for_TTECH.features.product.application.ProductService;
import com.dino.back_end_for_TTECH.features.product.domain.repository.PriceRepository;
import com.dino.back_end_for_TTECH.features.promotion.domain.SaleUnit;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class SaleUnitService {

    ProductService productService;
    PriceRepository priceRepo;

    void apply(SaleUnit unit) {
        // turn off the current sale unit
        unit.getProduct().getSaleUnits().forEach(u -> {
            unit.setLive(u.equals(unit));
        });
        // apply the new sale unit
        var price = unit.getProduct().getPrice();
        price.setSidePrice(price.getRetailPrice());
        price.setMainPrice(unit.getDealPrice());
        price.setDealPercent(unit.getDealPercent());
    }

    void cancel(SaleUnit unit) {
    }
}
