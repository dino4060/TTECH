package com.dino.back_end_for_TTECH.identity.application.pattern;

import com.dino.back_end_for_TTECH.identity.application.model.AuthRes;
import com.dino.back_end_for_TTECH.identity.application.model.LoginPhoneBody;
import org.springframework.http.HttpHeaders;

public interface IAuthTemplate {
    // COMMAND //

    AuthRes login(LoginPhoneBody request, HttpHeaders headers);
}
