package com.dino.back_end_for_TTECH.inventory.application.service;

import com.dino.back_end_for_TTECH.inventory.application.model.InventoryToWrite;
import com.dino.back_end_for_TTECH.inventory.domain.Inventory;
import com.dino.back_end_for_TTECH.product.domain.Sku;
import org.springframework.transaction.annotation.Transactional;

public interface IInventoryService {

    Inventory checkStock(Long skuId, int quantity);

    void reserveStock(Long skuId, int quantity);

    void restock(Inventory inventory, InventoryToWrite body);

    void imports(Long skuId, int quantity);

    void createInventoryForSku(Sku sku);
}
