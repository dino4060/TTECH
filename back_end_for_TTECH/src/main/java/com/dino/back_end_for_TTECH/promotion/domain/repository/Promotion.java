package com.dino.back_end_for_TTECH.promotion.domain.repository;

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
import lombok.experimental.SuperBuilder;

@MappedSuperclass
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public abstract class Promotion extends BaseEntity {

    @Column(nullable = false)
    String name;

    @Column(name = "start_date", nullable = false)
    Instant startDate;

    @Column(name = "end_date", nullable = false)
    Instant endDate;

    public boolean isPeriodActive() {
        // NOTE: isAfter, isBefore
        // isAfter, isBefore don't include equals => ()
        // !isBefore, !isAfter include equals => []
        Instant now = Instant.now();
        return !now.isBefore(this.startDate) && !now.isAfter(this.endDate);
    }
}
