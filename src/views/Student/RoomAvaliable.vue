<template>
    <NavReglus />
    <h1>SALAS DISPONÍVEIS</h1>
    <main>
        <div class="available">
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

            } catch (error) {
                console.error(error);
                alert('Erro ao inscrever na sala!');
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
    height: 100vh;
}

h1 {
    font-size: 3em;
    text-align: center;
    margin-bottom: 1em;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

ul {
    min-height: 250px;
}

.available {
    width: calc(100% - 60px);
    height: calc(100vh - 45px);
    margin: 30px;
    border: 1px solid rgb(180, 178, 178);
    box-shadow: 0 0 10px #8c52ff;
    border-radius: 8px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1em;
    font-size: 1.1em;
}

.available li {
    background: #fafafa;
    height: 250px;
    padding: 10px;
    border-radius: 10px; 
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1); 
    border-left: 5px solid var(--verde); 
    justify-content: space-between;
    overflow: hidden;
}

.available li span,
.available li strong {
    display: block; 
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 10px;
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