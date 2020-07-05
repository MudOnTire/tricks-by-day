import "./styles.scss";

const ContextMenu = function (options) {
  let instance;

  function createMenu() {
    const ul = document.createElement("ul");
    ul.classList.add("custom-context-menu");
    const { menus } = options;
    if (menus && menus.length > 0) {
      for (let menu of menus) {
        const li = document.createElement("li");
        li.textContent = menu.name;
        li.onclick = menu.onClick;
        ul.appendChild(li);
      }
    }
    const body = document.querySelector("body");
    body.appendChild(ul);
    return ul;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createMenu();
      }
      return instance;
    },
  };
};

const menuSinglton = ContextMenu({
  menus: [
    {
      name: "custom menu 1",
      onClick: function (e) {
        console.log("menu1 clicked");
      },
    },
    {
      name: "custom menu 2",
      onClick: function (e) {
        console.log("menu2 clicked");
      },
    },
    {
      name: "custom menu 3",
      onClick: function (e) {
        console.log("menu3 clicked");
      },
    },
  ],
});

function showMenu(e) {
  const menus = menuSinglton.getInstance();
  menus.style.top = `${e.clientY}px`;
  menus.style.left = `${e.clientX}px`;
  menus.style.display = "block";
}

function hideMenu(e) {
  const menus = menuSinglton.getInstance();
  menus.style.display = "none";
}

document.addEventListener("contextmenu", (e)=>{
  e.preventDefault();
  showMenu();
});
document.addEventListener("click", hideMenu);
