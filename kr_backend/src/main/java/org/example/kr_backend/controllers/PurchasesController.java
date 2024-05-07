package org.example.kr_backend.controllers;

import lombok.RequiredArgsConstructor;
import org.example.kr_backend.models.Purchases;
import org.example.kr_backend.service.impl.PurchasesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/purchases")
@RequiredArgsConstructor
public class PurchasesController {

    private final PurchasesService purchasesService;

    @PostMapping("/{userId}")
    public void createPurchase(@PathVariable Long userId){
        purchasesService.createPurchase(userId);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Purchases>> getByUserId(@PathVariable Long userId){
        return ResponseEntity.ok().body(purchasesService.getByUserId(userId));
    }

}
