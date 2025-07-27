package com.dino.back_end_for_TTECH.product.api;

import com.dino.back_end_for_TTECH.product.application.model.SupplierInList;
import com.dino.back_end_for_TTECH.product.application.model.SupplierToWrite;
import com.dino.back_end_for_TTECH.product.application.service.ISupplierService;
import com.dino.back_end_for_TTECH.shared.api.constant.AuthConst;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AdminSupplierController {

    // PrivateAdminSupplierController //
    @RestController
    @RequestMapping("/api/admin/suppliers")
    @PreAuthorize(AuthConst.ADMIN)
    @AllArgsConstructor
    public static class PrivateAdminSupplierController {

        private final ISupplierService supplierService;

        // READ //

        @GetMapping("/list")
        public ResponseEntity<List<SupplierInList>> listSuppliers() {
            return ResponseEntity.ok().body(this.supplierService.listSuppliers());
        }

        // WRITE //

        @PostMapping
        public ResponseEntity<SupplierInList> createSupplier(
                @RequestBody SupplierToWrite body
        ) {
            return ResponseEntity.ok().body(this.supplierService.createSupplier(body));
        }

        @PutMapping("/{id}")
        public ResponseEntity<SupplierInList> updateSupplier(
                @PathVariable long id,
                @RequestBody SupplierToWrite body
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
}
