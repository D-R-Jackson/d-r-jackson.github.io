import { OpenEmailWindow } from "./contactWindow.js";


const terminalOutput = document.getElementById('terminalOutput');
const commandInput = Array.from(document.getElementsByClassName("command"));
const commandStructure = `
                          <label class="directory">dan@portfolio:~$ </label>
                          <input type="text" class="command">`;
const commands = ['aboutme', 'projects', 'help', 'skills', 'contact', 'clear', 'matrix']

const projects = [
    {title: 'Groovay', desc: "Groovay is a spotify clone using Client Server architecture that i built in 3 months for my Computer Science A-Level NEA. <br> This was my first time using HTML, JS and CSS so its a little rough around the edges. <br> It only gets the music metadata from Spotify, Its all my own logic and designs. <br> It also features a simple LLM to generate a playlist based on the users prompt.", link: 'https://github.com/D-R-Jackson/Groovay'},
    {title: 'This Portfiolo', desc: "Its the portfolio you're currently using, <br>I chose this design because i have a vendetta against CSS and prefer something more logical and simple. <br> Its made using HTML, JS and CSS and was my first time properly hosting a website.", link: 'https://github.com/D-R-Jackson/d-r-jackson.github.io'},
    {title: 'Dan-AI', desc: "A native GTK4 application written in C that provides a local AI chat interface for Ollama. It supports model discovery and switching, streamed responses, persistent conversations, multiple chat sessions, and local JSON-based chat storage."}
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
    const statusDiv = document.getElementById('formStatus');
    statusDiv.innerText = '';
})

console.log(commandInput.length)
//document.body.addEventListener('blur',()=>{
 //   commandInput[0].focus();
//})
let is_matrix = false;
 const alphabet = ` ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz@#$%&*+-=<>?~[]{}():;/.,"'`.split("")
function Print(div, text){
    div.innerHTML = text
    if(is_matrix){
        Matrix(div)
    }
}

function CycleLetter(v, index, span){
    if(!alphabet.includes(v[index])){
        span.innerText = v[index]
        return;
    }

    let a = Math.floor(Math.random() * alphabet.length);;
    

    function Cycle(){
        let current_letter = alphabet[a]
        span.innerText = current_letter

        let current_index = alphabet.indexOf(current_letter)
        let target_index = alphabet.indexOf(v[index])

        let distance = Math.abs(target_index - current_index)

        distance = Math.min(distance,alphabet.length-distance)

        let closeness = 1-(distance/alphabet.length)

        let opacity = 0.1+Math.pow(closeness,2)*0.9
        span.style.opacity = opacity
        span.style.textShadow = `0 0 ${(opacity/4)*10}px #00ff41`
        span.style.color = `rgb(0, ${Math.floor(80+opacity*175)}, ${Math.floor(20+opacity*60)})`;
        if(current_letter === v[index]){
            span.style.opacity = 1
            return
        }
        a++
        if(a>=alphabet.length){
            a=0
        }
        setTimeout(Cycle,10)
    }
    Cycle()
}
function Matrix(element){
    const walker = document.createTreeWalker(element,NodeFilter.SHOW_TEXT);
    const text_nodes = [];
    let node;
    while (node = walker.nextNode()){
        if(node.textContent.trim() !== ""){
            text_nodes.push(node);
        }

    }
    for(const text_node of text_nodes){
        MatrixText(text_node)
    }
}

function MatrixText(node){
    const text = node.textContent
    const container = document.createElement("span")
    node.parentNode.replaceChild(container, node)

    for(let i=0; i<text.length; i++){
        const letter_span = document.createElement("span")
        container.appendChild(letter_span)
        CycleLetter(text,i,letter_span)
    }
}

function EnterMatrix(){
    if(is_matrix == false){
        //turn it on
        Corrupt(document.body)
        return;
    }else{
        //turn it off
        is_matrix = false;
        CorruptAway(document.body)

        return;
    }
}

