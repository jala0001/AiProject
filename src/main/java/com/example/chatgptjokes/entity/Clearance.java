package com.example.chatgptjokes.entity;

public class Clearance {
    private Offer offer;
    private Product product;

    // Getters og setters
    public Offer getOffer() {
        return offer;
    }

    public void setOffer(Offer offer) {
        this.offer = offer;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
