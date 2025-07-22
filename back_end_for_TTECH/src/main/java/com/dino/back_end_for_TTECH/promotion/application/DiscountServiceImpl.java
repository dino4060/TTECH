package com.dino.back_end_for_TTECH.promotion.application;

import com.dino.back_end_for_TTECH.promotion.domain.ProductDiscount;
import com.dino.back_end_for_TTECH.product.domain.Product;
import com.dino.back_end_for_TTECH.product.domain.Sku;
import com.dino.back_end_for_TTECH.promotion.application.service.IDiscountService;
import com.dino.back_end_for_TTECH.promotion.domain.repository.IProductDiscountRepository;
import com.dino.back_end_for_TTECH.shared.api.model.CurrentUser;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class DiscountServiceImpl implements IDiscountService {

    IProductDiscountRepository discountRepository;

    // QUERY //

    // canApply by discounts //
    private Optional<ProductDiscount> canApply(List<ProductDiscount> discounts, @Nullable CurrentUser currentUser) {
        var discountsCanApply = discounts.stream()
                .filter(d -> d.canApply(currentUser))
                .toList();

        if (discountsCanApply.isEmpty())
            return Optional.empty();

        if (discountsCanApply.size() == 1)
            return Optional.of(discountsCanApply.getFirst());

        return discountsCanApply.stream()
                .min(Comparator.comparingInt(d -> d.getProductDiscountProgram().getPriority()));
    }

    // canApply to product //
    @Override
    public Optional<ProductDiscount> canDiscount(Product product, CurrentUser currentUser) {
        var discounts = this.discountRepository.findByProductId(product.getId());

        return this.canApply(discounts, currentUser);
    }

    // canApply to Sku //
    @Override
    public Optional<ProductDiscount> canDiscount(Sku sku, CurrentUser currentUser) {
        return this.canDiscount(sku.getProduct(), currentUser);
    }
}
