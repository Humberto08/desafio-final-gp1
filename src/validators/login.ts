import { validate, Joi } from "express-validation";

module.exports = validate({
    body: Joi.object({
        email: Joi.string().email().required(),
        senha: Joi.string().required(),
    }),
});


export default validate;


// VALIDA AS ROTAS