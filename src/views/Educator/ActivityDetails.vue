<template>
    <NavReglusV3 />
    <div v-if="!loading && activity" id="activity">
        <h2>Detalhes da Atividade</h2>
        <p><strong>Descrição da Atividade:</strong> {{ activity.title }}</p>
        <p><strong>Pontuação Máxima:</strong> {{ activity.maxPoints }}</p>
        <p><strong>Prazo:</strong> {{ formattedDataLimit }}</p>
        <p><strong>Data de Criação:</strong> {{ formattedCreatedAt }}</p>
        <p><strong>Última Atualização:</strong> {{ formattedUpdatedAt }}</p>
    </div>
    <div v-else-if="!loading && !activity">
        <p>Atividade não encontrada.</p>
    </div>
    <div v-else>
        <p>Carregando...</p>
    </div>

    <FooterReglus />
</template>


<script>
import FooterReglus from "@/components/nav/FooterReglus.vue";
import NavReglusV3 from "@/components/nav/NavReglusV3.vue";

export default {
    name: "ActivityDetails",
    components: {
        NavReglusV3,
        FooterReglus
    },
    data() {
        return {
            loading: true,
            activity: null,
            userRole: ""
        };
    },
    computed: {
        formattedDataLimit() {
            return this.activity?.dataLimit
                ? new Date(this.activity.dataLimit).toLocaleString()
                : "Sem prazo definido";
        },
        formattedCreatedAt() {
            return this.activity?.createdAt
                ? new Date(this.activity.createdAt).toLocaleString()
                : "Não disponível";
        },
        formattedUpdatedAt() {
            return this.activity?.updatedAt
                ? new Date(this.activity.updatedAt).toLocaleString()
                : "Não disponível";
        }
    },
    async created() {
        const user = JSON.parse(localStorage.getItem("user"));
        const userType = localStorage.getItem("userType");

        this.userRole = userType || "";

        if (!user || this.userRole !== "EDUCATOR") {
            this.$router.push("/");
            return;
        }
        
        const activityId = this.$route.params.activityId;

        try {
            const response = await fetch(`http://localhost:8080/api/activities/${activityId}`);
            if (!response.ok) {
                throw new Error("Erro ao carregar a atividade.");
            }

            this.activity = await response.json();
        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            this.loading = false;
        }
    }
};
</script>


<style scoped>
#activity {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 60vh;
}
</style>