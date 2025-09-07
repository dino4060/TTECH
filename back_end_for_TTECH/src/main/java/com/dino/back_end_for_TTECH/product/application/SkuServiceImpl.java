package com.dino.back_end_for_TTECH.product.application;

import com.dino.back_end_for_TTECH.inventory.application.service.IInventoryService;
import com.dino.back_end_for_TTECH.product.application.model.SkuToWrite;
import com.dino.back_end_for_TTECH.product.application.service.ISkuService;
import com.dino.back_end_for_TTECH.product.domain.Product;
import com.dino.back_end_for_TTECH.product.domain.Sku;
import com.dino.back_end_for_TTECH.product.domain.repository.ISkuRepository;
import com.dino.back_end_for_TTECH.shared.domain.exception.AppException;
import com.dino.back_end_for_TTECH.shared.domain.exception.ErrorCode;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class SkuServiceImpl implements ISkuService {

    IInventoryService inventoryService;

    ISkuRepository skuRepository;

    // HELPERS //

    private void cascadeSku(Sku sku) {
        this.inventoryService.create(sku);
    }

    // DOMAIN //

    @Override
    public Sku getSku(Long skuId) {
        return this.findSku(skuId)
                .orElseThrow(() -> new AppException(ErrorCode.SKU__FIND_FAILED));
    }

    @Override
    public Optional<Sku> findSku(Long skuId) {
        return this.skuRepository.findById(skuId);
    }

    @Override
    public String getPhoto(Sku sku) {
        try {
            // tierVariations is single => return product thumb
            var tierVariations = sku.getProduct().getTierVariations();
            if (CollectionUtils.isEmpty(tierVariations))
                return sku.getProduct().getThumb();

            // get tierOptionPhotos
            var tierOptionIndexes = Sku.createTierOptionIndexes(sku.getTierOptionIndexes(), tierVariations);
            var tierOptionPhotos = new ArrayList<String>();

            for (int tierIdx = 0; tierIdx < tierOptionIndexes.size(); tierIdx++) {
                var optionIdx = tierOptionIndexes.get(tierIdx);
                var options = tierVariations.get(tierIdx).getOptions();

                var photo = options.get(optionIdx).getPhoto();
                tierOptionPhotos.add(photo);
            }

            // get sku photo
            return tierOptionPhotos.stream()
                    .filter(Objects::nonNull)
                    .findFirst()
                    .orElse(sku.getProduct().getThumb());

        } catch (AppException e) {
            log.warn("Sku.tierOptionIndexes is invalid {}: {}", sku.getId(), e.getMessage());
            return sku.getProduct().getThumb();
        }
    }

    @Override
    public void createList(Product product) {
        for (Sku sku : product.getSkus()) {
            sku.setProduct(product);

            this.inventoryService.create(sku);

            sku.create();
        }
    }

    @Override
    public void updateList(List<Sku> skus, List<SkuToWrite> bodies) {
        int i = 0;
        for (var sku : skus) {
            var inventory = sku.getInventory();
            var inventoryBody = bodies.get(i).inventory();

            this.inventoryService.restock(inventory, inventoryBody);

            sku.update();
            i++;
        }

        this.skuRepository.saveAll(skus);
    }
}
