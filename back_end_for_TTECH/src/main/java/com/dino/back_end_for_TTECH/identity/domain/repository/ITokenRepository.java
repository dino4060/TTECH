package com.dino.back_end_for_TTECH.identity.domain.repository;

import com.dino.back_end_for_TTECH.identity.domain.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.Nullable;

import java.util.Optional;

public interface ITokenRepository extends JpaRepository<Token, Long> {
    // QUERY //

    Optional<Token> findByUserId(@Nullable Long userId);

    // COMMAND //
}
