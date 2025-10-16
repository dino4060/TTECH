package com.dino.back_end_for_TTECH.promotion.domain;

import com.dino.back_end_for_TTECH.promotion.domain.model.Status;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.util.List;

@Entity
@Table(name = "sale_campaigns")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "campaign_type", discriminatorType = DiscriminatorType.STRING)
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE sale_campaigns SET is_deleted = true WHERE campaign_id=?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public abstract class SaleCampaign extends Campaign {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "campaign_id")
    Long id;

    String status;

    String pricingType;

    @OneToMany(mappedBy = "campaign", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    List<Sales> sales;

    public abstract int getPriority();

    public boolean isStatusActive() {
        return this.status.equals(Status.ONGOING.toString());
    }

    public boolean isActive() {
        return this.isPeriodActive() && this.isStatusActive();
    }
}