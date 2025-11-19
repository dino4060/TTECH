package com.dino.back_end_for_TTECH.promotion.domain;

import com.dino.back_end_for_TTECH.product.domain.Product;
import com.dino.back_end_for_TTECH.shared.domain.model.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

/**
 * Represents a allDiscount that:
 * - Be part of a allDiscount program,
 * - Can be applied to a product or spu.
 * <p>
 * Note for properties:
 * - totalLimit, buyerLimit == NULL is unlimited.
 */
@Entity
@Table(name = "voucher_units")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE voucher_units SET is_deleted = true WHERE unit_id=?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class VoucherUnit extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "voucher_lines_seq")
    @SequenceGenerator(name = "voucher_lines_seq", allocationSize = 1)
    @Column(name = "unit_id")
    Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "voucher_id", nullable = false)
    Voucher voucher;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    Product product;
}
