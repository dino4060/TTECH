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
@RequestMapping("/api/public/categories")
@AllArgsConstructor
public class PublicCategoryController {

    private final ICategoryService categoryService;

    // READ //

    @GetMapping("/list")
    public ResponseEntity<Object> listCategories() {
        return ResponseEntity.ok().body(this.categoryService.listCategories());
    }
}
