import { screen } from "./objects/screen.js";

async function dataInfo() {
  const response = await fetch("./data.json");
  return await response.json();
}

document.querySelector(".container-cards").addEventListener('click', (e) => {
  if (e.target.classList.contains('remove')) {
      e.target.closest('.card').remove();
  }
});

async function init() {
  try {
    const info = await dataInfo();

    screen.renderScreen(info);
    toggleEvents()
    filterButtons()
  } catch (error) {
    console.error("Erro ao carregar ou renderizar os dados:", error);
  }
}
init()

function toggleEvents() {
  const inputs = document.querySelectorAll('.input')

  inputs.forEach((input) => {
    input.addEventListener('change', (e) => {
      const card = e.target.closest('.card')

      if (e.target.checked) {
        card.classList.add('active')
      } else {
        card.classList.remove('active')
      }
    })
  })
}

async function filterButtons() {
  const btnAll = document.getElementById('filter-all')
  const btnActive = document.getElementById('filter-active')
  const btnInactive =document.getElementById('filter-inactive')
  
  const cards = document.querySelectorAll('.card')

  btnAll.addEventListener('click', () => {
    cards.forEach((card) => {card.classList.remove('hidden')})
  })

  btnActive.addEventListener('click', () => {
    cards.forEach((card) => {
      if (card.classList.contains('active')) {
        card.classList.remove('hidden')
      } else {
        card.classList.add('hidden')
      }
    })
  })

  btnInactive.addEventListener('click', () => {
    cards.forEach((card) => {
      if (!card.classList.contains('active')) {
        card.classList.remove('hidden')
      } else {
        card.classList.add('hidden')
      }
    })
  })
}