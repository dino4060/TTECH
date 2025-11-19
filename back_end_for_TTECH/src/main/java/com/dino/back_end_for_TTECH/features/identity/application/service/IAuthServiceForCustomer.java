package com.dino.back_end_for_TTECH.features.identity.application.service;

import com.dino.back_end_for_TTECH.features.identity.application.model.AuthRes;
import com.dino.back_end_for_TTECH.features.identity.application.model.RegisterBody;
import com.dino.back_end_for_TTECH.features.identity.application.pattern.IAuthTemplate;
import org.springframework.http.HttpHeaders;

public interface IAuthServiceForCustomer extends IAuthTemplate {
    // WRITE //

    AuthRes registerCustomer(RegisterBody body, HttpHeaders headers);
}
