<template>
  <div class="about-view">
    <h1 class="section-title">O mně</h1>
    
    <div class="about-section">
      <h2><img src="../assets/images/icons/about.png" alt="O mně" class="section-icon">O mně</h2>
      <div class="about-content">
        <p>Jmenuji se Šimon Novák a už od mládí mě fascinují počítače. Ve věku 12–13 let jsem začal s programováním ve Visual Basicu a postupně jsem přešel na C#, kde jsem vytvořil řadu jednoduchých i pokročilých her a aplikací.</p>
        <p>Mou vášní je také hra League of Legends, pro kterou jsem vyvinul vlastní cheatovací nástroj "VoidSharp", který je stále k dispozici na mém GitHubu spolu s mnoha dalšími nástroji a aplikacemi pro tuto hru. Díky těmto zkušenostem jsem získal hluboké znalosti o programování a bezpečnosti her.</p>
        <p>V roce 2024 jsem úspěšně odmaturoval s projektem "SOSGame", který získal 2. místo ve zlínském okresním kole SOČ.</p>
      </div>
    </div>
    
    <div class="about-section">
      <h2><img src="../assets/images/icons/skills.png" alt="Dovednosti" class="section-icon">Dovednosti</h2>
      <div class="skills-content">
        <div class="skills-group">
          <h3>Programovací jazyky:</h3>
          <div class="skills-list">
            <span class="skill-item advanced">C#</span>
            <span class="skill-item advanced">Java</span>
            <span class="skill-item intermediate">Python</span>
            <span class="skill-item advanced">HTML</span>
            <span class="skill-item beginner">CSS</span>
            <span class="skill-item intermediate">JavaScript</span>
            <span class="skill-item beginner">Visual Basic</span>
          </div>
        </div>
        <div class="skills-group">
          <h3>Databáze:</h3>
          <div class="skills-list">
            <span class="skill-item advanced">MySQL</span>
            <span class="skill-item intermediate">MSSQL</span>
          </div>
        </div>
        <div class="skills-group">
          <h3>Ostatní:</h3>
          <div class="skills-list">
            <span class="skill-item advanced">Git</span>
            <span class="skill-item advanced">Visual Studio Code</span>
            <span class="skill-item advanced">Visual Studio 2022</span>
            <span class="skill-item intermediate">Adobe Photoshop</span>
            <span class="skill-item intermediate">Vegas Pro 16</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="about-section">
      <h2><img src="../assets/images/icons/interests.png" alt="Zájmy" class="section-icon">Zájmy a koníčky</h2>
      <div class="about-content">
        <p>Rád cvičím a chodím do gymu, miluju procházky do přírody a jízdu na kole, hraju kulečník, šipky a bowling. V budoucnu bych chtěl začít s boxem a tenisem.</p>
      </div>
    </div>
    
    <div class="about-section">
      <h2><img src="../assets/images/icons/contact.png" alt="Kontakt" class="section-icon">Kontakt</h2>
      <div class="about-content">
        <p>Pokud mě chcete kontaktovat, můžete mi poslat email na <a href="mailto:sn@snovak.cz" class="email-link">sn@snovak.cz</a> nebo použijte níže uvedený formulář:</p>
        <form class="contact-form" @submit.prevent="submitForm">
          <div class="form-group">
            <input type="text" v-model="form.name" placeholder="Celé Jméno" required>
          </div>
          <div class="form-row">
            <div class="form-group">
              <input type="email" v-model="form.email" placeholder="Email" required>
            </div>
            <div class="form-group">
              <input type="tel" v-model="form.phone" placeholder="Telefonní Číslo" required>
            </div>
          </div>
          <div class="form-group">
            <textarea v-model="form.message" rows="6" placeholder="Tvoje zpráva ..." required></textarea>
          </div>
          <div class="form-group submit-group">
            <button type="submit" class="submit-btn">Odeslat</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        message: ''
      },
      formSubmitted: false
    }
  },
  methods: {
    submitForm() {
      // Here you would normally send the form data to your backend
      alert('Zpráva byla odeslána! Děkuji za kontaktování.');
      this.formSubmitted = true;
      this.resetForm();
    },
    resetForm() {
      this.form = {
        name: '',
        email: '',
        phone: '',
        message: ''
      };
    }
  }
}
</script>

<style scoped>
.about-view {
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

.about-section {
  margin-bottom: 4rem;
}

.about-section h2 {
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

.about-content {
  padding: 0 1rem;
}

.about-content p {
  margin-bottom: 1.5rem;
  line-height: 1.8;
  font-size: 1.1rem;
}

.skills-content {
  padding: 0 1rem;
}

.skills-group {
  margin-bottom: 2rem;
}

.skills-group h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #f0f0f0;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.skill-item {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.skill-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.skill-item.advanced {
  background: rgba(0, 255, 100, 0.2);
  border: 1px solid rgba(0, 255, 100, 0.5);
  color: #00ff64;
}

.skill-item.intermediate {
  background: rgba(255, 204, 0, 0.2);
  border: 1px solid rgba(255, 204, 0, 0.5);
  color: #ffcc00;
}

.skill-item.beginner {
  background: rgba(255, 51, 0, 0.2);
  border: 1px solid rgba(255, 51, 0, 0.5);
  color: #ff3300;
}

.email-link {
  color: #ff00ff;
  text-decoration: none;
  position: relative;
  transition: all 0.3s ease;
}

.email-link:hover {
  text-shadow: 0 0 10px rgba(255, 0, 255, 0.7);
}

.email-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background: #ff00ff;
  box-shadow: 0 0 5px rgba(255, 0, 255, 0.7);
}

.contact-form {
  margin-top: 2rem;
  background: rgba(10, 15, 20, 0.3);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(0, 255, 100, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: flex;
  gap: 1.5rem;
}

.form-row .form-group {
  flex: 1;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 1rem;
  background: rgba(5, 10, 15, 0.7);
  border: 1px solid rgba(0, 255, 100, 0.3);
  border-radius: 5px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.contact-form input:focus,
.contact-form textarea:focus {
  outline: none;
  border-color: #00ff64;
  box-shadow: 0 0 10px rgba(0, 255, 100, 0.5);
  background: rgba(10, 20, 15, 0.8);
}

.contact-form input::placeholder,
.contact-form textarea::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.contact-form textarea {
  resize: none;
  min-height: 150px;
}

.submit-group {
  text-align: center;
  margin-bottom: 0;
}

.submit-btn {
  padding: 0.75rem 2.5rem;
  background: linear-gradient(135deg, #ff00ff, #9900ff);
  border: none;
  border-radius: 50px;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(255, 0, 255, 0.3);
}

.submit-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(255, 0, 255, 0.5);
}

.submit-btn:active {
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  
  .about-section h2 {
    font-size: 1.5rem;
  }
  
  .form-row {
    flex-direction: column;
    gap: 1rem;
  }
  
  .skill-item {
    font-size: 0.9rem;
  }
}
</style>