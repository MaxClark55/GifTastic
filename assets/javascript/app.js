var Syfy = ["Game of Thrones", "Star Trek", "Sharknado", "Back to The Future","Westworld","The Fifth Element"];
var Div = $("#Buttons")

function makeButtons(){
    Div.empty();
    for (var i = 0; i <Syfy.length; i++){
        var newButton = $("<button>")
        .addClass("syfy")
        .addClass("btn btn-dark")
        .attr("data-name", Syfy[i])
        .text(Syfy[i]);
        Div.append(newButton);
    }
}

makeButtons();

$("#addGiphy").on("click", function (event) {
	event.preventDefault();
	var Scifi = $("#syfy-input").val().trim();
	Syfy.push(Scifi);
	makeButtons();
});

 
$(document).on("click", ".syfy", function(){
	var syfyGif = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q="+syfyGif+"&api_key=IpEfiyAjanSaZGtMCmdILDa96NBg65jM&limit=10&rating=G&lang=en"
	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(response){
		console.log(response);
		console.log(queryURL);
		var results = response.data;
		console.log(results);
		for (var i = 0; i < results.length; i++){
			var Div1 = $("<div class='gifs'>")
			var newP = $("<p>").text("Rating: "+results[i].rating)
			var syfyGif= $("<img>")
            syfyGif.addClass("syfyImage")
   			syfyGif.addClass("img-fluid")
			syfyGif.attr("src", results[i].images.fixed_height_still.url)
			syfyGif.attr("isPlaying", results[i].images.fixed_height.url)
			syfyGif.attr("isStopped", results[i].images.fixed_height_still.url);
			Div1.append(syfyGif);
			Div1.append(newP);
			$("#syfyGif").prepend(Div1);
		}
	})
});


$(document).on("click", ".syfyImage", function(){
	var src = $(this).attr("src");
	if ($(this).hasClass("playing")){
		$(this).attr("src", $(this).attr("isStopped"));
		$(this).removeClass("playing")
	}else {
		$(this).addClass("playing");
		$(this).attr("src", $(this).attr("isPlaying"))
	}
	});