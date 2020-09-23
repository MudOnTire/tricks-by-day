import './style.scss';

const links = document.querySelectorAll('.page-link');
const goBack = document.querySelector('#goBack');
const goForward = document.querySelector('#goForward');
const logger = document.querySelector('#logger');

links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const page = link.getAttribute('data-page');
    const href = link.getAttribute('href');
    history.pushState({ page }, `page ${page}`, href);
  });
});

goBack.addEventListener('click', () => {
  history.back();
});

goForward.addEventListener('click', () => {
  history.forward();
});

window.addEventListener('popstate', (event) => {
  const log = document.createElement('li');
  log.textContent = "location: " + document.location + ", state: " + JSON.stringify(event.state);
  logger.appendChild(log);
});