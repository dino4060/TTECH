package com.dino.back_end_for_TTECH.infrastructure.cache.pattern;

import com.dino.back_end_for_TTECH.shared.domain.exception.AppException;
import com.dino.back_end_for_TTECH.shared.domain.exception.ErrorCode;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Collections;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class LockFacade {

    RedisTemplate<String, String> redisTemplate;

    public String getLock(String key) {
        return this.redisTemplate.opsForValue().get(key);
    }

    private Boolean createLock(String key) {
        var value = "success";
        var ttl = Duration.ofSeconds(10);

        return redisTemplate.opsForValue().setIfAbsent(key, value, ttl);
    }

    private void sleep(Duration timeout) {
        try {
            Thread.sleep(timeout);
        } catch (InterruptedException e) {
            throw new AppException(ErrorCode.LOCK__SLEEP_FAILED);
        }
    }

    public boolean tryLock(String key) {
        var retryTimes = Collections.nCopies(10, 1);
        var sleepTime = Duration.ofMillis(50);

        for (@SuppressWarnings("unused") var ignore : retryTimes) {
            Boolean lockAcquired = this.createLock(key);

            if (Boolean.TRUE.equals(lockAcquired)) {
                log.info("Lock acquired: {} : {}", key, this.getLock(key));
                return true;
            }
            this.sleep(sleepTime);
        }
        return false;
    }

    public void releaseLock(String key) {
        this.redisTemplate.delete(key);
        log.info("Lock released: {} : {}", key, this.getLock(key));
    }
}
