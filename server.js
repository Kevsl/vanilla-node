const http = require("http");
const products = require("./datas/products");

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
} = require("./controllers/productsController");

const server = http.createServer((req, res) => {
  if (req.url === "/api/products" && req.method === "GET") {
    getProducts(req, res);
  } else if (req.url.match(/\/api\/products\/\w+/) && req.method === "GET") {
    const id = req.url.split("/")[3];
    getProduct(req, res, id);
  } else if (req.url === "/api/products" && req.method === "POST") {
    createProduct(req, res);
  } else if (req.url.match(/\/api\/products\/\w+/) && req.method === "PUT") {
    const id = req.url.split("/")[3];
    updateProduct(req, res, id);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Page not found" }));
  }
});

const PORT = process.env.PORT || 5005;

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
