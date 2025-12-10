package com.dino.back_end_for_TTECH.features.product.domain.repository;

import com.dino.back_end_for_TTECH.features.product.domain.Category;
import com.dino.back_end_for_TTECH.features.product.domain.Series;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.lang.NonNull;

import java.util.List;

public interface SeriesRepository extends JpaRepository<Series, Long>, JpaSpecificationExecutor<Series> {
    List<Series> findByName(@NonNull String name);

    List<Series> findByCategoryId(@NonNull Long categoryId);

    List<Series> findByCategory(@NonNull Category category);
}
