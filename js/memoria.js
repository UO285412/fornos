class Memoria {
    constructor() {
        this.cardsArray = [
            { element: "RedBull", source: "https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg" },
            { element: "McLaren", source: "https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg" },
            { element: "Alpine", source: "https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg" },
            { element: "AstonMartin", source: "https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg" },
            { element: "Ferrari", source: "https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg" },
            { element: "Mercedes", source: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg" }
        ];
        this.cardsArray = [...this.cardsArray, ...this.cardsArray]; // Duplicar para 12 cartas
        this.shuffleElements();
        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;
        this.createElements();
        this.addEventListeners();
    }

    shuffleElements() {
        this.cardsArray.sort(() => Math.random() - 0.5);
    }

    createElements() {
        const gameBoard = document.querySelector("section");
        gameBoard.innerHTML = ""; // Vaciar tablero
        this.cardsArray.forEach(card => {
            const cardElement = document.createElement("article");
            cardElement.setAttribute("data-element", card.element);

            const frontFace = document.createElement("figcaption");
            frontFace.textContent = "Tarjeta de memoria";

            const backFace = document.createElement("img");
            backFace.src = card.source;
            backFace.alt = card.element;

            cardElement.appendChild(frontFace);
            cardElement.appendChild(backFace);
            gameBoard.appendChild(cardElement);
        });
    }

    addEventListeners() {
        document.querySelectorAll("section article").forEach(card => {
            card.addEventListener("click", () => this.flipCard(card));
        });
    }

    flipCard(card) {
        if (this.lockBoard || card === this.firstCard || card.getAttribute("data-state") === "revealed") return;

        card.style.transform = "rotateY(180deg)";

        if (!this.hasFlippedCard) {
            this.hasFlippedCard = true;
            this.firstCard = card;
            return;
        }

        this.secondCard = card;
        this.checkForMatch();
    }

    checkForMatch() {
        const isMatch = this.firstCard.getAttribute("data-element") === this.secondCard.getAttribute("data-element");
        isMatch ? this.disableCards() : this.unflipCards();
    }

    disableCards() {
        this.firstCard.setAttribute("data-state", "revealed");
        this.secondCard.setAttribute("data-state", "revealed");
        this.resetBoard();
    }

    unflipCards() {
        this.lockBoard = true;
        setTimeout(() => {
            this.firstCard.style.transform = "rotateY(0)";
            this.secondCard.style.transform = "rotateY(0)";
            this.resetBoard();
        }, 1000);
    }

    resetBoard() {
        [this.hasFlippedCard, this.lockBoard] = [false, false];
        [this.firstCard, this.secondCard] = [null, null];
    }
}

window.addEventListener("DOMContentLoaded", () => new Memoria());
document.querySelectorAll('section > article').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flip');
    });
});
