<template>
  <div>
    <NavReglus />
  </div>
    <div class="row justify-content-center">
        <div class="card">
          <div class="card-body">
            <h2>Bem-vindo(a) Estudante!</h2>
            <p>Complete seu cadastro.</p>
            <form @submit.prevent="register">
              <div class="form-group">
                <label for="name">Nome Completo</label>
                <input type="text" id="name" v-model="form.name" class="form-control" required />
              </div>
              <div class="form-group">
                <label for="dateBirth">Data de Nascimento</label>
                <input type="date" id="dateBirth" v-model="form.dateBirth" class="form-control" required />
              </div>
              <div class="form-group">
                <label for="gender">Gênero</label>
                <select id="gender" v-model="form.gender" class="form-control" required>
                  <option value="MALE">Masculino</option>
                  <option value="FEMALE">Feminino</option>
                </select>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="form.email" class="form-control" required />
              </div>
              <div class="form-group select-container">
                <label for="educationLevel">Grau de Formação</label>
                <select id="educationLevel" v-model="form.educationLevel" class="form-control" required>
                  <option disabled value="">Selecione o grau de formação</option>
                  <option>Ensino Fundamental</option>
                  <option>Ensino Médio</option>
                  <option>Superior Completo</option>
                  <option>Superior Incompleto</option>
                  <option>Pós-graduação</option>
                  <option>Mestrado</option>
                  <option>Doutorado</option>
                </select>
              </div>
              <div class="form-group">
                <label for="deficiencia">Pessoa com Deficiência?</label>
                <select id="deficiencia" v-model="form.deficiencia" class="form-control" required>
                  <option value="sim">Sim</option>
                  <option value="nao">Não</option>
                </select>
              </div>
              <div class="form-group" v-if="form.deficiencia === 'sim'">
                <label for="casosim">Qual o tipo de deficiência?</label>
                <select id="casosim" v-model="form.casosim" class="form-control" required>
                  <option disabled value="">Selecione o tipo de deficiência</option>
                  <option>Auditiva</option>
                  <option>Visual</option>
                  <option>Física</option>
                  <option>Intelectual</option>
                  <option>Múltipla</option>
                </select>
              </div>
              <div class="form-group">
                <label for="instituteName">Nome do Instituto em que estuda atualmente</label>
                <input type="text" id="instituteName" v-model="form.instituteName" class="form-control" required />
              </div>
              <div class="form-group">
                <label for="state">Estado</label>
                <input type="text" id="state" v-model="form.state" class="form-control" required />
              </div>
              <div class="form-group">
                <label for="city">Cidade</label>
                <input type="text" id="city" v-model="form.city" class="form-control" required />
              </div>
              <div class="form-group">
                <label for="password">Senha</label>
                <input type="password" id="password" v-model="form.passwordHash" class="form-control" required />
              </div>
              <div class="form-group">
                <label for="password_confirmation">Confirmar Senha</label>
                <input type="password" id="password_confirmation" v-model="form.password_confirmation" class="form-control" required />
              </div>
              <div v-if="passwordMismatch" class="alert alert-danger">
                As senhas não coincidem.
              </div>
              <button type="submit" class="btn">Cadastrar</button>
            </form>
          </div>
        </div>
      </div>
</template>

<script>
import NavReglus from "@/components/nav/NavReglus.vue";
export default {
  name: "TelaCadastroEstudante",
  components: {
    NavReglus,
  },
  data() {
    return {
      form: {
        userType: 'STUDENT',
        name: '',
        dateBirth: '',
        email: '',
        gender: '',
        passwordHash: '',
        disability: '',
        educationLevel: '',
        instituteName: '',
        city: '',
        state: '',
        casosim: '',
        FinalObservations: ''
      },
      passwordMismatch: false
    };
  },
  methods: {
    async register() {
      try {
        const response = await fetch('http://localhost:8080/api/students', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.form)
        });

        const result = await response.json();

        if (response.ok) {
          this.responseMessage = 'Estudante cadastrado com sucesso!';
          this.responseColor = 'green';
          this.resetForm();
          this.$router.push('/login');
        } else {
          this.responseMessage = `Erro: ${result}`;
          this.responseColor = 'red';
        }
      } catch (error) {
        console.error('Error:', error);
        this.responseMessage = 'Erro ao cadastrar estudante.';
        this.responseColor = 'red';
      }
    },
    resetForm() {
      this.form = {
        userType: "STUDENT",
        name: '',
        dateBirth: '',
        gender: '',
        email: '',
        passwordHash: '',
        disability: false,
        educationLevel: '',
        instituteName: '',
        experienceYears: null,
        bio: ''
      };
      this.responseMessage = ''; // Limpa a mensagem de resposta
    }
  }
}
</script>

<style scoped>
.card {
  border: 1px solid #8c52ff73;
  padding: 1em 2em;
  margin-bottom: 5em;
  width: 600px;
}

.form-group {
  margin-bottom: 1em;
}

.form-group label {
  font-weight: bold;
  font-size: 1.1em;
  margin-bottom: 5px;
}

input {
  border: none;
  border: 1px solid #fff;
  border-bottom: 1px solid #8c52ff;
}

input:active,
input:focus {
  transition: 2s;
  border: 1px solid #8c52ff;
  color: #8c52ff;
  box-shadow: 0 1px 0 0 #8c52ff;
}

select {
  border: none;
  border: 1px solid #fff;
  border-bottom: 1px solid #8c52ff;
  background: transparent;
  padding: 5px;
  font-size: 16px;
  transition: 2s;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

select:focus,
select:active {
  border: 1px solid #8c52ff;
  color: #8c52ff;
  box-shadow: 0 1px 0 0 #8c52ff;
  outline: none;
}

.btn {
  background-color: #000000;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 10px 40px;
  font-size: 16px;
  cursor: pointer;
  display: block;
  margin: 0 auto;
}

.btn:hover {
  opacity: 0.8;
  transition: 2s;
}
</style>
