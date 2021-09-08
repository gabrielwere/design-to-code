package com.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class LoadDbDetails {


    public PreparedStatement createStatement(String sqlStatement){

        String url = "jdbc:mysql://localhost:3306/skyworld";
        String user = "gabriel";
        String password = "ivar31";

        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection connection = DriverManager.getConnection(url, user, password);
            PreparedStatement statement = connection.prepareStatement(sqlStatement);
            return statement;

        }catch(Exception e){
            return null;
        }
    }
    
}
