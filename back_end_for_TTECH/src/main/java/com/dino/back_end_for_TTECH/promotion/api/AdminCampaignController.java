package com.dino.back_end_for_TTECH.promotion.api;

import com.dino.back_end_for_TTECH.promotion.application.CampaignService;
import com.dino.back_end_for_TTECH.promotion.application.model.CampaignQuery;
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
    public ResponseEntity<Object> list(@ModelAttribute CampaignQuery query) {
        var result = this.campaignService.list(query);
        return ResponseEntity.ok(result);
    }
}
