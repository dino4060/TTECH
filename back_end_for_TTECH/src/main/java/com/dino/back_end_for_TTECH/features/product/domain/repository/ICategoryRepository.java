package com.dino.back_end_for_TTECH.features.product.domain.repository;

import com.dino.back_end_for_TTECH.features.product.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface ICategoryRepository extends JpaRepository<Category, Long>, JpaSpecificationExecutor<Category> {
    List<Category> findByName(String name);
}
