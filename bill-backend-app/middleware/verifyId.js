const verifyId = (req, res, next) => {
    if(!req.params.id)
    {
        return res.status(400).json({error : "Le paramètre {id} est manquant."})
    }
    next()
}

module.exports = verifyId