package com.dino.back_end_for_TTECH.pricing.domain.repository;

import com.dino.back_end_for_TTECH.pricing.domain.Price;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPriceRepository extends JpaRepository<Price, Long> {
}
