// article-loader.js - Dynamic Article Loading System for WebWeaver's Blog

class ArticleManager {
  constructor() {
    this.articles = [];
    this.articlesPerPage = 9;
    this.currentPage = 1;
  }

  // Load articles from JSON file
  async loadArticles() {
    try {
      const response = await fetch('articles.json');
      if (!response.ok) {
        throw new Error('Failed to load articles');
      }
      const data = await response.json();
      this.articles = data.articles || [];
      return this.articles;
    } catch (error) {
      console.error('Error loading articles:', error);
      return [];
    }
  }

  // Get all articles sorted by date (newest first)
  getArticles(sortBy = 'date') {
    return [...this.articles].sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date) - new Date(a.date);
      }
      return 0;
    });
  }

  // Get single article by ID
  getArticleById(id) {
    return this.articles.find(article => article.id === id);
  }

  // Get articles by category
  getArticlesByCategory(category) {
    return this.articles.filter(article => 
      article.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Get articles by tag
  getArticlesByTag(tag) {
    return this.articles.filter(article => 
      article.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
  }

  // Search articles
  searchArticles(query) {
    query = query.toLowerCase();
    return this.articles.filter(article => 
      article.title.toLowerCase().includes(query) ||
      article.excerpt.toLowerCase().includes(query) ||
      article.content.toLowerCase().includes(query) ||
      article.tags.some(tag => tag.toLowerCase().includes(query)) ||
      article.category.toLowerCase().includes(query)
    );
  }

  // Get all unique categories
  getCategories() {
    return [...new Set(this.articles.map(article => article.category))];
  }

  // Get all unique tags
  getTags() {
    const tags = this.articles.flatMap(article => article.tags);
    return [...new Set(tags)];
  }

  // Format date for display
  formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }

  // Generate article card HTML
  generateArticleCard(article) {
    return `
      <article class="article-card" data-aos="fade-up">
        <div class="article-image">
          <img src="${article.image}" alt="${article.title}" loading="lazy">
          <div class="article-overlay">
            <span class="category-badge">${article.category}</span>
          </div>
        </div>
        <div class="article-content">
          <div class="article-meta">
            <span class="article-date">📅 ${this.formatDate(article.date)}</span>
            <span class="read-time">⏱️ ${article.readTime}</span>
          </div>
          <h2 class="article-title">
            <a href="article.html?id=${article.id}">${article.title}</a>
          </h2>
          <p class="article-excerpt">${article.excerpt}</p>
          <div class="article-tags">
            ${article.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
          </div>
          <div class="article-footer">
            <span class="article-author">By ${article.author}</span>
            <a href="article.html?id=${article.id}" class="read-more-btn">
              Read More <span class="arrow">→</span>
            </a>
          </div>
        </div>
      </article>
    `;
  }

  // Render article list
  renderArticleList(containerId, articles = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const articlesToRender = articles || this.getArticles();
    
    if (articlesToRender.length === 0) {
      container.innerHTML = `
        <div class="no-articles">
          <p>🔍 No articles found matching your criteria.</p>
          <button onclick="articleManager.renderArticleList('articles-container')" class="reset-btn">
            Show All Articles
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = articlesToRender
      .map(article => this.generateArticleCard(article))
      .join('');
  }

  // Render single article page
  renderArticlePage(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    
    if (!articleId) {
      container.innerHTML = `
        <div class="error-message">
          <h2>❌ Article Not Found</h2>
          <p>The article you're looking for doesn't exist.</p>
          <a href="articles.html" class="back-btn">← Back to Articles</a>
        </div>
      `;
      return;
    }

    const article = this.getArticleById(articleId);
    
    if (!article) {
      container.innerHTML = `
        <div class="error-message">
          <h2>❌ Article Not Found</h2>
          <p>The article with ID "${articleId}" doesn't exist.</p>
          <a href="articles.html" class="back-btn">← Back to Articles</a>
        </div>
      `;
      return;
    }

    // Update page title and meta
    document.title = `${article.title} - WebWeaver's Digital Lair`;
    
    // Create meta description if it doesn't exist
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', article.excerpt);

    container.innerHTML = `
      <article class="article-full">
        <header class="article-header">
          <div class="breadcrumb">
            <a href="index.html">Home</a> → <a href="articles.html">Articles</a> → <span>${article.title}</span>
          </div>
          <div class="article-meta-top">
            <span class="category-badge">${article.category}</span>
            <span class="read-time">⏱️ ${article.readTime}</span>
          </div>
          <h1>${article.title}</h1>
          <div class="article-info">
            <div class="author-info">
              <span class="author-icon">👤</span>
              <span class="author-name">${article.author}</span>
            </div>
            <span class="separator">•</span>
            <span class="date">📅 ${this.formatDate(article.date)}</span>
          </div>
          <div class="article-tags-header">
            ${article.tags.map(tag => `<a href="articles.html?tag=${tag}" class="tag">#${tag}</a>`).join('')}
          </div>
        </header>
        
        <div class="article-image-full">
          <img src="${article.image}" alt="${article.title}">
        </div>
        
        <div class="article-body">
          ${article.content}
        </div>
        
        <footer class="article-footer-full">
          <div class="share-section">
            <h3>Share this article:</h3>
            <div class="share-buttons">
              <button onclick="articleManager.shareArticle('twitter', '${article.id}')" class="share-btn twitter">
                🐦 Twitter
              </button>
              <button onclick="articleManager.shareArticle('linkedin', '${article.id}')" class="share-btn linkedin">
                💼 LinkedIn
              </button>
              <button onclick="articleManager.shareArticle('copy', '${article.id}')" class="share-btn copy">
                🔗 Copy Link
              </button>
            </div>
          </div>
          <div class="navigation-links">
            <a href="articles.html" class="back-link">← Back to All Articles</a>
            <a href="articles.html?category=${encodeURIComponent(article.category)}" class="category-link">
              More in ${article.category} →
            </a>
          </div>
        </footer>
      </article>
    `;
  }

  // Share article functionality
  shareArticle(platform, articleId) {
    const article = this.getArticleById(articleId);
    if (!article) return;

    const url = window.location.href;
    const text = `Check out this article: ${article.title}`;

    switch(platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          alert('Link copied to clipboard! 📋');
        });
        break;
    }
  }

  // Render category filter
  renderCategoryFilter(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const categories = this.getCategories();
    
    container.innerHTML = `
      <button class="filter-btn active" data-category="all">
        All Articles
      </button>
      ${categories.map(cat => 
        `<button class="filter-btn" data-category="${cat}">${cat}</button>`
      ).join('')}
    `;

    // Add click handlers
    container.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        const category = e.target.dataset.category;
        if (category === 'all') {
          this.renderArticleList('articles-container');
        } else {
          const filtered = this.getArticlesByCategory(category);
          this.renderArticleList('articles-container', filtered);
        }
      });
    });
  }

  // Render search functionality
  setupSearch(inputId, resultsId) {
    const input = document.getElementById(inputId);
    const results = document.getElementById(resultsId);
    
    if (!input || !results) return;

    input.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      
      if (query.length < 2) {
        this.renderArticleList(resultsId);
        return;
      }

      const searchResults = this.searchArticles(query);
      this.renderArticleList(resultsId, searchResults);
    });
  }

  // Render recent articles
  renderRecentArticles(containerId, limit = 3) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const currentArticleId = urlParams.get('id');
    
    const recent = this.getArticles()
      .filter(article => article.id !== currentArticleId)
      .slice(0, limit);
    
    if (recent.length === 0) {
      container.innerHTML = '<p>No other articles available yet.</p>';
      return;
    }

    container.innerHTML = recent.map(article => `
      <div class="recent-article">
        <img src="${article.image}" alt="${article.title}">
        <div class="recent-content">
          <h4><a href="article.html?id=${article.id}">${article.title}</a></h4>
          <span class="date">${this.formatDate(article.date)}</span>
        </div>
      </div>
    `).join('');
  }

  // Check for URL parameters on articles page
  handleURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const tag = urlParams.get('tag');
    
    if (category) {
      const filtered = this.getArticlesByCategory(category);
      this.renderArticleList('articles-container', filtered);
      
      // Update active filter button
      const filterBtns = document.querySelectorAll('.filter-btn');
      filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
          btn.classList.add('active');
        }
      });
    } else if (tag) {
      const filtered = this.getArticlesByTag(tag);
      this.renderArticleList('articles-container', filtered);
    }
  }
}

// Initialize the article manager
const articleManager = new ArticleManager();

// Auto-load articles when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  // Show loading state
  const loadingContainers = ['articles-container', 'article-container'];
  loadingContainers.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.innerHTML = '<div class="loading">🕷️ Loading articles...</div>';
    }
  });

  // Load articles
  await articleManager.loadArticles();
  
  // Check which page we're on and render accordingly
  const path = window.location.pathname;
  
  if (path.includes('articles.html')) {
    articleManager.renderCategoryFilter('category-filter');
    articleManager.setupSearch('search-input', 'articles-container');
    articleManager.handleURLParams();
    
    // If no URL params, show all articles
    if (!window.location.search) {
      articleManager.renderArticleList('articles-container');
    }
  } else if (path.includes('article.html')) {
    articleManager.renderArticlePage('article-container');
    articleManager.renderRecentArticles('recent-articles', 3);
  } else if (path.includes('index.html') || path === '/') {
    // Optional: show recent articles on homepage
    articleManager.renderRecentArticles('home-recent-articles', 3);
  }
});
