package com.dino.back_end_for_TTECH.features.shipping;

import com.dino.back_end_for_TTECH.features.profile.domain.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AddressMapper {

    AddressData toData(User user);
}
