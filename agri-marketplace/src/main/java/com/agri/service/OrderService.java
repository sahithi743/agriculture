package com.agri.service;

import com.agri.model.Order;
import com.agri.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    @Autowired
    private OrderRepository repo;

    public Order placeOrder(Order order) {
        order.setStatus("PLACED");
        return repo.save(order);
    }
}
