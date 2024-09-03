package com.Register.Register.JWT;


import com.Register.Register.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Objects;

@Service
public class CustomerUserDetailsSErvice implements UserDetailsService {
    @Autowired
    UserRepository userRepo;

    private com.Register.Register.modules.User userDetail;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        userDetail = userRepo.findByEmailId(username);
        if(!Objects.isNull(username)){
            return new org.springframework.security.core.userdetails.User(userDetail.getEmail(),userDetail.getPassword(),new ArrayList<>());
        }
        else {
            throw new UsernameNotFoundException("User Not Found");
        }
    }

    public com.Register.Register.modules.User getUserDetail(){
        return userDetail;
    }
}
