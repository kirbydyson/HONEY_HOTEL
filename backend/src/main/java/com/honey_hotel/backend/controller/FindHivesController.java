package com.honey_hotel.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.honey_hotel.backend.model.BookingDetails;
import com.honey_hotel.backend.model.Room;
import com.honey_hotel.backend.service.FindHivesService;

@RestController
@RequestMapping("/api/hives")
public class FindHivesController {

    @Autowired
    private FindHivesService findHivesService;

    @PostMapping("/find")
    public List<Room> findRooms(@RequestBody BookingDetails bookingDetails) {
        List<Room> availableRooms = findHivesService.findAvailableRooms(
                bookingDetails.getHotelLocation(),
                bookingDetails.getStartDate(),
                bookingDetails.getEndDate()
        );


        if (availableRooms.isEmpty()) {
            System.out.println("No available rooms found for the specified date range.");
        } else {
            availableRooms.forEach(room -> {
                System.out.println("Room ID: " + room.getId()
                        + ", Category: " + room.getCategory().getCategoryName()
                        + ", Size: " + room.getRoomSize()
                        + ", Bed Type: " + room.getBedType()
                        + ", Smoking Allowed: " + room.isSmokingAllowed()
                        + ", Status: " + room.getStatus()
                        + ", Price: $" + room.getPrice()
                        + ", Available From: " + room.getAvailableFrom()
                        + ", Available Until: " + room.getAvailableUntil());
            });
        }

        return availableRooms;
    }


}