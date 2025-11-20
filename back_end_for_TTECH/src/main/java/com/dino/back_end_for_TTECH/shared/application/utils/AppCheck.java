package com.dino.back_end_for_TTECH.shared.application.utils;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.util.Collection;
import java.util.Objects;

public class AppCheck {

    public static boolean nonNull(Object object) {
        return Objects.nonNull(object);
    }

    public static boolean isNull(Object object) {
        return Objects.isNull(object);
    }

    public static boolean isBlank(String text) {
        return !StringUtils.hasText(text);
    }

    public static boolean isZero(int number) {
        return number == 0;
    }

    public static boolean isZero(Integer number) {
        return AppCheck.isNull(number) || isZero((int) number);
    }

    public static boolean isEmpty(Collection<?> collection) {
        return CollectionUtils.isEmpty(collection);
    }

    public static boolean isEqual(Object one, Object two) {
        return Objects.equals(one, two);
    }

    public static boolean isPresent(Object object) {
        return AppCheck.nonNull(object);
    }

    public static Pageable defaultPageable() {
        return PageRequest.of(0, 10,
                Sort.by(Sort.Direction.DESC, "id"));
    }
}
