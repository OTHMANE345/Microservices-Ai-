package com.Register.Register.Controllers;

import com.Register.Register.Repositories.UserRepository;
import com.Register.Register.Service.UserServices;
import com.Register.Register.modules.User;
import com.Login.com.Login.utils.apputils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RequestMapping(path = "/user")
@RestController
public class UserController {

    @Autowired
    UserServices userservice;
    @PostMapping(path = "/singup")
    public ResponseEntity<String> singUp(@RequestBody(required = true) Map<String,String> requestMap){
        try {
            return userservice.singup(requestMap);
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return apputils.getResponseEntity("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping(path = "/login")
    public ResponseEntity<String> login(@RequestBody(required = true) Map<String,String> requestMap){
        try {
            return userservice.login(requestMap);
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return apputils.getResponseEntity("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
