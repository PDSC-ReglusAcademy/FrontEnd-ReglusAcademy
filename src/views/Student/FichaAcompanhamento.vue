<template>
    <div>
      <NavReglus />
      <div class="container">
        <main>
          <section class="hero">
            <div class="hero-title">
              <h2>Caro Educador, Essa é a Ficha de Acompanhamento do(a) Estudante:</h2>
              <h1>Williem Berg Oliveira</h1>
            </div>
          </section>
          
          <section class="content">
            <div class="student-profile">
              <div class="student-info">
                <h3>Informações Pessoais</h3>
                <p><strong>Nome Completo:</strong> Williem Berg Oliveira</p>
                <p><strong>Data de Nascimento:</strong> 18/09/2001</p>
                <p><strong>Email:</strong> wbog@discente.ifpe.edu.br</p>
                <p><strong>Grau de Formação:</strong> Ensino Médio Completo</p>
                <p><strong>Pessoa com Deficiência:</strong> Não</p>
                <p><strong>Tipo de Deficiência:</strong> -</p>
              </div>
  
              <div class="student-info">
                <h3>Informações Pessoais Adicionais</h3>
                <p><strong>Com quem você mora?</strong></p>
                <ul>
                  <li>[X] Pais</li>
                  <li>[ ] Avós</li>
                  <li>[ ] Tios(as)</li>
                  <li>[ ] Irmãos(ãs)</li>
                  <li>[ ] Outros</li>
                </ul>
              </div>
  
              <div class="student-info">
                <h3>Aspectos Sociais e Familiares</h3>
                <p><strong>Relação com os colegas de classe:</strong> Boa</p>
                <p><strong>Relação com os professores:</strong> Muito boa</p>
                <p><strong>Relação com a família em casa:</strong> Boa</p>
              </div>
  
              <div class="student-info">
                <h3>Saúde e Bem-Estar</h3>
                <p><strong>Condições de saúde ou necessidades especiais:</strong> Não</p>
                <p><strong>Pratica atividade física regularmente?</strong> Sim: Futebol</p>
                <p><strong>Avaliação da alimentação diária:</strong> Saudável</p>
                <p><strong>Horas de sono por noite:</strong> 7-8 horas</p>
              </div>
  
              <div class="student-info">
                <h3>Interesses e Hobbies</h3>
                <p><strong>Atividades preferidas fora do horário escolar:</strong></p>
                <ul>
                  <li>[X] Esportes: Futebol</li>
                  <li>[ ] Leitura</li>
                  <li>[X] Jogos eletrônicos</li>
                  <li>[ ] Música</li>
                  <li>[ ] Arte</li>
                  <li>[ ] Voluntariado</li>
                  <li>[ ] Outros</li>
                </ul>
                <p><strong>Sonhos e objetivos para o futuro:</strong> Tornar-se um engenheiro de software.</p>
              </div>
  
              <div class="student-info">
                <h3>Hábitos de Estudo</h3>
                <p><strong>Como costuma estudar?</strong></p>
                <ul>
                  <li>[X] Sozinho(a)</li>
                  <li>[ ] Com amigos</li>
                  <li>[ ] Com ajuda de familiares</li>
                  <li>[ ] Aulas particulares</li>
                  <li>[ ] Outros</li>
                </ul>
                <p><strong>Horas de estudo por dia fora da escola:</strong> 1-2 horas</p>
                <p><strong>Onde costuma estudar?</strong></p>
                <ul>
                  <li>[X] Em casa</li>
                  <li>[ ] Na biblioteca</li>
                  <li>[ ] Na escola</li>
                  <li>[ ] Outros</li>
                </ul>
                <p><strong>Segue algum plano ou método de estudos?</strong> Não.</p>
              </div>
  
              <div class="student-info">
                <h3>Autoavaliação</h3>
                <p><strong>Avaliação do desempenho escolar:</strong> Regular</p>
                <p><strong>Principais qualidades como estudante:</strong> Persistente, curioso, bom em resolver problemas.</p>
                <p><strong>Pontos que precisa melhorar:</strong> Gestão do tempo, organização nos estudos.</p>
              </div>
  
              <div class="student-info">
                <h3>Observações Finais</h3>
                <p><strong>Algo mais a compartilhar:</strong> Acredito que poderia melhorar meu desempenho com um plano de estudos mais estruturado e com apoio nas matérias mais difíceis.</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  </template>
  
  <script>
  import NavReglus from "@/components/nav/NavReglusV2.vue";
  
  export default {
    name: 'FichaAcompanhamento',
    components: {
      NavReglus,
    }
  }
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 0 20px;
  }
  
  main {
    padding: 20px;
    flex-grow: 1;
    margin-top: 1px;
  }
  
  .hero {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    background-color: #8c52ff;
    border-radius: 5px;
  }
  
  .hero-title h1 {
    font-size: 32px;
    font-weight: bold;
    color: #fff;
  }
  
  .hero-title h2 {
    font-size: 20px;
    color: #fff;
  }
  
  .hero-title p {
    font-size: 15px;
    color: #fff;
  }
  
  .student-profile {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .student-info {
    margin-bottom: 20px;
  }
  
  .student-info h3 {
    margin-bottom: 10px;
    font-size: 20px;
    color: #333;
  }
  
  .student-info p, .student-info ul {
    margin: 5px 0;
    color: #555;
  }
  
  .student-info ul {
    padding-left: 20px;
  }
  
  .student-info ul li {
    list-style-type: none;
  }
  
  .student-info ul li:before {
    content: "[ ]";
    margin-right: 10px;
  }
  
  .student-info ul li input:checked + label:before {
    content: "[X]";
  }
  
  </style>
  