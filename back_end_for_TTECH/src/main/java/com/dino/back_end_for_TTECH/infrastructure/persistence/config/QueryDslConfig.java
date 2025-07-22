package com.dino.back_end_for_TTECH.infrastructure.persistence.config;

import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class QueryDslConfig {

//    @Bean
//    public JPAQueryFactory jpaQueryFactory() {
//        EntityManager entityManager;
//        try (EntityManagerFactory entityManagerFactory = Persistence
//                .createEntityManagerFactory("com.dino.backend")) {
//            entityManager = entityManagerFactory.createEntityManager();
//        }
//        return new JPAQueryFactory(JPQLTemplates.DEFAULT, entityManager);
//    }

    private final EntityManager entityManager;

    @Bean
    public JPAQueryFactory jpaQueryFactory() {
        return new JPAQueryFactory(entityManager);
    }
}
