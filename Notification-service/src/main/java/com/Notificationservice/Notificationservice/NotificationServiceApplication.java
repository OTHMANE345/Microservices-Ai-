package com.Notificationservice.Notificationservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.kafka.annotation.KafkaListener;

@SpringBootApplication
public class NotificationServiceApplication {
	public static void main(String[] args) {
		SpringApplication.run(NotificationServiceApplication.class, args);
	}

	@KafkaListener(topics = "notificationTopic")
	public void handleNotification(String message) {
		if (message.equals("Snek detected!")) {
			System.out.println("A snek has been detected! Please take necessary precautions.");
		} else {
			System.out.println("Received notification: " + message);
		}
	}
}
