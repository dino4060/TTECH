package com.dino.back_end_for_TTECH.promotion.domain;

import java.time.Instant;

import com.dino.back_end_for_TTECH.promotion.domain.model.Status;
import com.dino.back_end_for_TTECH.shared.domain.model.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Table(name = "campaigns")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE campaigns SET is_deleted = true WHERE campaign_id=?")
@SQLRestriction("is_deleted = false")
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "promotion_group", discriminatorType = DiscriminatorType.STRING)
@Getter
@Setter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PROTECTED)
public class Campaign extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "campaigns_seq")
    @SequenceGenerator(name = "campaigns_seq", allocationSize = 1)
    @Column(name = "campaign_id")
    Long id;

    @Column(name = "promotion_group", insertable = false, updatable = false)
    String promotionGroup;

    @Column(updatable = false)
    String promotionType;

    String name;

    Instant startDate;

    Instant endDate;

    String status;

    private boolean isPeriodActive() {
        // Instant.isXXX use () => !isXXX use []
        Instant now = Instant.now();
        return !now.isBefore(this.startDate) && !now.isAfter(this.endDate);
    }

    private boolean isStatusActive() {
        return this.status.equals(Status.ONGOING.toString());
    }

    public boolean isActive() {
        return this.isPeriodActive() && this.isStatusActive();
    }
}
