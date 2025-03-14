<template>
    <div class="list">
        <div v-if="loading" class="loading-spinner">
            Carregando...
        </div>

        <div v-if="errorMessage" class="alert alert-danger">
            {{ errorMessage }}
        </div>

        <div v-if="!loading && rooms.length > 0">
            <ul>
                <li v-for="room in rooms" :key="room.roomId">
                    <strong>{{ room.name }}</strong><br />
                    <span>{{ room.course.name }}</span><br />
                    <span>Período: {{ room.course.period }}</span> <br />
                    <span>Frequência: {{ room.course.schedule }}</span> <br />

                    <router-link :to="{ name: 'salaAdmin', params: { roomId: room.roomId } }">
                        <button>Conferir</button>
                    </router-link>

                </li>
            </ul>
        </div>

        <div v-if="!loading && rooms.length === 0">
            Nenhuma cadastrada por enquanto...
        </div>
    </div>
</template>

<script>
export default {
    name: "RoomListEducator",
    data() {
        return {
            rooms: [],
            loading: true,
            errorMessage: ''
        };
    },
    mounted() {
        this.fetchRooms();
    },
    methods: {
        async fetchRooms() {
            const user = JSON.parse(localStorage.getItem('user'));
            const userId = user ? user.userId : null;

            if (!userId) {
                this.errorMessage = "Não foi possível recuperar o ID do usuário.";
                this.loading = false;
                return;
            }

            try {
                const response = await fetch('http://localhost:8080/api/educators');

                if (!response.ok) {
                    throw new Error("Erro ao buscar educadores");
                }

                const educators = await response.json();
                const educator = educators.find(educator => educator.user.userId === userId);

                if (!educator) {
                    throw new Error("Educador não encontrado");
                }

                const educatorId = educator.educatorId;
                const roomsResponse = await fetch(`http://localhost:8080/api/rooms/educator/${educatorId}`);

                if (!roomsResponse.ok) {
                    throw new Error("Erro ao carregar as salas.");
                }

                const roomsData = await roomsResponse.json();
                this.rooms = roomsData;
                this.loading = false;
            } catch (error) {
                this.errorMessage = error.message;
                this.loading = false;
            }
        }
    }
}
</script>

<style scoped>
.list {
    margin: 2em;
}

/* Estilo do botão 'Conferir' */
.list button {
    padding: 10px 20px;  /* Espaçamento interno do botão */
    margin-top: 10px;  /* Margem superior para espaçar do conteúdo acima */
    font-size: 1rem;  /* Tamanho da fonte */
    border-radius: 5px;  /* Bordas arredondadas */
    border: 1px solid #ccc;  /* Borda suave */
    background-color: black;  /* Cor de fundo preta para o botão */
    color: white;  /* Cor do texto do botão */
    cursor: pointer;  /* Aparece como ponteiro ao passar o mouse */
    transition: background-color 0.3s ease;  /* Animação suave ao passar o mouse */
    width: 100%;  /* O botão ocupará toda a largura disponível */
    text-align: center;  /* Garante que o texto do botão esteja centralizado */
}

/* Estilo do botão ao passar o mouse (hover) */
.list button:hover {
    background-color: #8c52ff;  /* Cor mais escura quando o mouse está sobre o botão */
}

</style>