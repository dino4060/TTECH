package com.dino.back_end_for_TTECH.identity.application.mapper;

import com.dino.back_end_for_TTECH.identity.application.model.CurrentShopRes;
import com.dino.back_end_for_TTECH.identity.application.model.CurrentUserRes;
import com.dino.back_end_for_TTECH.profile.domain.User;
import com.dino.back_end_for_TTECH.profile.domain.Shop;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface IAuthMapper {

    CurrentUserRes toCurrentUserRes(User user);

    CurrentShopRes toCurrentShopRes(Shop shop);
}
