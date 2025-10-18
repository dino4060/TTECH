package com.dino.back_end_for_TTECH.promotion.api;

import com.dino.back_end_for_TTECH.ordering.application.model.OrderData;
import com.dino.back_end_for_TTECH.promotion.application.CampaignService;
import com.dino.back_end_for_TTECH.promotion.application.PageQuery;
import com.dino.back_end_for_TTECH.promotion.application.model.CampaignQuery;
import com.dino.back_end_for_TTECH.shared.application.utils.AppPage;
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
    public ResponseEntity<AppPage<OrderData>> list(
            @ModelAttribute PageQuery page,
            @ModelAttribute CampaignQuery query
    ) {
        var result = this.campaignService.list(page, query);
        return ResponseEntity.ok(null);
    }
}
