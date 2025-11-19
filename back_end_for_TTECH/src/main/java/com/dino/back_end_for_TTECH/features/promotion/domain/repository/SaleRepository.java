package com.dino.back_end_for_TTECH.features.promotion.domain.repository;

import com.dino.back_end_for_TTECH.features.promotion.domain.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {

}
