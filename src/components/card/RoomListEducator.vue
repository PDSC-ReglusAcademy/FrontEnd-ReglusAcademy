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
</style>