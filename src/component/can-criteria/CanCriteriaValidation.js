export const validateForm = (form) => {
  const newErrors = {};

  if (!form.holdingNature || form.holdingNature === "")
    newErrors.holdingNature = "please select Holding Nature";

  if (!form.investorCategory || form.investorCategory === "")
    newErrors.investorCategory = "please select Investor Category";

  if (!form.taxStatus || form.taxStatus === "")
    newErrors.taxStatus = "please select Tax Status";

  return newErrors;
};
