package com.dino.back_end_for_TTECH.promotion.domain;

import com.dino.back_end_for_TTECH.profile.domain.Shop;
import com.dino.back_end_for_TTECH.promotion.domain.model.PricingType;
import com.dino.back_end_for_TTECH.promotion.domain.model.ProgramStatusType;
import com.dino.back_end_for_TTECH.promotion.domain.repository.Promotion;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.util.List;

@Entity
@Table(name = "sales_programs")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "program_type", discriminatorType = DiscriminatorType.STRING)
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE sales_programs SET is_deleted = true WHERE product_discount_program_id=?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public abstract class SalesProgram extends Promotion {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "product_discount_program_id")
    Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_type")
    ProgramStatusType statusType;

    @Enumerated(EnumType.STRING)
    @Column(name = "pricing_type")
    PricingType pricingType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shop_id", updatable = false, nullable = false)
    @JsonIgnore
    Shop shop;

    @OneToMany(mappedBy = "productDiscountProgram", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    List<Sales> productDiscounts;

    // getPriority //
    // - Open-closed principle in SOLID //
    public abstract int getPriority();

    // isStatusActive //
    public boolean isStatusActive() {
        return this.statusType == ProgramStatusType.ONGOING;
    }

    // isActive //
    public boolean isActive() {
        return this.isPeriodActive() && this.isStatusActive();
    }

}