package com.dino.back_end_for_TTECH.shared.application.utils;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;

import java.util.List;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PageRes<T> {
    Pagination pagination;
    List<T> items;

    // NOTE: Builder
    // @Builder need to Getter, Setter, AllArgsConstructor, NoArgsConstructor
    @Builder
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class Pagination {
        private int totalPages;
        private long totalElements;
        private int page;
        private int size;
    }

    /**
     * Map PageRes from PageJpa
     *
     * @param pageJpa: from Spring Data Domain
     * @return pageRes: dto
     */
    public static <T> PageRes<T> from(Page<T> pageJpa) {
        Pagination pagination = Pagination.builder()
                .totalPages(pageJpa.getTotalPages())
                .totalElements(pageJpa.getTotalElements())
                .page(pageJpa.getNumber() + 1) // Page of client starts 1. But PageNumber of Jpa starts from 0
                .size(pageJpa.getSize())
                .build();

        return PageRes.<T>builder()
                .pagination(pagination)
                .items(pageJpa.getContent())
                .build();
    }

    public static <T> PageRes<T> from(Page<?> page, List<T> items) {
        Pagination pagination = Pagination.builder()
                .totalPages(page.getTotalPages())
                .totalElements(page.getTotalElements())
                .page(page.getNumber() + 1) // Page of client starts 1. But PageNumber of Jpa starts from 0
                .size(page.getSize())
                .build();

        return PageRes.<T>builder()
                .pagination(pagination)
                .items(items)
                .build();
    }
}
