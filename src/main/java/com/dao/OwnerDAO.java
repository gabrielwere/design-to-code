package com.dao;


import java.sql.PreparedStatement;

import com.model.Owner;

public class OwnerDAO {

    private LoadDbDetails dbDet = new LoadDbDetails();

    public void newOwner(Owner owner){

        String insertStatement = "INSERT INTO owner VALUES (?,0) ;";
        PreparedStatement prepStatement = dbDet.createStatement(insertStatement);

        try{
            prepStatement.setString(1, owner.getName());

            int rowsAffected = prepStatement.executeUpdate();

            if(rowsAffected == 0){
                System.out.println("Error");
                return;
            }else{
                System.out.println("Inserted successfully");
                return;
            }
        }catch(Exception e){
            System.out.println(e);
            return;
        }
    }
}
