package com.dino.back_end_for_TTECH.shared.application.utils;

import org.springframework.data.domain.Page;

import java.util.List;

public record AppPage<T>(
        Pagination pagination,
        List<T> items
) {
    public record Pagination(
            int totalPages,
            long totalElements,
            int page,
            int size
    ) {
        public static int createPage(int page) {
            // PageNumber of AppPage starts at 1
            // But the one of Page starts at 0
            return page + 1;
        }
    }

    /**
     * Map AppPage from Page without items
     */
    public static <T> AppPage<T> from(Page<T> page) {
        Pagination pagination = new Pagination(
                page.getTotalPages(),
                page.getTotalElements(),
                Pagination.createPage(page.getNumber()),
                page.getSize()
        );
        return new AppPage<>(pagination, page.getContent());
    }

    /**
     * Map AppPage from Page with items
     */
    public static <T> AppPage<T> from(Page<?> page, List<T> items) {
        Pagination pagination = new Pagination(
                page.getTotalPages(),
                page.getTotalElements(),
                Pagination.createPage(page.getNumber()),
                page.getSize()
        );
        return new AppPage<>(pagination, items);
    }
}
