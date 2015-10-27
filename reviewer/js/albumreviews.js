'use strict';

var rating = 0; // does this go here??? ******
var allReviews;
var currentRating;


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

		// if (i == 0) { 								// might want to find better solution -- not making template at all if no reviews **
		// 	$('#currentTitle').text(function() {
		// 			return "" + reviewCurrent.get('title');
		// 		});
		// 		$('#currentBody').text(function() {
		// 			return "" + reviewCurrent.get('review');
		// 		});
		// } else {
			// var id = reviewCurrent.id;
			// var clone = $('#reviewTemplate').clone()
			// clone.html(function( index, oldHtml ){
				var reviewDiv = $("<div class='container-fluid' id=" + reviewCurrent.id + "></div>");
				var rating = $("<div id='ratingFixed'></div>");
				var title = $("<h2 id='currentTitle'>" + reviewCurrent.get('title') + "</h2>");
				var button1 = $("<button id='up'><i class='fa fa-thumbs-o-down'></i></button>");
				var button2 = $("<button id='down'><i class='fa fa-thumbs-o-up'></i></button>");
				var body = $("<p>" + reviewCurrent.get('review') + "</p>");
				// $('#currentTitle', clone).text(function() {
				// 	return "" + reviewCurrent.get('title');
				// });
				// $('#currentBody', clone).text(function() {
				// 	return "" + reviewCurrent.get('review');
				// });
				// console.log(clone.html());

				console.log(reviewCurrent.get('rating'));

				$('#ratingFixed').raty({readOnly: true, score: reviewCurrent.get('rating')});
				
				reviewDiv.appendTo('#reviews');
				title.appendTo(reviewDiv);
				rating.appendTo(reviewDiv);
				button1.appendTo(reviewDiv);
				button2.appendTo(reviewDiv);
				body.appendTo(reviewDiv);
			// })
			// clone.insertAfter("#reviewTemplate");
		// }
    }
  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
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
