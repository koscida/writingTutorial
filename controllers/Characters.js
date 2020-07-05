const mysqlConnection = require('../models/connection')
const SqlString = require('sqlstring');

// code started from: http://stayregular.net/blog/make-a-nodejs-api-with-mysql
//create class
var Characters = {
	
	getAllCharacters: function (req, res) {
		const SELECT_QUERY = `
			SELECT c.*, GROUP_CONCAT(ctg.group_id) AS groupIds
			FROM tutorial.characters AS c
			LEFT JOIN tutorial.characters_to_groups as ctg 
				ON c.character_id = ctg.character_id
			WHERE c.character_deleted = 0
			GROUP BY c.character_id
			ORDER BY c.character_name
		`;
		runQueryResultsHelper(req, res, SELECT_QUERY, characterModel)
	},
	getCharacter: function (req, res) {
		const { id } = req.params
		const SELECT_QUERY = SqlString.format(`
			SELECT c.*
			FROM tutorial.characters AS c
			WHERE c.character_id = ?
		`, [id])
		runQueryResultsHelper(req, res, SELECT_QUERY, characterModel)
	},
	
	getAllGroups: (req, res) => {
		const SELECT_QUERY = `
			SELECT g.*
			FROM tutorial.groups AS g
			WHERE g.group_deleted = 0
			ORDER BY g.group_name
		`;
		runQueryResultsHelper(req, res, SELECT_QUERY, groupModel)
	}
}
module.exports = Characters;


function runQueryResultsHelper(req, res, SQL_QUERY, model = null) {
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
		const modResult = (model) ? transformJsonByModel(resultJson, model) : resultJson
		
		//add our JSON results to the data table
		apiResult.data = modResult;
		apiResult.meta.total = modResult.length
		
		//send JSON to Express
		res.status(200).json(apiResult);
	});
}

function transformJsonByModel(results, model) {
	let newresults = results.map( resultRow => 
		Object.entries(model).reduce( (acc, [key, value]) => {
			const resultEntry = resultRow[value.db]
			let newEntry = ''
			if(resultEntry){
				if(value.type === "int")  newEntry = parseInt(resultEntry)
				if(value.type === "blob") newEntry = Buffer.from(resultEntry.data).toString()
				if(value.type === "text") newEntry = resultEntry
				if(value.type === "arrayInt") newEntry = resultEntry.split(",").map( r => parseInt(r) )
			}
			return { ...acc, [key] : newEntry }
		}, {})
	)
	
	return newresults
}

// omg, stop
const characterModel = {
	id 			: { db : 'character_id', 			type: 'int' },
	name 			: { db : 'character_name', 		type: 'text' },
	summary 		: { db : 'character_summary',		type: 'blob' },
	headline 	: { db : 'character_headline',	type: 'text' },
	groupIds 	: { db : 'groupIds',					type: 'arrayInt' },
}

const groupModel = {
	id 			: { db : 'group_id', 			type: 'int' },
	name 			: { db : 'group_name', 			type: 'text' },
	description : { db : 'group_description',	type: 'blob' },
}