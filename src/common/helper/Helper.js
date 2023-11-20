
export const btnHandeler =(dispatch, pageCount, stepsCount)=> {
  return {prevHandeler: () => {
     dispatch(pageCount(stepsCount - 1));
  },}
}; 
