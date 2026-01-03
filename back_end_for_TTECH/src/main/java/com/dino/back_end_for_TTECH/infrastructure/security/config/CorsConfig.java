package com.dino.back_end_for_TTECH.infrastructure.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class CorsConfig {
  /**
   * Specify the services that are allowed to connect to our servers.
   * Include:
   * - Domain URLs
   * - Http methods
   * - Http headers
   * - Http cookies
   */
  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration corsConfig = new CorsConfiguration();
    corsConfig.setAllowedOrigins(
        Arrays.asList(
            "http://localhost:3000",
            "https://ttech-studio.vercel.app"));

    corsConfig.setAllowedMethods(
        Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));

    corsConfig.setAllowedHeaders(
        Arrays.asList("Authorization", "Content-Type", "Accept", "x-no-retry"));

    corsConfig.setAllowCredentials(true); // allow client send request attached cookies

    corsConfig.setMaxAge(3600L); // pre-flight request time có thể cache (tính theo seconds)

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", corsConfig); // apply the policy to all routes
    return source;
  }
}
