package org.example.kr_backend.service.impl;

import org.example.kr_backend.models.Book;
import org.example.kr_backend.models.ShoppingCart;
import org.example.kr_backend.models.ShoppingCartItem;
import org.example.kr_backend.repos.ShoppingCartRepo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ShoppingCartService implements org.example.kr_backend.service.ShoppingCartService {

    private final ShoppingCartRepo shoppingCartRepo;
    private final ShoppingCartItemServiceImpl cartItemService;
    private final BookServiceImpl bookService;

    public ShoppingCartService(ShoppingCartRepo cartRepo, ShoppingCartItemServiceImpl cartItemService, BookServiceImpl bookService) {
        this.shoppingCartRepo = cartRepo;
        this.cartItemService = cartItemService;
        this.bookService = bookService;
    }


    @Override
    public void addItemToCart(Long userId, Long bookId) {
        ShoppingCart shoppingCart = shoppingCartRepo.findByUserId(userId);
        Book book = bookService.getById(bookId);
        if (shoppingCart != null){
            if (book != null){
                ShoppingCartItem cartItem = shoppingCart.getItems().stream()
                        .filter(item -> item.getBook() != null)
                        .filter(item -> item.getBook().getId() == bookId)
                        .findFirst().orElse(null);
                if (cartItem != null)
                    cartItem.setQuantity(cartItem.getQuantity() + 1);
                else
                    shoppingCart.getItems().add(ShoppingCartItem.builder().book(book).quantity(1).build());
                shoppingCartRepo.save(shoppingCart);
            }
        }else {
            ShoppingCartItem shoppingCartItem = ShoppingCartItem.builder().quantity(1).book(book).build();
            List<ShoppingCartItem> cartItems = new ArrayList<>();
            cartItems.add(shoppingCartItem);
            ShoppingCart newShoppingCart = ShoppingCart.builder().items(cartItems).userId(userId).build();
            shoppingCartRepo.save(newShoppingCart);
        }
    }

    @Override
    public void decreaseItemQuantity(Long userId, Long bookId) {
        ShoppingCart shoppingCart = shoppingCartRepo.findByUserId(userId);
        Book book = bookService.getById(bookId);
        if (shoppingCart != null){
            if (book != null){
                ShoppingCartItem cartItem = shoppingCart.getItems().stream()
                        .filter(item -> item.getBook() != null)
                        .filter(item -> item.getBook().getId() == book.getId())
                        .findFirst().orElseThrow(() -> new NoSuchElementException("No such element"));
                if (cartItem.getQuantity() == 1) {
                    shoppingCart.getItems().remove(cartItem);
                    cartItemService.deleteByID(cartItem.getId());
                }
                else
                    cartItem.setQuantity(cartItem.getQuantity() - 1);
                shoppingCartRepo.save(shoppingCart);
            }
        }
    }

    @Override
    public List<ShoppingCartItem> getCartItems(Long userId) {
        ShoppingCart shoppingCart = shoppingCartRepo.findByUserId(userId);
        if (shoppingCart != null)
            return shoppingCart.getItems();
        return new ArrayList<>();
    }

    @Override
    public void deleteItemFromCart(Long userId, Long bookId) {
        ShoppingCart shoppingCart = shoppingCartRepo.findByUserId(userId);
        Book book = bookService.getById(bookId);
        if (shoppingCart != null) {
            ShoppingCartItem cartItem = shoppingCart.getItems().stream()
                    .filter(item -> item.getBook() != null)
                    .filter(item -> item.getBook().getId() == book.getId())
                    .findFirst().orElse(null);
            if (cartItem != null) {
                shoppingCart.getItems().remove(cartItem);
                cartItemService.deleteByID(cartItem.getId());
            }
            shoppingCartRepo.save(shoppingCart);
        }
    }
}
