package com.controller;

import java.io.BufferedReader;
import java.io.IOException;
// import java.io.PrintWriter;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.dao.ProjectDAO;
import com.google.gson.Gson;
import com.model.Project;

@WebServlet("/project")
public class ProjectController extends HttpServlet{

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

        Project newProject = gson.fromJson(jsonData, Project.class);

        ProjectDAO projectDAO = new ProjectDAO();
        projectDAO.newProject(newProject);
    }

    
    
}
