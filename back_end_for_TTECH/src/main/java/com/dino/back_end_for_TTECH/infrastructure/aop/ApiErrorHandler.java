package com.dino.back_end_for_TTECH.infrastructure.aop;

import com.dino.back_end_for_TTECH.shared.application.exception.BadRequestE;
import com.dino.back_end_for_TTECH.shared.application.exception.DuplicationE;
import com.dino.back_end_for_TTECH.shared.application.exception.NotFoundE;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import com.dino.back_end_for_TTECH.shared.domain.exception.AppException;
import com.dino.back_end_for_TTECH.shared.domain.exception.ErrorCode;

import java.util.Optional;

@ControllerAdvice
@Slf4j
public class ApiErrorHandler {
    /**
     * Handle custom exception
     */
    @ExceptionHandler(value = BadRequestE.class)
    ResponseEntity<ApiResponse<Object>> handleException(BadRequestE e) {
        return ResponseEntity
                .status(e.getStatusCode())
                .body(ApiResponse.builder()
                        .success(false)
                        .status(e.getStatusCode().value())
                        .code(e.getStatusCode().value())
                        .error(e.getReason())
                        .build());
    }

    @ExceptionHandler(value = NotFoundE.class)
    ResponseEntity<ApiResponse<Object>> handleException(NotFoundE e) {
        return ResponseEntity
                .status(e.getStatusCode())
                .body(ApiResponse.builder()
                        .success(false)
                        .status(e.getStatusCode().value())
                        .code(e.getStatusCode().value())
                        .error(e.getReason())
                        .build());
    }


    @ExceptionHandler(value = DuplicationE.class)
    ResponseEntity<ApiResponse<Object>> handleException(DuplicationE e) {
        return ResponseEntity
                .status(e.getStatusCode())
                .body(ApiResponse.builder()
                        .success(false)
                        .status(e.getStatusCode().value())
                        .code(e.getStatusCode().value())
                        .error(e.getReason())
                        .build());
    }



    /**
     * Handle app exception in the service tier
     */
    @ExceptionHandler(value = AppException.class)
    ResponseEntity<ApiResponse<Object>> handleException(AppException exception) {
        log.warn(">>> AppException: {}, {}", exception.getCode(), exception.getMessage());
        return ResponseEntity
                .status(exception.getStatus())
                .body(ApiResponse.builder()
                        .success(false)
                        .status(exception.getStatus().value())
                        .code(exception.getCode())
                        .error(exception.getMessage())
                        .build());
    }

    /**
     * Handle unhandled app exception
     */

    @ExceptionHandler(value = RuntimeException.class)
    ResponseEntity<ApiResponse<Object>> handleException(RuntimeException exception) {
        log.error(">>> INTERNAL: unhandled exception occurred", exception);
        ErrorCode error = ErrorCode.SYSTEM__UNHANDLED_EXCEPTION;
        return ResponseEntity
                .status(error.getStatus())
                .body(ApiResponse.builder()
                        .success(false)
                        .status(error.getStatus().value())
                        .code(error.getCode())
                        .error(error.getMessage())
                        .build());
    }

    /**
     * Handle exception in the validation tier
     */

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    ResponseEntity<ApiResponse<Object>> handleException(MethodArgumentNotValidException exception) {
        String key = Optional.ofNullable(exception.getFieldError())
                .map(FieldError::getDefaultMessage)
                .orElse(ErrorCode.SYSTEM__VALIDATION_UNSUPPORTED.name());

        ErrorCode error = ErrorCode.safeValueOf(key)
                .orElse(ErrorCode.SYSTEM__VALIDATION_UNSUPPORTED);

        return ResponseEntity
                .status(error.getStatus())
                .body(ApiResponse.builder()
                        .success(false)
                        .status(error.getStatus().value())
                        .code(error.getCode())
                        .error(error.getMessage())
                        .build());
    }

    /**
     * Handle exception in the spring security tier
     */

    @ExceptionHandler(value = AccessDeniedException.class)
    ResponseEntity<ApiResponse<Object>> handleException(AccessDeniedException exception) {
        ErrorCode error = ErrorCode.SECURITY__UNAUTHORIZED;
        return ResponseEntity
                .status(error.getStatus())
                .body(ApiResponse.builder()
                        .success(false)
                        .status(error.getStatus().value())
                        .code(error.getCode())
                        .error(error.getMessage())
                        .build());
    }

    /**
     * Handle exception in the web layer
     */

    @ExceptionHandler(value = HttpRequestMethodNotSupportedException.class)
    ResponseEntity<ApiResponse<Object>> handleException(HttpRequestMethodNotSupportedException exception) {
        ErrorCode error = ErrorCode.SYSTEM__METHOD_NOT_SUPPORTED;
        return ResponseEntity
                .status(error.getStatus())
                .body(ApiResponse.builder()
                        .success(false)
                        .status(error.getStatus().value())
                        .code(error.getCode())
                        .error(String.format(error.getMessage(), exception.getMethod()))
                        .build());
    }

    @ExceptionHandler(value = NoResourceFoundException.class)
    ResponseEntity<ApiResponse<Object>> handleException(NoResourceFoundException exception) {
        ErrorCode error = ErrorCode.SYSTEM__ROUTE_NOT_SUPPORTED;
        return ResponseEntity
                .status(error.getStatus())
                .body(ApiResponse.builder()
                        .success(false)
                        .status(error.getStatus().value())
                        .code(error.getCode())
                        .error(String.format(error.getMessage(), exception.getResourcePath()))
                        .build());
    }

    @ExceptionHandler(value = HttpMessageNotReadableException.class)
    ResponseEntity<ApiResponse<Object>> handleException(HttpMessageNotReadableException exception) {
        ErrorCode error = ErrorCode.SYSTEM__BODY_REQUIRED;
        return ResponseEntity
                .status(error.getStatus())
                .body(ApiResponse.builder()
                        .success(false)
                        .status(error.getStatus().value())
                        .code(error.getCode())
                        .error(String.format(error.getMessage()))
                        .build());
    }
}
