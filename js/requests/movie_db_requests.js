import { createLoneElemImg, createMainBanner }  from "../utils/tag_factory.js";

// Não é a melhor implementação, mas serve para fins de POCs/Playground

/** 
	Isso deveria ficar em um .env, mas para fins de 
	dev de um projeto simples (com VanillaJS), ficará assim 
*/
const BASE_URL = "https://api.themoviedb.org";
const POSTER_PATH_BASE_URL = "https://image.tmdb.org/t/p/original";
const VERSION =	"3";
const REQ_ARGS = { method: "GET" };

/********************************************Funcoes "privadas"***************************************************/

async function request(path, params = "") {
	let res = await fetch(
		`${BASE_URL}/${VERSION}/${path}?&language=pt-BR&api_key=ac15d2fd0fd8a46dc2e14765f87510e5${params}`,
		REQ_ARGS
	);
	if (!res.status > 400) throw new Error(`Fetching can't be resolved. Status: ${res.status}`);
	return await res.json();
}

const getMovieById = async (movie_id) => await request(`movie/${movie_id}`);

function carouselFactory(parent_section, elem_list) {
	elem_list.map((el) => createLoneElemImg(`${POSTER_PATH_BASE_URL}${el.poster_path}`, "swiper-slide"))
		.forEach(el => document.querySelector(parent_section).appendChild(el));
}

/****************************************************************************************************************/

export async function getNowPlayingMovies(parent) {
	let result = await request("movie/now_playing", "&page=1");
	const RESULTS = result.results.filter((el) => el.title && el.poster_path && el.overview && el.backdrop_path)
	carouselFactory(parent, RESULTS);
}

export async function getRandomTrendingMovieWeek(page = 1) {
	let currPage = page;

	let results = [];

	while(results.length == 0) {
		let result = await request(`trending/movie/week`, `&page=${currPage}`);
		results = result.results.filter(el =>  el.overview && el.title && el.poster_path && el.backdrop_path);
		currPage++;
	}

	let movie_data = await getMovieById(results[parseInt((Math.random() * (results.length - 1)) - 1)].id);

	createMainBanner(
		{
			image: `${POSTER_PATH_BASE_URL}${movie_data.backdrop_path}`,
			description: movie_data.overview,
			title: movie_data.title
		}
	);
}