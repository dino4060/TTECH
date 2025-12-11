package com.dino.back_end_for_TTECH.features.product.api;

import com.dino.back_end_for_TTECH.features.product.application.ProductService;
import com.dino.back_end_for_TTECH.features.product.application.mapper.ProductMapper;
import com.dino.back_end_for_TTECH.features.product.application.model.ProductHomeQuery;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/public/products")
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductController {

    ProductService productService;
    ProductMapper mapper;

    @GetMapping
    public ResponseEntity<?> list(
            @Valid @ModelAttribute ProductHomeQuery query
    ) {
        var data = this.productService.list(query);
        return ResponseEntity.ok(data);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(
            @PathVariable Long id
    ) {
        var model = this.productService.get(id);
        var data = this.mapper.toProductFullData(model);
        return ResponseEntity.ok(data);
    }
}
