/* global moment */

// When user clicks add-btn
$("#post-submit").on("click", function(event) {
  event.preventDefault();

  // Make a newPost object
  var newPost = {
    username: $("#username").val().trim(),
    body: $("#post-box").val().trim(),
    created_at: moment().format("YYYY-MM-DD HH:mm:ss")
  };

  console.log(newPost);

  // Send an AJAX POST-request with jQuery
  $.post("/new", newPost)
    // On success, run the following code
    .then(function() {

      var row = $("<div>");
      row.addClass("post");

      row.append("<p>" + newPost.username + " posted: </p>");
      row.append("<p>" + newPost.body + "</p>");
      row.append("<p>At " + moment(newPost.created_at).format("h:mma on dddd") + "</p>");

      $("#post-area").prepend(row);

    });

  // Empty each input box by replacing the value with an empty string
  $("#username").val("");
  $("#post-box").val("");
});

// When the page loads, grab all of our posts
$.get("/all", function(data) {

  if (data.length !== 0) {

    for (var i = 0; i < data.length; i++) {

      var row = $("<div>");
      row.addClass("post");

      row.append("<p>" + data[i].username + " posted.. </p>");
      row.append("<p>" + data[i].body + "</p>");
      row.append("<p>At " + moment(data[i].created_at).format("h:mma on dddd") + "</p>");

      $("#post-area").prepend(row);

    }

  }

});