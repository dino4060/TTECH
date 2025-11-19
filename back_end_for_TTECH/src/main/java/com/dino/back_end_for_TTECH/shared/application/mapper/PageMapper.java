package com.dino.back_end_for_TTECH.shared.application.mapper;

import com.dino.back_end_for_TTECH.shared.application.model.PageData;
import com.dino.back_end_for_TTECH.shared.application.model.PageQuery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;

public interface PageMapper {

    default Pageable toPageable(PageQuery query) {
        var pageNumber = query.getPage() - 1;
        var sizeNumber = query.getSize();
        var sort = Sort.by(
                query.getDirection().equals("ASC") ? Sort.Direction.ASC : Sort.Direction.DESC,
                query.getSort()
        );
        return PageRequest.of(pageNumber, sizeNumber, sort);
    }

    default <M, D> PageData<D> toPageData(Page<M> page, Function<M, D> toDataFunc) {
        var totalPages = page.getTotalPages();
        var totalItems = (int) page.getTotalElements();
        var no = page.getNumber();
        var size = page.getSize();
        List<D> items = toDataFunc == null
                ? new ArrayList<>()
                : page.getContent().stream().map(model -> toDataFunc.apply(model)).toList();

        return new PageData<>(totalPages, totalItems, no, size, items);
    }
}
