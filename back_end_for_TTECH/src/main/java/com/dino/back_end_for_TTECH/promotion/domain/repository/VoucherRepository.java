package com.dino.back_end_for_TTECH.promotion.domain.repository;

import com.dino.back_end_for_TTECH.promotion.domain.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoucherRepository extends JpaRepository<Voucher, Long> {

}
