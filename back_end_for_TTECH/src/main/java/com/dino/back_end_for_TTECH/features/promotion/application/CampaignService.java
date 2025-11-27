package com.dino.back_end_for_TTECH.features.promotion.application;

import com.dino.back_end_for_TTECH.features.promotion.application.mapper.CampaignMapper;
import com.dino.back_end_for_TTECH.features.promotion.application.model.CampaignData;
import com.dino.back_end_for_TTECH.features.promotion.application.model.CampaignQuery;
import com.dino.back_end_for_TTECH.features.promotion.domain.Campaign;
import com.dino.back_end_for_TTECH.features.promotion.domain.model.Status;
import com.dino.back_end_for_TTECH.features.promotion.domain.repository.CampaignRepository;
import com.dino.back_end_for_TTECH.shared.application.exception.DateTimePairError;
import com.dino.back_end_for_TTECH.shared.application.model.PageData;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CampaignService {

    CampaignRepository campaignRepo;
    CampaignMapper campaignMapper;

    void genStatus(Campaign model) {
        var now = LocalDateTime.now();
        var startTime = model.getStartTime();
        var endTime = model.getEndTime();

        // model doesn't have startTime and endTime => don't manage time
        if (startTime == null && endTime == null) {
            model.setStatus(Status.ONGOING);
        }
        // Validate: startTime < endTime
        else if (startTime == null || endTime == null || !startTime.isBefore(endTime)) {
            throw new DateTimePairError("startTime", "endTime");
        }
        // startTime < endTime < now => ENDED
        else if (endTime.isBefore(now)) {
            model.setStatus(Status.ENDED);
        }
        // startTime < now < endTime => ONGOING
        else if (startTime.isBefore(now) && now.isBefore(endTime)) {
            model.setStatus(Status.ONGOING);
        }
        // now < startTime < endTime => UPCOMING
        else if (now.isBefore(startTime)) {
            model.setStatus(Status.UPCOMING);
        }
        // Default => Error
        else {
            throw new DateTimePairError("startTime", "endTime");
        }
    }

    public PageData<CampaignData> list(CampaignQuery query) {
        var page = this.campaignRepo.findAll(
                this.campaignMapper.toQueryable(query),
                this.campaignMapper.toPageable(query));

        return this.campaignMapper.toPageData(
                page, (Campaign c) -> this.campaignMapper.toData(c));
    }
}
