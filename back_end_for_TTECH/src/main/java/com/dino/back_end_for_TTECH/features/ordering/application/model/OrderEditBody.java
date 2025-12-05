package com.dino.back_end_for_TTECH.features.ordering.application.model;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class OrderEditBody {
    @NotNull(message = "Order ID is required")
    long id;

    // update after new banking
    String status;

    // update after new parcel
    String parcelCode;
}
