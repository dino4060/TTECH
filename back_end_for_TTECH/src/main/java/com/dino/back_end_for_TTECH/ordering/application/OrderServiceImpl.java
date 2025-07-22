package com.dino.back_end_for_TTECH.ordering.application;

import com.dino.back_end_for_TTECH.profile.domain.User;
import com.dino.back_end_for_TTECH.inventory.application.service.IInventoryService;
import com.dino.back_end_for_TTECH.ordering.application.service.IOrderService;
import com.dino.back_end_for_TTECH.ordering.domain.CartItem;
import com.dino.back_end_for_TTECH.ordering.domain.Order;
import com.dino.back_end_for_TTECH.ordering.domain.OrderItem;
import com.dino.back_end_for_TTECH.ordering.domain.model.OrderAddress;
import com.dino.back_end_for_TTECH.ordering.domain.model.OrderStatus;
import com.dino.back_end_for_TTECH.ordering.domain.model.PaymentMethod;
import com.dino.back_end_for_TTECH.ordering.domain.model.ShippingDetail;
import com.dino.back_end_for_TTECH.ordering.domain.repository.IOrderRepository;
import com.dino.back_end_for_TTECH.pricing.application.service.IPricingService;
import com.dino.back_end_for_TTECH.profile.domain.Shop;
import com.dino.back_end_for_TTECH.profile.application.service.IAddressService;
import com.dino.back_end_for_TTECH.shared.api.model.CurrentUser;
import com.dino.back_end_for_TTECH.shared.application.utils.Deleted;
import com.dino.back_end_for_TTECH.shared.domain.exception.AppException;
import com.dino.back_end_for_TTECH.shared.domain.exception.ErrorCode;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class OrderServiceImpl implements IOrderService {

    IInventoryService inventoryService;
    IPricingService pricingService;
    IAddressService addressService;
    IOrderRepository orderRepository;

    // DOMAIN //

    private ShippingDetail createShippingDetail() {
        var carrier = "Giao hàng tiêu chuẩn";
        var now = Instant.now();
        return ShippingDetail.createShippingDetail(
                carrier,
                now.plus(3, ChronoUnit.DAYS),
                now.plus(5, ChronoUnit.DAYS)
        );
    }

    private OrderAddress createOrderAddress(User user) {
        var userAddress = this.addressService.getDefault(user.getId());
        return OrderAddress.createOrderAddress(userAddress);
    }

    /*
     * createOrderItem.
     */
    private List<OrderItem> createOrderItems(List<CartItem> cartItems, CurrentUser currentUser) {
        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem cartItem : cartItems) {
            inventoryService.checkStock(cartItem.getSku().getId(), cartItem.getQuantity());

            var order = OrderItem.createOrderItem(cartItem.getSku(), cartItem.getQuantity());

            orderItems.add(order);
        }
        return orderItems;
    }

    // QUERY //

    @Override
    public List<Order> getOrdersByIds(List<Long> orderIds, CurrentUser currentUser) {
        List<Order> orders = this.orderRepository.findByIdIn(orderIds);

        orders.forEach(order -> {
            if (!order.getBuyer().getId().equals(currentUser.id()))
                throw new AppException(ErrorCode.ORDER__NOT_FOUND);
        });
        return orders;
    }

    // COMMAND //

    @Override
    public Order createDraftOrder(List<CartItem> cartItems, Shop shop, CurrentUser currentUser) {
        // 1. create props
        var orderItems = this.createOrderItems(cartItems, currentUser);
        var checkoutSnapshot = this.pricingService.checkoutOrder(orderItems);
        var shippingDetail = this.createShippingDetail();
        var buyer = currentUser.toUser();

        // 2. create order
        Order order = Order.createDraftOrder(orderItems, buyer, shop, checkoutSnapshot, shippingDetail);
        return orderRepository.save(order);
    }

    @Override
    public Order markAsPending(Order order) {
        // 1. create props
        var paymentMethod = PaymentMethod.COD;
        var note = "";
        var deliveryAddress = this.createOrderAddress(order.getBuyer());
        var pickupAddress = this.createOrderAddress(order.getShop().getSeller());

        // 2. update order
        order.markAsPending(paymentMethod, note, deliveryAddress, pickupAddress);
        return this.orderRepository.save(order);
    }

    @Override
    public Deleted cleanupDraftOrders(Duration orderTtl) {
        List<Order> draftOrders = this.orderRepository.findByStatus(OrderStatus.DRAFT);

        if (draftOrders.isEmpty()) {
            log.info(">>> No draft orders to clean up.");
            return Deleted.success();
        }

        var ordersToDelete = draftOrders.stream()
                .filter(order -> order.canDelete(orderTtl))
                .toList();

        this.orderRepository.deleteAll(ordersToDelete);

        log.info(">>> Cleaned up {} draft order.", ordersToDelete.size());
        return Deleted.success(ordersToDelete.size());
    }
}
