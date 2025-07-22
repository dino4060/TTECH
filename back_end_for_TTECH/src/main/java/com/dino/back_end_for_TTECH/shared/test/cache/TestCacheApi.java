package com.dino.back_end_for_TTECH.shared.test.cache;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/public/test/cache")
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TestCacheApi {

    TestCacheRepo testCacheRepo;

    @GetMapping("/get")
    public ResponseEntity<Object> getResult() {
        return ResponseEntity.ok(this.testCacheRepo.getResult());
    }

    @PutMapping("/update")
    public ResponseEntity<Object> updateResult() {
        return ResponseEntity.ok(this.testCacheRepo.updateResult());
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Object> deleteResult() {
        return ResponseEntity.ok(this.testCacheRepo.deleteResult());
    }
}
