<template>
  <div class="app-container" :class="[theme, { 'menu-open': isMobileMenuOpen }]">
    <!-- Background Elements -->
    <div class="bg-gradient"></div>
    <div class="bg-overlay"></div>
    <div class="bg-particles" ref="particlesContainer"></div>
    <div class="bg-noise"></div>
    
    <!-- Custom Mouse Cursor -->
    <div class="custom-cursor" ref="customCursor" v-if="!isMobile" :style="cursorStyle"></div>
    <div class="custom-cursor-dot" ref="customCursorDot" v-if="!isMobile" :style="cursorDotStyle"></div>
    
    <!-- Header Navigation -->
    <header class="main-header" :class="{ 'scrolled': isScrolled }">
      <div class="container header-container">
        <div class="logo" @click="scrollToSection('home')">
          <div class="logo-icon">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M20 5L5 12.5L20 20L35 12.5L20 5Z" :fill="theme === 'light' ? '#282f53' : '#6e78ff'" />
              <path d="M5 27.5L20 35L35 27.5V12.5L20 20L5 12.5V27.5Z" :fill="theme === 'light' ? '#181c34' : '#4147a8'" fill-opacity="0.7" />
            </svg>
          </div>
          <div class="logo-text">
            <span class="first-name">Šimon</span>
            <span class="last-name">Novák</span>
          </div>
        </div>
        
        <nav class="main-nav">
          <ul class="nav-links" :class="{ 'show': isMobileMenuOpen }">
            <li v-for="(section, index) in navSections" :key="index">
              <a 
                :href="'#' + section.id" 
                :class="{ 'active': activeSection === section.id }"
                @click.prevent="scrollToSection(section.id)"
                data-cursor="hover"
              >
                <span class="nav-icon" v-html="section.icon"></span>
                <span class="nav-text">{{ section.name }}</span>
              </a>
            </li>
          </ul>
        </nav>
        
        <div class="header-actions">
          <!-- Theme Toggle -->
          <button class="theme-toggle" @click="toggleTheme" aria-label="Toggle theme" data-cursor="hover">
            <svg v-if="theme === 'dark'" class="sun-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <svg v-else class="moon-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>
          
          <!-- Social Icons -->
          <div class="social-icons">
            <a href="https://github.com/sajmonekk191" target="_blank" aria-label="GitHub Profile" data-cursor="hover">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a href="https://linkedin.com/in/simonnovak-dev" target="_blank" aria-label="LinkedIn Profile" data-cursor="hover">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="mailto:sn@snovak.cz" aria-label="Contact Email" data-cursor="hover">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </div>
          
          <!-- Mobile Menu Toggle -->
          <button class="mobile-menu-toggle" @click="toggleMobileMenu" aria-label="Toggle mobile menu" data-cursor="hover">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
    
    <!-- Page Content -->
    <main class="main-content">
      <!-- Home Section -->
      <section id="home" class="section home-section" ref="homeSection">
        <div class="container">
          <div class="home-content">
            <div class="home-text" data-aos="fade-up" data-aos-delay="200">
              <div class="badge-container" data-aos="fade-right" data-aos-delay="300">
                <div class="status-badge">
                  <span class="pulse-dot"></span>
                  <span>{{ currentStatus }}</span>
                </div>
              </div>
              
              <h1 class="main-heading" data-aos="fade-up" data-aos-delay="400">
                <span class="greeting">Ahoj, já jsem</span>
                <span class="name">Šimon <span class="highlight">Novák</span></span>
                <span class="role">
                  <span class="txt-rotate" ref="textRotate" data-period="2000" 
                        :data-rotate='JSON.stringify(["Full-Stack Developer", "Web Designer", "Programátor", "UI/UX Expert"])'>
                  </span>
                </span>
              </h1>
              
              <p class="intro-text" data-aos="fade-up" data-aos-delay="600">
                Vytvářím moderní webové aplikace, e-shopy a informační systémy s důrazem na uživatelský zážitek, 
                výkon a bezpečnost. Specializuji se na Vue.js, C# a Python.
              </p>
              
              <div class="cta-buttons" data-aos="fade-up" data-aos-delay="800">
                <button @click="scrollToSection('portfolio')" class="btn btn-primary" data-cursor="hover">
                  <span>Moje portfolio</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
                <button @click="scrollToSection('contact')" class="btn btn-outline" data-cursor="hover">
                  <span>Kontaktuj mě</span>
                </button>
              </div>
              
              <div class="tech-stack" data-aos="fade-up" data-aos-delay="1000">
                <div class="tech-label">Tech Stack:</div>
                <div class="tech-pills">
                  <div v-for="(tech, index) in techStack" :key="index" class="tech-pill" :class="tech.class">
                    <span class="tech-icon" v-html="tech.icon"></span>
                    <span class="tech-name">{{ tech.name }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="home-visual" data-aos="fade-left" data-aos-delay="300">
              <div class="code-editor">
                <div class="editor-header">
                  <div class="editor-buttons">
                    <span class="editor-button close"></span>
                    <span class="editor-button minimize"></span>
                    <span class="editor-button maximize"></span>
                  </div>
                  <div class="editor-title">Developer.cs</div>
                </div>
                <div class="editor-body">
                  <div class="line-numbers">
                    <div v-for="i in 15" :key="i" class="line-number">{{ i }}</div>
                  </div>
                  <div class="code-content">
                    <pre><code><span class="keyword">using</span> System;
<span class="keyword">namespace</span> SimonNovak.Portfolio
{
    <span class="keyword">public class</span> <span class="class-name">Developer</span>
    {
        <span class="keyword">public string</span> Name { <span class="keyword">get</span>; } = <span class="string">"Šimon Novák"</span>;
        <span class="keyword">public int</span> Age { <span class="keyword">get</span>; } = {{ new Date().getFullYear() - 2005 }};
        <span class="keyword">public string</span> Location { <span class="keyword">get</span>; } = <span class="string">"Prague, Czech Republic"</span>;
        <span class="keyword">public string</span> Email { <span class="keyword">get</span>; } = <span class="string">"sn@snovak.cz"</span>;
        <span class="keyword">public string</span> Status { <span class="keyword">get</span>; } = <span class="string">"{{ currentStatus }}"</span>;
        <span class="keyword">public string</span>[] Skills { <span class="keyword">get</span>; } = { <span class="string">"C#"</span>, <span class="string">"Vue.js"</span>, <span class="string">"Python"</span>, <span class="string">"JavaScript"</span> };
        <span class="comment">// Contact me for collaboration opportunities!</span>
    }
}</code></pre>
                  </div>
                </div>
              </div>
              
              <div class="floating-cards">
                <div class="floating-card vue-card">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                    <path d="M12,2 L24,22 L0,22 L12,2" fill="#42B883"/>
                    <path d="M12,2 L19.5,17 L4.5,17 L12,2" fill="#35495E"/>
                  </svg>
                  <div class="card-text">Vue.js</div>
                </div>
                <div class="floating-card csharp-card">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                    <path d="M11.5,15.97L5.27,15.97L5.27,7.95L11.5,7.95C14.05,7.95 16.12,9.77 16.12,11.97C16.12,14.16 14.05,15.97 11.5,15.97" fill="#652076"/>
                    <path d="M18.5,18L17,18V16.5H15.5V18H14V16.5H12.5V18H11V16.5H9.5V18H8V19.5H9.5V21H11V19.5H12.5V21H14V19.5H15.5V21H17V19.5H18.5V18Z" fill="#652076"/>
                  </svg>
                  <div class="card-text">C#</div>
                </div>
                <div class="floating-card python-card">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                    <path d="M12,0C5.4,0 5.6,2.4 5.6,2.4L5.6,5.6L12,5.6L12,6.4L3.6,6.4C3.6,6.4 0,5.9 0,12C0,18.1 3.1,17.6 3.1,17.6L4.9,17.6L4.9,14.3C4.9,14.3 4.8,11.1 8.1,11.1L13.9,11.1C13.9,11.1 16.8,11.2 16.8,8.3L16.8,3.1C16.8,3.1 17.3,0 12,0M8.8,1.6C9.4,1.6 9.9,2.1 9.9,2.7C9.9,3.4 9.4,3.8 8.8,3.8C8.1,3.8 7.6,3.4 7.6,2.7C7.6,2.1 8.1,1.6 8.8,1.6Z" fill="#366994"/>
                    <path d="M12,24C18.6,24 18.4,21.6 18.4,21.6L18.4,18.4L12,18.4L12,17.6L20.4,17.6C20.4,17.6 24,18.1 24,12C24,5.9 20.9,6.4 20.9,6.4L19.1,6.4L19.1,9.7C19.1,9.7 19.2,12.9 15.9,12.9L10.1,12.9C10.1,12.9 7.2,12.8 7.2,15.7L7.2,20.9C7.2,20.9 6.7,24 12,24M15.2,22.4C14.6,22.4 14.1,21.9 14.1,21.3C14.1,20.6 14.6,20.2 15.2,20.2C15.9,20.2 16.4,20.6 16.4,21.3C16.4,21.9 15.9,22.4 15.2,22.4Z" fill="#FFD340"/>
                  </svg>
                  <div class="card-text">Python</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="scroll-indicator" @click="scrollToSection('about')">
            <div class="mouse">
              <div class="mouse-wheel"></div>
            </div>
            <div class="scroll-text">Scrolluj dolů</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7 13l5 5 5-5"></path>
              <path d="M7 7l5 5 5-5"></path>
            </svg>
          </div>
        </div>
      </section>
      
      <!-- About Section -->
      <section id="about" class="section about-section" ref="aboutSection">
        <div class="container">
          <div class="section-header" data-aos="fade-up">
            <h2 class="section-title">O mně</h2>
            <div class="section-subtitle">Kdo jsem a co dělám</div>
            <div class="title-separator"></div>
          </div>
          
          <div class="about-content">
            <div class="about-image" data-aos="fade-right" data-aos-delay="300">
              <div class="image-container">
                <img src="https://placehold.co/600x400" alt="Šimon Novák" class="profile-image">
                <div class="image-frame"></div>
                <div class="experience-badge">
                  <div class="experience-years">{{ new Date().getFullYear() - 2019 }}+</div>
                  <div class="experience-text">Let zkušeností</div>
                </div>
              </div>
              
              <div class="about-stats">
                <div class="stat-item" data-aos="fade-up" data-aos-delay="200">
                  <div class="stat-number">{{ projectsCompleted }}</div>
                  <div class="stat-label">Dokončených projektů</div>
                </div>
                <div class="stat-item" data-aos="fade-up" data-aos-delay="300">
                  <div class="stat-number">{{ clientsServed }}</div>
                  <div class="stat-label">Spokojených klientů</div>
                </div>
                <div class="stat-item" data-aos="fade-up" data-aos-delay="400">
                  <div class="stat-number">{{ codeLinesWritten }}</div>
                  <div class="stat-label">Řádků kódu</div>
                </div>
              </div>
            </div>
            <div class="about-text" data-aos="fade-left" data-aos-delay="300">
              <div class="about-bio">
                <p>
                  Jmenuji se <span class="highlight">Šimon Novák</span> a jsem full-stack vývojář specializující se na 
                  vytváření moderních webových aplikací, e-shopů a informačních systémů.
                </p>
                <p>
                  Mou vášní je vytvářet digitální produkty, které jsou nejen vizuálně přitažlivé, ale také vysoce 
                  funkční a optimalizované pro uživatelský zážitek. Díky zkušenostem s různými technologiemi 
                  jako Vue.js, C#, .NET, Python a dalšími, mohu nabídnout komplexní řešení od návrhu po implementaci.
                </p>
                <p>
                  Jako mladý vývojář neustále sleduji nejnovější trendy a technologie v oboru, což mi umožňuje 
                  přinášet inovativní přístupy a řešení do každého projektu.
                </p>
              </div>
              
              <div class="skills-container">
                <h3>Mé dovednosti</h3>
                
                <div class="skills-tabs">
                  <div class="tabs-header">
                    <div 
                      v-for="(tab, index) in skillTabs" 
                      :key="index" 
                      class="tab-item" 
                      :class="{ 'active': activeSkillTab === index }"
                      @click="activeSkillTab = index"
                      data-cursor="hover"
                    >
                      <span class="tab-icon" v-html="tab.icon"></span>
                      <span class="tab-text">{{ tab.title }}</span>
                    </div>
                  </div>
                  
                  <div class="tabs-content">
                    <div 
                      v-for="(tab, index) in skillTabs" 
                      :key="'content-'+index" 
                      class="tab-content"
                      :class="{ 'active': activeSkillTab === index }"
                    >
                      <div class="skills-grid">
                        <div 
                          v-for="(skill, skillIndex) in tab.skills" 
                          :key="skillIndex" 
                          class="skill-item"
                          data-aos="fade-up"
                          :data-aos-delay="skillIndex * 100"
                        >
                          <div class="skill-info">
                            <div class="skill-name">{{ skill.name }}</div>
                            <div class="skill-level">{{ skill.level }}%</div>
                          </div>
                          <div class="skill-bar">
                            <div class="skill-progress" :style="{ width: skill.level + '%' }"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="about-cta">
                  <a :href="resumeUrl" download class="btn btn-outline" data-cursor="hover">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    <span>Stáhnout životopis</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div class="experience-education" data-aos="fade-up">
            <div class="timeline-container">
              <div class="timeline-header">
                <h3 class="timeline-title">Pracovní zkušenosti & vzdělání</h3>
              </div>
              
              <div class="timeline">
                <div class="timeline-wrapper">
                  <div 
                    v-for="(item, index) in timeline" 
                    :key="index" 
                    class="timeline-item"
                    :class="{ 'right': index % 2 !== 0 }"
                    data-aos="fade-up"
                    :data-aos-delay="index * 100"
                  >
                    <div class="timeline-badge" :class="item.type">
                      <span class="badge-icon" v-html="item.icon"></span>
                    </div>
                    <div class="timeline-panel">
                      <div class="timeline-heading">
                        <span class="timeline-date">{{ item.period }}</span>
                        <h4 class="timeline-title">{{ item.title }}</h4>
                        <div class="timeline-company">{{ item.company }}</div>
                      </div>
                      <div class="timeline-body">
                        <p>{{ item.description }}</p>
                        <div v-if="item.technologies && item.technologies.length" class="timeline-tags">
                          <span v-for="(tech, techIndex) in item.technologies" :key="techIndex" class="timeline-tag">
                            {{ tech }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Portfolio Section -->
      <section id="portfolio" class="section portfolio-section" ref="portfolioSection">
        <div class="container">
          <div class="section-header" data-aos="fade-up">
            <h2 class="section-title">Portfolio</h2>
            <div class="section-subtitle">Mé nejlepší projekty</div>
            <div class="title-separator"></div>
          </div>
          
          <div class="portfolio-filters" data-aos="fade-up" data-aos-delay="300">
            <button 
              v-for="(filter, index) in portfolioFilters" 
              :key="index" 
              class="filter-button" 
              :class="{ 'active': activeFilter === filter.id }"
              @click="setFilter(filter.id)"
              data-cursor="hover"
            >
              <span class="filter-icon" v-html="filter.icon"></span>
              <span class="filter-text">{{ filter.name }}</span>
            </button>
          </div>
          
          <div class="portfolio-grid">
            <div 
              v-for="(project, index) in filteredProjects" 
              :key="index" 
              class="portfolio-item"
              :class="[project.category, { 'expanded': expandedProject === project.id }]"
              data-aos="fade-up"
              :data-aos-delay="index * 100"
              @click="toggleProject(project.id)"
            >
              <div class="portfolio-wrapper">
                <div class="portfolio-image">
                  <img :src="project.image || 'https://placehold.co/600x400'" :alt="project.title">
                  <div class="portfolio-overlay">
                    <div class="portfolio-category" :class="project.category">{{ getCategoryName(project.category) }}</div>
                    <div class="portfolio-buttons">
                      <button @click.stop="viewProjectDetails(project)" class="view-button" data-cursor="hover">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="16"></line>
                          <line x1="8" y1="12" x2="16" y2="12"></line>
                        </svg>
                      </button>
                      <a v-if="project.liveUrl" :href="project.liveUrl" target="_blank" class="live-button" @click.stop data-cursor="hover">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 16 16 12 12 8"></polyline>
                          <line x1="8" y1="12" x2="16" y2="12"></line>
                        </svg>
                      </a>
                      <a v-if="project.githubUrl" :href="project.githubUrl" target="_blank" class="github-button" @click.stop data-cursor="hover">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="portfolio-info">
                  <h3 class="portfolio-title">{{ project.title }}</h3>
                  <div class="portfolio-technologies">
                    <span 
                      v-for="(tech, techIndex) in project.technologies.slice(0, 3)" 
                      :key="techIndex" 
                      class="tech-tag"
                    >
                      {{ tech }}
                    </span>
                    <span v-if="project.technologies.length > 3" class="tech-more">+{{ project.technologies.length - 3 }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Contact Section -->
      <section id="contact" class="section contact-section" ref="contactSection">
        <div class="container">
          <div class="section-header" data-aos="fade-up">
            <h2 class="section-title">Kontakt</h2>
            <div class="section-subtitle">Spojte se se mnou</div>
            <div class="title-separator"></div>
          </div>
          
          <div class="contact-content">
            <div class="contact-info" data-aos="fade-right" data-aos-delay="300">
              <h3>Dejme se do spojení</h3>
              <p>
                Ať už máte zájem o spolupráci na projektu, máte nějaký dotaz nebo jen chcete pozdravit,
                neváhejte mě kontaktovat. Rád Vám odpovím co nejdříve to bude možné.
              </p>
              
              <div class="contact-items">
                <div class="contact-item">
                  <div class="contact-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                      <path d="M22 7l-10 7L2 7"></path>
                    </svg>
                  </div>
                  <div class="contact-text">
                    <h4>Email</h4>
                    <a href="mailto:sn@snovak.cz" data-cursor="hover">sn@snovak.cz</a>
                  </div>
                </div>
                
                <div class="contact-item">
                  <div class="contact-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div class="contact-text">
                    <h4>Telefon</h4>
                    <a href="tel:+420732189053" data-cursor="hover">+420 732 189 053</a>
                  </div>
                </div>
                
                <div class="contact-item">
                  <div class="contact-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div class="contact-text">
                    <h4>Lokace</h4>
                    <span>Praha, Česká republika</span>
                  </div>
                </div>
                
                <div class="contact-social">
                  <h4>Sociální sítě</h4>
                  <div class="social-links">
                    <a href="https://github.com/sajmonekk191" target="_blank" class="social-link" data-cursor="hover">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                      <span>GitHub</span>
                    </a>
                    <a href="https://linkedin.com/in/simonnovak-dev" target="_blank" class="social-link" data-cursor="hover">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="contact-form" data-aos="fade-left" data-aos-delay="300">
              <form @submit.prevent="submitContactForm" ref="contactForm">
                <div class="form-group">
                  <label for="name">Jméno</label>
                  <div class="input-wrapper">
                    <input 
                      type="text" 
                      id="name" 
                      v-model="contactForm.name" 
                      required
                      :class="{ 'filled': contactForm.name }"
                      data-cursor="input"
                    >
                    <span class="input-focus-border"></span>
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="email">Email</label>
                  <div class="input-wrapper">
                    <input 
                      type="email" 
                      id="email" 
                      v-model="contactForm.email" 
                      required
                      :class="{ 'filled': contactForm.email }"
                      data-cursor="input"
                    >
                    <span class="input-focus-border"></span>
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="subject">Předmět</label>
                  <div class="input-wrapper">
                    <input 
                      type="text" 
                      id="subject" 
                      v-model="contactForm.subject" 
                      required
                      :class="{ 'filled': contactForm.subject }"
                      data-cursor="input"
                    >
                    <span class="input-focus-border"></span>
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="message">Zpráva</label>
                  <div class="input-wrapper textarea-wrapper">
                    <textarea 
                      id="message" 
                      v-model="contactForm.message" 
                      rows="5" 
                      required
                      :class="{ 'filled': contactForm.message }"
                      data-cursor="input"
                    ></textarea>
                    <span class="input-focus-border"></span>
                  </div>
                </div>
                
                <div class="form-submit">
                  <button type="submit" class="btn btn-primary submit-btn" :disabled="formSubmitting" data-cursor="hover">
                    <span v-if="!formSubmitting">Odeslat zprávu</span>
                    <span v-else class="btn-loading">
                      <svg class="spinner" viewBox="0 0 24 24">
                        <circle class="spinner-path" cx="12" cy="12" r="10" fill="none" stroke-width="3"></circle>
                      </svg>
                    </span>
                  </button>
                </div>
                
                <div v-if="formSuccess" class="form-success">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>Zpráva byla úspěšně odeslána! Děkuji za kontaktování.</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
    
    <!-- Footer -->
    <footer class="main-footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-logo">
            <div class="logo-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M20 5L5 12.5L20 20L35 12.5L20 5Z" :fill="theme === 'light' ? '#282f53' : '#6e78ff'" />
                <path d="M5 27.5L20 35L35 27.5V12.5L20 20L5 12.5V27.5Z" :fill="theme === 'light' ? '#181c34' : '#4147a8'" fill-opacity="0.7" />
              </svg>
            </div>
            <div class="logo-text">
              <span class="first-name">Šimon</span>
              <span class="last-name">Novák</span>
            </div>
          </div>
          
          <div class="footer-links">
            <div 
              v-for="(section, index) in navSections" 
              :key="index" 
              class="footer-link"
              @click="scrollToSection(section.id)"
              data-cursor="hover"
            >
              {{ section.name }}
            </div>
          </div>
          
          <div class="footer-socials">
            <a href="https://github.com/sajmonekk191" target="_blank" aria-label="GitHub Profile" data-cursor="hover">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a href="https://linkedin.com/in/simonnovak-dev" target="_blank" aria-label="LinkedIn Profile" data-cursor="hover">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="mailto:sn@snovak.cz" aria-label="Contact Email" data-cursor="hover">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </div>
        </div>
        
        <div class="footer-bottom">
          <div class="copyright">
            &copy; {{ new Date().getFullYear() }} Šimon Novák. Všechna práva vyhrazena.
          </div>
        </div>
      </div>
    </footer>
    
    <!-- Back to Top Button -->
    <div class="back-to-top" :class="{ 'visible': showBackToTop }" @click="scrollToTop" data-cursor="hover">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    </div>
    
    <!-- Project Modal -->
    <div class="project-modal" v-if="showProjectModal" @click="closeProjectModal">
      <div class="modal-wrapper" @click.stop>
        <div class="modal-close" @click="closeProjectModal" data-cursor="hover">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
        
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">{{ selectedProject?.title }}</h3>
            <div class="modal-category" :class="selectedProject?.category">
              {{ getCategoryName(selectedProject?.category) }}
            </div>
          </div>
          
          <div class="modal-body">
            <div class="modal-image">
              <img :src="selectedProject?.image || 'https://placehold.co/600x400'" :alt="selectedProject?.title">
            </div>
            
            <div class="modal-details">
              <div class="modal-description">
                <h4>O projektu</h4>
                <p>{{ selectedProject?.description }}</p>
              </div>
              
              <div class="modal-features">
                <h4>Klíčové funkce</h4>
                <ul>
                  <li v-for="(feature, index) in selectedProject?.features" :key="index">
                    {{ feature }}
                  </li>
                </ul>
              </div>
              
              <div class="modal-tech">
                <h4>Použité technologie</h4>
                <div class="tech-stack">
                  <span 
                    v-for="(tech, index) in selectedProject?.technologies" 
                    :key="index" 
                    class="tech-badge"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
              
              <div class="modal-buttons">
                <a v-if="selectedProject?.liveUrl" :href="selectedProject?.liveUrl" target="_blank" class="btn btn-primary" data-cursor="hover">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 16 16 12 12 8"></polyline>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                  <span>Živá ukázka</span>
                </a>
                <a v-if="selectedProject?.githubUrl" :href="selectedProject?.githubUrl" target="_blank" class="btn btn-outline" data-cursor="hover">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      // Theme and UI state
      theme: localStorage.getItem('theme') || 'dark',
      isMobile: false,
      isScrolled: false,
      isMobileMenuOpen: false,
      activeSection: 'home',
      showBackToTop: false,
      
      // Custom cursor
      cursorStyle: {
        left: '0px',
        top: '0px',
        transform: 'translate(-50%, -50%) scale(1)',
        opacity: 0
      },
      cursorDotStyle: {
        left: '0px',
        top: '0px',
        transform: 'translate(-50%, -50%) scale(1)',
        opacity: 0
      },
      
      // Content data
      currentStatus: 'Podnikání na IČO (Looking for a good job)',
      projectsCompleted: 25,
      clientsServed: 15,
      codeLinesWritten: '150k+',
      resumeUrl: '/downloads/SimonNovak_CV.pdf',
      activeSkillTab: 0,
      
      // Navigation sections
      navSections: [
        { 
          id: 'home', 
          name: 'Úvod',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>'
        },
        { 
          id: 'about', 
          name: 'O mně',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="4"></circle><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path></svg>'
        },
        { 
          id: 'portfolio', 
          name: 'Portfolio',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>'
        },
        { 
          id: 'contact', 
          name: 'Kontakt',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>'
        }
      ],
      
      // Tech stack
      techStack: [
        {
          name: 'Vue.js',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M12,2 L24,22 L0,22 L12,2" fill="#42B883"/><path d="M12,2 L19.5,17 L4.5,17 L12,2" fill="#35495E"/></svg>',
          class: 'vue'
        },
        {
          name: 'C#',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M11.5,15.97L5.27,15.97L5.27,7.95L11.5,7.95C14.05,7.95 16.12,9.77 16.12,11.97C16.12,14.16 14.05,15.97 11.5,15.97" fill="#652076"/><path d="M18.5,18L17,18V16.5H15.5V18H14V16.5H12.5V18H11V16.5H9.5V18H8V19.5H9.5V21H11V19.5H12.5V21H14V19.5H15.5V21H17V19.5H18.5V18Z" fill="#652076"/></svg>',
          class: 'csharp'
        },
        {
          name: 'Python',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M12,0C5.4,0 5.6,2.4 5.6,2.4L5.6,5.6L12,5.6L12,6.4L3.6,6.4C3.6,6.4 0,5.9 0,12C0,18.1 3.1,17.6 3.1,17.6L4.9,17.6L4.9,14.3C4.9,14.3 4.8,11.1 8.1,11.1L13.9,11.1C13.9,11.1 16.8,11.2 16.8,8.3L16.8,3.1C16.8,3.1 17.3,0 12,0" fill="#366994"/><path d="M12,24C18.6,24 18.4,21.6 18.4,21.6L18.4,18.4L12,18.4L12,17.6L20.4,17.6C20.4,17.6 24,18.1 24,12C24,5.9 20.9,6.4 20.9,6.4L19.1,6.4L19.1,9.7C19.1,9.7 19.2,12.9 15.9,12.9L10.1,12.9C10.1,12.9 7.2,12.8 7.2,15.7L7.2,20.9C7.2,20.9 6.7,24 12,24" fill="#FFD340"/></svg>',
          class: 'python'
        },
        {
          name: 'JavaScript',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M3,3h18v18H3V3z" fill="#F7DF1E"/><path d="M12,17.5c0.5,0.8,1.2,1.4,2.4,1.4c1,0,1.6-0.5,1.6-1.2c0-0.8-0.7-1.1-1.8-1.6l-0.6-0.3c-1.8-0.8-2.9-1.7-2.9-3.7c0-1.8,1.4-3.2,3.6-3.2c1.6,0,2.7,0.5,3.5,2l-1.9,1.2c-0.4-0.8-0.9-1.1-1.6-1.1c-0.7,0-1.2,0.5-1.2,1.1c0,0.8,0.5,1.1,1.6,1.6l0.6,0.3c2.1,0.9,3.3,1.8,3.3,3.9c0,2.2-1.7,3.4-4,3.4c-2.2,0-3.7-1.1-4.4-2.5L12,17.5z" fill="#000"/><path d="M8.3,17.8c0.4,0.7,0.7,1.3,1.6,1.3c0.8,0,1.3-0.3,1.3-1.6v-8.5h2.4v8.6c0,2.5-1.5,3.6-3.6,3.6c-1.9,0-3-1-3.6-2.2L8.3,17.8z" fill="#000"/></svg>',
          class: 'javascript'
        },
        {
          name: 'Node.js',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M12,0C5.4,0 0,5.4 0,12s5.4,12 12,12s12-5.4 12-12S18.6,0 12,0z" fill="#83CD29"/><path d="M12,2.4c-5.3,0-9.6,4.3-9.6,9.6s4.3,9.6 9.6,9.6s9.6-4.3 9.6-9.6S17.3,2.4 12,2.4z M15.1,15.2c0,0.3-0.2,0.5-0.5,0.5c-0.1,0-0.3,0-0.4-0.1c-0.3-0.2-0.5-0.3-0.8-0.5c-0.1-0.1-0.2-0.2-0.3-0.3c-0.1,0.1-0.2,0.2-0.3,0.3c-0.3,0.2-0.5,0.3-0.8,0.5c-0.1,0.1-0.2,0.1-0.4,0.1c-0.3,0-0.5-0.2-0.5-0.5V9.8c0-0.3,0.2-0.5,0.5-0.5s0.5,0.2,0.5,0.5v4.7c0.2-0.1,0.3-0.2,0.5-0.4c0.1-0.1,0.2-0.2,0.4-0.2c0.1,0,0.3,0.1,0.4,0.2c0.2,0.1,0.3,0.3,0.5,0.4V9.8c0-0.3,0.2-0.5,0.5-0.5s0.5,0.2,0.5,0.5V15.2z M12.9,8.9c0,0.5-0.4,0.8-0.9,0.8s-0.9-0.4-0.9-0.8s0.4-0.9,0.9-0.9S12.9,8.4,12.9,8.9z" fill="#5B9735"/></svg>',
          class: 'nodejs'
        }
      ],
      
      // Skills sections
      skillTabs: [
        {
          title: 'Programování',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',
          skills: [
            { name: 'C#', level: 95 },
            { name: 'JavaScript', level: 90 },
            { name: 'Python', level: 85 },
            { name: 'Java', level: 80 },
            { name: 'HTML/CSS', level: 88 },
            { name: 'SQL', level: 85 }
          ]
        },
        {
          title: 'Frameworky',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>',
          skills: [
            { name: '.NET / .NET Core', level: 92 },
            { name: 'Vue.js', level: 88 },
            { name: 'Node.js', level: 82 },
            { name: 'React', level: 75 },
            { name: 'Flask', level: 78 },
            { name: 'Entity Framework', level: 85 }
          ]
        },
        {
          title: 'Databáze',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>',
          skills: [
            { name: 'MySQL', level: 90 },
            { name: 'Microsoft SQL Server', level: 85 },
            { name: 'MongoDB', level: 75 },
            { name: 'SQLite', level: 80 }
          ]
        },
        {
          title: 'Nástroje',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>',
          skills: [
            { name: 'Git', level: 92 },
            { name: 'Visual Studio', level: 95 },
            { name: 'VS Code', level: 93 },
            { name: 'Docker', level: 75 },
            { name: 'Linux/Unix', level: 80 },
            { name: 'Windows', level: 90 }
          ]
        }
      ],
      // Timeline data
      timeline: [
        {
          type: 'work',
          period: '06/2023 - Současnost',
          title: 'Externí technik',
          company: 'TMlink s.r.o.',
          description: 'Práce se síťovými zařízeními CPE, routery, lufty, optickým připojením, backupy, L2 a L3 vrstvou. Zajišťování správného fungování síťových zařízení pro zákazníky T-Mobile. Komunikace se zákazníky a řešení technických problémů.',
          technologies: ['Networking', 'Optické sítě', 'L2/L3 protokoly', 'TCP/IP'],
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>'
        },
        {
          type: 'education',
          period: '09/2018 - 06/2024',
          title: 'Gymnázium a Střední odborná škola Slavičín - Obor IT',
          company: 'Vzdělávání',
          description: 'Studium oboru Informační technologie zakončené maturitní zkouškou. Specializace na programování, vývoj webových aplikací a správu sítí. 2. místo ve zlínském okresním kole SOČ s projektem "SOSGame".',
          technologies: [],
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path></svg>'
        },
        {
          type: 'work',
          period: '2019 - Současnost',
          title: 'Programátor OSVČ',
          company: 'Freelance',
          description: 'Vývoj webových aplikací, e-shopů a informačních systémů na míru. Návrh a implementace frontend a backend řešení, integrace platebních systémů, optimalizace výkonu a zabezpečení aplikací.',
          technologies: ['Vue.js', 'React', 'C#', '.NET', 'Python', 'MySQL', 'JavaScript', 'HTML/CSS'],
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>'
        },
        {
          type: 'work',
          period: '06/2023 - 06/2023',
          title: 'IT Pomocník (Školní praxe)',
          company: 'Polysoft s.r.o.',
          description: 'Školní praxe ve firmě Polysoft. Práce s hardwarem, oprava nefunkčních PC, hromadná instalace Windows a IT servis na městském úřadě v Úvalech. Zajišťování chodu techniky a řešení technických problémů.',
          technologies: ['Windows', 'Hardware', 'IT Support'],
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>'
        },
        {
          type: 'education',
          period: '09/2009 - 06/2018',
          title: 'Základní škola - Nedašov',
          company: 'Vzdělávání',
          description: 'Základní vzdělání se zaměřením na matematiku a přírodovědné předměty.',
          technologies: [],
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path></svg>'
        }
      ],
      
      // Portfolio data
      portfolioFilters: [
        {
          id: 'all',
          name: 'Vše',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>'
        },
        {
          id: 'web',
          name: 'Webové aplikace',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>'
        },
        {
          id: 'software',
          name: 'Software',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>'
        },
        {
          id: 'e-commerce',
          name: 'E-commerce',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>'
        },
        {
          id: 'game',
          name: 'Hry',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"></rect><line x1="6" y1="12" x2="10" y2="12"></line><line x1="8" y1="10" x2="8" y2="14"></line><circle cx="16" cy="12" r="1"></circle></svg>'
        },
        {
          id: 'business',
          name: 'Byznys aplikace',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3z"></path><path d="M14 14.5a2.5 2.5 0 0 1-5 0v-7.5a2.5 2.5 0 0 1 5 0z"></path></svg>'
        }
      ],
      
      activeFilter: 'all',
      expandedProject: null,
      showProjectModal: false,
      selectedProject: null,
      
      // Portfolio projects
      projects: [
        {
          id: 1,
          title: 'E-shop Sajrajt.cz',
          category: 'e-commerce',
          image: 'https://placehold.co/600x400',
          description: 'Kompletní e-commerce řešení s moderním frontendem a robustním backendem. Zahrnuje správu produktů, kategorií, objednávek, zákazníků a platebních metod. Optimalizováno pro SEO a rychlost načítání.',
          features: [
            'Responzivní design optimalizovaný pro mobilní zařízení',
            'Propracovaný košík a objednávkový proces',
            'Administrační rozhraní pro správu obchodu',
            'Integrace platebních bran a dopravců',
            'Automatizovaný proces fakturace a potvrzení objednávek',
            'Integrovaný vyhledávač produktů a filtrování'
          ],
          technologies: ['Vue.js', 'Node.js', 'Express', 'MySQL', 'REST API'],
          githubUrl: null,
          liveUrl: 'https://sajrajt.cz'
        },
        {
          id: 2,
          title: 'VoidSharp',
          category: 'software',
          image: 'https://placehold.co/600x400',
          description: 'Pokročilá desktopová aplikace pro analýzu a automatizaci herních procesů s implementací komplexních algoritmů pro detekci herních objektů a jejich interakci. Zahrnuje vlastní skriptovací engine a plugin systém.',
          features: [
            'Vlastní skriptovací engine pro automatizaci',
            'Real-time detekce herních objektů pomocí počítačového vidění',
            'Plugin systém pro rozšiřitelnost',
            'Pokročilé zabezpečení a ochrana proti detekci',
            'Automatické aktualizace a správa verzí'
          ],
          technologies: ['C#', '.NET', 'WPF', 'MVVM', 'API'],
          githubUrl: 'https://github.com/sajmonekk191/voidsharp',
          liveUrl: null
        },
        {
          id: 3,
          title: 'Zentos - Objednávkový systém',
          category: 'business',
          image: 'https://placehold.co/600x400',
          description: 'Profesionální systém pro správu objednávek, zákazníků a fakturaci s pokročilým zabezpečením proti útokům. Zahrnuje automatizované workflow, generování faktur a reportů, a API pro integraci s dalšími systémy.',
          features: [
            'Komplexní správa objednávek a zákazníků',
            'Automatizované generování faktur v PDF formátu',
            'Víceúrovňové uživatelské role a oprávnění',
            'Pokročilé zabezpečení proti SQL injection a XSS útokům',
            'API pro integraci s externími systémy a službami',
            'Automatické zálohy a obnova dat'
          ],
          technologies: ['C#', '.NET Core', 'Entity Framework', 'SQL Server', 'REST API', 'Vue.js'],
          githubUrl: null,
          liveUrl: null
        },
        {
          id: 4,
          title: 'StrategyBet.online',
          category: 'web',
          image: 'https://placehold.co/600x400',
          description: 'Interaktivní webová aplikace s analytickými nástroji a vizualizací dat. Poskytuje uživatelům real-time statistiky, prediktivní modely a dashboardy s možností přizpůsobení.',
          features: [
            'Real-time dashboardy s vizualizací dat pomocí Chart.js',
            'Interaktivní filtrování a analýza dat',
            'WebSocket integrace pro live aktualizace',
            'Uživatelské profily s personalizovanými nastaveními',
            'Export dat do CSV a PDF',
            'Responzivní design pro všechna zařízení'
          ],
          technologies: ['Vue.js', 'Node.js', 'Express', 'MongoDB', 'Chart.js', 'WebSockets'],
          githubUrl: null,
          liveUrl: 'https://strategybet.online'
        },
        {
          id: 5,
          title: 'SOSGame',
          category: 'game',
          image: 'https://placehold.co/600x400',
          description: 'Interaktivní vzdělávací online hra s dynamickým generováním otázek pomocí umělé inteligence (ChatGPT API). Umožňuje procvičování jakýchkoliv témat v zábavném a soutěživém prostředí.',
          features: [
            'Dynamické generování otázek pomocí ChatGPT',
            'Multiplayer mód pro soutěžení s ostatními hráči',
            'Systém hodnocení a sledování pokroku',
            'Tvorba vlastních témat a otázek',
            'Adaptivní obtížnost otázek podle schopností uživatele',
            'Real-time aktualizace pomocí WebSocketů'
          ],
          technologies: ['Python', 'Flask', 'JavaScript', 'WebSockets', 'OpenAI API'],
          githubUrl: 'https://github.com/sajmonekk191/sosgame',
          liveUrl: null
        },
        {
          id: 6,
          title: 'League Tools',
          category: 'software',
          image: 'https://placehold.co/600x400',
          description: 'Komplexní sada nástrojů pro analýzu a optimalizaci herního výkonu v online hrách. Zahrnuje real-time monitorování, analýzu dat a automatizační skripty.',
          features: [
            'Real-time monitorování herních metrik',
            'Analýza výkonu a statistik',
            'Automatizační skripty pro opakující se úkoly',
            'Konfigurovatelné uživatelské rozhraní',
            'Aktualizace prostřednictvím API'
          ],
          technologies: ['C#', '.NET', 'WPF', 'API Integration'],
          githubUrl: 'https://github.com/sajmonekk191/leaguetools',
          liveUrl: null
        }
      ],
      
      // Contact form
      contactForm: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      formSubmitting: false,
      formSuccess: false
    };
  },
  computed: {
    // Filter projects based on active category
    filteredProjects() {
      if (this.activeFilter === 'all') {
        return this.projects;
      }
      return this.projects.filter(project => project.category === this.activeFilter);
    }
  },
  
  mounted() {
    // Check if user is on mobile
    this.checkMobile();
    
    // Setup event listeners
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('mousemove', this.handleMouseMove);
    
    // Initialize animations
    this.initParticles();
    this.initTextRotation();
    this.initAnimationsOnScroll();
    
    // Set active section based on URL hash
    this.setActiveSectionFromHash();
    
    // Setup intersection observer for sections
    this.setupSectionObserver();
  },
  
  beforeUnmount() {
    // Remove event listeners
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('mousemove', this.handleMouseMove);
    
    // Destroy any initialized components or libraries
    if (this.particlesInstance) {
      this.particlesInstance.destroy();
    }
  },
  
  methods: {
    // Navigation and scrolling
    scrollToSection(sectionId) {
      this.isMobileMenuOpen = false;
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 80; // Height of the fixed header
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Update URL hash without triggering scroll
        history.pushState(null, null, `#${sectionId}`);
        this.activeSection = sectionId;
      }
    },
    
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    
    // Set active section when URL has hash
    setActiveSectionFromHash() {
      const hash = window.location.hash;
      if (hash) {
        const sectionId = hash.substring(1);
        this.activeSection = sectionId;
      }
    },
    
    // Toggle theme between light and dark
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', this.theme);
      document.documentElement.setAttribute('data-theme', this.theme);
    },
    
    // Toggle mobile menu
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
      document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
    },
    
    // Handle window resize events
    handleResize() {
      this.checkMobile();
      if (this.isMobile) {
        this.isMobileMenuOpen = false;
      }
    },
    
    // Check if user is on mobile device
    checkMobile() {
      this.isMobile = window.innerWidth < 992;
    },
    
    // Handle scroll events
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
      this.showBackToTop = window.scrollY > 500;
    },
    
    // Mouse cursor effects
    handleMouseMove(e) {
      if (this.isMobile) return;
      
      // Custom cursor follows mouse
      this.cursorStyle = {
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
        opacity: 1,
        transform: 'translate(-50%, -50%) scale(1)'
      };
      
      this.cursorDotStyle = {
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
        opacity: 1,
        transform: 'translate(-50%, -50%) scale(1)'
      };
      
      // Check for hover elements
      const hoverElements = document.querySelectorAll('[data-cursor="hover"]');
      const inputElements = document.querySelectorAll('[data-cursor="input"]');
      
      let isHovering = false;
      let isInput = false;
      
      hoverElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          isHovering = true;
        }
      });
      
      inputElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          isInput = true;
        }
      });
      
      if (isHovering) {
        this.cursorStyle.transform = 'translate(-50%, -50%) scale(1.5)';
        this.cursorDotStyle.transform = 'translate(-50%, -50%) scale(0.5)';
      } else if (isInput) {
        this.cursorStyle.transform = 'translate(-50%, -50%) scale(0.1)';
        this.cursorDotStyle.transform = 'translate(-50%, -50%) scale(0.5)';
      }
    },
    
    // Portfolio filter methods
    setFilter(filter) {
      this.activeFilter = filter;
    },
    
    toggleProject(projectId) {
      if (this.expandedProject === projectId) {
        this.expandedProject = null;
      } else {
        this.expandedProject = projectId;
      }
    },
    
    getCategoryName(categoryId) {
      const category = this.portfolioFilters.find(filter => filter.id === categoryId);
      return category ? category.name : '';
    },
    
    // Project modal methods
    viewProjectDetails(project) {
      this.selectedProject = project;
      this.showProjectModal = true;
      document.body.style.overflow = 'hidden';
    },
    
    closeProjectModal() {
      this.showProjectModal = false;
      document.body.style.overflow = '';
    },
    
    // Contact form methods
    submitContactForm() {
      this.formSubmitting = true;
      
      // Simulate API call with timeout
      setTimeout(() => {
        this.formSuccess = true;
        this.formSubmitting = false;
        this.contactForm = {
          name: '',
          email: '',
          subject: '',
          message: ''
        };
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          this.formSuccess = false;
        }, 5000);
      }, 1500);
    },
    
    // Initialize particles background
    initParticles() {
      if (!this.$refs.particlesContainer) return;
      
      // Create canvas element
      const canvas = document.createElement('canvas');
      this.$refs.particlesContainer.appendChild(canvas);
      
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Particle properties
      const particleCount = 100;
      const particles = [];
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          color: this.getRandomParticleColor(),
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
      
      // Animation loop
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          
          // Bounce off edges
          if (particle.x < 0 || particle.x > canvas.width) {
            particle.speedX = -particle.speedX;
          }
          
          if (particle.y < 0 || particle.y > canvas.height) {
            particle.speedY = -particle.speedY;
          }
          
          // Draw particle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${particle.color}, ${particle.opacity})`;
          ctx.fill();
        });
        
        // Draw connections between nearby particles
        particles.forEach((particle, index) => {
          for (let j = index + 1; j < particles.length; j++) {
            const otherParticle = particles[j];
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(${particle.color}, ${0.1 * (1 - distance / 100)})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
            }
          }
        });
        
        requestAnimationFrame(animate);
      };
      
      animate();
      
      // Update canvas size on window resize
      window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });
    },
    
    getRandomParticleColor() {
      // Return different colors for light and dark themes
      if (this.theme === 'light') {
        return '100, 116, 228'; // Blue for light theme
      } else {
        return '110, 120, 255'; // Brighter blue for dark theme
      }
    },
    
    // Setup intersection observer for section detection
    setupSectionObserver() {
      const sections = document.querySelectorAll('section.section');
      const navSections = this.navSections.map(section => section.id);
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            const sectionId = entry.target.id;
            if (navSections.includes(sectionId)) {
              this.activeSection = sectionId;
              history.replaceState(null, null, `#${sectionId}`);
            }
          }
        });
      }, { threshold: 0.3 });
      
      sections.forEach(section => {
        observer.observe(section);
      });
    },
    // Initialize text rotation animation
    initTextRotation() {
      if (!this.$refs.textRotate) return;
      
      const textRotate = this.$refs.textRotate;
      const dataRotate = JSON.parse(textRotate.getAttribute('data-rotate'));
      const period = parseInt(textRotate.getAttribute('data-period'), 10) || 2000;
      let loopNum = 0;
      let txt = '';
      let isDeleting = false;
      let time = 200;
      
      function tick() {
        const i = loopNum % dataRotate.length;
        const fullTxt = dataRotate[i];
        
        if (isDeleting) {
          txt = fullTxt.substring(0, txt.length - 1);
        } else {
          txt = fullTxt.substring(0, txt.length + 1);
        }
        
        textRotate.innerHTML = `<span class="wrap">${txt}</span>`;
        
        // Adjust typing speed
        if (isDeleting) {
          time = 100;
        } else {
          time = 200 - Math.random() * 100;
        }
        
        if (!isDeleting && txt === fullTxt) {
          time = period;
          isDeleting = true;
        } else if (isDeleting && txt === '') {
          isDeleting = false;
          loopNum++;
          time = 500;
        }
        
        setTimeout(tick, time);
      }
      
      tick();
    },
    
    // Initialize AOS (Animate On Scroll) library
    initAnimationsOnScroll() {
  // Jednoduché vlastní řešení pro elementy s data-aos atributem
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.getAttribute('data-aos-delay') || 0;
        
        setTimeout(() => {
          el.classList.add('aos-animate');
        }, delay);
        
        observer.unobserve(el);
      }
    });
  }, observerOptions);
  
  const elements = document.querySelectorAll('[data-aos]');
  elements.forEach(el => {
    observer.observe(el);
  });
},
    
    // Utility to check if element is in viewport
    isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    },
    
    // Create typed animation effect for specified element
    createTypedAnimation(element, text, onComplete = null) {
      let index = 0;
      element.innerHTML = '';
      
      const interval = setInterval(() => {
        if (index < text.length) {
          element.innerHTML += text.charAt(index);
          index++;
        } else {
          clearInterval(interval);
          if (onComplete) onComplete();
        }
      }, 30);
    },
    
    // Handle scroll animation for skills section
    animateSkillBars() {
      const skillBars = document.querySelectorAll('.skill-progress');
      
      skillBars.forEach(bar => {
        const level = bar.parentElement.previousElementSibling.querySelector('.skill-level').textContent;
        bar.style.width = '0';
        
        setTimeout(() => {
          bar.style.width = level;
        }, 300);
      });
    },
    
    // Helper function to preload images for smoother experience
    preloadImages(images) {
      images.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    },
    
    // Generate random number within range
    getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    // Animate numbers (for statistics)
    animateNumber(element, start, end, duration) {
      let startTime = null;
      
      // Function to animate value over time
      const animate = timestamp => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        element.textContent = currentValue;
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          element.textContent = end;
        }
      };
      
      requestAnimationFrame(animate);
    },
    
    // Custom scroll detector for adding animation classes
    handleScrollAnimations() {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
        if (this.isInViewport(element)) {
          element.classList.add('in-view');
        }
      });
    },
    
    // Filter special characters from strings
    sanitizeString(string) {
      return string.replace(/[^\w\s-]/gi, '');
    },
    
    // Create custom alerts
    showCustomAlert(message, type = 'info') {
      const alertEl = document.createElement('div');
      alertEl.className = `custom-alert ${type}`;
      alertEl.innerHTML = `<span>${message}</span><button class="close-alert">×</button>`;
      document.body.appendChild(alertEl);
      
      // Show the alert with animation
      setTimeout(() => {
        alertEl.classList.add('show');
      }, 10);
      
      // Add event listener to close button
      alertEl.querySelector('.close-alert').addEventListener('click', () => {
        alertEl.classList.remove('show');
        setTimeout(() => {
          alertEl.remove();
        }, 300);
      });
      
      // Auto close after 5 seconds
      setTimeout(() => {
        if (document.body.contains(alertEl)) {
          alertEl.classList.remove('show');
          setTimeout(() => {
            if (document.body.contains(alertEl)) {
              alertEl.remove();
            }
          }, 300);
        }
      }, 5000);
    },
    
    // Debounce function to limit function call frequency
    debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },
    
    // Copy text to clipboard
    copyToClipboard(text) {
      navigator.clipboard.writeText(text)
        .then(() => {
          this.showCustomAlert('Zkopírováno do schránky!', 'success');
        })
        .catch(() => {
          this.showCustomAlert('Nepodařilo se zkopírovat', 'error');
        });
    }
  }
};
</script>

