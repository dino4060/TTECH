package com.dino.back_end_for_TTECH.product.domain;

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
    @SequenceGenerator(name = "inventories_seq", allocationSize = 1)
    @Column(name = "stock_id")
    Long id;

    int available;

    int sold;

    int total;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false, updatable = false)
    Product product;

    // CHECKING METHODS //

    public void setTotal(int total) {
        boolean condition = 0 <= total;
        if (!condition) throw new AppException(ErrorCode.INVENTORY__TOTAL_LIMIT);
        this.total = total;
    }

    public void setAvailable(int available) {
        boolean condition = 0 <= available;
        if (!condition) throw new AppException(ErrorCode.INVENTORY__STOCKS_LIMIT);
        this.available = available;
    }

    public void setSold(int sold) {
        boolean condition = 0 <= sold;
        if (!condition) throw new AppException(ErrorCode.INVENTORY__SALES_LIMIT);
        this.sold = sold;
    }

    // INSTANCE METHODS //

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
