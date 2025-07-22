package com.dino.back_end_for_TTECH.profile.domain;

import com.dino.back_end_for_TTECH.identity.domain.model.Role;
import com.dino.back_end_for_TTECH.identity.domain.model.UserStatus;
import com.dino.back_end_for_TTECH.ordering.domain.Order;
import com.dino.back_end_for_TTECH.shared.application.utils.AppUtils;
import com.dino.back_end_for_TTECH.shared.domain.model.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@DynamicInsert // ignore null-value attributes
@DynamicUpdate
@SQLDelete(sql = "UPDATE users SET is_deleted = true WHERE user_id=?")
@SQLRestriction("is_deleted = false")
@SuperBuilder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "user_id")
    Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    UserStatus status;

    @Column(nullable = false, unique = true)
    String username;

    @Column(unique = true)
    String email;

    @Column(unique = true)
    String phone;

    String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    Set<Role> roles;

    String name;

    String photo;

    Date dob;

    String gender;

    Boolean isEmailVerified;

    Boolean isPhoneVerified;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    @ToString.Exclude
    List<Address> addresses;

    @OneToMany(mappedBy = "buyer", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    List<Order> orders;

    // FACTORY //

    public static User createEmailUser(String email, String hashPassword, Role role) {
        User user = new User();

        user.setStatus(UserStatus.LACK_INFO);
        user.setUsername("user" + System.currentTimeMillis());
        user.setEmail(email);
        user.setPassword(hashPassword);
        user.addRole(role);
        user.setIsEmailVerified(false);

        return user;
    }

    public static User createThirdUser(String email, String name, Role role) {
        User user = new User();

        user.setStatus(UserStatus.LACK_INFO);
        user.setUsername("user" + System.currentTimeMillis());
        user.setEmail(email);
        user.setName(name);
        user.addRole(role);
        user.setIsEmailVerified(true);

        return user;
    }

    // INSTANCE //

    public void addRole(Role role) {
        boolean condition = AppUtils.nonNull(this.getRoles());

        if (!condition) this.setRoles(new HashSet<>());

        this.getRoles().add(role);
    }
}
