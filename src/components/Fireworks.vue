<template>
  <canvas ref="canvas" class="fireworks"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const canvas = ref(null);
let ctx;
let fireworks = [];
let particles = [];

onMounted(() => {
  ctx = canvas.value.getContext('2d');
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

const handleResize = () => {
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
};

const createFirework = (x, y) => {
  const hue = Math.random() * 360;
  const firework = {
    x,
    y,
    color: `hsl(${hue}, 100%, 50%)`,
    radius: 4,
    velocity: { x: Math.random() * 6 - 3, y: Math.random() * 6 - 3 },
    decay: 0.015,
    opacity: 1
  };
  fireworks.push(firework);

  // Create particles
  for (let i = 0; i < 50; i++) {
    const particle = {
      x,
      y,
      color: firework.color,
      radius: Math.random() * 2,
      velocity: { 
        x: Math.random() * 6 - 3, 
        y: Math.random() * 6 - 3 
      },
      decay: 0.015,
      opacity: 1
    };
    particles.push(particle);
  }
};

const animate = () => {
  requestAnimationFrame(animate);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);

  // Update and draw fireworks
  for (let i = fireworks.length - 1; i >= 0; i--) {
    const firework = fireworks[i];
    firework.x += firework.velocity.x;
    firework.y += firework.velocity.y;
    firework.opacity -= firework.decay;

    ctx.beginPath();
    ctx.arc(firework.x, firework.y, firework.radius, 0, Math.PI * 2);
    ctx.fillStyle = firework.color;
    ctx.globalAlpha = firework.opacity;
    ctx.fill();

    if (firework.opacity <= 0) {
      fireworks.splice(i, 1);
    }
  }

  // Update and draw particles
  for (let i = particles.length - 1; i >= 0; i--) {
    const particle = particles[i];
    particle.x += particle.velocity.x;
    particle.y += particle.velocity.y;
    particle.opacity -= particle.decay;

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.globalAlpha = particle.opacity;
    ctx.fill();

    if (particle.opacity <= 0) {
      particles.splice(i, 1);
    }
  }
};

defineExpose({ createFirework, animate });
</script>

<style scoped>
.fireworks {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 2;
}
</style>
