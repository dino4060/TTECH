package com.dino.back_end_for_TTECH.ordering.domain.model;

import com.dino.back_end_for_TTECH.shared.domain.exception.AppException;
import com.dino.back_end_for_TTECH.shared.domain.exception.ErrorCode;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ShippingDetail {
    String carrier;
    Instant minEstimatedDelivery;
    Instant maxEstimatedDelivery;

    // SETTERS //

    public void setMinEstimatedDelivery(Instant minEstimatedDelivery) {
        if (minEstimatedDelivery == null || !minEstimatedDelivery.isAfter(Instant.now()))
            throw new AppException(ErrorCode.ORDER__MIN_ESTIMATE_DAY_INVALID);

        if (this.maxEstimatedDelivery != null && !this.maxEstimatedDelivery.isAfter(minEstimatedDelivery))
            throw new AppException(ErrorCode.ORDER__MIN_ESTIMATE_DAY_INVALID);

        this.minEstimatedDelivery = minEstimatedDelivery;
    }

    public void setMaxEstimatedDelivery(Instant maxEstimatedDelivery) {
        if (maxEstimatedDelivery == null || !maxEstimatedDelivery.isAfter(Instant.now()))
            throw new AppException(ErrorCode.ORDER__MAX_ESTIMATE_DAY_INVALID);

        if (this.minEstimatedDelivery != null && !maxEstimatedDelivery.isAfter(this.minEstimatedDelivery))
            throw new AppException(ErrorCode.ORDER__MAX_ESTIMATE_DAY_INVALID);

        this.maxEstimatedDelivery = maxEstimatedDelivery;
    }

    // FACTORY METHOD //

    /**
     * createShippingDetail.
     */
    public static ShippingDetail createShippingDetail(
            String carrier, Instant minEstimatedDelivery, Instant maxEstimatedDelivery
    ) {
        ShippingDetail shippingDetail = new ShippingDetail();
        shippingDetail.setCarrier(carrier);
        shippingDetail.setMinEstimatedDelivery(minEstimatedDelivery);
        shippingDetail.setMaxEstimatedDelivery(maxEstimatedDelivery);
        return shippingDetail;
    }
}
