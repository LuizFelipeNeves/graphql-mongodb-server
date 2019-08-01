import Company from "../../server/models/Company";

const company = async companyId => {
  try {
    const company = await Company.findById(companyId);
    return {
      ...company._doc,
      _id: company.id,
      createdFreights: freightMessage.bind(this, company._doc.createdFreights)
    };
  } catch (error) {
    throw error;
  }
};

const transformFreight = event => {
  return {
    ...event._doc,
    _id: event.id,
    creator: company.bind(this, event.creator)
  };
};

exports.transformFreight = transformFreight;
