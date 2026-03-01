import { OpenEmailWindow } from "./contactWindow.js";


const terminalOutput = document.getElementById('terminalOutput');
const commandInput = Array.from(document.getElementsByClassName("command"));
const commandStructure = `
                          <label class="directory">C:\\Users\\Guest></label>
                          <input type="text" class="command">`;
const commands = ['aboutme', 'projects', 'help', 'skills', 'contact', 'clear']

const projects = [
    {title: 'Groovay', desc: "Groovay description here", link: 'https://github.com/D-R-Jackson/Groovay'},
    {title: 'Groovay2', desc: "Groovay description here", link: 'https://github.com/D-R-Jackson/Groovay'},
    {title: 'Groovay3', desc: "Groovay description here", link: 'https://github.com/D-R-Jackson/Groovay'},
    {title: 'Groovay4', desc: "Groovay description here", link: 'https://github.com/D-R-Jackson/Groovay'},
];
const sPadding = '5ch'

var previouslyEnteredCommands = [];
var currentCommandLine = commandInput[0];
var script = document.body.querySelector('script:last-of-type');
var currentProject = 0;


currentCommandLine.value = '';
previouslyEnteredCommands.push(currentCommandLine.value);
//commandInput[0].addEventListener('blur', ()=>{
    //commandInput[0].focus();
//})
currentCommandLine.addEventListener('keypress',(event)=>{
    if(event.key == 'Enter'){
        event.preventDefault();
        ExecuteCommand();
    }
})

document.querySelector('.closeButton').addEventListener('click',()=>{
    document.getElementById('contactWindow').style.display = 'none';
    
})

console.log(commandInput.length)
//document.body.addEventListener('blur',()=>{
 //   commandInput[0].focus();
