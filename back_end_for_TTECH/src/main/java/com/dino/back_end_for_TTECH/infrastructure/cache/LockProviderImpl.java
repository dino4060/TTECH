package com.dino.back_end_for_TTECH.infrastructure.cache;

import com.dino.back_end_for_TTECH.inventory.application.provider.IInventoryLockProvider;
import com.dino.back_end_for_TTECH.infrastructure.cache.pattern.LockFacade;
import com.dino.back_end_for_TTECH.infrastructure.cache.pattern.LockTemplate;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class LockProviderImpl implements IInventoryLockProvider {

    LockFacade lockFacade;

    @Override
    @Transactional
    public void reserveStockWithLock(Long productId, Runnable doReserveStock) {
        var key = "inventory:product:" + productId;

        var locker = new LockTemplate(this.lockFacade) {
            @Override
            protected void doTask() {
                doReserveStock.run();
            }
        };

        locker.doTaskWithLock(key);
    }
}
