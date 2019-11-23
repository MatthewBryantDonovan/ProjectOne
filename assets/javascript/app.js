var currentGameID = 0;

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
    $("#carouselExampleFade").show();

    var itemNo = 0;


    for (let index = 0; index < 5; index++) {
        $(".car" + index).attr("class", "car" + index);
        $(".car" + index).hide();
    }

    var currentGame = game;
    // var hasBG = false;

    var queryURL = "https://api.rawg.io/api/games?search=" + currentGame;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        //display game name
        $("#game-name").html("<h1>" + response.results[0].name + "</h1>");

        // // display background image TODO: chose one of the next 2
        // if (response.results[0].background_image != null) {
        //     hasBG = true;
        //     carouselItem.html("<img src='" + response.results[0].background_image + "' class='d-block w-100' alt='...'>")
        // } else {
        // }

        // //display clip if it has one TODO: type=video/mp4 might not always work
        // if (response.results[0].clip != null) {
        //     $("#game-clip").html("<video class='matt' controls name='media'><source src='" + response.results[0].clip.clip + "' type=video/mp4></video>");
        // }

        // display platforms
        if (response.results[0].platforms.length != 0) {
            var platforms = "";
            for (var index = 0; index < response.results[0].platforms.length; index++) {
                platforms += response.results[0].platforms[index].platform.name;
                if (index < (response.results[0].platforms.length - 1)) {
                    platforms += ", ";
                }
            }

            $("#game-platforms").html("<h1>" + platforms + "</h1>");
        }

        //displayed released date
        $("#game-released").html("<h1>" + moment(response.results[0].released, "YYYY-MM-DD").format("MMM Do YYYY") + "</h1>");

        // display genres
        if (response.results[0].genres.length != 0) {
            var genres = "";
            for (var index = 0; index < response.results[0].genres.length; index++) {
                genres += response.results[0].genres[index].name;
                if (index < (response.results[0].genres.length - 1)) {
                    genres += ", ";
                }
            }

            $("#game-genres").html("<h1>" + genres + "</h1>");
        }

        //display screenshots
        if (response.results[0].short_screenshots.length != 0) {

            for (var index = 0; index < response.results[0].short_screenshots.length; index++) {

                if (itemNo < 5) {

                    if (itemNo == 0) {
                        $(".car" + (index + 1)).attr("class", "carousel-item active car" + (index + 1));

                    } else {
                        $(".car" + (index + 1)).attr("class", "carousel-item car" + (index + 1));
                    }

                    $(".car" + (index + 1)).show();
                    $(".Slide" + (index + 1) + "iframe").hide();
                    $(".Slide" + (index + 1) + "twitch").hide();

                    $(".Slide" + (index + 1) + "img").attr("src", response.results[0].short_screenshots[index].image);

                    itemNo++;



                }
            }
        }

        //TODO: use this info later for rawg API stuff
        currentGameID = response.results[0].id;

    });


    /* var XML = new XMLHttpRequest();
    var response = null;

    XML.open("GET", "https://api.twitch.tv/helix/streams/?game_id=33214");
    XML.setRequestHeader('Client-ID', 'ynhtm2667o42ij79qpienqgfg5jbzr');
    XML.send();
    XML.onload = function () {
        response = JSON.parse(XML.response);
        console.log(response);

    }
 */
};

$("#carouselExampleFade").hide();
$(".car1").attr("class", "car1");
$(".car1").hide();
$(".car2").attr("class", "car2");
$(".car2").hide();
$(".car3").attr("class", "car3");
$(".car3").hide();
$(".car4").attr("class", "car4");
$(".car4").hide();
$(".car5").attr("class", "car5");
$(".car5").hide();