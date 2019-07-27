/* global moment */

// When user clicks add-btn
$("#message-submit").on("click", function(event) {
    event.preventDefault();
  
    // Make a newMessage object
    var newMessage = {
      author: $("#author").val().trim(),
      body: $("#message-box").val().trim(),
      created_at: moment().format("YYYY-MM-DD HH:mm:ss")
    };
  
    console.log(newMessage);
  
    // Send an AJAX POST-request with jQuery
    $.post("/new", newMessage)
      // On success, run the following code
      .then(function() {
  
        var row = $("<div>");
        row.addClass("messages");
  
        row.append("<p>" + newMessage.author + " posted: </p>");
        row.append("<p>" + newMessage.body + "</p>");
        row.append("<p>At " + moment(newMessage.created_at).format("h:mma on dddd") + "</p>");
  
        $("#message-area").prepend(row);/* global moment */

        // When user clicks add-btn
        $("#message-submit").on("click", function(event) {
          event.preventDefault();
        
          // Make a newMessage object
          var newMessage = {
            author: $("#author").val().trim(),
            body: $("#message-box").val().trim(),
            created_at: moment().format("YYYY-MM-DD HH:mm:ss")
          };
        
          console.log(newMessage);
        
          // Send an AJAX POST-request with jQuery
          $.post("/api/new", newMessage)
            // On success, run the following code
            .then(function() {
        
              var row = $("<div>");
              row.addClass("chirp");
        
              row.append("<p>" + newMessage.author + " posted: </p>");
              row.append("<p>" + newMessage.body + "</p>");
              row.append("<p>At " + moment(newMessage.created_at).format("h:mma on dddd") + "</p>");
        
              $("#message-area").prepend(row);
        
            });
        
          // Empty each input box by replacing the value with an empty string
          $("#author").val("");
          $("#message-box").val("");
        });
        
        // When the page loads, grab all of our messages
        $.get("/api/all", function(data) {
        
          if (data.length !== 0) {
        
            for (var i = 0; i < data.length; i++) {
        
              var row = $("<div>");
              row.addClass("message");
        
              row.append("<p>" + data[i].author + " posted.. </p>");
              row.append("<p>" + data[i].body + "</p>");
              row.append("<p>At " + moment(data[i].created_at).format("h:mma on dddd") + "</p>");
        
              $("#message-area").prepend(row);
        
            }
        
          }
        
        });
  
      });
  
    // Empty each input box by replacing the value with an empty string
    $("#author").val("");
    $("#message-box").val("");
  });
  
  // When the page loads, grab all of our messages
  $.get("/all", function(data) {
  
    if (data.length !== 0) {
  
      for (var i = 0; i < data.length; i++) {
  
        var row = $("<div>");
        row.addClass("message");
  
        row.append("<p>" + data[i].author + " posted.. </p>");
        row.append("<p>" + data[i].body + "</p>");
        row.append("<p>At " + moment(data[i].created_at).format("h:mma on dddd") + "</p>");
  
        $("#message-area").prepend(row);
  
      }
  
    }
  
  });