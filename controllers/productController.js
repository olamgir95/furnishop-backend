const assert = require("assert");
const Product = require("../models/Product");

const productController = {
  addNewProduct: async (req, res) => {
    try {
      console.log("POST: cont/addNewProduct");
      assert(req.files, "General error occurred.");

      const product = new Product();
      const data = req.body;

      data.product_images = req.files.map((value) => {
        return value.path.replace(/\\/g, "/");
      });
      const result = await product.addNewProductData(data, req.member);

      const html = `<script> alert("new dish added successfully");
      window.location.replace('/resto/products/menu')</script>`;
      res.end(html);
    } catch (err) {
      console.log(`ERROR, cont/addNewProduct, ${err.message}`);
    }
  },

  updateChosenProduct: async (req, res) => {
    try {
      console.log("POST: cont/updateChoseProduct");
      const product = new Product();
      const id = req.params.id;
      const result = await product.updateChosenProductData(
        id,
        req.body,
        req.member._id
      );
      res.json({ state: "success", data: result });
    } catch (err) {
      console.log(`ERROR, cont/updateChosenProduct, ${err.message}`);
      res.json({ state: "fail", message: err.message });
    }
  },
};

module.exports = productController;