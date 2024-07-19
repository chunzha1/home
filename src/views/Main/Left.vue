<template>
  <div :class="store.mobileOpenState ? 'left hidden' : 'left'">
    <Message />
    <!-- 新的浮动按钮部分 -->
    <div class="floating-button-wrapper">
      <button @click="openFloatingWindow" class="floating-button">
        Shooting Trump
      </button>
    </div>
    <!-- 添加浮动窗口组件 -->
    <FloatingWindow 
      v-if="showFloatingWindow" 
      @close="closeFloatingWindow"
      :url="floatingWindowUrl"
    />
    <SocialLinks />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { mainStore } from "@/store";
import Message from "@/components/Message.vue";
import SocialLinks from "@/components/SocialLinks.vue";
import FloatingWindow from '@/components/FloatingWindow.vue';

const store = mainStore();

// FloatWindows
const showFloatingWindow = ref(false);
const floatingWindowUrl = ref('https://mzh.li');

const openFloatingWindow = () => {
  showFloatingWindow.value = true;
};

const closeFloatingWindow = () => {
  showFloatingWindow.value = false;
};
</script>

<style lang="scss" scoped>
.left {
  width: 50%;
  margin-right: 1.25rem;
  transform: translateY(20px);
  &.hidden {
    display: none;
  }
  @media (max-width: 720px) {
    margin-right: 0;
    width: 100%;
  }

  .floating-button-wrapper {
    margin-top: 20px;
  }

  .floating-button {
    padding: 10px 20px;
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
    
    &:active {
      transform: scale(0.95);
    }
  }
}
</style>
