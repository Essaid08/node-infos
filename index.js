import http from "http";
import fs from "fs";
import url from "url";

http
	.createServer((req, res) => {
		const queryUrl = url.parse(req.url, true);
		const fileName =
			queryUrl.pathname == "/"
				? "./index.html"
				: "." + queryUrl.pathname + ".html";

		function readingTheFile(status, file) {
			fs.readFile(file, (err, data) => {
				if (err) throw err;
				res.writeHead(status, { "content-type": "text/html" });
				res.write(data);
				return res.end();
			});
		}

		fs.access(fileName, fs.constants.F_OK, (err) => {
			if (err) {
				readingTheFile(404, "./404.html");
			} else {
				readingTheFile(200, fileName);
			}
		});
	})
	.listen(8000, () => {
		console.log("server is running on port 8000");
	});
