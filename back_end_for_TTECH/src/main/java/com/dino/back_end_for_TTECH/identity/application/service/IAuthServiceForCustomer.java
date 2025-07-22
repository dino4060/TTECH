package com.dino.back_end_for_TTECH.identity.application.service;

import com.dino.back_end_for_TTECH.identity.application.model.AuthGoogleReq;
import com.dino.back_end_for_TTECH.identity.application.model.AuthRes;
import com.dino.back_end_for_TTECH.identity.application.model.LookupEmailRes;
import com.dino.back_end_for_TTECH.identity.application.model.RegisterBody;
import com.dino.back_end_for_TTECH.identity.application.pattern.IAuthTemplate;
import org.springframework.http.HttpHeaders;

public interface IAuthServiceForCustomer extends IAuthTemplate {

    // QUERY //

    LookupEmailRes lookupEmail(String email);

    // COMMAND //

    AuthRes loginOrSignup(AuthGoogleReq request, HttpHeaders headers);

    AuthRes register(RegisterBody body, HttpHeaders headers);
}
