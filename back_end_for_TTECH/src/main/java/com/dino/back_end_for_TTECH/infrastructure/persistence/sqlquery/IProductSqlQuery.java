package com.dino.back_end_for_TTECH.infrastructure.persistence.sqlquery;

import com.dino.back_end_for_TTECH.product.domain.Product;
import com.dino.back_end_for_TTECH.product.domain.model.ProductItemView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;

import java.util.List;

public interface IProductSqlQuery extends JpaRepository<Product, Long> {

    @NativeQuery("""
            WITH query AS (SELECT plainto_tsquery('english', :keyword) AS q)
            SELECT
                p.product_id,
                p.status,
                p.updated_at,
                p.name,
                p.thumb,
                p.meta,
                pp.product_price_id,
                pp.main_price,
                pp.side_price,
                pp.discount_percent,
                pp.max_main_price,
                pp.max_side_price,
                pp.max_discount_percent,
                ts_rank(p.text_search_vector, query.q) AS rank
            FROM deal.public.products p
            JOIN
                deal.public.product_prices pp ON pp.product_id = p.product_id,
                query
            WHERE p.text_search_vector @@ query.q
            ORDER BY rank DESC
            """)
    List<ProductItemView> searchFullText(@NonNull @Param("keyword") String keyword);
}
