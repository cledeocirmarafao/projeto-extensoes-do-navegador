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
            <button class="remove" id="btn">Remove</button>

            <label class="switch">
              <input class="input" type="checkbox" />
              <span class="slider"></span>
            </label>
          </div>
        </div>
        `;
  },

  renderScreen(info) {
    const cardsHtmlArray = info.map((cardData) =>
      this.createCardHtml(cardData)
    );
    const finalHtml = cardsHtmlArray.join("");
    this.dataItens.innerHTML = finalHtml;
  },
};

export { screen }