package com.dino.back_end_for_TTECH.profile.api;

import com.dino.back_end_for_TTECH.profile.application.service.IAddressService;
import com.dino.back_end_for_TTECH.profile.domain.Address;
import com.dino.back_end_for_TTECH.shared.api.annotation.AuthUser;
import com.dino.back_end_for_TTECH.shared.api.model.CurrentUser;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BuyerAddressController {

    // PublicBuyerAddressController //

    // PrivateBuyerAddressController //
    @RestController
    @RequestMapping("/api/v1/addresses")
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
    public static class PrivateBuyerAddressController {

        IAddressService addressAppService;

        // QUERY //

        // getDefault //
        @GetMapping("/default")
        public ResponseEntity<Address> getDefault(@AuthUser CurrentUser currentUser) {

            return ResponseEntity.ok(this.addressAppService.getDefault(currentUser));
        }
    }
}
