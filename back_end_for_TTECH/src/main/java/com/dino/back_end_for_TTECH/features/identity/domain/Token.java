package com.dino.back_end_for_TTECH.features.identity.domain;

import com.dino.back_end_for_TTECH.features.profile.domain.User;
import com.dino.back_end_for_TTECH.shared.domain.model.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.Instant;

@Entity
@Table(name = "tokens")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE tokens SET is_deleted = true WHERE token_id=?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Token extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "token_id")
    Long id;

    @Column(columnDefinition = "text")
    String refreshToken;

    Instant refreshTokenExpiry;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, updatable = false)
    @JsonIgnore
    User user;

    // FACTORY //

    public static Token createToken(User user) {
        Token token = new Token();

        token.setUser(user);

        return token;
    }

    // INSTANCE //

    public void updateRefreshToken(String refreshToken, Instant refreshTokenExpiry) {
        this.setRefreshToken(refreshToken);
        this.setRefreshTokenExpiry(refreshTokenExpiry);
    }
}
