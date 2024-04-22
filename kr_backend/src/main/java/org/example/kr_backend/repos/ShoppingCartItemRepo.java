package org.example.kr_backend.repos;

import org.example.kr_backend.models.ShoppingCartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShoppingCartItemRepo extends JpaRepository<ShoppingCartItem, Long> {
}
