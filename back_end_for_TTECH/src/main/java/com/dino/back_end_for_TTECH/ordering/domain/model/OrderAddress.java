package com.dino.back_end_for_TTECH.ordering.domain.model;

import com.dino.back_end_for_TTECH.profile.domain.Address;
import lombok.*;
import lombok.experimental.FieldDefaults;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderAddress {

    String contactName;

    String contactPhone;

    String province;

    String district;

    String commune;

    String street;

    // FACTORY //

    public static OrderAddress createOrderAddress(Address address) {
        return new OrderAddress(
                address.getContactName(),
                address.getContactPhone(),
                address.getProvince(),
                address.getDistrict(),
                address.getCommune(),
                address.getStreet()
        );
    }
}
