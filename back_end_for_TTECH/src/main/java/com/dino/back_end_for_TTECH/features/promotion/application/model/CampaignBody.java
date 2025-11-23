package com.dino.back_end_for_TTECH.features.promotion.application.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.time.LocalDateTime;

@NoArgsConstructor
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CampaignBody {
    String promotionType;

    String name;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    LocalDateTime startTime;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    LocalDateTime endTime;
}
