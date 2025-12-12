package com.dino.back_end_for_TTECH.features.ordering.domain;

import com.dino.back_end_for_TTECH.features.ordering.domain.model.OrderStatus;
import com.dino.back_end_for_TTECH.features.profile.domain.User;
import com.dino.back_end_for_TTECH.shared.domain.model.BaseEntity;
import com.dino.back_end_for_TTECH.shared.domain.model.BaseStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.Instant;
import java.util.ArrayList;
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
public class Order extends BaseEntity implements BaseStatus<OrderStatus> {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "orders_seq")
    @SequenceGenerator(name = "orders_seq", allocationSize = 1)
    @Column(name = "order_id")
    Long id;

    int allPrice;
    int allDiscount;
    int shippingFee;
    int total;

    String note;
    String paymentType;

    String toUserName;
    String toPhone;
    Integer toProvinceId;
    Integer toWardId;
    String toStreet;

    String fromUserName;
    String fromPhone;
    Integer fromProvinceId;
    Integer fromWardId;
    String fromStreet;

    String status;
    Instant orderTime;
    String parcelCode;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buyer_id", nullable = false, updatable = false)
    User buyer;

    @JsonIgnore
    @OneToMany(mappedBy = "order", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    List<OrderLine> lines = new ArrayList<>();

}
