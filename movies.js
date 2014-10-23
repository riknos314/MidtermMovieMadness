getMovieInfo = function() {   //Gets Rotten Tomatoes info and puts it in a dictionary

	var request = new XMLHttpRequest();

    request.onreadystatechange = function() {

	if (request.readyState == 4)
		if (request.status == 200) {
			//what to do here
		
        }
	}

	var movietitle = document.getElementbyId('movietitle'); //create query string
	var wordlist = movietitle.split(" ");
	var searchQuery = "";
	for (var i=0; i < wordlist; i++) {
		searchQuery = searchQuery + wordlist[i] + "+";
	}
	console.log(searchQuery); //for debugging just in case my method isn't quite right
	
	var targetURL
	
	

}