package com.dino.back_end_for_TTECH.features.product.api;

import com.dino.back_end_for_TTECH.features.product.application.ProductService;
import com.dino.back_end_for_TTECH.features.product.application.model.ProductQuery;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/products")
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductController {

    ProductService productService;

    // READ //

    @GetMapping
    public ResponseEntity<?> list(
            @ModelAttribute ProductQuery query
    ) {
        return ResponseEntity.ok(this.productService.list(query));
    }

}
