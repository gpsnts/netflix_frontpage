export function createLoneElemImg(image_path, className) {
	let img = new Image();
	img.src = image_path;
	img.alt = className;
	if (typeof className == "string") {
		img.classList.add(className);
		img.setAttribute("id", "fix-height")
	}
	return img;
}

function createBtns(fa_icons) {
	let [ first, second ] = fa_icons;

	let btn_container = document.querySelector(".banner-buttons");

	let play_now 	= document.createElement("button"),
			more_info = document.createElement("button");
	
	let play_now_icon 	= document.createElement("i"),
			more_info_icon 	= document.createElement("i");

	play_now_icon.classList.add("fas");
	more_info_icon.classList.add("fas");
	
	play_now_icon.classList.add(first);
	more_info_icon.classList.add(second);

	play_now_icon.setAttribute("aria-hidden", "true");
	more_info_icon.setAttribute("aria-hidden", "true");

	play_now.appendChild(play_now_icon);
	play_now.innerHTML += "    ASSISTIR AGORA";

	more_info.appendChild(more_info_icon);
	more_info.innerHTML += "    MAIS INFORMAÇÕES"

	btn_container.appendChild(play_now);
	btn_container.appendChild(more_info);
}

export function createMainBanner(movie_data) {
	const { image, description, title } = movie_data;
	const banner				= document.querySelector(".feature-banner"),
				movieTitle		= document.querySelector(".movie-title"),
				desc					=	document.querySelector(".description");

	banner.style.backgroundImage= `url("${image}")`
	banner.classList.add("blur");

	movieTitle.textContent = title;
	desc.textContent = description;

	createBtns(["fa-play", "fa-info-circle"]);
}