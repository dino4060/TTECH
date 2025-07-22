package com.dino.back_end_for_TTECH.product.domain;
import com.dino.back_end_for_TTECH.shared.domain.model.BaseEntity;
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
@Table(name = "category_branches")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE category_branches SET is_deleted = true WHERE category_branch_id = ?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CategoryBranch extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "category_branch_id")
    Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "level1_category_id")
    Category level1Category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "level2_category_id")
    Category level2Category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "level3_category_id")
    Category level3Category;

    @OneToMany(mappedBy = "categoryBranch", fetch = FetchType.LAZY)
    List<Product> products;
}
