<html>
<body>
<h2>Hello World!</h2>


    <input type="text" name="name" id="name"><br>
    <button id="button">New Owner</button><br>
    <br>
    <br>
    <input type="text" name="projectName" id="projectName"><br>
    <input type="text" name="programmingLanguage" id="projectLang"><br>
    <button id="projectButton">New Owner</button><br>
    



<script>

    const button = document.getElementById("button");
    const apiURL = "http://localhost:8080/design-to-code/owner";


    function makePostRequest(){

        let name = document.getElementById("name").value;
        const Owner = {
        name : name
        };

        console.log(Owner)
        let method = 'POST';
        
        fetch(apiURL,{
            method:method,
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(Owner)
        })
        .then((data)=>{
            console.log(data)
        })
        .catch((error)=>{
            console.log(error)
        });
    }

    button.addEventListener("click",makePostRequest);

    const projectButton = document.getElementById("projectButton");
    const projectURL = "http://localhost:8080/design-to-code/project"


    function addNewProject(){
        let programmingLanguage = document.getElementById("projectName").value;
        let projectName = document.getElementById("projectLang").value;
        let dt = new Date();
        
        const project = {
            programmingLanguage : programmingLanguage,
            projectName : projectName,
            deployTime : dt
        }

        let method = 'POST';

        fetch(projectURL,{
            method:method,
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(project)
        })
        .then((data)=>{
            console.log(data)
        })
        .catch((err)=>{
            console.log(err)
            return
        });
    }

    projectButton.addEventListener("click",addNewProject);
</script>
</body>
</html>
