package org.example.kr_backend.service;

import org.example.kr_backend.models.ShoppingCart;
import org.example.kr_backend.models.ShoppingCartItem;

import java.util.List;

public interface ShoppingCartService {
    void addItemToCart(Long userId, Long bookId);
    void decreaseItemQuantity(Long userId, Long bookId);
    List<ShoppingCartItem> getCartItems(Long userId);
    void deleteItemFromCart(Long userId, Long bookId);

    ShoppingCart getByUserId(Long userId);

    void deleteAllItems(Long id);

    void createCart(ShoppingCart cart);
}
