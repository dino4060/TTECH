package com.dino.back_end_for_TTECH.promotion.application.mapper;

import com.dino.back_end_for_TTECH.promotion.application.model.CampaignQuery;
import com.dino.back_end_for_TTECH.promotion.domain.Campaign;
import com.dino.back_end_for_TTECH.promotion.domain.repository.CampaignSpecification;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.jpa.domain.Specification;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CampaignMapper extends PageMapper {

    default Specification<Campaign> toQueryable(CampaignQuery query) {
        return CampaignSpecification.build(query);
    }
}
