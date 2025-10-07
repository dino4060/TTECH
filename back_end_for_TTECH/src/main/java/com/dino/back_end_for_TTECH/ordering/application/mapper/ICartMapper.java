package com.dino.back_end_for_TTECH.ordering.application.mapper;

import com.dino.back_end_for_TTECH.ordering.application.model.CartData;
import com.dino.back_end_for_TTECH.ordering.application.model.CartLineData;
import com.dino.back_end_for_TTECH.ordering.domain.Cart;
import com.dino.back_end_for_TTECH.ordering.domain.CartLine;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ICartMapper {

    @Mapping(source = "cartLine.sku.product", target = "product")
    @Mapping(source = "cartLine.sku.price", target = "price")
    CartLineData toCartLineData(CartLine cartLine);

    CartData toCartData(Cart cart, List<CartLineData> cartLines);

    default CartData customCartData(Cart cart) {
        return toCartData(
                cart,
                cart.getCartLines().stream()
                        .map(line -> toCartLineData(line))
                        .toList()
        );
    }
}