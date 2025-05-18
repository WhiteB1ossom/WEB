const $c = document.querySelector("#roulette-canvas");
const ctx = $c.getContext("2d");

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  const width = $c.offsetWidth;
  const height = $c.offsetHeight;

  $c.width = width * ratio;
  $c.height = height * ratio;

  ctx.setTransform(1, 0, 0, 1, 0, 0); // 초기화
  ctx.scale(ratio, ratio);
}
resizeCanvas();

const menuAdd = document.querySelector('#menuAdd');
const product = [];
const colors = [];

const newMake = () => {
  const ratio = window.devicePixelRatio || 1;
  const [cw, ch] = [$c.width / (2 * ratio), $c.height / (2 * ratio)];

  if (product.length === 0) {
    drawEmptyWheel(cw, ch);
    return;
  }

  const arc = Math.PI / (product.length / 2);

  ctx.clearRect(0, 0, $c.width, $c.height); // 초기화

  if (colors.length === 0) {
    for (let l = 0; l < product.length; l++) {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      colors.push(`rgb(${r},${g},${b})`);
    }
  }

  for (let i = 0; i < product.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.moveTo(cw, ch);
    ctx.arc(cw, ch, cw, arc * (i - 1), arc * i);
    ctx.fill();
    ctx.closePath();
  }

  ctx.fillStyle = "#fff";
  ctx.font = "30px Pretendard";
  ctx.textAlign = "left";

  for (let i = 0; i < product.length; i++) {
    const angle = (arc * i) + (arc / 2);
    ctx.save();
    ctx.translate(
      cw + Math.cos(angle) * (cw - 50),
      ch + Math.sin(angle) * (ch - 50)
    );
    ctx.rotate(angle + Math.PI / 2);

    product[i].split(" ").forEach((text, j) => {
      ctx.fillText(text, 0, 30 * j);
    });

    ctx.restore();
  }
};

const rotate = () => {
  $c.style.transform = `initial`;
  $c.style.transition = `initial`;
  const alpha = Math.floor(Math.random() * 100);

  setTimeout(() => {
    const ran = Math.floor(Math.random() * product.length);
    const arc = 360 / product.length;
    const rotateDeg = (ran * arc) + 3600 + (arc * 3) - (arc / 4) + alpha;

    $c.style.transform = `rotate(-${rotateDeg}deg)`;
    $c.style.transition = `2s`;
  }, 1);
};

function drawEmptyWheel(cw, ch) {
  const radius = Math.min($c.offsetWidth, $c.offsetHeight) * 0.45;

  ctx.clearRect(0, 0, $c.width, $c.height);
  ctx.beginPath();
  ctx.arc(cw, ch, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = "#f0f0f0";
  ctx.fill();
  ctx.strokeStyle = "#ddd";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "#999";
  ctx.font = "20px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("메뉴를 추가해 주세요", cw, ch);
}

function add() {
  if (menuAdd.value && menuAdd.value.trim() !== "") {
    product.push(menuAdd.value);
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    colors.push(`rgb(${r},${g},${b})`);
    newMake();
    menuAdd.value = "";
  } else {
    alert("메뉴를 입력한 후 버튼을 클릭 해 주세요");
  }
}

newMake();
