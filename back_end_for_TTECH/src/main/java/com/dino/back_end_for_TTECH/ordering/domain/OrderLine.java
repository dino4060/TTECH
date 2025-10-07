package com.dino.back_end_for_TTECH.ordering.domain;

import com.dino.back_end_for_TTECH.product.domain.Sku;
import com.dino.back_end_for_TTECH.shared.application.utils.AppUtils;
import com.dino.back_end_for_TTECH.shared.domain.exception.AppException;
import com.dino.back_end_for_TTECH.shared.domain.exception.ErrorCode;
import com.dino.back_end_for_TTECH.shared.domain.model.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Table(name = "order_items")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE order_lines SET is_deleted = true WHERE line_id=?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderLine extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "order_lines_seq")
    @SequenceGenerator(name = "order_lines_seq", allocationSize = 1)
    @Column(name = "line_id")
    Long id;

    int quantity;

    int mainPrice;

    int sidePrice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false, updatable = false)
    Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sku_id", nullable = false, updatable = false)
    Sku sku;

    // SETTER //

    public void newQuantity(int quantity) {
        boolean isValid = 1 <= quantity && quantity <= 100;

        if (!isValid) throw new AppException(ErrorCode.ORDER__QUANTITY_LIMIT);

        this.quantity = quantity;
    }

    public void newMainPrice(int mainPrice) {
        boolean isValid = 1 <= mainPrice && (this.sidePrice == 0 || this.sidePrice <= mainPrice);

        if (!isValid) throw new AppException(ErrorCode.ORDER__MAIN_PRICE_LIMIT);

        this.mainPrice = mainPrice;
    }

    public void newSidePrice(Integer sidePrice) {
        boolean isValid = this.sidePrice == 0 || (1 <= sidePrice && sidePrice <= this.mainPrice);

        if (!isValid) throw new AppException(ErrorCode.ORDER__SIDE_PRICE_LIMIT);

        this.sidePrice = sidePrice;
    }

}
