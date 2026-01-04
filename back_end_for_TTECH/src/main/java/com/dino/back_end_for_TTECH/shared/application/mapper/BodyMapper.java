package com.dino.back_end_for_TTECH.shared.application.mapper;

import org.mapstruct.MappingTarget;

public interface BodyMapper<M, B> {

  M toModel(B body);

  void toModel(B body, @MappingTarget M model);
}