package com.dino.back_end_for_TTECH.shared.application.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class ModelExisted extends ResponseStatusException {
    public ModelExisted(String model) {
        super(HttpStatus.NOT_FOUND, model + " already exists.");
    }
}
