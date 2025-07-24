package com.dino.back_end_for_TTECH.identity.application.pattern;

import com.dino.back_end_for_TTECH.identity.application.model.*;
import org.springframework.http.HttpHeaders;

public interface IAuthTemplate {
    // COMMAND //

    AuthRes login(ILoginBodyStrategy body, HttpHeaders headers);
}
