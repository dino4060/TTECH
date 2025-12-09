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
@Table(name = "series")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE series SET is_deleted = true WHERE series_id = ?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Series extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "series_seq")
    @SequenceGenerator(name = "series_seq", allocationSize = 1)
    @Column(name = "series_id")
    Long id;

    @Column(length = 40, nullable = false)
    String name;

    Integer position;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    Series parent;

    @OneToMany(mappedBy = "parent", fetch = FetchType.LAZY)
    List<Series> children;

    @OneToMany(mappedBy = "series", fetch = FetchType.LAZY)
    List<Product> products;
}
