package com.dino.back_end_for_TTECH.profile.application.service;

import com.dino.back_end_for_TTECH.profile.domain.Address;
import com.dino.back_end_for_TTECH.shared.api.model.CurrentUser;

public interface IAddressService {
    // QUERY //

    Address getDefault(CurrentUser currentUser);

    Address getDefault(Long userId);
}
