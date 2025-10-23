package com.dino.back_end_for_TTECH.promotion.domain;

import com.dino.back_end_for_TTECH.promotion.domain.model.Status;
import jakarta.persistence.*;
import lombok.*;
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
@SQLDelete(sql = "UPDATE sales SET is_deleted = true WHERE campaign_id=?")
@SQLRestriction("is_deleted = false")
@DiscriminatorValue("SALE")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "promotion_type", discriminatorType = DiscriminatorType.STRING)
@Getter
@Setter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PROTECTED)
public abstract class Sale extends Campaign {

    @OneToMany(mappedBy = "sale", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    List<SaleLine> lines = new ArrayList<>();

    public abstract int getPriority();
}