export const validateForm = (form, nomineeSelected) => {
  let newarray = [];
  let percent = 0;

  if (nomineeSelected === "Y") {
    for (let i = 0; i < form.length; i++) {
      percent += +form[i].percentage;
    }

    for (let item = 0; item < form.length; item++) {
      let newErrors = {};

      if (!form[item].nomineeName || form[item].nomineeName === "") {
        newErrors.nomineeName = "Pleasse fill the nominee name";
      }
      if (!form[item].relation || form[item].relation === "") {
        newErrors.relation = "Pleasse fill relation";
      }

      if (percent < 100 || percent > 100) {
        newErrors.percentage = "Pleasse fill correct percentage";
      }
      if (!form[item].percentage || form[item].percentage === "") {
        newErrors.percentage = "Pleasse fill percentage";
      }

      if (!form[item].dateOfBirth || form[item].dateOfBirth === "") {
        newErrors.dateOfBirth = "Pleasse fill dateOfBirth";
      }

      newarray.push(newErrors);
    }
  }

  return newarray;
};
