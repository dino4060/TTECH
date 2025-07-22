package com.dino.back_end_for_TTECH.infrastructure.realtime.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Endpoint for client to connect WebSocket (client & server handshake)
        registry.addEndpoint("/realtime")
                .setAllowedOriginPatterns("*")
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // Prefix for client to subscribe (server publish)
        config.enableSimpleBroker("/topic");

        // Prefix for client to send (client send)
        config.setApplicationDestinationPrefixes("/app");
    }
}
