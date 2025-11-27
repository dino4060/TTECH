package com.dino.back_end_for_TTECH.features.promotion.api;

import com.dino.back_end_for_TTECH.features.promotion.application.CampaignService;
import com.dino.back_end_for_TTECH.features.promotion.application.model.CampaignQuery;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/campaigns")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AdminCampaignController {

    CampaignService campaignService;

    @GetMapping
    public ResponseEntity<?> list(
            @Valid @ModelAttribute CampaignQuery query
    ) {
        var data = this.campaignService.list(query);
        return ResponseEntity.ok(data);
    }
}
