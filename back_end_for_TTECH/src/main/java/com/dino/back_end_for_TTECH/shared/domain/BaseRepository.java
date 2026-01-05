package com.dino.back_end_for_TTECH.shared.domain;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.lang.NonNull;

import com.dino.back_end_for_TTECH.shared.application.exception.NotFoundE;

import feign.Param;

@NoRepositoryBean
public interface BaseRepository<T, ID> extends JpaRepository<T, ID>, JpaSpecificationExecutor<T> {

  @Query("SELECT new Product(p.id) FROM Product p WHERE p.id = :id")
  Optional<T> findIdById(@Param("id") ID id);

  default String customModelName() {
    return "Model";
  }

  default T getIdById(@NonNull ID id) {
    return this
        .findIdById(id)
        .orElseThrow(() -> new NotFoundE(this.customModelName() + " not found with ID: " + id));
  }

  default T getById(@NonNull ID id) {
    return this
        .findById(id)
        .orElseThrow(() -> new NotFoundE(this.customModelName() + " not found with ID: " + id));
  }
}
