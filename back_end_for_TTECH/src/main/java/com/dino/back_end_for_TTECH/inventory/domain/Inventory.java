package com.dino.back_end_for_TTECH.inventory.domain;

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
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "inventory_id")
    Long id;

    int stocks;

    int sales;

    int total;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sku_id", nullable = false, updatable = false)
    Sku sku;

    // CHECKING METHODS //

    public void setTotal() {
        boolean condition = 0 <= total && stocks + sales <= total;
        if (!condition) throw new AppException(ErrorCode.INVENTORY__TOTAL_LIMIT);
    }

    public void setStocks() {
        boolean condition = 0 <= stocks && stocks <= this.total;
        if (!condition) throw new AppException(ErrorCode.INVENTORY__STOCKS_LIMIT);
    }

    public void setSales() {
        boolean condition = 0 <= sales && sales <= this.total;
        if (!condition) throw new AppException(ErrorCode.INVENTORY__SALES_LIMIT);
    }

    // INSTANCE METHODS //

    public void create() {
        this.sales = 0;
        this.total = this.stocks;
    }

    public static Inventory imports(int quantity) {
        var inventory = new Inventory();
        inventory.setTotal(quantity);
        inventory.setStocks(quantity);
        inventory.setSales(0);
        return inventory;
    }

    public void restock(int quantity) {
        this.setTotal(this.total + quantity);
        this.setStocks(this.stocks + quantity);
    }

    public void updateStocks(int quantity) {
        this.setStocks(this.getStocks() - quantity);
        this.setSales(this.getSales() + quantity);
    }
}
