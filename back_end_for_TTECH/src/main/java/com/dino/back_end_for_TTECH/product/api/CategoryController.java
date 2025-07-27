package com.dino.back_end_for_TTECH.product.api;

import com.dino.back_end_for_TTECH.product.application.model.CategoryInList;
import com.dino.back_end_for_TTECH.product.application.service.ICategoryService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CategoryController {

    // PublicCategoryController //
    @RestController
    @RequestMapping("/api/public/categories")
    @AllArgsConstructor
    public static class PublicCategoryController {

        private final ICategoryService categoryService;

        // READ //

        @GetMapping("/list")
        public ResponseEntity<List<CategoryInList>> listCategories() {
            return ResponseEntity.ok().body(this.categoryService.listCategories());
        }
    }
}
