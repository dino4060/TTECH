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

    private final SeriesService service;

    @GetMapping("/list")
    public ResponseEntity<List<SeriesData>> list() {
        return ResponseEntity.ok().body(this.service.list());
    }

    @PostMapping
    public ResponseEntity<SeriesData> create(
            @RequestBody SeriesBody body
    ) {
        return ResponseEntity.ok().body(this.service.add(body));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SeriesData> update(
            @PathVariable long id,
            @RequestBody SeriesBody body
    ) {
        return ResponseEntity.ok().body(this.service.edit(id, body));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable long id
    ) {
        this.service.remove(id);
        return ResponseEntity.ok().build();
    }

}
