package com.equipo7.ben10api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000", "http://localhost:5174") // Permitir Frontend
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Agregar OPTIONS
                        .allowedHeaders("*") // Permitir todos los headers
                        .allowCredentials(true); // IMPORTANTE para autenticación
            }
        };
    }
}
