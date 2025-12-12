package com.dino.back_end_for_TTECH.features.dashboard.application.model;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SalesData {
    int users;
    int orders;
}
