package com.dino.back_end_for_TTECH.identity.application.provider;

import com.dino.back_end_for_TTECH.identity.application.model.GoogleUserRes;

public interface IIdentityOauth2Provider {

    GoogleUserRes authViaGoogle(String code);
}
