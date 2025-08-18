package com.dino.back_end_for_TTECH.product.domain;

import com.dino.back_end_for_TTECH.shared.domain.model.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;
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
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "category_id")
    Long id;

    @Column(length = 40, nullable = false)
    String name;

    int position;

    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
    List<Product> products;
}
