package org.example.kr_backend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.kr_backend.models.PurchaseItem;
import org.example.kr_backend.models.Purchases;
import org.example.kr_backend.models.ShoppingCart;
import org.example.kr_backend.models.User;
import org.example.kr_backend.models.enums.Status;
import org.example.kr_backend.repos.PurchasesRepo;
import org.example.kr_backend.service.UserService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class PurchasesService {

    private final PurchasesRepo purchasesRepo;
    private final EmailService emailService;
    private final ShoppingCartService shoppingCartService;
    private final UserServiceImpl userService;

    public void createPurchase(Long userId){
        ShoppingCart shoppingCart = shoppingCartService.getByUserId(userId);
        Purchases purchase = Purchases.builder()
                .items(shoppingCart.getItems().stream()
                        .map(shoppingCartItem -> {

                            return PurchaseItem.builder()
                                    .book(shoppingCartItem.getBook())
                                    .quantity(shoppingCartItem.getQuantity())
                                    .build();
                        })
                        .toList())
                .date(LocalDate.now())
                .userId(shoppingCart.getUserId())
                .status(Status.CREATED)
                .build();
        purchasesRepo.save(purchase);
        shoppingCartService.deleteAllItems(shoppingCart.getId());
        log.info("New purchase created with id={}", purchase.getId());
        emailService.sendEmail(purchase, userService.getById(userId));
    }

    public List<Purchases> getByUserId(Long id){
        return purchasesRepo.findAllPurchasesByUserId(id);
    }

    public void changeStatus(Long purchaseId, Status status){
        Purchases purchase = purchasesRepo.findById(purchaseId).orElse(null);
        if (purchase != null){
            purchase.setStatus(status);
            purchasesRepo.save(purchase);
            log.info("New status {} for purchase with id={}", status, purchase.getId());
        }
    }

}
