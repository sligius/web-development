const charactersList = document.getElementById("characters-list");
let characters = [];
let sortOrder = "asc";
let sortCriteria = "name";

async function fetchData() {
  try {
    const response = await fetch("https://api.disneyapi.dev/character");
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    return [];
  }
}

async function init() {
  if (characters.length === 0) {
    characters = await fetchData();
    console.log(characters);
  }
  displayCharacters(characters);
}

function createCard(character) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `<div class="card-inner">
  <h1>${character.name}</h1>
    <img src="${character.imageUrl}" class="card-image">
    <p class='big-text'><strong>Appearance:</strong></p>
        <ul>
            ${
              character.films.length > 0
                ? `<li><strong>Films:</strong> ${character.films.join(
                    ", "
                  )}</li>`
                : ""
            }
            ${
              character.shortFilms.length > 0
                ? `<li><strong>Short films:</strong> ${character.shortFilms.join(
                    ", "
                  )}</li>`
                : ""
            }
            ${
              character.tvShows.length > 0
                ? `<li><strong>TV shows:</strong> ${character.tvShows.join(
                    ", "
                  )}</li>`
                : ""
            }
            ${
              character.videoGames.length > 0
                ? `<li><strong>Video games:</strong> ${character.videoGames.join(
                    ", "
                  )}</li>`
                : ""
            }
        </ul>
    </div>`;
  return card;
}

async function checkImage(imageURL) {
  try {
    const response = await fetch(imageURL);
    if (response.ok) return 200;
    throw new Error(`Изображение не найдено: статус ${response.status}`);
  } catch (error) {
    console.error(error);
  }
}

function displayCharacters(characters) {
  charactersList.innerHTML = "";

  const sortAscendingButton = document.getElementById("sort-ascending");
  const sortDescendingButton = document.getElementById("sort-descending");

  const sortNameRadio = document.getElementById("sort-name");
  const sortMentionsRadio = document.getElementById("sort-mentions");

  function displaySortedCharacters(characters) {
    characters.forEach((character) => {
      if (character.name !== undefined && character.imageUrl !== undefined) {
        checkImage(character.imageUrl).then((status) => {
          if (status === 200) {
            const card = createCard(character);
            charactersList.appendChild(card);
          }
        });
      }
    });
  }

  sortAscendingButton.addEventListener("change", () => {
    sortOrder = "asc";
    sortCharacters();
  });

  sortDescendingButton.addEventListener("change", () => {
    sortOrder = "desc";
    sortCharacters();
  });

  sortNameRadio.addEventListener("click", () => {
    sortCriteria = "name";
    sortCharacters();
  });

  sortMentionsRadio.addEventListener("click", () => {
    sortCriteria = "mentions";
    sortCharacters();
  });

  function sortCharacters() {
    const sortedCharacters = characters.slice().sort((a, b) => {
      if (sortCriteria === "name") {
        if (sortOrder === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      } else if (sortCriteria === "mentions") {
        const totalMentionsA =
          a.films.length +
          a.shortFilms.length +
          a.tvShows.length +
          a.videoGames.length;
        const totalMentionsB =
          b.films.length +
          b.shortFilms.length +
          b.tvShows.length +
          b.videoGames.length;
        if (sortOrder === "asc") {
          return totalMentionsA - totalMentionsB;
        } else {
          return totalMentionsB - totalMentionsA;
        }
      }
    });
    charactersList.innerHTML = "";
    console.log(sortedCharacters);
    displaySortedCharacters(sortedCharacters);
  }

  displaySortedCharacters(characters);
}

init();
