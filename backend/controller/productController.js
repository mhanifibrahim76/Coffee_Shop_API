const product = require(`../model/products`)

exports.getAllProducts = (err,res) => {
    product.getAll ((err, results) => {
        if (err) return res.status(500).json({ error: err })
        res.json(results)
    })
}