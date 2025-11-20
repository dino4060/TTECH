package com.dino.back_end_for_TTECH.features.product.application;

import com.dino.back_end_for_TTECH.features.product.application.mapper.SeriesMapper;
import com.dino.back_end_for_TTECH.features.product.application.model.SeriesBody;
import com.dino.back_end_for_TTECH.features.product.application.model.SeriesData;
import com.dino.back_end_for_TTECH.features.product.domain.Series;
import com.dino.back_end_for_TTECH.features.product.domain.repository.SeriesRepository;
import com.dino.back_end_for_TTECH.shared.application.constant.CacheKey;
import com.dino.back_end_for_TTECH.shared.application.constant.CacheValue;
import com.dino.back_end_for_TTECH.shared.application.utils.AppCheck;
import com.dino.back_end_for_TTECH.shared.domain.exception.AppException;
import com.dino.back_end_for_TTECH.shared.domain.exception.ErrorCode;
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

    private final SeriesRepository supplierRepository;
    private final SeriesMapper supplierMapper;

    // HELPERS //

    public Series get(Long id) {
        return supplierRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.SUPPLIER__NOT_FOUND));
    }

    private Series saveSupplier(Series supplier) {
        try {
            return supplierRepository.save(supplier);
        } catch (Exception e) {
            throw new AppException(ErrorCode.SUPPLIER__SAVE_FAILED);
        }
    }

    private void removeSupplier(long id) {
        try {
            supplierRepository.deleteById(id);
        } catch (Exception e) {
            throw new AppException(ErrorCode.SUPPLIER__NOT_REMOVED);
        }
    }

    private void validateSupplier(Series supplier) {
        List<Series> suppliers = this.supplierRepository.findByName(supplier.getName());

        boolean conditionOfName =
                AppCheck.isEmpty(suppliers) ||
                        AppCheck.isEqual(suppliers.getFirst().getId(), supplier.getId());

        if (!conditionOfName) throw new AppException(ErrorCode.SUPPLIER__NAME_DUPLICATED);
    }

    // READ //

    @Cacheable(value = CacheValue.SUPPLIERS, key = CacheKey.LIST)
    public List<SeriesData> list() {
        var suppliers = this.supplierRepository.findAll();

        return suppliers.stream()
                .map(supplierMapper::toSeriesData)
                .sorted(Comparator.comparing(SeriesData::name))
                .toList();
    }

    // WRITE //

    @CacheEvict(value = CacheValue.SUPPLIERS, key = CacheKey.LIST)
    public SeriesData createSupplier(SeriesBody body) {
        Series supplier = supplierMapper.toSeries(body);
        this.validateSupplier(supplier);
        Series saved = saveSupplier(supplier);
        return supplierMapper.toSeriesData(saved);
    }

    @CacheEvict(value = CacheValue.SUPPLIERS, key = CacheKey.LIST)
    public SeriesData updateSupplier(long id, SeriesBody body) {
        Series supplier = get(id);
        supplierMapper.toSeries(body, supplier);
        this.validateSupplier(supplier);
        Series saved = saveSupplier(supplier);
        return supplierMapper.toSeriesData(saved);
    }

    @CacheEvict(value = CacheValue.SUPPLIERS, key = CacheKey.LIST)
    public void deleteSupplier(long id) {
        Series supplier = get(id);
        this.removeSupplier(supplier.getId());
    }
}
