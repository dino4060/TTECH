package com.dino.back_end_for_TTECH.product.api;

import com.dino.back_end_for_TTECH.product.application.ProductServiceImpl;
import com.dino.back_end_for_TTECH.product.application.model.ProductQuery;
import com.dino.back_end_for_TTECH.product.application.model.ProductToSell;
import com.dino.back_end_for_TTECH.shared.application.utils.AppPage;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {

    // PublicProductController //
    @RestController
    @RequestMapping("/api/public/products")
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
    public static class PublicProductController {

        ProductServiceImpl productService;

        // QUERY //

        // list //
        @GetMapping
        public ResponseEntity<AppPage<ProductToSell>> list(
                @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable,
                @ModelAttribute ProductQuery query
        ) {
            return ResponseEntity.ok(this.productService.list(query, pageable));
        }

//        // searchProducts //
//        @GetMapping("/search")
//        public ResponseEntity<Object> searchProducts(
//                @ModelAttribute ProductSearchParams params) {
//            return ResponseEntity.ok(this.productReader.searchProducts(params));
//        }
//
//        // getProduct //
//        @GetMapping("/{id}")
//        public ResponseEntity<Object> getProduct(@PathVariable String id) {
//            Id idObject = Id.from(id).orElseThrow(() -> new AppException(ErrorCode.SYSTEM__ID_INVALID));
//
//            return ResponseEntity.ok(this.productService.getProduct(idObject));
//        }
    }
}
