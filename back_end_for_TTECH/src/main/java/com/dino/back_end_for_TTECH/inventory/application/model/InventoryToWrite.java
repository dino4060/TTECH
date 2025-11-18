package com.dino.back_end_for_TTECH.inventory.application.model;

import com.dino.back_end_for_TTECH.shared.application.utils.AppId;

public record InventoryToWrite(
        AppId product,
        int available,
        int restocks
) {
}
