package com.dino.back_end_for_TTECH.promotion.domain;

import com.dino.back_end_for_TTECH.promotion.domain.model.ChannelType;
import jakarta.persistence.*;
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
@SQLDelete(sql = "UPDATE discount_programs SET is_deleted = true WHERE discount_program_id=?")
@SQLRestriction("is_deleted = false")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FlashSaleProgram extends ProductDiscountProgram {
    // max 3 days

    @Enumerated(EnumType.STRING)
    @Column(name = "channel_type")
    ChannelType channelType;

    @Override
    public int getPriority() {
        return 1;
    }
}
