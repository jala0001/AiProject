package com.example.chatgptjokes.entity;

import java.util.List;

public class FoodOffer {
    private List<Clearance> clearances;
    private Store store; // Tilføj butik til FoodOffer

    // Getters og setters
    public List<Clearance> getClearances() {
        return clearances;
    }

    public void setClearances(List<Clearance> clearances) {
        this.clearances = clearances;
    }

    public Store getStore() {
        return store;
    }

    public void setStore(Store store) {
        this.store = store;
    }
}
