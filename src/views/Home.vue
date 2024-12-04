<script setup>
import { useTaskStore } from '../stores/taskStore';

const taskStore = useTaskStore();
</script>

<template>
  <div class="container">
    <div class="text-center mb-5">
      <h1 class="display-4 mb-3">Welcome to Task Scheduler</h1>
      <p class="lead">Organize your tasks efficiently and boost your productivity</p>
    </div>

    <div class="row g-4">
      <div class="col-md-4">
        <div class="card text-center h-100">
          <div class="card-body">
            <i class="bi bi-list-check display-4 text-primary mb-3"></i>
            <h3 class="card-title">Task Management</h3>
            <p class="card-text">Create, organize, and track your tasks with ease</p>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card text-center h-100">
          <div class="card-body">
            <i class="bi bi-calendar-event display-4 text-primary mb-3"></i>
            <h3 class="card-title">Calendar View</h3>
            <p class="card-text">Visualize your tasks in a calendar format</p>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card text-center h-100">
          <div class="card-body">
            <i class="bi bi-graph-up display-4 text-primary mb-3"></i>
            <h3 class="card-title">Progress Tracking</h3>
            <p class="card-text">Monitor your task completion and productivity</p>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-md-6 offset-md-3 text-center">
        <router-link to="/tasks" class="btn btn-primary btn-lg">
          Get Started
          <i class="bi bi-arrow-right ms-2"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>