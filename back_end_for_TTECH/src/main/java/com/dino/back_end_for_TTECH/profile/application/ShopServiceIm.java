package com.dino.back_end_for_TTECH.profile.application;

import com.dino.back_end_for_TTECH.profile.application.model.VerifyShopReq;
import com.dino.back_end_for_TTECH.profile.application.model.VerifyShopRes;
import com.dino.back_end_for_TTECH.profile.application.service.IShopService;
import com.dino.back_end_for_TTECH.profile.application.service.IUserService;
import com.dino.back_end_for_TTECH.profile.domain.Shop;
import com.dino.back_end_for_TTECH.profile.domain.User;
import com.dino.back_end_for_TTECH.profile.domain.model.ShopStatus;
import com.dino.back_end_for_TTECH.profile.domain.repository.IShopRepository;
import com.dino.back_end_for_TTECH.shared.api.model.CurrentUser;
import com.dino.back_end_for_TTECH.shared.domain.exception.AppException;
import com.dino.back_end_for_TTECH.shared.domain.exception.ErrorCode;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ShopServiceIm implements IShopService {

    IShopRepository shopRepository;
    IUserService userService;

    @Override
    public Shop getShop(@NonNull Long sellerId) {
        return this.shopRepository.findBySellerId(sellerId)
                .orElseThrow(() -> new AppException(ErrorCode.SHOP__NOT_FOUND));
    }

    @Override
    public void createShop(User seller) {
        Shop shop = Shop.createShop(seller);
        this.shopRepository.save(shop);
    }

    @Override
    public VerifyShopRes verifyShop(VerifyShopReq request, CurrentUser currentUser) {
        Shop shopToUpdate = this.getShop(currentUser.id());

        shopToUpdate.maskAsReviewing(
                request.businessType(), request.name(), request.contactEmail(), request.contactPhone()
        );
        shopToUpdate.maskAsLive(); // TEMP: maskAsLive

        Shop shop = this.shopRepository.save(shopToUpdate);

        return new VerifyShopRes(shop.getStatus() == ShopStatus.LIVE);
    }
}
