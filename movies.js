getMovieInfo = function() {   //Gets Rotten Tomatoes info

	var request = new XMLHttpRequest();

    request.onreadystatechange = function() {

	if (request.readyState == 4)
		if (request.status == 200) {    //build dictionary in this block
			
			var infodict = JSON.parse(request.responseText);
			
			console.log(infodict.movies[0].synopsis);
        }
	}

	var movietitle = document.getElementById('movietitle'); //create query string
	var wordlist = movietitle.value.split(" ");
	var searchQuery = "";
	if (wordlist.length <= 1) {        //FIX THIS
		searchQuery = wordlist[0]
	}
	else {
		for (var i=0; i < wordlist.length; i++) {
			searchQuery = searchQuery + wordlist[i] + "+";
			console.log(searchQuery);
		}
	}

	
	var targetURL = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=fxee5efruku5fre6wdbe7c6r&q=' + searchQuery + '&page_limit=1';
		
	request.open('GET', targetURL, true);
	
	request.send(null);
	

}