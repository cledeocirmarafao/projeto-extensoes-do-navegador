async function dataInfo() {
  const response = await fetch("./data.json");
  return await response.json();
}
dataInfo();

const screen = {
  dataItens: document.querySelector(".container-cards"),
  createCardHtml(cardData) {
    return `
            <div class="card">
          <div class="extensions">
            <img
              src="${cardData.logo}"
              alt="imagem de representação da extensão"
            />
            <div class="extensions-info">
              <h2>${cardData.name}</h2>
              <p>
                ${cardData.description}
              </p>
            </div>
          </div>
          <div class="extensions-buttons">
            <button class="remove">Remove</button>

            <label class="switch">
              <input type="checkbox" />
              <span class="slider"></span>
            </label>
          </div>
        </div>
        `;
  },

  renderScreen(info) {
    const cardsHTMLArray = info.map((cardData) =>
      this.createCardHtml(cardData)
    );
    const finalHTML = cardsHTMLArray.join("");
    this.dataItens.innerHTML = finalHTML;
  },
};

async function init() {
  try {
    const info = await dataInfo();

    screen.renderScreen(info);
  } catch (error) {
    console.error("Erro ao carregar ou renderizar os dados:", error);
  }
}
init();
