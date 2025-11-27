package com.dino.back_end_for_TTECH.features.promotion.application;

import com.dino.back_end_for_TTECH.features.product.domain.repository.PriceRepository;
import com.dino.back_end_for_TTECH.features.product.domain.repository.ProductRepository;
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

    ProductRepository productRepo;
    PriceRepository priceRepo;

    void cancel(SaleUnit unit) {
    }
}
