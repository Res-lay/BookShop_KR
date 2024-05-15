package org.example.kr_backend.service.impl;

import org.example.kr_backend.models.Book;
import org.example.kr_backend.repos.BookRepo;
import org.example.kr_backend.service.crudService;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

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

    public boolean reduceQuantityById(Long id){
        Book book = bookRepo.findById(id).orElseThrow();
        if (book.getQuantity() == 0)
            return false;
        book.setQuantity(book.getQuantity() - 1);
        bookRepo.save(book);
        return true;
    }

    public void increaseQuantity(Long id, int amount){
        Optional<Book> bookOptional = bookRepo.findById(id);
        Book book = bookOptional.get();
        book.setQuantity(book.getQuantity() + amount);
        bookRepo.save(book);
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
