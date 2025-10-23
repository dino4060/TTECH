package com.dino.back_end_for_TTECH.promotion.application;

import com.dino.back_end_for_TTECH.pricing.domain.Price;
import com.dino.back_end_for_TTECH.product.application.ProductServiceImpl;
import com.dino.back_end_for_TTECH.promotion.application.mapper.CampaignMapper;
import com.dino.back_end_for_TTECH.promotion.application.model.*;
import com.dino.back_end_for_TTECH.promotion.domain.Campaign;
import com.dino.back_end_for_TTECH.promotion.domain.Sale;
import com.dino.back_end_for_TTECH.promotion.domain.Voucher;
import com.dino.back_end_for_TTECH.promotion.domain.model.PromoType;
import com.dino.back_end_for_TTECH.promotion.domain.model.Status;
import com.dino.back_end_for_TTECH.promotion.domain.repository.CampaignRepository;
import com.dino.back_end_for_TTECH.promotion.domain.repository.SaleRepository;
import com.dino.back_end_for_TTECH.promotion.domain.repository.VoucherRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CampaignService {

    ProductServiceImpl productService;
    CampaignRepository campaignRepository;
    CampaignMapper mapper;

    SaleRepository saleRepository;
    VoucherRepository voucherRepository;

    public PageData<Campaign> list(CampaignQuery query) {
        var result = this.campaignRepository.findAll(
                this.mapper.toQueryable(query),
                this.mapper.toPageable(query)
        );
        return this.mapper.toPageData(result, (Campaign campaign) -> campaign);
    }

    public void create(Sale body) {
        body.getLines().forEach(line -> {
            line.setSale(body);
            line.setEffective(false);
            line.setProduct(this.productService.getProduct(line.getProduct().getId()));
            line.getSkuLines().clear();
        });

        this.manageStatus(body);

        // event create => check ongoing now | upcoming in 70m phase => switch ongoing & update price | add to redis

    }

    public Sale update(Sale body) {
        body.setPromotionType(PromoType.NORMAL_SALE.name());

        body.getLines().forEach(line -> {
            line.setSale(body);
            // line.setEffective(false);
            line.setProduct(this.productService.getProduct(line.getProduct().getId()));
            line.getSkuLines().clear();
        });

        var model = this.saleRepository.save(body);

        // event update => check ongoing now | upcoming in 70m phase => switch ongoing & update price | add to redis
        return model;
    }

    public Voucher create(Voucher body) {
        var model = this.voucherRepository.save(body);
        return model;
    }

    private void manageStatus(Sale model) {
        // if duration is now
        var now = Instant.now();
        if (model.getStartTime().equals(now)) {
            this.activate(model);
            return;
        }
        // if duration is in the current phase (wait in the queue)
        var phaseStartTime = LocalDateTime.ofInstant(now, ZoneId.systemDefault())
                .withMinute(0).withSecond(0).withNano(0)
                .atZone(ZoneId.systemDefault()).toInstant();
        var phaseEndTime = LocalDateTime.ofInstant(now, ZoneId.systemDefault())
                .plusHours(1).withMinute(0).withSecond(0).withNano(0)
                .atZone(ZoneId.systemDefault()).toInstant();
        if (!model.getStartTime().isBefore(phaseStartTime) && !model.getEndTime().isAfter(phaseEndTime)) {
            this.enqueue(model);
            return;
        }
        // if duration is upcoming
        if (model.getStartTime().isAfter(phaseEndTime)) {
            this.wait(model);
            return;
        }
        // if duration is ended
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The ongoing duration is in the past");
    }

    private void wait(Sale model) {
        // status is UPCOMING
        // write in database
        model.setStatus(Status.UPCOMING.name());
        this.saleRepository.save(model);
    }

    private void enqueue(Sale model) {
        // status is UPCOMING
        // write in database
        // enqueue in redis sort
        model.setStatus(Status.UPCOMING.name());
        var sale = this.saleRepository.save(model);
        this.enqueueSaleSort(sale);
    }

    private void enqueueSaleSort(Sale sale) {

    }

    private void activate(Sale model) {
        // in limit quantity
        // is the high priority
        // is effective true
        // status is ONGOING
        // update price
        // write
        // async price with FE
        model.setStatus(Status.ONGOING.name());
        model.getLines().forEach(line -> {
            var price = line.getProduct().getPrice();
            price.sale(line);
            this.asyncProductPrice(price);
        });
        this.saleRepository.save(model);
    }


    private void asyncProductPrice(Price price) {

    }

    private void end(Sale model) {

    }

    private void deactivate(Sale model) {

    }
}
