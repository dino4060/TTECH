package com.dino.back_end_for_TTECH.product.api;

import com.dino.back_end_for_TTECH.product.application.model.ProductSearchParams;
import com.dino.back_end_for_TTECH.product.application.reader.IProductReader;
import com.dino.back_end_for_TTECH.shared.application.utils.Id;
import com.dino.back_end_for_TTECH.shared.domain.exception.AppException;
import com.dino.back_end_for_TTECH.shared.domain.exception.ErrorCode;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.dino.back_end_for_TTECH.product.application.service.IProductService;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
public class BuyerProductController {

    // BuyerPublicProductController //
    @RestController
    @RequestMapping("/api/v1/public/products")
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
    public static class BuyerPublicProductController {

        IProductService productService;
        IProductReader productReader;

        // QUERY //

        // listProducts //
        @GetMapping("/list")
        public ResponseEntity<Object> listProducts(
                @PageableDefault(sort = "updatedAt", direction = Sort.Direction.DESC) Pageable pageable) {
            return ResponseEntity.ok(this.productService.listProducts(pageable));
        }

        // searchProducts //
        @GetMapping("/search")
        public ResponseEntity<Object> searchProducts(
                @ModelAttribute ProductSearchParams params) {
            return ResponseEntity.ok(this.productReader.searchProducts(params));
        }

        // getProduct //
        @GetMapping("/{id}")
        public ResponseEntity<Object> getProduct(@PathVariable String id) {
            Id idObject = Id.from(id).orElseThrow(() -> new AppException(ErrorCode.SYSTEM__ID_INVALID));

            return ResponseEntity.ok(this.productService.getProduct(idObject));
        }
    }
}
