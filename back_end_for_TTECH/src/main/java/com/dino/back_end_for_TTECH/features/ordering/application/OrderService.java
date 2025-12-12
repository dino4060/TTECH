package com.dino.back_end_for_TTECH.features.ordering.application;

import com.dino.back_end_for_TTECH.features.ordering.application.mapper.OrderMapper;
import com.dino.back_end_for_TTECH.features.ordering.application.model.OrderBody;
import com.dino.back_end_for_TTECH.features.ordering.application.model.OrderData;
import com.dino.back_end_for_TTECH.features.ordering.application.model.OrderEditBody;
import com.dino.back_end_for_TTECH.features.ordering.application.model.OrderQuery;
import com.dino.back_end_for_TTECH.features.ordering.domain.Order;
import com.dino.back_end_for_TTECH.features.ordering.domain.OrderLine;
import com.dino.back_end_for_TTECH.features.ordering.domain.model.PaymentType;
import com.dino.back_end_for_TTECH.features.ordering.domain.model.Status;
import com.dino.back_end_for_TTECH.features.ordering.domain.repository.OrderRepository;
import com.dino.back_end_for_TTECH.features.ordering.domain.specification.OrderSpecification;
import com.dino.back_end_for_TTECH.shared.api.model.CurrentUser;
import com.dino.back_end_for_TTECH.shared.application.exception.ModelNotFoundE;
import com.dino.back_end_for_TTECH.shared.application.exception.ModelForbiddenE;
import com.dino.back_end_for_TTECH.shared.application.exception.NotFoundE;
import com.dino.back_end_for_TTECH.shared.application.model.PageData;
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
    OrderRepository orderRepository;
    OrderMapper orderMapper;

    private void genStatus(Order order) {
        if (order.getPaymentType().equals(PaymentType.COD.name()))
            order.setStatus(Status.PENDING);
        if (order.getPaymentType().equals(PaymentType.BANK.name()))
            order.setStatus(Status.UNPAID);
    }

    public AppPage<OrderData> list(OrderQuery query, Pageable pageable) {
        var queryable = OrderSpecification.build(query);
        var page = this.orderRepository.findAll(queryable, pageable);

        var items = page.getContent().stream()
                .map(model -> this.orderMapper.toData(model)).toList();

        return AppPage.from(page, items);
    }

    public OrderData get(long orderId) {
        var order = this.orderRepository
                .findById(orderId)
                .orElseThrow(() -> new NotFoundE("Order not found"));


        return  this.orderMapper.toData(order);
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
        this.genStatus(newOrder);

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

    public OrderData editPartially(OrderEditBody body, CurrentUser buyer) {
        var editOrder = this.orderRepository
                .findById(body.getId())
                .orElseThrow(() -> new ModelNotFoundE("Order"));

        if (!editOrder.getBuyer().getId().equals(buyer.id())) {
            throw new ModelForbiddenE("Order");
        }

        if (body.getStatus() != null) {
            editOrder.setStatus(body.getStatus());
        }
        if (body.getParcelCode() != null) {
            editOrder.setParcelCode(body.getParcelCode());
        }

        var order = this.orderRepository.save(editOrder);
        return this.orderMapper.toData(order);
    }
}
