<template>
    <div>
      <NavReglus />
      <div class="container">
        <main>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
          <section class="hero">
            <div class="hero-title">
              <h1>Ficha de Acompanhamento do Estudante</h1>
            </div>
            <div class="hero-profile"></div>
          </section>
          <section class="content">
            <aside class="sidebar">
              <ul>
                <li><a href="#"><i class="fas fa-home"></i> Início</a></li>
                <li><a href="/agenda"><i class="far fa-calendar-alt"></i> Agenda</a></li>
                <li>
                  <a href="#" @click="toggleCourses"><i class="fas fa-users" style="color: black;"></i> Cursos</a>
                  <ul v-if="showCourses" class="sub-menu">
                    <li><a href="/educacaoinclusiva"><i class="fas fa-users"></i> Educação Inclusiva</a></li>
                    <li><a href="#"><i class="fas fa-laptop-code"></i> Introdução a Programação</a></li>
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
              <div class="students-table">
                <table>
                  <thead>
                    <tr>
                      <th>Nomes dos Alunos</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(student, index) in students" :key="index">
                      <td class="student-cell">
                        <img :src="student.image" :alt="student.name" class="student-image">
                        <span>{{ student.name }}</span>
                        <button @click="goToStudentProfile(student.name)" class="profile-button">Ver Ficha</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
    name: 'ListarAlunos',
    components: {
      NavReglus,
    },
    data() {
      return {
        showCourses: false,
        students: [
          { name: 'Williem Berg Oliveira', image: require('@/assets/content/williem.jpg') },
          { name: 'Caroline Medeiros', image: require('@/assets/content/caroline.png') },
          { name: 'Maiara Agueda', image: require('@/assets/content/maiara.png') },
          { name: 'Eduardo de Melo', image: require('@/assets/content/eduardo.png') },
          { name: 'Ramide Dantas', image: require('@/assets/content/ramide.png') },
          { name: 'Aida Araújo', image: require('@/assets/content/aida.png') },
          { name: 'Akin Dagba', image: require('@/assets/content/akin.png') },
          { name: 'Jamilly Braga', image: require('@/assets/content/jamilly.png') },
          { name: 'Isaque Domingues', image: require('@/assets/content/isaque.png') },
          { name: 'Henrique Venâncio', image: require('@/assets/content/henrique.png') }
        ]
      };
    },
    methods: {
      toggleCourses() {
        this.showCourses = !this.showCourses;
      },
      goToStudentProfile(studentName) {
    // Verifica o nome do aluno e redireciona para diferentes rotas
    if (studentName === 'Williem Berg Oliveira') {
      this.$router.push({ path: '/fichaacompanhamento', query: { name: studentName } });
    } else if (studentName === 'Caroline Medeiros') {
      this.$router.push({ path: '/fichaacompanhamentocaroline', query: { name: studentName } });
    } else if (studentName === 'Maiara Agueda') {
      this.$router.push({ path: '/fichaacompanhamentomaiara', query: { name: studentName } }); 
    } else {
      // Redirecionamento padrão
      this.$router.push({ path: '/listaralunos', query: { name: studentName } });
    }
  }
    }
  };
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
    margin-top: 1px;
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
    color: #fff;
  }
  
  .hero-title h2, .hero-title p {
    color: #ffffff;
  }
  
  .content {
    display: flex;
    gap: 20px;
  }
  
  .sidebar {
    width: 250px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
  }
  
  .sidebar ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
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
    height: 50px; /* Altura fixa para uniformizar */
    line-height: 30px; /* Centraliza o texto verticalmente */
    width: 100%; /* Garante que as caixas tenham largura total */
  }
  
  .sidebar li {
    margin-bottom: 10px;
    width: 100%; /* Largura fixa das caixas */
  }
  
  
  .sidebar a:hover {
    background-color: #8c52ff;
    color: white;
  }
  
  .main-content {
    flex-grow: 1;
  }
  
  .students-table {
    background-color: #fff;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .students-table table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .students-table th, .students-table td {
    padding: 10px;
    text-align: left;
  }
  
  .students-table th {
    background-color: #8c52ff;
    color: white;
  }
  
  .student-cell {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .student-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
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
  .profile-button {
    margin-left: 10px;
    padding: 5px 10px;
    background-color: #8c52ff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .profile-button:hover {
    background-color: #6a3fcc;
  }
  </style>
  