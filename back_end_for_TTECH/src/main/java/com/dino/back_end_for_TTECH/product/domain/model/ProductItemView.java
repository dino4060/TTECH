package com.dino.back_end_for_TTECH.product.domain.model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductItemView {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    Long id;
    String status;
    Instant updatedAt;
    String name;
    String thumb;
    ProductMeta meta;
    ProductPriceView price;
    Float rank;

    /**
     * Constructor được sử dụng bởi @ConstructorResult trong @SqlResultSetMapping.
     */
    public ProductItemView(
            Long productId,
            String status, Instant updatedAt, String name, String thumb, String metaJson,
            Long priceId,
            int mainPrice, Integer sidePrice, int discountPercent,
            Integer maxMainPrice, Integer maxSidePrice, Integer maxDiscountPercent,
            Float rank
    ) {
        this.id = productId;
        this.status = status;
        this.updatedAt = updatedAt;
        this.name = name;
        this.thumb = thumb;
        this.meta = mapMeta(metaJson);
        this.price = mapPrice(
                priceId,
                mainPrice, sidePrice, discountPercent,
                maxMainPrice, maxSidePrice, maxDiscountPercent);
        this.rank = rank;
    }

    private ProductMeta mapMeta(String metaJson) {
        try {
            return (metaJson == null) ? null : objectMapper.readValue(metaJson, ProductMeta.class);
        } catch (JsonProcessingException e) {
            return null;
        }
    }

    private ProductPriceView mapPrice(
            Long priceId,
            int mainPrice, Integer sidePrice, int discountPercent,
            Integer maxMainPrice, Integer maxSidePrice, Integer maxDiscountPercent
    ) {
        return new ProductPriceView(
                priceId,
                mainPrice, sidePrice, discountPercent,
                maxMainPrice, maxSidePrice, maxDiscountPercent);
    }
}
