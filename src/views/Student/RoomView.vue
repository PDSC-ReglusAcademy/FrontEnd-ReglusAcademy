<template>
    <NavReglus />
    <h1>REGLUS ROOM</h1>
    <main>
        <div class="registered">
            <div class="header">
                <div></div>
                <h2>Inscrito</h2>
                <router-link to="/salasinscritas" class="btnLink">Ver todas</router-link>
            </div>
            <ul>
                <li v-for="room in enrolledRooms" :key="room.roomId">
                    <strong>{{ room.name }}</strong>
                    <span>{{ room.course.name }}</span>
                    <span>{{ room.educator.user.name }}</span>
                    <router-link :to="{ name: 'sala', params: { roomId: room.roomId } }" class="btn">
                        Ver Detalhes
                    </router-link>
                </li>
            </ul>
        </div>

        <div class="available">
            <div class="header">
                <div></div>
                <h2>Disponíveis</h2>
                <router-link to="/salasdisponiveis" class="btnLink">Ver todas</router-link>
            </div>
            <ul>
                <li v-for="room in rooms" :key="room.roomId">
                    <strong>{{ room.name }}</strong>
                    <span>{{ room.course.name }}</span>
                    <span>Preço: R$ {{ room.course.price }}</span>
                    <span>{{ room.educator.user.name }}</span>

                    <button @click="enrollInRoom(room.roomId)" class="btn">Inscrever-se</button>
                </li>
            </ul>
        </div>
    </main>
    <FooterReglus />
</template>

<script>

import NavReglus from "@/components/nav/NavReglusV2.vue";
import FooterReglus from "@/components/nav/FooterReglus.vue";

export default {
    name: "RoomView",
    components: {
        NavReglus,
        FooterReglus
    },
    data() {
        return {
            userName: '',
            userRole: '',
            rooms: [],
            enrolledRooms: []
        };
    },
    mounted() {
        const user = JSON.parse(localStorage.getItem("user"));
        const userType = localStorage.getItem("userType");

        console.log(user)

        this.userRole = userType || "";

        if (!user || this.userRole !== "STUDENT") {
            this.$router.push("/");
        } else {
            this.userName = user.name;
            this.fetchAvailableRooms();
            this.fetchEnrolledRooms();
        }
    },
    methods: {
        async enrollInRoom(roomId) {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const studentEmail = user ? user.email : null;

                if (!studentEmail) {
                    throw new Error('Email do estudante não encontrado');
                }

                const studentResponse = await fetch(`http://localhost:8080/api/students/email/${encodeURIComponent(studentEmail)}`);
                const studentData = await studentResponse.json();
                const studentId = studentData.studentId;

                const enrollResponse = await fetch(`http://localhost:8080/api/rooms/enroll?studentId=${studentId}&roomId=${roomId}`, {
                    method: 'POST'
                });

                if (!enrollResponse.ok) {
                    throw new Error('Erro ao inscrever na sala');
                }

                alert('Inscrição realizada com sucesso!');

                console.log('Atualizando salas...');
                this.fetchAvailableRooms();
                this.fetchEnrolledRooms();

            } catch (error) {
                console.error(error);
                alert('Erro ao inscrever na sala!');
            }
        },

        async fetchEnrolledRooms() {
            const user = JSON.parse(localStorage.getItem('user'));
            const studentEmail = user ? user.email : null;

            if (!studentEmail) {
                return [];
            }

            try {
                const studentResponse = await fetch(`http://localhost:8080/api/students/email/${encodeURIComponent(studentEmail)}`);
                const studentData = await studentResponse.json();
                const studentId = studentData.studentId;
                const enrolledRoomsResponse = await fetch(`http://localhost:8080/api/rooms/student/${studentId}`);

                if (!enrolledRoomsResponse.ok) {
                    throw new Error('Erro ao recuperar salas inscritas');
                }

                this.enrolledRooms = await enrolledRoomsResponse.json();
            } catch (error) {
                console.error(error);
                this.enrolledRooms = [];
            }
        },

        async fetchAvailableRooms() {
            const user = JSON.parse(localStorage.getItem('user'));
            const studentEmail = user ? user.email : null;

            if (!studentEmail) {
                return [];
            }

            try {
                const studentResponse = await fetch(`http://localhost:8080/api/students/email/${encodeURIComponent(studentEmail)}`);
                const studentData = await studentResponse.json();
                const studentId = studentData.studentId;

                const roomsResponse = await fetch(`http://localhost:8080/api/rooms/available?studentId=${studentId}`)
                if (!roomsResponse.ok) {
                    throw new Error('Erro ao recuperar salas disponíveis');
                }

                const roomsData = await roomsResponse.json();
                this.rooms = [...roomsData];
            } catch (error) {
                console.error('Erro na recuperação das salas:', error);
                this.rooms = [];
            }
        },
    }
}
</script>

<style scoped>
main {
    display: grid;
    padding: 0em 2em;
    gap: 1em;
    height: 100vh;
    grid-template-columns: 1fr; /* Mantém apenas uma coluna para as caixas ficarem uma abaixo da outra */
    grid-template-rows: auto auto; /* Permite que as caixas se ajustem de acordo com o conteúdo */
}

h1 {
    font-size: 3em;
    text-align: center;
    margin-bottom: 1em;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0em 5em;
}

.header h2 {
    font-size: 1.5em;
    text-align: center;
}

ul {
    min-height: 250px;
}

.available, .registered {
    width: 100%; /* Garante que as caixas ocupem toda a largura disponível */
    height: 100%;
    border: 1px solid rgb(180, 178, 178);
    box-shadow: 0 0 10px #8c52ff;
    border-radius: 8px;
    gap: 1em;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-start; /* Alinha o conteúdo ao topo */
    padding: 1em;
    font-size: 1.1em;
}

.registered {
    grid-row: 1 / 2; /* A primeira caixa ficará no topo */
}

.available {
    grid-row: 2 / 3; /* A segunda caixa ficará abaixo da primeira */
}

.registered li, .available li {
    background: #fafafa;
    height: 250px;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    border-left: 5px solid var(--lilashover);
    justify-content: space-between;
    overflow: hidden;
}

.registered li span,
.registered li strong,
.available li span,
.available li strong {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 10px;
}

.btnLink {
    background-color: black;
    color: white;
    font-weight: bold;
    border-radius: 8px;
    padding: 10px 20px;
    text-decoration: none;
    display: inline-block;
    text-align: center;
    transition: background-color 0.3s;
}

.btnLink:hover {
    background-color: #8c52ff;
}

.btn {
    margin-top: 1em;
    background: var(--lilashover);
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    font-size: 1em;
    width: 100%;
    cursor: pointer;
    bottom: 0;
    transition: background 1s;
}
</style>