let mainCursor;

Math.lerp = (a, b, n) => (1 - n) * a + n * b;

const getStyle = (el, attr) => {
  try {
    return window.getComputedStyle ? window.getComputedStyle(el)[attr] : el.currentStyle[attr];
  } catch (e) {
    console.error(e);
  }
  return false;
};

const cursorInit = () => {
  mainCursor = new Cursor();
  return mainCursor;
};

class Cursor {
  constructor() {
    this.pos = {
      curr: null,
      prev: null,
    };
    this.pt = [];
    this.create();
    this.init();
    this.render();
  }

  move(left, top) {
    this.cursor.style["left"] = `${left}px`;
    this.cursor.style["top"] = `${top}px`;
  }

  create() {
    if (!this.cursor) {
      this.cursor = document.createElement("div");
      this.cursor.id = "cursor";
      this.cursor.classList.add("xs-hidden");
      this.cursor.classList.add("hidden");
      document.body.append(this.cursor);
    }

    var el = document.getElementsByTagName("*");
    for (let i = 0; i < el.length; i++)
      if (getStyle(el[i], "cursor") == "pointer") this.pt.push(el[i].outerHTML);

    document.body.appendChild((this.scr = document.createElement("style")));
    this.scr.innerHTML = `* {cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' width='10px' height='10px'><circle cx='4' cy='4' r='4' fill='white' /></svg>") 4 4, auto !important}`;
  }

  refresh() {
    this.scr.remove();
    this.cursor.classList.remove("active");
    this.pos = {
      curr: null,
      prev: null,
    };
    this.pt = [];

    this.create();
    this.init();
    this.render();
  }

  init() {
    document.onmousemove = (e) => {
      this.pos.curr == null && this.move(e.clientX - 8, e.clientY - 8);
      this.pos.curr = {
        x: e.clientX - 8,
        y: e.clientY - 8,
      };
      this.cursor.classList.remove("hidden");
    };
    document.onmouseenter = () => this.cursor.classList.remove("hidden");
    document.onmouseleave = () => this.cursor.classList.add("hidden");
    document.onmousedown = () => this.cursor.classList.add("active");
    document.onmouseup = () => this.cursor.classList.remove("active");
    //fireworks
    document.oncontextmenu = (e) => {
    e.preventDefault();
    this.createFirework(e.clientX, e.clientY);
  };
  }

  render() {
    if (this.pos.prev) {
      this.pos.prev.x = Math.lerp(this.pos.prev.x, this.pos.curr.x, 0.35);
      this.pos.prev.y = Math.lerp(this.pos.prev.y, this.pos.curr.y, 0.35);
      this.move(this.pos.prev.x, this.pos.prev.y);
    } else {
      this.pos.prev = this.pos.curr;
    }
    requestAnimationFrame(() => this.render());
  }

  //fireworks
  createFirework(x, y) {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = `${x}px`;
    firework.style.top = `${y}px`;
    document.body.appendChild(firework);

    const particleCount = 30;
    const animationDuration = 1000;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1;
      particle.style.transform = `rotate(${angle}rad)`;
      firework.appendChild(particle);

      const animation = particle.animate([
        { transform: `rotate(${angle}rad) translate(0, 0) scale(1)` },
        { transform: `rotate(${angle}rad) translate(${Math.cos(angle) * 100}px, ${Math.sin(angle) * 100}px) scale(0)` }
      ], {
        duration: animationDuration,
        easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)'
      });

      animation.onfinish = () => {
        particle.remove();
        if (firework.children.length === 0) {
          firework.remove();
        }
      };
    }
  }
}

export default cursorInit;
