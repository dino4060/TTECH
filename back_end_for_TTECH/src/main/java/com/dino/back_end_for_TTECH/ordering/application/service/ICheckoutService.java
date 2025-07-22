package com.dino.back_end_for_TTECH.ordering.application.service;

import com.dino.back_end_for_TTECH.features.ordering.application.model.*;
import com.dino.back_end_for_TTECH.ordering.application.model.*;
import com.dino.back_end_for_TTECH.shared.api.model.CurrentUser;
import com.dino.back_end_for_TTECH.shared.application.utils.Deleted;

import java.time.Duration;

public interface ICheckoutService {
    // QUERY //

    EstimateCheckoutRes estimateCheckout(EstimateCheckoutReq request, CurrentUser currentUser);

    // COMMAND //

    StartCheckoutRes startCheckout(StartCheckoutReq request, CurrentUser currentUser);

    ConfirmCheckoutRes confirmCheckout(ConfirmCheckoutReq request, CurrentUser currentUser);

    Deleted cancelCheckout(Duration orderTtl);
}