<template>
  <div class="portfolio-view" @mousemove="handleGlobalMouseMove">
    <!-- Particle system background (reused from HomeView) -->
    <div class="particles-container">
      <canvas ref="particleCanvas" class="particle-canvas"></canvas>
    </div>
    
    <!-- Main content -->
    <div class="content-container">
      <section class="portfolio-hero">
        <div class="section-heading">
          <div class="heading-container" ref="headingElement">
            <div class="heading-background"></div>
            <div class="glitch-container">
              <h1 class="glitch-text" data-text="PORTFOLIO">PORTFOLIO</h1>
              <div class="glitch-noise"></div>
            </div>
            <div class="heading-underline">
              <div class="underline-pulse"></div>
            </div>
          </div>
          
          <p class="section-description">
            <span class="typing-text" ref="typingElement">{{ typewriterText }}</span><span class="typing-cursor" :class="{ 'blink': cursorBlinking }">|</span>
          </p>
        </div>
        
        <!-- Portfolio categories/filters -->
        <div class="portfolio-filters">
          <button 
            class="filter-button" 
            :class="{ active: activeCategory === 'all' }"
            @click="setActiveCategory('all')">
            <span class="button-glow"></span>
            <span class="button-text">All</span>
          </button>
          <button 
            v-for="category in categories" 
            :key="category.id" 
            class="filter-button"
            :class="[{ active: activeCategory === category.id }, category.id]"
            @click="setActiveCategory(category.id)">
            <span class="button-glow"></span>
            <span class="button-icon" v-html="getCategoryIcon(category.id)"></span>
            <span class="button-text">{{ category.name }}</span>
          </button>
        </div>
      </section>
      
      <!-- Portfolio projects grid -->
      <section class="portfolio-grid">
        <transition-group name="project-transition">
          <div 
            v-for="project in filteredProjects" 
            :key="project.id"
            class="project-card"
            :class="{ 'expanded': expandedProject === project.id }"
            @click="toggleProject(project.id)"
            @mouseenter="handleProjectHover"
            @mouseleave="handleProjectLeave"
            :style="getProjectCardStyle(project)">
            
            <div class="project-overlay"></div>
            
            <!-- Project card content -->
            <div class="project-header">
              <div class="project-category" :class="project.category">
                <span class="category-icon" v-html="getCategoryIcon(project.category)"></span>
                <span class="category-text">{{ getCategoryName(project.category) }}</span>
              </div>
              <div class="project-year">{{ project.year }}</div>
            </div>
            
            <div class="project-body">
              <h3 class="project-title">{{ project.title }}</h3>
              <div class="project-tech-stack">
                <span 
                  v-for="(tech, index) in project.technologies" 
                  :key="index" 
                  class="tech-pill"
                  :class="getTechClass(tech)">
                  {{ tech }}
                </span>
              </div>
            </div>
            
            <!-- Expanded project details -->
            <div class="project-details" v-show="expandedProject === project.id">
              <div class="details-container">
                <div class="details-header">
                  <div class="details-actions">
                    <button class="action-button code-button" @click.stop="openProjectCode(project)">
                      <span class="button-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <polyline points="16 18 22 12 16 6"></polyline>
                          <polyline points="8 6 2 12 8 18"></polyline>
                        </svg>
                      </span>
                      <span>View Code</span>
                    </button>
                    <button class="action-button demo-button" v-if="project.demoUrl" @click.stop="openProjectDemo(project)">
                      <span class="button-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polygon points="10 8 16 12 10 16 10 8"></polygon>
                        </svg>
                      </span>
                      <span>Live Demo</span>
                    </button>
                  </div>
                  <button class="close-button" @click.stop="closeProject">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                
                <div class="details-content">
                  <div class="details-description">
                    <h4>Project Overview</h4>
                    <p>{{ project.description }}</p>
                    
                    <h4>Key Features</h4>
                    <ul class="feature-list">
                      <li v-for="(feature, index) in project.features" :key="index">
                        <span class="feature-bullet"></span>
                        {{ feature }}
                      </li>
                    </ul>
                  </div>
                  
                  <div class="details-preview">
                    <div class="code-preview" :class="project.category">
                      <div class="preview-header">
                        <div class="header-button"></div>
                        <div class="header-button"></div>
                        <div class="header-button"></div>
                        <div class="header-title">{{ project.previewFile }}</div>
                      </div>
                      <div class="preview-content">
                        <div class="line-numbers">
                          <div v-for="i in 10" :key="i">{{ i }}</div>
                        </div>
                        <pre class="code-content" v-html="project.codePreview"></pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Project card visual elements -->
            <div class="card-corner top-left"></div>
            <div class="card-corner top-right"></div>
            <div class="card-corner bottom-left"></div>
            <div class="card-corner bottom-right"></div>
            <div class="card-glow"></div>
          </div>
        </transition-group>
      </section>
    </div>
    
    <!-- Project Showcase Modal -->
    <div class="project-modal" v-if="showModal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ selectedProject.title }}</h3>
          <button class="modal-close" @click="closeModal">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <div class="project-showcase">
            <div class="showcase-preview">
              <!-- Dynamically render project preview based on type -->
              <div v-if="selectedProject.previewType === 'code'" class="code-showcase">
                <div class="code-editor-modal">
                  <div class="editor-header">
                    <div class="header-button"></div>
                    <div class="header-button"></div>
                    <div class="header-button"></div>
                    <div class="header-title">{{ selectedProject.previewFile }}</div>
                  </div>
                  <div class="editor-content">
                    <div class="line-numbers">
                      <div v-for="i in 30" :key="i">{{ i }}</div>
                    </div>
                    <pre class="code-content" v-html="selectedProject.codePreview"></pre>
                  </div>
                </div>
              </div>
              <div v-else-if="selectedProject.previewType === 'image'" class="image-showcase">
                <img :src="selectedProject.previewImage" :alt="selectedProject.title">
              </div>
            </div>
            <div class="showcase-details">
              <div class="showcase-section">
                <h4>Technologies</h4>
                <div class="showcase-tech-stack">
                  <span 
                    v-for="(tech, index) in selectedProject.technologies" 
                    :key="index" 
                    class="tech-pill large"
                    :class="getTechClass(tech)">
                    {{ tech }}
                  </span>
                </div>
              </div>
              
              <div class="showcase-section">
                <h4>Description</h4>
                <p>{{ selectedProject.description }}</p>
              </div>
              
              <div class="showcase-section">
                <h4>Key Features</h4>
                <ul class="feature-list">
                  <li v-for="(feature, index) in selectedProject.features" :key="index">
                    <span class="feature-bullet"></span>
                    {{ feature }}
                  </li>
                </ul>
              </div>
              
              <div class="showcase-actions">
                <button class="action-button code-button" @click="openProjectCode(selectedProject)">
                  <span class="button-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                  </span>
                  <span>View Code</span>
                </button>
                <button class="action-button demo-button" v-if="selectedProject.demoUrl" @click="openProjectDemo(selectedProject)">
                  <span class="button-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polygon points="10 8 16 12 10 16 10 8"></polygon>
                    </svg>
                  </span>
                  <span>Live Demo</span>
                </button>
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
  name: 'PortfolioView',
  data() {
    return {
      activeCategory: 'all',
      expandedProject: null,
      showModal: false,
      selectedProject: null,
      lastCursorPos: { x: 0, y: 0 },
      particles: [],
      canvas: null,
      ctx: null,
      animationFrameId: null,
      typewriterText: '',
      cursorBlinking: true,
      categories: [
        { id: 'web', name: 'Web Development' },
        { id: 'game', name: 'Game Development' },
        { id: 'api', name: 'API & Backend' },
        { id: 'desktop', name: 'Desktop Apps' }
      ],
      projects: [
        {
          id: 1,
          title: 'VoidSharp',
          category: 'desktop',
          year: '2023',
          technologies: ['C#', '.NET', 'API', 'Advanced-Desktop-App'],
          description: 'A cutting-edge desktop application designed to enhance developer productivity with advanced code editing features and intelligent suggestions.',
          features: [
            'Real-time code analysis and suggestions',
            'Custom theme engine with cyberpunk aesthetics',
            'Plugin architecture for extensibility',
            'Integrated debugging tools with visual feedback'
          ],
          githubUrl: 'https://github.com/simonnovak/voidsharp',
          demoUrl: null,
          previewType: 'code',
          previewFile: 'MainWindow.xaml.cs',
          codePreview: `<span class="code-keyword">using</span> System;
<span class="code-keyword">using</span> System.Windows;
<span class="code-keyword">using</span> System.Windows.Controls;
<span class="code-keyword">using</span> VoidSharp.ViewModels;

<span class="code-keyword">namespace</span> VoidSharp
{
    <span class="code-keyword">public partial class</span> <span class="code-function">MainWindow</span> : Window
    {
        <span class="code-keyword">private</span> MainViewModel _viewModel;

        <span class="code-keyword">public</span> <span class="code-function">MainWindow</span>()
        {
            <span class="code-function">InitializeComponent</span>();
            _viewModel = <span class="code-keyword">new</span> <span class="code-function">MainViewModel</span>();
            DataContext = _viewModel;
            <span class="code-function">InitializeTheme</span>();
        }

        <span class="code-keyword">private void</span> <span class="code-function">InitializeTheme</span>()
        {
            <span class="code-comment">// Apply cyberpunk theme to the application</span>
            var <span class="code-variable">theme</span> = <span class="code-keyword">new</span> <span class="code-function">CyberpunkTheme</span>();
            <span class="code-variable">theme</span>.<span class="code-function">Apply</span>(this);
            
            <span class="code-comment">// Initialize glow effects</span>
            <span class="code-function">InitializeGlowEffects</span>();
        }
    }
}`
        },
        {
          id: 2,
          title: 'SOSGame',
          category: 'game',
          year: '2023',
          technologies: ['C#', '.NET', 'API', 'TCP-Server', 'CustomEngine'],
          description: 'An immersive 2D game with cyberpunk aesthetics, featuring dynamic lighting, particle effects, and a unique combat system.',
          features: [
            'Procedurally generated levels with custom algorithms',
            'Advanced particle system for environmental effects',
            'Dynamic lighting system for atmosphere creation',
            'AI-driven enemy behavior with neural networks'
          ],
          githubUrl: 'https://github.com/simonnovak/sosgame',
          demoUrl: 'https://simonnovak.cz/sosgame',
          previewType: 'code',
          previewFile: 'game.py',
          codePreview: `<span class="python-keyword">import</span> pygame
<span class="python-keyword">import</span> numpy <span class="python-keyword">as</span> np
<span class="python-keyword">from</span> particle_system <span class="python-keyword">import</span> ParticleSystem
<span class="python-keyword">from</span> player <span class="python-keyword">import</span> Player
<span class="python-keyword">from</span> enemy <span class="python-keyword">import</span> EnemyManager

<span class="python-keyword">class</span> <span class="python-function">SOSGame</span>:
    <span class="python-keyword">def</span> <span class="python-function">__init__</span>(self):
        pygame.init()
        self.screen = pygame.display.set_mode((1280, 720))
        pygame.display.set_caption(<span class="python-string">"SOSGame - Cyberpunk Adventure"</span>)
        
        <span class="python-comment"># Initialize game systems</span>
        self.particle_system = ParticleSystem(max_particles=1000)
        self.player = Player(position=(640, 360))
        self.enemy_manager = EnemyManager(difficulty=<span class="python-string">"hard"</span>)
        
        <span class="python-comment"># Setup lighting</span>
        self.lights = []
        self.<span class="python-function">setup_dynamic_lighting</span>()
        
    <span class="python-keyword">def</span> <span class="python-function">setup_dynamic_lighting</span>(self):
        <span class="python-comment"># Create ambient blue/cyan light</span>
        ambient = {
            <span class="python-string">"position"</span>: (640, 360),
            <span class="python-string">"color"</span>: (0, 210, 240),
            <span class="python-string">"intensity"</span>: 0.5,
            <span class="python-string">"radius"</span>: 500
        }
        self.lights.append(ambient)
        
        <span class="python-comment"># Add flickering neon lights</span>
        <span class="python-keyword">for</span> i <span class="python-keyword">in</span> range(5):
            neon = {
                <span class="python-string">"position"</span>: (np.random.randint(100, 1180), 
                             np.random.randint(100, 620)),
                <span class="python-string">"color"</span>: (0, 240, 220),
                <span class="python-string">"intensity"</span>: 0.8,
                <span class="python-string">"radius"</span>: 150,
                <span class="python-string">"flicker"</span>: <span class="python-boolean">True</span>
            }
            self.lights.append(neon)`
        },
        {
          id: 3,
          title: 'snovak.cz Web',
          category: 'web',
          year: '2025',
          technologies: ['Vue.js', 'JavaScript', 'CSS', 'HTML'],
          description: 'A modern portfolio website showcasing projects with interactive elements and advanced animations. Features a custom particle system and dynamic components.',
          features: [
            'Custom-built particle system with interactive behavior',
            'Advanced animations and transitions between views',
            'Dynamic code previews with syntax highlighting',
            'Responsive design for optimal viewing on all devices'
          ],
          githubUrl: 'https://github.com/simonnovak/portfolio',
          demoUrl: 'https://snovak.cz',
          previewType: 'code',
          previewFile: 'PortfolioView.vue',
          codePreview: `<span class="code-keyword">export default</span> {
  name: <span class="code-string">'PortfolioView'</span>,
  data() {
    <span class="code-keyword">return</span> {
      activeCategory: <span class="code-string">'all'</span>,
      projects: [],
      particles: [],
      canvas: <span class="code-keyword">null</span>,
      ctx: <span class="code-keyword">null</span>,
      animationFrameId: <span class="code-keyword">null</span>
    }
  },
  computed: {
    filteredProjects() {
      <span class="code-keyword">if</span> (<span class="code-variable">this</span>.activeCategory === <span class="code-string">'all'</span>) {
        <span class="code-keyword">return this</span>.projects;
      } <span class="code-keyword">else</span> {
        <span class="code-keyword">return this</span>.projects.filter(project => 
          project.category === <span class="code-variable">this</span>.activeCategory
        );
      }
    }
  },
  mounted() {
    <span class="code-variable">this</span>.<span class="code-function">initParticles</span>();
    <span class="code-variable">this</span>.<span class="code-function">loadProjects</span>();
    <span class="code-variable">this</span>.<span class="code-function">startTypingEffect</span>();
  },
  methods: {
    <span class="code-function">initParticles</span>() {
      <span class="code-variable">this</span>.canvas = <span class="code-variable">this</span>.$refs.particleCanvas;
      <span class="code-variable">this</span>.ctx = <span class="code-variable">this</span>.canvas.getContext(<span class="code-string">'2d'</span>);
      <span class="code-variable">this</span>.<span class="code-function">resizeCanvas</span>();
      <span class="code-variable">this</span>.<span class="code-function">createParticles</span>();
      <span class="code-variable">this</span>.<span class="code-function">animateParticles</span>();
    }
  }
}`
        },
        {
          id: 4,
          title: 'Sajrajt.cz',
          category: 'web',
          year: '2024',
          technologies: ['Python', 'Flask', 'SQLite', 'Javascript', 'CSS', 'HTML'],
          description: 'A high-performance RESTful API service designed to handle complex data processing and seamless integrations with various front-end applications.',
          features: [
            'Token-based authentication with JWT',
            'Rate limiting and request throttling',
            'Comprehensive API documentation with Swagger',
            'Containerized deployment with Docker and Docker Compose'
          ],
          githubUrl: 'https://github.com/privateproject/sajrajt',
          demoUrl: 'https://sajrajt.cz/',
          previewType: 'code',
          previewFile: 'api.py',
          codePreview: `<span class="python-keyword">from</span> flask <span class="python-keyword">import</span> Flask, jsonify, request
<span class="python-keyword">from</span> flask_cors <span class="python-keyword">import</span> CORS
<span class="python-keyword">from</span> flask_jwt_extended <span class="python-keyword">import</span> JWTManager, jwt_required, create_access_token
<span class="python-keyword">from</span> models <span class="python-keyword">import</span> db, Project, User
<span class="python-keyword">from</span> config <span class="python-keyword">import</span> Config

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
jwt = JWTManager(app)
db.init_app(app)

<span class="python-decorator">@app.route('/api/projects', methods=['GET'])</span>
<span class="python-keyword">def</span> <span class="python-function">get_projects</span>():
    <span class="python-comment"># Get query parameters for filtering</span>
    category = request.args.get(<span class="python-string">'category'</span>, <span class="python-keyword">None</span>)
    
    <span class="python-comment"># Base query</span>
    query = Project.query
    
    <span class="python-comment"># Apply filters if provided</span>
    <span class="python-keyword">if</span> category:
        query = query.filter_by(category=category)
    
    <span class="python-comment"># Execute query and return results</span>
    projects = query.all()
    result = [{
        <span class="python-string">'id'</span>: project.id,
        <span class="python-string">'title'</span>: project.title,
        <span class="python-string">'description'</span>: project.description,
        <span class="python-string">'category'</span>: project.category,
        <span class="python-string">'technologies'</span>: project.technologies.split(<span class="python-string">','</span>),
        <span class="python-string">'year'</span>: project.year
    } <span class="python-keyword">for</span> project <span class="python-keyword">in</span> projects]
    
    <span class="python-keyword">return</span> jsonify(result)

<span class="python-decorator">@app.route('/api/projects/<int:project_id>', methods=['GET'])</span>
<span class="python-keyword">def</span> <span class="python-function">get_project</span>(project_id):
    project = Project.query.get_or_404(project_id)
    result = {
        <span class="python-string">'id'</span>: project.id,
        <span class="python-string">'title'</span>: project.title,
        <span class="python-string">'description'</span>: project.description,
        <span class="python-string">'category'</span>: project.category,
        <span class="python-string">'technologies'</span>: project.technologies.split(<span class="python-string">','</span>),
        <span class="python-string">'year'</span>: project.year,
        <span class="python-string">'features'</span>: project.features.split(<span class="python-string">'|'</span>) <span class="python-keyword">if</span> project.features <span class="python-keyword">else</span> []
    }
    <span class="python-keyword">return</span> jsonify(result)`
        },
        {
          id: 5,
          title: 'Zentos',
          category: 'web',
          year: '2023',
          technologies: ['Vue.js', 'Python', 'Flask', 'SQLite', 'Javascript', 'SCSS', 'HTML'],
          description: 'A progressive web app for developers to keep track of coding notes, snippets, and documentation with real-time syncing and offline capabilities.',
          features: [
            'Markdown editor with syntax highlighting',
            'Code snippet storage with language detection',
            'Offline-first functionality with local-first data',
            'Cross-device synchronization'
          ],
          githubUrl: 'https://github.com/privateproject/sajrajt',
          demoUrl: 'https://sajrajt.cz/admin/Zentos.html',
          previewType: 'code',
          previewFile: 'NoteEditor.vue',
          codePreview: `<span class="code-keyword">import</span> { ref, computed, watch } <span class="code-keyword">from</span> <span class="code-string">'vue'</span>
<span class="code-keyword">import</span> { useStore } <span class="code-keyword">from</span> <span class="code-string">'vuex'</span>
<span class="code-keyword">import</span> MarkdownIt <span class="code-keyword">from</span> <span class="code-string">'markdown-it'</span>
<span class="code-keyword">import</span> hljs <span class="code-keyword">from</span> <span class="code-string">'highlight.js'</span>

<span class="code-keyword">export default</span> {
  setup() {
    <span class="code-keyword">const</span> <span class="code-variable">store</span> = <span class="code-function">useStore</span>();
    <span class="code-keyword">const</span> <span class="code-variable">content</span> = <span class="code-function">ref</span>(<span class="code-string">''</span>);
    <span class="code-keyword">const</span> <span class="code-variable">previewMode</span> = <span class="code-function">ref</span>(<span class="code-keyword">false</span>);
    <span class="code-keyword">const</span> <span class="code-variable">currentNote</span> = <span class="code-function">computed</span>(() => store.getters.currentNote);
    <span class="code-keyword">const</span> <span class="code-variable">isModified</span> = <span class="code-function">ref</span>(<span class="code-keyword">false</span>);
    
    <span class="code-comment">// Initialize markdown parser with syntax highlighting</span>
    <span class="code-keyword">const</span> <span class="code-variable">md</span> = <span class="code-keyword">new</span> <span class="code-function">MarkdownIt</span>({
      html: <span class="code-keyword">true</span>,
      linkify: <span class="code-keyword">true</span>,
      typographer: <span class="code-keyword">true</span>,
      highlight: <span class="code-keyword">function</span>(<span class="code-variable">str</span>, <span class="code-variable">lang</span>) {
        <span class="code-keyword">if</span> (<span class="code-variable">lang</span> && hljs.getLanguage(<span class="code-variable">lang</span>)) {
          <span class="code-keyword">try</span> {
            <span class="code-keyword">return</span> hljs.highlight(<span class="code-variable">str</span>, { language: <span class="code-variable">lang</span> }).value;
          } <span class="code-keyword">catch</span> (<span class="code-variable">__</span>) {}
        }
        <span class="code-keyword">return</span> <span class="code-string">''</span>; <span class="code-comment">// use external default escaping</span>
      }
    });
    
    <span class="code-comment">// Initialize with current note content if available</span>
    <span class="code-function">watch</span>(<span class="code-variable">currentNote</span>, (<span class="code-variable">newVal</span>) => {
      <span class="code-keyword">if</span> (<span class="code-variable">newVal</span>) {
        <span class="code-variable">content</span>.value = <span class="code-variable">newVal</span>.content || <span class="code-string">''</span>;
        <span class="code-variable">isModified</span>.value = <span class="code-keyword">false</span>;
      }
    }, { immediate: <span class="code-keyword">true</span> });
    
    <span class="code-comment">// Computed property for rendered markdown</span>
    <span class="code-keyword">const</span> <span class="code-variable">renderedContent</span> = <span class="code-function">computed</span>(() => {
      <span class="code-keyword">return</span> <span class="code-variable">md</span>.<span class="code-function">render</span>(<span class="code-variable">content</span>.value);
    });`
        },
        {
          id: 6,
          title: 'Magic Orbwalker',
          category: 'desktop',
          year: '2024',
          technologies: ['C#', '.NET', 'API', 'Math'],
          description: 'A cross-platform time tracking application for freelancers and remote workers with detailed analytics and reporting capabilities.',
          features: [
            'Automated time tracking based on active applications',
            'Project-based organization with client management',
            'Customizable reports and invoicing templates',
            'Integration with popular project management tools'
          ],
          githubUrl: 'https://github.com/simonnovak/cybertrack',
          demoUrl: 'https://cybertrack.simonnovak.cz',
          previewType: 'code',
          previewFile: 'TimeTracker.js',
          codePreview: `<span class="code-keyword">const</span> { app, BrowserWindow, ipcMain } = <span class="code-function">require</span>(<span class="code-string">'electron'</span>);
<span class="code-keyword">const</span> path = <span class="code-function">require</span>(<span class="code-string">'path'</span>);
<span class="code-keyword">const</span> activeWin = <span class="code-function">require</span>(<span class="code-string">'active-win'</span>);
<span class="code-keyword">const</span> Database = <span class="code-function">require</span>(<span class="code-string">'./database'</span>);

<span class="code-keyword">class</span> <span class="code-function">TimeTracker</span> {
  <span class="code-function">constructor</span>() {
    <span class="code-keyword">this</span>.db = <span class="code-keyword">new</span> <span class="code-function">Database</span>(<span class="code-string">'timetracking.db'</span>);
    <span class="code-keyword">this</span>.trackingInterval = <span class="code-keyword">null</span>;
    <span class="code-keyword">this</span>.isTracking = <span class="code-keyword">false</span>;
    <span class="code-keyword">this</span>.currentSession = <span class="code-keyword">null</span>;
    <span class="code-keyword">this</span>.currentProject = <span class="code-keyword">null</span>;
    <span class="code-keyword">this</span>.activityBuffer = [];
    
    <span class="code-comment">// Initialize database schema</span>
    <span class="code-keyword">this</span>.db.<span class="code-function">initialize</span>();
  }
  
  <span class="code-function">startTracking</span>(projectId) {
    <span class="code-keyword">if</span> (<span class="code-keyword">this</span>.isTracking) {
      <span class="code-keyword">return</span>;
    }
    
    <span class="code-keyword">this</span>.currentProject = projectId;
    <span class="code-keyword">this</span>.currentSession = {
      id: Date.now(),
      projectId: projectId,
      startTime: <span class="code-keyword">new</span> <span class="code-function">Date</span>().toISOString(),
      endTime: <span class="code-keyword">null</span>,
      activities: []
    };
    
    <span class="code-comment">// Store session in database</span>
    <span class="code-keyword">this</span>.db.<span class="code-function">createSession</span>(<span class="code-keyword">this</span>.currentSession);
    
    <span class="code-comment">// Start tracking interval (every 5 seconds)</span>
    <span class="code-keyword">this</span>.trackingInterval = <span class="code-function">setInterval</span>(() => {
      <span class="code-keyword">this</span>.<span class="code-function">captureActivity</span>();
    }, 5000);
    
    <span class="code-keyword">this</span>.isTracking = <span class="code-keyword">true</span>;
    <span class="code-keyword">return</span> <span class="code-keyword">this</span>.currentSession;
  }
  
  <span class="code-keyword">async</span> <span class="code-function">captureActivity</span>() {
    <span class="code-keyword">try</span> {
      <span class="code-keyword">const</span> activeWindow = <span class="code-keyword">await</span> <span class="code-function">activeWin</span>();
      <span class="code-keyword">if</span> (!activeWindow) <span class="code-keyword">return</span>;
      
      <span class="code-keyword">const</span> activity = {
        timestamp: <span class="code-keyword">new</span> <span class="code-function">Date</span>().toISOString(),
        title: activeWindow.title,
        application: activeWindow.owner.name,
        url: activeWindow.url || <span class="code-keyword">null</span>
      };
    }
    catch (err) {
      console.error('Error capturing activity:', err);
    }
  }
}`
        },
        {
          id: 7,
          title: 'StategyBet',
          category: 'web',
          year: '2022',
          technologies: ['HTML', 'CSS', 'Javascript', 'Flask', 'Python', 'SQLite'],
          description: 'A cyberpunk-themed roguelike game with procedurally generated levels, unique card-based combat system, and stunning visual effects.',
          features: [
            'Procedurally generated cyberpunk environments',
            'Card-based combat system with over 100 unique abilities',
            'Character progression with cybernetic enhancements',
            'Custom shader effects for neon lighting and holographic displays'
          ],
          githubUrl: 'https://github.com/simonnovak/neorogue',
          demoUrl: 'https://simonnovak.itch.io/neorogue',
          previewType: 'code',
          previewFile: 'CombatSystem.cs',
          codePreview: `<span class="code-keyword">using</span> System;
<span class="code-keyword">using</span> System.Collections;
<span class="code-keyword">using</span> System.Collections.Generic;
<span class="code-keyword">using</span> UnityEngine;

<span class="code-keyword">namespace</span> NeoRogue.Combat
{
    <span class="code-keyword">public class</span> <span class="code-function">CombatSystem</span> : MonoBehaviour
    {
        [SerializeField] <span class="code-keyword">private</span> CardManager cardManager;
        [SerializeField] <span class="code-keyword">private</span> EnemyManager enemyManager;
        [SerializeField] <span class="code-keyword">private</span> PlayerStats playerStats;
        
        <span class="code-keyword">private</span> Queue<CombatAction> actionQueue = <span class="code-keyword">new</span> Queue<CombatAction>();
        <span class="code-keyword">private</span> <span class="code-keyword">bool</span> isPlayerTurn = <span class="code-keyword">true</span>;
        <span class="code-keyword">private</span> <span class="code-keyword">int</span> turnCounter = 0;
        <span class="code-keyword">private</span> <span class="code-keyword">bool</span> isCombatActive = <span class="code-keyword">false</span>;
        
        <span class="code-comment">// Combat effects</span>
        [SerializeField] <span class="code-keyword">private</span> ParticleSystem damageEffect;
        [SerializeField] <span class="code-keyword">private</span> ParticleSystem healEffect;
        [SerializeField] <span class="code-keyword">private</span> ParticleSystem shieldEffect;
        
        <span class="code-keyword">public void</span> <span class="code-function">StartCombat</span>(List<Enemy> enemies)
        {
            <span class="code-keyword">if</span> (isCombatActive)
                <span class="code-keyword">return</span>;
                
            <span class="code-comment">// Reset combat state</span>
            turnCounter = 0;
            isPlayerTurn = <span class="code-keyword">true</span>;
            actionQueue.Clear();
            
            <span class="code-comment">// Initialize enemies</span>
            enemyManager.<span class="code-function">SetupEnemies</span>(enemies);
            
            <span class="code-comment">// Draw initial hand</span>
            cardManager.<span class="code-function">DrawInitialHand</span>();
            
            <span class="code-comment">// Start combat</span>
            isCombatActive = <span class="code-keyword">true</span>;
            
            <span class="code-comment">// Apply any starting effects or abilities</span>
            <span class="code-function">ApplyStartingEffects</span>();
            
            <span class="code-comment">// Trigger combat start event</span>
            <span class="code-function">OnCombatStarted</span>();
        }
        
        <span class="code-keyword">public void</span> <span class="code-function">PlayCard</span>(Card card, Enemy target = <span class="code-keyword">null</span>)
        {
            <span class="code-keyword">if</span> (!isPlayerTurn || !isCombatActive)
                <span class="code-keyword">return</span>;
                
            <span class="code-comment">// Validate energy cost</span>
            <span class="code-keyword">if</span> (playerStats.CurrentEnergy < card.EnergyCost)
            {
                <span class="code-function">DisplayError</span>(<span class="code-string">"Not enough energy!"</span>);
                <span class="code-keyword">return</span>;
            }
            
            <span class="code-comment">// Process card effects</span>
            <span class="code-keyword">switch</span> (card.Type)
            {
                <span class="code-keyword">case</span> CardType.Attack:
                    <span class="code-function">ProcessAttackCard</span>(card, target);
                    <span class="code-keyword">break</span>;
                <span class="code-keyword">case</span> CardType.Defense:
                    <span class="code-function">ProcessDefenseCard</span>(card);
                    <span class="code-keyword">break</span>;
                <span class="code-keyword">case</span> CardType.Skill:
                    <span class="code-function">ProcessSkillCard</span>(card, target);
                    <span class="code-keyword">break</span>;
            }
        }
    }
}`
        },
        {
          id: 8,
          title: 'Marketplace Grabber',
          category: 'api',
          year: '2023',
          technologies: ['Python', 'SQLite', 'API'],
          description: 'A robust GraphQL API gateway that integrates multiple microservices into a unified API schema with caching, authentication, and monitoring.',
          features: [
            'Federated GraphQL schema with Apollo Federation',
            'Distributed caching with Redis for improved performance',
            'Comprehensive monitoring and tracing with Apollo Studio',
            'Seamless integration with multiple backend services'
          ],
          githubUrl: 'https://github.com/simonnovak/graphql-gateway',
          demoUrl: 'https://api.simonnovak.cz/graphql',
          previewType: 'code',
          previewFile: 'gateway.js',
          codePreview: `<span class="code-keyword">const</span> { ApolloServer } = <span class="code-function">require</span>(<span class="code-string">'apollo-server-express'</span>);
<span class="code-keyword">const</span> { ApolloGateway, RemoteGraphQLDataSource } = <span class="code-function">require</span>(<span class="code-string">'@apollo/gateway'</span>);
<span class="code-keyword">const</span> express = <span class="code-function">require</span>(<span class="code-string">'express'</span>);
<span class="code-keyword">const</span> { expressjwt: jwt } = <span class="code-function">require</span>(<span class="code-string">'express-jwt'</span>);
<span class="code-keyword">const</span> Redis = <span class="code-function">require</span>(<span class="code-string">'ioredis'</span>);
<span class="code-keyword">const</span> { responseCachePlugin } = <span class="code-function">require</span>(<span class="code-string">'apollo-server-plugin-response-cache'</span>);

<span class="code-comment">// Initialize Redis client for caching</span>
<span class="code-keyword">const</span> redis = <span class="code-keyword">new</span> <span class="code-function">Redis</span>({
  host: process.env.REDIS_HOST || <span class="code-string">'localhost'</span>,
  port: process.env.REDIS_PORT || 6379,
});

<span class="code-comment">// Custom DataSource class to forward authentication</span>
<span class="code-keyword">class</span> <span class="code-function">AuthenticatedDataSource</span> <span class="code-keyword">extends</span> RemoteGraphQLDataSource {
  <span class="code-function">willSendRequest</span>({ request, context }) {
    <span class="code-comment">// Forward the user token to downstream services</span>
    <span class="code-keyword">if</span> (context.user) {
      request.http.headers.set(
        <span class="code-string">'Authorization'</span>, 
        <span class="code-string">\`Bearer \${context.user.token}\`</span>
      );
    }
    
    <span class="code-comment">// Add request tracing headers</span>
    request.http.headers.set(<span class="code-string">'x-request-id'</span>, context.requestId);
  }
}

<span class="code-comment">// Define services for the gateway</span>
<span class="code-keyword">const</span> serviceList = [
  { name: <span class="code-string">'users'</span>, url: <span class="code-string">'http://user-service:4001/graphql'</span> },
  { name: <span class="code-string">'projects'</span>, url: <span class="code-string">'http://project-service:4002/graphql'</span> },
  { name: <span class="code-string">'analytics'</span>, url: <span class="code-string">'http://analytics-service:4003/graphql'</span> }
];

<span class="code-keyword">async function</span> <span class="code-function">startServer</span>() {
  <span class="code-comment">// Initialize the gateway</span>
  <span class="code-keyword">const</span> gateway = <span class="code-keyword">new</span> <span class="code-function">ApolloGateway</span>({
    serviceList,
    buildService: ({ url }) => <span class="code-keyword">new</span> <span class="code-function">AuthenticatedDataSource</span>({ url }),
  });
}`
        }
      ]
    };
  },
  computed: {
    filteredProjects() {
      if (this.activeCategory === 'all') {
        return this.projects;
      } else {
        return this.projects.filter(project => project.category === this.activeCategory);
      }
    }
  },
  mounted() {
    this.initParticles();
    this.initTypingEffect();
    
    // Initialize elements animation
    this.$nextTick(() => {
      const elements = [
        '.section-heading',
        '.portfolio-filters',
        '.portfolio-grid'
      ];
      
      elements.forEach((selector, index) => {
        setTimeout(() => {
          document.querySelector(selector)?.classList.add('animate-in');
        }, 200 + (index * 150));
      });
    });
    
    // Add cursor blinking animation
    setInterval(() => {
      this.cursorBlinking = !this.cursorBlinking;
    }, 600);
    
    // Add resize event listener
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
    
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  },
  methods: {
    initParticles() {
      this.canvas = this.$refs.particleCanvas;
      this.ctx = this.canvas.getContext('2d');
      this.resizeCanvas();
      this.createParticles();
      this.animateParticles();
    },
    resizeCanvas() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    },
    createParticles() {
      this.particles = [];
      const particleCount = Math.min(120, Math.floor((window.innerWidth * window.innerHeight) / 12000));
      
      for (let i = 0; i < particleCount; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          radius: Math.random() * 2 + 0.5,
          color: this.getRandomColor(),
          velocity: {
            x: (Math.random() - 0.5) * 0.5,
            y: (Math.random() - 0.5) * 0.5
          },
          opacity: Math.random() * 0.5 + 0.2,
          connected: [],
          directionChangeTime: Math.random() * 200 + 50,
          directionCounter: 0
        });
      }
    },
    getRandomColor() {
      // Particle colors - matching the home view
      const colors = [
        'rgba(0, 210, 240, 0.4)',  // cyan
        'rgba(0, 240, 210, 0.3)',  // teal
        'rgba(0, 180, 255, 0.3)',  // blue
        'rgba(40, 160, 220, 0.3)'  // light blue
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    },
    animateParticles() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Update and draw particles
      this.particles.forEach((particle, i) => {
        // Basic particle movement
        particle.directionCounter++;
        
        // Randomly change direction occasionally
        if (particle.directionCounter >= particle.directionChangeTime) {
          particle.velocity.x = (Math.random() - 0.5) * 0.5;
          particle.velocity.y = (Math.random() - 0.5) * 0.5;
          particle.directionCounter = 0;
          particle.directionChangeTime = Math.random() * 200 + 50;
        }
        
        // Apply mouse influence
        const dx = this.lastCursorPos.x - particle.x;
        const dy = this.lastCursorPos.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = 0.2 * (1 - distance / 150);
          particle.velocity.x -= (dx / distance) * force;
          particle.velocity.y -= (dy / distance) * force;
        }
        
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;
                
        // Check boundaries with smooth bounce
        if (particle.x < 0) {
          particle.x = 0;
          particle.velocity.x *= -0.7;
        } else if (particle.x > this.canvas.width) {
          particle.x = this.canvas.width;
          particle.velocity.x *= -0.7;
        }
        
        if (particle.y < 0) {
          particle.y = 0;
          particle.velocity.y *= -0.7;
        } else if (particle.y > this.canvas.height) {
          particle.y = this.canvas.height;
          particle.velocity.y *= -0.7;
        }
        
        // Pulse effect
        particle.opacity = (0.3 + 0.2 * Math.sin(Date.now() * 0.001 + i * 0.1));
        
        // Draw particle with changing opacity
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = particle.color.replace(/[\d.]+\)$/g, particle.opacity + ')');
        this.ctx.fill();
        
        // Connect particles
        particle.connected = [];
        this.particles.forEach((other, j) => {
          if (i === j) return;
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            particle.connected.push(j);
            this.ctx.beginPath();
            this.ctx.strokeStyle = `rgba(0, 210, 240, ${0.15 * (1 - distance / 120) * particle.opacity})`;
            this.ctx.lineWidth = 0.6;
            this.ctx.moveTo(particle.x, particle.y);
            this.ctx.lineTo(other.x, other.y);
            this.ctx.stroke();
          }
        });
      });
      
      this.animationFrameId = requestAnimationFrame(this.animateParticles);
    },
    handleResize() {
      this.resizeCanvas();
      this.createParticles();
    },
    handleGlobalMouseMove(e) {
      // Track mouse movement for particles
      this.lastCursorPos = {
        x: e.clientX,
        y: e.clientY
      };
    },
    initTypingEffect() {
      const text = "Prohlédněte si mé projekty a práce";
      let index = 0;
      
      const type = () => {
        if (index < text.length) {
          this.typewriterText += text.charAt(index);
          index++;
          setTimeout(type, Math.random() * 80 + 40);
        } else {
          // Keep text after typing finished
        }
      };
      
      setTimeout(type, 1000);
    },
    setActiveCategory(category) {
      this.activeCategory = category;
      this.expandedProject = null; // Close any expanded project when changing category
    },
    toggleProject(projectId) {
      if (this.expandedProject === projectId) {
        this.expandedProject = null;
      } else {
        this.expandedProject = projectId;
      }
    },
    closeProject() {
      this.expandedProject = null;
    },
    handleProjectHover() {
      // Handle project hover animation
    },
    handleProjectLeave() {
      // Handle project hover out animation
    },
    getProjectCardStyle() {
      // Add a subtle random offset to cards for a more dynamic feel
      const rotateX = (Math.random() * 1 - 0.5).toFixed(2);
      const rotateY = (Math.random() * 1 - 0.5).toFixed(2);
      
      return {
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      };
    },
    getRandomNodeStyle() {
      const size = Math.random() * 60 + 20;
      return {
        width: `${size}px`,
        height: `${size}px`,
        top: `${Math.random() * 80 + 10}%`,
        left: `${Math.random() * 80 + 10}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${Math.random() * 20 + 10}s`
      };
    },
    getCategoryIcon(categoryId) {
      // SVG icons for each category
      const icons = {
        'web': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M2 12h20"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>`,
        'game': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="2" y="6" width="20" height="12" rx="2"/>
          <path d="M6 12h4"/>
          <path d="M8 10v4"/>
          <circle cx="16" cy="12" r="1"/>
          <circle cx="18" cy="10" r="1"/>
        </svg>`,
        'api': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>`,
        'desktop': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="2" y="3" width="20" height="14" rx="2"/>
          <path d="M8 21h8"/>
          <path d="M12 17v4"/>
        </svg>`
      };
      
      return icons[categoryId] || '';
    },
    getCategoryName(categoryId) {
      const category = this.categories.find(cat => cat.id === categoryId);
      return category ? category.name : '';
    },
    getTechClass(tech) {
      // Mapping technologies to color classes
      const techMap = {
        'Vue.js': 'vue',
        'JavaScript': 'js',
        'TypeScript': 'ts',
        'React': 'react',
        'Node.js': 'node',
        'Python': 'python',
        'Flask': 'python',
        'Django': 'python',
        'C#': 'csharp',
        '.NET': 'dotnet',
        'WPF': 'windows',
        'MVVM': 'pattern',
        'Unity': 'unity',
        'Firebase': 'firebase',
        'GraphQL': 'graphql',
        'MongoDB': 'mongo',
        'SQL': 'sql',
        'MySQL': 'mysql',
        'SQLite': 'sqlite',
        'PostgreSQL': 'postgres',
        'Docker': 'docker',
        'Redis': 'redis',
        'PWA': 'web',
        'SCSS': 'css',
        'CSS': 'css',
        'HTML': 'html',
        'Electron': 'electron',
        'Canvas API': 'api',
        'Markdown': 'md',
        'REST API': 'api',
        'Pygame': 'python',
        'PyOpenGL': 'opengl',
        'NumPy': 'python',
        'Apollo Server': 'graphql',
        'Shader Graph': 'unity',
        'Blender': '3d',
        'JWT': 'auth',
        'SQLAlchemy': 'python'
      };
      
      return techMap[tech] || 'default';
    },
    openProjectCode(project) {
      window.open(project.githubUrl, '_blank');
    },
    openProjectDemo(project) {
      window.open(project.demoUrl, '_blank');
    },
    showProjectDetails(project) {
      this.selectedProject = project;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedProject = null;
    }
  }
}
</script>

<style>
/* Portfolio View Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Import fonts (shared with HomeView) */
@import url('https://fonts.googleapis.com/css2?family=Audiowide&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap');

/* Main container - same core styling as home view */
.portfolio-view {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #050b10;
  background: radial-gradient(circle at center, #0b1820 0%, #050b10 100%);
  color: #e0e0e0;
  overflow: hidden;
  font-family: 'Rajdhani', sans-serif;
  cursor: url('../assets/Cursors/pointer.cur'), auto;
}

/* Cursor styles - matching home view */
.portfolio-view a, 
.portfolio-view button,
.portfolio-view .project-card {
  cursor: url('../assets/Cursors/link.cur'), pointer;
}

/* Particle system - reused from Home view */
.particles-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.particle-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Main layout */
.content-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  z-index: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;
}

/* Portfolio hero section */
.portfolio-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto 3rem;
  padding-top: 2rem;
}

/* Section heading with glitch effect */
.section-heading {
  text-align: center;
  margin-bottom: 3rem;
  opacity: 0;
  transform: translateY(30px);
  transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.7s ease;
}

.section-heading.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.heading-container {
  position: relative;
  display: inline-block;
}

.heading-background {
  position: absolute;
  top: -15px;
  left: -25px;
  right: -25px;
  bottom: 5px;
  background: linear-gradient(135deg, rgba(0, 210, 240, 0.07), rgba(0, 240, 220, 0.07));
  border-left: 3px solid rgba(0, 210, 240, 0.3);
  z-index: -1;
  transform: skewX(-10deg);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  backdrop-filter: blur(5px);
  box-shadow: 0 0 30px rgba(0, 210, 240, 0.1);
}

.glitch-container {
  position: relative;
  overflow: hidden;
}

.glitch-text {
  font-family: 'Audiowide', 'Orbitron', sans-serif;
  font-size: 3.5rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 2px;
  text-transform: uppercase;
  position: relative;
  text-shadow: 0 0 10px rgba(0, 210, 240, 0.5);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1;
  animation: textShadowPulse 4s infinite;
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  z-index: -1;
}

.glitch-text::before {
  left: 2px;
  text-shadow: -2px 0 rgba(0, 210, 240, 0.8);
  animation: glitch-anim-1 4s infinite linear alternate-reverse;
  clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
}

.glitch-text::after {
  left: -2px;
  text-shadow: 2px 0 rgba(0, 240, 220, 0.8);
  animation: glitch-anim-2 3s infinite linear alternate-reverse;
  clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
}

.glitch-noise {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QgNDRkzv+ZN7QAAAw1JREFUaN7t2U9IVFEUBvDfm1E0ylIjsMU0iTREC6kWQf9o1SIIWrQINxK0KGgRQYtWQdAuaBFBi6BFQdBqaNGiRURQm8D8gyVCRZmGOWqTNHn7FiPjzJ07987982bsc3bv3ne+c+595553iQICQkQS87GENViIGZkXB/EVA7iPd3hbdIdE7F+IQ9hdYmMavdjUF0J24TCeYwsOYhuuYwPWYnIJu6m4hePYjjvYr4zzZS8kT/pHvtFfkMQMtCDV5PYWDFdxfB3nLGALXXGm1Wq0Y4VaaNc6rT1xCGmrW0m9u47+9KRD6M0jYZyDW/iAU2jL49+RZ+66mvGDWB5FSEveQSH+4BZW/ie/Hx2YUyIkix68xJ28/lW1aqm1kBQ7qriPTnRN8L+Cg3hSdKC1FrIU9yaw6cRydLI5BnMztpfwba2H6AEJbKuHkCnYVcL3edQikngm9iBkGqYXsOnGc2kX4nCrLREWMB+jJfy/4Rze40VoUfnJbHbGP5aYk8KsMsJ/4Cq2ZcKNgTQWl9tAbYTMRlOZh7+CIxjy7/7zC07gGbpCndqFbj5KCXiDg+gr4OfBtXCmjo2QSg+YhGNYVcHPO/Aqf36KU2U28Rgh1D2rHmfOJF04gqYK/ocw4p+1rMRxmg4NwAk8LjCqLRUSSQ+OST89VK0oXoRl8WykPuYRMqqmDTTIdzVt+NtrJcryonwHRGxkzuNVf19aXQvZi095/dCDE7hbxqm7ypCiO0bHpZ9y80TxED1VRuRSDOc67sN1LI05InszSeGLAgP9MpkPxeqyLcJILcd7fKw1IU1YV8Hur3RoMZ5zNYcWYXqEaB56z9YQIXmU/B4lxQchdUujB7EL2VHBrm8ihHZHLMDvGrFpxdES0agjwlJaOBOLkCkV7G7jQQw2n9AtcwlfKz33y4RlnDEhxMxYKk0CIWO4VODZ73gUcxT7a7GLV08hCbThb4nne8Zd22shIK+UH3iIL8HbgICAgICAgICAgICAgH+XP44TYCgXRmm8AAAAAElFTkSuQmCC') repeat;
  opacity: 0.05;
  z-index: 0;
  mix-blend-mode: overlay;
  animation: noise 8s steps(10) infinite;
}

.heading-underline {
  width: 70%;
  height: 3px;
  margin: 0.7rem auto;
  background: linear-gradient(90deg, rgba(0, 210, 240, 0.8), rgba(0, 240, 220, 0.4), rgba(0, 210, 240, 0));
  position: relative;
  overflow: hidden;
}

.underline-pulse {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    rgba(0, 210, 240, 0) 0%, 
    rgba(0, 210, 240, 0.8) 50%, 
    rgba(0, 210, 240, 0) 100%);
  animation: pulse-slide 3s infinite ease-in-out;
}

.section-description {
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
}

.typing-text {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 300;
  color: #e0e0e0;
}

.typing-cursor {
  display: inline-block;
  width: 2px;
  height: 1.2em;
  background-color: #00d2f0;
  animation: cursor-blink 0.8s infinite;
  vertical-align: middle;
  margin-left: 2px;
}

.typing-cursor.blink {
  opacity: 0;
}

/* Portfolio filters */
.portfolio-filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  opacity: 0;
  transform: translateY(20px);
  transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, opacity 0.7s ease 0.2s;
}

.portfolio-filters.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.filter-button {
  padding: 0.6rem 1.2rem;
  background: rgba(0, 210, 240, 0.05);
  border: 1px solid rgba(0, 210, 240, 0.2);
  border-radius: 4px;
  color: #a0a0a0;
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(4px);
}

.filter-button.active {
  background: linear-gradient(135deg, rgba(0, 210, 240, 0.15), rgba(0, 240, 220, 0.15));
  color: #00d2f0;
  border-color: rgba(0, 210, 240, 0.5);
  box-shadow: 0 0 15px rgba(0, 210, 240, 0.2);
}

.filter-button:hover:not(.active) {
  background: rgba(0, 210, 240, 0.1);
  color: #e0e0e0;
  transform: translateY(-2px);
}

.button-glow {
  position: absolute;
  top: 0;
  left: -100%;
  width: 60px;
  height: 100%;
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0) 0%, 
    rgba(255, 255, 255, 0.1) 50%, 
    rgba(255, 255, 255, 0) 100%);
  transform: skewX(-15deg);
  transition: all 0.6s ease;
}

.filter-button:hover .button-glow {
  left: 100%;
}

.button-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Portfolio grid */
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(20px);
  transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, opacity 0.7s ease 0.3s;
}

.portfolio-grid.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* Project card */
.project-card {
  position: relative;
  background: rgba(15, 30, 40, 0.3);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(0, 210, 240, 0.1);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  transform-style: preserve-3d;
  perspective: 1000px;
  z-index: 1;
  height: 280px;
}

.project-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3), 0 0 15px rgba(0, 210, 240, 0.1);
  border-color: rgba(0, 210, 240, 0.3);
}

.project-card.expanded {
  grid-column: span 2;
  height: auto;
  z-index: 2;
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0, 210, 240, 0.05), rgba(0, 240, 220, 0.05));
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.project-category {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  padding: 0.3rem 0.7rem;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.2);
  border-left: 2px solid rgba(255, 255, 255, 0.2);
}

.project-category.web {
  color: #42b883;
  border-left: 2px solid #42b883;
}

.project-category.game {
  color: #ff5252;
  border-left: 2px solid #ff5252;
}

.project-category.api {
  color: #61dafb;
  border-left: 2px solid #61dafb;
}

.project-category.desktop {
  color: #b07cb6;
  border-left: 2px solid #b07cb6;
}

.category-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-year {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  background-color: rgba(0, 0, 0, 0.2);
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
}

.project-body {
  margin-bottom: 1rem;
}

.project-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  font-family: 'Orbitron', sans-serif;
  color: #fff;
  letter-spacing: 0.5px;
  transition: color 0.3s ease;
}

.project-card:hover .project-title {
  color: #00d2f0;
  text-shadow: 0 0 10px rgba(0, 210, 240, 0.5);
}

.project-tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tech-pill {
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.3);
  color: rgba(255, 255, 255, 0.6);
  border-left: 1px solid rgba(255, 255, 255, 0.2);
}

.tech-pill.large {
  font-size: 0.85rem;
  padding: 0.3rem 0.8rem;
}

/* Tech pill color classes */
.tech-pill.vue {
  background-color: rgba(66, 184, 131, 0.1);
  color: #42b883;
  border-left: 1px solid #42b883;
}

.tech-pill.js {
  background-color: rgba(240, 219, 79, 0.1);
  color: #f0db4f;
  border-left: 1px solid #f0db4f;
}

.tech-pill.ts {
  background-color: rgba(49, 120, 198, 0.1);
  color: #3178c6;
  border-left: 1px solid #3178c6;
}

.tech-pill.react {
  background-color: rgba(97, 218, 251, 0.1);
  color: #61dafb;
  border-left: 1px solid #61dafb;
}

.tech-pill.node {
  background-color: rgba(104, 160, 99, 0.1);
  color: #68a063;
  border-left: 1px solid #68a063;
}

.tech-pill.python {
  background-color: rgba(76, 158, 217, 0.1);
  color: #4c9ed9;
  border-left: 1px solid #4c9ed9;
}

.tech-pill.csharp {
  background-color: rgba(176, 124, 182, 0.1);
  color: #b07cb6;
  border-left: 1px solid #b07cb6;
}

.tech-pill.unity {
  background-color: rgba(100, 100, 100, 0.1);
  color: #ccc;
  border-left: 1px solid #ccc;
}

.tech-pill.dotnet {
  background-color: rgba(105, 50, 180, 0.1);
  color: #6932b4;
  border-left: 1px solid #6932b4;
}

.tech-pill.firebase {
  background-color: rgba(255, 152, 0, 0.1);
  color: #ff9800;
  border-left: 1px solid #ff9800;
}

.tech-pill.graphql {
  background-color: rgba(229, 53, 171, 0.1);
  color: #e535ab;
  border-left: 1px solid #e535ab;
}

.tech-pill.css {
  background-color: rgba(33, 150, 243, 0.1);
  color: #2196f3;
  border-left: 1px solid #2196f3;
}

.tech-pill.api {
  background-color: rgba(0, 210, 240, 0.1);
  color: #00d2f0;
  border-left: 1px solid #00d2f0;
}

/* Project card corners */
.card-corner {
  position: absolute;
  width: 15px;
  height: 15px;
  z-index: 1;
  border: 1px solid rgba(0, 210, 240, 0.3);
  transition: all 0.3s ease;
}

.card-corner.top-left {
  top: 10px;
  left: 10px;
  border-bottom: none;
  border-right: none;
}

.card-corner.top-right {
  top: 10px;
  right: 10px;
  border-bottom: none;
  border-left: none;
}

.card-corner.bottom-left {
  bottom: 10px;
  left: 10px;
  border-top: none;
  border-right: none;
}

.card-corner.bottom-right {
  bottom: 10px;
  right: 10px;
  border-top: none;
  border-left: none;
}

.project-card:hover .card-corner {
  border-color: rgba(0, 210, 240, 0.8);
  box-shadow: 0 0 10px rgba(0, 210, 240, 0.3);
}

.card-glow {
  position: absolute;
  top: -100%;
  right: -100%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at center, rgba(0, 210, 240, 0.1) 0%, rgba(0, 210, 240, 0) 70%);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.project-card:hover .card-glow {
  opacity: 1;
}

/* Expanded project details */
.project-details {
  overflow: hidden;
  margin-top: 1rem;
}

.details-container {
  background: rgba(10, 20, 30, 0.5);
  border-radius: 8px;
  border: 1px solid rgba(0, 210, 240, 0.2);
  overflow: hidden;
  margin-top: 1.5rem;
}

.details-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(0, 210, 240, 0.1);
}

.details-actions {
  display: flex;
  gap: 1rem;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.action-button.code-button:hover {
  background-color: rgba(0, 210, 240, 0.1);
  border-color: rgba(0, 210, 240, 0.3);
  color: #00d2f0;
  transform: translateY(-2px);
}

.action-button.demo-button:hover {
  background-color: rgba(255, 82, 82, 0.1);
  border-color: rgba(255, 82, 82, 0.3);
  color: #ff5252;
  transform: translateY(-2px);
}

.close-button {
  background: rgba(255, 255, 255, 0.05);
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
  transform: rotate(90deg);
}

.details-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  padding: 1.5rem;
}

.details-description h4 {
  font-size: 1.1rem;
  color: #00d2f0;
  margin-bottom: 0.8rem;
  font-weight: 500;
}

.details-description p {
  font-size: 0.95rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.2rem;
}

.feature-list {
  list-style: none;
  margin-left: 0.5rem;
}

.feature-list li {
  position: relative;
  padding-left: 1.2rem;
  margin-bottom: 0.6rem;
  font-size: 0.95rem;
  line-height: 1.4;
}

.feature-bullet {
  position: absolute;
  left: 0;
  top: 0.5rem;
  width: 6px;
  height: 6px;
  background-color: #00d2f0;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0, 210, 240, 0.5);
}

.details-preview {
  max-height: 300px;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
}

.code-preview {
  background-color: #141f2d;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.code-preview.web {
  border-top: 3px solid #42b883;
}

.code-preview.game {
  border-top: 3px solid #ff5252;
}

.code-preview.api {
  border-top: 3px solid #61dafb;
}

.code-preview.desktop {
  border-top: 3px solid #b07cb6;
}

.preview-header {
  height: 30px;
  background-color: #1a2530;
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid #2a3540;
}

.header-button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 6px;
}

.header-button:nth-child(1) {
  background-color: #ff5f56;
}

.header-button:nth-child(2) {
  background-color: #ffbd2e;
}

.header-button:nth-child(3) {
  background-color: #27c93f;
}

.header-title {
  margin-left: 15px;
  font-size: 0.8rem;
  color: #8a8a8a;
  font-family: 'JetBrains Mono', monospace;
}

.preview-content {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.line-numbers {
  width: 40px;
  background-color: #151f2d;
  color: #5a6a7a;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  padding: 0.5rem 0;
  text-align: right;
  user-select: none;
}

.line-numbers div {
  padding: 0 0.5rem;
  line-height: 1.5;
}

.code-content {
  flex: 1;
  margin: 0;
  padding: 0.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  line-height: 1.5;
  color: #e0e0e0;
  background-color: #141f2d;
  overflow: auto;
}

/* Project showcase modal */
.project-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 10, 20, 0.9);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  backdrop-filter: blur(10px);
}

.modal-content {
  background: linear-gradient(135deg, rgba(20, 40, 60, 0.8), rgba(10, 20, 30, 0.8));
  border-radius: 8px;
  width: 100%;
  max-width: 1100px;
  max-height: 90vh;
  overflow: hidden;
  border: 1px solid rgba(0, 210, 240, 0.2);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 210, 240, 0.2);
  animation: modal-appear 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modal-appear {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background-color: rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(0, 210, 240, 0.1);
}

.modal-header h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  font-family: 'Orbitron', sans-serif;
}

.modal-close {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  transform: rotate(90deg);
}

.modal-body {
  padding: 0;
  max-height: calc(90vh - 80px);
  overflow-y: auto;
}

.project-showcase {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  min-height: 500px;
}

.showcase-preview {
  background-color: #0f1925;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.code-showcase, .image-showcase {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.code-editor-modal {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 450px;
}

.editor-header {
  height: 30px;
  background-color: #1a2530;
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid #2a3540;
}

.editor-content {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.image-showcase img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.showcase-details {
  padding: 2rem;
}

.showcase-section {
  margin-bottom: 2rem;
}

.showcase-section h4 {
  font-size: 1.2rem;
  color: #00d2f0;
  margin-bottom: 1rem;
  font-weight: 500;
}

.showcase-tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.showcase-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

/* Transitions */
.project-transition-enter-active,
.project-transition-leave-active {
  transition: transform 0.5s, opacity 0.5s;
}

.project-transition-enter-from,
.project-transition-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Responsive styles */
@media (max-width: 1200px) {
  .portfolio-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
  
  .project-card.expanded {
    grid-column: span 1;
  }
  
  .details-content {
    grid-template-columns: 1fr;
  }
  
  .project-showcase {
    grid-template-columns: 1fr;
  }
  
  .showcase-preview {
    min-height: 400px;
  }
}

@media (max-width: 768px) {
  .glitch-text {
    font-size: 2.5rem;
  }
  
  .portfolio-filters {
    gap: 0.5rem;
  }
  
  .filter-button {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }
  
  .portfolio-grid {
    grid-template-columns: 1fr;
  }
  
  .modal-content {
    max-width: 95%;
  }
}

@media (max-width: 576px) {
  .content-container {
    padding: 1rem;
  }
  
  .glitch-text {
    font-size: 2rem;
  }
  
  .section-description {
    font-size: 1rem;
  }
  
  .portfolio-filters {
    flex-wrap: wrap;
  }
  
  .project-card {
    height: 300px;
  }
  
  .details-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .details-actions {
    width: 100%;
    justify-content: center;
  }
  
  .modal-header h3 {
    font-size: 1.2rem;
  }
  
  .showcase-section h4 {
    font-size: 1.1rem;
  }
}

/* Animation keyframes */
@keyframes textShadowPulse {
  0%, 100% {
    text-shadow: 0 0 8px rgba(0, 210, 240, 0.5);
  }
  50% {
    text-shadow: 0 0 15px rgba(0, 210, 240, 0.8), 0 0 40px rgba(0, 210, 240, 0.3);
  }
}

@keyframes glitch-anim-1 {
  0%, 100% {
    clip-path: polygon(0 15%, 100% 15%, 100% 30%, 0 30%);
    transform: translate(-2px, 0);
  }
  50% {
    clip-path: polygon(0 10%, 100% 10%, 100% 25%, 0 25%);
    transform: translate(2px, 0);
  }
}

@keyframes glitch-anim-2 {
  0%, 100% {
    clip-path: polygon(0 65%, 100% 65%, 100% 80%, 0 80%);
    transform: translate(-2px, 0);
  }
  50% {
    clip-path: polygon(0 70%, 100% 70%, 100% 85%, 0 85%);
    transform: translate(2px, 0);
  }
}

@keyframes noise {
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-5%, -5%); }
  20% { transform: translate(-10%, 5%); }
  30% { transform: translate(5%, -10%); }
  40% { transform: translate(-5%, 15%); }
  50% { transform: translate(-10%, 5%); }
  60% { transform: translate(15%, 0); }
  70% { transform: translate(0, 10%); }
  80% { transform: translate(-15%, 0); }
  90% { transform: translate(10%, 5%); }
}

@keyframes pulse-slide {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}

@keyframes cursor-blink {
  0%, 49% {
    opacity: 1;
  }
  50%, 100% {
    opacity: 0;
  }
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(30px, 15px);
  }
  50% {
    transform: translate(10px, -20px);
  }
  75% {
    transform: translate(-15px, 10px);
  }
}
</style>