package com.dino.back_end_for_TTECH.inventory.application;

import com.dino.back_end_for_TTECH.inventory.application.model.InventoryToWrite;
import com.dino.back_end_for_TTECH.inventory.application.provider.IInventoryLockProvider;
import com.dino.back_end_for_TTECH.inventory.domain.Stock;
import com.dino.back_end_for_TTECH.inventory.domain.repository.IStockRepository;
import com.dino.back_end_for_TTECH.product.domain.Product;
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
public class StockService {

    IStockRepository inventoryRepository;

    IInventoryLockProvider lockProvider;

    /**
     * checkStock
     */
    @Transactional(readOnly = true)
    public Stock checkStock(Long productId, int quantity) {
        Stock stock = inventoryRepository.findByProductId(productId)
                .orElseThrow(() -> new AppException(ErrorCode.INVENTORY__NOT_FOUND));

        if (stock.getAvailable() < quantity)
            throw new AppException(ErrorCode.INVENTORY__INSUFFICIENT_STOCK);

        return stock;
    }

    /**
     * reserveStockNormally
     */
    @Transactional
    private void reserveStockNormally(Long productId, int quantity) {
        Stock stock = this.checkStock(productId, quantity);

        stock.update(quantity);
        this.inventoryRepository.save(stock);
    }

    /**
     * reserveStockWithLock
     */
    @Transactional
    private void reserveStockWithLock(Long productId, int quantity) {
        this.lockProvider.reserveStockWithLock(
                productId, () -> this.reserveStockNormally(productId, quantity));
    }

    /**
     * reserveStock
     */
    @Transactional
    public void reserve(Long productId, int quantity) {
        this.reserveStockWithLock(productId, quantity);
    }

    /**
     * restock inventory
     */
    @Transactional
    public void restock(Stock stock, InventoryToWrite body) {
        if (body.restocks() == 0) return;
        stock.restock(body.restocks());

        this.inventoryRepository.save(stock);
    }

    /**
     * cascade inventory (import inventory)
     */
    public void create(Product product) {
        Stock stock = product.getStock();
        stock.setProduct(product);

        stock.imports(stock.getAvailable());
    }
}