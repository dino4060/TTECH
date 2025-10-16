package com.dino.back_end_for_TTECH.ordering.application.mapper;

import com.dino.back_end_for_TTECH.ordering.application.model.OrderBody;
import com.dino.back_end_for_TTECH.ordering.application.model.OrderData;
import com.dino.back_end_for_TTECH.ordering.application.model.OrderLineData;
import com.dino.back_end_for_TTECH.ordering.domain.Order;
import com.dino.back_end_for_TTECH.ordering.domain.OrderLine;
import com.dino.back_end_for_TTECH.product.application.model.ProductLeanRes;
import com.dino.back_end_for_TTECH.product.domain.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface IOrderMapper {

    Order toModel(OrderBody body);

    OrderData toData(Order model);

    @Mapping(source = "orderLine.sku.product", target = "product")
    OrderLineData toOrderLineData(OrderLine orderLine);

    default OrderData customData(Order model) {
        OrderData data = this.toData(model);
        model.getOrderLines().forEach(orderLine -> {
            OrderLineData orderLineData = this.toOrderLineData(orderLine);
            data.getOrderLines().add(orderLineData);
        });
        return data;
    }
}
