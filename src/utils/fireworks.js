export function createFirework(x, y) {
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'];

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '5px';
    particle.style.height = '5px';
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.borderRadius = '50%';
    document.body.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 3 + 1;
    const dx = Math.cos(angle) * speed;
    const dy = Math.sin(angle) * speed;

    let opacity = 1;
    let scale = 1;

    function animate() {
      if (opacity <= 0) {
        document.body.removeChild(particle);
        return;
      }

      const x = parseFloat(particle.style.left) + dx;
      const y = parseFloat(particle.style.top) + dy;
      opacity -= 0.02;
      scale -= 0.01;

      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.opacity = opacity;
      particle.style.transform = `scale(${scale})`;

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }
}