function Corrupt(element){
    const elements = []
    function walk(parent){
        for(const child of parent.childNodes){
            if(child.nodeType === Node.TEXT_NODE){
                if(child.textContent.trim()!=""){
                    elements.push({element:child,type:"text"})
                }
                continue
            }
            if(child.nodeType === Node.ELEMENT_NODE && child.matches(".command")){
                if(child.value !== ""){
                    elements.push({element:child,type:"input"})
                }
            continue
            }
            if(child.nodeType === Node.ELEMENT_NODE && child.tagName !== "SCRIPT" && child.tagName !== "STYLE"){
                walk(child)
            }            
        }
    }
    walk(element)
    let delay = 0
    for(const item of elements){
        setTimeout(() => {
            if(item.type === "text"){
                CorruptText(item.element)
            }
            else if(item.type === "input"){
                MatrixInput(item.element)
            }
        }, delay);
        delay+=100
    }
    setTimeout(() => {
        is_matrix = true
        document.body.classList.add("matrix")
        addNewLine()
    }, delay+500);
}

function CorruptText(node){
    const original = node.textContent
    let chars = original.split("")
    let cycles = 0
    const interval = setInterval(() => {
        for(let i=0;i<chars.length;i++){
            if(chars[i] !== " " && Math.random()<0.4){
                chars[i]=alphabet[Math.floor(Math.random()*alphabet.length)]
            }
        }
        node.textContent = chars.join("")
        cycles++
        if(cycles >= 4){
            clearInterval(interval)
            node.textContent=original
            MatrixText(node)
        }
    }, 80);
}

function MatrixInput(input){
    const text = input.value
    if(text === "") return
    const container = document.createElement("span")
    container.className = "matrixInput"
    input.style.display = "none"
    input.parentNode.insertBefore(container, input)
    for(let i = 0; i < text.length; i++){
        const span = document.createElement("span")
        container.appendChild(span)
        CycleLetter(text,i,span)
    }
}

async function CorruptAway(element){
    const lists = element.querySelectorAll("ul, ol");

    for(const list of lists){
        list.style.listStyleType = "none";
    }
    const inputs = element.querySelectorAll("input, textarea");
    for(const input of inputs){
        if(input.value !== ""){
            ConvertInputToText(input);
        }
    }
    const walker = document.createTreeWalker(element,NodeFilter.SHOW_TEXT);
    const text_nodes = [];
    let node;
    while(node = walker.nextNode()){
        if(node.textContent.trim() !== ""){
            text_nodes.push(node);
        }
    }
    for(const node of text_nodes){
        ConvertTextNode(node);
    }
    const spans = element.querySelectorAll("span");
    const animations = [];
    for(const span of spans){
        if(
            span.children.length === 0 &&
            span.textContent.trim() !== ""
        ){
            animations.push(
                DissapearLetter(span)
            );
        }
    }

    await Promise.all(animations);
    document.body.classList.remove("matrix");
    MatrixClear();
}

function ConvertInputToText(input){
    const container = document.createElement("span")
    container.className = "matrixInput"
    container.textContent = input.value
    input.parentNode.replaceChild(container,input)
}
function ConvertTextNode(node){
    const text = node.textContent;
    const container = document.createElement("span");
    node.parentNode.replaceChild(container, node);
    for(const char of text){
        if(char !== " " && alphabet.includes(char)){
            const letter = document.createElement("span");
            letter.innerText = char;
            container.appendChild(letter);
        } else {
            container.appendChild(
                document.createTextNode(char)
            );
        }
    }
}

function DissapearLetter(span){
    return new Promise(resolve => {
        const original = span.innerText;
        let cycles = 0;
        const maxCycles = Math.floor(Math.random() * 10) + 8;
        const speed = Math.random() * 35 + 40;
        const interval = setInterval(() => {
            const currentLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
            span.innerText = currentLetter;
            const currentIndex = alphabet.indexOf(currentLetter);
            const originalIndex = alphabet.indexOf(original);
            let distance = Math.abs(originalIndex - currentIndex);
            distance = Math.min(distance,alphabet.length - distance);
            const closeness = 1 - (distance / alphabet.length);
            const opacity = 0.1 + Math.pow(closeness, 2) * 0.9;
            span.style.opacity = opacity;
            span.style.textShadow = `0 0 ${(opacity / 4) * 10}px #00ff41`;
            span.style.color =`rgb(0,${Math.floor(80 + opacity * 175)},${Math.floor(20 + opacity * 60)})`;
            cycles++;
            if(cycles >= maxCycles){
                clearInterval(interval);
                span.innerText = "\u00A0";
                span.style.opacity = 0;
                span.style.textShadow = "none";
                resolve(); 
            }
        }, speed);
    });
}

