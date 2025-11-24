package com.dino.back_end_for_TTECH.features.ordering.application.mapper;

import com.dino.back_end_for_TTECH.features.ordering.application.model.CartData;
import com.dino.back_end_for_TTECH.features.ordering.application.model.CartLineData;
import com.dino.back_end_for_TTECH.features.ordering.domain.Cart;
import com.dino.back_end_for_TTECH.features.ordering.domain.CartLine;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CartMapper {

    CartLineData toLineData(CartLine line);

    CartData toCartData(Cart cart);
}