<template>
  <div class="floating-window">
    <div class="floating-window-header">
      <button @click="$emit('close')" class="close-button">X</button>
    </div>
    <iframe :src="url" class="floating-window-content"></iframe>
  </div>
</template>

<script setup>
defineProps({
  url: {
    type: String,
    required: true
  }
});

defineEmits(['close']);
</script>

<style scoped>
.floating-window {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  z-index: 1001;
  display: flex;
  flex-direction: column;
}

.floating-window-header {
  padding: 10px;
  display: flex;
  justify-content: flex-end;
}

.close-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.floating-window-content {
  flex-grow: 1;
  border: none;
}
</style>
