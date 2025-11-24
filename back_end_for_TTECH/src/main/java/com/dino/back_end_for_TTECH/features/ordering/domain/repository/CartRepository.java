package com.dino.back_end_for_TTECH.features.ordering.domain.repository;

import com.dino.back_end_for_TTECH.features.ordering.domain.Cart;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {

    @EntityGraph(attributePaths = {"lines", "lines.product"})
    Optional<Cart> findWithProductByBuyerId(@NonNull Long buyerId);

    @Query("SELECT c FROM Cart c WHERE c.buyer.id = :buyerId AND c.isDeleted = true")
    Optional<Cart> findIsDeletedByBuyerId(@Param("buyerId") Long buyerId);
}