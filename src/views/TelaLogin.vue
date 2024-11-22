<template>
  <NavReglus />
    <div id="align">
      <div class="container mt-5">
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="form-group mb-3">
                <label for="email">Email</label>
                <input type="email" class="form-control" v-model="email" id="email" placeholder="Digite seu email">
              </div>
              <div class="form-group mb-3">
                <label for="password">Senha</label>
                <input type="password" class="form-control" v-model="password" id="password"
                  placeholder="Digite sua senha">
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-primary">Entrar</button>
              </div>
              <div class="text-center mt-3">
                <a href="#">Esqueceu senha?</a>
              </div>
              <div class="text-center mt-3">
                <span>Ainda não tem conta? </span><router-link to="/redirecionarlogin">Crie uma agora</router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import NavReglus from "@/components/nav/NavReglus.vue";
import axios from 'axios';

export default {
  name: 'TelaLogin',
  components: {
    NavReglus,
  },
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8080/api/auth/login', {
          email: this.email,
          password: this.password
        });

        const userType = response.data.user_type;
        const user = response.data.user;

        localStorage.setItem('userType', userType);
        localStorage.setItem('user', JSON.stringify(user));

        console.log("Login com sucesso, Tipo de usuário:", userType);
        if (userType === 'STUDENT') {
          this.$router.push('/inicioestudante'); 
        } else if (userType === 'EDUCATOR') {
          this.$router.push('/inicioeducador'); 
        } else {
          alert("Tipo de usuário desconhecido. Contate o administrador do Sistema.");
        }
      } catch (error) {
        console.error("Erro no login", error.response.data);
        alert("Falha no login: " + error.response.data);
      }
    }
  }
};
</script>

<style scoped>
#align {
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  margin-bottom: 2em;
  width: 600px;
}

.form-group label {
  font-weight: bold;
  font-size: 1.1em;
}

.form-control {
  border: none;
  outline: none;
  border-bottom: 1px solid #8c52ff;
  padding: 10px;
  transition: border-color 0.3s;
}

.form-control:focus,
.form-control:active {
  border: 1px solid #8c52ff;
  box-shadow: 0 1px 0 0 #8c52ff;
  color: #8c52ff;
}

.btn-primary {
  background-color: #8c52ff;
  border: none;
  border-radius: 3px;
  color: white;
  padding: 10px 20px;
  font-size: 1.1em;
  width: 100px;
  cursor: pointer;
  display: block;
  margin: 1em auto;
}

.btn-primary:hover {
  background-color: #5a3abf;
}

.card-body {
  border-radius: 10px;
  padding: 2em; 
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); 
  background: #fff !important;
  width: 600px;
}

.text-center a {
  color: #8c52ff;
  text-decoration: none;
}

.text-center a:hover {
  text-decoration: underline;
}

.text-center router-link {
  color: #8c52ff;
  text-decoration: none;
}

.text-center router-link:hover {
  text-decoration: underline;
}
</style>
