package com.dino.back_end_for_TTECH.infrastructure.httpclient.config;

import com.dino.back_end_for_TTECH.infrastructure.common.Const;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableFeignClients(basePackages = Const.INFRASTRUCTURE_PACKAGE)
public class HtttpClientConfig {
}
