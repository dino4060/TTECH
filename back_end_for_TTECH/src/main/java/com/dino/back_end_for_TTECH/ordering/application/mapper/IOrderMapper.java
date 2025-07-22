package com.dino.back_end_for_TTECH.ordering.application.mapper;

import com.dino.back_end_for_TTECH.ordering.application.model.DraftOrderRes;
import com.dino.back_end_for_TTECH.ordering.application.model.OrderItemRes;
import com.dino.back_end_for_TTECH.ordering.domain.Order;
import com.dino.back_end_for_TTECH.ordering.domain.OrderItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface IOrderMapper {

    @Mapping(source = "orderItem.sku.product", target = "product")
    OrderItemRes toOrderItemRes(OrderItem orderItem);

    DraftOrderRes toDraftOrderRes(Order order);
}
