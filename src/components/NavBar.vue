<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isNavCollapsed = ref(true);
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <i class="bi bi-calendar-check me-2"></i>
        Task Scheduler
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        @click="isNavCollapsed = !isNavCollapsed"
        aria-controls="navbarNav"
        :aria-expanded="!isNavCollapsed"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse"
        :class="{ show: !isNavCollapsed }"
        id="navbarNav"
      >
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/tasks">Tasks</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/calendar">Calendar</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>