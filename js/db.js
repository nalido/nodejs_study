var DB = {};

DB.init = function() {
	if (window.confirm('are you sure to initialize database?')) {
		DB.load();
	}
};

DB.load = function() {
	//history
	alasql('DROP TABLE IF EXISTS history;');
	alasql('CREATE TABLE history(NNo1 INT);');
	alasql('INSERT INTO history VALUES(10);');
	window.location.reload(true);
	/*var his = alasql.promise('SELECT MATRIX * FROM CSV("data/HISTORY.csv", {headers: true})').then(
			function(hiss) {
				for (var i = 0; i < hiss.length; i++) {
					alasql('INSERT INTO history VALUES(?,?);', hiss[i]);
				}
		});
	
	// reload html
	Promise.all([ pemp, paddr, pfamily, pedu, pchoice, preset, his ]).then(function() {
		window.location.reload(true);
	});*/
};

DB.remove = function() {
	if (window.confirm('are you sure do delete dababase?')) {
		alasql('DROP localStorage DATABASE TETRIS');
	}
};


// connect to database
try {
	alasql('ATTACH localStorage DATABASE TETRIS');
	alasql('USE TETRIS');
} catch (e) {
	//alasql('DROP localStorage DATABASE TETRIS');
	alasql('CREATE localStorage DATABASE TETRIS');
	alasql('ATTACH localStorage DATABASE TETRIS');
	alasql('USE TETRIS');
	DB.load();
}
