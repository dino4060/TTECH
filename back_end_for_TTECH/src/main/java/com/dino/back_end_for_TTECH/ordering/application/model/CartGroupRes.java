package com.dino.back_end_for_TTECH.ordering.application.model;

import com.dino.back_end_for_TTECH.profile.application.model.ShopLeanRes;

import java.util.List;

public record CartGroupRes(
        Long id,
        ShopLeanRes shop,
        List<CartItemRes> cartItems
) {
}
