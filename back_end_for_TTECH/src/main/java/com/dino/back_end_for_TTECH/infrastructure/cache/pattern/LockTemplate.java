package com.dino.back_end_for_TTECH.infrastructure.cache.pattern;

import com.dino.back_end_for_TTECH.shared.domain.exception.AppException;
import com.dino.back_end_for_TTECH.shared.domain.exception.ErrorCode;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public abstract class LockTemplate {

    LockFacade lockFacade;

    protected abstract void doTask();

    @Transactional
    public void doTaskWithLock(String key) {
        // 1. tryLock
        boolean lockAcquired = this.lockFacade.tryLock(key);

        if (!lockAcquired)
            throw new AppException(ErrorCode.LOCK__OUT_OF_TRY);
        // 2. doTask
        try {
            this.doTask();
        } catch (Exception e) {
            throw new AppException(ErrorCode.LOCK__REQUEST_FAILED);
        }
        // 3. releaseLock
        finally {
            this.lockFacade.releaseLock(key);
        }
    }
}
