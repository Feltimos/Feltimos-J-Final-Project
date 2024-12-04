<script setup>
import { ref } from 'vue';
import { useTaskStore } from '../stores/taskStore';

const taskStore = useTaskStore();

const newTask = ref({
  title: '',
  description: '',
  dueDate: '',
  priority: 'medium',
  status: 'pending'
});

const submitTask = async () => {
  await taskStore.addTask(newTask.value);
  newTask.value = {
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    status: 'pending'
  };
};
</script>

<template>
  <div class="card shadow">
    <div class="card-body">
      <h3 class="card-title mb-4">Add New Task</h3>
      <form @submit.prevent="submitTask">
        <div class="mb-3">
          <label class="form-label">Title</label>
          <input
            v-model="newTask.title"
            type="text"
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Description</label>
          <textarea
            v-model="newTask.description"
            class="form-control"
            rows="3"
          ></textarea>
        </div>
        <div class="mb-3">
          <label class="form-label">Due Date</label>
          <input
            v-model="newTask.dueDate"
            type="date"
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Priority</label>
          <select v-model="newTask.priority" class="form-select">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Add Task</button>
      </form>
    </div>
  </div>
</template>