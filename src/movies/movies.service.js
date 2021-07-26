const knex = require("../db/connection");

function list() {
	return knex("movies").select("*");
}

function listShowingTrue() {
	return knex("movie_theaters")
		.join("movies", "movies_theaters.movie_id", "movies.movie_id")
		.select("*")
		.where({ is_showing: true })
		.groupBy("movies.title");
}

function read(movie_id) {
	return knex("movies").select("*").where({ movie_id }).first();
}

module.exports = {
	list,
	listShowingTrue,
	read,
};
