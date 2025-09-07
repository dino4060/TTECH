package com.dino.back_end_for_TTECH.pricing.application;

import com.dino.back_end_for_TTECH.pricing.application.model.PriceToWrite;
import com.dino.back_end_for_TTECH.pricing.application.model.SkuPriceToWrite;
import com.dino.back_end_for_TTECH.pricing.application.service.IPriceService;
import com.dino.back_end_for_TTECH.pricing.domain.Price;
import com.dino.back_end_for_TTECH.pricing.domain.SkuPrice;
import com.dino.back_end_for_TTECH.pricing.domain.repository.IPriceRepository;
import com.dino.back_end_for_TTECH.product.domain.Product;
import com.dino.back_end_for_TTECH.shared.application.utils.AppUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class PriceServiceImpl implements IPriceService {

    private final IPriceRepository priceRepository;

    // DOMAIN //

    private void skuPriceService_createList(Price price) {
        int i = 0;
        var skus = price.getProduct().getSkus();
        for (var skuPrice : price.getSkuPrices()) {
            skuPrice.setPrice(price);
            skuPrice.setSku(skus.get(i));

            skuPrice.create();
            i++;
        }
    }

    private void skuPriceService_recalculateList(List<SkuPrice> skuPrices, List<SkuPriceToWrite> bodies) {
        int i = 0;
        for (var skuPrice : skuPrices) {
            var retailPrice = bodies.get(i).retailPrice();
            var discountPercent = skuPrice.getDiscountPercent();
            var nonSale = AppUtils.isZero(discountPercent);

            int skuMainPrice = nonSale ? retailPrice : retailPrice * discountPercent;
            int skuSidePrice = nonSale ? 0 : retailPrice;

            skuPrice.setMainPrice(skuMainPrice);
            skuPrice.setSidePrice(skuSidePrice);

            skuPrice.update();
            i++;
        }
    }

    // METHODS //

    @Override
    public void create(Product product) {
        var price = product.getPrice();
        price.setProduct(product);

        this.skuPriceService_createList(price);

        price.create();
    }

    /*
     * re-calculate main price := retail price || retail price * discount percent
     * re-calculate side price := 0 || retail price
     * re-calculate max price
     */
    @Override
    public void recalculate(Price price, PriceToWrite body) {
        var retailPrice = body.retailPrice();
        var discountPercent = price.getDiscountPercent();
        var nonSale = AppUtils.isZero(discountPercent);

        int mainPrice = nonSale ? retailPrice : retailPrice * discountPercent;
        int sidePrice = nonSale ? 0 : retailPrice;

        price.setMainPrice(mainPrice);
        price.setSidePrice(sidePrice);
        price.setMaxMainPrice(mainPrice);
        price.setMaxSidePrice(sidePrice);

        this.skuPriceService_recalculateList(price.getSkuPrices(), body.skuPrices());

        price.update();
        this.priceRepository.save(price);
    }
}
