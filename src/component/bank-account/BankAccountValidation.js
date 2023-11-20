export const validateForm = (form) => {
  let newarray = [];
    for (let item = 0; item < form.length; item++) {
      let newErrors = {};

      if (!form[item].accountNo || form[item].accountNo === "") {
        newErrors.accountNo = "Pleasse fill the account no.";
      }

      if (!form[item].reAccountNo || form[item].reAccountNo === "") {
        newErrors.reAccountNo = "Pleasse fill the  Re-account no.";
      }

      if (form[item].accountNo !== form[item].reAccountNo) {
        newErrors.accountNo = "Bank A/c No does not match";
        newErrors.reAccountNo = "Bank A/c No does not match";
      }

      if (!form[item].accountType || form[item].accountType === "") {
        newErrors.accountType = "Pleasse fill the accountType";
      }
      if (!form[item].bankId || form[item].bankId === "") {
        newErrors.bankId = "Pleasse fill the bankId";
      }

      if (!form[item].micrCode || form[item].micrCode === "") {
        newErrors.micrCode = "Pleasse fill the  micrCode";
      }

      if (!form[item].ifscCode || form[item].ifscCode === "") {
        newErrors.ifscCode = "Pleasse fill the  ifscCode";
      }

      if (!form[item].bankProof || form[item].bankProof === "") {
        newErrors.bankProof = "Pleasse fill the  bankProof";
      }

      newarray.push(newErrors);
    }

  return newarray;
};
