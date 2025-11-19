package com.dino.back_end_for_TTECH.features.product.api;

import com.dino.back_end_for_TTECH.features.product.application.ProductService;
import com.dino.back_end_for_TTECH.features.product.application.model.ProductBody;
import com.dino.back_end_for_TTECH.features.product.application.model.ProductData;
import com.dino.back_end_for_TTECH.shared.application.model.PageQuery;
import com.dino.back_end_for_TTECH.shared.api.constant.AuthConst;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/products")
@PreAuthorize(AuthConst.ADMIN)
@AllArgsConstructor
public class AdminProductController {

    private final ProductService productService;

    @GetMapping("/list")
    public ResponseEntity<?> list(
            @Valid @ModelAttribute PageQuery query
    ) {
        return ResponseEntity.ok(this.productService.list(query));
    }

    @PostMapping
    public ResponseEntity<ProductData> create(
            @RequestBody ProductBody body
    ) {
        ProductData newProduct = this.productService.create(body);
        return ResponseEntity.ok(newProduct);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductData> update(
            @PathVariable long id,
            @RequestBody ProductBody body
    ) {
        ProductData updatedProduct = this.productService.update(id, body);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id) {
        this.productService.delete(id);
        return ResponseEntity.ok().build();
    }
}

