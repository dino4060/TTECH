package com.dino.back_end_for_TTECH.features.product.domain;

import com.dino.back_end_for_TTECH.shared.domain.model.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.util.List;

@Entity
@Table(name = "suppliers")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE suppliers SET is_deleted = true WHERE supplier_id = ?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Supplier extends BaseEntity {

    @Id
    @SequenceGenerator(name = "suppliers_seq", allocationSize = 1)
    @Column(name = "supplier_id")
    Long id;

    @Column(length = 40, nullable = false)
    String name;

    @OneToMany(mappedBy = "supplier", fetch = FetchType.LAZY)
    List<Product> products;
}