<style>
/* ---------------------------------------------
   1. CORE STYLES & VARIABLES
---------------------------------------------- */
:root {
  /* Color variables - Light theme */
  --primary: #6e78ff;
  --primary-dark: #4147a8;
  --primary-light: #9fa4ff;
  --secondary: #ff7e5f;
  --secondary-dark: #e05a45;
  --secondary-light: #ffb5a5;
  --accent: #0cce6b;
  --accent-dark: #06a352;
  --accent-light: #5fe0a7;
  
  /* Text colors - Light theme */
  --text-primary: #181c34;
  --text-secondary: #404466;
  --text-tertiary: #5f627a;
  --text-light: #f7f8fc;
  
  /* Background colors - Light theme */
  --bg-primary: #f7f8fc;
  --bg-secondary: #e9eaf3;
  --bg-tertiary: #d8daeb;
  --bg-card: #ffffff;
  --bg-card-hover: #f0f2ff;
  
  /* Neutral colors */
  --success: #0cce6b;
  --warning: #ffc555;
  --error: #ff5252;
  --info: #0cc0de;
  
  /* Effects */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 12px 32px rgba(0, 0, 0, 0.12);
  
  /* Transitions */
  --transition-fast: 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --transition-normal: 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --transition-slow: 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --transition-bounce: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  /* Typography */
  --font-heading: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  
  /* Border Radius */
  --border-radius-sm: 0.25rem;
  --border-radius-md: 0.5rem;
  --border-radius-lg: 1rem;
  --border-radius-xl: 1.5rem;
  --border-radius-full: 9999px;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
  --spacing-3xl: 4rem;
  
  /* Z-index layers */
  --z-below: -1;
  --z-normal: 1;
  --z-above: 10;
  --z-elevated: 50;
  --z-header: 100;
  --z-modal: 1000;
  --z-overlay: 2000;
  --z-tooltip: 3000;
  
  /* Container width */
  --container-width: 1320px;
  --container-padding: 1.5rem;
  
  /* Header height */
  --header-height: 5rem;
  --header-height-scrolled: 4rem;
}

