package com.dino.back_end_for_TTECH.features.promotion.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "sales")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE sales SET is_deleted_sale = true WHERE campaign_id=?")
@SQLRestriction("is_deleted_sale = false")
@DiscriminatorValue("SALE")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "promotion_type", discriminatorType = DiscriminatorType.STRING)
@Getter
@Setter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PROTECTED)
public class Sale extends Campaign {

    @OneToMany(mappedBy = "sale", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    List<SaleUnit> units = new ArrayList<>();

    Boolean isDeletedSale = false;
}