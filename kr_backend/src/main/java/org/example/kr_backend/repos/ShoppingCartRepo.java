package org.example.kr_backend.repos;

import org.example.kr_backend.models.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShoppingCartRepo extends JpaRepository<ShoppingCart, Long> {
    ShoppingCart findByUserId(Long userId);
}
