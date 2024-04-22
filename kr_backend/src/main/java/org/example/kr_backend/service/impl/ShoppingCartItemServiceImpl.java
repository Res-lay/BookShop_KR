package org.example.kr_backend.service.impl;

import org.example.kr_backend.repos.ShoppingCartItemRepo;
import org.example.kr_backend.service.ShoppingCartItemService;
import org.springframework.stereotype.Service;

@Service
public class ShoppingCartItemServiceImpl implements ShoppingCartItemService {

    private final ShoppingCartItemRepo shoppingCartItemRepo;

    public ShoppingCartItemServiceImpl(ShoppingCartItemRepo shoppingCartItemRepo) {
        this.shoppingCartItemRepo = shoppingCartItemRepo;
    }

    @Override
    public void deleteByID(Long id) {
        shoppingCartItemRepo.deleteById(id);
    }
}
