package com.dino.back_end_for_TTECH.features.product.application;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dino.back_end_for_TTECH.features.product.application.model.StockBody;
import com.dino.back_end_for_TTECH.features.product.application.provider.StockLockProvider;
import com.dino.back_end_for_TTECH.features.product.domain.Stock;
import com.dino.back_end_for_TTECH.features.product.domain.repository.StockRepository;
import com.dino.back_end_for_TTECH.shared.domain.exception.AppException;
import com.dino.back_end_for_TTECH.shared.domain.exception.ErrorCode;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class StockService {

    StockRepository stockRepository;

    StockLockProvider lockProvider;

    public void create(StockBody body, Stock model) {
        model.setTotal(body.restock());
        model.setAvailable(body.restock());
        model.setSold(0);

        // this.stockRepository.save(model);
    }

    @Transactional
    public void restock(StockBody body, Stock model) {
        var restock = body.restock();
        if (restock == 0)
            return;

        model.setTotal(model.getTotal() + restock);
        model.setAvailable(model.getAvailable() + restock);

        this.stockRepository.save(model);
    }

    @Transactional(readOnly = true)
    public Stock checkStock(Long productId, int quantity) {
        Stock stock = stockRepository.findByProductId(productId)
                .orElseThrow(() -> new AppException(ErrorCode.INVENTORY__NOT_FOUND));

        if (stock.getAvailable() < quantity)
            throw new AppException(ErrorCode.INVENTORY__INSUFFICIENT_STOCK);

        return stock;
    }

    @Transactional
    private void reserveStockNormally(Long productId, int quantity) {
        Stock stock = this.checkStock(productId, quantity);

        stock.update(quantity);
        this.stockRepository.save(stock);
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
}