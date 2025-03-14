<template>
    <div class="container" v-if="userRole === 'EDUCATOR'">
        <h3>Cadastre uma sala nova e compartilhe conhecimento!</h3>
        <form @submit.prevent="submitRoom">
            <div class="form-group">
                <label for="name">Nome da Sala:</label>
                <input type="text" id="name" v-model="form.name" class="form-control mt-2"
                    placeholder="Turma do Prof° João" required />
            </div>

            <div class="form-group">
                <label for="startDate">Data de Início:</label>
                <input type="date" id="startDate" v-model="form.startDate" class="form-control mt-2" required />
            </div>

            <div class="form-group">
                <label for="endDate">Data de Término (Opcional):</label>
                <input type="date" id="endDate" v-model="form.endDate" class="form-control mt-2"
                    :placeholder="form.endDate ? '' : 'Data de término opcional'" />
            </div>

            <div class="form-group">
                <label for="courseName">Nome do Curso ou Matéria que será ensinada:</label>
                <input type="text" id="courseName" v-model="form.courseName" class="form-control mt-2"
                    placeholder="Nome do curso" required />
            </div>

            <div class="form-group">
                <label for="courseDescription">Descrição do Curso ou Matéria (opcional):</label>
                <textarea id="courseDescription" v-model="form.courseDescription" rows="4" class="form-control mt-2"
                    placeholder="Descrição do curso"></textarea>
            </div>

            <div class="form-group">
                <label for="coursePrice">Preço:</label>
                <p>Caso gratuito, defina como 0</p>
                <input type="number" id="coursePrice" v-model="form.coursePrice" class="form-control mt-2"
                    placeholder="Preço do curso" required />
            </div>

            <div class="form-group">
                <label for="coursePeriod">Período do Curso:</label>
                <input type="text" id="coursePeriod" v-model="form.coursePeriod" class="form-control mt-2"
                    placeholder="Período do curso" required />
            </div>

            <div class="form-group">
                <label for="courseSchedule">Frequência do Curso:</label>
                <input type="text" id="courseSchedule" v-model="form.courseSchedule" class="form-control mt-2"
                    placeholder="Frequência do curso" required />
            </div>

            <div v-if="successMessage" class="alert alert-success mt-3">
                {{ successMessage }} <strong> O formulário irá fechar em {{ timer }} ...</strong>
            </div>

            <div v-if="errorMessage" class="alert alert-danger mt-3">
                {{ errorMessage }}
            </div>

            <div class="btn">
                <button type="submit" class="btn btn-primary">Cadastrar Sala Nova</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "RoomRegister",
    data() {
        return {
            userRole: '',
            form: {
                name: '',
                startDate: '',
                endDate: '',
                courseName: '',
                courseDescription: '',
                coursePrice: 0,
                coursePeriod: '',
                courseSchedule: ''
            },
            successMessage: '',
            errorMessage: '',
            timer: 3,
            interval: null
        };
    },
    mounted() {
        const user = JSON.parse(localStorage.getItem('user'));
        const userType = localStorage.getItem('userType');

        this.userRole = userType || '';

        if (!user) {
            this.$router.push('/');
        }
    },
    methods: {
        async submitRoom() {
    this.successMessage = '';
    this.errorMessage = '';

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.userId;

    try {
        // Buscar o educador
        const response = await fetch('http://localhost:8080/api/educators');
        const educators = await response.json();

        if (!response.ok) {
            throw new Error('Erro ao buscar educadores');
        }

        const educator = educators.find(educator => educator.user.userId === userId);
        if (!educator) {
            throw new Error('Educador não encontrado');
        }

        const educatorId = educator.educatorId;

        // Definir um valor padrão para endDate se não for preenchido
        const startDate = this.form.startDate ? `${this.form.startDate}T00:00:00` : null;
        const endDate = this.form.endDate ? `${this.form.endDate}T00:00:00` : startDate;
        // Usa startDate como valor padrão

        // Criar o objeto Course
        const course = {
            name: this.form.courseName,
            description: this.form.courseDescription,
            price: this.form.coursePrice,
            period: this.form.coursePeriod,
            schedule: this.form.courseSchedule
        };

        // Criar o objeto Room com o Course e Educator associados
        const requestBody = {
            educator: { educatorId: educatorId },
            name: this.form.name,
            startDate: startDate,
            endDate: endDate, // Usa o valor padrão se não for preenchido
            course: course
        };

        // Enviar a requisição para criar a sala
        const createRoomResponse = await fetch('http://localhost:8080/api/rooms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!createRoomResponse.ok) {
            throw new Error('Erro ao cadastrar a sala');
        }

        this.successMessage = 'Sala cadastrada com sucesso!';
        this.startTimer();
        window.location.reload();
    } catch (error) {
        this.errorMessage = error.message;
    }
},

    startTimer() {
        this.interval = setInterval(() => {
            if (this.timer > 0) {
                this.timer -= 1;
            } else {
                clearInterval(this.interval);
                this.$emit('close-room-register');
            }
        }, 1000);
    }
}
}
</script>

<style scoped>
.container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    font-weight: bold;
}

.btn {
    text-align: center;
    margin-top: 20px;
}

.alert {
    margin-top: 20px;
}

/* Estilo do botão 'Cadastrar Sala Nova' */
.btn button {
    padding: 10px 20px;  /* Espaçamento interno do botão */
    margin: 5px 0;  /* Espaçamento entre os botões */
    font-size: 1rem;  /* Tamanho da fonte */
    border-radius: 5px;  /* Bordas arredondadas */
    border: 1px solid #ccc;  /* Borda suave */
    background-color: black;  /* Cor de fundo preta para o botão */
    color: white;  /* Cor do texto do botão */
    cursor: pointer;  /* Aparece como ponteiro ao passar o mouse */
    transition: background-color 0.3s ease;  /* Animação suave ao passar o mouse */
    text-align: center;  /* Garante que o texto do botão esteja centralizado */
    width: 100%;  /* O botão ocupará toda a largura disponível */
}

/* Estilo do botão ao passar o mouse (hover) */
.btn button:hover {
    background-color: #8c52ff;  /* Cor mais escura quando o mouse está sobre o botão */
}
</style>