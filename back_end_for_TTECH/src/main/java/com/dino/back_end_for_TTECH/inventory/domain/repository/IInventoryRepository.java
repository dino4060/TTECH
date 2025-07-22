package com.dino.back_end_for_TTECH.inventory.domain.repository;

import com.dino.back_end_for_TTECH.inventory.domain.Inventory; // Import the Inventory entity
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IInventoryRepository extends JpaRepository<Inventory, Long> {
    /**
     * Finds an Inventory entry by its associated SKU ID.
     * In a real system, you might want to consider the unique constraint on sku_id.
     */
    Optional<Inventory> findBySkuId(Long skuId);
}