package com.dino.back_end_for_TTECH.product.api;

import com.dino.back_end_for_TTECH.product.application.model.CategoryInList;
import com.dino.back_end_for_TTECH.product.application.model.CategoryToWrite;
import com.dino.back_end_for_TTECH.product.application.service.ICategoryService;
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
public class PrivateAdminCategoryController {

    private final ICategoryService categoryService;

    // READ //

    @GetMapping("/list")
    public ResponseEntity<List<CategoryInList>> listCategories() {
        return ResponseEntity.ok().body(this.categoryService.listCategories());
    }

    // WRITE //

    @PostMapping
    public ResponseEntity<CategoryInList> createCategory(
            @RequestBody CategoryToWrite body
    ) {
        return ResponseEntity.ok().body(this.categoryService.createCategory(body));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryInList> updateCategory(
            @PathVariable long id,
            @RequestBody CategoryToWrite body) {
        return ResponseEntity.ok().body(this.categoryService.updateCategory(id, body));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable long id) {
        this.categoryService.deleteCategory(id);
        return ResponseEntity.ok().build();
    }
}
