package com.dino.back_end_for_TTECH.ordering.domain;

import com.dino.back_end_for_TTECH.ordering.domain.model.*;
import com.dino.back_end_for_TTECH.profile.domain.Shop;
import com.dino.back_end_for_TTECH.profile.domain.User;
import com.dino.back_end_for_TTECH.shared.domain.exception.AppException;
import com.dino.back_end_for_TTECH.shared.domain.exception.ErrorCode;
import com.dino.back_end_for_TTECH.shared.domain.model.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.*;

import java.time.Duration;
import java.time.Instant;
import java.util.List;

@Entity
@Table(name = "orders")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE orders SET is_deleted = true WHERE order_id=?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Order extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "order_id")
    Long id;

    @Enumerated(EnumType.STRING)
    OrderStatus status;

    @Type(JsonType.class)
    @Column(columnDefinition = "jsonb")
    OrderTimeline timeline;

    @Type(JsonType.class)
    @Column(columnDefinition = "jsonb")
    CheckoutSnapshot checkoutSnapshot;

    @Enumerated(EnumType.STRING)
    PaymentMethod paymentMethod;

    @Column(columnDefinition = "text")
    private String note;

    @Type(JsonType.class)
    @Column(columnDefinition = "jsonb")
    ShippingDetail shippingDetail;

    @Type(JsonType.class)
    @Column(columnDefinition = "jsonb")
    OrderAddress deliveryAddress;

    @Type(JsonType.class)
    @Column(columnDefinition = "jsonb")
    OrderAddress pickupAddress;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buyer_id", nullable = false, updatable = false)
    @JsonIgnore
    User buyer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shop_id", nullable = false, updatable = false)
    @JsonIgnore
    Shop shop;

    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    List<OrderItem> orderItems;

    // FACTORY //

    /**
     * createDraftOrder.
     */
    public static Order createDraftOrder(
            List<OrderItem> orderItems, User buyer, Shop shop,
            CheckoutSnapshot checkoutSnapshot, ShippingDetail shippingDetail
    ) {
        Order order = new Order();
        order.setStatus(OrderStatus.DRAFT);
        order.setTimeline(OrderTimeline.beginRecording());

        order.setBuyer(buyer);
        order.setShop(shop);
        order.setCheckoutSnapshot(checkoutSnapshot);
        order.setShippingDetail(shippingDetail);
        order.setOrderItems(orderItems);


        orderItems.forEach(item -> item.setOrder(order)); // link OrderItems to Order

        return order;
    }

    // INSTANCE //

    /**
     * markAsPending
     */
    public void markAsPending(
            PaymentMethod paymentMethod, String note,
            OrderAddress deliveryAddress, OrderAddress pickupAddress
    ) {
        if (this.status != OrderStatus.DRAFT && this.status != OrderStatus.UNPAID)
            throw new AppException(ErrorCode.ORDER__STATUS_NOT_UPDATABLE);

        this.setStatus(OrderStatus.PENDING);
        this.getTimeline().recordOrdering();

        this.setPaymentMethod(paymentMethod);
        this.setNote(note);
        this.setDeliveryAddress(deliveryAddress);
        this.setPickupAddress(pickupAddress);
    }

    public boolean canDelete(Duration orderTtl) {
        return this.getCreatedAt().isBefore(Instant.now().minus(orderTtl));
    }

}
