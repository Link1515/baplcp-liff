<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal'

useLineLogin()
</script>

<template>
  <div>
    <slot />
    <ModalsContainer />
  </div>
</template>
