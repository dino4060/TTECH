package com.dino.back_end_for_TTECH.features.profile.application.mapper;

import com.dino.back_end_for_TTECH.features.identity.application.model.CurrentUserRes;
import com.dino.back_end_for_TTECH.features.profile.application.model.UserBody;
import com.dino.back_end_for_TTECH.features.profile.domain.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
    void toModel(UserBody body, @MappingTarget User model);

    CurrentUserRes toCurrentUserRes(User user);
}
