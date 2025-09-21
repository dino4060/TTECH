package com.dino.back_end_for_TTECH.shared.test.cache;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class TestCacheRepo {

    @Cacheable(value = "result", key = "'single'") // dùng "#id" nếu object có id
    public String getResult() {
        log.info(">>> get result without cache");
        return "Result here.";
    }

    @CachePut(value = "result", key = "'single'")
    public String updateResult() {
        return "Result there.";
    }

    @CacheEvict(value = "result", key = "'single'")
    public Void deleteResult() {
        return null;
    }

//    1. @Caching – Gộp nhiều cache action cùng lúc
//    @Caching(
//            cacheable = @Cacheable(value = "product", key = "#id"),
//            put = @CachePut(value = "productByName", key = "#result.keywords"),
//            evict = @CacheEvict(value = "productList", allEntries = true)
//    )

//    2. @CacheEvict(allEntries = true) – Xóa toàn bộ cache
//    @CacheEvict(value = "product", allEntries = true)
//    public void resetProductCache() {
//        // clear all cache entries under "product"
//    }

//    3. @CacheConfig – Đặt cache keywords mặc định cho class
//    @CacheConfig(cacheNames = "result")
//    @Service
//    public class ResultService {
//
//        @Cacheable(key = "'single'")
//        public String get() { ... }
//
//        @CachePut(key = "'single'")
//        public String update() { ... }
//    }

//    4. Conditional cache (condition, unless)
//        - condition	Trước khi gọi method	Chỉ cache nếu điều kiện là true
//        - unless	Sau khi gọi method	    Không cache nếu điều kiện là true
//    @Cacheable(
//            value = "user",
//            key = "#id",
//            condition = "#id > 100",      // Bạn chỉ muốn cache nếu ID lớn hơn 100
//            unless = "#result == null"    // Và bạn không muốn cache nếu kết quả là null
//    )
//    public User getUserById(Long id) {
//        log.info(">>> Fetching user from DB for id={}", id);
//        return userRepository.findById(id).orElse(null);
//    }
}
