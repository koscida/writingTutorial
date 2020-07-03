const mysqlConnection = require('../models/connection')
const SqlString = require('sqlstring');

// code started from: http://stayregular.net/blog/make-a-nodejs-api-with-mysql
//create class
var Chapters = {
	
	getAllCharacters: function (req, res) {
		const SELECT_CHAPTERS = `
			SELECT c.*
			FROM tutorial.chapters AS c
			WHERE c.chapter_deleted = 0
			ORDER BY c.chapter_order
		`;
		runQueryResultsHelper(req, res, SELECT_CHAPTERS, transformCharacterJson)
	},
}
module.exports = Chapters;


function runQueryResultsHelper(req, res, SQL_QUERY, dataTransform = null) {
	console.log(SQL_QUERY)
	var results = mysqlConnection.query(SQL_QUERY, function (error, results, fields) {
		// console.log(results)
		
		// create default result object
		let apiResult = {
			"meta" : {
				total: 0
			},
			"data" : []
		}
		
		//if error, return blank results
		if (error) {
			// console.log(error);
			apiResult.meta.error = error // FIXME: remove this for production
			res.status(500).send(apiResult);
		}
		
		//make results 
		const resultJson = JSON.parse(JSON.stringify(results));
		
		// transform data
		const modResult = (dataTransform) ? dataTransform(resultJson) : resultJson
		
		//add our JSON results to the data table
		apiResult.data = modResult;
		apiResult.meta.total = modResult.length
		
		//send JSON to Express
		res.status(200).json(apiResult);
	});
}

function transformCharacterJson(resultJson) {
	return resultJson.map( chapter => transformCharacterData(chapter) )
}

function transformCharacterData(c) {
	const newCharacter = {
		id 			: (c.character_id) ? parseInt(c.character_id) : null,
		name 			: (c.character_name) ? c.character_name : '',
		summary 		: (c.character_summary) ? Buffer.from(s.character_summary.data).toString() : '',
		headline 	: (c.character_headline) ? c.character_headline : '',
	}
	//console.log(newChapter)
	return newCharacter
}

// omg, stop
const characterModel = {
	id 			: { db : 'character_id', 			type: 'int' },
	name 			: { db : 'character_name', 		type: 'text' },
	summary 		: { db : 'character_summary',		type: 'text' },
	headline 	: { db : 'character_headline',	type: 'text' },
}