package com.dino.back_end_for_TTECH.features.product.application;

import com.dino.back_end_for_TTECH.features.product.application.mapper.IStockMapper;
import com.dino.back_end_for_TTECH.features.product.application.model.ProductBody;
import com.dino.back_end_for_TTECH.features.product.application.model.StockBody;
import com.dino.back_end_for_TTECH.features.product.application.provider.IInventoryLockProvider;
import com.dino.back_end_for_TTECH.features.product.domain.Stock;
import com.dino.back_end_for_TTECH.features.product.domain.repository.IStockRepository;
import com.dino.back_end_for_TTECH.features.product.domain.Product;
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

    IStockMapper mapper;

    @Transactional(readOnly = true)
    public Stock checkStock(Long productId, int quantity) {
        Stock stock = inventoryRepository.findByProductId(productId)
                .orElseThrow(() -> new AppException(ErrorCode.INVENTORY__NOT_FOUND));

        if (stock.getAvailable() < quantity)
            throw new AppException(ErrorCode.INVENTORY__INSUFFICIENT_STOCK);

        return stock;
    }

    @Transactional
    private void reserveStockNormally(Long productId, int quantity) {
        Stock stock = this.checkStock(productId, quantity);

        stock.update(quantity);
        this.inventoryRepository.save(stock);
    }

    @Transactional
    private void reserveStockWithLock(Long productId, int quantity) {
        this.lockProvider.reserveStockWithLock(
                productId, () -> this.reserveStockNormally(productId, quantity));
    }

    @Transactional
    public void reserve(Long productId, int quantity) {
        this.reserveStockWithLock(productId, quantity);
    }

    @Transactional
    public void restock(StockBody body, Stock stock) {
        var quantity = body.restock();
        if (quantity == 0) return;

        stock.setTotal(stock.getTotal() + quantity);
        stock.setAvailable(stock.getAvailable() + quantity);

        this.inventoryRepository.save(stock);
    }

    public void linkCreate(Product product) {
        product.getStock().setProduct(product);
        product.getStock().init();
    }

    public void linkUpdate(ProductBody source, Product destination) {
        this.restock(this.mapper.toStockBody(source), destination.getStock());
    }
}