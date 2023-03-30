import Joi from "joi";

const SHORTSTR = Joi.string().max(100);
const LONGSTR = Joi.string().max(500);
const SHORTREQUIRED = Joi.string().max(100).required();
const LONGREQUIRED = Joi.string().max(500).required();
const EMAIL = Joi.string().email({ minDomainSegments: 2 });
const NUMBER = Joi.number();
const NUMREQUIRED = Joi.number().required();

const joiValidation = (schema, req, res, next) => {
  try {
    //compare

    const { error } = schema.validate(req.body);

    error
      ? res.json({
        status: "error",
        message: error.message,
      })
      : next();
  } catch (error) {
    next(error);
  }
};

// ================admin validation
export const newAdminValidation = (req, res, next) => {
  const schema = Joi.object({
    address: SHORTSTR.allow("", null),
    email: EMAIL,
    fName: SHORTREQUIRED,
    lName: SHORTREQUIRED,
    password: SHORTREQUIRED,
    phone: SHORTSTR.allow("", null),
  });

  joiValidation(schema, req, res, next);
};

export const emailVerificationValidation = (req, res, next) => {
  const schema = Joi.object({
    email: EMAIL,
    emailVerificationCode: SHORTREQUIRED,
  });

  joiValidation(schema, req, res, next);
};

//login
export const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: EMAIL,
    password: SHORTREQUIRED,
  });

  joiValidation(schema, req, res, next);
};

//login
export const passResetValidation = (req, res, next) => {
  const schema = Joi.object({
    email: EMAIL,
    password: SHORTREQUIRED,
    otp: SHORTREQUIRED,
  });

  joiValidation(schema, req, res, next);
};

// ================category validation

export const updatCatValidation = (req, res, next) => {
  const schema = Joi.object({
    _id: SHORTREQUIRED,
    name: SHORTREQUIRED,
    status: SHORTREQUIRED,
  });

  joiValidation(schema, req, res, next);
};

// ================category validation

export const newPMValidation = (req, res, next) => {
  const schema = Joi.object({
    name: SHORTREQUIRED,
    description: SHORTREQUIRED,
  });

  joiValidation(schema, req, res, next);
};

export const updatePMValidation = (req, res, next) => {
  const schema = Joi.object({
    _id: SHORTREQUIRED,
    status: SHORTREQUIRED,
    name: SHORTREQUIRED,
    description: SHORTREQUIRED,
  });

  joiValidation(schema, req, res, next);
};

// Product validation ======

export const newProductValidation = (req, res, next) => {
  const schema = Joi.object({
    status: SHORTSTR,
    name: SHORTREQUIRED,
    sku: SHORTREQUIRED,
    qty: NUMREQUIRED,
    price: NUMBER,
    salesPrice: NUMBER,
    salesStartDate: SHORTSTR.allow("", null),
    salesEndDate: SHORTSTR.allow("", null),
    description: LONGREQUIRED,
  });

  joiValidation(schema, req, res, next);
};
export const editProductValidation = (req, res, next) => {
  console.log(req.body);
  req.body.salesPrice = req.body.salesPrice || 0;
  req.body.salesStartDate = req.body.salesStartDate || null;
  req.body.salesEndDate = req.body.salesEndDate || null;

  const schema = Joi.object({
    _id: SHORTREQUIRED,
    status: SHORTSTR,
    name: SHORTREQUIRED,
    sku: SHORTREQUIRED,
    qty: NUMREQUIRED,
    price: NUMBER,
    salesPrice: NUMBER,
    ratings: NUMBER,
    mainImage: SHORTSTR.allow("", null),
    images: LONGSTR.allow("", null),
    imgToDelete: LONGSTR.allow("", null),
    salesStartDate: SHORTSTR.allow("", null),
    salesEndDate: SHORTSTR.allow("", null),
    description: LONGREQUIRED,
  });

  joiValidation(schema, req, res, next);
};
