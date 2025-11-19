package com.dino.back_end_for_TTECH.features.product.api;

import com.dino.back_end_for_TTECH.features.product.application.SupplierService;
import com.dino.back_end_for_TTECH.features.product.application.model.SupplierBody;
import com.dino.back_end_for_TTECH.features.product.application.model.SupplierData;
import com.dino.back_end_for_TTECH.shared.api.constant.AuthConst;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/suppliers")
@PreAuthorize(AuthConst.ADMIN)
@AllArgsConstructor
public class AdminSupplierController {

    private final SupplierService supplierService;

    // READ //

    @GetMapping("/list")
    public ResponseEntity<List<SupplierData>> listSuppliers() {
        return ResponseEntity.ok().body(this.supplierService.listSuppliers());
    }

    // WRITE //

    @PostMapping
    public ResponseEntity<SupplierData> createSupplier(
            @RequestBody SupplierBody body
    ) {
        return ResponseEntity.ok().body(this.supplierService.createSupplier(body));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SupplierData> updateSupplier(
            @PathVariable long id,
            @RequestBody SupplierBody body
    ) {
        return ResponseEntity.ok().body(this.supplierService.updateSupplier(id, body));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSupplier(
            @PathVariable long id
    ) {
        this.supplierService.deleteSupplier(id);
        return ResponseEntity.ok().build();
    }

}
