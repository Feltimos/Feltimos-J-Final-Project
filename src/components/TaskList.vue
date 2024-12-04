<script setup>
import { onMounted } from 'vue';
import { useTaskStore } from '../stores/taskStore';

const taskStore = useTaskStore();

onMounted(() => {
  taskStore.fetchTasks();
});

const getPriorityClass = (priority) => {
  return {
    'low': 'bg-success',
    'medium': 'bg-warning',
    'high': 'bg-danger'
  }[priority];
};

const updateTaskStatus = (taskId, status) => {
  taskStore.updateTask(taskId, { status });
};
</script>

<template>
  <div class="row g-4">
    <div class="col-md-4">
      <div class="card shadow">
        <div class="card-header bg-primary text-white">
          <h5 class="mb-0">Pending</h5>
        </div>
        <div class="card-body">
          <div v-for="task in taskStore.pendingTasks" :key="task.id" class="task-card mb-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{{ task.title }}</h5>
                <p class="card-text">{{ task.description }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <span :class="['badge', getPriorityClass(task.priority)]">
                    {{ task.priority }}
                  </span>
                  <small>Due: {{ task.dueDate }}</small>
                </div>
                <div class="mt-2">
                  <button
                    @click="updateTaskStatus(task.id, 'in-progress')"
                    class="btn btn-sm btn-warning me-2"
                  >
                    Start
                  </button>
                  <button
                    @click="taskStore.deleteTask(task.id)"
                    class="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-4">
      <div class="card shadow">
        <div class="card-header bg-warning text-dark">
          <h5 class="mb-0">In Progress</h5>
        </div>
        <div class="card-body">
          <div v-for="task in taskStore.inProgressTasks" :key="task.id" class="task-card mb-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{{ task.title }}</h5>
                <p class="card-text">{{ task.description }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <span :class="['badge', getPriorityClass(task.priority)]">
                    {{ task.priority }}
                  </span>
                  <small>Due: {{ task.dueDate }}</small>
                </div>
                <div class="mt-2">
                  <button
                    @click="updateTaskStatus(task.id, 'completed')"
                    class="btn btn-sm btn-success me-2"
                  >
                    Complete
                  </button>
                  <button
                    @click="taskStore.deleteTask(task.id)"
                    class="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-4">
      <div class="card shadow">
        <div class="card-header bg-success text-white">
          <h5 class="mb-0">Completed</h5>
        </div>
        <div class="card-body">
          <div v-for="task in taskStore.completedTasks" :key="task.id" class="task-card mb-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{{ task.title }}</h5>
                <p class="card-text">{{ task.description }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <span :class="['badge', getPriorityClass(task.priority)]">
                    {{ task.priority }}
                  </span>
                  <small>Due: {{ task.dueDate }}</small>
                </div>
                <div class="mt-2">
                  <button
                    @click="taskStore.deleteTask(task.id)"
                    class="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-card {
  transition: transform 0.2s;
}

.task-card:hover {
  transform: translateY(-2px);
}
</style>