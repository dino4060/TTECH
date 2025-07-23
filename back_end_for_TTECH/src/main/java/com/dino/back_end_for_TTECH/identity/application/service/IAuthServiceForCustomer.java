package com.dino.back_end_for_TTECH.identity.application.service;

import com.dino.back_end_for_TTECH.identity.application.model.*;
import com.dino.back_end_for_TTECH.identity.application.pattern.IAuthTemplate;
import org.springframework.http.HttpHeaders;

public interface IAuthServiceForCustomer extends IAuthTemplate {
    // WRITE //

    AuthRes register(RegisterBody body, HttpHeaders headers);

    AuthRes login(LoginGoogleBody body, HttpHeaders headers);
}
