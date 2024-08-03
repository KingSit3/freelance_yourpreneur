<template>
  Form

  <!-- Buttons -->
  <div class="flex justify-center gap-5">
    {{ generalStore.$state.criteriaValue }}

    <button
      @click="generalStore.$state.mainMenu = 'menu'"
      class="px-3 p-0.5 border-2 border-blue-800 hover:bg-blue-800 text-neutral-100 rounded duration-200"
    >
      Kembali
    </button>
    <button
      @click="generalStore.$state.mainMenu = 'form'"
      class="px-3 p-0.5 border-2 border-green-800 hover:bg-green-800 text-neutral-100 rounded duration-200"
    >
      Hitung hasil
    </button>
  </div>
  <!-- End Buttons -->
</template>
<script lang="ts" setup>
import { useGeneralStore } from '@/stores/general'

const generalStore = useGeneralStore()
</script>
