package com.dino.back_end_for_TTECH.inventory.application.provider;

public interface IInventoryLockProvider {

    void reserveStockWithLock(Long skuId, Runnable doReserveStock);
}
