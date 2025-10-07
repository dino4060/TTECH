package com.dino.back_end_for_TTECH.inventory.domain;

import com.dino.back_end_for_TTECH.inventory.domain.model.InventoryStatus;
import com.dino.back_end_for_TTECH.product.domain.Sku;
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
@Table(name = "inventories")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE inventories SET is_deleted = true WHERE inventory_id = ?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Inventory extends BaseEntity {

    @Id
    @SequenceGenerator(name = "inventories_seq", allocationSize = 1)
    @Column(name = "inventory_id")
    Long id;

    int stocks;

    int sales;

    int total;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sku_id", nullable = false, updatable = false)
    Sku sku;

    InventoryStatus status;

    // CHECKING METHODS //

    public void setStatus() {
        if (this.getStocks() > 10) {
            this.setStatus(InventoryStatus.LIVE);
            return;
        }

        if (this.getStocks() > 0) {
            this.setStatus(InventoryStatus.WARNING);
            return;
        }

        this.setStatus(InventoryStatus.OUT_OF_STOCK);
    }

    public void setTotal(int total) {
        boolean condition = 0 <= total;
        if (!condition) throw new AppException(ErrorCode.INVENTORY__TOTAL_LIMIT);
        this.total = total;
    }

    public void setStocks(int stocks) {
        boolean condition = 0 <= stocks;
        if (!condition) throw new AppException(ErrorCode.INVENTORY__STOCKS_LIMIT);
        this.stocks = stocks;
    }

    public void setSales(int sales) {
        boolean condition = 0 <= sales;
        if (!condition) throw new AppException(ErrorCode.INVENTORY__SALES_LIMIT);
        this.sales = sales;
    }

    // INSTANCE METHODS //

    public void imports(int quantity) {
        this.setTotal(quantity);
        this.setStocks(quantity);
        this.setSales(0);
        this.setStatus();
    }

    public void restock(int quantity) {
        this.setTotal(this.total + quantity);
        this.setStocks(this.stocks + quantity);
        this.setStatus();
    }

    public void reserve(int quantity) {
        this.setTotal(this.total - quantity);
        this.setStocks(this.stocks - quantity);
        this.setSales(this.sales + quantity);
        this.setStatus();
    }

    public void updateStocks(int quantity) {
        this.setStocks(this.getStocks() - quantity);
        this.setSales(this.getSales() + quantity);
    }
}
