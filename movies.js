posttitle = function(mvtitle) {    //used to push elements to page in getMovieInfo()
	var divcontainer = document.createElement('DIV');
	var parcontainer = document.createElement('p');
	divcontainer.id = "titleContainer";
	parcontainer.innerHTML = mvtitle;
	divcontainer.appendChild(parcontainer);
	document.getElementById('maininfo').appendChild(divcontainer);
	
}

postpgrating = function(pgrat) {    //used to push elements to page in getMovieInfo()
	var divcontainer = document.createElement('DIV');
	var parcontainer = document.createElement('p');
	var ratingsdiv = document.createElement('DIV');
	divcontainer.id = "pgContainer";
	ratingsdiv.id = "ratingshere";
	parcontainer.innerHTML = "Rating: " + pgrat;
	divcontainer.appendChild(parcontainer);
	ratingsdiv.appendChild(divcontainer);
	document.getElementById('sideinfo').appendChild(ratingsdiv);
	
}

postcriticrating = function(crat) { //used to push elements to page in getMovieInfo()
	var divcontainer = document.createElement('DIV');
	var parcontainer = document.createElement('p');
	divcontainer.id = "criticContainer";
	parcontainer.innerHTML = "Critics' score: " + crat;
	divcontainer.appendChild(parcontainer);
	document.getElementById('ratingshere').appendChild(divcontainer);
}

postaudiencerating = function(arat) { //used to push elements to page in getMovieInfo()
	var divcontainer = document.createElement('DIV');
	var parcontainer = document.createElement('p');
	divcontainer.id = "audienceContainer";
	parcontainer.innerHTML = "Audience score: " + arat;
	divcontainer.appendChild(parcontainer);
	document.getElementById('ratingshere').appendChild(divcontainer);
}

postsynopsis = function(_synopsis) { //used to push elements to page in getMovieInfo()
	if (_synopsis == "")
		_synopsis = "No synopsis available for this movie";
	var divcontainer = document.createElement('DIV');
	var parcontainer = document.createElement('p');
	divcontainer.id = "synopsisContainer";
	parcontainer.innerHTML = "Synopsis: " + _synopsis;
	divcontainer.appendChild(parcontainer);
	document.getElementById('maininfo').appendChild(divcontainer);
}

postmoviepic = function(movpic) { //used to push elements to page in getMovieInfo()
	var divcontainer = document.createElement('DIV');
	divcontainer.id = "pictureContainer";
	divcontainer.innerHTML = "<img src=" + movpic + "></img>";
	document.getElementById('sideinfo').appendChild(divcontainer);
}


postYouTubeVideo = function(vidID) {
	var ifrm = document.createElement("IFRAME");
	var divcontainer = document.createElement("DIV");
	divcontainer.id = "ytContainer";
	
	console.log(vidID);

	ifrm.setAttribute("src","https://www.youtube.com/embed/" + vidID);
	ifrm.id = "ytplayer";
	ifrm.type = "text/html";
	ifrm.width = "640";
	ifrm.height = "360";


	document.getElementById('maininfo').appendChild(ifrm);

}

posttheatreinfo = function(theatrenames) { //Used to push info to page from Gracenote API
	var tname1;
	var tname2 = -1;
	var tname3 = -1;
	if (theatrenames.length > 3) {
		tname1 = theatrenames[0];
		tname2 = theatrenames[1];
		tname3 = theatrenames[3];
	}
	else {
		tname1 = theatrenames.shift();
		if (theatrenames.length != 0)
			tname2 = theatrenames.shift();
		if (theatrenames.length != 0)
			tname3 = theatrenames.shift();	
	}
	var divcontainer = document.createElement('DIV');
	var parcontainer = document.createElement('p');
	parcontainer.innerHTML = tname1;
	divcontainer.appendChild(parcontainer);
	if (tname2 != -1) {
		var parcontainer2 = document.createElement('p');
		parcontainer2.innerHTML = tname2;
		divcontainer.appendChild(parcontainer2);
	}
	if (tname3 != -1) {
		var parcontainer3 = document.createElement('p');
		parcontainer3.innerHTML = tname3;
		divcontainer.appendChild(parcontainer3);
	}
	document.body.appendChild(divcontainer);
		
	
}

