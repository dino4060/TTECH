package com.dino.back_end_for_TTECH.product.api;

import com.dino.back_end_for_TTECH.product.application.CategoryService;
import com.dino.back_end_for_TTECH.product.application.model.CategoryData;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/public/categories")
@AllArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    // READ //

    @GetMapping("/list")
    public ResponseEntity<List<CategoryData>> listCategories() {
        return ResponseEntity.ok().body(this.categoryService.listCategories());
    }
}
