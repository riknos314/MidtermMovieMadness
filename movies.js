getMovieInfo = function() {   //Gets Rotten Tomatoes info and puts it in a dictionary

	var request = new XMLHttpRequest();

    request.onreadystatechange = function() {

	if (request.readyState == 4)
		if (request.status == 200) {    //build dictionary in this block
			
		
        }
	}

	var movietitle = document.getElementbyId('movietitle'); //create query string
	var wordlist = movietitle.split(" ");
	var searchQuery = "";
	for (var i=0; i < wordlist; i++) {
		searchQuery = searchQuery + wordlist[i] + "+";
	}
	console.log(searchQuery); //for debugging just in case my method isn't quite right
	
	var targetURL = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=fxee5efruku5fre6wdbe7c6r&q=' + searchQuery + '&page_limit=1';
	
	console.log(targetURL); //more debugging
	
	request.open('GET', targetURL, true);
	
	request.send(null);
	

}