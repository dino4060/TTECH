package com.dino.back_end_for_TTECH.ordering.domain;

import com.dino.back_end_for_TTECH.product.domain.Sku;
import com.dino.back_end_for_TTECH.shared.application.utils.AppUtils;
import com.dino.back_end_for_TTECH.shared.domain.exception.AppException;
import com.dino.back_end_for_TTECH.shared.domain.exception.ErrorCode;
import com.dino.back_end_for_TTECH.shared.domain.model.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Table(name = "order_items")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE order_items SET is_deleted = true WHERE order_item_id=?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderItem extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "order_item_id")
    Long id;

    int quantity;

    int mainPrice;

    Integer sidePrice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false, updatable = false)
    Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sku_id", nullable = false, updatable = false)
    Sku sku;

    // SETTER //

    public void setQuantity(int quantity) {
        boolean isValid = 1 <= quantity && quantity <= 100;

        if (!isValid) throw new AppException(ErrorCode.ORDER__QUANTITY_LIMIT);

        this.quantity = quantity;
    }

    public void setMainPrice(int mainPrice) {
        boolean isValid = 1000 <= mainPrice && (AppUtils.isNull(this.sidePrice) || this.sidePrice <= mainPrice);

        if (!isValid) throw new AppException(ErrorCode.ORDER__MAIN_PRICE_LIMIT);

        this.mainPrice = mainPrice;
    }

    public void setSidePrice(Integer sidePrice) {
        boolean isValid = AppUtils.isNull(this.sidePrice) || (1000 <= sidePrice && sidePrice <= this.mainPrice);

        if (!isValid) throw new AppException(ErrorCode.ORDER__SIDE_PRICE_LIMIT);

        this.sidePrice = sidePrice;
    }


    // FACTORY //

    public static OrderItem createOrderItem(Sku sku, int quantity) {
        var item = new OrderItem();

        item.setQuantity(quantity);
        item.setMainPrice(sku.getPrice().getMainPrice());
        item.setSidePrice(sku.getPrice().getSidePrice());
        item.setSku(sku);

        return item;
    }
}
