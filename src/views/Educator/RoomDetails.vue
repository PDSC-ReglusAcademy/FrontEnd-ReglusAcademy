<template>
    <div>
        <NavReglusV3 />

        <div v-if="loading">
            Carregando detalhes da sala...
        </div>

        <div v-if="errorMessage" class="alert alert-danger">
            {{ errorMessage }}
        </div>

        <div v-if="!loading && room" id="room">
        <!-- Caixa de 'descRoom' -->
        <div class="descRoom">
        <div class="header" @click="toggleBox('descRoom')">
            <h3>{{ room.name }}</h3>
            <i class="arrow" :class="{'rotated': isBoxMinimized['descRoom']}"></i>
        </div>
        <div class="content" v-show="!isBoxMinimized['descRoom']">
            <p><strong>Curso:</strong> {{ room.course.name }}</p>
            <p><strong>Descrição:</strong> {{ room.course.description }}</p>
            <p><strong>Preço:</strong> R$ {{ room.course.price }}</p>
            <p><strong>Início:</strong> {{ room.startDate }}</p>
            <p><strong>Término:</strong> {{ room.endDate || 'Em andamento' }}</p>
            <p><strong>Período:</strong> {{ room.course.period }}</p>
            <p><strong>Frequência:</strong> {{ room.course.schedule }}</p>
        </div>
        </div>

        <!-- Caixa de 'descEducator' -->
        <div class="descEducator">
        <div class="header" @click="toggleBox('descEducator')">
            <h4>Informações do Educador</h4>
            <i class="arrow" :class="{'rotated': isBoxMinimized['descEducator']}"></i>
        </div>
        <div class="content" v-show="!isBoxMinimized['descEducator']">
            <p><strong>Nome:</strong> {{ room.educator.user.name }}</p>
            <p><strong>Email:</strong> {{ room.educator.user.email }}</p>
            <p><strong>Experiência:</strong> {{ room.educator.experienceYears }} anos</p>
            <p><strong>Bio:</strong> {{ room.educator.bio || 'Não disponível' }}</p>
        </div>
        </div>

        <!-- Caixa de 'descStudents' -->
        <div class="descStudents">
        <div class="header" @click="toggleBox('descStudents')">
            <h4>Alunos Cadastrados</h4>
            <i class="arrow" :class="{'rotated': isBoxMinimized['descStudents']}"></i>
        </div>
        <div class="content" v-show="!isBoxMinimized['descStudents']">
            <ul v-if="students.length > 0">
            <li v-for="student in students" :key="student.studentId">
                <strong>{{ student.user.name }}</strong><br />
                <span>{{ student.user.email }}</span><br />
                <span>Estado: {{ student.state }}</span><br />
                <span>Cidade: {{ student.city }}</span><br />
                <router-link :to="{ name: 'estudante', params: { studentId: student.studentId } }">
                <button>Conferir Ficha de Acompanhamento</button>
                </router-link>
            </li>
            </ul>
            <div v-else>
            Nenhum aluno cadastrado na sala.
            </div>
        </div>
                <!-- Formulário de nova atividade -->
                <div class="newActivityForm">
                    <form class="createActivityForm" @submit.prevent="createActivity">
                        <input v-model="newActivity.title" placeholder="Título da atividade" required />
                        <input v-model="newActivity.maxPoints" type="number" placeholder="Máxima pontuação" required />
                        <input v-model="dataLimitString" type="datetime-local" required />
                        <button type="submit">Criar Atividade</button>
                    </form>
                </div>
            </div>
        </div>

        <FooterReglus />
    </div>

</template>

<script>
import FooterReglus from "@/components/nav/FooterReglus.vue";
import NavReglusV3 from "@/components/nav/NavReglusV3.vue";

export default {
    name: "RoomDetails",
    components: {
        NavReglusV3,
        FooterReglus
    },
    data() {
        return {
            isBoxMinimized: {
            descRoom: false,
            descEducator: false,
            descStudents: false,
            },
            room: null,
            students: [],
            activities: [],            
            newActivityText: '',
            newActivityFile: null,
            newActivity: {
                title: '',
                maxPoints: '',
                dataLimit: ''
            },
            loading: true,
            errorMessage: '',
            userRole: ""
        };
    },
    async created() {
        const user = JSON.parse(localStorage.getItem("user"));
        const userType = localStorage.getItem("userType");

        this.userRole = userType || "";

        if (!user || this.userRole !== "EDUCATOR") {
            this.$router.push("/");
            window.location.reload();
            return;
        }
        await this.fetchRoomDetails();
    },
    methods: {
        toggleBox(boxName) {
      // Alterna o estado de minimização da caixa diretamente
      this.isBoxMinimized[boxName] = !this.isBoxMinimized[boxName];
    },
        async fetchRoomDetails() {
            const roomId = this.$route.params.roomId;

            try {
                const response = await fetch(`http://localhost:8080/api/rooms/${roomId}`);
                if (!response.ok) {
                    throw new Error('Erro ao carregar detalhes da sala');
                }

                const data = await response.json();
                this.room = data;

                const studentsResponse = await fetch(`http://localhost:8080/api/rooms/${roomId}/students`);
                if (!studentsResponse.ok) {
                    throw new Error("Erro ao carregar os alunos.");
                }
                this.students = await studentsResponse.json();

                const activitiesResponse = await fetch(`http://localhost:8080/api/activities/room/${roomId}/activities`);
                if (!activitiesResponse.ok) {
                    throw new Error("Erro ao carregar as atividades.");
                }
                this.activities = await activitiesResponse.json();

                this.loading = false;
            } catch (error) {
                this.errorMessage = error.message;
                this.loading = false;
            }
        },

        async createActivity() {
            const user = JSON.parse(localStorage.getItem('user'));
            const educatorEmail = user ? user.email : null;

            if (!educatorEmail) {
                throw new Error('Email do educador não encontrado');
            }

            const educatorResponse = await fetch(`http://localhost:8080/api/users/email/${encodeURIComponent(educatorEmail)}`);
            const educatorData = await educatorResponse.json();
            const educatorId = educatorData.userId;

            const roomId = parseInt(this.$route.params.roomId, 10);

            const dataLimitString = "2025-02-27T15:48";
            const dataLimit = new Date(dataLimitString).toISOString();

            const activityData = {
                roomId,
                educatorId,
                title: this.newActivity.title,
                maxPoints: this.newActivity.maxPoints,
                dataLimit: dataLimit
            };

            console.log(activityData)

            const createResponse = await fetch('http://localhost:8080/api/activities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(activityData)
            });

            if (createResponse.ok) {
                this.newActivity.title = '';
                this.newActivity.maxPoints = '';
                this.newActivity.dataLimit = '';
                window.location.reload();
            } else {
                console.error('Erro ao criar atividade');
            }
        },
    }
};
</script>

