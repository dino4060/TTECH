package com.dino.back_end_for_TTECH.features.ordering.domain.repository;

import com.dino.back_end_for_TTECH.features.ordering.domain.Order;
import com.dino.back_end_for_TTECH.features.ordering.domain.model.Status;
import com.dino.back_end_for_TTECH.features.profile.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.lang.NonNull;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long>, JpaSpecificationExecutor<Order> {

    List<Order> findByIdIn(@NonNull List<Long> ids);

    List<Order> findByStatus(@NonNull Status status);

    void deleteAllByIdInBatch(@NonNull Iterable<Long> ids);

    void deleteAllInBatch(@NonNull Iterable<Order> orders);

    Page<Order> findAllByBuyer(User buyer, Pageable pageable);
}