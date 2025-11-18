package com.dino.back_end_for_TTECH.product.api;

import com.dino.back_end_for_TTECH.product.application.ProductService;
import com.dino.back_end_for_TTECH.product.application.model.ProductInList;
import com.dino.back_end_for_TTECH.product.application.model.ProductToWrite;
import com.dino.back_end_for_TTECH.shared.api.constant.AuthConst;
import com.dino.back_end_for_TTECH.shared.application.utils.AppPage;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
public class AdminProductController {

    // AdminPrivateProductController //
    @RestController
    @RequestMapping("/api/admin/products")
    @PreAuthorize(AuthConst.ADMIN)
    @AllArgsConstructor
    public static class AdminPrivateProductController {

        private final ProductService productService;

        // QUERY //

        // listProducts //
        @GetMapping("/list")
        public ResponseEntity<AppPage<ProductInList>> listProducts(
                @PageableDefault(
                        size = 50, sort = "updatedAt", direction = Sort.Direction.DESC
                ) Pageable pageable
        ) {
            return ResponseEntity.ok(this.productService.listProducts(pageable));
        }

        // createProduct //
        @PostMapping
        public ResponseEntity<ProductInList> createProduct(@RequestBody ProductToWrite body) {
            ProductInList newProduct = this.productService.createProduct(body);
            return ResponseEntity.ok(newProduct);
        }

        // updateProduct //
        @PutMapping("/{id}")
        public ResponseEntity<ProductInList> updateProduct(
                @PathVariable long id,
                @RequestBody ProductToWrite body
        ) {
            ProductInList updatedProduct = this.productService.updateProduct(id, body);
            return ResponseEntity.ok(updatedProduct);
        }

        // deleteProduct //
        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteProduct(@PathVariable long id) {
            this.productService.deleteProduct(id);
            return ResponseEntity.ok().build();
        }
    }
}
