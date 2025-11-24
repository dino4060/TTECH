package com.dino.back_end_for_TTECH.features.promotion.application;

import com.dino.back_end_for_TTECH.features.promotion.application.mapper.CampaignMapper;
import com.dino.back_end_for_TTECH.features.promotion.application.mapper.SaleMapper;
import com.dino.back_end_for_TTECH.features.promotion.application.model.CampaignData;
import com.dino.back_end_for_TTECH.features.promotion.application.model.CampaignQuery;
import com.dino.back_end_for_TTECH.features.promotion.application.model.SaleBody;
import com.dino.back_end_for_TTECH.features.promotion.application.model.SaleData;
import com.dino.back_end_for_TTECH.features.promotion.domain.Campaign;
import com.dino.back_end_for_TTECH.features.promotion.domain.Sale;
import com.dino.back_end_for_TTECH.features.promotion.domain.model.Status;
import com.dino.back_end_for_TTECH.features.promotion.domain.repository.CampaignRepository;
import com.dino.back_end_for_TTECH.features.promotion.domain.repository.SaleRepository;
import com.dino.back_end_for_TTECH.shared.application.exception.DateTimePairError;
import com.dino.back_end_for_TTECH.shared.application.exception.NotFoundError;
import com.dino.back_end_for_TTECH.shared.application.model.PageData;
import jakarta.validation.Valid;
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

    SaleRepository saleRepo;
    SaleMapper saleMapper;

    private void genStatus(Sale model) {
        var now = LocalDateTime.now();
        var startTime = model.getStartTime();
        var endTime = model.getEndTime();

        // Validate: startTime < endTime
        if (startTime == null || endTime == null || !startTime.isBefore(endTime)) {
            throw new DateTimePairError("startTime", "endTime");
        }

        // Validate: status is DEACTIVATED => bypass
        if (model.hasStatus(Status.DEACTIVATED))
            return;

        // startTime < endTime < now => ENDED
        if (endTime.isBefore(now)) {
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

    public SaleData create(SaleBody body) {
        var newModel = this.saleMapper.toModel(body);
        this.genStatus(newModel);

        var model = this.saleRepo.save(newModel);
        return this.saleMapper.toData(model);
    }

    public SaleData update(long id, SaleBody body) {
        var currentModel = this.saleRepo
                .findById(id)
                .orElseThrow(() -> new NotFoundError("Sale"));
        this.saleMapper.toModel(body, currentModel);
        this.genStatus(currentModel);

        var model = this.saleRepo.save(currentModel);
        return this.saleMapper.toData(model);
    }
}
