'use strict';

var rating = 0; // does this go here??? ******
var reviewCurrent = {rating:0}
var allReviews;

$('.ratingFixed').raty({score: reviewCurrent.rating});

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
};

var Review = Parse.Object.extend("Review");
var query = new Parse.Query(Review);
query.find({
  success: function(results) {
    for (var i = 0; i < results.length; i++) {
		var reviewCurrent = results[i];
		if (i == 0) { 								// might want to find better solution -- not making template at all if no reviews **
			$('#currentTitle').text(function() {
					return "" + reviewCurrent.get('title');
				});
				$('#currentBody').text(function() {
					return "" + reviewCurrent.get('review');
				});
		} else {
			var clone = $('#reviewTemplate').clone()
			clone.html(function( index, oldHtml ){
				$('#currentTitle', clone).text(function() {
					return "" + reviewCurrent.get('title');
				});
				$('#currentBody', clone).text(function() {
					return "" + reviewCurrent.get('review');
				});
				return clone.html();
			})
			clone.insertAfter("#reviewTemplate");
			console.log(clone.html());
		}
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
