package com.Register.Register.Repositories;

import com.Register.Register.modules.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{

    User findByEmailId(@Param("email") String email);
}
