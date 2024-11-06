package com.example.chatgptjokes.service;

import com.example.chatgptjokes.entity.FoodOffer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Service
public class FoodOfferService {

    private final RestTemplate restTemplate;

    @Value("${external.api.url}")
    private String apiBaseUrl;

    @Value("${external.api.token}")
    private String apiAuthToken;

    public FoodOfferService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<FoodOffer> getFoodOffersByZip(String zip) {
        // Opret headers og tilføj Authorization-token
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiAuthToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        // Lav REST-kaldet og håndter svaret
        ResponseEntity<FoodOffer[]> response = restTemplate.exchange(
                apiBaseUrl + "?zip=" + zip,
                HttpMethod.GET,
                entity,
                FoodOffer[].class
        );

        // Returnér listen af FoodOffer-objekter
        return Arrays.asList(Objects.requireNonNull(response.getBody()));
    }
}
