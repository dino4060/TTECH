package com.dino.back_end_for_TTECH.promotion.domain;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@DiscriminatorValue("FLASH_SALE")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE sale_campaigns SET is_deleted = true WHERE campaign_id=?")
@SQLRestriction("is_deleted = false")
@NoArgsConstructor
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FlashSaleCampaign extends SaleCampaign {
    // max 3 days

    @Override
    public int getPriority() {
        return 1;
    }
}
