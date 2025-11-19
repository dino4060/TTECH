package com.dino.back_end_for_TTECH.product.api;

import com.dino.back_end_for_TTECH.product.application.SupplierService;
import com.dino.back_end_for_TTECH.product.application.model.SupplierData;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/public/suppliers")
@AllArgsConstructor
public class SupplierController {

    private final SupplierService supplierService;

    // READ //

    @GetMapping("/list")
    public ResponseEntity<List<SupplierData>> listSuppliers() {
        return ResponseEntity.ok().body(this.supplierService.listSuppliers());
    }

}
