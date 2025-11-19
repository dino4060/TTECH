package com.dino.back_end_for_TTECH.features.product.application.mapper;

import com.dino.back_end_for_TTECH.features.product.application.model.ProductBody;
import com.dino.back_end_for_TTECH.features.product.application.model.StockBody;
import com.dino.back_end_for_TTECH.shared.application.mapper.PageMapper;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface IStockMapper extends PageMapper {

    StockBody toStockBody(ProductBody parent);
}
