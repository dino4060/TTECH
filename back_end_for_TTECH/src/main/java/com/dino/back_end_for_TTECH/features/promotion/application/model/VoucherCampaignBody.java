package com.dino.back_end_for_TTECH.promotion.application.model;

import com.dino.back_end_for_TTECH.promotion.domain.Campaign;
import com.dino.back_end_for_TTECH.promotion.domain.Voucher;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class VoucherCampaignBody {
    private Campaign campaign;
    private Voucher voucher;
}
