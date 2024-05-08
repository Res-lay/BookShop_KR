package org.example.kr_backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.kr_backend.models.enums.Status;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Purchases {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long userId;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<PurchaseItem> items;
    @Enumerated(EnumType.STRING)
    private Status status;
    private LocalDate date;
    private Double totalPrice;
}
