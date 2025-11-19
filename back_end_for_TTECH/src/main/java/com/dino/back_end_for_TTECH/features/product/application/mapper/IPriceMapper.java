package com.dino.back_end_for_TTECH.features.product.application.mapper;

import com.dino.back_end_for_TTECH.features.product.application.model.PriceBody;
import com.dino.back_end_for_TTECH.features.product.application.model.ProductBody;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface IPriceMapper {

    PriceBody toPriceBody(ProductBody body);
}
