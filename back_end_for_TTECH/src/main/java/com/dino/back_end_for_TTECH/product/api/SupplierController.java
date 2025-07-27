package com.dino.back_end_for_TTECH.product.api;

import com.dino.back_end_for_TTECH.product.application.model.SupplierInList;
import com.dino.back_end_for_TTECH.product.application.service.ISupplierService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SupplierController {

    // PublicSupplierController //
    @RestController
    @RequestMapping("/api/public/suppliers")
    @AllArgsConstructor
    public static class PublicSupplierController {

        private final ISupplierService supplierService;

        // READ //

        @GetMapping("/list")
        public ResponseEntity<List<SupplierInList>> listSuppliers() {
            return ResponseEntity.ok().body(this.supplierService.listSuppliers());
        }
    }
}
