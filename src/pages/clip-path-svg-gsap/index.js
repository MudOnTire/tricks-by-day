import "./style.scss";

const tl = new TimelineMax({ paused: true });
const open = document.querySelector("#open");
const close = document.querySelector("#close");

open.addEventListener("click", () => {
  tl.play();
});

close.addEventListener("click", () => {
  tl.reverse();
});

tl.from("nav", 1, {
  x: 100,
  display: "none",
  ease: Power2.easeOut,
  delay: 0,
});

tl.to(
  "circle.one",
  3,
  {
    scale: 1,
    x: 0,
    y: -1300,
    ease: Power2.easeOut,
  },
  "-=1"
);

tl.to(
  "circle.two",
  4,
  {
    scale: 1.8,
    x: 2900,
    y: -500,
    ease: Power2.easeOut,
  },
  "-=3"
);

tl.from(
  "h1",
  1,
  {
    opacity: 0,
    y: 100,
    ease: Bounce.easeOut,
    delay: 0,
  },
  "-=3.2"
);
