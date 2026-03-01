import { SendEmail } from "./contact.js";

let win = document.getElementById('contactWindow');
const titleBar = document.getElementById('titleBar');

let isDragging = false;
let initialX = 0;
let initialY = 0;
let currentX = 0;
let currentY = 0;

export function OpenEmailWindow(){
    if(!win){
        console.error('Email window doesnt exist');
        return;
    }
    win = document.getElementById('contactWindow');
    win.style.display = 'block';

    win.offsetHeight;
    const rect = win.getBoundingClientRect();
    currentX = (window.innerWidth - rect.width)/2;
    currentY = (window.innerHeight - rect.height)/2;

    win.style.left = `${currentX}px`;
    win.style.top = `${currentY}px`;
    win.style.transform = 'none';
}

titleBar.addEventListener('mousedown', (event)=>{
    if(event.target.closest('.closeButton')) return;

    const rect = win.getBoundingClientRect();
    currentX = rect.left;
    currentY = rect.top;

    initialX = event.clientX - currentX;
    initialY = event.clientY - currentY;

    isDragging = true;
    titleBar.style.cursor = 'grabbing';
})

document.addEventListener('mousemove',(event)=>{
    if(!isDragging) return;
    event.preventDefault();

    let newX = event.clientX - initialX;
    let newY = event.clientY - initialY;

    const rect = win.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const margin = titleBar.offsetHeight + 245;

    newX = Math.max(-rect.width + margin, Math.min(vw - margin, newX));
    newY = Math.max(-rect.height + margin, Math.min(vh - margin, newY));

    currentX = newX;
    currentY = newY;

    win.style.left = `${currentX}px`;
    win.style.top = `${currentY}px`;
})

document.addEventListener('mouseup',()=>{
    isDragging = false;
    if(titleBar) titleBar.style.cursor = 'move';
})

document.getElementById("sendButton").addEventListener('click',()=>{
    const name = document.getElementById('nameInput')
    const email = document.getElementById('emailInput')
    const message = document.getElementById('messageInput')
    SendEmail(name.value.trim(),email.value.trim(),message.value.trim());
    setTimeout(function(){
        name.value = '';
        email.value = '';
        message.value = '';
    },25)
})