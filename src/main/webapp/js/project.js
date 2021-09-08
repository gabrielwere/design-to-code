//OPEN AND CLOSE THE FORM
const newProject = document.querySelector(".newProject");
const addProjectForm = document.querySelector(".addProjectForm");
const closeFormButton = document.getElementById("closeForm");


function displayForm(){
    addProjectForm.style.marginLeft = 0;
}

function closeForm(){
    addProjectForm.style.marginLeft = -1500+"px";
}

newProject.addEventListener("click",displayForm);
closeFormButton.addEventListener("click",closeForm);

const projectsSection  = document.querySelector('.projectsSection');


//SORT THE PROJECTS

let lastModifiedButton = document.getElementById("lastModified")
let firstModifiedButton = document.getElementById("firstModified");
let sorted = false

function sortProjects(){

    if(sorted == true){
        firstModifiedButton.classList.remove("visible")
        firstModifiedButton.classList.add("invisible")

        lastModifiedButton.classList.add("visible")
        lastModifiedButton.classList.remove("invisible")

        let projects = document.querySelectorAll(".projects")

        for(let i=(projects.length -1);i>=0;i--){
            projectsSection.appendChild(projects[i])
        }
        sorted = false
        return
    }
    let projects = document.querySelectorAll(".projects")

    for(let i=(projects.length -1);i>=0;i--){
        projectsSection.appendChild(projects[i])
    }

    firstModifiedButton.classList.remove("invisible")
    firstModifiedButton.classList.add("visible")

    lastModifiedButton.classList.add("invisible")
    lastModifiedButton.classList.remove("visible")
    sorted = true
}

lastModifiedButton.addEventListener("click",sortProjects)
firstModifiedButton.addEventListener("click",sortProjects)


//GET ALL PROJECTS
function getAllProjects(){

    const URL = "http://localhost:8080/design-to-code/project/";

    fetch(URL)
    .then((response)=>{
        return response.json()
    })
    .then((data)=>{

        notFound.style.visibility = "hidden"
           //REMOVE CHILD NODES FIRST
           while(projectsSection.childNodes.length > 2){
               projectsSection.removeChild(projectsSection.lastChild)
           }

        data.forEach((value)=>{
            //ADD NEW CHILD
           let wrapperDiv = document.createElement("div")
           let projectName = document.createElement('div')
           let projectDetails = document.createElement('div')
           
           let nameSection1 = document.createElement('span')
            let nameSection2 = document.createElement('span')

            let detailsSection1 = document.createElement('span')
            let detailsSection2 = document.createElement('span')

            nameSection1.className = 'section1';
            nameSection2.className = 'section2';

            detailsSection1.className = 'section1';
            detailsSection2.className = 'section2';

            let nameSection1Icon = document.createElement('i')
            let nameSection1Span = document.createElement('span')

            let str = value.projectName.toString();
            let dataProjectName = str.charAt(0).toUpperCase() + str.slice(1)
            nameSection1Span.textContent = dataProjectName

            let detailsSection1Icon = document.createElement('i');
            let detailsSection1Span = document.createElement('span')



            detailsSection1Span.textContent = `debbielewis/${value.projectName}`

            let detailsSection2List = document.createElement('ul')

            let item1 = document.createElement('li')
            let item2 = document.createElement('li')
            let item3 = document.createElement('li')

            let str1 = value.programmingLanguage.toString();
            let dataProgLanguage = str1.charAt(0).toUpperCase() + str1.slice(1)

            //CALCULATE LAST DEPLOYED DATE
            let date = new Date(value.deployTime)

            let date2 = new Date()

            let var1 = date2.getTime()

            const diffTime = Math.abs(var1 - date);
            let content;
            let dateText
            if((content = Math.floor(diffTime/(1000 * 60 * 60 *24 * 7)))>0){
                dateText = `Last deployed ${content} w ago`
            }else if((content = Math.floor(diffTime/(1000 * 60 * 60 * 24)))>0){
                dateText = `Last deployed ${content} d ago`;
            }else if((content = Math.floor(diffTime/(1000 * 60 * 60)))>0){
                dateText = `Last deployed ${content} h ago`;
            }else if((content = Math.floor(diffTime/(1000 * 60)))>0){
                dateText = `Last deployed ${content} min ago`;
            }else{
                dateText = `Last deployed ${Math.floor(diffTime/1000)} secs ago`
            }


            item1.textContent = dataProgLanguage
            item2.textContent = dateText
            item3.textContent = `Kenya`
            
            detailsSection2List.appendChild(item1)
            detailsSection2List.appendChild(item2)
            detailsSection2List.appendChild(item3)

            let nameSection2Icon = document.createElement('i')
            let nameSection2Span = document.createElement('span')

            nameSection1Icon.className = "far fa-dot-circle active";
            nameSection2Icon.className = "fas fa-star starred";

            nameSection2Span.textContent = `Visit Site`
            detailsSection1Icon.className = "fab fa-github";

            detailsSection1Icon.style.padding = 5+"px";


            nameSection1.appendChild(nameSection1Icon);
            nameSection1.appendChild(nameSection1Span);

            nameSection2.appendChild(nameSection2Span);
            nameSection2.appendChild(nameSection2Icon);

            detailsSection1.appendChild(detailsSection1Icon);
            detailsSection1.appendChild(detailsSection1Span)

            detailsSection2.appendChild(detailsSection2List)

            projectName.appendChild(nameSection1);
            projectName.appendChild(nameSection2);

            projectDetails.appendChild(detailsSection1)
            projectDetails.appendChild(detailsSection2)

            projectDetails.className = 'projectDetails';
            projectName.className = 'projectName';
            wrapperDiv.className = 'projects';

            wrapperDiv.appendChild(projectName)
            wrapperDiv.appendChild(projectDetails)

            projectsSection.appendChild(wrapperDiv)
        })
    })
}

