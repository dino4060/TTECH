package com.dino.back_end_for_TTECH.features.product.application;

import com.dino.back_end_for_TTECH.features.product.application.model.PriceBody;
import com.dino.back_end_for_TTECH.features.product.domain.Price;
import com.dino.back_end_for_TTECH.features.product.domain.repository.PriceRepository;
import com.dino.back_end_for_TTECH.shared.application.utils.AppCalc;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@Slf4j
public class PriceService {

    private final PriceRepository priceRepository;

    public void create(PriceBody body, Price model) {
        model.setMainPrice(body.retailPrice());
        model.setSidePrice(-1);
        model.setDealPercent(0);

//        this.priceRepository.save(model);
    }

    @Transactional
    public void recalculate(PriceBody body, Price model) {
        var retailPrice = body.retailPrice();
        var discountPercent = model.getDealPercent();
        var nonSale = discountPercent == 0;

        if (nonSale) {
            model.setMainPrice(retailPrice);
            model.setSidePrice(-1);
            model.setDealPercent(0);
        } else {
            model.setMainPrice(AppCalc.partOfPercent(discountPercent, retailPrice));
            model.setSidePrice(retailPrice);
            model.setDealPercent(discountPercent);
        }

        this.priceRepository.save(model);
    }
}
