package com.dino.back_end_for_TTECH.features.product.application;

import com.dino.back_end_for_TTECH.features.product.application.mapper.PriceMapper;
import com.dino.back_end_for_TTECH.features.product.application.model.PriceBody;
import com.dino.back_end_for_TTECH.features.product.application.model.ProductBody;
import com.dino.back_end_for_TTECH.features.product.domain.Price;
import com.dino.back_end_for_TTECH.features.product.domain.Product;
import com.dino.back_end_for_TTECH.features.product.domain.repository.PriceRepository;
import com.dino.back_end_for_TTECH.shared.application.utils.AppCalc;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class PriceService {

    private final PriceRepository priceRepository;

    private final PriceMapper mapper;

    // METHODS //

    public void recalculate(PriceBody body, Price price) {
        var retailPrice = body.retailPrice();
        var discountPercent = price.getDealPercent();
        var nonSale = discountPercent == 0;

        if (nonSale) {
            price.setMainPrice(retailPrice);
            price.setSidePrice(0);
        } else {
            price.setMainPrice(AppCalc.percentOfValue(discountPercent, retailPrice));
            price.setSidePrice(retailPrice);
        }

        this.priceRepository.save(price);
    }

    public void linkCreate(Product product) {
        product.getPrice().setProduct(product);
        product.getPrice().init();
    }

    public void linkUpdate(ProductBody source, Product destination) {
        this.recalculate(this.mapper.toPriceBody(source), destination.getPrice());
    }
}
