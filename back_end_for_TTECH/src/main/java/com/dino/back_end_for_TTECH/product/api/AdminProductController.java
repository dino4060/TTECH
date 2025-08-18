package com.dino.back_end_for_TTECH.product.api;

import com.dino.back_end_for_TTECH.product.application.model.ProductInList;
import com.dino.back_end_for_TTECH.product.application.service.IProductService;
import com.dino.back_end_for_TTECH.shared.api.constant.AuthConst;
import com.dino.back_end_for_TTECH.shared.application.utils.AppPage;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdminProductController {

    // AdminPrivateProductController //
    @RestController
    @RequestMapping("/api/admin/products")
    @PreAuthorize(AuthConst.ADMIN)
    @AllArgsConstructor
    public static class AdminPrivateProductController {

        private final IProductService productService;

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
    }
}