/* Dark theme variables */
[data-theme="dark"],
.dark {
  /* Color variables - Dark theme */
  --primary: #6e78ff;
  --primary-dark: #4147a8;
  --primary-light: #9fa4ff;
  --secondary: #ff7e5f;
  --secondary-dark: #e05a45;
  --secondary-light: #ffb5a5;
  --accent: #0cce6b;
  --accent-dark: #06a352;
  --accent-light: #5fe0a7;
  
  /* Text colors - Dark theme */
  --text-primary: #f7f8fc;
  --text-secondary: #c4c7df;
  --text-tertiary: #9397b7;
  --text-light: #f7f8fc;
  
  /* Background colors - Dark theme */
  --bg-primary: #0c101e;
  --bg-secondary: #151b30;
  --bg-tertiary: #1c2442;
  --bg-card: #212845;
  --bg-card-hover: #2a3254;
  
  /* Effects - Dark theme */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.2);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.24);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.3);
  --shadow-xl: 0 12px 32px rgba(0, 0, 0, 0.36);
}

/* Global Reset */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  height: 100%;
  width: 100%;
  scroll-padding-top: var(--header-height);
}

body {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--text-primary);
  background-color: var(--bg-primary);
  line-height: 1.5;
  overflow-x: hidden;
  min-height: 100%;
  transition: background-color var(--transition-normal), color var(--transition-normal);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

