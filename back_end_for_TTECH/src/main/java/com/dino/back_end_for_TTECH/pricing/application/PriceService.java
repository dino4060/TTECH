package com.dino.back_end_for_TTECH.pricing.application;

import com.dino.back_end_for_TTECH.pricing.application.model.PriceToWrite;
import com.dino.back_end_for_TTECH.pricing.domain.Price;
import com.dino.back_end_for_TTECH.pricing.domain.repository.IPriceRepository;
import com.dino.back_end_for_TTECH.product.domain.Product;
import com.dino.back_end_for_TTECH.promotion.domain.Sale;
import com.dino.back_end_for_TTECH.shared.application.utils.AppUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class PriceService {

    private final IPriceRepository priceRepository;

    // DOMAIN //

    // METHODS //

    public void create(Product product) {
        var price = product.getPrice();
        price.setProduct(product);

        price.create();
    }

    /*
     * re-calculate main allPrice := retail allPrice || retail allPrice * allDiscount percent
     * re-calculate side allPrice := 0 || retail allPrice
     * re-calculate max allPrice
     */
    public void recalculate(Price price, PriceToWrite body) {
        var retailPrice = body.retailPrice();
        var discountPercent = price.getDealPercent();
        var nonSale = AppUtils.isZero(discountPercent);

        int mainPrice = nonSale ? retailPrice : retailPrice * discountPercent;
        int sidePrice = nonSale ? 0 : retailPrice;

        price.setMainPrice(mainPrice);
        price.setSidePrice(sidePrice);

        price.update();
        this.priceRepository.save(price);
    }

    public void sale(Sale sale) {

    }
}
