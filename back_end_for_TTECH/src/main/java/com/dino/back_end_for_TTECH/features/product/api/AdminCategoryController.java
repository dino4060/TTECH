package com.dino.back_end_for_TTECH.features.product.api;

import com.dino.back_end_for_TTECH.features.product.application.CategoryService;
import com.dino.back_end_for_TTECH.features.product.application.model.CategoryBody;
import com.dino.back_end_for_TTECH.features.product.application.model.CategoryData;
import com.dino.back_end_for_TTECH.shared.api.constant.HasRole;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/categories")
@PreAuthorize(HasRole.ADMIN)
@AllArgsConstructor
public class AdminCategoryController {

    private final CategoryService categoryService;

    // READ //

    @GetMapping("/list")
    public ResponseEntity<List<CategoryData>> list() {
        return ResponseEntity.ok().body(this.categoryService.list());
    }

    // WRITE //

    @PostMapping
    public ResponseEntity<CategoryData> create(
            @RequestBody CategoryBody body
    ) {
        return ResponseEntity.ok().body(this.categoryService.createCategory(body));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryData> update(
            @PathVariable long id,
            @RequestBody CategoryBody body
    ) {
        return ResponseEntity.ok().body(this.categoryService.updateCategory(id, body));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable long id
    ) {
        this.categoryService.deleteCategory(id);
        return ResponseEntity.ok().build();
    }
}
