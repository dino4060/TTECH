package com.dino.back_end_for_TTECH.shared.application.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class NotFoundModelEx extends ResponseStatusException {
    public NotFoundModelEx(String model) {
        super(HttpStatus.NOT_FOUND, "Not found " + model + ".");
    }
}
