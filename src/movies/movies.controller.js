const service = require("./movies.service");
const asyncErrorBoundry = require("../errors/asyncErrorBoundary");
const { as } = require("../db/connection");

async function movieExists(req, res, next) {
	const movie = service.read(req.params.movieId);
	if (movie) {
		res.locals.movie = movie;
		return next();
	}
	next({ status: 404, message: "Movie cannot be found." });
}

async function list(req, res) {
	if (req.query.is_showing) {
		res.json({ data: await service.listShowingTrue() });
	}
	res.json({ data: await service.list() });
}

function read(req, res) {
	res.json({ data: res.locals.movie });
}

module.exports = {
	read: [asyncErrorBoundry(movieExists), read],
	list: asyncErrorBoundry(list),
	movieExists,
};
