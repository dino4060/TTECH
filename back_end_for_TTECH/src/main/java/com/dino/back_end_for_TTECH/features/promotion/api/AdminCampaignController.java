package com.dino.back_end_for_TTECH.features.promotion.api;

import com.dino.back_end_for_TTECH.features.promotion.application.CampaignService;
import com.dino.back_end_for_TTECH.features.promotion.application.CampaignServiceTemp;
import com.dino.back_end_for_TTECH.features.promotion.application.model.CampaignBody;
import com.dino.back_end_for_TTECH.features.promotion.application.model.CampaignQuery;
import com.dino.back_end_for_TTECH.features.promotion.application.model.SaleBody;
import com.dino.back_end_for_TTECH.features.promotion.domain.Sale;
import com.dino.back_end_for_TTECH.features.promotion.domain.Voucher;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/campaigns")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AdminCampaignController {

    CampaignService campaignService;

    @GetMapping
    public ResponseEntity<Object> list(
            @Valid @ModelAttribute CampaignQuery query
    ) {
        var data = this.campaignService.list(query);
        return ResponseEntity.ok(data);
    }

    @PostMapping("/sales")
    public ResponseEntity<Object> create(
            @Valid @RequestBody SaleBody body
    ) {
        this.campaignService.create(body);
        return ResponseEntity.ok(Map.of());
    }

    @PutMapping("/sales/{id}")
    public ResponseEntity<Object> update(
            @PathVariable long id,
            @Valid @RequestBody SaleBody body
    ) {
        this.campaignService.update(id, body);
        return ResponseEntity.ok(Map.of());
    }
}
