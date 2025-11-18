package com.dino.back_end_for_TTECH.product.api;

import com.dino.back_end_for_TTECH.product.application.ProductService;
import com.dino.back_end_for_TTECH.product.application.model.ProductData;
import com.dino.back_end_for_TTECH.product.application.model.ProductToWrite;
import com.dino.back_end_for_TTECH.promotion.application.model.PageQuery;
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
    public ResponseEntity<ProductData> create(@RequestBody ProductToWrite body) {
        ProductData newProduct = this.productService.createProduct(body);
        return ResponseEntity.ok(newProduct);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductData> update(
            @PathVariable long id,
            @RequestBody ProductToWrite body
    ) {
        ProductData updatedProduct = this.productService.updateProduct(id, body);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id) {
        this.productService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }
}

