package com.dino.back_end_for_TTECH.inventory.application;

import com.dino.back_end_for_TTECH.inventory.application.provider.IInventoryLockProvider;
import com.dino.back_end_for_TTECH.inventory.application.service.IInventoryService;
import com.dino.back_end_for_TTECH.inventory.domain.Inventory;
import com.dino.back_end_for_TTECH.inventory.domain.repository.IInventoryRepository;
import com.dino.back_end_for_TTECH.shared.domain.exception.AppException;
import com.dino.back_end_for_TTECH.shared.domain.exception.ErrorCode;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class InventoryServiceImpl implements IInventoryService {

    IInventoryRepository inventoryRepository;

    IInventoryLockProvider lockProvider;

    /**
     * checkStock
     */
    @Override
    @Transactional(readOnly = true)
    public Inventory checkStock(Long skuId, int quantity) {
        Inventory inventory = inventoryRepository.findBySkuId(skuId)
                .orElseThrow(() -> new AppException(ErrorCode.INVENTORY__NOT_FOUND));

        if (inventory.getStocks() < quantity)
            throw new AppException(ErrorCode.INVENTORY__INSUFFICIENT_STOCK);

        return inventory;
    }

    /**
     * reserveStockNormally
     */
    @Transactional
    private void reserveStockNormally(Long skuId, int quantity) {
        Inventory inventory = this.checkStock(skuId, quantity);

        inventory.reverseStock(quantity);
        this.inventoryRepository.save(inventory);
    }

    /**
     * reserveStockWithLock
     */
    @Transactional
    private void reserveStockWithLock(Long skuId, int quantity) {
        this.lockProvider.reserveStockWithLock(
                skuId, () -> this.reserveStockNormally(skuId, quantity));
    }

    /**
     * reserveStock
     */
    @Override
    @Transactional
    public void reserveStock(Long skuId, int quantity) {
        this.reserveStockWithLock(skuId, quantity);
    }
}