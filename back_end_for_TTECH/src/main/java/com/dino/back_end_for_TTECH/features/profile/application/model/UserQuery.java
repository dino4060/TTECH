package com.dino.back_end_for_TTECH.features.profile.application.model;

import com.dino.back_end_for_TTECH.shared.application.model.PageQuery;
import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.FieldDefaults;

@EqualsAndHashCode(callSuper = true)
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserQuery extends PageQuery {
    Long id;
    String name;
    String email;
    String phone;
    String username;
}