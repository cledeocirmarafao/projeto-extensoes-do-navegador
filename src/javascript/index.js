import { screen } from "./objects/screen.js";

async function dataInfo() {
  const response = await fetch("./data.json");
  return await response.json();
}
dataInfo();

document.querySelector(".container-cards").addEventListener('click', (e) => {
  if (e.target.classList.contains('remove')) {
    console.log('Botão clicado!');

    e.target.closest('.card').remove();
  }
});
  
async function init() {
  try {
    const info = await dataInfo();

    screen.renderScreen(info);
  } catch (error) {
    console.error("Erro ao carregar ou renderizar os dados:", error);
  }
}
init()