package com.dino.back_end_for_TTECH.identity.application.service;

import com.dino.back_end_for_TTECH.features.identity.application.model.*;
import com.dino.back_end_for_TTECH.identity.application.model.CurrentShopRes;
import com.dino.back_end_for_TTECH.identity.application.pattern.IAuthTemplate;
import com.dino.back_end_for_TTECH.shared.api.model.CurrentUser;

public interface IAuthServiceForSeller extends IAuthTemplate {

    // QUERY //

    CurrentShopRes getCurrentShop(CurrentUser currentUser);
}
