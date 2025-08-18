package com.dino.back_end_for_TTECH.pricing.application;

import com.dino.back_end_for_TTECH.pricing.application.service.IPriceService;
import com.dino.back_end_for_TTECH.pricing.domain.Price;
import com.dino.back_end_for_TTECH.product.domain.Product;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class PriceServiceImpl implements IPriceService {

    // DOMAIN //

    @Override
    public void createPriceForProduct(Product product) {
        Price price = new Price();
        product.setPrice(price);

        price.setProduct(product);
        price.create();
    }
}
