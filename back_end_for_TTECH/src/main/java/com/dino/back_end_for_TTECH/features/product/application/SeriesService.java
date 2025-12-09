package com.dino.back_end_for_TTECH.features.product.application;

import com.dino.back_end_for_TTECH.features.product.application.mapper.SeriesMapper;
import com.dino.back_end_for_TTECH.features.product.application.model.SeriesBody;
import com.dino.back_end_for_TTECH.features.product.application.model.SeriesData;
import com.dino.back_end_for_TTECH.features.product.domain.Series;
import com.dino.back_end_for_TTECH.features.product.domain.repository.SeriesRepository;
import com.dino.back_end_for_TTECH.shared.application.constant.CacheKey;
import com.dino.back_end_for_TTECH.shared.application.constant.CacheValue;
import com.dino.back_end_for_TTECH.shared.application.exception.DuplicationE;
import com.dino.back_end_for_TTECH.shared.application.exception.NotFoundE;
import com.dino.back_end_for_TTECH.shared.application.utils.AppCheck;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class SeriesService {

    private final SeriesRepository seriesRepo;
    private final SeriesMapper seriesMapper;

    public Series get(Long id) {
        return seriesRepo
                .findById(id)
                .orElseThrow(() -> new NotFoundE("Không tìm thấy series"));
    }

    private void validate(Series supplier) {
        List<Series> list = this.seriesRepo.findByName(supplier.getName());

        boolean isNonDupName = AppCheck.isEmpty(list) ||
                AppCheck.isEqual(list.getFirst().getId(), supplier.getId());

        if (!isNonDupName) throw new DuplicationE("Tên series bị trùng lập");
    }

    @Cacheable(value = CacheValue.SUPPLIERS, key = CacheKey.LIST)
    public List<SeriesData> list() {
        var suppliers = this.seriesRepo.findAll();

        return suppliers.stream()
                .map(s -> seriesMapper.toSeriesData(s))
                .sorted(Comparator.comparing(s -> s.name())).toList();
    }

    @CacheEvict(value = CacheValue.SUPPLIERS, key = CacheKey.LIST)
    public SeriesData add(SeriesBody body) {
        Series one = seriesMapper.toSeries(body);
        // this.validate(one);
        Series newOne = seriesRepo.save(one);
        return seriesMapper.toSeriesData(newOne);
    }

    @CacheEvict(value = CacheValue.SUPPLIERS, key = CacheKey.LIST)
    public SeriesData edit(long id, SeriesBody body) {
        Series one = get(id);
        seriesMapper.toSeries(body, one);
        // this.validate(one);
        Series newOne = seriesRepo.save(one);
        return seriesMapper.toSeriesData(newOne);
    }

    @CacheEvict(value = CacheValue.SUPPLIERS, key = CacheKey.LIST)
    public void remove(long id) {
        Series one = get(id);
        seriesRepo.deleteById(one.getId());
    }
}
