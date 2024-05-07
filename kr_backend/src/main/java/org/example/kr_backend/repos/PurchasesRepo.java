package org.example.kr_backend.repos;

import org.example.kr_backend.models.Purchases;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PurchasesRepo extends JpaRepository<Purchases, Long> {
    List<Purchases> findAllPurchasesByUserId(Long userId);
}
