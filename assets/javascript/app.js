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
        console.log(queryURL);
        

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

        // FIXME: start of twitch xml call
        
         var XML = new XMLHttpRequest();
         var response = null;
         var x_query_game = "https://api.twitch.tv/helix/games?name=" + currentGame;


         XML.open("GET", x_query_game);
         XML.setRequestHeader('Client-ID', 'ynhtm2667o42ij79qpienqgfg5jbzr');
         XML.send();
         XML.onload = function () {
             response = JSON.parse(XML.response);
             let x_query_id = "https://api.twitch.tv/helix/streams/?game_id=" + response.data[0].id;
             XML.open("GET", x_query_id);
             XML.setRequestHeader('Client-ID', 'ynhtm2667o42ij79qpienqgfg5jbzr');
             XML.send();
             XML.onload = function() {
                response = JSON.parse(XML.response);
                console.log(response);

                if (response.data.length != 0) {
                    itemNo = 0;
                    for (var index = 0; index < response.data.length; index++) {
                        
                        if (itemNo < 5) {
                            $(".Slide" + (index+1)  + "iframe").attr("src", "https://embed.twitch.tv?channel='" + response.data[index].user_name + "'&layout=video"); 
                           console.log(response.data[index].user_name);
                            // new Twitch.Embed("twitch-embed" + (index+1), {
                            //     width: 854,
                            //     height: 480,
                            //     layout: "video",
                            //     channel: "'" + response.data[index].user_name + "'",                                                         
                            //   });

                            itemNo++;

                        }
                    }
                }
                
             }
         }
 


        //TODO: use this info later for rawg API stuff
        currentGameID = response.results[0].id;

    });

 
};

function showTwitch() {
    hideImg();
    for (let index = 0; index < 5; index++) {
        $(".Slide" + (index + 1) + "iframe").show();
        $(".Slide" + (index + 1) + "twitch").hide();
        console.log(index);
    }    
    
}

function hideImg() {
    // $("img").attr("src", "").css("opacity", 0);
    // $("img").hide();
    $("img").css({
        position: "absolute",
        top: "-99999999px",
        left: "-9999999999999px"
    });
}

function showImg() {
    // $("img").attr("src", "").css("opacity", 0);
    // $("img").hide();
    $("img").css({
        position: "initial",
        top: "0",
        left: "o"
    });
}

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


