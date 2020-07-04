const mysqlConnection = require('../models/connection')
const SqlString = require('sqlstring');

// code started from: http://stayregular.net/blog/make-a-nodejs-api-with-mysql
//create class
var Chapters = {
	
	/*
	 * Select/get data
	 */
	// getChaptersAndSections: function (req, res) {
	// 	const SELECT_CHAPTERS_AND_SECTIONS = `
	// 		SELECT 
	// 			chapter_id, chapter_name, chapter_order
	// 		FROM tutorial.chapters
	// 		WHERE chapter_deleted = 0 
	// 		ORDER BY chapter_order
	// 	`;
	// 	// console.log(SELECT_CHAPTERS_AND_SECTIONS)
	// 	runQueryResultsHelper(req, res, SELECT_CHAPTERS_AND_SECTIONS, transformChaptersAndSectionsJson)
	// },
	getAllChapters: function (req, res) {
		const SELECT_QUERY = `
			SELECT c.*
			FROM tutorial.chapters AS c
			WHERE c.chapter_deleted = 0
			ORDER BY c.chapter_order
		`;
		runQueryResultsHelper(req, res, SELECT_QUERY, transformChapterJson)
	},
	getChapter: (req, res)  => {
		const { id } = req.params
		const SELECT_QUERY = SqlString.format(`
			SELECT c.*
			FROM tutorial.chapters as c
			WHERE c.chapter_id = ?
		`, [id])
		runQueryResultsHelper(req, res, SELECT_QUERY, transformChapterJson)
	},
	
	
	/*
	 * Chapter funcitons
	 */
	addChapter: function (req, res) {
		const { name, description, order } = req.query
		// TODO: OMG do data validation
		const INSERT_NEW_CHAPTER = SqlString.format(`
			INSERT INTO tutorial.chapters
				(chapter_name, chapter_desc, chapter_order)
			VALUES (?, ?, ?)
		`, [name, description, order]);
		// console.log(INSERT_NEW_CHAPTER)
		runQueryResultsHelper(req, res, INSERT_NEW_CHAPTER) //TODO: currently sends sql result to page, process successful insert
	},
	updateChapter : (req, res) => {
		let UPDATE_QUERY = `UPDATE tutorial.chapters SET `
		Object.entries(req.query).forEach( ([key, value]) => {
			if(key !== 'id') {
				UPDATE_QUERY += ` ${chapterModel[key].db} = ${SqlString.escape(value)}, `
			}
		})
		UPDATE_QUERY = UPDATE_QUERY.slice(0, -2)
		UPDATE_QUERY += ` WHERE chapter_id = ${SqlString.escape(req.query.id)}`
		
		// console.log(UPDATE_QUERY)
		runQueryResultsHelper(req, res, UPDATE_QUERY) //TODO: process return for successful insert
	},
	deleteChapter: (req, res) => {
		const { id } = req.query
		// TODO: data validation and param clean
		let UPDATE_SECTION = `
			UPDATE tutorial.chapters
			SET chapter_deleted = 1
			WHERE chapter_id = ${SqlString.escape(id)}
		`;
		// console.log(UPDATE_SECTION)
		runQueryResultsHelper(req, res, UPDATE_SECTION) //TODO: process return for successful insert
	},
	
	
	/*
	 * Section funcitons
	 */
	// addSection: function(req, res) {
	// 	const { name, chapterId, order, description } = req.query
	// 	// TODO: data validation and param clean
	// 	let INSERT_NEW_SECTION = ''
	// 	if(description === 'null') {
	// 		INSERT_NEW_SECTION = `
	// 			INSERT INTO tutorial.sections
	// 				(section_name, chapter_id, section_order)
	// 			VALUES ('${name}', ${chapterId}, ${order})
	// 		`;
	// 	} else {
	// 		INSERT_NEW_SECTION = `
	// 			INSERT INTO tutorial.sections
	// 				(section_name, section_desc, chapter_id, section_order)
	// 			VALUES ('${name}', '${description}', ${chapterId}, ${order})
	// 		`;
	// 	}
	// 	// console.log(INSERT_NEW_SECTION)
	// 	runQueryResultsHelper(req, res, INSERT_NEW_SECTION) //TODO: process return for successful insert
	// },
	// editSection : (req, res) => {
	// 	let UPDATE_QUERY = `UPDATE tutorial.sections SET `
	// 	Object.entries(req.query).forEach( ([key, value]) => {
	// 		if(key !== 'id') {
	// 			UPDATE_QUERY += ` ${sectionModel[key].db} = ${SqlString.escape(value)}, `
	// 		}
	// 	})
	// 	UPDATE_QUERY = UPDATE_QUERY.slice(0, -2)
	// 	UPDATE_QUERY += ` WHERE section_id = ${SqlString.escape(req.query.id)}`
		
	// 	// console.log("UPDATE_QUERY", UPDATE_QUERY)
	// 	runQueryResultsHelper(req, res, UPDATE_QUERY) //TODO: process return for successful insert
	// },
	// deleteSection: (req, res) => {
	// 	const { id } = req.query
	// 	// TODO: data validation and param clean
	// 	let UPDATE_SECTION = `
	// 		UPDATE tutorial.sections
	// 		SET section_deleted = 1
	// 		WHERE section_id = ${SqlString.escape(id)}
	// 	`;
	// 	// console.log(UPDATE_SECTION)
	// 	runQueryResultsHelper(req, res, UPDATE_SECTION) //TODO: process return for successful insert
	// },
	
};
module.exports = Chapters;

