//igdb ajax call

var currentGameID = 0;

function getGameWebs(game) {
    var currentGame = game;

    var queryURL = "https://api.rawg.io/api/games?search=" + currentGame;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {


        console.log(response.results[0].name); // game name
        console.log(response.results[0].background_image); // background to be used
        console.log("---------------------");
        
        console.log(response.results[0].clip); //if null then don't look
        console.log(response.results[0].clip.clip); //clip
        console.log(response.results[0].clip.preview); //clip still image
        console.log("---------------------");

        console.log(response.results[0].platforms); 
        console.log(response.results[0].platforms[0].platform.name); //iterate thru for all consoles
        console.log("---------------------");

        console.log(response.results[0].released);
        console.log("---------------------");

        console.log(response.results[0].genres); 
        console.log(response.results[0].genres[0].name); // genre might need iterated
        console.log("---------------------");

        console.log(response.results[0].short_screenshots);
        console.log(response.results[0].short_screenshots[0].image); // iterate for these
        console.log("---------------------");
        console.log(response.results[0].id); //possibly an id to utilize later?
        console.log("---------------------");

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

    /* var XML = new XMLHttpRequest();
            
            XML.open("GET", "https://api.twitch.tv/helix/streams/?user_id=CHANNELID");
            XML.setRequestHeader('Client-ID', 'ynhtm2667o42ij79qpienqgfg5jbzr');
            var data = XML.send();
            console.log(data); */

            var XML = new XMLHttpRequest();
            var response = null;
            
            XML.open("GET", "https://api.twitch.tv/helix/streams/?game_id=33214");
            XML.setRequestHeader('Client-ID', 'ynhtm2667o42ij79qpienqgfg5jbzr');
            XML.send();
            XML.onload = function () {
              response = JSON.parse(XML.response);
              console.log(response);
            }
};

getGameWebs("Halo");