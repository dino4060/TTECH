package com.dino.back_end_for_TTECH.shared.domain.model;


public interface BaseStatus<S extends Enum<S>> {
    String getStatus();

    void setStatus(String status);

    default boolean hasStatus(S status) {
        if (this.getStatus() == null && status == null) {
            return true;
        } else if (this.getStatus() == null || status == null) {
            return false;
        } else {
            return this.getStatus().equals(status.name());
        }
    }

    default void setStatus(S status) {
        if (status == null) {
            this.setStatus((String) null);
        } else {
            this.setStatus(status.name());
        }
    }
}
