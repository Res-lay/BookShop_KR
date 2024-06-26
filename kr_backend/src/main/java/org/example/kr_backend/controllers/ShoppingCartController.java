package org.example.kr_backend.controllers;

import lombok.RequiredArgsConstructor;
import org.example.kr_backend.models.User;
import org.example.kr_backend.service.impl.BookServiceImpl;
import org.example.kr_backend.service.impl.ShoppingCartService;
import org.example.kr_backend.service.impl.UserServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/shopping-cart")
@RequiredArgsConstructor
public class ShoppingCartController {

    private final ShoppingCartService cartService;
    private final UserServiceImpl userService;
    private final BookServiceImpl bookService;


    @PostMapping("/item/add/{id}")
    public ResponseEntity<?> addToCart(@PathVariable Long id, Principal principal){
        User user = userService.findByEmail(principal.getName());
        if (user != null && bookService.reduceQuantityById(id)){
            cartService.addItemToCart(user.getId(), id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }
    @PostMapping("/item/decrease/{id}")
    public ResponseEntity<?> decreaseQuantity(@PathVariable Long id, Principal principal){
        User user = userService.findByEmail(principal.getName());
        if (user != null){
            cartService.decreaseItemQuantity(user.getId(), id);
            bookService.increaseQuantity(id, 1);
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("/get/{userId}")
    public ResponseEntity<?> getCart(@PathVariable Long userId){
        return ResponseEntity.ok().body(cartService.getCartItems(userId));
    }

    @DeleteMapping("/item/delete/{id}")
    public void deleteCartItem(@PathVariable Long id, Principal principal){

        User user = userService.findByEmail(principal.getName());
        cartService.deleteItemFromCart(user.getId(), id);
    }
}

