package com.dino.back_end_for_TTECH.shared.domain.model;

public interface BaseStatus<S extends Enum<S>> {
    String getStatus();

    void setStatus(String status);

    default boolean hasStatus(S status) {
        if (status == null)
            return this.getStatus() == null;
        else
            return this.getStatus().equals(status.name());
    }

    default void setStatus(S status) {
        this.setStatus(status.name());
    }
}
