<script setup>
import { ref, computed, onMounted } from 'vue';
import { useTaskStore } from '../stores/taskStore';

const taskStore = useTaskStore();
const currentDate = ref(new Date());

const daysInMonth = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  return new Date(year, month + 1, 0).getDate();
});

const firstDayOfMonth = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  return new Date(year, month, 1).getDay();
});

const days = computed(() => {
  const days = [];
  for (let i = 0; i < firstDayOfMonth.value; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth.value; i++) {
    days.push(i);
  }
  return days;
});

const monthName = computed(() => {
  return currentDate.value.toLocaleString('default', { month: 'long' });
});

const getTasksForDay = (day) => {
  if (!day) return [];
  const dateStr = `${currentDate.value.getFullYear()}-${String(currentDate.value.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  return taskStore.tasks.filter(task => task.dueDate === dateStr);
};

const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1);
};

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1);
};

onMounted(() => {
  taskStore.fetchTasks();
});
</script>

<template>
  <div class="container">
    <div class="calendar-header d-flex justify-content-between align-items-center mb-4">
      <h2>{{ monthName }} {{ currentDate.getFullYear() }}</h2>
      <div class="btn-group">
        <button @click="previousMonth" class="btn btn-outline-primary">
          <i class="bi bi-chevron-left"></i>
        </button>
        <button @click="nextMonth" class="btn btn-outline-primary">
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>

    <div class="calendar">
      <div class="calendar-grid">
        <div class="weekday">Sun</div>
        <div class="weekday">Mon</div>
        <div class="weekday">Tue</div>
        <div class="weekday">Wed</div>
        <div class="weekday">Thu</div>
        <div class="weekday">Fri</div>
        <div class="weekday">Sat</div>

        <template v-for="(day, index) in days" :key="index">
          <div
            class="calendar-day"
            :class="{ 'empty': !day }"
          >
            <template v-if="day">
              <div class="day-number">{{ day }}</div>
              <div class="tasks-container">
                <div
                  v-for="task in getTasksForDay(day)"
                  :key="task.id"
                  class="task-indicator"
                  :class="`priority-${task.priority}`"
                  :title="task.title"
                >
                  {{ task.title }}
                </div>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: #eee;
}

.weekday {
  background: #f8f9fa;
  padding: 10px;
  text-align: center;
  font-weight: bold;
}

.calendar-day {
  background: white;
  min-height: 100px;
  padding: 5px;
  border: 1px solid #eee;
}

.calendar-day.empty {
  background: #f8f9fa;
}

.day-number {
  font-weight: bold;
  margin-bottom: 5px;
}

.tasks-container {
  font-size: 0.8em;
}

.task-indicator {
  margin: 2px 0;
  padding: 2px 4px;
  border-radius: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.priority-high {
  background: #dc3545;
  color: white;
}

.priority-medium {
  background: #ffc107;
}

.priority-low {
  background: #198754;
  color: white;
}
</style>