function MatrixClear(){
    const ogTop = document.getElementById("title")
    ogTop.remove()
    const top = document.createElement("p")
    top.innerHTML = 'Daniel Jacksons Portfolio [Version 0.1.0] <br> Type "help" for commands'
    top.id = "title"
    terminalOutput.parentNode.insertBefore(top,terminalOutput)
    previouslyEnteredCommands = [''];
    terminalOutput.innerHTML = '';
    script = document.body.querySelector('script:last-of-type');
    setTimeout(addNewLine(),10);
}

function clear(){
    previouslyEnteredCommands = [''];
    terminalOutput.innerHTML = '';
    script = document.body.querySelector('script:last-of-type');
    setTimeout(addNewLine(),10);
}
function addNewLine(){
    const tempDiv = document.createElement('div');
    tempDiv.className = "terminalLine";
    //tempDiv.innerHTML = commandStructure;
    Print(tempDiv, commandStructure)
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
    const projectsCommandStructure =  `
                          <label class="directory">dan@portfolio:~/projects$ </label>
                          <input type="text" class="command">`;
    tempDiv.className = "terminalLine";
    //tempDiv.innerHTML = projectsCommandStructure;
    Print(tempDiv,projectsCommandStructure)
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
    //helpList.innerHTML = '-aboutme <br> -projects <br> -help <br> -skills <br> -contact <br> -clear';
    Print(helpList,'-aboutme <br> -projects <br> -help <br> -skills <br> -contact <br> -clear <br> -matrix')
    tempDiv.appendChild(helpList);
    
    terminalOutput.appendChild(tempDiv);
}
function AboutMe(){
    const tempDiv = document.createElement('div');
    const introduction = document.createElement('p');
    tempDiv.style.paddingLeft = sPadding;
    //introduction.innerHTML = `Im Dan, an 18 year old developer and electonics hobbyist. I love the combination of software and hardware.<br>I range from building web apps to programming microcontrollers.<br> I'm currently working towards studying mechatronics or CS with the goal of getting into Robotics engineering. <br>When im not coding im most likely fiddling with my car or climbing a mountain.`;
    Print(introduction, `Im Dan, an 18 year old developer and electonics hobbyist. I love the combination of software and hardware.<br>I range from building web apps to programming microcontrollers.<br> I'm currently working towards studying mechatronics or CS with the goal of getting into Robotics engineering. <br>When im not coding im most likely fiddling with my car or climbing a mountain.`)
    tempDiv.appendChild(introduction);
    terminalOutput.appendChild(tempDiv);
}
function Skills(){
    const tempDiv = document.createElement('div');
    const skills = document.createElement('p');
    tempDiv.style.paddingLeft = sPadding;
    const skills_text =  `<strong>Web Development (A-level project + this portfolio)</strong><br> 
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
    //skills.innerHTML = skills_text;
    Print(skills,skills_text)
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

    p1.style.paddingLeft = sPadding;

    //p1Title.innerHTML = `<strong>${project.title}</strong>`;
    Print(p1Title,`<strong>${project.title}</strong>`)
    //p1Desc.innerHTML = project.desc;
    Print(p1Desc, project.desc)
    p1Link.href = project.link
    //p1Link.innerHTML = 'Github Repo';
    Print(p1Link, 'Github Repo')
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
        //errorOutput.innerHTML = cmd + ' is not a valid command, use "exit" to exit or "next"/"prev" to navigate projects'
        Print(errorOutput, cmd + ' is not a valid command, use "exit" to exit or "next"/"prev" to navigate projects')
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
        //errorOutput.innerHTML = cmd + ' is not a valid command, please refer to "help" for valid commands'
        Print(errorOutput, cmd + ' is not a valid command, please refer to "help" for valid commands' );
        
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
                //projectsIntro.innerHTML = 'Welcome to my projects, <br> To navigate projects use commands "next" & "prev" <br> To return to main portfolio use "exit"'
                Print(projectsIntro, 'Welcome to my projects, <br> To navigate projects use commands "next" & "prev" <br> To return to main portfolio use "exit"')
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
            if(cmd == 'matrix'){
                EnterMatrix()
            }
        }
    });
}