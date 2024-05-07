package org.example.kr_backend.service.impl;

import org.example.kr_backend.models.Book;
import org.example.kr_backend.repos.BookRepo;
import org.example.kr_backend.service.crudService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements crudService<Book> {

    private final BookRepo bookRepo;

    BookServiceImpl(BookRepo bookRepo){
        this.bookRepo = bookRepo;
    }

    public List<Book> getRecommendedBooks(){
        List<Long> booksId = bookRepo.getRecommendedBooks();
        return bookRepo.findAllById(booksId);
    }

    @Override
    public List<Book> getAll() {
        return bookRepo.findAll();
    }

    @Override
    public Book getById(Long id) {
        return bookRepo.findById(id).orElse(null);
    }

    @Override
    public Book create(Book book) {
        return bookRepo.save(book);
    }

    @Override
    public Book update(Book newBook, Long id) {
        Book oldBook = bookRepo.findById(id).orElse(null);

        oldBook.setAuthor(newBook.getAuthor());
        oldBook.setPrice(newBook.getPrice());
        oldBook.setName(newBook.getName());
        oldBook.setQuantity(newBook.getQuantity());
        oldBook.setDescription(newBook.getDescription());
        oldBook.setPath(newBook.getPath());

        return bookRepo.save(oldBook);
    }

    @Override
    public void delete(Long id) {
        bookRepo.deleteById(id);
    }
}
