package com.dino.back_end_for_TTECH.shared.application.utils;

import com.github.slugify.Slugify;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.Collection;
import java.util.Objects;

public class AppUtils {

    public static boolean nonNull(Object object) {
        return Objects.nonNull(object);
    }

    public static boolean isNull(Object object) {
        return Objects.isNull(object);
    }

    public static boolean isBlank(String string) {
        return !StringUtils.hasText(string);
    }

    public static boolean isZero(int number) {
        return number == 0;
    }

    public static boolean isZero(Integer number) {
        return AppUtils.isNull(number) || isZero((int) number);
    }

    public static boolean isEmpty(Collection<?> collection) {
        return CollectionUtils.isEmpty(collection);
    }

    public static boolean isEqual(Object one, Object two) {
        return Objects.equals(one, two);
    }

    public static boolean isPresent(Object object) {
        return AppUtils.nonNull(object);
    }

    public static Pageable defaultPageable() {
        return PageRequest.of(0, 10,
                Sort.by(Sort.Direction.DESC, "id"));
    }
}
