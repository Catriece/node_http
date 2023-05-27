console.log("Hello World!\n==========\n");

// Exercise 1 Section
console.log("EXERCISE 1:\n==========\n");

const http = require("http");

const server = http.createServer((req, res) => {
    const { url, method } = req;
    const chunks = [];

    req.on("error", (error) => {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(error));
        res.end()
    }).on("data", (chunk) => {
        chunks.push(chunk)
    }).on("end", () => {
        console.log(chunks);
        const body = Buffer.concat(chunks).toString()
        const resBody = {
            url, 
            method, 
            body,
        };

        res.on("error", (error) => {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.write(JSON.stringify(error));
            res.end();
        });

        if (url == "/") {
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.write("<h1> You've made it home! </h1>");
        } else if (url == "/about"){
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.write(JSON.stringify({ message: "Catriece, 28, wife and mommy" }));
        } else if (url == "/echo") {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.write(JSON.stringify(resBody));
        } else {
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/html");
            res.write("<h1> 404 Page Not Found</h1> Try <a href='/>Home</a>");
        };

        return res.end();
    });

    
}).listen(5050, () => {
  console.log("Server listening at http://localhost:5050...");
});
