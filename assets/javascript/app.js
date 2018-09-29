// API-key for giphy: Mh76UAvQu5V032f0X2CIwOI2QGJFpdbB

$(document).ready(function() {
    console.log("app.js is running");

    var topics = ["Sonic the Hedgehog", "Fallout 4", "Rocket League", "Diablo 3" ,"Final Fantasy VII", "Xenogears", "Little Big Planet", "Elite Dangerous", "Destiny", ];
    var gameTitle = "";

    // Function declaration to render initial videogame buttons.
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
    $("#add-game").on("click", function() {
        event.preventDefault();

        gameTitle = $("#game-input").val();
        
        if (gameTitle !== "") {
            topics.push(gameTitle);
        }         
        
        renderButtons();
    });

    // Function call to render the initial videogame buttons.
    renderButtons();

    $(document).on("click", ".gameBtn", function() {
        var game = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          game + "&api_key=Mh76UAvQu5V032f0X2CIwOI2QGJFpdbB&limit=10";
  
        console.log(game);

        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            var results = response.data;
  
            for (var i = 0; i < results.length; i++) {
              var gifDiv = $("<div>");
  
              var rating = results[i].rating;
  
              var p = $("<p>").text("Rating: " + rating);
  
              var gameImage = $("<img>");

              gameImage.attr("src", results[i].images["fixed_width_still"].url);
              
              gameImage.addClass("gif");
              
              gameImage.attr("data-state", "still");
              gameImage.attr("data-still", results[i].images["fixed_width_still"].url)
              gameImage.attr("data-animate", results[i].images["fixed_width"].url)

              
  
              gifDiv.prepend(p);
              gifDiv.prepend(gameImage);
  
              $("#gifs-appear-here").prepend(gifDiv);
            }

            console.log(response);
          });
      });

      $(document).on("click", ".gif", function() {
        
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

}); ///$(document).ready(function() {});
