package com.dino.back_end_for_TTECH.inventory.domain.repository;

import com.dino.back_end_for_TTECH.inventory.domain.Stock; // Import the Inventory entity
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IStockRepository extends JpaRepository<Stock, Long> {
    /**
     * Finds an Inventory entry by its associated product ID.
     * In a real system, you might want to consider the unique constraint on product_id.
     */
    Optional<Stock> findByProductId(Long productId);
}