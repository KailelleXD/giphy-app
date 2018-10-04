// API-key for giphy: Mh76UAvQu5V032f0X2CIwOI2QGJFpdbB

// Event listener to load Javascript when document is ready.
$(document).ready(function () {
  // console.log("app.js is running");

  // Variables and Arrays ////

  var gameTitle = "";
  var topics = ["Sonic the Hedgehog", "Fallout 4", "Rocket League", "Diablo 3", "Final Fantasy VII", "Xenogears", "Little Big Planet", "Elite Dangerous", "Destiny", ];
  

  // Function Declarations ////

  // Renders initial videogame buttons.
  function renderButtons() {

    $("#game-input").val("");

    $("#games-viewer").empty();

    for (let i = 0; i < topics.length; i++) {
      var newBtn = $("<button>");
      newBtn.text(topics[i]);
      newBtn.attr("data-name", topics[i]);
      newBtn.addClass("gameBtn");
      $("#games-viewer").append(newBtn);
    }

  } /// renderButtons();

  // Adds a new game button to the topics array IF the input area is not blank.
  function addGames() {
      $("#add-game").on("click", function () {
      event.preventDefault();

      gameTitle = $("#game-input").val();

      if (gameTitle !== "") {
        topics.push(gameTitle);
      }

      renderButtons();
    });
  } /// addGames();

  // Gets gifs from Giphy API and displays them to the page.
  function displayGetGifs() {
    $(document).on("click", ".gameBtn", function () {
      var game = $(this).attr("data-name");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        game + "&api_key=Mh76UAvQu5V032f0X2CIwOI2QGJFpdbB&limit=10";

      console.log(game);

      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .then(function (response) {
        var results = response.data;
        console.log(response);

          for (var i = 0; i < results.length; i++) {
            var gifSpan = $("<span>");

            var rating = results[i].rating;

            var p = $("<p>");
            p.text("Rating: " + rating)

            var newDiv = $("<div class='imgPanel float-left border border-dark my-1'>");

            // Add classes to format rating info here.
            p.addClass("py-3 mb-0");
            
            var gameImage = $("<img>");

            gameImage.attr("src", results[i].images["fixed_width_still"].url);

            // Add classes for gameImage here.
            gameImage.addClass("gif");

            gameImage.attr("data-state", "still");
            gameImage.attr("data-still", results[i].images["fixed_width_still"].url)
            gameImage.attr("data-animate", results[i].images["fixed_width"].url)

            newDiv.prepend(p);
            newDiv.prepend(gameImage);
            
            gifSpan.prepend(newDiv);

            $("#gifs-appear-here").prepend(gifSpan);
          } /// for-loop

          console.log(response);
        });
    });
  } /// displayGetGifs();

  // Sets up functionality of animated gifs using 'data-state' to toggle between 'still' and 'animate'
  function gifClickState() {
    $(document).on("click", ".gif", function () {

      var state = $(this).attr("data-state");
      console.log(state);

      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");

      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }

    });
  } /// gifClickState();

  // Main game function calls ////
  renderButtons();
  gifClickState();
  displayGetGifs();
  addGames();

}); /// $(document).ready(function() {});