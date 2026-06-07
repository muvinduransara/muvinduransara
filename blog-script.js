// Blog Data
const blogPosts = [
    {
        id: 1,
        title: "My Journey to Becoming a Software Engineer in Sri Lanka",
        excerpt: "Discover the challenges, opportunities, and lessons I learned on my path to becoming a software engineer. From bootcamp struggles to landing my first tech job, this is my complete journey.",
        category: "Career",
        date: "June 5, 2026",
        readingTime: 8,
        image: "my_vet.png",
        tags: ["career", "software-engineering", "sri-lanka", "journey"]
    },
    {
        id: 2,
        title: "Java Programming Complete Beginner Guide",
        excerpt: "A comprehensive guide to getting started with Java programming. Learn the fundamentals, setup your environment, and write your first Java program from scratch.",
        category: "Java",
        date: "June 3, 2026",
        readingTime: 12,
        image: "java.png",
        tags: ["java", "programming", "tutorial", "beginner"]
    },
    {
        id: 3,
        title: "How I Built My Personal Portfolio Website",
        excerpt: "Step-by-step guide to creating a professional portfolio website using HTML5, CSS3, and JavaScript. Learn the design process, best practices, and deployment.",
        category: "Web Development",
        date: "June 1, 2026",
        readingTime: 10,
        image: "potfoliyos.png",
        tags: ["web-development", "portfolio", "html", "css", "javascript"]
    },
    {
        id: 4,
        title: "Building an AI Voice Assistant Using ESP32",
        excerpt: "Learn how to build a voice-controlled assistant using ESP32 microcontroller and AI integration. This project combines IoT and artificial intelligence.",
        category: "IoT",
        date: "May 28, 2026",
        readingTime: 15,
        image: "ai_bot.png",
        tags: ["iot", "esp32", "ai", "voice-assistant", "microcontroller"]
    },
    {
        id: 5,
        title: "Modern Web Development in 2026",
        excerpt: "Explore the latest trends and technologies in web development. From Next.js to AI-powered development tools, discover what's new in the industry.",
        category: "Web Development",
        date: "May 25, 2026",
        readingTime: 9,
        image: "top_web-2026.png",
        tags: ["web-development", "trends", "2026", "frameworks"]
    },
    {
        id: 6,
        title: "How Developers Should Use GitHub Professionally",
        excerpt: "Best practices for using GitHub as a professional developer. Learn about branching strategies, code reviews, and collaboration workflows.",
        category: "Software Engineering",
        date: "May 22, 2026",
        readingTime: 7,
        image: "git.png",
        tags: ["github", "git", "version-control", "collaboration"]
    },
    {
        id: 7,
        title: "Getting Started with Arduino and ESP32",
        excerpt: "A beginner's guide to Arduino and ESP32 development. Learn how to set up your board, program it, and create your first IoT project.",
        category: "IoT",
        date: "May 19, 2026",
        readingTime: 11,
        image: "esp32.png",
        tags: ["iot", "arduino", "esp32", "embedded-systems"]
    },
    {
        id: 8,
        title: "Essential Skills Every Software Engineer Needs",
        excerpt: "Beyond coding, discover the essential soft skills that make a successful software engineer. Communication, problem-solving, and teamwork are crucial.",
        category: "Career",
        date: "May 16, 2026",
        readingTime: 8,
        image: "skils.png",
        tags: ["career", "skills", "software-engineering", "professional-development"]
    },
    {
        id: 9,
        title: "How AI is Changing Software Development",
        excerpt: "Artificial intelligence is revolutionizing how we develop software. Explore AI tools, machine learning integration, and the future of development.",
        category: "AI",
        date: "May 13, 2026",
        readingTime: 10,
        image: "ai.png",
        tags: ["ai", "machine-learning", "development", "automation"]
    }
];

// Get unique categories
const categories = [...new Set(blogPosts.map(post => post.category))];

// Get unique tags
const allTags = [...new Set(blogPosts.flatMap(post => post.tags))];

// Pagination settings
const postsPerPage = 6;
let currentPage = 1;
let filteredPosts = [...blogPosts];

// Initialize blog
document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    renderBlogGrid();
    renderPagination();
    renderRecentPosts();
    renderPopularPosts();
    renderTags();
    setupSearch();
    setupNewsletterForm();
});

// Render Categories Widget
function renderCategories() {
    const categoriesList = document.getElementById('categories-list');
    if (!categoriesList) return;

    categoriesList.innerHTML = categories.map(category => {
        const count = blogPosts.filter(post => post.category === category).length;
        return `
            <div class="category-item">
                <a class="category-link" onclick="filterByCategory('${category}')" data-category="${category}">
                    ${category}
                </a>
                <span class="category-count">${count}</span>
            </div>
        `;
    }).join('');
}

