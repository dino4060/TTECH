package com.dino.back_end_for_TTECH.promotion.api;

import com.dino.back_end_for_TTECH.promotion.application.CampaignService;
import com.dino.back_end_for_TTECH.promotion.application.model.CampaignQuery;
import com.dino.back_end_for_TTECH.promotion.application.model.SaleBody;
import com.dino.back_end_for_TTECH.promotion.application.model.VoucherCampaignBody;
import com.dino.back_end_for_TTECH.promotion.domain.Sale;
import com.dino.back_end_for_TTECH.promotion.domain.Voucher;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/campaigns")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AdminCampaignController {

    CampaignService campaignService;

    @GetMapping
    public ResponseEntity<Object> list(@Valid @ModelAttribute CampaignQuery query) {
        var data = this.campaignService.list(query);
        return ResponseEntity.ok(data);
    }

    @PostMapping("/sales")
    public ResponseEntity<Object> create(@Valid @RequestBody Sale body) {
        this.campaignService.create(body);
        return ResponseEntity.ok(null);
    }

    @PostMapping("/vouchers")
    public ResponseEntity<Object> create(@Valid @RequestBody Voucher body) {
        var data = this.campaignService.create(body);
        return ResponseEntity.ok(data);
    }
}