h1 {
  font-size: 3.5rem;
}

h2 {
  font-size: 2.5rem;
}

h3 {
  font-size: 2rem;
}

h4 {
  font-size: 1.5rem;
}

h5 {
  font-size: 1.25rem;
}

h6 {
  font-size: 1rem;
}

p {
  margin-bottom: 1.5rem;
  line-height: 1.7;
}

a {
  color: var(--primary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

a:hover {
  color: var(--primary-light);
}

img, svg {
  max-width: 100%;
  height: auto;
}

ul, ol {
  list-style-position: inside;
  margin-bottom: 1.5rem;
}

code, pre {
  font-family: var(--font-mono);
  background-color: var(--bg-secondary);
  border-radius: var(--border-radius-sm);
}

pre {
  padding: 1rem;
  margin-bottom: 1.5rem;
  overflow-x: auto;
}

code {
  padding: 0.2rem 0.4rem;
}

button, input, textarea, select {
  font-family: inherit;
  font-size: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

/* ---------------------------------------------
   2. LAYOUT & CONTAINERS
---------------------------------------------- */
.container {
  width: 100%;
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.section {
  padding: 6rem 0;
  position: relative;
}

/* Custom cursor */
.custom-cursor {
  position: fixed;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid var(--primary);
  pointer-events: none;
  z-index: var(--z-overlay);
  opacity: 0;
  mix-blend-mode: exclusion;
  transition: transform var(--transition-fast), width var(--transition-fast), height var(--transition-fast), opacity var(--transition-fast);
}

.custom-cursor-dot {
  position: fixed;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--primary);
  pointer-events: none;
  z-index: var(--z-overlay);
  opacity: 0;
  transition: transform var(--transition-fast), opacity var(--transition-fast);
}

/* App container */
.app-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: all var(--transition-normal);
  overflow: hidden;
}

/* Background elements */
.bg-gradient {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at top left, rgba(110, 120, 255, 0.05) 0%, transparent 60%),
              radial-gradient(ellipse at bottom right, rgba(255, 126, 95, 0.05) 0%, transparent 60%);
  z-index: var(--z-below);
  opacity: 0.7;
  pointer-events: none;
  transition: opacity var(--transition-normal);
}

.bg-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to bottom, rgba(12, 16, 30, 0.4) 0%, rgba(12, 16, 30, 0) 100%);
  z-index: var(--z-below);
  pointer-events: none;
  opacity: 0.2;
}

