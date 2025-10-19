package com.dino.back_end_for_TTECH.promotion.application;

import com.dino.back_end_for_TTECH.promotion.application.mapper.CampaignMapper;
import com.dino.back_end_for_TTECH.promotion.application.model.*;
import com.dino.back_end_for_TTECH.promotion.domain.Campaign;
import com.dino.back_end_for_TTECH.promotion.domain.Sale;
import com.dino.back_end_for_TTECH.promotion.domain.Voucher;
import com.dino.back_end_for_TTECH.promotion.domain.repository.CampaignRepository;
import com.dino.back_end_for_TTECH.promotion.domain.repository.SaleRepository;
import com.dino.back_end_for_TTECH.promotion.domain.repository.VoucherRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CampaignService {

    CampaignRepository campaignRepository;
    CampaignMapper mapper;

    SaleRepository saleRepository;
    VoucherRepository voucherRepository;

    public PageData<Campaign> list(CampaignQuery query) {
        var result = this.campaignRepository.findAll(
                this.mapper.toQueryable(query),
                this.mapper.toPageable(query)
        );
        return this.mapper.toPageData(result, (Campaign campaign) -> campaign);
    }

    public Sale create(Sale body) {
        var model = this.saleRepository.save(body);
        return model;
    }

    public Voucher create(Voucher body) {
        var model = this.voucherRepository.save(body);
        return model;
    }
}
