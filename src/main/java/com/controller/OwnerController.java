package com.controller;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import com.model.Owner;
import com.dao.OwnerDAO;

@WebServlet("/owner/*")
public class OwnerController extends HttpServlet {

    
    protected void doPost(HttpServletRequest req,HttpServletResponse res) throws IOException{

        StringBuilder sb = new StringBuilder();
        BufferedReader reader = req.getReader();

        try{
            String line;
            while((line = reader.readLine()) != null){
                sb.append(line).append("\n");
            }
        }catch(Exception e){
            System.out.println(e);
            return;
        }finally{
            reader.close();
        }
        String jsonData = sb.toString();
        Gson gson = new Gson();
      
        Owner newOwner = gson.fromJson(jsonData, Owner.class);
        OwnerDAO newOwnerDA0 = new OwnerDAO();

        newOwnerDA0.newOwner(newOwner);

        
    }
    
}
