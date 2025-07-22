package com.dino.back_end_for_TTECH.ordering.application.model;

public record ConfirmCheckoutRes(Boolean isConfirmed, int count) {

    public static ConfirmCheckoutRes success(int count) {
        return new ConfirmCheckoutRes(true, count);
    }
}