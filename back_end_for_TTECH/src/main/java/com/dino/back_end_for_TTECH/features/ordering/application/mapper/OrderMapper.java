package com.dino.back_end_for_TTECH.features.ordering.application.mapper;

import com.dino.back_end_for_TTECH.features.ordering.application.model.OrderBody;
import com.dino.back_end_for_TTECH.features.ordering.application.model.OrderData;
import com.dino.back_end_for_TTECH.features.ordering.application.model.OrderLineData;
import com.dino.back_end_for_TTECH.features.ordering.application.model.OrderQuery;
import com.dino.back_end_for_TTECH.features.ordering.domain.Order;
import com.dino.back_end_for_TTECH.features.ordering.domain.OrderLine;
import com.dino.back_end_for_TTECH.features.ordering.domain.specification.OrderSpecification;
import com.dino.back_end_for_TTECH.shared.application.mapper.PageMapper;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.jpa.domain.Specification;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface OrderMapper extends PageMapper {

    default Specification<Order> toQueryable(OrderQuery query) {
        return OrderSpecification.build(query);
    }

    Order toModel(OrderBody body);

    OrderData toData(Order model);

    OrderLineData toOrderLineData(OrderLine orderLine);

    default OrderData customData(Order model) {
        OrderData data = this.toData(model);
        model.getLines().forEach(line -> {
            OrderLineData orderLineData = this.toOrderLineData(line);
            data.getLines().add(orderLineData);
        });
        return data;
    }
}
