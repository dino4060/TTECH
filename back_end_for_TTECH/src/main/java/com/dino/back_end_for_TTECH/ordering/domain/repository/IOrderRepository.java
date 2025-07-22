package com.dino.back_end_for_TTECH.ordering.domain.repository;

import com.dino.back_end_for_TTECH.ordering.domain.Order;
import com.dino.back_end_for_TTECH.ordering.domain.model.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import java.util.List;

public interface IOrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByIdIn(@NonNull List<Long> ids);

    List<Order> findByStatus(@NonNull OrderStatus status);

    void deleteAllByIdInBatch(@NonNull Iterable<Long> ids);

    void deleteAllInBatch(@NonNull Iterable<Order> orders);
}