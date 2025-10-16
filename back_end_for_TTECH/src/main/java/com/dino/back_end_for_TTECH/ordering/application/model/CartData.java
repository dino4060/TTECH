package com.dino.back_end_for_TTECH.ordering.application.model;

import java.util.List;

public record CartData(
        Long id,
        int total,
        List<CartLineData> cartLines
) {
}