.bg-particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: var(--z-below);
  pointer-events: none;
}

.bg-noise {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAUVBMVEWFhYWDg4N3d3dtbW17e3t1dXWBgYGHh4d5eXlzc3OLi4ubm5uVlZWPj4+NjY19fX2JiYl/f39ra2uRkZGZmZlpaWmXl5dvb29xcXGTk5NnZ2c8TV1mAAAAG3RSTlNAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAvEOwtAAAFVklEQVR4XpWWB67c2BUFb3g557T/hRo9/WUMZHlgr4Bg8Z4qQgQJlHI4A8SzFVrapvmTF9O7dmYRFZ60YiBhJRCgh1FYhiLAmdvX0CzTOpNE77ME0Zty/nWWzchDtiqrmQDeuv3powQ5ta2eN0FY0InkqDD73lT9c9lEzwUNqgFHs9VQce3TVClFCQrSTfOiYkVJQBmpbq2L6iZavPnAPcoU0dSw0SUTqz/GtrGuXfbyyBniKykOWQWGqwwMA7QiYAxi+IlPdqo+hYHnUt5ZPfnsHJyNiDtnpJyayNBkF6cWoYGAMY92U2hXHF/C1M8uP/ZtYdiuj26UdAdQQSXQErwSOMzt/XWRWAz5GuSBIkwG1H3FabJ2OsUOUhGC6tK4EMtJO0ttC6IBD3kM0ve0tJwMdSfjZo+EEISaeTr9P3wYrGjXqyC1krcKdhMpxEnt5JetoulscpyzhXN5FRpuPHvbeQaKxFAEB6EN+cYN6xD7RYGpXpNndMmZgM5Dcs3YSNFDHUo2LGfZuukSWyUYirJAdYbF3MfqEKmjM+I2EfhA94iG3L7uKrR+GdWD73ydlIB+6hgref1QTlmgmbM3/LeX5GI1Ux1RWpgxpLuZ2+I+IjzZ8wqE4nilvQdkUdfhzI5QDWy+kw5Wgg2pGpeEVeCCA7b85BO3F9DzxB3cdqvBzWcmzbyMiqhzuYqtHRVG2y4x+KOlnyqla8AoWWpuBoYRxzXrfKuILl6SfiWCbjxoZJUaCBj1CjH7GIaDbc9kqBY3W/Rgjda1iqQcOJu2WW+76pZC9QG7M00dffe9hNnseupFL53r8F7YHSwJWUKP2q+k7RdsxyOB11n0xtOvnW4irMMFNV4H0uqwS5ExsmP9AxbDTc9JwgneAT5vTiUSm1E7BSflSt3bfa1tv8Di3R8n3Af7MNWzs49hmauE2wP+ttrq+AsWpFG2awvsuOqbipWHgtuvuaAE+A1Z/7gC9hesnr+7wqCwG8c5yAg3AL1fm8T9AZtp/bbJGwl1pNrE7RuOX7PeMRUERVaPpEs+yqeoSmuOlokqw49pgomjLeh7icHNlG19yjs6XXOMedYm5xH2YxpV2tc0Ro2jJfxC50ApuxGob7lMsxfTbeUv07TyYxpeLucEH1gNd4IKH2LAg5TdVhlCafZvpskfncCfx8pOhJzd76bJWeYFnFciwcYfubRc12Ip/ppIhA1/mSZ/RxjFDrJC5xifFjJpY2Xl5zXdguFqYyTR1zSp1Y9p+tktDYYSNflcxI0iyO4TPBdlRcpeqjK/piF5bklq77VSEaA+z8qmJTFzIWiitbnzR794USKBUaT0NTEsVjZqLaFVqJoPN9ODG70IPbfBHKK+/q/AWR0tJzYHRULOa4MP+W/HfGadZUbfw177G7j/OGbIs8TahLyynl4X4RinF793Oz+BU0saXtUHrVBFT/DnA3ctNPoGbs4hRIjTok8i+algT1lTHi4SxFvONKNrgQFAq2/gFnWMXgwffgYMJpiKYkmW3tTg3ZQ9Jq+f8XN+A5eeUKHWvJWJ2sgJ1Sop+wwhqFVijqWaJhwtD8MNlSBeWNNWTa5Z5kPZw5+LbVT99wqTdx29lMUH4OIG/D86ruKEauBjvH5xy6um/Sfj7ei6UUVk4AIl3MyD4MSSTOFgSwsH/QJWaQ5as7ZcmgBZkzjjU1UrQ74ci1gWBCSGHtuV1H2mhSnO3Wp/3fEV5a+4wz//6qy8JxjZsmxxy5+4w9CDNJY09T072iKG0EnOS0arEYgXqYnXcYHwjTtUNAcMelOd4xpkoqiTYICWFq0JSiPfPDQdnt+4/wuqcXY47QILbgAAAABJRU5ErkJggg==');
  z-index: var(--z-below);
  pointer-events: none;
  opacity: 0.03;
  animation: noise 8s steps(10) infinite;
}

