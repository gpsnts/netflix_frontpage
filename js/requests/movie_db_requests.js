import { createElem, createElemImg, insertAfterElem, insertChild }  from "../utils/tag_factory.js";

/** 
	Isso deveria ficar em um .env, mas para fins de 
	dev de um projeto simples (com VanillaJS), ficará assim 
*/
const BASE_URL = "https://api.themoviedb.org";
const POSTER_PATH_BASE_URL = "https://image.tmdb.org/t/p/original";
const VERSION =	"3";
const REQ_ARGS = { method: "GET" };

async function request(path, params = "") {
	let res = await fetch(
		`${BASE_URL}/${VERSION}/${path}?&language=pt-BR&api_key=ac15d2fd0fd8a46dc2e14765f87510e5${params}`,
		REQ_ARGS
	);
	// if (!res.ok) throw new Error(`Fetching can't be resolved. Status: ${res.status}`);
	return await res.json();
}

/****************************************************************************************************************/

export async function getNowPlayingMovies(parent, page = 1) {
	let result = await request("movie/now_playing", `&page=${page}`);
	const RESULTS = result.results.filter((el) => el.title && el.poster_path && el.overview && el.backdrop_path);
	RESULTS.forEach(el => {
		createElemImg(
			`${POSTER_PATH_BASE_URL}${el.poster_path}`,
			parent,
			insertChild,
			"carrousel_image"
		);
	});
}

export async function getTrendingMoviesWeek() {
	let result = await request(`trending/movie/week`);
	const RESULTS = result.results.filter((el) => el.title && el.poster_path && el.overview && el.backdrop_path);
	RESULTS.forEach(el => {
		createElemImg(
			`${POSTER_PATH_BASE_URL}${el.poster_path}`,
			"section",
			insertChild,
			"carrousel_image"
		);
	});
}

export async function getMovieById(movie_id) {
	let result = await request(`movie/${movie_id}`);
	insertChild(createElem(result.title), "section");
}