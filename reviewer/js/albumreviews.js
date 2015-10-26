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
		var clone = $('#reviewTemplate').clone().html(function(index, oldHtml){
			console.log(oldHtml);
			if(index == 1) {
				$(this).text(reviewCurrent.get('title'));
			// } else if (index == 2) {
			// 	return reviewCurrent.get('information');
			} else if (index == 3) {
				$(this).text(reviewCurrent.get('review'));
			}
		}).insertAfter("#reviewTemplate");
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
