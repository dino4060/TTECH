package com.dino.back_end_for_TTECH.identity.application;

import com.dino.back_end_for_TTECH.identity.application.mapper.IAuthMapper;
import com.dino.back_end_for_TTECH.identity.application.model.CurrentShopRes;
import com.dino.back_end_for_TTECH.identity.application.pattern.AuthFacade;
import com.dino.back_end_for_TTECH.identity.application.pattern.AuthTemplate;
import com.dino.back_end_for_TTECH.identity.application.service.IAuthServiceForSeller;
import com.dino.back_end_for_TTECH.identity.domain.model.Role;
import com.dino.back_end_for_TTECH.profile.application.service.IShopService;
import com.dino.back_end_for_TTECH.profile.domain.Shop;
import com.dino.back_end_for_TTECH.shared.api.model.CurrentUser;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AuthServiceImSeller extends AuthTemplate implements IAuthServiceForSeller {

    IShopService shopService;

    IAuthMapper authMapper;

    public AuthServiceImSeller(
            AuthFacade authFacade, IShopService shopService, IAuthMapper authMapper
    ) {
        super(authFacade);
        this.shopService = shopService;
        this.authMapper = authMapper;
    }

    @Override
    protected Role getRole() {
        return Role.SELLER;
    }

    // QUERY //

    // getCurrentShop //
    @Override
    public CurrentShopRes getCurrentShop(CurrentUser currentUser) {
        Shop shop = this.shopService.getShop(currentUser.id());

        return this.authMapper.toCurrentShopRes(shop);
    }
}
