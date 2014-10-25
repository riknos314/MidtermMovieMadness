postpgrating = function(pgrat) {    //used to push elements to page in getMovieInfo()
	var divcontainer = document.createElement('DIV');
	var parcontainer = document.createElement('p');
	parcontainer.innerHTML = pgrat;
	divcontainer.appendChild(parcontainer);
	document.body.appendChild(divcontainer);
	
}

postcriticrating = function(crat) { //used to push elements to page in getMovieInfo()
	var divcontainer = document.createElement('DIV');
	var parcontainer = document.createElement('p');
	parcontainer.innerHTML = "Critics' score: " + crat;
	divcontainer.appendChild(parcontainer);
	document.body.appendChild(divcontainer);
}

postaudiencerating = function(arat) { //used to push elements to page in getMovieInfo()
	var divcontainer = document.createElement('DIV');
	var parcontainer = document.createElement('p');
	parcontainer.innerHTML = "Audience score: " + arat;
	divcontainer.appendChild(parcontainer);
	document.body.appendChild(divcontainer);
}

postsynopsis = function(_synopsis) { //used to push elements to page in getMovieInfo()
	if (_synopsis == "")
		_synopsis = "No synopsis available for this movie";
	var divcontainer = document.createElement('DIV');
	var parcontainer = document.createElement('p');
	parcontainer.innerHTML = "Synopsis: " + _synopsis;
	divcontainer.appendChild(parcontainer);
	document.body.appendChild(divcontainer);
}

postmoviepic = function(movpic) { //used to push elements to page in getMovieInfo()
	var divcontainer = document.createElement('DIV');
	divcontainer.innerHTML = "<img src=" + movpic + "></img>";
	document.body.appendChild(divcontainer);
}



getYouTubeTrailer = function(moviename) {  //Equivalent of getMovieInfo(), but for Youtube trailer
	//This is just a skeleton function right now
	var request = new XMLHttpRequest();
	
	request.onreadystatechange = function() {
		if (request.readyState == 4)
			if (request.status == 200) {
				var infodict = JSON.parse(request.responseText);
				
				console.log(infodict);
			}
	}
	var movienamelist = moviename.split(" ");
	var searchQuery = movienamelist.shift();
	while (movienamelist.length != 0) {
		searchQuery = searchQuery + "+" + movienamelist.shift();
	}
	searchQuery = searchQuery + "+Trailer";
	
	console.log(searchQuery);
	
	var targetURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + searchQuery + "&type=video&videoEmbeddable=true&key=AIzaSyBWCUE9DE9Ay5tfLMl5CXR-I9cW98Nb8HA";
		
	request.open('GET', targetURL, true);
	
	request.send(null);
}








getMovieInfo = function() {   //Gets Rotten Tomatoes info

	var request = new XMLHttpRequest();

    request.onreadystatechange = function() {

	if (request.readyState == 4)
		if (request.status == 200) {    //build dictionary in this block
				
			var infodict = JSON.parse(request.responseText);     //this holds all the movie info
			
			var moviefound = true;                              //to test if a movie is found or not
			if (infodict.total == 0)
				moviefound = false;
				
			if (moviefound) {
				var listlength = infodict.movies.length;
				var movie;
				var moviematch = false
				for (var i=0; i<listlength; i++) {                 //Determine exactly which movie we want from the results
					if (movietitle.value.length == infodict.movies[i].title.length) {
						movie = infodict.movies[i];
						moviematch = true
						break;
					}
				}
				if (!moviematch)                 //Just in case user enters a type or not exactly the name of the movie
					movie = infodict.movies[0];	
				
				var pgrating = movie.mpaa_rating;			          //Get movie info
				var criticrating = movie.ratings["critics_score"];			
				var audiencerating = movie.ratings["audience_score"];
				var synopsis = movie.synopsis;
				var moviepic = movie.posters["thumbnail"]
			
				
				postpgrating(pgrating);                   //Pushing returned elements onto page
				postcriticrating(criticrating);
				postaudiencerating(audiencerating);
				postsynopsis(synopsis);
				postmoviepic(moviepic);
				
				getYouTubeTrailer(movietitle.value);      //Calls YouTube-vid-creator function
			}
        }
	}

	var movietitle = document.getElementById('movietitle'); //create query string in URI format for targetURL
	var wordlist = movietitle.value.split(" ");
	var searchQuery = wordlist.shift();
		while (wordlist.length != 0) {
			searchQuery = searchQuery + "+" + wordlist.shift();
		}
	
	var targetURL = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=fxee5efruku5fre6wdbe7c6r&q=' + searchQuery + '&page_limit=8';
		
	request.open('GET', targetURL, true);
	
	request.send(null);
	

}

