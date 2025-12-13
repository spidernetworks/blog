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
                            <a href="index.html" class="nav-link px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                                <i data-feather="home" class="w-4 h-4 inline mr-1"></i>
                                Home
                            </a>
                            <a href="articles.html" class="nav-link px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                                <i data-feather="book-open" class="w-4 h-4 inline mr-1"></i>
                                Articles
                            </a>
                            
                            <!-- Categories Dropdown -->
                            <div class="relative group">
                                <button class="nav-link px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center">
                                    <i data-feather="grid" class="w-4 h-4 inline mr-1"></i>
                                    Categories
                                    <i data-feather="chevron-down" class="w-4 h-4 ml-1"></i>
                                </button>
                                <div class="absolute left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-700">
                                    <a href="articles.html?category=Networking" class="block px-4 py-2 hover:bg-gray-700 rounded-t-lg">
                                        <i data-feather="globe" class="w-4 h-4 inline mr-2 text-primary-500"></i>Networking
                                    </a>
                                    <a href="articles.html?category=Security" class="block px-4 py-2 hover:bg-gray-700">
                                        <i data-feather="lock" class="w-4 h-4 inline mr-2 text-secondary-500"></i>Security
                                    </a>
                                    <a href="articles.html?category=Programming" class="block px-4 py-2 hover:bg-gray-700">
                                        <i data-feather="code" class="w-4 h-4 inline mr-2 text-purple-500"></i>Programming
                                    </a>
                                    <a href="articles.html?category=DevOps" class="block px-4 py-2 hover:bg-gray-700">
                                        <i data-feather="git-merge" class="w-4 h-4 inline mr-2 text-yellow-500"></i>DevOps
                                    </a>
                                    <a href="articles.html?category=Cloud" class="block px-4 py-2 hover:bg-gray-700">
                                        <i data-feather="cloud" class="w-4 h-4 inline mr-2 text-green-500"></i>Cloud
                                    </a>
                                    <a href="articles.html?category=SysAdmin" class="block px-4 py-2 hover:bg-gray-700 rounded-b-lg">
                                        <i data-feather="server" class="w-4 h-4 inline mr-2 text-blue-500"></i>SysAdmin
                                    </a>
                                </div>
                            </div>

                            <a href="#about" class="nav-link px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                                <i data-feather="info" class="w-4 h-4 inline mr-1"></i>
                                About
                            </a>
                            <a href="#contact" class="nav-link px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                                <i data-feather="mail" class="w-4 h-4 inline mr-1"></i>
                                Contact
                            </a>
                        </div>

                        <!-- Right Side Actions -->
                        <div class="hidden md:flex items-center space-x-2">
                            <button onclick="document.getElementById('searchModal')?.classList.remove('hidden')" 
                                    class="p-2 rounded-lg hover:bg-gray-700 transition-colors" title="Search">
                                <i data-feather="search" class="w-5 h-5"></i>
                            </button>
                            <button onclick="document.getElementById('joinModal')?.classList.remove('hidden')" 
                                    class="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg font-medium transition-all">
                                Sign Up
                            </button>
                        </div>

                        <!-- Mobile Menu Button -->
                        <button id="mobile-menu-button" class="md:hidden p-2 rounded-lg hover:bg-gray-700">
                            <i data-feather="menu" class="w-6 h-6"></i>
                        </button>
                    </div>

                    <!-- Mobile Navigation -->
                    <div id="mobile-menu" class="hidden md:hidden pb-4 space-y-2">
                        <a href="index.html" class="block px-4 py-2 rounded-lg hover:bg-gray-700">
                            <i data-feather="home" class="w-4 h-4 inline mr-2"></i>Home
                        </a>
                        <a href="articles.html" class="block px-4 py-2 rounded-lg hover:bg-gray-700">
                            <i data-feather="book-open" class="w-4 h-4 inline mr-2"></i>Articles
                        </a>
                        <div class="px-4 py-2 text-gray-400 text-sm font-semibold">Categories</div>
                        <a href="articles.html?category=Networking" class="block pl-8 pr-4 py-2 rounded-lg hover:bg-gray-700">
                            <i data-feather="globe" class="w-4 h-4 inline mr-2"></i>Networking
                        </a>
                        <a href="articles.html?category=Security" class="block pl-8 pr-4 py-2 rounded-lg hover:bg-gray-700">
                            <i data-feather="lock" class="w-4 h-4 inline mr-2"></i>Security
                        </a>
                        <a href="articles.html?category=Programming" class="block pl-8 pr-4 py-2 rounded-lg hover:bg-gray-700">
                            <i data-feather="code" class="w-4 h-4 inline mr-2"></i>Programming
                        </a>
                        <a href="articles.html?category=DevOps" class="block pl-8 pr-4 py-2 rounded-lg hover:bg-gray-700">
                            <i data-feather="git-merge" class="w-4 h-4 inline mr-2"></i>DevOps
                        </a>
                        <a href="articles.html?category=Cloud" class="block pl-8 pr-4 py-2 rounded-lg hover:bg-gray-700">
                            <i data-feather="cloud" class="w-4 h-4 inline mr-2"></i>Cloud
                        </a>
                        <a href="articles.html?category=SysAdmin" class="block pl-8 pr-4 py-2 rounded-lg hover:bg-gray-700">
                            <i data-feather="server" class="w-4 h-4 inline mr-2"></i>SysAdmin
                        </a>
                        <a href="#about" class="block px-4 py-2 rounded-lg hover:bg-gray-700">
                            <i data-feather="info" class="w-4 h-4 inline mr-2"></i>About
                        </a>
                        <a href="#contact" class="block px-4 py-2 rounded-lg hover:bg-gray-700">
                            <i data-feather="mail" class="w-4 h-4 inline mr-2"></i>Contact
                        </a>
                        <button onclick="document.getElementById('searchModal')?.classList.remove('hidden')" 
                                class="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-700">
                            <i data-feather="search" class="w-4 h-4 inline mr-2"></i>Search
                        </button>
                        <button onclick="document.getElementById('joinModal')?.classList.remove('hidden')" 
                                class="w-full bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg font-medium">
                            Sign Up
                        </button>
                    </div>
                </div>
            </nav>

            <script>
                // Mobile menu toggle
                document.getElementById('mobile-menu-button')?.addEventListener('click', function() {
                    const menu = document.getElementById('mobile-menu');
                    menu.classList.toggle('hidden');
                    
                    // Toggle icon
                    const icon = this.querySelector('i');
                    if (menu.classList.contains('hidden')) {
                        icon.setAttribute('data-feather', 'menu');
                    } else {
                        icon.setAttribute('data-feather', 'x');
                    }
                    feather.replace();
                });

                // Highlight active page
                const currentPage = window.location.pathname.split('/').pop() || 'index.html';
                document.querySelectorAll('.nav-link').forEach(link => {
                    if (link.getAttribute('href') === currentPage) {
                        link.classList.add('bg-gray-700', 'text-primary-500');
                    }
                });

                // Initialize feather icons
                feather.replace();
            </script>
        `;
    }
}

customElements.define('custom-navbar', CustomNavbar);