//})
function clear(){
    previouslyEnteredCommands = [''];
    terminalOutput.innerHTML = '';
    script = document.body.querySelector('script:last-of-type');
    setTimeout(addNewLine(),10);
}
function addNewLine(){
    const tempDiv = document.createElement('div');
    tempDiv.className = "terminalLine";
    tempDiv.innerHTML = commandStructure;
    
    terminalOutput.appendChild(tempDiv);
    const input = tempDiv.querySelector('input');
    currentCommandLine = input;
    
    var commandIndex = 0;
    input.addEventListener('keypress',(event)=>{
        if(event.key == 'Enter'){
            event.preventDefault();
            ExecuteCommand();
        }

    })

    input.addEventListener('keydown', (event)=>{
        if(event.key === 'ArrowUp'){
            event.preventDefault();
            console.log(commandIndex, previouslyEnteredCommands.length)
            if(commandIndex != previouslyEnteredCommands.length){
                commandIndex += 1;
                currentCommandLine.value = previouslyEnteredCommands[previouslyEnteredCommands.length-commandIndex];
            }
        }
        if(event.key == 'ArrowDown'){
            event.preventDefault();
            console.log(commandIndex, previouslyEnteredCommands.length)
            if(commandIndex > 0){
                commandIndex -=1;
                if(commandIndex == 0){
                    currentCommandLine.value = '';
                }else{
                    currentCommandLine.value = previouslyEnteredCommands[previouslyEnteredCommands.length-commandIndex];
                }
            }
        }        
    })

    
    const tryFocus = () => {
        input.focus();
        
        if (input !== document.activeElement) {
            input.select();         
            input.focus();          
        }
    };
    tryFocus();
    setTimeout(tryFocus, 10); 
   
}
function AddNewProjectsLine(){
    const tempDiv = document.createElement('div');
    tempDiv.className = "terminalLine";
    tempDiv.innerHTML = commandStructure;
    var commandIndex = 0;
    terminalOutput.appendChild(tempDiv);

    const input = tempDiv.querySelector('input');
    currentCommandLine = input;
    
    //input.addEventListener('blur',()=>{
     //   input.focus();
   // });
   input.addEventListener('keypress',(event)=>{
    if(event.key == 'Enter'){
        event.preventDefault();
        ExecuteProjectsCommand();
    }
    })
    input.addEventListener('keydown', (event)=>{
        if(event.key === 'ArrowUp'){
            event.preventDefault();
            console.log(commandIndex, previouslyEnteredCommands.length)
            if(commandIndex != previouslyEnteredCommands.length){
                commandIndex += 1;
                currentCommandLine.value = previouslyEnteredCommands[previouslyEnteredCommands.length-commandIndex];
            }
        }
        if(event.key == 'ArrowDown'){
            event.preventDefault();
            console.log(commandIndex, previouslyEnteredCommands.length)
            if(commandIndex > 0){
                commandIndex -=1;
                if(commandIndex == 0){
                    currentCommandLine.value = '';
                }else{
                    currentCommandLine.value = previouslyEnteredCommands[previouslyEnteredCommands.length-commandIndex];
                }
            }
        }        
    })
    
    const tryFocus = () => {
        input.focus();
        
        if (input !== document.activeElement) {
            input.select();         
            input.focus();          
        }
    };
    tryFocus();
    setTimeout(tryFocus, 10); 
}
function help(){
    const tempDiv = document.createElement('div');
    tempDiv.style.paddingLeft = sPadding;

    const helpList = document.createElement('p');
    helpList.innerHTML = '-about me <br> -projects <br> -help <br> -skills <br> -contact <br> -clear';
    tempDiv.appendChild(helpList);
    
    terminalOutput.appendChild(tempDiv);
}
function AboutMe(){
    const tempDiv = document.createElement('div');
    const introduction = document.createElement('p');
    tempDiv.style.paddingLeft = sPadding;
    introduction.innerHTML = 'Introduction Bla bla bla bla bla bla bla use >br< to do the fucking new line';
    tempDiv.appendChild(introduction);
    terminalOutput.appendChild(tempDiv);
}
function Skills(){
    const tempDiv = document.createElement('div');
    const skills = document.createElement('p');

    skills.innerHTML = `<strong>Web Development (A-level project + this portfolio)</strong><br> 
                        <ul style="margin-left: 1.5rem; list-style-type: disc;">
                        <li>HTML&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - structure & semantics</li>
                        <li>CSS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - styling, layouts, animations</li>
                        <li>JavaScript&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - page logic, backend</li>
                        <li>Node.js + Express.js - backend server & api</li>
                        </ul><br>
                        
                        <strong>Embedded Programming</strong><br>
                        <ul style="margin-left: 1.5rem; list-style-type: disc;">
                        <li>C++&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - ESP32 Firmware</li>
                        </ul><br>
                        
                        <strong>Scripting</strong><br>
                        <ul style="margin-left: 1.5rem; list-style-type: disc;">
                        <li>Python&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Quick scripts to automate boring stuff</li>
                        </ul>`;
    tempDiv.appendChild(skills);
    terminalOutput.appendChild(tempDiv);                       
}
function Contact(){
    OpenEmailWindow();
}
function Projects(){
    const tempDiv = document.createElement('div');
    tempDiv.style.paddingLeft = sPadding;
    
    //add projects here
    const p1 = document.createElement('div');
    const p1Title = document.createElement('p');
    const p1Desc = document.createElement('p');
    const p1Link = document.createElement('a');
    const p1Space = document.createElement('p');
    const project = projects[currentProject];

    p1Title.innerHTML = `<strong>${project.title}</strong>`;
    p1Desc.innerHTML = project.desc;
    p1Link.href = project.link
    p1Link.innerHTML = 'Github Repo';
    p1Link.target = '_blank';
    p1Link.rel = 'noopener noreferrer';

    p1.appendChild(p1Title);
    p1.appendChild(p1Desc);
    p1.appendChild(p1Link);
    p1.appendChild(p1Space);
    

    //next-prev handling
    tempDiv.appendChild(p1);
    terminalOutput.appendChild(p1);
    AddNewProjectsLine();
}
function ExecuteProjectsCommand(){
    previouslyEnteredCommands.push(currentCommandLine.value.trim());
    console.log(previouslyEnteredCommands);
    const cmd = currentCommandLine.value.trim().toLowerCase();
    const projectCommands = ['next', 'prev', 'exit'];

        if(!projectCommands.includes(cmd)){
        const errorOutput = document.createElement('p');
        errorOutput.style.paddingLeft = sPadding;
        errorOutput.innerHTML = cmd + ' is not a valid command, use "exit" to exit or "next"/"prev" to navigate projects'
        terminalOutput.appendChild(errorOutput);
        AddNewProjectsLine();
    }
    projectCommands.forEach(c=>{
        if(cmd == c){
            if(cmd == 'exit'){
                previouslyEnteredCommands = [''];
                addNewLine();
            }
            if(cmd == 'next'){
                currentProject = (currentProject + 1) % projects.length;
                Projects();
            }
            if(cmd == 'prev'){
                currentProject = (currentProject - 1 + projects.length) % projects.length;
                Projects();
            }
        }
    })
}
function ExecuteCommand(){
    previouslyEnteredCommands.push(currentCommandLine.value.trim());
    console.log(previouslyEnteredCommands);
    const cmd = currentCommandLine.value.trim().toLowerCase();

    if(!commands.includes(cmd)){
        const errorOutput = document.createElement('p');
        errorOutput.style.paddingLeft = sPadding;
        errorOutput.innerHTML = cmd + ' is not a valid command, please refer to "help" for valid commands'
        terminalOutput.appendChild(errorOutput);
        addNewLine();
    }
    commands.forEach(c => {
        if(cmd === c){
            if(cmd == 'help'){
                help();
                addNewLine();
            }
            if(cmd == 'aboutme'){
                AboutMe();
                addNewLine();
            }
            if(cmd == 'projects'){
                currentProject = 0;
                previouslyEnteredCommands = [''];

                const tempDiv = document.createElement('div');
                const projectsIntro = document.createElement('p');
                tempDiv.style.paddingLeft = sPadding;
                projectsIntro.innerHTML = 'Welcome to my projects, <br> To navigate projects use commands "next" & "prev" <br> To return to main portfolio use "exit"'
                tempDiv.appendChild(projectsIntro);
                terminalOutput.appendChild(tempDiv);
                Projects();
            }
            if(cmd == 'clear'){
                clear();
            }
            if(cmd == 'skills'){
                Skills();
                addNewLine();
            }
            if(cmd == 'contact'){
                Contact();
                addNewLine();
            }
        }
    });
}