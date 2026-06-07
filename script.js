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
📧 contact@muvinduransara.com

📱 0772612110
`,

github:`
🐙 https://github.com/muvinduransara
`,

linkedin:`
💼 https://www.linkedin.com/in/muvinduransara
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

function easeOutQuint(t) {
    return 1 - Math.pow(1 - t, 5);
}

function animatePremiumCount(element, duration = 1400) {
    if (!element || element.dataset.animated === 'true') return;

    const target = Number(element.dataset.target) || 0;
    const prefix = element.dataset.prefix || '';
    const suffix = element.dataset.suffix || '';
    const startTime = performance.now();

    element.classList.add('counting');

    const update = (now) => {
        const elapsed = Math.min(now - startTime, duration);
        const progress = duration ? elapsed / duration : 1;
        const eased = easeOutQuint(progress);
        const currentValue = Math.floor(target * eased);

        element.textContent = `${prefix}${currentValue}${suffix}`;

        if (elapsed < duration) {
            requestAnimationFrame(update);
        } else {
            element.textContent = `${prefix}${target}${suffix}`;
            element.dataset.animated = 'true';
            element.classList.remove('counting');
        }
    };

    requestAnimationFrame(update);
}

function initPremiumCountAnimations() {
    const countUps = document.querySelectorAll('.count-up');
    if (!countUps.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.22) {
                animatePremiumCount(entry.target);

                const parent = entry.target.closest('.stat-item, .achievement-card');
                if (parent) {
                    parent.classList.add('animate-in');
                }

                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.22 });

    countUps.forEach(element => {
        if (!element.dataset.target) return;
        observer.observe(element);
    });
}

window.onload = () => {

const saved =
localStorage.getItem("muvindu-chat");

if (saved) {
    document.getElementById("messages").innerHTML = saved;
}

initPremiumCountAnimations();
initProjectPagination();

};

function debounce(fn, delay = 120) {
    let timer = null;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

function getProjectCardsPerPage() {
    const width = window.innerWidth;

    if (width <= 640) {
        return 2;   // Mobile
    }

    if (width <= 980) {
        return 4;   // Tablet
    }

    return 6;       // Desktop
}

function createPaginationButton(page, isActive) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'pagination-number' + (isActive ? ' active' : '');
    button.textContent = page;
    button.addEventListener('click', () => renderProjectPage(page));
    return button;
}

function renderPaginationControls(totalPages, currentPage) {
    const paginationContainer = document.getElementById('projectPagination');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (!paginationContainer || !prevBtn || !nextBtn) return;

    paginationContainer.innerHTML = '';

    for (let page = 1; page <= totalPages; page += 1) {
        paginationContainer.appendChild(createPaginationButton(page, page === currentPage));
    }

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

function renderProjectPage(pageNumber) {
    const projectGrid = document.getElementById('projectGrid');
    if (!projectGrid) return;

    const cards = Array.from(projectGrid.querySelectorAll('.project-card'));
    const cardsPerPage = getProjectCardsPerPage();
    const totalPages = Math.max(1, Math.ceil(cards.length / cardsPerPage));
    const page = Math.min(Math.max(1, pageNumber), totalPages);
    const startIndex = (page - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;

    cards.forEach((card, index) => {
        const isVisible = index >= startIndex && index < endIndex;

        if (isVisible) {
            card.style.display = 'grid';
            requestAnimationFrame(() => card.classList.add('active'));
        } else {
            card.classList.remove('active');
            card.style.display = 'none';
        }
    });

    renderPaginationControls(totalPages, page);
}

function initProjectPagination() {
    const projectGrid = document.getElementById('projectGrid');
    if (!projectGrid) return;

    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const activeButton = document.querySelector('.pagination-number.active');
            const currentPage = activeButton ? Number(activeButton.textContent) : 1;
            renderProjectPage(currentPage - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const activeButton = document.querySelector('.pagination-number.active');
            const currentPage = activeButton ? Number(activeButton.textContent) : 1;
            renderProjectPage(currentPage + 1);
        });
    }

    window.addEventListener('resize', debounce(() => {
        const activeButton = document.querySelector('.pagination-number.active');
        const currentPage = activeButton ? Number(activeButton.textContent) : 1;
        renderProjectPage(currentPage);
    }, 150));

    renderProjectPage(1);
}



// email (guarded - only run if emailjs is available)
if (typeof emailjs !== 'undefined' && emailjs && typeof emailjs.init === 'function') {
    try { emailjs.init("Qos_cn_XPCM7uBFrl"); } catch (e) { /* ignore init errors */ }

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
                if (typeof Swal !== 'undefined') Swal.fire({ icon: 'warning', title: 'Invalid Name', text: 'Name must contain at least 3 characters.' });
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                if (typeof Swal !== 'undefined') Swal.fire({ icon: 'warning', title: 'Invalid Email', text: 'Please enter a valid email address.' });
                return;
            }

            const phoneRegex = /^\+?[0-9\s-]{7,20}$/;
            if (!phoneRegex.test(phone)) {
                if (typeof Swal !== 'undefined') Swal.fire({ icon: 'warning', title: 'Invalid Mobile Number', text: 'Please enter a valid mobile number.' });
                return;
            }

            if (message.length < 10) {
                if (typeof Swal !== 'undefined') Swal.fire({ icon: 'warning', title: 'Message Too Short', text: 'Message must contain at least 10 characters.' });
                return;
            }

            if (typeof Swal !== 'undefined') {
                Swal.fire({ title: 'Sending Message...', text: 'Please wait a moment.', allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });
            }

            // Send Email
            if (typeof emailjs !== 'undefined' && emailjs && typeof emailjs.send === 'function') {
                emailjs.send("service_zs2pa8g", "template_h2aenab", { name, email, phone, country, message })
                .then(function () {
                    if (typeof Swal !== 'undefined') Swal.fire({ icon: 'success', title: 'Success!', text: 'Your message has been sent successfully.', timer: 3000, showConfirmButton: false });
                    contactForm.reset();
                }).catch(function (error) {
                    console.error(error);
                    if (typeof Swal !== 'undefined') Swal.fire({ icon: 'error', title: 'Failed!', text: 'Unable to send your message. Please try again later.' });
                });
            } else {
                // emailjs not available — show fallback message
                if (typeof Swal !== 'undefined') Swal.fire({ icon: 'info', title: 'Unavailable', text: 'Message sending is not configured.' });
            }
        });
    }

}


// header

if (document.getElementById('header')) {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        });
}

// footer

if (document.getElementById('footer')) {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });
}