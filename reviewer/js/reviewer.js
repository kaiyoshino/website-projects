'use strict';

var rating = 0; // does this go here??? ******
var allReviews;
var currentRating;
var starsTotal = 0;


$('#rating').raty({
	click: function(score) {
		rating = 0;
		rating = +score;
	}
});

Parse.initialize("6KZ3eQKMXbXSAXkPeFeYRLkXrOfKZN7ROByAEIRI", "LIRiQTT1stqDPFEYu1pcbAkqeft0sdYY8kBVXS83");

document.getElementById("submit").onclick = function() {
	var Review = Parse.Object.extend("Review");
	var review = new Review();
	review.save({rating: rating});
	review.save({title: $('#title').val()});
	review.save({review: $('#review').val()});
	review.save({vote: 0});
	window.alert("Saving Review");
};

// document.getElementById("up").onclick = function() {
// 	var Review = Parse.Object.extend("Review");
// 	var review = new Parse.Query(Review);
// 	var objectId = $('text.objId').text();
// 	console.log(objectId);
	// var votes = query.get(objectId, {
	// 	success: function(review) {
	// 		votes.increment('vote');
	// 		console.log(votes.get('vote'))
	// 	}
	// 	// error: function(object, error) {


	// 	// }
	// });
	// var voteCount = review.get('vote');
	// console.log(voteCount);
// }


var Review = Parse.Object.extend("Review");
var query = new Parse.Query(Review);

query.find({
  success: function(results) {
    for (var i = 0; i < results.length; i++) {
		var reviewCurrent = results[i];
		starsTotal += reviewCurrent.get('rating');
		var reviewDiv = $("<div class='container-fluid' id=" + reviewCurrent.id + "></div>");
		var rating = "<div class='raty'></div>";
		var stars = $(rating).raty({readOnly: true, score: reviewCurrent.get('rating')});
		var title = $("<h2 class='currentTitle'>" + reviewCurrent.get('title') + "</h2>");
		var button1 = $("<button class='down' id=" + reviewCurrent.id + "><i class='fa fa-thumbs-o-down'></i></button>");
		var button2 = $("<button class='up' id=" + reviewCurrent.id + "><i class='fa fa-thumbs-o-up'></i></button>");
		$('.up').unbind().click(function() {
			var objectId = this.id;
			var votes = query.get(objectId, {
				success: function(review) {
					query.get(objectId).increment('vote');
					query.get(objectId).save();
					console.log(query.get(objectId).get('vote'));
				}
				// error: function(object, error) {

				// }
			});
		});
		var body = $("<p class='body'>" + reviewCurrent.get('review') + "</p>");

		reviewDiv.appendTo('#reviews');
		title.appendTo(reviewDiv);
		stars.appendTo(reviewDiv);
		button1.appendTo(reviewDiv);
		button2.appendTo(reviewDiv);
		body.appendTo(reviewDiv);
    }
    var avg = "<div id='ratyTop'></div>";
	var avgRating = $(avg).raty({readOnly: true, score: starsTotal / results.length});
	avgRating.appendTo('#top'); 
  },
  error: function(error) {
    window.alert("Error: " + error.code + " " + error.message);
  }
});




// var user = new Parse.User();
// user.set("username", "Kai");
// user.set("password", "matterhrn5");
// user.set("email", "friedjuice@hotmail.com");
// user.set("phone", "650-555-0000");
  
// user.signUp(null, {
//   success: function(user) {
//     // Hooray! Let them use the app now.
//   },
//   error: function(user, error) {
//     // Show the error message somewhere and let the user try again.
//     alert("Error: " + error.code + " " + error.message);
//   }
// });
