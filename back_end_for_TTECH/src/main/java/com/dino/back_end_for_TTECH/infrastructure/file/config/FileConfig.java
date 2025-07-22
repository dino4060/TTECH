package com.dino.back_end_for_TTECH.infrastructure.file.config;

import com.dino.back_end_for_TTECH.infrastructure.common.Env;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class FileConfig implements WebMvcConfigurer {

    private final Env env;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
                .addResourceHandler(this.env.FILE_ENDPOINT)
                .addResourceLocations(this.env.FILE_LOCATION);
    }
}
