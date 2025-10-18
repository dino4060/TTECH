package com.dino.back_end_for_TTECH.promotion.application;

import com.dino.back_end_for_TTECH.promotion.application.model.CampaignData;
import com.dino.back_end_for_TTECH.promotion.application.model.CampaignQuery;
import com.dino.back_end_for_TTECH.promotion.domain.repository.CampaignRepository;
import com.dino.back_end_for_TTECH.shared.application.utils.AppPage;
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

    public AppPage<CampaignData> list(PageQuery page, CampaignQuery query) {
        var result = this.campaignRepository.findAll(query.toQueryable(), page.toPageable());
        return AppPage.from(result, null);
    }
}
