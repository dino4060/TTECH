package com.dino.back_end_for_TTECH.features.product.domain;

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
@Table(name = "stocks")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE stocks SET is_deleted = true WHERE stock_id = ?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Stock extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "inventories_seq")
    @SequenceGenerator(name = "inventories_seq", sequenceName = "inventories_seq", allocationSize = 1)
    @Column(name = "stock_id")
    Long id;

    int available;

    int sold;

    int total;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false, updatable = false)
    Product product;

    // INSTANCE //

    public void init() {
        this.setTotal(this.available);
        this.setSold(0);
    }

    public void reserve(int quantity) {
        this.setTotal(this.total - quantity);
        this.setAvailable(this.available - quantity);
        this.setSold(this.sold + quantity);
    }

    public void update(int quantity) {
        this.setAvailable(this.getAvailable() - quantity);
        this.setSold(this.getSold() + quantity);
    }
}
