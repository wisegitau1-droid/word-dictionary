const form = document.getElementById("searchform");
const input = document.getElementById("wordInput");
const results = document.getElementById("results");

form.addEventListener("submit", function(event) {
    event.preventDefault();
 let word = input.value.trim();
 if (word == "") {
        results.innerHTML = "<p>Please enter a word.</p>";
        return;
    }
   fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
    .then(function(response) {

        if (!response.ok) {
            throw new Error("Not found");
        }

        return response.json();
   })
    .then(function(data) {
     let info = data[0];

        let definition = info.meanings[0].definitions[0].definition;
        let part = info.meanings[0].partOfSpeech;

        let example = "there is no example available";
        if (info.meanings[0].definitions[0].example) {
            example = info.meanings[0].definitions[0].example;
        }

        let synonyms = "None";

        if (info.meanings[0].synonyms.length > 0) {
            synonyms = info.meanings[0].synonyms.join(", ");
        }
       results.innerHTML = `
            <h2>${info.word}</h2>

            <p><b>Part of speech:</b> ${part}</p>

            <p><b>Definition:</b> ${definition}</p>

            <p><b>Example:</b> ${example}</p>

            <p><b>Synonyms:</b> ${synonyms}</p>
        `;
     document.body.style.backgroundColor = "#eef8ff";
    })
    .catch(function() {

        results.innerHTML = "<p>Word not found.</p>";

        document.body.style.backgroundColor = "#2603f0";

    });

});
