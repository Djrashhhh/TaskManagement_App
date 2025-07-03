package com.taskstracking.tasksmgmt.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskstracking.tasksmgmt.domains.Users;

@Repository
public interface UsersRepository  extends JpaRepository<Users, Long> {
    Users findByUsername(String username);
    Users findByPassword (String password);
}
