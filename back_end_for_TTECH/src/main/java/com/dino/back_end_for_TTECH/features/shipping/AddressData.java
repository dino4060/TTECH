package com.dino.back_end_for_TTECH.features.shipping;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@NoArgsConstructor
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AddressData {
    Integer provinceId;
    Integer wardId;
    String street;
}
