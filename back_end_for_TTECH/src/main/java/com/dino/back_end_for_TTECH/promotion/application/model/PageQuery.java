package com.dino.back_end_for_TTECH.promotion.application.model;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PageQuery {
    @Min(value = 1, message = "Minimum page is 1")
    private int page = 1;

    @Min(value = 1, message = "Minimum size is 1")
    private int size = 10;

    @Pattern(regexp = "id", message = "Sort must be id")
    private String sort = "id";

    @Pattern(regexp = "ASC|DESC", message = "Direction should be ASC or DESC")
    private String direction = "DESC";
}
