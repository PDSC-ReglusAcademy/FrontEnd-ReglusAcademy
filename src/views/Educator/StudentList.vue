<template>
    <div>
      <NavReglusV3 />
      <div class="container">
        <main>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
          <section class="hero">
            <div class="hero-title">
              <h1>Ficha de Acompanhamento dos Estudantes</h1>
            </div>
            <div class="hero-profile"></div>
          </section>
          <section class="content">
            <aside class="sidebar">
              <ul>
                <li>
                  <router-link to="/inicioeducador">
                    <i class="fas fa-home"></i> Início
                  </router-link>
                </li>
                <li>
                  <router-link to="/agenda/estudante">
                    <i class="far fa-calendar-alt"></i> Agenda
                  </router-link>
                </li>
                <li>
                  <a href="#" @click="toggleCourses"><i class="fas fa-users" style="color: black;"></i> Cursos</a>
                  <ul v-if="showCourses" class="sub-menu">
                    <li v-for="room in studentsByRoom" :key="room.room.roomId" class="sub-items">
                      <router-link :to="{ name: 'salaAdmin', params: { roomId: room.room.roomId } }">
                        <i class="fas fa-users"></i> {{ room.room.name }}
                      </router-link>
                    </li>
                  </ul>
                </li>
                <!-- <li><a href="#"><i class="fas fa-archive"></i> Turmas Arquivadas</a></li> -->
                <!-- <li><a href="#"><i class="fas fa-cog"></i> Configurações</a></li> -->
              </ul>
            </aside>
  
            <div class="main-content">
              <div class="students-table">
                <div v-if="loading" class="loading-message">Carregando alunos...</div>
                <div v-else-if="errorMessage" class="error-message">{{ errorMessage }}</div>
                <div v-else-if="studentsByRoom.length === 0" class="no-students-message">
                  Nenhuma sala encontrada.
                </div>
                <div v-else>
                  <div v-for="({ room, students }, index) in studentsByRoom" :key="index" class="room-section">
                    <h4 class="room-name">{{ room.name }}</h4>
                    <p>Curso: {{ room.course.name }}</p>
                    <p>Horário: {{ room.course.schedule }} ({{ room.course.period }})</p>
                    <table>
                      <thead>
                        <tr>
                          <th>Nome do Aluno</th>
                          <th>E-mail</th>
                          <th>Estado</th>
                          <th>Cidade</th>
                          <th>Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="student in students" :key="student.studentId">
                          <td>{{ student.user.name }}</td>
                          <td>{{ student.user.email }}</td>
                          <td>{{ student.state }}</td>
                          <td>{{ student.city }}</td>
                          <td>
                            <button @click="goToStudentProfile(student.studentId)" class="profile-button">
                              Ver Ficha
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  </template>
  
  <script>
  import NavReglusV3 from "@/components/nav/NavReglusV3.vue";
  
  export default {
    name: 'ListarAlunos',
    components: {
      NavReglusV3,
    },
    data() {
      return {
        students: [],
        rooms: [],
        loading: true,
        errorMessage: '',
      };
    },
    methods: {
      toggleCourses() {
        this.showCourses = !this.showCourses;
      },
      async fetchAllStudents() {
        this.loading = true;
        this.studentsByRoom = [];
  
        try {
          const user = JSON.parse(localStorage.getItem("user"));
          const userId = user ? user.userId : null;
  
          if (!userId) {
            throw new Error("Não foi possível recuperar o ID do usuário.");
          }
  
          // Obter educadores
          const response = await fetch("http://localhost:8080/api/educators");
          if (!response.ok) {
            throw new Error("Erro ao buscar educadores");
          }
  
          const educators = await response.json();
          const educator = educators.find(
            (educator) => educator.user.userId === userId
          );
  
          if (!educator) {
            throw new Error("Educador não encontrado");
          }
  
          const educatorId = educator.educatorId;
  
          // Buscar as salas do educador
          const roomsResponse = await fetch(
            `http://localhost:8080/api/rooms/educator/${educatorId}`
          );
          if (!roomsResponse.ok) {
            throw new Error("Erro ao carregar as salas.");
          }
  
          const roomsData = await roomsResponse.json();
  
          const roomsWithStudents = await Promise.all(
            roomsData.map(async (room) => {
              const studentsResponse = await fetch(
                `http://localhost:8080/api/rooms/${room.roomId}/students`
              );
              if (!studentsResponse.ok) {
                throw new Error(`Erro ao carregar alunos da sala ${room.name}`);
              }
              const students = await studentsResponse.json();
              return { room, students };
            })
          );
  
          this.studentsByRoom = roomsWithStudents;
          this.loading = false;
        } catch (error) {
          this.errorMessage = error.message;
          this.loading = false;
        }
      },
      goToStudentProfile(studentId) {
        this.$router.push({ name: 'estudante', params: { studentId } });
      },
    },
    mounted() {
      this.fetchAllStudents();
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.fetchAllStudents();
      });
    },
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
  
  .hero-title h2,
  .hero-title p {
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
    height: 50px;
    line-height: 30px;
    width: 100%;
  }
  
  .sidebar li {
    width: 100%;
  }
  
  .sidebar a:hover {
    background-color: #8c52ff;
    color: white;
  }
  
  .sub-items:nth-child(1) {
  margin-top: 1em;
  }
  
  .sub-items  {
    opacity: 0.8;
    width: 95% !important;
    margin-left: auto; 
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
  
  .students-table th,
  .students-table td {
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