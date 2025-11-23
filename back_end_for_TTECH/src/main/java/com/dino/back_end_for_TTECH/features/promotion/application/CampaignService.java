package com.dino.back_end_for_TTECH.features.promotion.application;

import com.dino.back_end_for_TTECH.features.promotion.application.mapper.SaleMapper;
import com.dino.back_end_for_TTECH.features.promotion.application.model.CampaignQuery;
import com.dino.back_end_for_TTECH.features.promotion.application.model.SaleBody;
import com.dino.back_end_for_TTECH.features.promotion.application.model.SaleData;
import com.dino.back_end_for_TTECH.features.promotion.domain.Sale;
import com.dino.back_end_for_TTECH.features.promotion.domain.model.Status;
import com.dino.back_end_for_TTECH.features.promotion.domain.repository.SaleRepository;
import com.dino.back_end_for_TTECH.shared.application.exception.DateTimePairError;
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

    public Object list(CampaignQuery query) {
        return null;
    }

    public SaleData create(SaleBody body) {
        var newBody = this.saleMapper.toModel(body);
        this.genStatus(newBody);

        var model = this.saleRepo.save(newBody);
        return this.saleMapper.toData(model);
    }
}
