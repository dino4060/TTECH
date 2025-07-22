package com.dino.back_end_for_TTECH.shared.application.utils;

import java.util.Optional;

public record Id(Long value) {

    public static Optional<Id> from(String id) {
        try {
            return Optional.of(new Id(Long.valueOf(id)));
        } catch (IllegalArgumentException e) {
            return Optional.empty();
        }
    }
}