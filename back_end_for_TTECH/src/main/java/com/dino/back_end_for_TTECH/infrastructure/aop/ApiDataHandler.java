package com.dino.back_end_for_TTECH.infrastructure.aop;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

@ControllerAdvice
public class ApiDataHandler implements ResponseBodyAdvice<Object> {
    @Override
    public boolean supports(
            @NonNull MethodParameter returnType,
            @NonNull  Class<? extends HttpMessageConverter<?>> converterType) {
        return true;
    }

    @Override
    public Object beforeBodyWrite(
            @Nullable Object body,
            @NonNull MethodParameter returnType,
            @NonNull MediaType selectedContentType,
            @NonNull Class<? extends HttpMessageConverter<?>> selectedConverterType,
            @NonNull ServerHttpRequest request,
            @NonNull ServerHttpResponse response) {
        // case: body is a string
        if (!MediaType.APPLICATION_JSON.equals(selectedContentType))
            return body;
        // case: throw exception
        HttpServletResponse servletResponse = ((ServletServerHttpResponse) response).getServletResponse();
        int apiCode = servletResponse.getStatus();
        if (apiCode >= 400)
            return body;
        // case: swagger
        String path = request.getURI().getPath();
        if (path.startsWith("/v3/api-docs") || path.startsWith("/swagger-ui"))
            return body;
        // case: success
        return ApiResponse.builder()
                .success(true)
                .status(200)
                .code(1)
                .data(body)
                .build();
    }
}
