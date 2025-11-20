package com.dino.back_end_for_TTECH.features.product.api;

import com.dino.back_end_for_TTECH.features.product.application.SeriesService;
import com.dino.back_end_for_TTECH.features.product.application.model.SeriesData;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/public/series")
@AllArgsConstructor
public class SeriesController {

    private final SeriesService supplierService;

    // READ //

    @GetMapping("/list")
    public ResponseEntity<List<SeriesData>> list() {
        return ResponseEntity.ok().body(this.supplierService.list());
    }

}
