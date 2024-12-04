<template>
    <div>
      <NavReglus />
      <!-- <img src="logoreglus.png" alt="Logo Reglus" class="logo"> -->
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h2>Estudante, queremos te conhecer melhor!</h2>
                <p>Complete seu cadastro com informações adicionais.</p>
                <form @submit.prevent="register">
                  <!-- Informações Pessoais Adicionais -->
                  <h3>Informações Pessoais Adicionais</h3>
                  <div class="form-group">
                    <label for="comquem">Com quem você mora? (Marque todas as que se aplicam)</label>
                    <div>
                      <input type="checkbox" id="pais" v-model="form.comquem.pais" />
                      <label for="pais">Pais</label>
                      <input type="checkbox" id="avos" v-model="form.comquem.avos" />
                      <label for="avos">Avós</label>
                      <input type="checkbox" id="tios" v-model="form.comquem.tios" />
                      <label for="tios">Tios(as)</label>
                      <input type="checkbox" id="irmaos" v-model="form.comquem.irmaos" />
                      <label for="irmaos">Irmãos(ãs)</label>
                      <input type="checkbox" id="outros" v-model="form.comquem.outros" />
                      <label for="outros">Outros: <input type="text" v-model="form.comquem.outros_text" /></label>
                    </div>
                  </div>
  
                  <!-- Aspectos Sociais e Familiares -->
                  <h3>Aspectos Sociais e Familiares</h3>
                  <div class="form-group">
                    <label for="relacaoColegas">Como é a sua relação com os seus colegas de classe?</label>
                    <select id="relacaoColegas" v-model="form.relacaoColegas" class="form-control" required>
                      <option value="muitoBoa">Muito boa</option>
                      <option value="boa">Boa</option>
                      <option value="regular">Regular</option>
                      <option value="ruim">Ruim</option>
                      <option value="muitoRuim">Muito ruim</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="relacaoProfessores">Como é a sua relação com os professores?</label>
                    <select id="relacaoProfessores" v-model="form.relacaoProfessores" class="form-control" required>
                      <option value="muitoBoa">Muito boa</option>
                      <option value="boa">Boa</option>
                      <option value="regular">Regular</option>
                      <option value="ruim">Ruim</option>
                      <option value="muitoRuim">Muito ruim</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="relacaoFamilia">Como é a sua relação com sua família em casa?</label>
                    <select id="relacaoFamilia" v-model="form.relacaoFamilia" class="form-control" required>
                      <option value="muitoBoa">Muito boa</option>
                      <option value="boa">Boa</option>
                      <option value="regular">Regular</option>
                      <option value="ruim">Ruim</option>
                      <option value="muitoRuim">Muito ruim</option>
                    </select>
                  </div>
  
                  <!-- Saúde e Bem-Estar -->
                  <h3>Saúde e Bem-Estar</h3>
                  <div class="form-group">
                    <label for="condicaoSaude">Você tem alguma condição de saúde ou necessidade especial que a escola deveria conhecer?</label>
                    <select id="condicaoSaude" v-model="form.condicaoSaude" class="form-control" required>
                      <option value="sim">Sim</option>
                      <option value="nao">Não</option>
                    </select>
                  </div>
                  <div class="form-group" v-if="form.condicaoSaude === 'sim'">
                    <label for=" condicaoSaudeText">Descreva sua condição de saúde ou necessidade especial:</label>
                    <textarea id="condicaoSaudeText" v-model="form.condicaoSaudeText" class="form-control" required></textarea>
                  </div>
                  <div class="form-group">
                    <label for="atividadeFisica">Você pratica alguma atividade física regularmente?</label>
                    <select id="atividadeFisica" v-model="form.atividadeFisica" class="form-control" required>
                      <option value="sim">Sim</option>
                      <option value="nao">Não</option>
                    </select>
                  </div>
                  <div class="form-group" v-if="form.atividadeFisica === 'sim'">
                    <label for="atividadeFisicaText">Descreva sua atividade física regular:</label>
                    <textarea id="atividadeFisicaText" v-model="form.atividadeFisicaText" class="form-control" required></textarea>
                  </div>
                  <div class="form-group">
                    <label for="alimentacao">Como você avalia a sua alimentação diária?</label>
                    <select id="alimentacao" v-model="form.alimentacao" class="form-control" required>
                      <option value="muitoSaudavel">Muito saudável</option>
                      <option value="saudavel">Saudável</option>
                      <option value="regular">Regular</option>
                      <option value="poucoSaudavel">Pouco saudável</option>
                      <option value="nadaSaudavel">Nada saudável</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="horasDormir">Quantas horas você costuma dormir por noite?</label>
                    <select id="horasDormir" v-model="form.horasDormir" class="form-control" required>
                      <option value="menosDe6">Menos de 6 horas</option>
                      <option value="6-7">6-7 horas</option>
                      <option value="7-8">7-8 horas</option>
                      <option value="8-9">8-9 horas</option>
                      <option value="maisDe9">Mais de 9 horas</option>
                    </select>
                  </div>
  
                  <!-- Interesses e Hobbies -->
                  <h3>Interesses e Hobbies</h3>
                  <div class="form-group">
                    <label for="atividadesPreferidas">Quais são suas atividades preferidas fora do horário escolar? (Marque todas as que se aplicam)</label>
                    <div>
                      <input type="checkbox" id="esportes" v-model="form.atividadesPreferidas.esportes" />
                      <label for="esportes">Esportes</label>
                      <input type="checkbox" id="leitura" v-model="form.atividadesPreferidas.leitura" />
                      <label for="leitura">Leitura</label>
                      <input type="checkbox" id="jogosEletronicos" v-model="form.atividadesPreferidas.jogosEletronicos" />
                      <label for="jogosEletronicos">Jogos eletrônicos</label>
                      <input type="checkbox" id="musica" v-model="form.atividadesPreferidas.musica" />
                      <label for="musica">Música</label>
                      <input type="checkbox" id="arte" v-model="form.atividadesPreferidas.arte" />
                      <label for="arte">Arte</label>
                      <input type="checkbox" id="voluntariado" v-model="form.atividadesPreferidas.voluntariado" />
                      <label for="voluntariado">Voluntariado</label>
                      <input type="checkbox" id="outros" v-model="form.atividadesPreferidas.outros" />
                      <label for="outros">Outros: <input type="text" v-model="form.atividadesPreferidas.outros_text" /></label>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="sonhosObjetivos">Quais são seus sonhos e objetivos para o futuro?</label>
                    <textarea id="sonhosObjetivos" v-model="form.sonhosObjetivos" class="form-control" required></textarea>
                  </div>
  
                  <!-- Hábitos de Estudo -->
                  <h3>Hábitos de Estudo</h3>
                  <div class="form-group">
                    <label for="comoEstuda">Como você costuma estudar? (Marque todas as que se aplicam)</label>
                    <div>
                      <input type="checkbox" id="sozinho" v-model="form.comoEstuda.sozinho" />
                      <label for="sozinho">Sozinho(a)</label>
                      <input type="checkbox" id="comAmigos" v-model="form.comoEstuda.comAmigos" />
                      <label for="comAmigos">Com amigos</label>
                      <input type="checkbox" id="comAjudaFamiliares" v-model="form.comoEstuda.comAjudaFamiliares" />
                      <label for="comAjudaFamiliares">Com ajuda de familiares</label>
                      <input type="checkbox" id="aulasParticulares" v-model="form.comoEstuda.aulasParticulares" />
                      <label for="aulasParticulares">Aulas particulares</label>
                      <input type="checkbox" id="outros" v-model="form.comoEstuda.outros" />
                      <label for="outros">Outros: <input type="text" v-model="form.comoEstuda.outros_text" /></label>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="horasEstudo">Quantas horas por dia você dedica aos estudos fora da escola?</label>
                    <select id="horasEstudo" v-model="form.horasEstudo" class="form-control" required>
                      <option value="menosDe1">Menos de 1 hora</option>
                      <option value="1-2">1-2 horas</option>
                      <option value="2-3">2-3 horas</option>
                      <option value="maisDe3">Mais de 3 horas</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="ondeEstuda">Onde você costuma estudar? (Marque todas as que se aplicam)</label>
                    <div>
                      <input type="checkbox" id="emCasa" v-model="form.ondeEstuda.emCasa" />
                      <label for="emCasa">Em casa</label>
                      <input type="checkbox" id="naBiblioteca" v-model="form.ondeEstuda.naBiblioteca" />
                      <label for="naBiblioteca">Na biblioteca</label>
                      <input type="checkbox" id="naEscola" v-model="form.ondeEstuda.naEscola" />
                      <label for="naEscola">Na escola</label>
                      <input type="checkbox" id="outros" v-model="form.ondeEstuda.outros" />
                      <label for="outros">Outros: <input type="text" v-model="form.ondeEstuda.outros_text" /></label>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="planoEstudo">Você segue algum plano ou método de estudos? Se sim, qual?</label>
                    <textarea id="planoEstudo" v-model="form.planoEstudo" class="form-control" required></textarea>
                  </div>
  
                  <!-- Autoavaliação -->
                  <h3>Autoavaliação</h3>
                  <div class="form-group">
                    <label for="desempenhoEscolar">Como você avalia o seu desempenho escolar em geral?</label>
                    <select id="desempenhoEscolar" v-model="form.desempenhoEscolar" class="form-control" required>
                      <option value="muitoBom">Muito bom</option>
                      <option value="bom">Bom</option>
                      <option value="regular">Regular</option>
                      <option value="ruim">Ruim</option>
                      <option value="muitoRuim">Muito ruim</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="qualidades">Quais são suas principais qualidades como estudante?</label>
                    <textarea id="qualidades" v-model="form.qualidades" class="form-control" required></textarea>
                  </div>
                  <div class="form-group">
                    <label for="pontosMelhoria">Quais são os principais pontos que você acha que precisa melhorar?</label>
                    <textarea id="pontosMelhoria" v-model="form.pontosMelhoria" class="form-control" required></textarea>
                  </div>
  
                  <!-- Observações Finais -->
                  <h3>Observações Finais</h3>
                  <div class="form-group">
                    <label for="observacoes">Existe algo mais que você gostaria de compartilhar que poderia ajudar os pedagogos e psicopedagogos a entender melhor suas dificuldades e como te ajudar?</label>
                    <textarea id="observacoes" v-model="form.observacoes" class="form-control" required></textarea>
                  </div>
                  <button class="btn"><router-link to="/inicial">Cadastre-se</router-link></button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import NavReglus from "@/components/nav/NavReglus.vue";
  export default {
    name: "FormsAluno",
    components: {
      NavReglus,
    },
    data() {
      return {
        form: {
          comquem: {
            pais: false,
            avos: false,
            tios: false,
            irmaos: false,
            outros: false,
            outros_text: ''
          },
          relacaoColegas: '',
          relacaoProfessores: '',
          relacaoFamilia: '',
          condicaoSaude: '',
          condicaoSaudeText: '',
          atividadeFisica: '',
          atividadeFisicaText: '',
          alimentacao: '',
          horasDormir: '',
          atividadesPreferidas: {
            esportes: false,
            leitura: false,
            jogosEletronicos: false,
            musica: false,
            arte: false,
            voluntariado: false,
            outros: false,
            outros_text: ''
          },
          sonhosObjetivos: '',
          comoEstuda: {
            sozinho: false,
            comAmigos: false,
            comAjudaFamiliares: false,
            aulasParticulares: false,
            outros: false,
            outros_text: ''
          },
          horasEstudo: '',
          ondeEstuda: {
            emCasa: false,
            naBiblioteca: false,
            naEscola: false,
            outros: false,
            outros_text: ''
          },
          planoEstudo: '',
          desempenhoEscolar: '',
          qualidades: '',
          pontosMelhoria: '',
          observacoes: ''
        },
        passwordMismatch: false
      }
    },
    mounted() {
    const user = JSON.parse(localStorage.getItem('user'));
    const userType = localStorage.getItem('userType');
    
    if (!user || userType !== 'STUDENT') {
      this.$router.push('/');
    }
  },
    methods: {
      handleFileUpload(event) {
        this.form.comprovante = event.target.files[0];
      },
  
      register() {
        // Chamar API para cadastrar usuário
        if (this.form.password !== this.form.password_confirmation) {
          this.passwordMismatch = true;
        } else {
          this.passwordMismatch = false;
          // Continue com a submissão do formulário, por exemplo, enviar para o servidor
          alert('Formulário enviado com sucesso!');
        }
        console.log('Cadastro realizado com sucesso!');
      },
  
      watch: {
        'form.password': function () {
          this.passwordMismatch = false;
        },
        'form.password_confirmation': function () {
          this.passwordMismatch = false;
        }
      }
    }
  }
  </script>
  
  <style scoped>
  /*
  .logo {
    display: block;
    margin: 0 auto;
    width: 250px;
  }
  */
  
  .card {
    border: 1px solid #8c52ff73;
    padding: 1em 2em;
    margin-bottom: 5em;
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
    color : #8c52ff;
    box-shadow: 0 1px 0 0 #8c52ff;
    outline: none;
  }
  
  .btn-primary {
    background-color: #000000;
    border: none;
    border-radius: 3px;
    color: white;
    padding: 10px 40px;
    font-size: 16px;
    cursor: pointer;
    display: block;
    margin: 0 auto;
  }
  
  .btn-primary:hover {
    opacity: 0.8;
    transition: 2s;
  }

  .form-group div {
    display: flex;
    flex-direction: column; /* Coloca cada par de checkbox e label em uma nova linha */
  }
  
  .form-group div label {
    display: flex; /* Permite que o checkbox e o texto fiquem lado a lado */
    align-items: center;
    margin-bottom: 5px; /* Espaçamento entre os itens de checkbox */
  }
  
  .form-group div label input[type="checkbox"] {
    margin-right: 10px; /* Espaçamento entre o checkbox e o texto */
    order: 0; /* O checkbox ficará à frente */
  }

  .btn {
    background-color: #000000;
    border: none;
    border-radius: 3px;
    padding: 10px 40px;
    font-size: 16px;
    cursor: pointer;
    display: block;
    margin: 0 auto;
  }
  
  .btn a {
    color: #fff;
  }
  
  </style>