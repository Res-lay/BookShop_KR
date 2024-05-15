package org.example.kr_backend.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.example.kr_backend.models.Purchases;
import org.example.kr_backend.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailService {

    @Value("${spring.mail.username}")
    private String from;

    @Autowired
    private JavaMailSender mailSender;

    @Async
    public void sendEmail(Purchases purchase, User receiver) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(receiver.getEmail());
        message.setSubject("Latyshev-Shop Delivery");

        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("Hello, ").append(receiver.getName()).append("\n").append("You create a new purchase.")
                .append(" More information about it below\n\n");
        int i = 1;
        double totalPrice = 0;
        for (var item : purchase.getItems()) {
            String itemData = i + ". " + item.getBook().getName() + " by " + item.getBook().getAuthor() + " in" +
                    " the amount of " + item.getQuantity() + " units\n";
            stringBuilder.append(itemData);
            totalPrice += item.getQuantity() * item.getBook().getPrice();
            i ++;
        }
        stringBuilder.append("\n").append("-".repeat(20)).append("\nTotal price: USD ").append(totalPrice);
        message.setText(stringBuilder.toString());
        try {
            mailSender.send(message);
        } catch (MailException e) {
            e.printStackTrace();
        }
    }
}
