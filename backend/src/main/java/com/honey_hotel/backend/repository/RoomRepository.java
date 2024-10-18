package com.honey_hotel.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.honey_hotel.backend.model.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    @Query("SELECT r FROM Room r "
            + "JOIN r.category rc "
            + "JOIN rc.hotel h "
            + "WHERE LOWER(h.name) LIKE LOWER(CONCAT('%', :location, '%')) "
            + "AND r.status = 'Available' ")
    List<Room> findAvailableRooms(@Param("location") String location);
}