getMovieTheatre = function(mvtitle) {           //"Movie theaters near you" info
	var request = new XMLHttpRequest();
	
	request.onreadystatechange = function() {
		if (request.readyState == 4)
			if (request.status == 200) {
				var infodict = JSON.parse(request.responseText);
				var moviesExist = true;
				if (infodict.length == 0) {
					moviesExist = false;
				}
				var movie;    //Our movie object
				if (moviesExist) {
					moviefound = false;
					for (var i=0; i<infodict.length; i++) {  //Find the correct movie
						if (infodict[i].title == mvtitle) {
							movie = infodict[i];
							console.log(movie);
							moviefound = true;
						}
					}
					
					if (moviefound) {    //Correct movie object has been found; time to find the theaters
						var theatrelist = [];  //initialize array to hold names of theaters
						for (var i=0; i<movie.showtimes.length; i++) {  //Check to make sure theatre name isn't in array; if not, then add it
							var inArray = false;
							for (var j=0; j<theatrelist.length; j++) {
								if (movie.showtimes[i].theatre.name == theatrelist[j]) {
									inArray = true;
								}
							}
							if (!inArray) {
								theatrelist.push(movie.showtimes[i].theatre.name);
							}
						}
					}
					else  {//Movie has not been found; push error message instead
						var theatrelist = ["Sorry, this movie is not playing near you."];
					}
				}
				else  {  //Movie information doesn't exist; push error message instead
					var theatrelist = ["Sorry, no movie theatre information available for your area."];
				}
			posttheatreinfo(theatrelist);
			}
			else if (request.status == 400) {
				var theatrelist = ["Sorry, you entered a bad zip code."]
				posttheatreinfo(theatrelist);
			}
	}			
	
	var today = new Date();     //create today's date
	var dd = today.getDate();
	var mm = today.getMonth()+1;
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd='0'+dd
	} 

	if(mm<10) {
	    mm='0'+mm
	} 

	today = String(yyyy + '-' + mm + '-' + dd);	
	
	var zipcode = document.getElementById('zipcode').value;
	
	var targetURL = "http://data.tmsapi.com/v1/movies/showings?startDate=" + today + "&zip=" + zipcode + "&api_key=f5c99t5xymqerdpurwfd7cjt";			
	request.open('GET', targetURL, true);
	
	request.send(null);
}

getYouTubeTrailer = function(moviename) {  //Retrieves video ID of youtube video
	var request = new XMLHttpRequest();
	
	request.onreadystatechange = function() {
		if (request.readyState == 4)
			if (request.status == 200) {
				var infodict = JSON.parse(request.responseText);
				
				var videoid = infodict.items[0].id.videoId;
								
				postYouTubeVideo(videoid);         //pass video id to function that pushes video onto page
			}
	}
	var movienamelist = moviename.split(" ");    //create searchQuery string
	var searchQuery = movienamelist.shift();
	while (movienamelist.length != 0) {
		searchQuery = searchQuery + "+" + movienamelist.shift();
	}
	searchQuery = searchQuery + "+Trailer";
	
	
	var targetURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + searchQuery + "&type=video&videoEmbeddable=true&key=AIzaSyBWCUE9DE9Ay5tfLMl5CXR-I9cW98Nb8HA";
		
	request.open('GET', targetURL, true);
	
	request.send(null);
}

createRTurl = function() {      //creates URL to insert dynamically into script tags in HTML
	var movietitle = document.getElementById('movietitle'); //create query string in URI format for targetURL
	var wordlist = movietitle.value.split(" ");
	var searchQuery = wordlist.shift();
	while (wordlist.length != 0) {
			searchQuery = searchQuery + "+" + wordlist.shift();
		}
	
	var targetURL = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=fxee5efruku5fre6wdbe7c6r&q=' + searchQuery + '&page_limit=8&callback=getMovieInfo';
	var rtscript = document.createElement('SCRIPT');
	rtscript.type = 'text/javascript';
	rtscript.src = targetURL;
	document.head.appendChild(rtscript);
		
}



getMovieInfo = function(data) {   //Gets Rotten Tomatoes info
				
			var infodict = data;     //this holds all the movie info
			
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
				var moviepic = movie.posters["original"]
				var mtitle = movie.title;
			}
			else { //If movie is not found
				var pgrating = "N/A"	
				var criticrating = "N/A"		
				var audiencerating = "N/A"
				var synopsis = "N/A"
				var moviepic = "http://www.kushmha.com/ProjectsImage/DataNotFound.jpg"
				var mtitle = "Sorry, movie not found"
			}
				posttitle(mtitle);
				postmoviepic(moviepic);
				postpgrating(pgrating);                   //Pushing returned elements onto page
				postcriticrating(criticrating);
				postaudiencerating(audiencerating);
				postsynopsis(synopsis);
				
				if (moviefound)
					getYouTubeTrailer(mtitle);      //Calls YouTube-vid-creator function
					getMovieTheatre(mtitle);
			
	

}

