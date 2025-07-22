package com.dino.back_end_for_TTECH.identity.application.model;

public record CurrentShopRes(
        String code,
        String name,
        String photo,
        String status,
        String contactEmail,
        String contactPhone,
        String businessType
) {
}
