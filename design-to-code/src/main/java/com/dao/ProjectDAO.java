package com.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;

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

    public Project getProject(String projectName){

        String selectStatement = "SELECT programmingLanguage,deployTime,projectName FROM project WHERE projectName = ?;";

        PreparedStatement statement = dbDet.createStatement(selectStatement);

        String programmingLanguage = "";
        String projName = "";
        Timestamp deployTime = null;

        try{
            statement.setString(1, projectName);
            ResultSet rs = statement.executeQuery();
            Project project = null;
            while(rs.next()){
                programmingLanguage = rs.getString("programmingLanguage");
                projName = rs.getString("projectName");
                deployTime = rs.getTimestamp("deployTime");

                project = new Project(programmingLanguage, projName, deployTime);
            }
            return project;
        }catch(SQLException e){
            System.out.println(e);
            return null;
        }
       
    }

    
    
}
