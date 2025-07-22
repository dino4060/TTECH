package com.dino.back_end_for_TTECH.profile.application.service;

import com.dino.back_end_for_TTECH.profile.application.model.VerifyShopReq;
import com.dino.back_end_for_TTECH.profile.application.model.VerifyShopRes;
import com.dino.back_end_for_TTECH.profile.domain.Shop;
import com.dino.back_end_for_TTECH.profile.domain.User;
import com.dino.back_end_for_TTECH.shared.api.model.CurrentUser;
import lombok.NonNull;

public interface IShopService {
    Shop getShop(@NonNull Long sellerId);

    void createShop(User seller);

    VerifyShopRes verifyShop(VerifyShopReq request, CurrentUser currentUser);
}
