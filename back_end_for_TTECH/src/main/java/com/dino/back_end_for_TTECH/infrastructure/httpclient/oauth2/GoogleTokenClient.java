package com.dino.back_end_for_TTECH.infrastructure.httpclient.oauth2;

import com.dino.back_end_for_TTECH.infrastructure.security.model.GoogleTokenRequest;
import com.dino.back_end_for_TTECH.infrastructure.security.model.GoogleTokenResponse;
import feign.QueryMap;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "oauth2-google-client", url = "https://oauth2.googleapis.com")
public interface GoogleTokenClient {

    @PostMapping(value = "/token", produces = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    GoogleTokenResponse getToken(
            @QueryMap GoogleTokenRequest request);
}
