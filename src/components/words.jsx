const programmingLanguages = [
	"python",
	"javascript",
	"dart",
	"typescript",
	"java",
	"html",
	"css",
	"c",
	"csharp",
	"golang",
	"kotlin",
	"php",
	"sql",
	"ruby"
];

function randomWord() {
	return programmingLanguages[Math.floor(Math.random() * programmingLanguages.length)];
}

export { randomWord };
