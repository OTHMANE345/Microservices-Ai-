package com.Register.Register.Service;


import com.Login.com.Login.utils.apputils;
import com.Register.Register.JWT.CustomerUserDetailsSErvice;
import com.Register.Register.JWT.JwtUtil;
import com.Register.Register.Repositories.UserRepository;
import com.Register.Register.modules.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Slf4j
@Service
public class UserServices {

    @Autowired
    UserRepository userRepo;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private CustomerUserDetailsSErvice customerUserDetailsSErvice;

    @Autowired
    JwtUtil jwtUtil;
    public ResponseEntity<String> singup(Map<String, String> requestMap) {
      try {
          if(validateSingUpMap(requestMap)){
              User user = userRepo.findByEmailId(requestMap.get("email"));
              if(Objects.isNull(user)){
                  userRepo.save(getUserFromMap(requestMap));
                  return apputils.getResponseEntity("Succefully registred", HttpStatus.OK);

              }else {
                  return apputils.getResponseEntity("Email already exist", HttpStatus.BAD_REQUEST);
              }
          }
          else {
              return apputils.getResponseEntity("Invalid data", HttpStatus.BAD_REQUEST);
          }
      } catch(Exception ex){
          ex.printStackTrace();
      }
      return apputils.getResponseEntity("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private boolean validateSingUpMap(Map<String, String> requestMap) {
        if (requestMap.containsKey("name") && requestMap.containsKey("email") &&
                requestMap.containsKey("contactNumber") && requestMap.containsKey("password")) {
            return true;
        } else {
            return false;

        }
    }

    private User getUserFromMap(Map<String, String> requestMap){
        User user = new User();
        user.setName(requestMap.get("name"));
        user.setContactNumber(requestMap.get("contactNumber"));
        user.setEmail(requestMap.get("email"));
        user.setPassword(requestMap.get("password"));
        user.setRole("user");
        user.setStatus("true");
        return user;

    }

    public ResponseEntity<String> login(Map<String, String> requestMap) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(requestMap.get("email"),requestMap.get("password"))
            );
            if(auth.isAuthenticated()){
                if(customerUserDetailsSErvice.getUserDetail().getStatus().equalsIgnoreCase("true")){
                   String token = jwtUtil.generateToken(customerUserDetailsSErvice.getUserDetail().getEmail(),
                           customerUserDetailsSErvice.getUserDetail().getRole());
                   User user = customerUserDetailsSErvice.getUserDetail();
                   Map<String, Object> object = new HashMap<>();
                   object.put("token",token);
                    object.put("user",user);
                    ObjectMapper mapper = new ObjectMapper();

                    return new ResponseEntity<String>(mapper.writeValueAsString(object), HttpStatus.OK);
                }else {
                    return new ResponseEntity<String>("{\"message\":\""+
                            "wait for admin " +"\"}", HttpStatus.BAD_REQUEST);
                }

            }
        } catch(Exception ex){
            ex.printStackTrace();
        } return new ResponseEntity<String>("{\"Bad credentials\":\""+
                "wait for admin " +"\"}", HttpStatus.BAD_REQUEST);
    }
}