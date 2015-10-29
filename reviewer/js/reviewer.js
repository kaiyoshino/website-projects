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

$(document).on({
    ajaxStart: function() { $("body").addClass("loading");    },
    ajaxStop: function() { $("body").removeClass("loading"); }    
});

Parse.initialize("6KZ3eQKMXbXSAXkPeFeYRLkXrOfKZN7ROByAEIRI", "LIRiQTT1stqDPFEYu1pcbAkqeft0sdYY8kBVXS83");

window.onload = function(){
	document.getElementById("submit").onclick = function() {
		save();
		window.location.reload()
	};
};

var save = function() {
	var Review = Parse.Object.extend("Review");
	var review = new Review();
	review.set("rating", rating);
	review.set("title", $('#title').val());
	review.set("review", $('#review').val());
	review.set("vote", 0);
	review.save(null, {
		error: function(review, error) {
    		alert('Failed to create new review, with error code: ' + error.message);
    	}
    });
}

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
			var trash = $("<button class='delete'  id=" + reviewCurrent.id + "><i class='fa fa-trash-o'></i></button>");
			var helpfulnes = $("<p class='votes'>Helpfulness votes: <font color='grey'>" + reviewCurrent.get('vote') + "</font></p>");
			var body = $("<p class='body'>" + reviewCurrent.get('review') + "</p>");

			reviewDiv.appendTo('#reviews');
			title.appendTo(reviewDiv);
			stars.appendTo(reviewDiv);
			button1.appendTo(reviewDiv);
			button2.appendTo(reviewDiv);
			trash.appendTo(reviewDiv);
			body.appendTo(reviewDiv);
			helpfulnes.appendTo(reviewDiv);

			$('.up').unbind().click(function() {
				var objectId = this.id;
				var votes = query.get(objectId, {
					success: function(review) {
						review.increment('vote');
						review.save();
						location.reload();
					},
					error: function(object, error) {
						window.alert("Error: " + error.code + " " + error.message);
					}
				});

			});
			$('.delete').unbind().click(function() {
				var objectId = this.id;
				var votes = query.get(objectId, {
					success: function(review) {
						review.destroy();
						location.reload();
					},
					error: function(object, error) {
						window.alert("Error: " + error.code + " " + error.message);
					}
				});
			});
			$('.down').unbind().click(function() {
				var objectId = this.id;
				var votes = query.get(objectId, {
					success: function(review) {
						review.increment('vote', -1);
						review.save();
						location.reload();
					},
					error: function(object, error) {
						window.alert("Error: " + error.code + " " + error.message);
					}
				});

			});
	    }
	    var avg = "<div id='ratyTop'></div>";
		var avgRating = $(avg).raty({readOnly: true, score: starsTotal / results.length});
		avgRating.appendTo('#top'); 
	},
	error: function(error) {
		window.alert("Error: " + error.code + " " + error.message);
	}
});
