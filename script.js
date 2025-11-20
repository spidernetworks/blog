// Dark/Light mode toggle
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Initialize reading progress bar on article pages
    if (document.querySelector('article')) {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollProgress = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = scrollProgress + '%';
        });
    }
// Join Our Web modal handler
function initJoinModal() {
    const modal = document.getElementById('joinModal');
    const form = document.getElementById('joinForm');
form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('joinName').value;
        const email = document.getElementById('joinEmail').value;
        
        // Here you would typically send the data to your backend
        console.log('Submitted:', { name, email });
        
        // Show success message
        alert(`Thanks for joining, ${name}! We'll be in touch soon.`);
        modal.classList.add('hidden');
        form.reset();
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
}

// Initialize modals when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initJoinModal();
    
    // Newsletter modal after 30 seconds
    setTimeout(function() {
if (!localStorage.getItem('newsletterModalShown')) {
            const modal = document.querySelector('#newsletterModal');
            if (modal) {
                const bsModal = new bootstrap.Modal(modal);
                bsModal.show();
                localStorage.setItem('newsletterModalShown', 'true');
            }
        }
    }, 30000);
    
    // Exit intent modal
    document.addEventListener('mouseout', function(e) {
        if (e.clientY < 0 && !localStorage.getItem('exitModalShown')) {
            const modal = document.querySelector('#exitModal');
            if (modal) {
                const bsModal = new bootstrap.Modal(modal);
                bsModal.show();
                localStorage.setItem('exitModalShown', 'true');
            }
        }
    });
});
// Debounce function for search input
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// Theme toggle function
function toggleTheme() {
    const html = document.documentElement;
    html.classList.toggle('dark');
    const theme = html.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
}

// Search functionality
function initSearch() {
    const searchInput