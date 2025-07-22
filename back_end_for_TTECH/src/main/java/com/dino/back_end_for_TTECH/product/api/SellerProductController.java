package com.dino.back_end_for_TTECH.product.api;

import com.dino.back_end_for_TTECH.product.application.model.ProductOfShopRes;
import com.dino.back_end_for_TTECH.product.application.service.IProductService;
import com.dino.back_end_for_TTECH.shared.api.annotation.AuthUser;
import com.dino.back_end_for_TTECH.shared.api.constant.Auth;
import com.dino.back_end_for_TTECH.shared.api.model.CurrentUser;
import com.dino.back_end_for_TTECH.shared.application.utils.Id;
import com.dino.back_end_for_TTECH.shared.application.utils.PageRes;
import com.dino.back_end_for_TTECH.shared.domain.exception.AppException;
import com.dino.back_end_for_TTECH.shared.domain.exception.ErrorCode;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SellerProductController {

    // SellerPrivateProductController //
    @RestController
    @RequestMapping("/api/v1/seller/products")
    @PreAuthorize(Auth.SELLER)
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
    public static class SellerPrivateProductController {

        IProductService productService;

        // QUERY //

        // listFullProducts //
        @GetMapping("/list")
        public ResponseEntity<PageRes<ProductOfShopRes>> listProducts(
                @PageableDefault(
                        size = 50, sort = "updatedAt", direction = Sort.Direction.DESC
                ) Pageable pageable,
                @AuthUser CurrentUser currentUser
        ) {
            return ResponseEntity.ok(this.productService.listProductsOfShop(pageable, currentUser));
        }

        // getProduct //
        @GetMapping("/{id}")
        public ResponseEntity<ProductOfShopRes> getProduct(
                @PathVariable String id,
                @AuthUser CurrentUser currentUser
        ) {
            Id productId = Id.from(id).orElseThrow(() -> new AppException(ErrorCode.SYSTEM__ID_INVALID));

            return ResponseEntity.ok(this.productService.getProductOfShop(productId.value(), currentUser));
        }
    }
}
