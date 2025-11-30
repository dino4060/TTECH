package com.dino.back_end_for_TTECH.features.ordering.application;

import com.dino.back_end_for_TTECH.features.ordering.application.mapper.OrderMapper;
import com.dino.back_end_for_TTECH.features.ordering.application.model.OrderBody;
import com.dino.back_end_for_TTECH.features.ordering.application.model.OrderData;
import com.dino.back_end_for_TTECH.features.ordering.application.model.OrderQuery;
import com.dino.back_end_for_TTECH.features.ordering.domain.Order;
import com.dino.back_end_for_TTECH.features.ordering.domain.OrderLine;
import com.dino.back_end_for_TTECH.features.ordering.domain.model.Status;
import com.dino.back_end_for_TTECH.features.ordering.domain.repository.IOrderRepository;
import com.dino.back_end_for_TTECH.features.ordering.domain.specification.OrderSpecification;
import com.dino.back_end_for_TTECH.shared.api.model.CurrentUser;
import com.dino.back_end_for_TTECH.shared.application.model.PageData;
import com.dino.back_end_for_TTECH.shared.application.model.PageQuery;
import com.dino.back_end_for_TTECH.shared.application.utils.AppPage;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class OrderService {

    CartService cartService;
    IOrderRepository orderRepository;
    OrderMapper orderMapper;

    public AppPage<OrderData> list(OrderQuery query, Pageable pageable) {
        var queryable = OrderSpecification.build(query);
        var page = this.orderRepository.findAll(queryable, pageable);

        var items = page.getContent().stream()
                .map(model -> this.orderMapper.toData(model)).toList();

        return AppPage.from(page, items);
    }

    public PageData<OrderData> list(OrderQuery query, CurrentUser user) {
        var page = this.orderRepository
                .findAllByBuyer(user.toUser(), this.orderMapper.toPageable(query));

        return this.orderMapper.toPageData(
                page, (Order o) -> this.orderMapper.toData(o));
    }

    public OrderData checkout(OrderBody body, CurrentUser user) {
        var newOrder = this.orderMapper.toModel(body);
        newOrder.setBuyer(user.toUser());
        newOrder.setOrderTime(Instant.now());
        newOrder.setStatus(Status.PENDING.toString());

        var cart = this.cartService.get(user);
        cart.getLines().forEach(cartLine -> {
            OrderLine orderLine = new OrderLine();

            var quantity = cartLine.getQuantity();
            var product = cartLine.getProduct();
            var price = product.getPrice();
            var stock = product.getStock();

            orderLine.setOrder(newOrder);
            orderLine.newQuantity(cartLine.getQuantity());
            orderLine.setProduct(product);
            orderLine.newMainPrice(price.getMainPrice());
            orderLine.newSidePrice(price.getSidePrice());

            newOrder.getLines().add(orderLine);
            stock.reserve(quantity);
        });
        cart.getLines().clear();

        var result = this.orderRepository.save(newOrder);
        return this.orderMapper.toData(result);
    }
}
