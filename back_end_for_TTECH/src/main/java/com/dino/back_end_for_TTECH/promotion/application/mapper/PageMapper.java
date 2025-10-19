package com.dino.back_end_for_TTECH.promotion.application.mapper;

import com.dino.back_end_for_TTECH.promotion.application.model.PageData;
import com.dino.back_end_for_TTECH.promotion.application.model.PageQuery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.function.Function;

public interface PageMapper {

    default Pageable toPageable(PageQuery query) {
        return PageRequest.of(
                query.getPage(),
                query.getSize(),
                Sort.by(
                        query.getDirection().equals("ASC") ? Sort.Direction.ASC : Sort.Direction.DESC,
                        query.getSort()
                )
        );
    }

    default <M, D> PageData<D> toPageData(Page<M> page, Function<M, D> toDataFunc) {
        return new PageData<>(
                page.getTotalPages(),
                (int) page.getTotalElements(),
                page.getNumber(),
                page.getSize(),
                toDataFunc == null ? new ArrayList<>() : page.getContent().stream().map(model -> toDataFunc.apply(model)).toList()
        );
    }
}
