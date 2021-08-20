// Reqs para a API do MovieDB
import { getNowPlayingMovies, getRandomTrendingMovieWeek } from "./requests/movie_db_requests.js"

const SWIPER_CONFIGS = {
	scrollbar: false,
	direction: "horizontal",
	loop: true,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	spaceBetween: 10,
	breakpoints: {
		0: {
			slidesPerView: 2,
		},
		768: {
			slidesPerView: 3,
		},
		801: {
			slidesPerView: 5
		}
	}
};

getNowPlayingMovies("#first .swiper-wrapper");
getRandomTrendingMovieWeek(parseInt((Math.random() * 999) - 1));
document.addEventListener("DOMContentLoaded", () => new Swiper('.swiper-container', SWIPER_CONFIGS));