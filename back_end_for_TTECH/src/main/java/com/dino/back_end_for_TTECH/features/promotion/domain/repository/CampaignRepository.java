package com.dino.back_end_for_TTECH.promotion.domain.repository;

import com.dino.back_end_for_TTECH.promotion.domain.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface CampaignRepository extends
        JpaRepository<Campaign, Long>,
        JpaSpecificationExecutor<Campaign> {

}
