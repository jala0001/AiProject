package com.example.chatgptjokes.entity;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class FoodOffer {
    private List<Clearance> clearances;

    // Getters og setters
    public List<Clearance> getClearances() {
        return clearances;
    }

    public void setClearances(List<Clearance> clearances) {
        this.clearances = clearances;
    }
}
