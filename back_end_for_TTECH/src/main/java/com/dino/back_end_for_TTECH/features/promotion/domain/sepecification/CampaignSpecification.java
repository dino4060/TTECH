package com.dino.back_end_for_TTECH.features.promotion.domain.sepecification;

import com.dino.back_end_for_TTECH.features.promotion.application.model.CampaignQuery;
import com.dino.back_end_for_TTECH.features.promotion.domain.Campaign;
import org.springframework.data.jpa.domain.Specification;

public class CampaignSpecification {

    public static Specification<Campaign> build(CampaignQuery query) {
        return Specification.where(null);
    }
}
