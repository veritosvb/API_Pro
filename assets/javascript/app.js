
var topics = ["palm","beach","california","hotel","surf"];

function putOnPage() {
    $("#botones-div").empty(); // empties out the html
    var insideList = JSON.parse(localStorage.getItem("topicsList"));

    if (!Array.isArray(insideList)) {
        insideList = [];
        insideList = topics;
    }

    // render our insideList todos to the page
    for (var i = 0; i < insideList.length; i++) {
        var b = $("<button class='topic btn btn-primary shadow-lg m-1 p-3'>").text(insideList[i]).attr("data-topic", insideList[i]);
        $("#botones-div").append(b);
    }
}
          
putOnPage();

$("#submit").on("click",function() {
    event.preventDefault();
    var ntopic = $("input[type='text']").val();
    $("input[type='text']").val("");    
    
    if(ntopic !== ""){
        localStorage.setItem("topicsList", JSON.stringify(topics));
        var b = $("<button class='topic btn btn-primary shadow-lg m-2 p-3'>").text(ntopic).attr("data-topic", ntopic);
        $("#botones-div").append(b);
        var ntopic = ntopic.replace(" ", "_");
        topics.push(ntopic);
    }
});

$(document).on("click",".topic",function() {
    var q = $(this).attr("data-topic")+"+vacation";
    var limit = 10;
    var offset = 0;
    var rating = "";
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=UI65aC0WjCNEEiSHydV97XArkJCD3PRG&q=" +
    q + "&limit=" + limit + "&offset=" +offset + "&lang=en"
       
    // Performing an AJAX request with the queryURL
    $.ajax({
    url: queryURL,
    method: "GET"
    })
        // After data comes back from the request
    .then(function(response) {
        $("#gifs-appear-here").empty();

          // storing the data from the AJAX request in the results variable
        var results = response.data;
        console.log(results);
          // Looping through each result item
        for (var i = 0; i < results.length; i++) {
            var baseDiv = $("<div class= 'col-12 col-sm-6 col-md-4 col-lg-3'>");
            var p = $("<h4 class='text-centered'>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var newImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            newImage.attr("src", results[i].images.original.url);
            newImage.attr("data-state","animate");
            newImage.attr("data-animate",results[i].images.original.url);
            newImage.attr("data-still", results[i].images.original_still.url);
            newImage.attr("alt", results[i].images.original_still.url);
            newImage.addClass("gif m-1");

            // Appending the paragraph and image tag to the baseDiv
            baseDiv.append(p);
            baseDiv.append(newImage);
            
            // Prependng the baseDiv to the HTML page in the "#gifs-appear-here" div
            $("#gifs-appear-here").prepend(baseDiv);
        }
    });
});


$(document).on("click", ".gif", function() {
  var state = $(this).attr("data-state");

  if (state == "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

