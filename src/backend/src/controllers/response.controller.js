const { responseService } = require("../services");
const { createResponses} = responseService;

const postResponses = async (req, res, next) => {
    const responses = req.body.responses;
    try {
        await createResponses(responses);
        res.sendStatus(201);
        next();
    } catch (err) {
        res.sendStatus(500) && next(err);
    }
};

module.exports = {
    postResponses
};