// TODO: move all these transformations and data modeling to an actual model
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

function transformChapterJson(resultJson) {
	return resultJson.map( chapter => transformChapterData(chapter) )
}

function transformSectionJson(resultJson) {
	return resultJson.map( section => transformSectionData(section) )
}

function transformChaptersAndSectionsJson(resultJson) {
	const modResult = Object.values(resultJson.reduce( (acc, chapter) => {
		cId = chapter.chapter_id
		if(!acc[cId]) {
			acc[cId] = transformChapterData(chapter, true)
		}
		if(chapter.section_id) {
			acc[cId].sections.push(transformSectionData(chapter))
		}
		return acc
	}, {}))
	
	// sort chapters
	modResult.sort(sortOnOrder)
	
	// sort sections
	modResult.forEach(res => {
		res.sections.sort(sortOnOrder)
	})
	
	// return
	return modResult
}

// TODO: OMG this is terrible, refactor when have time
// these two functions are similar, combine into better transform? (...or put into a model, geez)
function transformChapterData(c) {
	const newChapter = {
		id 				: (c.chapter_id) ? parseInt(c.chapter_id) : null,
		name 				: (c.chapter_name) ? c.chapter_name : '',
		description 	: (c.chapter_desc) ? Buffer.from(c.chapter_desc.data).toString() : '',
		text 				: (c.chapter_text) ? Buffer.from(c.chapter_text.data).toString() : '',
		order 			: (c.chapter_order) ? parseInt(c.chapter_order) : '',
	}
	//console.log(newChapter)
	return newChapter
}

function transformSectionData(s) {
	const newSection = {
		id 			: (s.section_id) ? parseInt(s.section_id) : null,
		name 			: (s.section_name) ? s.section_name : null,
		order 		: (s.section_order) ? parseInt(s.section_order) : null,
		chapterId 	: (s.chapter_id) ? parseInt(s.chapter_id) : null,
		chapterName : (s.chapter_name) ? s.chapter_name : null,
		text 			: (s.section_text) ? Buffer.from(s.section_text.data).toString() : null,
		description	: (s.section_desc) ? Buffer.from(s.section_desc.data).toString() : null,
	}
	//console.log(newSection)
	return newSection
}


// wow, so more modeling
const chapterModel = {
	id 				: { db : 'chapter_id', 		type: 'int' },
	name 				: { db : 'chapter_name', 	type: 'text' },
	description 	: { db : 'chapter_desc',	type: 'text' },
	text 				: { db : 'chapter_text',	type: 'text' },
	order 			: { db : 'chapter_order', 	type: 'int' },
}
const sectionModel = {
	id 				: { db : 'section_id', 		type: 'int' },
	name 				: { db : 'section_name', 	type: 'text' },
	order 			: { db : 'section_order', 	type: 'int' },
	chapterId 		: { db : 'chapter_id', 		type: 'int' },
	chapterName 	: { db : 'chapter_name', 	type: 'text' },
	text 				: { db : 'section_text', 	type: 'text' },
	description 	: { db : 'section_desc',	type: 'text' },
}

// Helper functions
function sortOnOrder(a, b) {
	if (a.order > b.order) return 1;
	if (b.order > a.order) return -1;
	return 0;
}

