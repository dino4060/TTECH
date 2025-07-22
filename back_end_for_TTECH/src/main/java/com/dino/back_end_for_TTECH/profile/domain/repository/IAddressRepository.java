package com.dino.back_end_for_TTECH.profile.domain.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dino.back_end_for_TTECH.profile.domain.Address;

public interface IAddressRepository extends JpaRepository<Address, Long> {
    // QUERY //

    Optional<Address> findByUserIdAndIsDefault(Long userId, Boolean isDefault);
}
