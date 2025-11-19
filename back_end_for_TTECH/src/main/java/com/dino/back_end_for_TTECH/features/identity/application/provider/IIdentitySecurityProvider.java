package com.dino.back_end_for_TTECH.features.identity.application.provider;

import java.util.Optional;

import com.dino.back_end_for_TTECH.features.identity.application.model.TokenPair;
import com.dino.back_end_for_TTECH.features.profile.domain.User;
import com.dino.back_end_for_TTECH.shared.application.utils.Id;

public interface IIdentitySecurityProvider {
    // PASSWORD //
    String hashPassword(String plain);

    boolean matchPassword(String plain, String hash);

    // JWT //
    TokenPair genTokenPair(User user);

    Optional<Id> verifyRefreshToken(String refreshToken);
}
