package com.dino.back_end_for_TTECH.infrastructure.common.config;

import com.dino.back_end_for_TTECH.features.identity.application.service.IAuthServiceForAdmin;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@AllArgsConstructor
@Slf4j
public class AppInitConfig {
    @Bean
    ApplicationRunner applicationRunner(IAuthServiceForAdmin authService) {
        return args -> {
            authService.initAdmin();
        };
    }
}
