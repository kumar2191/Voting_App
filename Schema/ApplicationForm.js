import mongoose from "mongoose";
import Joi from "joi";

const ApplicationFormSchema = {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  Department: {
    type: String,
    required: true,
  },
  Batch: {
    type: Number,
    required: true,
  },
  PhoneNumber: {
    type: Number,
    required: true,
  },
  ApplicationDate: {
    type: Date,
    default: new Date(),
  },
  ApplicationStatus: {
    type: String,
    default: "Posted",
  },
  DOB: {
    type: String,
    required: true,
  },
  Post: {
    type: String,
    required: true,
    },
    Description: {
      type: String,
    required: true,
  }
};

const ApplicationForm = mongoose.model(
  "ApplicationForm",
  ApplicationFormSchema
);
const validateApplicationForm = (value) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    Post: Joi.string().required(),
    DOB: Joi.string().required(),
    PhoneNumber: Joi.number().required(),
    Batch: Joi.number().required(),
      Department: Joi.string().required(),
    Description:Joi.string().required(),
  });
  const result = schema.validate(value);

  return result;
};

export { validateApplicationForm, ApplicationForm };
