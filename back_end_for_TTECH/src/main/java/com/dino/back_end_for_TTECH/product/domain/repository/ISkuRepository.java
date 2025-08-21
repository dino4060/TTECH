package com.dino.back_end_for_TTECH.product.domain.repository;

import com.dino.back_end_for_TTECH.product.domain.Sku;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import java.util.List;
import java.util.Optional;

public interface ISkuRepository extends JpaRepository<Sku, Long> {
}
