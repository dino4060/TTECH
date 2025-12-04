package com.dino.back_end_for_TTECH.features.shipping;

import com.dino.back_end_for_TTECH.features.profile.domain.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AddressMapper {

    @Mapping(source = "user.name", target = "userName")
    AddressData toData(User user);
}
