const verifyClientMandatoryParams = (req, res, next) => {
    if(!req.body.firstName)
    {
        return res.status(400).json({error : "Le paramètre firstName est manquant."})
    }
    if(!req.body.lastName)
    {
        return res.status(400).json({error : "Le paramètre lastName est manquant."})
    }
    if(!req.body.jobTitle)
    {
        return res.status(400).json({error : "Le paramètre jobTitle est manquant."})
    }
    if(!req.body.companyName)
    {
        return res.status(400).json({error : "Le paramètre companyName est manquant."})
    }
    if(!req.body.createdDate)
    {
        return res.status(400).json({error : "Le paramètre createdDate est manquant."})
    }
    if(!req.body.address)
    {
        return res.status(400).json({error : "Le paramètre address est manquant."})
    }
    if(!req.body.postalCode)
    {
        return res.status(400).json({error : "Le paramètre postalCode est manquant."})
    }
    if(!req.body.city)
    {
        return res.status(400).json({error : "Le paramètre city est manquant."})
    }
    if(!req.body.country)
    {
        return res.status(400).json({error : "Le paramètre country est manquant."})
    }
    next()
}

module.exports = verifyClientMandatoryParams