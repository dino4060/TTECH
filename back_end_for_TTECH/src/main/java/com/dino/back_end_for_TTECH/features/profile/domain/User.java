package com.dino.back_end_for_TTECH.profile.domain;

import com.dino.back_end_for_TTECH.identity.domain.model.Role;
import com.dino.back_end_for_TTECH.identity.domain.model.UserStatus;
import com.dino.back_end_for_TTECH.ordering.domain.Order;
import com.dino.back_end_for_TTECH.shared.application.utils.AppCheck;
import com.dino.back_end_for_TTECH.shared.domain.model.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@DynamicInsert // ignore null-value attributes
@DynamicUpdate
@SQLDelete(sql = "UPDATE users SET is_deleted = true WHERE user_id=?")
@SQLRestriction("is_deleted = false")
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

    String name;

    @Column(nullable = false, unique = true)
    String username;

    @Column(unique = true)
    String email;

    @Column(unique = true)
    String phone;

    String password;

    Boolean isEmailVerified;

    Boolean isPhoneVerified;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    Set<Role> roles;

    @OneToMany(mappedBy = "buyer", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    List<Order> orders;

    // FACTORY //

    public User (Long id) {
        var user = new User();
        user.setId(id);
    }

    public static User createCustomer(String name, String email, String phone, String passHashed) {
        User user = new User();

        user.setStatus(UserStatus.LIVE);
        user.setName(name);
        user.setUsername("user" + System.currentTimeMillis());
        user.setEmail(email);
        user.setPhone(phone);
        user.setPassword(passHashed);
        user.addRole(Role.CUSTOMER);
        user.setIsEmailVerified(false);
        user.setIsPhoneVerified(false);

        return user;
    }

    public static User createThirdCustomer(String name, String email) {
        User user = new User();

        user.setStatus(UserStatus.LIVE);
        user.setName(name);
        user.setUsername("user" + System.currentTimeMillis());
        user.setEmail(email);
        user.addRole(Role.CUSTOMER);
        user.setIsEmailVerified(true);

        return user;
    }

    public static User createAdmin(String username, String email, String passHashed) {
        User user = new User();

        user.setStatus(UserStatus.LIVE);
        user.setName("Top 1 server at TTECH");
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passHashed);
        user.addRole(Role.ADMIN);
        user.setIsEmailVerified(false);

        return user;
    }

    // INSTANCE //

    public void updateCustomer(String name, String email, String phone) {
        this.setName(name);
        this.setEmail(email);
        this.setPhone(phone);
    }

    public void addRole(Role role) {
        boolean isNull = AppCheck.isNull(this.getRoles());
        if (isNull) this.setRoles(new HashSet<>());
        this.getRoles().add(role);
    }
}
