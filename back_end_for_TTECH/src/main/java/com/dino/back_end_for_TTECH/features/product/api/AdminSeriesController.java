package com.dino.back_end_for_TTECH.features.product.api;

import com.dino.back_end_for_TTECH.features.product.application.SeriesService;
import com.dino.back_end_for_TTECH.features.product.application.model.SeriesBody;
import com.dino.back_end_for_TTECH.features.product.application.model.SeriesData;
import com.dino.back_end_for_TTECH.shared.api.constant.HasRole;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/series")
@PreAuthorize(HasRole.ADMIN)
@AllArgsConstructor
public class AdminSeriesController {

    private final SeriesService supplierService;

    // READ //

    @GetMapping("/list")
    public ResponseEntity<List<SeriesData>> list() {
        return ResponseEntity.ok().body(this.supplierService.list());
    }

    // WRITE //

    @PostMapping
    public ResponseEntity<SeriesData> create(
            @RequestBody SeriesBody body
    ) {
        return ResponseEntity.ok().body(this.supplierService.createSupplier(body));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SeriesData> update(
            @PathVariable long id,
            @RequestBody SeriesBody body
    ) {
        return ResponseEntity.ok().body(this.supplierService.updateSupplier(id, body));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable long id
    ) {
        this.supplierService.deleteSupplier(id);
        return ResponseEntity.ok().build();
    }

}
