<template>
  <!-- 加载 -->
  <Loading />
  <!-- 壁纸 -->
  <Background @loadComplete="loadComplete" />
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
      <!-- 添加烟花组件 -->
      <Fireworks ref="fireworksRef" />
    </main>
  </Transition>
</template>

<script setup>
import { helloInit, checkDays } from "@/utils/getTime.js";
import { HamburgerButton, CloseSmall } from "@icon-park/vue-next";
import { mainStore } from "@/store";
import { Icon } from "@vicons/utils";
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
import Fireworks from '@/components/Fireworks.vue';

const store = mainStore();
  
//fireworks
const fireworksRef = ref(null);

const handleMouseDown = (event) => {
  if (event.button === 1) { // 中键
    store.backgroundShow = !store.backgroundShow;
    ElMessage({
      message: `已${store.backgroundShow ? "开启" : "退出"}壁纸展示状态`,
      grouping: true,
    });
  } else if (event.button === 0) { // 0 左键且背景显示
    fireworksRef.value?.createFirework(event.clientX, event.clientY);
  }
};

const handleContextMenu = (event) => {
  event.preventDefault(); // 阻止默认的右键菜单
  if (store.backgroundShow) { // 确保背景显示时才触发烟花
    fireworksRef.value?.createFirework(event.clientX, event.clientY);
  }
};
  
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
      message: "🎇",
      grouping: true,
      duration: 2000,
    });
    return false;
  };

  //fireworks
  window.addEventListener("mousedown", handleMouseDown);
  fireworksRef.value?.animate(); // 开始动画循环

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
});
  
onUnmounted(() => {
  window.removeEventListener("mousedown", handleMouseDown);
  });
  
</script>

<style lang="scss" scoped>
#main {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scale(1.2);
  transition: transform 0.3s;
  animation: fade-blur-main-in 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: 0.5s;
  .container {
    position: relative; // 添加这行,使得内部绝对定位的元素相对于container定位

    width: 100%;
    height: 100vh;
    margin: 0 auto;
    padding: 0 0.5vw;
    .all {
      width: 100%;
      height: 100%;
      padding: 0 0.75rem;
      display: flex;
      flex-direction: row;//row
      justify-content: center;
      align-items: center;
    }
    .more {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #00000080;
      backdrop-filter: blur(20px);
      z-index: 2;
      animation: fade 0.5s;
    }
    @media (max-width: 1200px) {
      padding: 0 2vw;
    }
  
    .floating-button-wrapper {
      position: relative;
      top: 20px;
      left: 20px;
      z-index: 2;
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
      pointer-events: auto; // 确保按钮可以被点击
      
      &:hover {
        background-color: rgba(255, 255, 255, 0.3);
      }
      
      &:active {
        transform: scale(0.95);
      }
      }
    .url-input {
        margin-left: 10px;
        padding: 10px 20px; // 调整padding使高度与按钮一致
        border: none;
        border-radius: 6px;
        background-color: rgba(255, 255, 255, 0.2);
        color: white;
        font-size: 16px; // 保持与按钮字体大小一致
        line-height: 1; // 确保文本垂直居中
  
        &::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }
        
        &:focus {
          outline: none;
          background-color: rgba(255, 255, 255, 0.3);
        }
      }
  
  }
  .menu {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 84%;
    left: calc(50% - 28px);
    width: 56px;
    height: 34px;
    background: rgb(0 0 0 / 20%);
    backdrop-filter: blur(10px);
    border-radius: 6px;
    transition: transform 0.3s;
    animation: fade 0.5s;
    &:active {
      transform: scale(0.95);
    }
    .i-icon {
      transform: translateY(2px);
    }
    @media (min-width: 721px) {
      display: none;
    }
  }
  @media (max-height: 720px) {
    overflow-y: auto;
    overflow-x: hidden;
    .container {
      height: 721px;
      .more {
        height: 721px;
        width: calc(100% + 6px);
      }
      @media (min-width: 391px) {
        // w 1201px ~ max
        padding-left: 0.7vw;
        padding-right: 0.25vw;
        @media (max-width: 1200px) { // w 1101px ~ 1280px
          padding-left: 2.3vw;
          padding-right: 1.75vw;
        }
        @media (max-width: 1100px) { // w 993px ~ 1100px
          padding-left: 2vw;
          padding-right: calc(2vw - 6px);
        }
        @media (max-width: 992px) { // w 901px ~ 992px
          padding-left: 2.3vw;
          padding-right: 1.7vw;
        }
        @media (max-width: 900px) { // w 391px ~ 900px
          padding-left: 2vw;
          padding-right: calc(2vw - 6px);
        }
      }
    }
    .menu {
      top: 605.64px; // 721px * 0.84
      left: 170.5px; // 391 * 0.5 - 25px
      @media (min-width: 391px) {
        left: calc(50% - 25px);
      }
    }
    .f-ter {
      top: 721px; // 721px - 46px
      @media (min-width: 391px) {
        padding-left: 6px;
      }
    }
  }
  @media (max-width: 390px) {
    overflow-x: auto;
    .container {
      width: 391px;
    }
    .menu {
      left: 167.5px; // 391px * 0.5 - 28px
    }
    .f-ter {
      width: 391px;
    }
    @media (min-height: 721px) {
      overflow-y: hidden;
    }
  }

}
  .firework {
  position: absolute;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 5px;
  height: 5px;
  background: #ff6b6b;
  border-radius: 50%;
}
</style>
