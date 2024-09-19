<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';

</script>

<template>
  <section class="nav-bar-left">
    <router-link to="/" activeClass="active">Launches List</router-link>
  </section>

  <section class="nav-bar-right">
    <router-link to="/savedLaunches" activeClass="active">Saved Launches</router-link>
  </section>

  <section class="content-area">
    <RouterView />
  </section>
</template>

<style scoped></style>
