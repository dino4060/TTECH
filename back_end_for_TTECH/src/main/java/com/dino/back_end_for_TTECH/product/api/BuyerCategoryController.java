package com.dino.back_end_for_TTECH.product.api;

import com.dino.back_end_for_TTECH.product.application.service.ICategoryService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BuyerCategoryController {

    // BuyerPublicCategoryController //
    @RestController
    @RequestMapping("/api/v1/public/categories")
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
    public static class BuyerPublicCategoryController {

        ICategoryService categoryService;

        // READ //
        @GetMapping("/tree")
        public ResponseEntity<Object> getTree() {
            return ResponseEntity.ok().body(this.categoryService.getTree());
        }
    }
}
