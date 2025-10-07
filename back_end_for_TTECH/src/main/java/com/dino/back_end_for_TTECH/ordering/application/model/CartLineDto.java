package com.dino.back_end_for_TTECH.ordering.application.model;

public record CartLineDto(
        Long skuId,

        int quantity
) {
}