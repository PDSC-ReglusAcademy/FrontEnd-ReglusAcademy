<template>
    <NavReglusV3 />
    <div v-if="!loading && student" id="raizFicha">
        <h3 style="text-align: center;">Ficha de Acompanhamento</h3>
        <div id="ficha">
            <div class="descPerson">
                <h4>Informações Pessoais</h4>
                <p><strong>Nome:</strong> {{ student.user.name }}</p>
                <p><strong>Email:</strong> {{ student.user.email }}</p>
                <p><strong>Data de Nascimento:</strong> {{ student.user.dateBirth }}</p>
                <p><strong>Sexo:</strong> {{ student.user.gender }}</p>
                <p><strong>Instituição:</strong> {{ student.user.instituteName }}</p>
                <h4>Observações Finais</h4>
                <p>{{ student.finalObservations }}</p>

                <h4>Localização</h4>
                <p><strong>Estado:</strong> {{ student.state }}</p>
                <p><strong>Cidade:</strong> {{ student.city }}</p>
            </div>

            <div class="socialAspects">
                <h4>Aspectos Sociais</h4>
                <p><strong>Com quem mora:</strong> {{ student.socialAspect.livingWith }}</p>
                <p><strong>Relação com colegas:</strong> {{ student.socialAspect.relationshipWithClassmates }}</p>
                <p><strong>Relação com professores:</strong> {{ student.socialAspect.relationshipWithTeachers }}</p>
                <p><strong>Relação com a família:</strong> {{ student.socialAspect.relationshipWithFamily }}</p>
            </div>

            <div class="healthWellbeing">
                <h4>Saúde e Bem-estar</h4>
                <p><strong>Condição de Saúde:</strong> {{ student.healthWellbeing.healthCondition }}</p>
                <p><strong>Atividade Física:</strong> {{ student.healthWellbeing.physicalActivity }}</p>
                <p><strong>Avaliação Dietética:</strong> {{ student.healthWellbeing.dietaryEvaluation }}</p>
                <p><strong>Horas de Sono:</strong> {{ student.healthWellbeing.sleepHours }}</p>
            </div>

            <div class="interestHobby">
                <h4>Hobbies e Interesses</h4>
                <p><strong>Atividades fora da escola:</strong> {{ student.interestHobby.activitiesOutsideSchool }}</p>
                <p><strong>Sonhos e Objetivos:</strong> {{ student.interestHobby.dreamsGoals }}</p>
            </div>

            <div class="studyHabits">
                <h4>Hábitos de Estudo</h4>
                <p><strong>Métodos de Estudo:</strong> {{ student.studyHabit.studyMethods }}</p>
                <p><strong>Horas de Estudo por Dia:</strong> {{ student.studyHabit.studyHoursPerDay }}</p>
                <p><strong>Locais de Estudo:</strong> {{ student.studyHabit.studyLocations }}</p>
                <p><strong>Plano de Estudo:</strong> {{ student.studyHabit.studyPlan }}</p>
            </div>

            <div class="selfAssessment">
                <h4>Avaliação Pessoal</h4>
                <p><strong>Avaliação de Desempenho:</strong> {{ student.selfAssessment.performanceEvaluation }}</p>
                <p><strong>Pontos Fortes:</strong> {{ student.selfAssessment.strengths }}</p>
                <p><strong>Áreas de Melhoria:</strong> {{ student.selfAssessment.improvementAreas }}</p>
            </div>
        </div>
    </div>

    <div v-if="loading" class="loading-spinner">
        Carregando...
    </div>

    <div v-if="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
    </div>

    <FooterReglus />
</template>

<script>
import FooterReglus from "@/components/nav/FooterReglus.vue";
import NavReglusV3 from "@/components/nav/NavReglusV3.vue";

export default {
    name: "StudentDetails",
    props: {
        studentId: {
            type: Number,
            required: true
        }
    },
    components: {
        NavReglusV3,
        FooterReglus
    },
    data() {
        return {
            student: null,
            loading: true,
            errorMessage: '',
            userRole: ""
        };
    },
    mounted() {
        const user = JSON.parse(localStorage.getItem("user"));
        const userType = localStorage.getItem("userType");

        this.userRole = userType || "";

        if (!user || this.userRole !== "EDUCATOR") {
            this.$router.push("/");
            return;
        }

        this.fetchStudentDetails();
    },
    methods: {
        async fetchStudentDetails() {
            const studentId = this.$route.params.studentId;

            try {
                const response = await fetch(`http://localhost:8080/api/students/id/${studentId}`);
                if (!response.ok) {
                    throw new Error("Erro ao carregar os detalhes do estudante.");
                }
                this.student = await response.json();
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
#raizFicha {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

#ficha {
    display: grid;
    grid-template-columns: 40% auto;
    grid-template-rows: auto;
    grid-auto-flow: column;
    gap: 1em;
    align-items: start;
    padding: 0em 5em;
}

h3 {
    font-size: 2em;
    margin-bottom: 0.5em;
}

.descPerson,
.socialAspects,
.healthWellbeing,
.interestHobby,
.studyHabits,
.selfAssessment {
    padding: 1em;
    border-radius: 10px;
}

.descPerson {
    border: 2px solid var(--roxo);
    grid-column: 1 / 2;
    grid-row: 1 / span 2;
}

.socialAspects {
    border: 2px solid var(--verde);
    grid-column: 2 / 3;
    grid-row: 1 / span 1;
}

.healthWellbeing {
    border: 2px solid var(--lilas);
}

.interestHobby {
    border: 2px solid var(--lilashover);
}

.studyHabits {
    border: 2px solid var(--azul);
}

.selfAssessment {
    border: 2px solid var(--verde);
}

.socialAspects,
.healthWellbeing,
.interestHobby,
.studyHabits,
.selfAssessment {
    grid-column: 2 / 3;
    align-self: start;
    height: 100%;
}
</style>
