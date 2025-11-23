package com.dino.back_end_for_TTECH.features.promotion.application.mapper;

import com.dino.back_end_for_TTECH.features.promotion.application.model.SaleBody;
import com.dino.back_end_for_TTECH.features.promotion.application.model.SaleData;
import com.dino.back_end_for_TTECH.features.promotion.domain.Sale;
import com.dino.back_end_for_TTECH.shared.application.mapper.PageMapper;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface SaleMapper extends PageMapper {

    Sale toModel(SaleBody body);

    SaleData toData(Sale model);
}
