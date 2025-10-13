const screen = {
  dataItens: document.querySelector(".container-cards"),
  createCardHtml(cardData) {
    return `
            <div class="card" data-card-id="${cardData.name}">
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
              <input class="input" type="checkbox" data-extension-name="${cardData.name}"/>
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

    this.restoreCardsStates();
    this.setupListeners();
  },

  restoreCardsStates() {
    const activesCards = JSON.parse(localStorage.getItem("activesCards")) || [];
    activesCards.forEach((extensionName) => {
      const switchInput = document.querySelector(
        `input[data-extension-name="${extensionName}"]`
      );
      if (switchInput) {
        switchInput.checked = true;

        const card = document.querySelector(
          `[data-card-id="${extensionName}"]`
        );

        if (card) {
          this.moveToActive(card);
        }
      }
    });
  },

  setupListeners() {
    const allSwitches = document.querySelectorAll(
      '.switch input[type="checkbox"]'
    );

    allSwitches.forEach((switchInput) => {
      switchInput.addEventListener("change", (event) => {
        const extensionName = event.target.dataset.extensionName;
        const card = event.target.closest(".card");

        if (event.target.checked) {
          this.saveActiveCard(extensionName);
          this.moveToActive(card);
        } else {
          this.removeActiveCards(extensionName);
          this.moveToInactive(card);
        }
      });
    });
  },

  saveActiveCard(extensionName) {
    let activesCards = JSON.parse(localStorage.getItem('activesCards')) || []

    if (!activesCards.includes(extensionName)) {
      activesCards.push(extensionName)

      localStorage.setItem('activesCards', JSON.stringify(activesCards))
    }
  },

  removeActiveCards(extensionName) {
    let activesCards = JSON.parse(localStorage.getItem('activesCards')) || []

    activesCards = activesCards.filter(name => name !== extensionName)

    localStorage.setItem('activesCards', JSON.stringify(activesCards))
  },

  moveToActive(card) {
    card.classList.add('active')
  },

  moveToInactive(card) {
    card.classList.remove('active')
  }
};

export { screen };