package com.dino.back_end_for_TTECH.features.promotion.application.model;

import com.dino.back_end_for_TTECH.features.promotion.domain.Campaign;
import com.dino.back_end_for_TTECH.features.promotion.domain.Voucher;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VoucherCampaignData {
    private Campaign campaign;
    private Voucher voucher;
}
