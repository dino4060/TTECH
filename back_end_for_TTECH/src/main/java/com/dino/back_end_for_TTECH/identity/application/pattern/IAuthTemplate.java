package com.dino.back_end_for_TTECH.identity.application.pattern;

import com.dino.back_end_for_TTECH.identity.application.model.AuthEmailReq;
import com.dino.back_end_for_TTECH.identity.application.model.AuthRes;
import com.dino.back_end_for_TTECH.identity.application.model.CurrentUserRes;
import com.dino.back_end_for_TTECH.shared.api.model.CurrentUser;
import org.springframework.http.HttpHeaders;

public interface IAuthTemplate {

    // QUERY //

    CurrentUserRes getCurrentUser(CurrentUser currentUser);

    // COMMAND //

    AuthRes login(AuthEmailReq request, HttpHeaders headers);

    AuthRes signup(AuthEmailReq request, HttpHeaders headers);

    AuthRes refresh(String refreshToken, HttpHeaders headers);

    AuthRes logout(String refreshToken, HttpHeaders headers);

}
