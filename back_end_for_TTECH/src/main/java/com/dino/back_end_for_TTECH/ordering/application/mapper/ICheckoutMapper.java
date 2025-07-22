package com.dino.back_end_for_TTECH.ordering.application.mapper;

import com.dino.back_end_for_TTECH.ordering.application.model.DraftOrderRes;
import com.dino.back_end_for_TTECH.ordering.application.model.EstimateCheckoutRes;
import com.dino.back_end_for_TTECH.ordering.application.model.StartCheckoutRes;
import com.dino.back_end_for_TTECH.ordering.domain.model.CheckoutSnapshot;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ICheckoutMapper {

    EstimateCheckoutRes toEstimateCheckoutRes(
            Long cartId,
            CheckoutSnapshot checkoutSnapshot);

    StartCheckoutRes toStartCheckoutRes(
            Long checkoutId,
            CheckoutSnapshot totalCheckoutSnapshot,
            List<DraftOrderRes> orders);
}