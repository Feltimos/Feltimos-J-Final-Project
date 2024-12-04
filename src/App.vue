<script setup>
import { createPinia } from 'pinia';
import NavBar from './components/NavBar.vue';

const pinia = createPinia();
</script>

<template>
  <NavBar />
  <router-view></router-view>
</template>