package org.example.kr_backend.repos;

import org.example.kr_backend.models.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepo extends JpaRepository<Book, Long> {
    @Query(value = "SELECT * FROM recommended_books", nativeQuery = true)
    List<Long> getRecommendedBooks();
}