// Filter by category
function filterByCategory(category) {
    filteredPosts = category === 'all' 
        ? [...blogPosts]
        : blogPosts.filter(post => post.category === category);
    currentPage = 1;
    renderBlogGrid();
    renderPagination();
    document.querySelector('.blog-grid-section').scrollIntoView({ behavior: 'smooth' });
}

// Render Blog Grid
function renderBlogGrid() {
    const blogGrid = document.getElementById('blog-grid');
    if (!blogGrid) return;

    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const postsToShow = filteredPosts.slice(start, end);

    blogGrid.innerHTML = postsToShow.map(post => `
        <article class="blog-card" data-post-id="${post.id}">
            <div class="blog-card-image">
                <img src="${post.image}" alt="${post.title}" loading="lazy">
                <span class="blog-card-category">${post.category}</span>
            </div>
            <div class="blog-card-content">
                <div class="blog-card-meta">
                    <span><i class="far fa-calendar"></i> ${post.date}</span>
                    <span class="reading-time"><i class="far fa-clock"></i> ${post.readingTime} min read</span>
                </div>
                <h3 class="blog-card-title">${post.title}</h3>
                <p class="blog-card-excerpt">${post.excerpt}</p>
                <div class="blog-card-footer">
                    <span class="reading-time">${post.readingTime} min</span>
                    <a href="post-${post.id}.html" class="blog-card-link">
                        Read More <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </article>
    `).join('');
}

// Render Pagination
function renderPagination() {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    let paginationHTML = '';

    // Previous button
    if (currentPage > 1) {
        paginationHTML += `
            <li><a onclick="goToPage(${currentPage - 1})" title="Previous">
                <i class="fas fa-chevron-left"></i>
            </a></li>
        `;
    }

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            paginationHTML += `<li><span class="active">${i}</span></li>`;
        } else {
            paginationHTML += `<li><a onclick="goToPage(${i})">${i}</a></li>`;
        }
    }

    // Next button
    if (currentPage < totalPages) {
        paginationHTML += `
            <li><a onclick="goToPage(${currentPage + 1})" title="Next">
                <i class="fas fa-chevron-right"></i>
            </a></li>
        `;
    }

    pagination.innerHTML = paginationHTML;
}

// Go to specific page
function goToPage(page) {
    currentPage = page;
    renderBlogGrid();
    renderPagination();
    document.querySelector('.blog-grid-section').scrollIntoView({ behavior: 'smooth' });
}

// Render Recent Posts
function renderRecentPosts() {
    const recentPostsContainer = document.getElementById('recent-posts');
    if (!recentPostsContainer) return;

    const recentPosts = blogPosts.slice(0, 5);
    recentPostsContainer.innerHTML = recentPosts.map(post => `
        <div class="post-item">
            <a href="post-${post.id}.html" class="post-item-link">${post.title}</a>
            <div class="post-item-date">${post.date}</div>
        </div>
    `).join('');
}

// Render Popular Posts
function renderPopularPosts() {
    const popularPostsContainer = document.getElementById('popular-posts');
    if (!popularPostsContainer) return;

    const popularPosts = blogPosts.slice(0, 5);
    popularPostsContainer.innerHTML = popularPosts.map(post => `
        <div class="post-item">
            <a href="post-${post.id}.html" class="post-item-link">${post.title}</a>
            <div class="post-item-date">${post.date}</div>
        </div>
    `).join('');
}

// Render Tags
function renderTags() {
    const tagsCloud = document.getElementById('tags-cloud');
    if (!tagsCloud) return;

    tagsCloud.innerHTML = allTags.map(tag => `
        <a class="tag" onclick="filterByTag('${tag}')" title="Filter by tag">#${tag}</a>
    `).join('');
}

// Filter by tag
function filterByTag(tag) {
    filteredPosts = blogPosts.filter(post => post.tags.includes(tag));
    currentPage = 1;
    renderBlogGrid();
    renderPagination();
    document.querySelector('.blog-grid-section').scrollIntoView({ behavior: 'smooth' });
}

// Setup Search
function setupSearch() {
    const searchInput = document.getElementById('blog-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filteredPosts = blogPosts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) ||
            post.excerpt.toLowerCase().includes(searchTerm) ||
            post.category.toLowerCase().includes(searchTerm) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
        currentPage = 1;
        renderBlogGrid();
        renderPagination();
    });
}

// Newsletter Form
function setupNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for subscribing! You will receive blog updates soon.');
        form.reset();
    });
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