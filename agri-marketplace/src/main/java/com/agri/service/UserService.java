package com.agri.service;

import com.agri.model.User;
import com.agri.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository repo;

    @SuppressWarnings("null")
    public User register(User user) {
        return repo.save(user);
    }
}
