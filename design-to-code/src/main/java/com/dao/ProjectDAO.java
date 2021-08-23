package com.dao;

import java.sql.PreparedStatement;
// import java.sql.ResultSet;
import java.sql.SQLException;

// import java.sql.Timestamp;
import com.model.Project;

public class ProjectDAO {

    private LoadDbDetails dbDet = new LoadDbDetails();

    
    public void newProject(Project project){

        String insertStatement = "INSERT INTO project VALUES (0,?,CURRENT_TIMESTAMP,?,34);";

        PreparedStatement prepStatement = dbDet.createStatement(insertStatement);
        try{
            prepStatement.setString(1, project.getProjectName());
            prepStatement.setString(2, project.getProgrammingLanguage());
            int rowsAffected = prepStatement.executeUpdate();

            if(rowsAffected == 0){
                System.out.println("Error");
                return;
            }else{
                System.out.println("Inserted successfully");
                return;
            }
        }catch(SQLException e){
            System.out.println(e);
        }

    }

    
    
}
