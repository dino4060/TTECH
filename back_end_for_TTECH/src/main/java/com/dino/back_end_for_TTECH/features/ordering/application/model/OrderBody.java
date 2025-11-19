package com.dino.back_end_for_TTECH.features.ordering.application.model;

import lombok.Data;

@Data
public class OrderBody {
        int allPrice = 0;
        int allDiscount = 0;
        int total = 0;

        String note = "";
        String paymentType = "COD";
        String deliveryAddress;
        String customerName;
        String customerPhone;
}
