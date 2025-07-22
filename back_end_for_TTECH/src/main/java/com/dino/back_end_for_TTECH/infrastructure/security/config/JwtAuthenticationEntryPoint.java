package com.dino.back_end_for_TTECH.infrastructure.security.config;

import com.dino.back_end_for_TTECH.shared.domain.exception.ErrorCode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;

/**
 * handle exception threw at Spring Security Filter Chain, specifically
 * unauthenticated
 */
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse httpResponse,
            AuthenticationException authException)
            throws IOException, ServletException {
        ErrorCode exceptionCode = ErrorCode.SECURITY__UNAUTHENTICATED;
        // define an httpResponse
        httpResponse.setContentType(MediaType.APPLICATION_JSON_VALUE);
        httpResponse.setStatus(exceptionCode.getStatus().value());
        // define an apiResponse
        ApiResClone<?> apiRes = ApiResClone.builder()
                .success(false)
                .status(exceptionCode.getStatus().value())
                .code(exceptionCode.getCode())
                .error(exceptionCode.getMessage())
                .build();
        // write httpResponse and apiResponse to buffet that will be sent to client
        ObjectMapper objectMapper = new ObjectMapper();
        httpResponse.getWriter().write(objectMapper.writeValueAsString(apiRes));
        httpResponse.flushBuffer();

    }

    @Builder
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE)
    private static class ApiResClone<T> {
        boolean success;
        int status;
        int code;
        String error;
        T data;
    }
}
