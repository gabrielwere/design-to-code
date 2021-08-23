package com.model;

import java.sql.Timestamp;

// import java.sql.Timestamp;

public class Project {

    private String programmingLanguage;
    private String projectName;
    private Timestamp deployTime;

    public Project(String programmingLanguage,String projectName,Timestamp deployTime){
        this.programmingLanguage = programmingLanguage;
        this.projectName = projectName;
        this.deployTime = deployTime;
    }

    public String getProgrammingLanguage(){
        return programmingLanguage;
    }

    public String getProjectName(){
        return projectName;
    }

    public Timestamp getDeployTime(){
        return deployTime;
    }
    
}
