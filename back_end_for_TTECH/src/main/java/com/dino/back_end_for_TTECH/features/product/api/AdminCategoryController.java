package com.dino.back_end_for_TTECH.features.product.api;

import com.dino.back_end_for_TTECH.features.product.application.CategoryService;
import com.dino.back_end_for_TTECH.features.product.application.model.CategoryBody;
import com.dino.back_end_for_TTECH.features.product.application.model.CategoryData;
import com.dino.back_end_for_TTECH.shared.api.constant.AuthConst;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/categories")
@PreAuthorize(AuthConst.ADMIN)
@AllArgsConstructor
public class AdminCategoryController {

    private final CategoryService categoryService;

    // READ //

    @GetMapping("/list")
    public ResponseEntity<List<CategoryData>> listCategories() {
        return ResponseEntity.ok().body(this.categoryService.listCategories());
    }

    // WRITE //

    @PostMapping
    public ResponseEntity<CategoryData> createCategory(
            @RequestBody CategoryBody body
    ) {
        return ResponseEntity.ok().body(this.categoryService.createCategory(body));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryData> updateCategory(
            @PathVariable long id,
            @RequestBody CategoryBody body
    ) {
        return ResponseEntity.ok().body(this.categoryService.updateCategory(id, body));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(
            @PathVariable long id
    ) {
        this.categoryService.deleteCategory(id);
        return ResponseEntity.ok().build();
    }
}
