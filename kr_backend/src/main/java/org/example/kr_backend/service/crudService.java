package org.example.kr_backend.service;

import java.util.List;

public interface crudService<T> {
    List<T> getAll();
    T getById(Long id);
    T create(T entity);
    T update(T newEntity, Long id);
    void delete(Long id);
}
