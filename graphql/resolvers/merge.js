import Company from "../../server/models/Company";

const company = async companyId => {
  try {
    const company = await Company.findById(companyId);
    return {
      ...company._doc,
      _id: company.id,
      createdFretes: freteMessage.bind(this, company._doc.createdFretes)
    };
  } catch (error) {
    throw error;
  }
};

const transformFrete = event => {
  return {
    ...event._doc,
    _id: event.id,
    creator: company.bind(this, event.creator)
  };
};

exports.transformFrete = transformFrete;
