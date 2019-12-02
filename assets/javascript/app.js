$(".single-item").slick({
    dots: true
});

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
    showImg();
    showYoutube();
    showTwitch();

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
    }).then(function (data0) {
        currentgame = data0.results[0].name;
        console.log(data0);
        console.log(data0.results[0].name);

        //FIXME: start youtube
        // youtube ajax call
        $.ajax({
            type: "get",
            url: "https://www.googleapis.com/youtube/v3/search?part=snippet&q=review " + data0.results[0].name + "&type=videos&key=AIzaSyDhIq2RbDOejDvlF0ihBgO92LTwp6I1U28",
            success: function (data1) {
                console.log(data1);
                /* console.log(data1.items[index].id.videoId); */

                itemNo = 0;
                for (var index = 0; index < data1.items.length; index++) {

                    if (itemNo < 5) {
                        $(".Slide" + (index + 1) + "youtube").attr("src", "https://www.youtube.com/embed/" + data1.items[index].id.videoId);
                        itemNo++;
                    }
                }
            }
        });
        //FIXME: end youtube



        //display game name
        $("#game-name").html("<h1>" + data0.results[0].name + "</h1>");



        // // display background image TODO: chose one of the next 2
        // if (data0.results[0].background_image != null) {
        //     hasBG = true;
        //     carouselItem.html("<img src='" + data0.results[0].background_image + "' class='d-block w-100' alt='...'>")
        // } else {
        // }

        // //display clip if it has one TODO: type=video/mp4 might not always work
        // if (data0.results[0].clip != null) {
        //     $("#game-clip").html("<video class='matt' controls name='media'><source src='" + data0.results[0].clip.clip + "' type=video/mp4></video>");
        // }

        // display platforms
        if (data0.results[0].platforms.length != 0) {
            var platforms = "";
            for (var index = 0; index < data0.results[0].platforms.length; index++) {
                platforms += data0.results[0].platforms[index].platform.name;
                if (index < (data0.results[0].platforms.length - 1)) {
                    platforms += ", ";
                }
            }

            $("#game-platforms").html("<h1>" + platforms + "</h1>");
        }

        //displayed released date
        $("#game-released").html("<h1>" + moment(data0.results[0].released, "YYYY-MM-DD").format("MMM Do YYYY") + "</h1>");

        // display genres
        if (data0.results[0].genres.length != 0) {
            var genres = "";
            for (var index = 0; index < data0.results[0].genres.length; index++) {
                genres += data0.results[0].genres[index].name;
                if (index < (data0.results[0].genres.length - 1)) {
                    genres += ", ";
                }
            }

            $("#game-genres").html("<h1>" + genres + "</h1>");
        }

        //display screenshots
        if (data0.results[0].short_screenshots.length != 0) {

            for (var index = 0; index < data0.results[0].short_screenshots.length; index++) {

                if (itemNo < 5) {

                    if (itemNo == 0) {
                        $(".car" + (index + 1)).attr("class", "carousel-item active car" + (index + 1));

                    } else {
                        $(".car" + (index + 1)).attr("class", "carousel-item car" + (index + 1));
                    }

                    $(".car" + (index + 1)).show();
                    $(".Slide" + (index + 1) + "iframe").hide();
                    $(".Slide" + (index + 1) + "youtube").hide();

                    $(".Slide" + (index + 1) + "img").attr("src", data0.results[0].short_screenshots[index].image);

                    itemNo++;



                }
            }
        }

        //TODO: use this info later for rawg API stuff
        currentGameID = data0.results[0].id;

        //Giantbomb call for name to give to twitch
        $.ajax({
            type: 'GET',
            dataType: 'jsonp',
            crossDomain: true,
            jsonp: 'json_callback',
            url: 'https://www.giantbomb.com/api/search/?format=jsonp&api_key=6ce9922ee0247c661db0e2af89818c4e9441b306&query=' + data0.results[0].name,
        }).done(function (gbdata) {
            console.log(gbdata);
            console.log(gbdata.results[0].name);
            // FIXME: start of twitch xml call

            var XML = new XMLHttpRequest();

            var x_query_game = "https://api.twitch.tv/helix/games?name=" + (gbdata.results[0].name);
            console.log(x_query_game);


            XML.open("GET", x_query_game);
            XML.setRequestHeader('Client-ID', 'ynhtm2667o42ij79qpienqgfg5jbzr');
            XML.send();
            XML.onload = function () {
                response = JSON.parse(XML.response);
                console.log(response);


                if (response.data.length != 0) {
                    let x_query_id = "https://api.twitch.tv/helix/streams/?game_id=" + response.data[0].id + "&first=5";
                    XML.open("GET", x_query_id);
                    XML.setRequestHeader('Client-ID', 'ynhtm2667o42ij79qpienqgfg5jbzr');
                    XML.send();
                    XML.onload = function () {
                        response = JSON.parse(XML.response);
                        console.log(response);

                        if (response.data.length != 0) {
                            itemNo = 0;
                            for (var index = 0; index < response.data.length; index++) {

                                if (itemNo < 5) {
                                    $(".Slide" + (index + 1) + "iframe").attr("src", "https://embed.twitch.tv?channel='" + response.data[index].user_name + "'&layout=video");
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
            }


            //FIXME: trying stuff start
            // $.ajax({
            //     type: 'GET',
            //     dataType: 'jsonp',
            //     crossDomain: true,
            //     jsonp: 'json_callback',
            //     url: 'https://www.giantbomb.com/api/reviews/?format=jsonp&api_key=6ce9922ee0247c661db0e2af89818c4e9441b306&limit=5' + gbdata.results[0].guid,
            // }).done(function (gbrev) {
            //     console.log(gbrev);
            // }).fail(function () {
            //     console.log("error");

            // })
            //FIXME: tyring stuff end 
        }).fail(function () {
            console.log("error");

        })

    });


};

function runImg() {
    showImg();
    hideTwitch();
    hideYoutube();
    for (let index = 0; index < 5; index++) {
        $(".Slide" + (index + 1) + "img").show();
        $(".Slide" + (index + 1) + "iframe").hide();
        $(".Slide" + (index + 1) + "youtube").hide();
    }

}

function runTwitch() {
    showTwitch();
    hideImg();
    hideYoutube();
    for (let index = 0; index < 5; index++) {
        $(".Slide" + (index + 1) + "img").hide();
        $(".Slide" + (index + 1) + "iframe").show();
        $(".Slide" + (index + 1) + "youtube").hide();
    }

}

function runYoutube() {
    showYoutube();
    hideImg();
    hideTwitch();
    for (let index = 0; index < 5; index++) {
        $(".Slide" + (index + 1) + "img").hide();
        $(".Slide" + (index + 1) + "iframe").hide();
        $(".Slide" + (index + 1) + "youtube").show();
    }

}

function hideImg() {
    // $("img").attr("src", "").css("opacity", 0);
    // $("img").hide();
    $(".car-img").css({
        position: "absolute",
        top: "-99999999px",
        left: "-9999999999999px"
    });
}

function hideTwitch() {
    // $("img").attr("src", "").css("opacity", 0);
    // $("img").hide();
    $(".car-twitch").css({
        position: "absolute",
        top: "-99999999px",
        left: "-9999999999999px"
    });
}

function hideYoutube() {
    // $("img").attr("src", "").css("opacity", 0);
    // $("img").hide();
    $(".car-youtube").css({
        position: "absolute",
        top: "-99999999px",
        left: "-9999999999999px"
    });
}

function showImg() {
    // $("img").attr("src", "").css("opacity", 0);
    // $("img").hide();
    $(".car-img").css({
        position: "initial",
        top: "0",
        left: "o"
    });
}

function showTwitch() {
    // $("img").attr("src", "").css("opacity", 0);
    // $("img").hide();
    $(".car-twitch").css({
        position: "initial",
        top: "0",
        left: "o"
    });
}

function showYoutube() {
    // $("img").attr("src", "").css("opacity", 0);
    // $("img").hide();
    $(".car-youtube").css({
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