package com.dino.back_end_for_TTECH.pricing.application;

import com.dino.back_end_for_TTECH.pricing.application.model.PriceToWrite;
import com.dino.back_end_for_TTECH.pricing.application.service.IPriceService;
import com.dino.back_end_for_TTECH.pricing.domain.Price;
import com.dino.back_end_for_TTECH.pricing.domain.repository.IPriceRepository;
import com.dino.back_end_for_TTECH.product.domain.Product;
import com.dino.back_end_for_TTECH.shared.application.utils.AppUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class PriceServiceImpl implements IPriceService {

    private final IPriceRepository priceRepository;

    // DOMAIN //

    @Override
    public void createPriceForProduct(Product product) {
        Price price = new Price();
        product.setPrice(price);

        price.setProduct(product);
        price.create();
    }

    // METHODS //

    @Override
    public void recalculate(Price price, PriceToWrite priceBody) {
        /*
         * re-calculate main price := retail price || retail price * discount percent
         * re-calculate side price := 0 || retail price
         * re-calculate max price
         */
        var retailPrice = priceBody.retailPrice();
        var discountPercent = price.getDiscountPercent();
        var skuPrice = price.getSkuPrices().getFirst();
        var skuRetailPrice = priceBody.skuPrices().getFirst().retailPrice();
        var nonSale = AppUtils.isZero(discountPercent);

        int mainPrice = nonSale ? retailPrice : retailPrice * discountPercent;
        int sidePrice = nonSale ? 0 : retailPrice;
        int skuMainPrice = nonSale ? skuRetailPrice : skuRetailPrice * discountPercent;
        int skuSidePrice = nonSale ? 0 : skuRetailPrice;

        price.setMainPrice(mainPrice);
        price.setSidePrice(sidePrice);
        price.setMaxMainPrice(mainPrice);
        price.setMaxSidePrice(sidePrice);
        skuPrice.setMainPrice(skuMainPrice);
        skuPrice.setSidePrice(skuSidePrice);

        this.priceRepository.save(price);
    }
}
