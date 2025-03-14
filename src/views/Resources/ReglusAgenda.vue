<template>
  <NavReglusV2></NavReglusV2>
  <div class="calendar-container">
    <div>
      <NavReglus />
    </div>
    <!-- Seleção de Mês -->
    <div class="month-selector">
      <button class="btn" @click="prevMonth">Anterior</button>
      <span class="month-year">{{ months[currentMonth] }} {{ currentYear }}</span>
      <button class="btn" @click="nextMonth">Próximo</button>
    </div>

    <div class="main-content">
      <!-- Exibição do Calendário -->
      <div class="calendar-wrapper">
        <table class="calendar">
          <thead>
            <tr>
              <th v-for="day in daysOfWeek" :key="day" class="day-header">{{ day }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="week in weeks" :key="week">
              <td
                v-for="day in week"
                :key="day ? day.date : ''"
                @click="day ? selectDate(day.date) : null"
                :class="{'selected': day && isSelected(day.date)}"
              >
                {{ day ? day.date.getDate() : '' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="divider"></div>

      <!-- To-Do List para o Dia Selecionado -->
      <div v-if="selectedDate && showTodoList" class="todo-list">
        <button class="close-btn" @click="closeTodoList">×</button>
        <h3>Tarefas para {{ formatDate(selectedDate) }}</h3>
        <ul>
          <li v-for="(task, index) in todos[selectedDateString] || []" :key="index">
            <input type="text" v-model="task.text" />
            <button class="btn" @click="removeTask(index)">Remover</button>
          </li>
        </ul>      
        <input type="text" v-model="newTask" placeholder="Nova Tarefa" />
        <button class="btn" @click="addTask">Adicionar Tarefa</button>
      </div>
    </div>
  </div>
</template>

<script>
import NavReglusV2 from "@/components/nav/NavReglusV2.vue";
export default {
  name: "AgendaReglus",
  components: {
    NavReglusV2,
  },
  data() {
    return {
      daysOfWeek: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      months: [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ],
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      selectedDate: null,
      newTask: '',
      todos: {},
      showTodoList: true,  // Controle de visibilidade da lista de tarefas
    };
  },
  computed: {
    weeks() {
      const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
      const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
      const days = [];

      // Preenche os dias do mês
      for (let i = 1; i <= daysInMonth; i++) {
        days.push({ date: new Date(this.currentYear, this.currentMonth, i) });
      }

      // Preenche as semanas
      const weeks = [];
      let week = new Array(firstDay).fill(null);
      for (let day of days) {
        if (week.length === 7) {
          weeks.push(week);
          week = [];
        }
        week.push(day);
      }
      while (week.length < 7) {
        week.push(null); // Preenche com dias vazios
      }
      weeks.push(week);

      return weeks;
    },
    selectedDateString() {
      return this.selectedDate ? this.selectedDate.toDateString() : '';
    },
  },
  methods: {
    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
    },
    prevMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
    },
    selectDate(date) {
      // Quando uma nova data é selecionada, reabre a lista de tarefas
      this.selectedDate = date;
      this.showTodoList = true; // Garante que a lista será aberta novamente
      // Inicializa a lista de tarefas para a data selecionada, se ainda não existir
      if (!this.todos[this.selectedDateString]) {
        this.todos[this.selectedDateString] = [];
      }
    },
    isSelected(date) {
      return this.selectedDate && this.selectedDate.toDateString() === date.toDateString();
    },
    formatDate(date) {
      return date.toLocaleDateString();
    },
    addTask() {
      if (this.newTask.trim()) {
        this.todos[this.selectedDateString].push({ text: this.newTask });
        this.newTask = '';
      }
    },
    removeTask(index) {
      this.todos[this.selectedDateString].splice(index, 1);
    },
    closeTodoList() {
      this.showTodoList = false; // Fecha a lista de tarefas
    },
  },
};
</script>

<style scoped>
/* Estilo geral do contêiner da agenda */
.calendar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}

/* Estilo da barra de navegação do mês */
.month-selector {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 500px;  /* Aumentar a largura da barra de navegação */
  margin-bottom: 20px;
  padding: 20px;
}

/* Botões de navegação "Anterior" e "Próximo" */
.btn {
  background-color: #8c52ff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn {
  margin: 0 15px; /* Adiciona mais espaço entre os botões */
}

/* Nome do mês e ano */
.month-year {
  font-size: 24px; /* Aumenta o tamanho da fonte */
  font-weight: bold; /* Coloca o nome do mês e ano em negrito */
  color: #333; /* Cor do texto */
  text-align: center; /* Centraliza o texto */
}

/* Estilo do conteúdo principal, contendo o calendário e a lista de tarefas */
.main-content {
  display: flex;
  width: 100%;
  height: 80vh;
}

/* Estilo do calendário */
.calendar-wrapper, .todo-list {
  flex: 1; /* Ocupa metade da largura */
  padding: 20px;
  box-sizing: border-box;
}

/* Divisória entre o calendário e a lista de tarefas */
.divider {
  width: 2px;
  background-color: #8c52ff;
  height: 100%;
}

/* Estilo da tabela do calendário */
.calendar {
  border-collapse: collapse;
  width: 100%;
  height: 100%;
}

.calendar th, .calendar td {
  border: 1px solid #ccc;
  padding: 10px;
  width: 40px;
  text-align: center;
}

.selected {
  background-color: #f0f0f0;
}

/* Estilo para as células do calendário */
.calendar td:hover {
  background-color: #8c52ff; 
}

.calendar .selected {
  background-color: #8c52ff;
}

/* Estilo dos cabeçalhos dos dias da semana */
.day-header {
  background-color: #8c52ff; /* Cor roxa clara */
  color: white; /* Texto branco */
  padding: 10px; /* Espaçamento interno */
  text-align: center; /* Alinha o texto ao centro */
  border: 1px solid #ddd; /* Borda leve ao redor das células */
}

/* Estilo da lista de tarefas */
.todo-list {
  position: relative; /* Torna a div 'todo-list' com contexto de posicionamento */
  max-width: 100%;
  padding: 20px;
}

.todo-list input {
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
}

/* Estilo para os itens da lista */
.todo-list ul {
  list-style-type: none; /* Remove os marcadores da lista */
  padding: 0; /* Remove o padding padrão */
}

.todo-list li {
  display: flex; /* Usa flexbox para alinhas itens */
  align-items: center; /* Alinha itens verticalmente no centro */
  margin-bottom: 10px; /* Espaço entre os itens */
}

.todo-list input[type="text"] {
  flex: 1; /* Faz com que o campo de texto ocupe o máximo de espaço disponível */
  padding: 5px; /* Espaçamento interno */
  margin-right: 10px; /* Espaço entre o campo de texto e o botão */
}

/* Estilo do botão de fechar da lista de tarefas */
.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: #8c52ff;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10; /* Garante que o botão fique sobre os outros elementos */
}
</style>