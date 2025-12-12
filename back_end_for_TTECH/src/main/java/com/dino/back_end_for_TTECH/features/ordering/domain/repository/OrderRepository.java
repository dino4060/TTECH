package com.dino.back_end_for_TTECH.features.ordering.domain.repository;

import com.dino.back_end_for_TTECH.features.ordering.domain.Order;
import com.dino.back_end_for_TTECH.features.profile.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.Set;

public interface OrderRepository extends JpaRepository<Order, Long>, JpaSpecificationExecutor<Order> {

    Page<Order> findAllByUser(User user, Pageable pageable);

    @Query("SELECT COALESCE(SUM(o.total), 0) FROM Order o " +
            "WHERE o.orderTime >= :startTime " +
            "AND o.orderTime < :endTime " +
            "AND o.status IN :statusList")
    Long calcRevenueByDay(
            @Param("startTime") Instant startTime,
            @Param("endTime") Instant endTime,
            @Param("statusList") Set<String> statusList
    );

}