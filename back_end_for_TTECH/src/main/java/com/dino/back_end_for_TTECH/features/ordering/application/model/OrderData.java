package com.dino.back_end_for_TTECH.features.ordering.application.model;

import lombok.Data;

import java.time.Instant;
import java.util.List;

@Data
public class OrderData {
    int id;

    int allPrice;
    int allDiscount;
    int shippingFee;
    int total;

    String note;
    String paymentType;
    String deliveryAddress;
    String customerName;
    String customerPhone;

    Instant orderTime;

    String status;

    List<OrderLineData> lines;
}
