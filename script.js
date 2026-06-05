// smooth scroll example
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e){
    e.preventDefault();
    document.querySelector(this.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
    closeHeader();
  });
});

function toggleHeader() {
  const header = document.querySelector('header');
  if (!header) return;
  header.classList.toggle('header-open');
}

function closeHeader() {
  const header = document.querySelector('header');
  if (!header) return;
  header.classList.remove('header-open');
}

// ai btn

const portfolio = {

name:"Muvindu Ransara",

about:`
👨‍💻 I'm Muvindu Ransara.

Software Engineer passionate about
Web Development, AI Integration,
Java Applications and Modern Technologies.
`,

skills:`
⚡ Skills

• Java
• JavaScript
• React
• Node.js
• PHP
• MySQL
• PostgreSQL
• Bootstrap
• HTML/CSS
• GitHub
• AI Integration
`,

projects:`
🚀 Projects

• Religious Places Platform

• Temple Management System

• AI Robot Assistant

• Travel Website

• Hotel Management Website
`,

education:`
🎓 Education

Graduate Diploma in Software Engineering

Advanced Studies in Software Engineering
`,

contact:`
📧 muvindu2110@gmail.com

📱 0772612110
`,

github:`
🐙 https://github.com/muvindu2110
`,

linkedin:`
💼 https://www.linkedin.com/in/muvindu-ransara-84312139b
`
};

function toggleChat(){

const chat=document.getElementById("chat");

chat.style.display=
chat.style.display==="flex"
? "none"
: "flex";

}

function handleEnter(e){

if(e.key==="Enter"){
sendMessage();
}

}

function quickAsk(text){

document.getElementById("userInput").value=text;

sendMessage();

}

function sendMessage(){

const input=document.getElementById("userInput");

const text=input.value.trim();

if(text==="") return;

addMessage(text,"user");

input.value="";

showTyping();

setTimeout(()=>{

removeTyping();

addMessage(
getReply(text.toLowerCase()),
"bot"
);

saveChat();

},800);

}

function addMessage(text,type){

const box=document.getElementById("messages");

const div=document.createElement("div");

div.className=type;

div.innerHTML=text;

box.appendChild(div);

box.scrollTop=box.scrollHeight;

}

function showTyping(){

const box=document.getElementById("messages");

const div=document.createElement("div");

div.className="typing";
div.id="typing";
div.innerHTML="Muvindu AI is typing...";

box.appendChild(div);

}

function removeTyping(){

const t=document.getElementById("typing");

if(t) t.remove();

}

function getReply(msg){

if(msg.includes("about")) return portfolio.about;

if(msg.includes("skill")) return portfolio.skills;

if(msg.includes("project")) return portfolio.projects;

if(msg.includes("education")) return portfolio.education;

if(
msg.includes("contact") ||
msg.includes("email") ||
msg.includes("phone")
){
return portfolio.contact;
}

if(msg.includes("github")){
return portfolio.github;
}

if(msg.includes("linkedin")){
return portfolio.linkedin;
}

return `
🤖 I can help with:

• About Me
• Skills
• Projects
• Education
• Contact
• GitHub
• LinkedIn
`;
}

function saveChat(){

localStorage.setItem(
"muvindu-chat",
document.getElementById("messages").innerHTML
);

}

window.onload=()=>{

const saved=
localStorage.getItem("muvindu-chat");

if(saved){

document.getElementById("messages").innerHTML=saved;

}

};





// email
emailjs.init("Qos_cn_XPCM7uBFrl");

const contactForm = document.getElementById('contact-form');

if (contactForm) {

    contactForm.addEventListener('submit', function (event) {

        event.preventDefault();

        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const phone = document.getElementById('contact-phone').value.trim();
        const country = document.getElementById('contact-country').value.trim();
        const message = document.getElementById('contact-message').value.trim();

        // Validation
        if (name.length < 3) {
            Swal.fire({
                icon: 'warning',
                title: 'Invalid Name',
                text: 'Name must contain at least 3 characters.'
            });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            Swal.fire({
                icon: 'warning',
                title: 'Invalid Email',
                text: 'Please enter a valid email address.'
            });
            return;
        }

        const phoneRegex = /^\+?[0-9\s-]{7,20}$/;

        if (!phoneRegex.test(phone)) {
            Swal.fire({
                icon: 'warning',
                title: 'Invalid Mobile Number',
                text: 'Please enter a valid mobile number.'
            });
            return;
        }

        if (message.length < 10) {
            Swal.fire({
                icon: 'warning',
                title: 'Message Too Short',
                text: 'Message must contain at least 10 characters.'
            });
            return;
        }

        // Loading Popup
        Swal.fire({
            title: 'Sending Message...',
            text: 'Please wait a moment.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        // Send Email
        emailjs.send(
            "service_gvabtvi",
            "template_h2aenab",
            {
                name: name,
                email: email,
                phone: phone,
                country: country,
                message: message
            }
        )
        .then(function () {

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Your message has been sent successfully.',
                timer: 3000,
                showConfirmButton: false
            });

            contactForm.reset();

        })
        .catch(function (error) {

            console.error(error);

            Swal.fire({
                icon: 'error',
                title: 'Failed!',
                text: 'Unable to send your message. Please try again later.'
            });

        });

    });

}