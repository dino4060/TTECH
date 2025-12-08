package com.dino.back_end_for_TTECH.features.profile.application.mapper;

import com.dino.back_end_for_TTECH.features.profile.application.model.UserBody;
import com.dino.back_end_for_TTECH.features.profile.application.model.UserData;
import com.dino.back_end_for_TTECH.features.profile.application.model.UserQuery;
import com.dino.back_end_for_TTECH.features.profile.domain.User;
import com.dino.back_end_for_TTECH.features.profile.domain.specification.UserSpec;
import com.dino.back_end_for_TTECH.shared.application.mapper.PageMapper;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.jpa.domain.Specification;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper extends PageMapper {

    default Specification<User> toQueryable(UserQuery query) {
        return UserSpec.fromQuery(query);
    }

    void toModel(UserBody body, @MappingTarget User model);

    UserData toData(User user);
}
