package com.dino.back_end_for_TTECH.features.ordering.application;

import com.dino.back_end_for_TTECH.features.ordering.application.mapper.IOrderMapper;
import com.dino.back_end_for_TTECH.features.ordering.application.model.OrderBody;
import com.dino.back_end_for_TTECH.features.ordering.application.model.OrderData;
import com.dino.back_end_for_TTECH.features.ordering.application.model.OrderQuery;
import com.dino.back_end_for_TTECH.features.ordering.domain.Order;
import com.dino.back_end_for_TTECH.features.ordering.domain.OrderLine;
import com.dino.back_end_for_TTECH.features.ordering.domain.model.Status;
import com.dino.back_end_for_TTECH.features.ordering.domain.repository.IOrderRepository;
import com.dino.back_end_for_TTECH.features.ordering.domain.specification.OrderSpecification;
import com.dino.back_end_for_TTECH.shared.api.model.CurrentUser;
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
    IOrderMapper orderMapper;

    public AppPage<OrderData> list(OrderQuery query, Pageable pageable) {
        var queryable = OrderSpecification.build(query);
        var page = this.orderRepository.findAll(queryable, pageable);

        var items = page.getContent().stream()
                .map(model -> this.orderMapper.toData(model)).toList();

        return AppPage.from(page, items);
    }

    public AppPage<OrderData> list(Pageable pageable, CurrentUser user) {
        var page = this.orderRepository.findAllByBuyer(user.toUser(), pageable);

        var items = page.getContent().stream()
                .map(model -> this.orderMapper.toData(model)).toList();

        return AppPage.from(page, items);
    }

    public Order checkout(OrderBody body, CurrentUser user) {
        var model = this.orderMapper.toModel(body);
        model.setBuyer(user.toUser());
        model.setOrderTime(Instant.now());
        model.setStatus(Status.PENDING.toString());

        var cart = this.cartService.get(user);

        cart.getLines().forEach(cartLine -> {
            OrderLine orderLine = new OrderLine();

            var quantity = cartLine.getQuantity();
            var product = cartLine.getProduct();
            var price = product.getPrice();
            var inventory = product.getStock();

            orderLine.setOrder(model);
            orderLine.newQuantity(cartLine.getQuantity());
            orderLine.setProduct(product);
            orderLine.newMainPrice(price.getMainPrice());
            orderLine.newSidePrice(price.getSidePrice());

            model.getLines().add(orderLine);
            inventory.reserve(quantity);
        });

        cart.getLines().clear();

        var result = this.orderRepository.save(model);
        return result;
    }
}
