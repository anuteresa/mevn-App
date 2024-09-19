<template>
  <main class="d-flex flex-column">
    <header>
      <h1 class="text-primary text-center mb-4">SpaceX Launches</h1>
    </header>
    <table class="table table-bordered table-striped" v-if="launches.length > 0">
      <thead>
        <tr>
          <th scope="col">Flight number</th>
          <th scope="col">Name</th>
          <th scope="col">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="launch in launches" :key="launch._id">
          <td scope="row">{{ launch.flight_number }}</td>
          <td>{{ launch.name }}</td>
          <td>{{ dFormat(launch.date_utc) }}</td>
          <td v-if="!isSaved(launch.id)">
            <button @click="saveLaunch(launch)" class="btn btn-primary btn-sm">
              +
            </button>
          </td>
          <td v-if="isSaved(launch.id)">
            <button :disabled="isSaved(launch.id)" class="btn btn-secondary btn-sm">
              Saved
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <h4 v-if="launches.length == 0 && !httpError">
      <div class="spinner-grow" role="status"></div>
      Loading...
    </h4>
  </main>
  <h4 v-if="httpError" class="text-danger mt-3">
    Sorry, We're unable to connect to API server at the moment
  </h4>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeMount, onUpdated } from 'vue';
import { useLaunchStore } from '../stores/SpaceLaunchStore';
import { storeToRefs } from 'pinia';
import type { Slaunch } from '@/components/Slaunch.ts';

export default defineComponent(
  {
    setup() {

      const launchStore = useLaunchStore();
      const { allLaunches, savedLaunchIds, httpError } = storeToRefs(launchStore);

      onBeforeMount(() => {
        launchStore.fetchAllLaunches();
      });

      onMounted(() => {
        launchStore.fetchsavedIds();
      });

      const saveLaunch = (launch: Slaunch) => {
        launchStore.addLaunch(launch);
      };

      const dFormat = (date) => {
        return new Date(date).toLocaleDateString();
      }

      const isSaved = (id: number) => {
        return savedLaunchIds.value.indexOf(id) != -1;
      }

      return {
        launches: allLaunches,
        saveLaunch,
        dFormat,
        isSaved,
        httpError
      };
    },
  });
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 1.5rem; 
}
</style>