<template>
  <!-- 加载 -->
  <Loading />
  <!-- 壁纸 -->
  <Background @loadComplete="loadComplete" @mousedown="handleBackgroundClick" />
  <!-- 主界面 -->
  <Transition name="fade" mode="out-in">
    <main id="main" v-if="store.imgLoadStatus">
      <div class="container" v-show="!store.backgroundShow">
        <!-- 新的浮动按钮部分 -->
        <section class="floating-button-wrapper" v-show="!store.setOpenState">
          <button @click="openFloatingWindow" class="floating-button">
            {{ inputUrl ? 'Visit URL' : 'Shooting Trump' }}
          </button>
          <input 
            v-model="inputUrl" 
            placeholder="Enter URL here" 
            class="url-input"
          />
        </section>

        <section class="all" v-show="!store.setOpenState">
          <MainRight v-show="!store.boxOpenState" />
          <Box v-show="store.boxOpenState" />
          <MainLeft  />
        </section>
        <section class="more" v-show="store.setOpenState" @click="store.setOpenState = false">
          <MoreSet />
        </section>
      </div>
      <!-- 移动端菜单按钮 -->
      <Icon
        class="menu"
        size="24"
        v-show="!store.backgroundShow"
        @click="store.mobileOpenState = !store.mobileOpenState"
      >
        <component :is="store.mobileOpenState ? CloseSmall : HamburgerButton" />
      </Icon>
      <!-- 页脚 -->
      <Transition name="fade" mode="out-in">
        <Footer class="f-ter" v-show="!store.backgroundShow && !store.setOpenState" />
      </Transition>
        
      <!-- 添加浮动窗口组件 -->
      <FloatingWindow 
        v-if="showFloatingWindow" 
        @close="closeFloatingWindow"
        :url="floatingWindowUrl"
      />
      
    </main>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { helloInit, checkDays } from "@/utils/getTime.js";
import { HamburgerButton, CloseSmall } from "@icon-park/vue-next";
import { mainStore } from "@/store";
import { Icon } from "@vicons/utils";
import { ElMessage } from 'element-plus';
import Loading from "@/components/Loading.vue";
import MainLeft from "@/views/Main/Left.vue";
import MainRight from "@/views/Main/Right.vue";
import Background from "@/components/Background.vue";
import Footer from "@/components/Footer.vue";
import Box from "@/views/Box/index.vue";
import MoreSet from "@/views/MoreSet/index.vue";
import cursorInit from "@/utils/cursor.js";
import config from "@/../package.json";
import FloatingWindow from '@/components/FloatingWindow.vue';
import { createFirework } from "@/utils/fireworks.js";

const store = mainStore();

// FloatWindows
const showFloatingWindow = ref(false);
const floatingWindowUrl = ref('https://pcd.chunzha.tech/shot-game/shooter');
const inputUrl = ref('');

const ensureHttps = (url) => {
  if (url && !/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }
  return url;
};

const openFloatingWindow = () => {
  if (inputUrl.value) {
    floatingWindowUrl.value = ensureHttps(inputUrl.value);
  } else {
    floatingWindowUrl.value = 'https://s3-us-west-1.amazonaws.com/vocs/map.html#';
  }
  showFloatingWindow.value = true;
};

const closeFloatingWindow = () => {
  showFloatingWindow.value = false;
};

// 页面宽度
const getWidth = () => {
  store.setInnerWidth(window.innerWidth);
};

// 加载完成事件
const loadComplete = () => {
  nextTick(() => {
    // 欢迎提示
    helloInit();
    // 默哀模式
    checkDays();
  });
};

// 处理鼠标中键点击事件
const handleMouseDown = (event) => {
  if (event.button === 1) { // 中键
    event.preventDefault();
    store.backgroundShow = !store.backgroundShow;
    ElMessage({
      message: `已${store.backgroundShow ? "开启" : "退出"}壁纸展示状态`,
      grouping: true,
    });
  }
};

// 处理背景点击事件
const handleBackgroundClick = (event) => {
  if (store.backgroundShow) {
    if (event.button === 0) { // 左键
      createFirework(event.clientX, event.clientY);
    } else if (event.button === 1) { // 中键
      event.preventDefault();
      store.backgroundShow = false;
      ElMessage({
        message: "已退出壁纸展示状态",
        grouping: true,
      });
    }
  }
};

// 监听宽度变化
watch(
  () => store.innerWidth,
  (value) => {
    if (value < 721) {
      store.boxOpenState = false;
      store.setOpenState = false;
    }
  },
);

onMounted(() => {
  // 自定义鼠标
  cursorInit();

  // 屏蔽右键
  document.oncontextmenu = () => {
    ElMessage({
      message: "为了浏览体验，本站禁用右键",
      grouping: true,
      duration: 2000,
    });
    return false;
  };

  // 监听鼠标中键事件
  window.addEventListener("mousedown", handleMouseDown);

  // 监听当前页面宽度
  getWidth();
  window.addEventListener("resize", getWidth);
  
  // 控制台输出
  const styleTitle1 = "font-size: 20px;font-weight: 600;color: rgb(244,167,89);";
  const styleTitle2 = "font-size:12px;color: rgb(244,167,89);";
  const styleContent = "color: rgb(30,152,255);";
  const title1 = "無名の主页";
  const title2 = `
 _____ __  __  _______     ____     __
|_   _|  \\/  |/ ____\\ \\   / /\\ \\   / /
  | | | \\  / | (___  \\ \\_/ /  \\ \\_/ /
  | | | |\\/| |\\___ \\  \\   /    \\   /
 _| |_| |  | |____) |  | |      | |
|_____|_|  |_|_____/   |_|      |_|`;
  const content = `\n\n版本: ${config.version}\n主页: ${config.home}\nGithub: ${config.github}`;
  console.info(`%c${title1} %c${title2} %c${content}`, styleTitle1, styleTitle2, styleContent);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", getWidth);
  window.removeEventListener("mousedown", handleMouseDown);
});
</script>

<style lang="scss" scoped>
// ... 保持原有的样式不变
</style>
