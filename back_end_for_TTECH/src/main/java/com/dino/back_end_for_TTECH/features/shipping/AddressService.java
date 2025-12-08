package com.dino.back_end_for_TTECH.features.shipping;

import com.dino.back_end_for_TTECH.features.profile.domain.model.Role;
import com.dino.back_end_for_TTECH.features.profile.domain.User;
import com.dino.back_end_for_TTECH.features.profile.domain.repository.UserRepository;
import com.dino.back_end_for_TTECH.features.profile.domain.specification.UserSpec;
import com.dino.back_end_for_TTECH.shared.application.exception.NotFoundE;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AddressService {

    UserRepository userRepo;
    AddressMapper addressMap;

    public AddressData getWarehouseAddress() {
        User adminUser = userRepo
                .findOne(UserSpec.hasRole(Role.ADMIN))
                .orElseThrow(() -> new NotFoundE("Warehouse Address not found."));

        AddressData data = addressMap.toData(adminUser);
//        data.setUserName(adminUser.getName());
        return data;
    }
}
