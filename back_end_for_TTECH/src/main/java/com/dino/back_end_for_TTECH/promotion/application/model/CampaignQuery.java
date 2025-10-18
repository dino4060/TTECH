package com.dino.back_end_for_TTECH.promotion.application.model;

import com.dino.back_end_for_TTECH.promotion.domain.Campaign;
import com.dino.back_end_for_TTECH.promotion.domain.repository.CampaignSpecification;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;

public class CampaignQuery {

    public Specification<Campaign> toQueryable() {
        return CampaignSpecification.build(this);
    }
}
