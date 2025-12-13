// components/navbar.js
class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="bg-gray-800 border-b border-gray-700 sticky top-0 z-50 backdrop-blur-lg bg-opacity-95">
                <div class="container mx-auto px-4">
                    <div class="flex items-center justify-between h-16">
                        <!-- Logo -->
                        <a href="index.html" class="flex items-center space-x-2 text-xl font-bold text-white hover:text-primary-500 transition-colors">
                            <span class="text-2xl">🕷️</span>
                            <span class="hidden sm:inline">WebWeaver's Lair</span>
                        </a>

                        <!-- Desktop Navigation -->
                        <div class="hidden md:flex items-center space-x-1">
                            <a href="index.html" class="nav-link px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-gray-100">
                                Home
                            </a>
                            <a href="articles.html" class="nav-link px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-gray-100">
                                Articles
                            </a>
                            
                            <!-- Categories Dropdown -->
                            <div class="relative group">
                                <button class="nav-link px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center text-gray-100">
                                    Categories
                                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>
                                <div class="absolute left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-700">
                                    <a href="articles.html?category=Networking" class="block px-4 py-2 hover:bg-gray-700 rounded-t-lg text-gray-100">
                                        Networking
                                    </a>
                                    <a href="articles.html?category=Security" class="block px-4 py-2 hover:bg-gray-700 text-gray-100">
                                        Security
                                    </a>
                                    <a href="articles.html?category=Programming" class="block px-4 py-2 hover:bg-gray-700 text-gray-100">
                                        Programming
                                    </a>
                                    <a href="articles.html?category=DevOps" class="block px-4 py-2 hover:bg-gray-700 text-gray-100">
                                        DevOps
                                    </a>
                                    <a href="articles.html?category=Cloud" class="block px-4 py-2 hover:bg-gray-700 text-gray-100">
                                        Cloud
                                    </a>
                                    <a href="articles.html?category=SysAdmin" class="block px-4 py-2 hover:bg-gray-700 rounded-b-lg text-gray-100">
                                        SysAdmin
                                    </a>
                                </div>
                            </div>

                            <a href="#about" class="nav-link px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-gray-100">
                                About
                            </a>
                            <a href="#contact" class="nav-link px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-gray-100">
                                Contact
                            </a>
                        </div>

                        <!-- Right Side Actions -->
                        <div class="hidden md:flex items-center space-x-2">
                            <button onclick="document.getElementById('joinModal')?.classList.remove('hidden')" 
                                    class="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg font-medium transition-all">
                                Sign Up
                            </button>
                        </div>

                        <!-- Mobile Menu Button -->
                        <button id="mobile-menu-button" class="md:hidden p-2 rounded-lg hover:bg-gray-700 text-gray-100">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>

                    <!-- Mobile Navigation -->
                    <div id="mobile-menu" class="hidden md:hidden pb-4 space-y-2">
                        <a href="index.html" class="block px-4 py-2 rounded-lg hover:bg-gray-700 text-gray-100">
                            Home
                        </a>
                        <a href="articles.html" class="block px-4 py-2 rounded-lg hover:bg-gray-700 text-gray-100">
                            Articles
                        </a>
                        <div class="px-4 py-2 text-gray-400 text-sm font-semibold">Categories</div>
                        <a href="articles.html?category=Networking" class="block pl-8 pr-4 py-2 rounded-lg hover:bg-gray-700 text-gray-100">
                            Networking
                        </a>
                        <a href="articles.html?category=Security" class="block pl-8 pr-4 py-2 rounded-lg hover:bg-gray-700 text-gray-100">
                            Security
                        </a>
                        <a href="articles.html?category=Programming" class="block pl-8 pr-4 py-2 rounded-lg hover:bg-gray-700 text-gray-100">
                            Programming
                        </a>
                        <a href="articles.html?category=DevOps" class="block pl-8 pr-4 py-2 rounded-lg hover:bg-gray-700 text-gray-100">
                            DevOps
                        </a>
                        <a href="articles.html?category=Cloud" class="block pl-8 pr-4 py-2 rounded-lg hover:bg-gray-700 text-gray-100">
                            Cloud
                        </a>
                        <a href="articles.html?category=SysAdmin" class="block pl-8 pr-4 py-2 rounded-lg hover:bg-gray-700 text-gray-100">
                            SysAdmin
                        </a>
                        <a href="#about" class="block px-4 py-2 rounded-lg hover:bg-gray-700 text-gray-100">
                            About
                        </a>
                        <a href="#contact" class="block px-4 py-2 rounded-lg hover:bg-gray-700 text-gray-100">
                            Contact
                        </a>
                        <button onclick="document.getElementById('joinModal')?.classList.remove('hidden')" 
                                class="w-full bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg font-medium">
                            Sign Up
                        </button>
                    </div>
                </div>
            </nav>

            <script>
                // Mobile menu toggle
                const menuButton = document.getElementById('mobile-menu-button');
                const mobileMenu = document.getElementById('mobile-menu');
                
                if (menuButton && mobileMenu) {
                    menuButton.addEventListener('click', function() {
                        mobileMenu.classList.toggle('hidden');
                    });
                }

                // Highlight active page
                const currentPage = window.location.pathname.split('/').pop() || 'index.html';
                document.querySelectorAll('.nav-link').forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                        link.classList.add('bg-gray-700', 'text-primary-500');
                    }
                });
            </script>
        `;
    }
}

customElements.define('custom-navbar', CustomNavbar);
