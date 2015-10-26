'use strict';

var rating = 0;

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
	review.save({review: $('#body').val()});
};

// var Rating = Parse.Object.extend("Rating");
// var ratingOne = new Rating();
//   ratingOne.save({rating: "2"});
//   ratingOne.save({artist: "The Beatles"});
//   ratingOne.save({title: "Sgt. Pepper's Lonely Hearts Club Band"})
//   ratingOne.save({comment: "Mediocre imo."})

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
