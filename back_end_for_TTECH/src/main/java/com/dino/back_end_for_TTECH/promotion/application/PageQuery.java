package com.dino.back_end_for_TTECH.promotion.application;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;

@Data
@NoArgsConstructor
public class PageQuery {
    private int page = 1;
    private int size = 10;
    private String prop = "id";
    private String direction = "DESC";

    List<String> validProperties = List.of("id");

    public Pageable toPageable() {
        return PageRequest.of(
                this.page >= 1 ? this.page - 1 : 0,
                this.size >= 1 ? this.size : 10,
                Sort.by(
                        this.direction.equals("ASC") ? Sort.Direction.ASC : Sort.Direction.DESC,
                        this.validProperties.contains(this.prop) ? this.prop : "id"
                )
        );
    }

    public PageQuery limitProps(List<String> props) {
        this.validProperties = props;
        return this;
    }
}
