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
@Table(name = "categories")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE categories SET is_deleted = true WHERE category_id = ?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Category extends BaseEntity {

    @Id
    @SequenceGenerator(name = "categories_seq", allocationSize = 1)
    @Column(name = "category_id")
    Long id;

    @Column(length = 40, nullable = false)
    String name;

    int position;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    Category parent;

    @OneToMany(mappedBy = "parent", fetch = FetchType.LAZY)
    List<Category> children;

    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
    List<Series> series;

    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
    List<Product> products;
}
