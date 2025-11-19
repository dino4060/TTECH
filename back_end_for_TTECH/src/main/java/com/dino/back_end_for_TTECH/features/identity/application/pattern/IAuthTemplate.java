package com.dino.back_end_for_TTECH.features.identity.application.pattern;

import com.dino.back_end_for_TTECH.features.identity.application.model.AuthRes;
import org.springframework.http.HttpHeaders;

public interface IAuthTemplate {
    // COMMAND //

    AuthRes login(ILoginBodyStrategy body, HttpHeaders headers);
}