//ADD  A NEW PROJECT
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

    closeForm()
    window.alert("Refresh page to see new changes")
}

projectButton.addEventListener("click",addNewProject);

//SEARCH FOR PROJECTS
const searchButton = document.getElementById("searchButton");
const notFound = document.querySelector(".notFound");


function fetchProjects(){

    let projName = document.getElementById("searchValue").value;

    if(projName == ""){
        getAllProjects()
        return
    }

    let apiURL = `http://localhost:8080/design-to-code/project/${projName}`

    fetch(apiURL)
    .then((response)=>{
        return response.json()
    })
    .then((data)=>{
       if(data == null){
           const projects = document.querySelectorAll(".projects");
           notFound.style.visibility = "visible"
           projects.forEach((value)=>{
               value.style.visibility = "hidden"
           })

       }else{
           notFound.style.visibility = "hidden"
           //REMOVE CHILD NODES FIRST
           while(projectsSection.childNodes.length > 2){
               projectsSection.removeChild(projectsSection.lastChild)
           }

           //ADD NEW CHILD
           let wrapperDiv = document.createElement("div")
           let projectName = document.createElement('div')
           let projectDetails = document.createElement('div')
           
           let nameSection1 = document.createElement('span')
            let nameSection2 = document.createElement('span')

            let detailsSection1 = document.createElement('span')
            let detailsSection2 = document.createElement('span')

            nameSection1.className = 'section1';
            nameSection2.className = 'section2';

            detailsSection1.className = 'section1';
            detailsSection2.className = 'section2';

            let nameSection1Icon = document.createElement('i')
            let nameSection1Span = document.createElement('span')

            let str = data.projectName.toString();
            let dataProjectName = str.charAt(0).toUpperCase() + str.slice(1)
            nameSection1Span.textContent = dataProjectName

            let detailsSection1Icon = document.createElement('i');
            let detailsSection1Span = document.createElement('span')



            detailsSection1Span.textContent = `debbielewis/${data.projectName}`

            let detailsSection2List = document.createElement('ul')

            let item1 = document.createElement('li')
            let item2 = document.createElement('li')
            let item3 = document.createElement('li')

            let str1 = data.programmingLanguage.toString();
            let dataProgLanguage = str1.charAt(0).toUpperCase() + str1.slice(1)

            //CALCULATE LAST DEPLOYED DATE
            let date = new Date(data.deployTime)

            let date2 = new Date()

            let var1 = date2.getTime()

            const diffTime = Math.abs(var1 - date);
            let content;
            let dateText
            if((content = Math.floor(diffTime/(1000 * 60 * 60 *24 * 7)))>0){
                dateText = `Last deployed ${content} w ago`;
            }else if((content = Math.floor(diffTime/(1000 * 60 * 60 * 24)))>0){
                dateText = `Last deployed ${content} d ago`;
            }else if((content = Math.floor(diffTime/(1000 * 60 * 60)))>0){
                dateText = `Last deployed ${content} h ago`;
            }else if((content = Math.floor(diffTime/(1000 * 60)))>0){
                dateText = `Last deployed ${content} min ago`;
            }else{
                dateText = `Last deployed ${Math.floor(diffTime/1000)} secs ago`
            }

            item1.textContent = dataProgLanguage
            item2.textContent = dateText
            item3.textContent = `Kenya`
            
            detailsSection2List.appendChild(item1)
            detailsSection2List.appendChild(item2)
            detailsSection2List.appendChild(item3)

            let nameSection2Icon = document.createElement('i')
            let nameSection2Span = document.createElement('span')

            nameSection1Icon.className = "far fa-dot-circle active";
            nameSection2Icon.className = "fas fa-star starred";

            nameSection2Span.textContent = `Visit Site`
            detailsSection1Icon.className = "fab fa-github";

            detailsSection1Icon.style.padding = 5+"px";


            nameSection1.appendChild(nameSection1Icon);
            nameSection1.appendChild(nameSection1Span);

            nameSection2.appendChild(nameSection2Span);
            nameSection2.appendChild(nameSection2Icon);

            detailsSection1.appendChild(detailsSection1Icon);
            detailsSection1.appendChild(detailsSection1Span)

            detailsSection2.appendChild(detailsSection2List)

            projectName.appendChild(nameSection1);
            projectName.appendChild(nameSection2);

            projectDetails.appendChild(detailsSection1)
            projectDetails.appendChild(detailsSection2)

            projectDetails.className = 'projectDetails';
            projectName.className = 'projectName';
            wrapperDiv.className = 'projects';

            wrapperDiv.appendChild(projectName)
            wrapperDiv.appendChild(projectDetails)

            projectsSection.appendChild(wrapperDiv)
            console.log(data)
       }
    })
    .catch((err)=>{
        console.log(err);
    })
}

searchButton.addEventListener("click",fetchProjects);

window.onload = getAllProjects()