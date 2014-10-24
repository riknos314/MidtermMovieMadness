getMovieInfo = function() {   //Gets Rotten Tomatoes info

	var request = new XMLHttpRequest();

    request.onreadystatechange = function() {

	if (request.readyState == 4)
		if (request.status == 200) {    //build dictionary in this block
			
			var infodict = JSON.parse(request.responseText);     //this holds all the movie info			
			var pgrating = infodict.movies[0].mpaa_rating;			
			var criticrating = infodict.movies[0].ratings["critics_score"];			
			var audiencerating = infodict.movies[0].ratings["audience_score"];
			var synopsis = infodict.movies[0].synopsis;
			var moviepic = infodict.movies[0].posters["thumbnail"]
        }
	}

	var movietitle = document.getElementById('movietitle'); //create query string
	var wordlist = movietitle.value.split(" ");
	var searchQuery = wordlist.shift();
		while (wordlist.length != 0) {
			searchQuery = searchQuery + "+" + wordlist.shift();
		}
	console.log(searchQuery);
	
	var targetURL = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=fxee5efruku5fre6wdbe7c6r&q=' + searchQuery + '&page_limit=1';
		
	request.open('GET', targetURL, true);
	
	request.send(null);
	

}