import baseApi from "./baseApi";
import navReducer from "./features/navSlice";

const reducer = {
  navToggle: navReducer,
  [baseApi.reducerPath]: baseApi.reducer,
};
export default reducer;
