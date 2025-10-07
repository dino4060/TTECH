package com.dino.back_end_for_TTECH.ordering.domain.specification;

import com.dino.back_end_for_TTECH.ordering.application.model.OrderQuery;
import com.dino.back_end_for_TTECH.ordering.domain.Order;
import org.springframework.data.jpa.domain.Specification;

public class OrderSpecifiation {
    public static Specification<Order> equalId(Long id) {
        return (root, query, builder) -> {
            if (id == null || id <= 0) return null;
            return builder.equal(root.get("id"), id);
        };
    }

    public static Specification<Order> build(OrderQuery query) {
        return Specification
                .where(equalId(query.id()));
    }
}
