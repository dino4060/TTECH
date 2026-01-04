package com.dino.back_end_for_TTECH.shared.application.mapper;

public interface DataMapper<M, D> {

  D toData(M model);
}