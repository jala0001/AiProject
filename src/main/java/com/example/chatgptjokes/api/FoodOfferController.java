package com.example.chatgptjokes.api;

import com.example.chatgptjokes.entity.FoodOffer;
import com.example.chatgptjokes.service.FoodOfferService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/food-offers")
public class FoodOfferController {

    private final FoodOfferService foodOfferService;

    public FoodOfferController(FoodOfferService foodOfferService) {
        this.foodOfferService = foodOfferService;
    }

    @GetMapping
    public ResponseEntity<List<FoodOffer>> getFoodOffersByZip(@RequestParam String zip) {
        List<FoodOffer> offers = foodOfferService.getFoodOffersByZip(zip);
        return ResponseEntity.ok(offers);
    }
}
