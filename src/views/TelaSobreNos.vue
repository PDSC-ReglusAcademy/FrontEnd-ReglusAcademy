<template>
    <div class="container">
      <div>
        <NavReglus />
      </div>
      <header>
        <div class="logo">
          <img src="@/assets/content/teachers.png" alt="Animação de professores em sala">
        </div>
        <nav>
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/funcionalidades">Funcionalidades</router-link></li>
            <li><router-link to="/recursos">Recursos</router-link></li>
            <li><router-link to="/organizacao">Organização</router-link></li>
            <li><router-link to="/sobre-nos">Sobre nós</router-link></li>
          </ul>
        </nav>
      </header>
  
      <main>
        <section class="about-us">
          <h2>Sobre Nós</h2>
          <div class="illustration">
            <img src="@/assets/content/paulofreire.jpeg" alt="Foto de paulo freire">
          </div>
          <div class="quote">
            <p>
              "Ensinar não é transferir conhecimento, mas criar as 
              possibilidades para a sua própria produção ou a sua 
              construção."
            </p>
            <p>
              <strong>Paulo Freire</strong>
              <br>
              Pedagogia da autonomia. São Paulo: Paz e Terra, 1996.
            </p>
          </div>
          <p>
            Reglus Academy representa não apenas um esforço para 
            superar as barreiras enfrentadas por pessoas 
            neurodivergentes e em situação de vulnerabilidade 
            socioeconômica no acesso à educação e construção do 
            conhecimento, mas também uma afirmação do 
            compromisso com os ideais de Paulo Freire e sua visão de 
            uma educação libertadora e inclusiva.
          </p>
        </section>
      </main>
  
      <footer>
        <p>&copy; 2023 Reglus Academy. Todos os direitos reservados.</p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TelaSobreNos',
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 960px;
    margin: 0 auto;
    padding: 20px;
    position: relative; /* Permite o posicionamento absoluto dos elementos filhos */
  }
  
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }
  
  .logo {
    position: absolute;
    top: 0;
    right: 0;
    width: 150px; /* Ajuste conforme necessário */
  }
  
  .logo img {
    width: 100%;
    height: auto;
  }
  
  nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
  }
  
  nav li {
    margin-left: 20px;
  }
  
  nav a {
    text-decoration: none;
    color: #333;
  }
  
  .about-us {
    position: relative;
    padding-bottom: 200px; /* Espaço para a imagem do rodapé */
  }
  
  .illustration {
    width: 300px;
    margin-right: 20px;
  }
  
  .illustration img {
    width: 100%;
    height: auto;
  }
  
  .quote {
    margin-left: 30px;
  }
  
  .about-text {
    margin-top: 20px;
  }
  
  footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    margin-top: 30px;
  }
  
  footer::before {
    content: "";
    display: block;
    height: 200px; /* Espaço para a imagem do rodapé */
  }
  
  footer::after {
    content: url('@/assets/content/paulofreire.jpeg');
    position: absolute;
    bottom: 0;
    left: 0;
    width: 300px; /* Ajuste conforme necessário */
    height: auto;
    z-index: -1; /* Coloca a imagem atrás do texto do rodapé */
  }  
  </style>