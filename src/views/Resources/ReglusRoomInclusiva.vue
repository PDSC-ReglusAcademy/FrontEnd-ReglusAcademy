<template>
    <div>
      <NavReglus />
      <div class="container">
        <main>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
          <section class="hero">
            <div class="hero-title">
              <h2>Reglus Room</h2>
              <h1>Educação Inclusiva</h1>
              <p>2024.2</p>
            </div>
            <div class="hero-profile">
            </div>
          </section>
          <section class="content">
            <aside class="sidebar">
              <ul>
                <li><a href="#"><i class="fas fa-home"></i> Início</a></li>
                <li><a href="/agenda"><i class="far fa-calendar-alt"></i> Agenda</a></li>
                <li>
                  <a href="#" @click="toggleCourses"><i class="fas fa-users" style="color: black;"></i> Cursos</a>
                  <ul v-if="showCourses" class="sub-menu">
                    <li><a href="#"><i class="fas fa-users"></i> Educação Inclusiva</a></li>
                    <li><a href="/introducaoaprogramacao"><i class="fas fa-laptop-code"></i> Introdução a Programação</a></li>
                    <li><a href="#"><i class="fas fa-heart"></i> Lógica de Programação</a></li>
                    <li><a href="#"><i class="fas fa-calculator"></i> Matemática para Iniciantes</a></li>
                    <li><a href="#"><i class="fas fa-brain"></i> Mindfulness</a></li>
                    <li><a href="#"><i class="fas fa-book"></i> Turma Pré-Enem</a></li>
                  </ul>
                </li>
                <li><a href="#"><i class="fas fa-archive"></i> Turmas Arquivadas</a></li>
                <li><a href="#"><i class="fas fa-cog"></i> Configurações</a></li>
              </ul>
            </aside>
            <div class="main-content">
              <div class="teacher-profile">
                <div class="teacher-info">
                  <img src="@/assets/content/aida.png" alt="Foto da professora">
                  <div>
                    <h3>Aida Araújo Ferreira</h3>
                    <p>Pós Doutora em Ciências Exatas e da Terra pela University of Bath</p>
                  </div>
                </div>
                <div class="teacher-skills">
                  <ul>
                    <li><button>Banco de Dados Espacial</button></li>
                    <li><button>Ciência da Computação</button></li>
                    <li><button>Desenvolvimento Web</button></li>
                    <li><button>Desenvolvimento Mobile</button></li>
                    <li><button>Internet das Coisas</button></li>
                    <li><button>Pesquisa</button></li>
                    <li><button>Redes Neurais Artificiais</button></li>
                    <li><button>Robótica</button></li>
                  </ul>
                </div>
              </div>
              <div class="about-teacher">
                <h3>Sobre mim:</h3>
                <p>
                    Professora Titular do Instituto Federal de Pernambuco (IFPE) Campus Recife e bolsista de patrocínio institucional da Fundação de Apoio ao Desenvolvimento da Ciência e Tecnologia. Graduação em Ciência da Computação pela Universidade Católica de Pernambuco (1989), mestrado em Ciência da Computação pela Universidade Federal de Pernambuco (2004) e doutorado em Ciência da Computação pela Universidade Federal de Pernambuco (2011). Leciona na Especialização em Sustentabilidade Urbana, no curso de Tecnologia em Análise e Desenvolvimento de Sistemas (TADS) e é membro colaborador do Mestrado Profissional em Gestão Ambiental (MPGA). Coordenadora do grupo de pesquisa GRENDES (Grupo de Engenharia e Desenvolvimento de Software). Tem experiência na área de Ciência da Computação, com ênfase em Redes Neurais Artificiais, Previsão de séries temporais, Desenvolvimento de Sistemas Web, Desenvolvimento de Aplicativos para Dispositivos Móveis, Banco de Dados Espacial, Internet das Coisas e Robótica. 
                  <br> 
                  Currículo Lattes: <a href="http://lattes.cnpq.br/8515798754882166" target="_blank">http://lattes.cnpq.br/8515798754882166</a>
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  </template>
  
  <script>
  import NavReglus from "@/components/nav/NavReglusV2.vue";
  
  export default {
    name: 'ReglusRoomInclusiva',
    components: {
      NavReglus,
    },
    data() {
      return {
        showCourses: false,  // Controla a visibilidade da lista de cursos
      };
    },
    methods: {
      toggleCourses() {
        this.showCourses = !this.showCourses;  // Alterna o estado de visibilidade
      }
    }
  }
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 0 20px;
  }
  
  main {
    padding: 20px;
    flex-grow: 1;
    margin-top: 80px;
  }
  
  .hero {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    background-color: #8c52ff;
    border-radius: 5px;
  }
  
  .hero-title h1 {
    font-size: 44px;
    font-weight: bold;
    margin-bottom: 5px;
    background-color: #8c52ff;
    color: #fff;
  }
  
  .hero-title h2 {
    font-size: 20px;
    color: #ffffff;
    background-color: #8c52ff;
  }
  
  .hero-title p {
    font-size: 15px;
    color: #ffffff;
    background-color: #8c52ff;
  }
  
  .hero-profile i {
    font-size: 50px;
    color: #333;
  }
  
  .content {
    display: flex;
    gap: 20px;
  }
  
  .sidebar {
    width: 250px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column; /* Garante que os itens fiquem em coluna (vertical) */
  }
  
  .sidebar ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column; /* Força a lista de itens a ser vertical */
  }
  
  .sidebar li {
    margin-bottom: 10px;
    width: 100%; /* Garante que os itens ocupem 100% da largura da sidebar */
  }
  
  .sidebar a {
    display: block;
    padding: 10px;
    color: #333;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    text-decoration: none;
  }
  
  .sidebar a:hover {
    background-color: #8c52ff;
  }
  
  .sub-menu {
    margin-left: 20px;
    padding-left: 10px;
    border-left: 2px solid #ccc;
  }
  
  .sub-menu li {
    margin-bottom: 5px;
  }
  
  .sub-menu a {
    background-color: #8c52ff;
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 5px;
    color: #fff; /* Altera a cor do texto para branco */
    font-weight: bold; /* Deixa o texto em negrito */
  }
  
  .sub-menu a:hover {
    background-color: #8c52ff;
  }
  
  .main-content {
    flex-grow: 1;
  }
  
  .teacher-profile, .about-teacher {
    background-color: #fff;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }
  
  .teacher-info {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  .teacher-info img {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    margin-bottom: 20px; /* Adiciona espaço abaixo da imagem */
    object-fit: cover;
  }
  
  .teacher-info div {
    display: flex;
    flex-direction: column;
  }
  
  .teacher-info h3 {
    margin: 0;
    font-size: 42px;
  }
  
  .teacher-info p {
    margin: 0;
    color: #666;
  }
  
  .teacher-skills ul {
    display: flex;
    flex-wrap: wrap; /* Permite que os itens quebrem para a próxima linha */
    gap: 10px; /* Espaçamento entre os itens */
    padding: 0;
    list-style: none;
  }
  
  .teacher-skills li {
    flex-basis: calc(25% - 10px); /* Cada item ocupa 25% da largura da linha, menos o espaço de gap */
    margin-bottom: 10px; /* Espaçamento inferior entre as linhas */
  }
  
  .teacher-skills button {
    width: 100%; /* O botão ocupa toda a largura do item */
    padding: 10px;
    background-color: #8c52ff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    font-weight: bold;
  }
  
  .teacher-skills button:hover {
    background-color: #7a45e0; /* Cor ao passar o mouse */
  }
  
  .about-teacher a {
    color: #8c52ff;
    text-decoration: none;
  }
  
  @media (max-width: 768px) {
    .content {
      flex-direction: column;
    }
  
    .sidebar {
      width: 100%;
    }
  
    .hero-title h1 {
      font-size: 20px;
    }
  
    .hero-title h2 {
      font-size: 18px;
    }
  }
  
  .sub-menu {
    transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
    overflow: hidden;
    max-height: 500px; /* Altura máxima quando visível */
    opacity: 1;
  }
  
  .sub-menu[style*="display: none"] {
    max-height: 0;
    opacity: 0;
  }
  </style>
  