<script setup>
import TaskForm from '../components/TaskForm.vue';
import TaskList from '../components/TaskList.vue';
</script>

<template>
  <div class="container">
    <h2 class="mb-4">Task Management</h2>
    <div class="row">
      <div class="col-md-4 mb-4">
        <TaskForm />
      </div>
      <div class="col-md-8">
        <TaskList />
      </div>
    </div>
  </div>
</template>