/* ---------------------------------------------
   3. HEADER & NAVIGATION
---------------------------------------------- */
.main-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  background-color: rgba(var(--bg-primary-rgb), 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: var(--z-header);
  transition: all var(--transition-normal);
  border-bottom: 1px solid rgba(var(--text-primary-rgb), 0.08);
}

.main-header.scrolled {
  height: var(--header-height-scrolled);
  box-shadow: var(--shadow-md);
}

.header-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo styling */
.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: transform var(--transition-bounce);
}

.logo:hover {
  transform: translateY(-2px);
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.logo .first-name {
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-secondary);
  letter-spacing: 0.5px;
}

.logo .last-name {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.5px;
}

/* Navigation styling */
.main-nav {
  height: 100%;
  display: flex;
  align-items: center;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
  height: 100%;
}

.nav-links li {
  list-style: none;
  height: 100%;
  position: relative;
}

.nav-links a {
  height: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-weight: 500;
  position: relative;
  padding: 0 0.25rem;
  transition: color var(--transition-fast);
}

.nav-links a:hover,
.nav-links a.active {
  color: var(--text-primary);
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--primary);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform var(--transition-normal);
}

.nav-links a:hover::after,
.nav-links a.active::after {
  transform: scaleX(1);
  transform-origin: left;
}

.nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Header actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.theme-toggle {
  background: none;
  border: none;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--border-radius-full);
  background-color: var(--bg-secondary);
  transition: all var(--transition-normal);
}

.theme-toggle:hover {
  background-color: var(--bg-tertiary);
  transform: translateY(-2px);
}

.social-icons {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.social-icons a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--border-radius-full);
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  transition: all var(--transition-normal);
}

.social-icons a:hover {
  background-color: var(--bg-tertiary);
  color: var(--primary);
  transform: translateY(-2px);
}

/* Mobile menu toggle */
.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  width: 40px;
  height: 40px;
  position: relative;
  cursor: pointer;
  z-index: var(--z-elevated);
}

.mobile-menu-toggle span {
  display: block;
  width: 24px;
  height: 2px;
  background-color: var(--text-primary);
  position: absolute;
  left: 8px;
  transition: all var(--transition-normal);
}

.mobile-menu-toggle span:nth-child(1) {
  top: 14px;
}

.mobile-menu-toggle span:nth-child(2) {
  top: 22px;
}

.mobile-menu-toggle span:nth-child(3) {
  top: 30px;
}

.menu-open .mobile-menu-toggle span:nth-child(1) {
  transform: rotate(45deg);
  top: 22px;
}

.menu-open .mobile-menu-toggle span:nth-child(2) {
  opacity: 0;
}

.menu-open .mobile-menu-toggle span:nth-child(3) {
  transform: rotate(-45deg);
  top: 22px;
}

/* Mobile menu styles */
.main-nav .nav-links.show {
  transform: translateX(0);
  opacity: 1;
  visibility: visible;
}

/* Back to top button */
.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  border-radius: var(--border-radius-full);
  background-color: var(--primary);
  color: var(--text-light);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: var(--z-elevated);
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px);
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-md);
}

.back-to-top.visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.back-to-top:hover {
  background-color: var(--primary-dark);
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

/* ---------------------------------------------
   4. BUTTONS & FORM ELEMENTS
---------------------------------------------- */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius-full);
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: all var(--transition-normal);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.btn-primary {
  background-color: var(--primary);
  color: var(--text-light);
  box-shadow: 0 4px 16px rgba(var(--primary-rgb), 0.3);
}

.btn-primary:hover {
  background-color: var(--primary-dark);
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(var(--primary-rgb), 0.4);
}

.btn-outline {
  background-color: transparent;
  color: var(--text-primary);
  border: 2px solid var(--bg-tertiary);
}

.btn-outline:hover {
  border-color: var(--primary);
  color: var(--primary);
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.1);
}

.btn svg {
  transition: transform var(--transition-normal);
}

.btn:hover svg {
  transform: translateX(4px);
}

.btn-loading {
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  animation: spin 1s infinite linear;
  width: 20px;
  height: 20px;
}

.spinner-path {
  stroke: currentColor;
  stroke-linecap: round;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Form styles */
.form-group {
  margin-bottom: 1.5rem;
  position: relative;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.input-wrapper {
  position: relative;
}

.input-wrapper input,
.input-wrapper textarea {
  width: 100%;
  padding: 1rem;
  border: 1px solid var(--bg-tertiary);
  border-radius: var(--border-radius-md);
  background-color: var(--bg-card);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all var(--transition-normal);
  position: relative;
  z-index: 1;
}

.input-wrapper textarea {
  resize: vertical;
  min-height: 100px;
}

.input-wrapper input:focus,
.input-wrapper textarea:focus,
.input-wrapper input.filled,
.input-wrapper textarea.filled {
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(var(--primary-rgb), 0.1);
  outline: none;
}

.input-focus-border {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: var(--primary);
  transition: all var(--transition-normal);
  z-index: 2;
}

.input-wrapper input:focus ~ .input-focus-border,
.input-wrapper textarea:focus ~ .input-focus-border {
  width: 100%;
  left: 0;
}

.form-submit {
  display: flex;
  justify-content: flex-start;
}

.submit-btn {
  min-width: 150px;
}

.form-success {
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: var(--border-radius-md);
  background-color: rgba(var(--success-rgb), 0.1);
  color: var(--success);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 500;
}

/* ---------------------------------------------
   5. HOME SECTION
---------------------------------------------- */
.home-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 7rem;
}

.home-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
}

.home-text {
  flex: 1;
  max-width: 600px;
}

.badge-container {
  margin-bottom: 2rem;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: rgba(var(--success-rgb), 0.1);
  color: var(--success);
  border-radius: var(--border-radius-full);
  font-size: 0.875rem;
  font-weight: 500;
}

.pulse-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--success);
  position: relative;
}

.pulse-dot::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: var(--success);
  animation: pulse 1.5s infinite ease-out;
  z-index: -1;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  70% {
    transform: scale(2.5);
    opacity: 0;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
}

