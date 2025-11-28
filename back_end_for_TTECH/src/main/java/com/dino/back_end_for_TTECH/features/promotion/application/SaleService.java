package com.dino.back_end_for_TTECH.features.promotion.application;

import com.dino.back_end_for_TTECH.features.product.application.ProductService;
import com.dino.back_end_for_TTECH.features.product.domain.Product;
import com.dino.back_end_for_TTECH.features.product.domain.repository.ProductRepository;
import com.dino.back_end_for_TTECH.features.promotion.application.mapper.SaleMapper;
import com.dino.back_end_for_TTECH.features.promotion.application.model.SaleBody;
import com.dino.back_end_for_TTECH.features.promotion.application.model.SaleData;
import com.dino.back_end_for_TTECH.features.promotion.domain.model.Status;
import com.dino.back_end_for_TTECH.features.promotion.domain.repository.CampaignRepository;
import com.dino.back_end_for_TTECH.features.promotion.domain.repository.SaleRepository;
import com.dino.back_end_for_TTECH.shared.application.exception.NotFoundError;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class SaleService {

    CampaignService campService;
    CampaignRepository campaignRepo;


    SaleRepository saleRepo;
    SaleMapper saleMapper;

    ProductService productService;
    ProductRepository productRepo;

    public SaleData get(long id) {
        var sale = this.saleRepo
                .findById(id)
                .orElseThrow(() -> new NotFoundError("Sale"));

        return this.saleMapper.toData(sale);
    }

    @Transactional
    public SaleData create(SaleBody saleBody) {
        var sale = this.saleMapper.toModel(saleBody);
        this.campService.genStatus(sale);
        sale.getUnits().forEach(u -> {
            u.setSale(sale);
            u.setProduct(productRepo
                    .findById(u.getProduct().getId())
                    .orElseThrow(() -> new NotFoundError("Product")));
        });

        var newSale = this.saleRepo.save(sale);

        if (newSale.hasStatus(Status.ONGOING)) {
            newSale.getUnits().forEach(u -> {
                this.productService.applySaleUnit(u);
            });
        }

        return this.saleMapper.toData(newSale);
    }

    @Transactional
    public SaleData update(long id, SaleBody body) {
        var editModel = this.saleRepo
                .findById(id)
                .orElseThrow(() -> new NotFoundError("Sale"));
        this.saleMapper.toModel(body, editModel);
        this.campService.genStatus(editModel);

        var model = this.saleRepo.save(editModel);
        return this.saleMapper.toData(model);
    }

    @Transactional
    public void remove(long id) {
        var sale = this.saleRepo
                .findById(id)
                .orElseThrow(() -> new NotFoundError("Sale"));

        var ongoingSale = sale.hasStatus(Status.ONGOING);
        List<Product> cancelProducts = sale.getUnits().stream()
                .filter(u -> u.isOn())
                .map(u -> u.getProduct()).toList();

        this.campaignRepo.delete(sale);

        if (ongoingSale) {
            cancelProducts.forEach(p -> {
                this.productService.cancelSaleUnit(p);
            });
        }
    }

    public void removeAndCancelSaleUnit(long id) {
        var sale = this.saleRepo
                .findById(id)
                .orElseThrow(() -> new NotFoundError("Sale"));

        var ongoingSale = sale.hasStatus(Status.ONGOING);
        List<Product> cancelProducts = sale.getUnits().stream()
                .filter(u -> u.isOn())
                .map(u -> u.getProduct()).toList();

        this.campaignRepo.delete(sale);

        if (ongoingSale) {
            cancelProducts.forEach(p -> {
                this.productService.cancelSaleUnit(p);
            });
        }
    }
}
