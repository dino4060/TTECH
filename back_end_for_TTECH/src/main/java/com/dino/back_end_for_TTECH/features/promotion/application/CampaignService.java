package com.dino.back_end_for_TTECH.features.promotion.application;

import com.dino.back_end_for_TTECH.features.product.application.ProductService;
import com.dino.back_end_for_TTECH.features.product.domain.Price;
import com.dino.back_end_for_TTECH.features.promotion.application.mapper.CampaignMapper;
import com.dino.back_end_for_TTECH.features.promotion.application.model.CampaignQuery;
import com.dino.back_end_for_TTECH.features.promotion.domain.Campaign;
import com.dino.back_end_for_TTECH.features.promotion.domain.Sale;
import com.dino.back_end_for_TTECH.features.promotion.domain.Voucher;
import com.dino.back_end_for_TTECH.features.promotion.domain.model.PromoType;
import com.dino.back_end_for_TTECH.features.promotion.domain.model.Status;
import com.dino.back_end_for_TTECH.features.promotion.domain.repository.CampaignRepository;
import com.dino.back_end_for_TTECH.features.promotion.domain.repository.SaleRepository;
import com.dino.back_end_for_TTECH.features.promotion.domain.repository.VoucherRepository;
import com.dino.back_end_for_TTECH.infrastructure.aop.exception.BadRequestException;
import com.dino.back_end_for_TTECH.shared.application.model.PageData;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CampaignService {

    ProductService productService;
    CampaignRepository campaignRepository;
    CampaignMapper mapper;

    SaleRepository saleRepository;
    VoucherRepository voucherRepository;


    public Object list(CampaignQuery query) {
        return null;
    }

    public void create( Sale body) {
    }

    public void create(Voucher body) {
    }
}
