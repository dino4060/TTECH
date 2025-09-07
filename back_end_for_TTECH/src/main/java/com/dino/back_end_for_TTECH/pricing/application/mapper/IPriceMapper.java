package com.dino.back_end_for_TTECH.pricing.application.mapper;

import com.dino.back_end_for_TTECH.pricing.application.model.PriceToWrite;
import com.dino.back_end_for_TTECH.pricing.domain.Price;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface IPriceMapper {
    void toPrice(PriceToWrite body, @MappingTarget Price target);
}
