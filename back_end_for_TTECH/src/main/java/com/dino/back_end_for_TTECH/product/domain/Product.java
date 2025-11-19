package com.dino.back_end_for_TTECH.product.domain;

import com.dino.back_end_for_TTECH.ordering.domain.CartLine;
import com.dino.back_end_for_TTECH.ordering.domain.OrderLine;
import com.dino.back_end_for_TTECH.product.domain.model.Status;
import com.dino.back_end_for_TTECH.promotion.domain.SaleUnit;
import com.dino.back_end_for_TTECH.promotion.domain.VoucherUnit;
import com.dino.back_end_for_TTECH.shared.domain.model.BaseEntity;
import com.dino.back_end_for_TTECH.shared.domain.model.BaseStatus;
import jakarta.persistence.*;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.*;

import java.util.List;

@Entity
@Table(name = "products")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE products SET is_deleted = true WHERE product_id=?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Product extends BaseEntity implements BaseStatus<Status> {

    @Id
    @SequenceGenerator(name = "products_seq", allocationSize = 1)
    @Column(name = "product_id")
    Long id;

    @Column(nullable = false)
    String name;

    @Column(nullable = false)
    String thumb;

    String version;

    String color;

    String status;

    int guaranteeMonths;

    List<String> photos;

    @Column(columnDefinition = "text")
    String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_id")
    Supplier supplier;

    @OneToOne(mappedBy = "product", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    Price price;

    @OneToOne(mappedBy = "product", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    Stock stock;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    List<CartLine> cartLines;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    List<OrderLine> orderLines;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    List<SaleUnit> saleUnits;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    List<VoucherUnit> voucherUnits;


//     String serialNumber;
//
//     int retailPrice;
//
//     String video;
//
//    @Type(JsonType.class)
//    @Column(columnDefinition = "jsonb")
//    List<ProductSpecification> specifications;
//
//    @Type(JsonType.class)
//    @Column(columnDefinition = "jsonb")
//    List<ProductVariation> variations;

}
