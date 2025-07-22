package com.dino.back_end_for_TTECH.shared.domain.exception;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatusCode;

@Getter
@Setter
public class AppException extends RuntimeException {

    private int code;

    private String message;

    private HttpStatusCode status;

    public AppException(ErrorCode error) {
        super(error.getMessage());
        this.code = error.getCode();
        this.message = error.getMessage();
        this.status = error.getStatus();
    }
}
