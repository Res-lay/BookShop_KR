package org.example.kr_backend.controllers;

import org.example.kr_backend.models.Book;
import org.example.kr_backend.service.impl.BookServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1/books")
public class BookController{

    private final BookServiceImpl bookServiceImpl;

    BookController(BookServiceImpl bookServiceImpl){
        this.bookServiceImpl = bookServiceImpl;
    }

    @GetMapping("/get-all")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<Book>> getAllBooks(){
        List<Book> books = bookServiceImpl.getAll();
        return ResponseEntity.ok(books);
    }
    @GetMapping("/get-recommended")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<Book>> getRecommendedBooks(){
        List<Book> books = bookServiceImpl.getRecommendedBooks();
        return ResponseEntity.ok(books);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id){
        Book book = bookServiceImpl.getById(id);
        return ResponseEntity.ok(book);
    }

    @PostMapping("/add")
    public ResponseEntity<?> createNewBook(@RequestBody Book newBook){
        Book book = bookServiceImpl.create(newBook);
        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(book.getId())
                .toUri();
        return ResponseEntity.created(uri).body(book);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book newBook){
        Book book = bookServiceImpl.update(newBook, id);
        return ResponseEntity.ok().body(book);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable Long id){
        bookServiceImpl.delete(id);
        return ResponseEntity.ok().build();
    }
}
