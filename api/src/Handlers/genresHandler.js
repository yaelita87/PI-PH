const {getApiGender} = require("../Controllers/genresControl")

const getGenresHanlder = async(req, res,next)=>{
    try {
        let allGender = await getApiGender();
        res.status(200).send(allGender);
      } catch (error) {
        next(error);
      }

};

module.exports = {getGenresHanlder}