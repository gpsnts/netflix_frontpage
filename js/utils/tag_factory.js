export function createElem(content, elem) {
	let el = document.createElement("div");
	el.appendChild(document.createTextNode(content));
	return el;
}

export function createElemImg(image_path, parent, insert_callback, className) {
	let img = new Image();
	img.src = image_path;
	if (typeof className == "string") img.classList.add(className);
	insert_callback(img, parent);
}

export function insertBody(elem) {
	if (!typeof elem == "object") throw new Error("Invalid node");
	document.body.appendChild(elem);
}

export function insertAfterElem(elem, insertElem) {
	if (!typeof elem == "object" || typeof insertElem == "undefined") throw new Error("Invalid node");
	let parent = document.querySelector(insertElem);
	parent.parentNode.insertBefore(elem, parent.nextSibling);
}

export function insertChild(elem, insertElem) {
	if (!typeof elem == "object" || typeof insertElem == "undefined") throw new Error("Invalid node");
	document.querySelector(insertElem).appendChild(elem);
}