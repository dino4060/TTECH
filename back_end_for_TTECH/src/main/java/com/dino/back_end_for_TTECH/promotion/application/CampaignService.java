package com.dino.back_end_for_TTECH.promotion.application;

import com.dino.back_end_for_TTECH.promotion.application.mapper.CampaignMapper;
import com.dino.back_end_for_TTECH.promotion.application.model.CampaignData;
import com.dino.back_end_for_TTECH.promotion.application.model.CampaignQuery;
import com.dino.back_end_for_TTECH.promotion.application.model.PageData;
import com.dino.back_end_for_TTECH.promotion.domain.Campaign;
import com.dino.back_end_for_TTECH.promotion.domain.repository.CampaignRepository;
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

    public PageData<Campaign> list(CampaignQuery query) {
        var result = this.campaignRepository.findAll(
                this.mapper.toQueryable(query),
                this.mapper.toPageable(query)
        );
        return this.mapper.toPageData(result, (Campaign campaign) -> campaign);
    }
}
