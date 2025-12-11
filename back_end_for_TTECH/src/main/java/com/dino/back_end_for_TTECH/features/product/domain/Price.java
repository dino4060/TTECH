package com.dino.back_end_for_TTECH.features.product.domain;

import com.dino.back_end_for_TTECH.shared.domain.model.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Table(name = "prices")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE prices SET is_deleted = true WHERE price_id=?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Price extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "prices_seq")
    @SequenceGenerator(name = "prices_seq", sequenceName = "prices_seq", allocationSize = 1)
    @Column(name = "price_id")
    Long id;

    @Column(nullable = false)
    int retailPrice;

    @Column(nullable = false)
    int mainPrice;

    @Column(nullable = false)
    int sidePrice;

    @Column(nullable = false)
    int dealPercent;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false, updatable = false)
    Product product;
}
