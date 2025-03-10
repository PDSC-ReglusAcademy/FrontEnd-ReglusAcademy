<template>
  <div class="calendar-container">
    <!-- Seleção de Mês -->
    <div class="month-selector">
      <button class="btn" @click="prevMonth">Anterior</button>
      <span>{{ months[currentMonth] }} {{ currentYear }}</span>
      <button class="btn" @click="nextMonth">Próximo</button>
    </div>

    <div class="view-selector">
      <button :class="{'active': viewMode === 'day'}" @click="setView('day')">Dia</button>
      <button :class="{'active': viewMode === 'week'}" @click="setView('week')">Semana</button>
      <button :class="{'active': viewMode === 'month'}" @click="setView('month')">Mês</button>
    </div>

    <!-- Modo Semana -->
    <div v-if="viewMode === 'week'" class="week-view">
      <div class="week-header">
        <div class="day-header" v-for="(day, index) in daysOfWeek" :key="index">{{ day }}</div>
      </div>
      <div class="week-body">
        <div v-for="(day, index) in daysOfWeek" :key="index" class="day-column">
          <div 
            class="hourly-slot" 
            v-for="hour in 24" 
            :key="hour"
            @click="openEventPopup(day, hour)">
            <div class="hour-label">{{ hour }}:00</div>
            <div v-for="event in getEventsForDay(day, hour)" :key="event.id" class="event">{{ event.title }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modo Dia -->
    <div v-if="viewMode === 'day'" class="day-view">
      <div class="day-header">
        <span>{{ formatDate(currentDate) }}</span>
      </div>
      <div class="day-body">
        <div 
          class="hourly-slot" 
          v-for="hour in 24" 
          :key="hour"
          @click="openEventPopup(currentDate, hour)">
          <div class="hour-label">{{ hour }}:00</div>
          <div v-for="event in getEventsForDay(currentDate, hour)" :key="event.id" class="event">{{ event.title }}</div>
        </div>
      </div>
    </div>

    <!-- No modo Mês -->
    <div class="month-header">
      <div class="month-day" 
          v-for="(week, weekIndex) in weeksInMonth" 
          :key="weekIndex">
        <div v-for="(day, dayIndex) in week" :key="dayIndex" @click="openEventPopup(day)">
          <!-- Verificação adicional para garantir que day é um Date -->
          {{ day instanceof Date ? day.getDate() : '' }}
          <div v-for="event in getEventsForDay(day)" :key="event.id" class="event">{{ event.title }}</div>
        </div>
      </div>
    </div>

    <!-- Pop-up de evento -->
    <div v-if="popupVisible" class="popup show">
      <div class="popup-header">
        <h3>Criar Evento</h3>
        <button @click="closePopup">X</button>
      </div>
      <div class="popup-body">
        <input type="text" v-model="newEvent.title" placeholder="Título do evento" class="new-event-title"/>
        <textarea v-model="newEvent.description" placeholder="Descrição do evento" class="new-event-description"></textarea>
      </div>
      <div class="popup-footer">
        <button @click="saveEvent">Criar Evento</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      currentDate: new Date(),
      daysOfWeek: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      viewMode: 'week',  // 'day', 'week', 'month'
      events: [],
      popupVisible: false,
      newEvent: {
        title: '',
        description: '',
        day: null,
        hour: null
      },
    };
  },
  computed: {
    // Computed Property to calculate the weeks in the current month
    weeksInMonth() {
      const weeks = [];
      const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
      const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);

      let currentDay = firstDayOfMonth;
      let currentWeek = [];

      while (currentDay <= lastDayOfMonth) {
        currentWeek.push(new Date(currentDay));  // Ensure it's a Date object
        
        // If we reach the end of the week (Saturday)
        if (currentDay.getDay() === 6) {
          weeks.push(currentWeek);
          currentWeek = [];
        }

        // Move to the next day
        currentDay = new Date(currentDay.setDate(currentDay.getDate() + 1));
      }

      // Push the last incomplete week, if any
      if (currentWeek.length) {
        weeks.push(currentWeek);
      }

      return weeks;
    }
  },
  methods: {
    setView(view) {
      this.viewMode = view;
    },
    prevMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
      this.updateWeeksInMonth();
    },
    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
      this.updateWeeksInMonth();
    },
    updateWeeksInMonth() {
      const weeks = [];
      const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
      const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);

      let currentDay = firstDayOfMonth;
      let currentWeek = [];

      while (currentDay <= lastDayOfMonth) {
        currentWeek.push(new Date(currentDay));  // Ensure it's a Date object
        
        if (currentDay.getDay() === 6) {
          weeks.push(currentWeek);
          currentWeek = [];
        }

        currentDay = new Date(currentDay.setDate(currentDay.getDate() + 1));
      }

      if (currentWeek.length) {
        weeks.push(currentWeek);
      }

      this.weeksInMonth = weeks;
    },

    // Método para abrir o popup de evento
    openEventPopup(day, hour = null) {
      // Garantir que 'day' seja sempre um objeto Date
      if (!(day instanceof Date)) {
        day = new Date(day);  // Converte day para um objeto Date se necessário
      }

      this.newEvent.day = day;
      this.newEvent.hour = hour;
      this.popupVisible = true;
    },

    // Método para fechar o popup de evento
    closePopup() {
      this.popupVisible = false;
      this.newEvent.title = '';
      this.newEvent.description = '';
    },

    // Método para salvar o evento
    saveEvent() {
      if (this.newEvent.title.trim()) {
        const newEvent = {
          id: Date.now(),
          title: this.newEvent.title,
          description: this.newEvent.description,
          day: this.newEvent.day,
          hour: this.newEvent.hour
        };
        this.events.push(newEvent);
        this.closePopup();
      }
    },

    // Método para obter os eventos do dia (opcionalmente filtrado por hora)
    getEventsForDay(day, hour = null) {
      // Garantir que 'day' seja sempre um objeto Date
      if (!(day instanceof Date)) {
        day = new Date(day);  // Converte day para um objeto Date se necessário
      }

      return this.events.filter(event => {
        return event.day.toLocaleDateString() === day.toLocaleDateString() && (hour ? event.hour === hour : true);
      });
    },

    // Método para formatar a data (para exibir em formato legível)
    formatDate(date) {
      return date.toLocaleDateString('pt-BR');
    }
  }
};
</script>

