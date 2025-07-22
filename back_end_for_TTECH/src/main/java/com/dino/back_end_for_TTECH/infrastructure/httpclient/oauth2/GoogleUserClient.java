package com.dino.back_end_for_TTECH.infrastructure.httpclient.oauth2;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.dino.back_end_for_TTECH.identity.application.model.GoogleUserRes;

@FeignClient(name = "outbound-user-client", url = "https://www.googleapis.com")
public interface GoogleUserClient {

    @GetMapping(value = "/oauth2/v1/userinfo")
    GoogleUserRes getUser(
            @RequestParam("alt") String alt,
            @RequestParam("access_token") String accessToken);
}
