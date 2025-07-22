package com.dino.back_end_for_TTECH.infrastructure.aop;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

/**
 * define a structure of an apiResponse or apiError
 * @des: success (true), status, code, meta, data
 * @des: success (false), status, code, error
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {
    boolean success;
    int status;
    int code;
    String error;
    T data;
}
