package com.dino.back_end_for_TTECH.features.product.application.mapper;

import com.dino.back_end_for_TTECH.features.product.application.model.SeriesData;
import com.dino.back_end_for_TTECH.features.product.application.model.SeriesBody;
import com.dino.back_end_for_TTECH.features.product.domain.Series;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface SeriesMapper {

  SeriesData toSeriesData(Series model);

  Series toSeries(SeriesBody body);

  void toSeries(SeriesBody body, @MappingTarget Series model);
}
