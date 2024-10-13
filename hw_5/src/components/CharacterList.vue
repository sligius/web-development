<template>
    <div class="search-container">
        <input type="text" id="search-bar" v-model="searchQuery" placeholder="Search by name...">
    </div>

    <div class="sort-container disney-font">
        <div class="sort">
            <h2>Sort by:</h2>
            <div class="item-sort">
                <input type="radio" id="sort-name" name="sort-criteria" v-model="sortCriteria" value="name" checked>
                <label for="sort-name">
                    Name
                </label>
            </div>
            <div class="item-sort">
                <input type="radio" id="sort-mentions" name="sort-criteria" v-model="sortCriteria" value="mentions">
                <label for="sort-mentions">
                    Appearance
                </label>
            </div>
        </div>

        <div class="sort">
            <h2>Sort order:</h2>
            <div class="item-sort">
                <input type="radio" name="sort-order" id="sort-ascending" value="asc" v-model="sortOrder" checked>
                <label for="sort-ascending">Ascending</label>
            </div>
            <div class="item-sort">
                <input type="radio" name="sort-order" id="sort-descending" value="desc" v-model="sortOrder">
                <label for="sort-descending">Descending</label>
            </div>
        </div>
    </div>

    <div id="characters-list" ref="charactersList">
        <div v-for="character in filteredCharacters" :key="character.id" class="card">
            <div class="card-inner">
                <h1>{{ character.name }}</h1>
                <img :src="character.imageUrl" class="card-image" v-if="character.showCard">
                <p class='big-text'><strong>Appearance:</strong></p>
                <ul>
                    <li v-if="character.films.length > 0"><strong>Films:</strong> {{ character.films.join(", ") }}</li>
                    <li v-if="character.shortFilms.length > 0"><strong>Short films:</strong> {{
                        character.shortFilms.join(", ") }}</li>
                    <li v-if="character.tvShows.length > 0"><strong>TV shows:</strong> {{ character.tvShows.join(", ")
                        }}</li>
                    <li v-if="character.videoGames.length > 0"><strong>Video games:</strong> {{
                        character.videoGames.join(", ") }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            characters: [],
            sortOrder: "asc",
            sortCriteria: "name",
            searchQuery: "",
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                const response = await fetch("https://api.disneyapi.dev/character");
                const data = await response.json();

                // Фильтр персонажей, у которых есть имя и URL изображения, и проверка доступности изображения
                this.characters = await Promise.all(
                    data.data.map(async (character) => {
                        if (character.name !== undefined && character.imageUrl !== undefined) {
                            try {
                                const imageResponse = await fetch(character.imageUrl);
                                if (imageResponse.ok) {
                                    character.showCard = true;
                                    return character;
                                }
                                throw new Error(`Изображение не найдено: статус ${imageResponse.status}`);
                            } catch (error) {
                                console.error(error);
                            }
                        }
                        return null;
                    })
                ).then((characters) => characters.filter(character => character !== null));
            } catch (error) {
                console.error("Ошибка при получении данных:", error);
            }
        },
    },
    computed: {
        // Фильтр персонажей по имени/количеству появлений
        sortedCharacters() {
            const sortedCharacters = this.characters.slice().sort((a, b) => {
                if (this.sortCriteria === "name") {
                    if (this.sortOrder === "asc") {
                        return a.name.localeCompare(b.name);
                    } else {
                        return b.name.localeCompare(a.name);
                    }
                } else if (this.sortCriteria === "mentions") {
                    const totalMentionsA =
                        a.films.length +
                        a.shortFilms.length +
                        a.tvShows.length +
                        a.videoGames.length;
                    const totalMentionsB = b.films.length +
                        b.shortFilms.length +
                        b.tvShows.length +
                        b.videoGames.length;
                    if (this.sortOrder === "asc") {
                        return totalMentionsA - totalMentionsB;
                    } else {
                        return totalMentionsB - totalMentionsA;
                    }
                }
            });

            return sortedCharacters;
        },
        // Поиск по имени
        filteredCharacters() {
            const filteredCharacters = this.sortedCharacters.filter(
                (character) =>
                    character.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
            return filteredCharacters;
        },
    },
};
</script>


<style>
input[type="text"]::placeholder {
    color: rgb(182, 182, 182);
}

.search-container {
    margin-top: 20px;
}

#search-bar {
    font-family: 'Disney';
    font-size: 30px;
    padding: 10px;
    width: 98%;
    height: 50px;
    border: 5px solid #877ea5c4;
    border-radius: 15px;
}

.card {
    width: 20%;
    border: solid rgba(42, 26, 112, 0.63);
    background-color: rgba(255, 255, 255, 0.63);
    border-radius: 55px;
    text-align: center;
    align-items: center;
    flex: auto;
    margin: 20px;
    padding: 10px;
    min-width: 300px;
    font-size: 30px;
    display: flex;
    align-items: center;
}

.card-inner {
    flex: auto;
}

.big-text {
    font-size: 40px;
}

h1 {
    font-size: 60px;

}

h2 {
    font-size: 40px;
    margin-bottom: 15px;
}

#characters-list {
    display: flex;
    flex-flow: row wrap;
}

li {
    list-style-type: none;
}

ul {
    padding-left: 0;
}

.card-image {
    width: 300px;
    border-radius: 25px;
}

.sort-container {
    display: flex;
    justify-content: space-around;
}

.sort {
    font-size: 30px;
}

.item-sort {
    float: left;
    margin-top: -20px;
}

.sort input[type=radio] {
    display: none;
}

.sort label {
    display: inline-block;
    cursor: pointer;
    padding: 0px 15px;
    line-height: 34px;
    border: 2px solid #877ea5;
    border-right: none;
}

.sort .item-sort>label {
    border-radius: 6px 0 0 6px;
}

.sort .item-sort:last-child label {
    border-radius: 0 6px 6px 0;
    border-right: 2px solid #877ea5;
}


.sort input[type=radio]:checked+label {
    background: #a25ae680;
}

.sort label:hover {
    color: #666;
}
</style>