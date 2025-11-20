package com.dino.back_end_for_TTECH.features.product.application.provider;

public interface StockLockProvider {

    void reserveStockWithLock(Long productId, Runnable doReserveStock);
}