<style scoped>
#room {
    display: flex;
    flex-direction: column; /* Organiza as caixas em uma coluna */
    justify-content: space-between; /* Distribui as caixas com espaçamento entre elas */
    /*height: 90vh; /* Garantir que o contêiner ocupe toda a altura da tela */
    padding: 100px; /* Espaçamento entre as margens da tela e as caixas */
    box-sizing: border-box; /* Inclui o padding e as bordas no cálculo do tamanho */
}

.descRoom, .descEducator, .descStudents, .descActivities {
    /*height: 18%; /* As caixas ocupam 18% da altura total (ajuste conforme necessário) */
    margin-bottom: 20px; /* Espaçamento entre as caixas */
    background-color: white; /* Fundo branco dentro das caixas */
    border-radius: 10px; /* Bordas arredondadas */
    border: 2px solid #8c52ff; /* Bordas roxas */
    padding: 20px; /* Espaçamento interno das caixas */
    box-sizing: border-box; /* Inclui o padding e a borda no cálculo do tamanho */
    /*overflow-y: auto; /* Caso o conteúdo seja maior que o tamanho da caixa, permitir rolagem */

    /* Efeito de luz nas bordas */
    box-shadow: 0 0 15px #8c52ff; /* Luz roxa suave */
    transition: box-shadow 0.3s ease-in-out; /* Animação suave ao passar o mouse */
}

/* Garantir que, em telas menores, as caixas se ajustem para 100% da largura */
@media (max-width: 768px) {
    .descRoom, .descEducator, .descStudents, .descActivities {
        width: 100%;
    }
}

.newActivityForm {
    margin-bottom: 20px;
    background-color: white;
    border-radius: 10px;
    border: 2px solid black;
    padding: 20px;
    box-sizing: border-box;
    width: 60%;
    height: auto;      /* Ajusta a altura conforme o conteúdo */
    margin-left: 250px;
    
    /* Centralização com flexbox */
    display: flex;
    justify-content: center;  /* Centraliza o formulário horizontalmente */
    align-items: center;      /* Centraliza o formulário verticalmente */
    flex-direction: column;   /* Organiza os elementos na direção vertical */
}

.createActivityForm {
    width: 100%;  /* Faz o formulário ocupar 100% da largura da 'newActivityForm' */
    padding: 15px;
    gap: 10px; /* Espaçamento entre os campos */
}

.createActivityForm input, .createActivityForm button {
    width: 100%;  /* Garante que os inputs e o botão ocupem toda a largura disponível */
    padding: 10px;  /* Espaçamento interno para os inputs */
    margin: 5px 0;  /* Espaçamento entre os campos */
    font-size: 1rem;
    border-radius: 5px;  /* Bordas arredondadas */
    border: 1px solid #ccc;  /* Borda suave */
}

.createActivityForm button {
    background-color: black;  /* Cor de fundo roxa para o botão */
    color: white;  /* Cor do texto do botão */
    cursor: pointer;  /* Aparece como um ponteiro quando o usuário passar o mouse */
    border: none;
    transition: background-color 0.3s ease;  /* Animação suave ao passar o mouse */
}

.createActivityForm button:hover {
    background-color: black;  /* Cor mais escura ao passar o mouse */
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    font-weight: bold;
}

.arrow {
    font-size: 20px;
    transition: transform 0.3s ease;
    cursor: pointer;
}

.arrow.rotated {
    transform: rotate(180deg);  /* Rotaciona a seta ao minimizar */
}

/* Estilo da seta */
.arrow:before {
    content: '\005E';  /* Você pode usar um ícone ou caracter de seta aqui */
}

/* Estilo da seta ao ser rotacionada */
.arrow.rotated:before {
    content: '\005E';  /* Seta apontando para cima ao ser rotacionada */
}

.content {
    margin-top: 10px;
    display: block;
}
</style>