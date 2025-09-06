package com.dino.back_end_for_TTECH.product.application.mapper;

import com.dino.back_end_for_TTECH.product.application.model.SkuToWrite;
import com.dino.back_end_for_TTECH.product.domain.Sku;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ISkuMapper {
    @Mapping(target = "inventory", ignore = true)
    void toSku(SkuToWrite dto, @MappingTarget Sku entity);
}
