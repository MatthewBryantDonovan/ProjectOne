var currentGameID = 0;

var userInput = document.getElementById("game-entry");
userInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("game-submit").click();
    }
});

function getGame() {
    var game = "";
    event.preventDefault();
    game = $("#game-entry").val().trim();
    if (game == "") {
        return;
    }
    $("#game-entry").val("");
    getGameWebs(game);
};

function getGameWebs(game) {
    var currentGame = game;

    var queryURL = "https://api.rawg.io/api/games?search=" + currentGame;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        //display game name
        $("#game-name").empty();
        $("#game-name").html("<h1>" + response.results[0].name + "</h1>");

        // display background image TODO: chose one of the next 2
        $("#game-background_image").empty();
        if (response.results[0].background_image != null) {
            $("#game-background_image").html("<img class='matt' src=' " + response.results[0].background_image + "'></img>");
            /* $("body").css({
                "background": "url(" + response.results[0].background_image + ")",
                "background-repeat": "no-repeat",
            }); */
        } else {
            $("#game-background_image").html("<img class='matt' src=' " + response.results[0].short_screenshots[0].image + "'></img>");
            /* $("body").css({
                "background": "url(" + response.results[0].short_screenshots[0].image + ")",
                "background-repeat": "no-repeat",
            }); */
        }

        //display clip if it has one TODO: type=video/mp4 might not always work
        $("#game-clip").empty();
        if (response.results[0].clip != null) {
            $("#game-clip").html("<video class='matt' controls name='media'><source src='" + response.results[0].clip.clip + "' type=video/mp4></video>");
            /* console.log(response.results[0].clip.preview); */ //TODO: might need to utilize this
        }

        // display platforms
        $("#game-platforms").empty();
        if (response.results[0].platforms.length != 0) {
            var platforms = "";
            for (var index = 0; index < response.results[0].platforms.length; index++) {
                platforms += response.results[0].platforms[index].platform.name;
                if(index < (response.results[0].platforms.length-1)){
                    platforms += ", ";
                }
            }

            $("#game-platforms").html("<h1>" + platforms + "</h1>");
        }

        //displayed released date
        $("#game-released").empty();
        $("#game-released").html("<h1>" + moment(response.results[0].released, "YYYY-MM-DD").format("MMM Do YYYY") + "</h1>");
        
        // display genres
        if (response.results[0].genres.length != 0) {
            var genres = "";
            for (var index = 0; index < response.results[0].genres.length; index++) {
                genres += response.results[0].genres[index].name;
                if(index < (response.results[0].genres.length-1)){
                    genres += ", ";
                }
            }

            $("#game-genres").html("<h1>" + genres + "</h1>");
        }

        //display screenshots
        $("#game-short_screenshots").empty();
        if (response.results[0].short_screenshots.length != 0) {
            var short_screenshots = "";
            for (var index = 0; index < response.results[0].short_screenshots.length; index++) {
                short_screenshots += "<img class='matt' src=' " + response.results[0].short_screenshots[index].image + "'></img>"
            }

            $("#game-short_screenshots").html(short_screenshots);
        }

        //TODO: use this info later for rawg API stuff
        currentGameID = response.results[0].id;

        // 


        /*  var gameDiv = $("div");

         gameDiv.append($("p")).html(response.results[1].name);

          gameDiv.append("img").attr({
             "src": response.results[1].images.original_still.url,
             "data-picNum": "1",
             "data-pic1": response.data[i].images.original_still.url,
             "data-pic2": response.data[i].images.original.url,
         }); */

    });


    /*     var XML = new XMLHttpRequest();
        var response = null;

        XML.open("GET", "https://api.twitch.tv/helix/streams/?game_id=33214");
        XML.setRequestHeader('Client-ID', 'ynhtm2667o42ij79qpienqgfg5jbzr');
        XML.send();
        XML.onload = function () {
            response = JSON.parse(XML.response);
            console.log(response);
        } */
};
