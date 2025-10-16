package com.dino.back_end_for_TTECH.promotion.domain;

import java.time.Instant;

import com.dino.back_end_for_TTECH.shared.domain.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@MappedSuperclass
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public abstract class Campaign extends BaseEntity {

    @Column(nullable = false)
    String name;

    @Column(nullable = false)
    Instant startDate;

    @Column(nullable = false)
    Instant endDate;
    public boolean isPeriodActive() {
        // Instant.isXXX use () => !isXXX use []
        Instant now = Instant.now();
        return !now.isBefore(this.startDate) && !now.isAfter(this.endDate);
    }
}
