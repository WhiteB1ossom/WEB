const $c = document.querySelector("#roulette-canvas");
const ctx = $c.getContext("2d");

function getPastelColor() {
  const r = Math.floor((Math.random() * 127) + 127); // 127~254
  const g = Math.floor((Math.random() * 127) + 127);
  const b = Math.floor((Math.random() * 127) + 127);
  return `rgb(${r},${g},${b})`;
}

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

// 공통 원 반지름 기준 함수
function getWheelRadius() {
  return Math.min($c.offsetWidth, $c.offsetHeight) * 0.45;
}

function drawEmptyWheel() {
  const ratio = window.devicePixelRatio || 1;
  const cw = $c.width / (2 * ratio);
  const ch = $c.height / (2 * ratio);
  const radius = getWheelRadius();

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
  ctx.font = `15px Pretendard`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("메뉴를 추가해 주세요", cw, ch);
}

const newMake = () => {
  const ratio = window.devicePixelRatio || 1;
  const cw = $c.width / (2 * ratio);
  const ch = $c.height / (2 * ratio);
  const radius = getWheelRadius();

  if (product.length === 0) {
    drawEmptyWheel();
    return;
  }

  const arc = Math.PI / (product.length / 2);

  ctx.clearRect(0, 0, $c.width, $c.height);

  if (colors.length === 0) {
    for (let l = 0; l < product.length; l++) {
      colors.push(getPastelColor());
    }
  }

  for (let i = 0; i < product.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.moveTo(cw, ch);
    ctx.arc(cw, ch, radius, arc * (i - 1), arc * i);
    ctx.fill();
    ctx.closePath();
  }

  ctx.fillStyle = "black";
  ctx.font = `${Math.round(cw / 11.5)}px Pretendard`;
  ctx.textAlign = "center";

  for (let i = 0; i < product.length; i++) {
    const angle = (arc * i) + (arc / 2);
    ctx.save();
    ctx.translate(
      cw + Math.cos(angle) * (radius - 50),
      ch + Math.sin(angle) * (radius - 50)
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

function add() {
  if (menuAdd.value && menuAdd.value.trim() !== "") {
    product.push(menuAdd.value);
    colors.push(getPastelColor());
    newMake();
    menuAdd.value = "";
  } else {
    alert("메뉴를 입력한 후 버튼을 클릭 해 주세요");
  }
}

newMake();
