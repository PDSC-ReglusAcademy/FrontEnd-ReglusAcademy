<template>
  <div>
    <NavReglus />
  </div>
  <div class="container">
    <img src="logoreglus.png" alt="Logo Reglus" class="logo">
    <h1 class="title"><strong>Descubra uma educação inclusiva e gratuita conosco</strong></h1>
    <p class="subtitle">Você é um...</p>
    <div class="buttons">
      <router-link to="/cadastroprofessor" class="btn">Professor</router-link>
      <span class="or">ou</span>
      <router-link to="/cadastro" class="btn">Estudante</router-link>
    </div>
  </div>
</template>
<script>
import NavReglus from "@/components/nav/NavReglus.vue";

export default {
  name: "CadastroTela",
  components: {
    NavReglus,
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  background-color: #ffffff;
}

.logo {
  width: 300px;
  height: auto;
  margin-bottom: 10px;
}

.title {
  font-size: 1.5rem;
  width: 50%;
  text-align: center;
  margin-bottom: 20px;
}

.subtitle {
  font-size: 1.5rem;
  margin-bottom: 30px;
}

.buttons {
  display: flex;
  align-items: center;
  gap: 3em
}

.buttons a {
  color: white;
}

.btn {
  background-color: #8C52FF;
  color: white;
  padding: 15px 50px;
  border: none;
  border-radius: 20px;
  font-size: 1.2rem;
  cursor: pointer;
  margin: 0 10px;
}

.or {
  font-size: 1.2rem;
  margin: 0 10px;
}
</style>