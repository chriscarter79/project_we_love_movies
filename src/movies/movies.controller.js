const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
	const movie = await service.read(req.params.movieId);
	if (movie) {
		res.locals.movie = movie;
		return next();
	}
	next({ status: 404, message: `Movie cannot be found.` });
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
	read: [asyncErrorBoundary(movieExists), read],
	list: asyncErrorBoundary(list),
	movieExists,
};
