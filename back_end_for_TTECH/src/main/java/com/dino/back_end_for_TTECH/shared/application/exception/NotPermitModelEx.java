package com.dino.back_end_for_TTECH.shared.application.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class NotPermitModelEx extends ResponseStatusException {
    public NotPermitModelEx(String model) {
        super(HttpStatus.FORBIDDEN, "You don't have permission to the " + model + ".");
    }
}
