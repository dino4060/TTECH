package com.dino.back_end_for_TTECH.inventory.application.service;

import com.dino.back_end_for_TTECH.inventory.domain.Inventory;

public interface IInventoryService {

    Inventory checkStock(Long skuId, int quantity);

    void reserveStock(Long skuId, int quantity);
}