.main-heading {
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.main-heading .greeting {
  display: block;
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.main-heading .name {
  display: block;
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--text-primary) 0%, var(--text-tertiary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}

.main-heading .name .highlight {
  color: var(--primary);
  -webkit-text-fill-color: var(--primary);
}

.main-heading .role {
  display: block;
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.intro-text {
  color: var(--text-secondary);
  font-size: 1.125rem;
  margin-bottom: 2rem;
  max-width: 540px;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.tech-stack {
  margin-top: 3rem;
}

.tech-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-tertiary);
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.tech-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tech-pill {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--bg-card);
  border-radius: var(--border-radius-full);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: all var(--transition-normal);
  border: 1px solid var(--bg-tertiary);
}

.tech-pill:hover {
  background-color: var(--bg-card-hover);
  transform: translateY(-3px);
  box-shadow: var(--shadow-sm);
}

.tech-pill .tech-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Technology-specific colors */
.tech-pill.vue {
  color: #42b883;
  border-color: rgba(66, 184, 131, 0.3);
}

.tech-pill.csharp {
  color: #652076;
  border-color: rgba(101, 32, 118, 0.3);
}

.tech-pill.python {
  color: #366994;
  border-color: rgba(54, 105, 148, 0.3);
}

.tech-pill.javascript {
  color: #f7df1e;
  border-color: rgba(247, 223, 30, 0.3);
}

.tech-pill.nodejs {
  color: #83cd29;
  border-color: rgba(131, 205, 41, 0.3);
}

/* Home visual section */
.home-visual {
  flex: 1;
  max-width: 600px;
  position: relative;
}

.code-editor {
  width: 100%;
  height: 400px;
  background-color: var(--bg-card);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
  position: relative;
  z-index: 2;
}

.editor-header {
  height: 40px;
  background-color: var(--bg-tertiary);
  display: flex;
  align-items: center;
  padding: 0 1rem;
}

.editor-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.editor-button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.editor-button.close {
  background-color: #ff5f57;
}

.editor-button.minimize {
  background-color: #febc2e;
}

.editor-button.maximize {
  background-color: #28c840;
}

.editor-title {
  margin-left: 1rem;
  font-family: var(--font-mono);
  font-size: 0.875rem;
  color: var(--text-tertiary);
}

.editor-body {
  display: flex;
  height: calc(100% - 40px);
}

.line-numbers {
  width: 50px;
  background-color: var(--bg-tertiary);
  padding: 1rem 0;
  text-align: right;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-tertiary);
  user-select: none;
}

.line-number {
  padding: 0 1rem 0 0;
  line-height: 1.6;
}

.code-content {
  flex: 1;
  padding: 1rem;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  line-height: 1.6;
  color: var(--text-primary);
  overflow-x: auto;
}

/* Code syntax highlighting */
.keyword {
  color: #569cd6;
}

.string {
  color: #ce9178;
}

.comment {
  color: #6a9955;
  font-style: italic;
}

.class-name {
  color: #4ec9b0;
}

/* Floating cards */
.floating-cards {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  pointer-events: none;
}

.floating-card {
  position: absolute;
  padding: 1rem;
  border-radius: var(--border-radius-md);
  background-color: var(--bg-card);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: var(--shadow-lg);
  animation: float 8s infinite ease-in-out;
}

.floating-card.vue-card {
  top: -50px;
  right: -30px;
  animation-delay: 0s;
}

.floating-card.csharp-card {
  bottom: 60px;
  left: -70px;
  animation-delay: 2s;
}

.floating-card.python-card {
  bottom: -30px;
  right: 30px;
  animation-delay: 4s;
}

.floating-card .card-text {
  font-weight: 600;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Scroll indicator */
.scroll-indicator {
  position: absolute;
  bottom: 4rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  opacity: 0.7;
  transition: all var(--transition-normal);
}

.scroll-indicator:hover {
  opacity: 1;
  transform: translate(-50%, -5px);
}

.mouse {
  width: 30px;
  height: 50px;
  border: 2px solid var(--text-secondary);
  border-radius: 20px;
  position: relative;
}

.mouse-wheel {
  width: 4px;
  height: 8px;
  background-color: var(--text-secondary);
  border-radius: 2px;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  animation: scroll 1.5s infinite;
}

@keyframes scroll {
  0% {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-50%) translateY(20px);
    opacity: 0;
  }
}

.scroll-text {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.txt-rotate {
  position: relative;
  display: inline-block;
  min-height: 1.75em;
}

.txt-rotate > .wrap {
  border-right: 0.08em solid var(--primary);
  padding-right: 0.1em;
  animation: blink 0.8s step-end infinite;
}

@keyframes blink {
  from, to {
    border-color: transparent;
  }
  50% {
    border-color: var(--primary);
  }
}

/* ---------------------------------------------
   6. SECTION STYLING
---------------------------------------------- */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
  position: relative;
  display: inline-block;
}

.section-subtitle {
  font-size: 1.125rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.title-separator {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  margin: 0 auto;
  border-radius: var(--border-radius-full);
  position: relative;
}

.title-separator::before {
  content: '';
  position: absolute;
  top: -3px;
  left: 0;
  width: 100%;
  height: 10px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  opacity: 0.3;
  filter: blur(8px);
  border-radius: var(--border-radius-full);
}

/* About section styles */
.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 5rem;
}

.about-image {
  position: relative;
}

.image-container {
  position: relative;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
}

.profile-image {
  width: 100%;
  height: auto;
  display: block;
  transform: scale(1.01);
  transition: all var(--transition-normal);
}

.image-container:hover .profile-image {
  transform: scale(1.05);
}

.image-frame {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid var(--primary);
  border-radius: var(--border-radius-lg);
  transform: translate(20px, 20px);
  z-index: -1;
}

.experience-badge {
  position: absolute;
  bottom: -20px;
  right: 20px;
  background-color: var(--primary);
  color: var(--text-light);
  padding: 1rem;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
}

.experience-years {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
}

.experience-text {
  font-size: 0.875rem;
  opacity: 0.8;
}

.about-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 2.5rem;
}

.stat-item {
  text-align: center;
  padding: 1.5rem;
  background-color: var(--bg-card);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
}

.stat-item:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-lg);
  background-color: var(--bg-card-hover);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.about-text .about-bio {
  margin-bottom: 2.5rem;
}

.about-text .about-bio p {
  margin-bottom: 1.25rem;
}

.about-text .about-bio p:last-child {
  margin-bottom: 0;
}

.about-text .highlight {
  color: var(--primary);
  font-weight: 600;
}

/* Skills tabs */
.skills-container h3 {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.skills-tabs {
  margin-bottom: 2.5rem;
}

.tabs-header {
  display: flex;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid var(--bg-tertiary);
}

.tab-item {
  padding: 0.75rem 1.5rem;
  position: relative;
  cursor: pointer;
  font-weight: 500;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all var(--transition-normal);
}

.tab-item:hover {
  color: var(--text-primary);
}

.tab-item.active {
  color: var(--primary);
}

.tab-item::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--primary);
  transform: scaleX(0);
  transition: transform var(--transition-normal);
}

.tab-item.active::after {
  transform: scaleX(1);
}

.tab-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.tabs-content {
  position: relative;
}

.tab-content {
  display: none;
  animation: fadeIn 0.5s ease forwards;
}

.tab-content.active {
  display: block;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.skill-item {
  margin-bottom: 1.5rem;
}

.skill-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.skill-name {
  font-weight: 500;
}

.skill-level {
  color: var(--primary);
  font-weight: 600;
}

.skill-bar {
  height: 8px;
  background-color: var(--bg-tertiary);
  border-radius: var(--border-radius-full);
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--primary-light));
  border-radius: var(--border-radius-full);
  width: 0;
  transition: width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.about-cta {
  margin-top: 2.5rem;
}

/* Timeline styling */
.experience-education {
  margin-top: 5rem;
}

.timeline-container {
  position: relative;
}

.timeline-header {
  margin-bottom: 3rem;
  text-align: center;
}

.timeline-title {
  font-size: 1.75rem;
  color: var(--text-primary);
  margin-bottom: 0;
}

.timeline {
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 2px;
  height: 100%;
  background-color: var(--bg-tertiary);
  transform: translateX(-50%);
}

.timeline-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.timeline-item {
  position: relative;
  width: 50%;
  padding-right: 3rem;
}

.timeline-item.right {
  align-self: flex-end;
  padding-right: 0;
  padding-left: 3rem;
}

.timeline-badge {
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: var(--bg-card);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  right: -25px;
  top: 0;
  border: 2px solid var(--bg-tertiary);
  z-index: 1;
  box-shadow: var(--shadow-md);
}

.timeline-item.right .timeline-badge {
  right: auto;
  left: -25px;
}

.timeline-badge.work {
  color: var(--primary);
  background-color: rgba(var(--primary-rgb), 0.1);
  border-color: var(--primary);
}

.timeline-badge.education {
  color: var(--secondary);
  background-color: rgba(var(--secondary-rgb), 0.1);
  border-color: var(--secondary);
}

.badge-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.timeline-panel {
  background-color: var(--bg-card);
  border-radius: var(--border-radius-md);
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
}

.timeline-panel:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.timeline-heading {
  margin-bottom: 1rem;
}

.timeline-date {
  font-size: 0.875rem;
  color: var(--text-tertiary);
  margin-bottom: 0.5rem;
  display: block;
}

.timeline-heading .timeline-title {
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
  text-align: left;
}

.timeline-company {
  color: var(--primary);
  font-weight: 500;
}

.timeline-body p {
  margin-bottom: 1rem;
  color: var(--text-secondary);
}

.timeline-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.timeline-tag {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  background-color: var(--bg-tertiary);
  color: var(--text-secondary);
  border-radius: var(--border-radius-sm);
  font-weight: 500;
}

/* ---------------------------------------------
   7. PORTFOLIO SECTION
---------------------------------------------- */
.portfolio-description {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
}

.portfolio-filters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
}

.filter-button {
  padding: 0.5rem 1.25rem;
  background-color: var(--bg-card);
  border: none;
  border-radius: var(--border-radius-full);
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-normal);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-button:hover, 
.filter-button.active {
  background-color: var(--primary);
  color: var(--text-light);
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.3);
}

.filter-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.portfolio-grid {
  opacity: 1 !important;
  transform: translateY(0) !important;
  visibility: visible !important;
  transition: none !important;
}

.portfolio-item {
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  background-color: var(--bg-card);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
  opacity: 1 !important;
  cursor: pointer;
}

.portfolio-item:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-xl);
}

.portfolio-wrapper {
  position: relative;
}

.portfolio-image {
  position: relative;
  overflow: hidden;
}

.portfolio-image img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  transition: transform var(--transition-normal);
}

.portfolio-item:hover .portfolio-image img {
  transform: scale(1.05);
}

.portfolio-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7));
  opacity: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
  transition: all var(--transition-normal);
}

.portfolio-item:hover .portfolio-overlay {
  opacity: 1;
}

