<template>
  <div class="experience-view">
    <h1 class="section-title">Zkušenosti</h1>
    
    <div class="experience-section">
      <h2><img src="../assets/images/icons/work.png" alt="Pracovní zkušenosti" class="section-icon"> Pracovní zkušenosti</h2>
      <div class="timeline">
        <div class="timeline-item" v-for="(job, index) in jobs" :key="'job-'+index">
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <h3>{{ job.title }}</h3>
            <div class="timeline-period">{{ job.period }}</div>
            <p>{{ job.description }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="experience-section">
      <h2><img src="../assets/images/icons/project.png" alt="Projekty" class="section-icon"> Projekty</h2>
      <div class="projects-list">
        <div class="project-item" v-for="(project, index) in projects" :key="'project-'+index">
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
        </div>
      </div>
    </div>
    
    <div class="experience-section">
      <h2><img src="../assets/images/icons/education.png" alt="Vzdělání" class="section-icon"> Vzdělání</h2>
      <div class="timeline">
        <div class="timeline-item" v-for="(education, index) in educations" :key="'edu-'+index">
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <h3>{{ education.title }}</h3>
            <div class="timeline-period">{{ education.period }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExperienceView',
  data() {
    return {
      jobs: [
        {
          title: 'Externí TMCZ Technik - Právě pracuji',
          period: '06/2023 - Doteď',
          description: 'Práce s síťovými zařízeními CPE, Routery, Lufty, Optické připojení, Backupy, L2 a L3 vrstva. Firma realizuje zakázky pro T-Mobile.'
        },
        {
          title: 'IT Pomocník - Polysoft (Školní Praxe)',
          period: '06/2023 - 06/2023',
          description: 'Školní praxe v Polysoftu, menší firmě ve městě Úvaly, která dělala IT práci pro město a další klienty.'
        },
        {
          title: 'Brigádník - Montáže',
          period: '06/2018 - 08/2022',
          description: 'Práce s taťkou na montážích, získání hlavně praktických dovedností.'
        },
        {
          title: 'Práce na vlastních projektech',
          period: '06/2016 - Současnost',
          description: 'Samostatné učení a práce na vlastních IT projektech, během této doby jsem získal mnoho zkušeností a hluboké znalosti v oblasti IT.'
        }
      ],
      projects: [
        {
          title: 'VoidSharp',
          description: 'Externí skriptovací platforma pro League of Legends.'
        },
        {
          title: 'SOSGame',
          description: 'Online hra na procvičování jakéhokoliv tématu s generováním otázek pomocí ChatGPT.'
        },
        {
          title: 'MagicOrbwalker',
          description: 'Open-source kiting skript pro League of Legends.'
        },
        {
          title: 'Simple League Tools',
          description: 'Sada nástrojů pro League of Legends.'
        },
        {
          title: 'League Aimbot',
          description: 'Externí script pro automatické míření na nepřátele pro League of Legends.'
        },
        {
          title: 'Další neveřejné projekty...',
          description: ''
        }
      ],
      educations: [
        {
          title: 'Základní škola - Nedašov',
          period: '09/2009 - 06/2018'
        },
        {
          title: 'Gymnázium a Střední odborná škola Slavičín - (Obor IT)',
          period: '09/2018 - 06/2024'
        },
        {
          title: 'Vyšší vzdělání - Plánováno??',
          period: ''
        }
      ]
    }
  }
}
</script>

<style scoped>
.experience-view {
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  position: relative;
  color: #00ff64;
  text-shadow: 0 0 10px rgba(0, 255, 100, 0.5);
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background: linear-gradient(90deg, transparent, #00ff64, transparent);
}

.experience-section {
  margin-bottom: 4rem;
}

.experience-section h2 {
  font-size: 1.8rem;
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  border-left: 4px solid #00ff64;
  padding-left: 1rem;
  display: flex;
  align-items: center;
  box-shadow: 0 5px 10px -5px rgba(0, 255, 100, 0.2);
}

.section-icon {
  width: 30px;
  height: 30px;
  margin-right: 1rem;
  filter: drop-shadow(0 0 5px rgba(0, 255, 100, 0.5));
}

.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(to bottom, #00ff64, rgba(0, 255, 100, 0.1));
}

.timeline-item {
  position: relative;
  margin-bottom: 2.5rem;
}

.timeline-marker {
  position: absolute;
  top: 0;
  left: -2rem;
  width: 1rem;
  height: 1rem;
  background: #00ff64;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 255, 100, 0.8);
  transition: all 0.3s ease;
}

.timeline-item:hover .timeline-marker {
  transform: scale(1.2);
  box-shadow: 0 0 15px rgba(0, 255, 100, 1);
}

.timeline-content {
  padding: 1rem;
  background: rgba(0, 50, 25, 0.2);
  border-radius: 8px;
  border-left: 2px solid #00ff64;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.timeline-item:hover .timeline-content {
  transform: translateX(5px);
  background: rgba(0, 50, 25, 0.3);
  box-shadow: 0 5px 15px rgba(0, 255, 100, 0.1);
}

.timeline-content h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #00ff64;
}

.timeline-period {
  font-size: 0.9rem;
  color: #999;
  margin-bottom: 0.75rem;
}

.timeline-content p {
  font-size: 1rem;
  line-height: 1.6;
}

.projects-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding-left: 2rem;
}

.project-item {
  padding: 1.5rem;
  background: rgba(0, 50, 25, 0.2);
  border-radius: 8px;
  border-left: 2px solid #00ff64;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.project-item:hover {
  transform: translateY(-5px);
  background: rgba(0, 50, 25, 0.3);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3), 0 0 15px rgba(0, 255, 100, 0.2);
}

.project-item h3 {
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
  color: #00ff64;
}

.project-item p {
  font-size: 0.95rem;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  
  .experience-section h2 {
    font-size: 1.5rem;
  }
  
  .projects-list {
    grid-template-columns: 1fr;
  }
}
</style>