<style scoped>
/* Estilos básicos */
body {
  font-family: 'Roboto', sans-serif; /* Fonte similar à do Google */
  background-color: #f0f0f0; /* Cor de fundo mais suave */
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.calendar-container {
  width: 90%;
  max-width: 1200px;
  margin: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Seleção de Mês e Visualização */
.month-selector, .view-selector {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
}

.btn {
  background-color: #4285f4; /* Azul do Google */
  color: #ffffff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #357ae8; /* Azul mais escuro ao passar o mouse */
}

.view-selector button {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.view-selector button.active {
  background-color: #34a853; /* Verde do Google */
  color: #ffffff;
}

.view-selector button:hover {
  background-color: #f1f1f1; /* Cor de fundo ao passar o mouse */
}

/* Semana - Grade com horários */
.week-view {
  display: flex;
  flex-direction: column;
}

.week-header {
  display: flex;
  justify-content: space-between;
}

.day-header {
  flex: 1;
  text-align: center;
  padding: 10px;
  background-color: #4285f4; /* Azul do Google */
  color: #ffffff;
  font-weight: bold;
}

.week-body {
  display: flex;
}

.day-column {
  flex: 1;
  border-left: 1px solid #ddd;
  display: flex;
  flex-direction: column;
}

.hourly-slot {
  display: flex;
  flex-direction: column;
  border-top: 1px solid #ddd;
  cursor: pointer;
}

.hour-label {
  padding: 10px;
  background-color: #f9f9f9; /* Cor de fundo mais clara */
  text-align: center;
}

.event {
  padding: 5px;
  margin: 5px;
  background-color: #34a853; /* Verde do Google */
  color: #ffffff;
  border-radius: 4px;
  cursor: pointer;
}

/* Pop-up de evento */
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: none;
}

.popup.show {
  display: block;
}

.popup .popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.popup .popup-header h3 {
  margin: 0;
  font-size: 1.2em;
}

.popup .popup-header button {
  background-color: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.popup .popup-header button:hover {
  color: #dc3545; /* Vermelho para fechar */
}

.popup .popup-body {
  padding: 10px 0;
}

.popup .popup-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}

.popup .popup-footer button {
  padding: 10px 15px;
  background-color: #34a853; /* Verde do Google */
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.popup .popup-footer button:hover {
  background-color: #28a745; /* Verde mais escuro ao passar o mouse */
}

/* Modo Mês */
.month-view {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
}

.month-day {
  padding: 10px;
  background-color: #f9f9f9; /* Cor de fundo mais clara */
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.month-day:hover {
  background-color: #4285f4; /* Azul do Google ao passar o mouse */
  color: #ffffff;
}

.month-day .event {
  background-color: #34a853; /* Verde do Google */
  color: #ffffff;
  padding: 5px;
  border-radius: 4px;
  margin-top: 5px;
}

.month-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
}

.month-header .day-header {
  font-weight: bold;
}

/* Modo Dia */
.day-view .day-header {
  text-align: center;
  font-size: 1.5em;
  margin-bottom: 20px;
}

.day-view .hourly-slot {
  display: flex;
  flex-direction: column;
  border-top: 1px solid #ddd;
  cursor: pointer;
}

.day-view .hour-label {
  padding: 10px;
  background-color: #f9f9f9; /* Cor de fundo mais clara */
  text-align: center;
}

.day-view .event {
  padding: 5px;
  margin: 5px;
  background-color: #34a853; /* Verde do Google */
  color: #ffffff;
  border-radius: 4px;
}
</style>