.portfolio-category {
  align-self: flex-start;
  padding: 0.25rem 0.75rem;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.portfolio-buttons {
  display: flex;
  gap: 0.5rem;
}

.portfolio-buttons button,
.portfolio-buttons a {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.portfolio-buttons button:hover,
.portfolio-buttons a:hover {
  background-color: var(--primary);
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.portfolio-info {
  padding: 1.5rem;
}

.portfolio-title {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.portfolio-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  background-color: var(--bg-tertiary);
  color: var(--text-tertiary);
  border-radius: var(--border-radius-full);
}

.tech-more {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  background-color: var(--bg-secondary);
  color: var(--text-tertiary);
  border-radius: var(--border-radius-full);
  font-weight: 600;
}

/* Project modal */
.project-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  z-index: var(--z-modal);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  opacity: 0;
  animation: fadeIn 0.3s forwards;
}

.modal-wrapper {
  background-color: var(--bg-card);
  border-radius: var(--border-radius-lg);
  width: 100%;
  max-width: 1000px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: var(--shadow-xl);
  opacity: 0;
  transform: translateY(20px);
  animation: modalEnter 0.5s 0.1s forwards;
}

@keyframes modalEnter {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-normal);
  z-index: 1;
}

.modal-close:hover {
  background-color: var(--error);
  color: var(--text-light);
  transform: rotate(90deg);
}

.modal-content {
  padding: 2.5rem;
}

.modal-header {
  margin-bottom: 2rem;
  padding-right: 2.5rem;
}

.modal-title {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.modal-category {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: rgba(var(--primary-rgb), 0.1);
  color: var(--primary);
  border-radius: var(--border-radius-full);
  font-size: 0.875rem;
  font-weight: 500;
}

.modal-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
}

.modal-image img {
  width: 100%;
  height: auto;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
}

.modal-details h4 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.modal-description {
  margin-bottom: 2rem;
}

.modal-features {
  margin-bottom: 2rem;
}

.modal-features ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.modal-features li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
  color: var(--text-secondary);
}

.modal-features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--accent);
  font-weight: bold;
}

.modal-tech {
  margin-bottom: 2.5rem;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tech-badge {
  padding: 0.5rem 1rem;
  background-color: var(--bg-tertiary);
  color: var(--text-secondary);
  border-radius: var(--border-radius-full);
  font-size: 0.875rem;
  font-weight: 500;
  transition: all var(--transition-normal);
}

.tech-badge:hover {
  background-color: var(--primary);
  color: var(--text-light);
  transform: translateY(-3px);
}

.modal-buttons {
  display: flex;
  gap: 1rem;
}

/* ---------------------------------------------
   8. CONTACT SECTION
---------------------------------------------- */
.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}

.contact-info h3 {
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
}

.contact-info p {
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
}

.contact-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.contact-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--border-radius-md);
  background-color: var(--bg-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  flex-shrink: 0;
}

.contact-text h4 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.contact-text a {
  color: var(--text-secondary);
  transition: color var(--transition-normal);
}

.contact-text a:hover {
  color: var(--primary);
}

.contact-social h4 {
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.social-links {
  display: flex;
  gap: 0.75rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--bg-tertiary);
  border-radius: var(--border-radius-md);
  color: var(--text-secondary);
  transition: all var(--transition-normal);
}

.social-link:hover {
  background-color: var(--primary);
  color: var(--text-light);
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.3);
}

/* ---------------------------------------------
   9. FOOTER 
---------------------------------------------- */
.main-footer {
  background-color: var(--bg-tertiary);
  padding: 5rem 0 2rem;
  margin-top: 5rem;
  position: relative;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
}

.footer-links {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.footer-link {
  color: var(--text-secondary);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.footer-link:hover {
  color: var(--primary);
  transform: translateY(-3px);
}

.footer-socials {
  display: flex;
  gap: 1rem;
}

.footer-socials a {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-normal);
}

.footer-socials a:hover {
  background-color: var(--primary);
  color: var(--text-light);
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.3);
}

.footer-bottom {
  margin-top: 2.5rem;
  text-align: center;
}

.copyright {
  color: var(--text-tertiary);
  font-size: 0.875rem;
}

/* ---------------------------------------------
   10. ANIMATIONS
---------------------------------------------- */
@keyframes noise {
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-1%, -1%); }
  20% { transform: translate(-2%, 2%); }
  30% { transform: translate(1%, -1%); }
  40% { transform: translate(1%, 1%); }
  50% { transform: translate(-2%, -2%); }
  60% { transform: translate(2%, -1%); }
  70% { transform: translate(1%, 3%); }
  80% { transform: translate(-1%, 2%); }
  90% { transform: translate(2%, -2%); }
}

/* AOS animations (Animate On Scroll) */
[data-aos] {
  opacity: 0;
  transition: all 0.8s ease;
}

[data-aos].aos-animate {
  opacity: 1;
}

[data-aos="fade-up"] {
  transform: translateY(50px);
}

[data-aos="fade-up"].aos-animate {
  transform: translateY(0);
}

[data-aos="fade-right"] {
  transform: translateX(-50px);
}

[data-aos="fade-right"].aos-animate {
  transform: translateX(0);
}

[data-aos="fade-left"] {
  transform: translateX(50px);
}

[data-aos="fade-left"].aos-animate {
  transform: translateX(0);
}

/* Project transitions */
.project-transition-enter-active, 
.project-transition-leave-active {
  transition: all 0.5s;
}

.project-transition-enter-from, 
.project-transition-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/* Custom alerts */
.custom-alert {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem 1.5rem;
  border-radius: var(--border-radius-md);
  background-color: var(--bg-card);
  color: var(--text-primary);
  box-shadow: var(--shadow-xl);
  z-index: var(--z-tooltip);
  display: flex;
  align-items: center;
  gap: 1rem;
  transform: translateY(20px);
  opacity: 0;
  transition: all var(--transition-normal);
}

.custom-alert.show {
  transform: translateY(0);
  opacity: 1;
}

.custom-alert.info {
  border-left: 4px solid var(--info);
}

.custom-alert.success {
  border-left: 4px solid var(--success);
}

.custom-alert.warning {
  border-left: 4px solid var(--warning);
}

.custom-alert.error {
  border-left: 4px solid var(--error);
}

.close-alert {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: var(--text-tertiary);
  cursor: pointer;
  transition: color var(--transition-fast);
}

.close-alert:hover {
  color: var(--text-primary);
}

/* ---------------------------------------------
   11. RESPONSIVE STYLES
---------------------------------------------- */
@media (max-width: 1200px) {
  .container {
    padding: 0 2rem;
  }
  
  .home-content {
    gap: 2rem;
  }
  
  .section {
    padding: 5rem 0;
  }
}

@media (max-width: 992px) {
  :root {
    --header-height: 4.5rem;
    --header-height-scrolled: 4rem;
  }
  
  .container {
    padding: 0 1.5rem;
  }
  
  h1 {
    font-size: 3rem;
  }
  
  h2 {
    font-size: 2.25rem;
  }
  
  .main-heading .name {
    font-size: 3rem;
  }
  
  .main-heading .role {
    font-size: 1.5rem;
  }
  
  .home-content {
    flex-direction: column;
    text-align: center;
  }
  
  .home-text {
    max-width: 100%;
  }
  
  .cta-buttons {
    justify-content: center;
  }
  
  .tech-pills {
    justify-content: center;
  }
  
  .main-nav .nav-links {
    position: fixed;
    top: var(--header-height);
    right: 0;
    width: 250px;
    height: calc(100vh - var(--header-height));
    background-color: var(--bg-secondary);
    flex-direction: column;
    padding: 2rem;
    z-index: var(--z-elevated);
    transform: translateX(100%);
    opacity: 0;
    visibility: hidden;
    transition: all var(--transition-normal);
    box-shadow: var(--shadow-xl);
    gap: 1.5rem;
  }
  
  .main-nav .nav-links li {
    width: 100%;
    height: auto;
  }
  
  .main-nav .nav-links a {
    width: 100%;
    padding: 0.75rem 0;
    height: auto;
  }
  
  .mobile-menu-toggle {
    display: block;
  }
  
  .about-content,
  .contact-content,
  .modal-body {
    grid-template-columns: 1fr;
  }
  
  .contact-info {
    order: 2;
  }
  
  .portfolio-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
  
  .timeline::before {
    left: 0;
  }
  
  .timeline-item {
    width: 100%;
    padding-left: 3rem;
    padding-right: 0;
  }
  
  .timeline-item.right {
    padding-left: 3rem;
  }
  
  .timeline-badge {
    left: -25px;
    right: auto;
  }
  
  .timeline-item.right .timeline-badge {
    left: -25px;
  }
}

@media (max-width: 768px) {
  :root {
    --header-height: 4rem;
    --header-height-scrolled: 3.5rem;
  }
  
  .container {
    padding: 0 1rem;
  }
  
  h1 {
    font-size: 2.5rem;
  }
  
  h2 {
    font-size: 2rem;
  }
  
  .section {
    padding: 4rem 0;
  }
  
  .main-heading .name {
    font-size: 2.5rem;
  }
  
  .main-heading .role {
    font-size: 1.25rem;
  }
  
  .code-editor {
    height: 350px;
  }
  
  .about-stats {
    grid-template-columns: 1fr;
  }
  
  .skills-grid {
    grid-template-columns: 1fr;
  }
  
  .portfolio-grid {
    grid-template-columns: 1fr;
  }
  
  .cta-buttons {
    flex-direction: column;
    width: 100%;
  }
  
  .cta-buttons .btn {
    width: 100%;
  }
  
  .modal-wrapper {
    padding: 1.5rem;
  }
  
  .tabs-header {
    flex-wrap: wrap;
  }
  
  .tab-item {
    padding: 0.75rem 1rem;
  }
  
  .header-container {
    padding: 0 1rem;
  }
  
  .back-to-top {
    right: 1rem;
    bottom: 1rem;
  }
}

@media (max-width: 576px) {
  html {
    font-size: 14px;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .portfolio-filters {
    flex-direction: column;
    align-items: center;
  }
  
  .filter-button {
    width: 100%;
    justify-content: center;
  }
  
  .main-header {
    box-shadow: var(--shadow-md);
  }
  
  .logo .first-name {
    display: none;
  }
  
  .social-icons {
    display: none;
  }
  
  .modal-content {
    padding: 1.5rem;
  }
  
  .modal-buttons {
    flex-direction: column;
  }
  
  .modal-buttons .btn {
    width: 100%;
    justify-content: center;
  }
  
  .main-footer {
    padding: 3rem 0 1.5rem;
  }
  
  .footer-links {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
}

/* Dark/Light theme specific overrides */
.light {
  --bg-primary-rgb: 247, 248, 252;
  --primary-rgb: 110, 120, 255;
  --secondary-rgb: 255, 126, 95;
  --success-rgb: 12, 206, 107;
  --warning-rgb: 255, 197, 85;
  --error-rgb: 255, 82, 82;
  --info-rgb: 12, 192, 222;
}

.dark {
  --bg-primary-rgb: 12, 16, 30;
  --primary-rgb: 110, 120, 255;
  --secondary-rgb: 255, 126, 95;
  --success-rgb: 12, 206, 107;
  --warning-rgb: 255, 197, 85;
  --error-rgb: 255, 82, 82;
  --info-rgb: 12, 192, 222;
}

/* Print styles */
@media print {
  .main-header,
  .main-footer,
  .back-to-top,
  .project-modal,
  .custom-alert {
    display: none !important;
  }
  
  body {
    background-color: white !important;
    color: black !important;
  }
  
  .container {
    max-width: 100% !important;
    width: 100% !important;
  }
  
  .section {
    padding: 2rem 0 !important;
    page-break-inside: avoid;
  }
  
  a {
    text-decoration: underline;
    color: #000 !important;
  }
  
  .btn {
    border: 1px solid #000;
    color: #000 !important;
    background-color: transparent !important;
  }
}
</style>