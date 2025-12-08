package com.dino.back_end_for_TTECH.features.ordering.application.model;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.util.List;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderData {
    int id;

    int allPrice;
    int allDiscount;
    int shippingFee;
    int total;

    String note;
    String paymentType;

    String toUserName;
    String toPhone;
    Integer toProvinceId;
    Integer toWardId;
    String toStreet;

    String fromUserName;
    String fromPhone;
    Integer fromProvinceId;
    Integer fromWardId;
    String fromStreet;

    String status;
    Instant orderTime;
    String parcelCode;

    List<OrderLineData> lines;
}
