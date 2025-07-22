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

    public static boolean isEmpty(Collection<Object> collection) {
        return CollectionUtils.isEmpty(collection);
    }

    public static Pageable defaultPageable() {
        return PageRequest.of(0, 10,
                Sort.by(Sort.Direction.DESC, "id"));
    }

    public static String maskMiddle(String plainText, int keptLength) {
        if (isBlank(plainText))
            return plainText;
        // the non-masked text
        int maskEndIndex = plainText.length() - keptLength;
        String startText = plainText.substring(0, keptLength);
        String endText = plainText.substring(maskEndIndex);
        // the masked text
        String middleText = new String(new char[maskEndIndex - keptLength]).replace('\0', '*');
        return startText + middleText + endText;
    }

    public static String maskStart(String plainText, int keptLength) {
        if (isBlank(plainText))
            return plainText;
        // the non-masked text
        int maskEndIndex = plainText.length() - keptLength;
        String endText = plainText.substring(maskEndIndex);
        // the masked text
        String startText = new String(new char[endText.length()]).replace('\0', '*');
        return startText + endText;
    }

    public static String toSlug(String name) {
        Slugify slugify = Slugify.builder().build();
        return slugify.slugify(name);
    }

    /**
     * Map source to target, with ignoring null source props, to update partially.
     */
    public static <T> void updatePartially(T target, T source) {
        // 1. Get props of source or target
        Field[] fields = source.getClass().getDeclaredFields();

        // 2. Iterate through props
        Arrays.stream(fields).parallel()
                // Can access the private props
                .peek(field -> field.setAccessible(true))
                // Get non null props
                .filter(field -> {
                    try {
                        return field.get(source) != null;
                    } catch (IllegalArgumentException | IllegalAccessException e) {
                        throw new RuntimeException(e);
                    }
                })
                // Map source to target
                .forEach(field -> {
                    try {
                        field.set(target, field.get(source));
                    }  catch (IllegalArgumentException | IllegalAccessException e) {
                        throw new RuntimeException(e);
                    }
                });
    }
}
