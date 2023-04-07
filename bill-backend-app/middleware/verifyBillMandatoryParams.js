const verifyBillMandatoryParams = (req, res, next) => {
    if(!req.body.billnum)
    {
        return res.status(400).json({error : "Le paramètre billnum est manquant."})
    }
    if(!req.body.date)
    {
        return res.status(400).json({error : "Le paramètre date est manquant."})
    }
    if(!req.body.client)
    {
        return res.status(400).json({error : "Le paramètre client est manquant."})
    }
    next()
}

module.exports = verifyBillMandatoryParams