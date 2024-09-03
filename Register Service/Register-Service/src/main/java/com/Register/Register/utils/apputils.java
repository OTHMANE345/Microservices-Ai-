package com.Login.com.Login.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class apputils {

    private apputils(){

    }

    public static ResponseEntity<String> getResponseEntity(String responseMessage, HttpStatus httpStatus){
        return new ResponseEntity<String>("{\"message\":\""+responseMessage+"\"}", httpStatus);

    }
}
