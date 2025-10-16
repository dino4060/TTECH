package com.dino.back_end_for_TTECH.promotion.domain;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@DiscriminatorValue("NEW_ARRIVAL")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE sale_campaigns SET is_deleted = true WHERE campaign_id=?")
@SQLRestriction("is_deleted = false")
@NoArgsConstructor
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NewArrivalCampaign extends SaleCampaign {
    // max 3 months
    // buyerLimit 1
    // no discounted sku allPrice

    @Override
    public int getPriority() {
        return 3;
    }

}