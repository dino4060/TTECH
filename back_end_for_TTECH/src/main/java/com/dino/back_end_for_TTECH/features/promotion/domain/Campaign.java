package com.dino.back_end_for_TTECH.features.promotion.domain;

import com.dino.back_end_for_TTECH.features.promotion.domain.model.Status;
import com.dino.back_end_for_TTECH.shared.domain.model.BaseEntity;
import com.dino.back_end_for_TTECH.shared.domain.model.BaseStatus;
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

import java.time.LocalDateTime;

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
public class Campaign extends BaseEntity implements BaseStatus<Status> {

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

    LocalDateTime startTime;

    LocalDateTime endTime;

    String status;
}
