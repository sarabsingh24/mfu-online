import { useSelector, useDispatch } from "react-redux";

function useCommonReducer() {
  const {
    tabsCreater,
  stepsCount ,
  openForm,
   
  } = useSelector((state) => state.tab);


  const { canCriteriaObj } = useSelector((state) => state.criteria);
  const { primeHolderObj } = useSelector((state) => state.primary);
  const { secondHolderObj } = useSelector((state) => state.second);
   const { thirdHolderObj } = useSelector((state) => state.third);
    const { bankAccountsObj } = useSelector((state) => state.bankAccount);

  const {
 
    guardianHolderObj,
  
    nomineeObj,
    proofUploadObj,
    account,
    isSuccess,
    isError,
    message,
    canId,
  } = useSelector((state) => state.account);

  const dispatch = useDispatch();

  let arrayFilter = [
    Object.keys(primeHolderObj).length && primeHolderObj,
    Object.keys(secondHolderObj).length && secondHolderObj,
    Object.keys(thirdHolderObj).length && thirdHolderObj,
    Object.keys(guardianHolderObj).length && guardianHolderObj,
  ].filter((i) => i !== 0);

  const combinedForm = {
    ...canCriteriaObj,
    holderRecords: [...arrayFilter],
    bankRecords: bankAccountsObj,
    nomineeDetails: nomineeObj,
  };

  return {
    tabsCreater,
    stepsCount,
    openForm,
    canCriteriaObj,
    primeHolderObj,
    secondHolderObj,
    thirdHolderObj,
    guardianHolderObj,
    bankAccountsObj,
    nomineeObj,
    proofUploadObj,
    combinedForm,
    account,
    isSuccess,
    isError,
    message,
    canId,
    dispatch,
  };
}

export default useCommonReducer;
