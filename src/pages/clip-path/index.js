import "./style.scss";

let percentage;
let direction = 0; // 0: 正向，1: 反向

function update() {
  const parallax = document.querySelector(".parallax");
  const foreground = parallax.querySelector(".foreground");
  const background = parallax.querySelector(".background");

  // 正向, foreground在前,
  if (window.scrollY === 0 && direction !== 0) {
    direction = 0;
    foreground.style.zIndex = "2";
    background.style.zIndex = "1";
    background.style["clip-path"] = "";
  }

  // 反向, background在前
  if (window.scrollY > parallax.offsetTop && direction !== 1) {
    direction = 1;
    foreground.style.zIndex = "1";
    background.style.zIndex = "2";
    background.style["clip-path"] = "circle(0 at 100% 100%)";
    foreground.style["clip-path"] = "";
  }

  if (direction === 1) {
    percentage = 1 - window.scrollY / parallax.offsetTop;
  } else if (direction === 0) {
    percentage = window.scrollY / parallax.offsetTop;
  }

  let radius =
    percentage *
    Math.sqrt(foreground.clientWidth ** 2 + foreground.clientHeight ** 2);
  if (direction === 0) {
    foreground.style["clip-path"] = `circle(${radius + "px"} at 0% 0%)`;
  } else if (direction === 1) {
    background.style["clip-path"] = `circle(${radius + "px"} at 100% 100%)`;
  }
}

window.onscroll = update;
