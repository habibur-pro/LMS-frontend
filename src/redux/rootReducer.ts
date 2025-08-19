import baseApi from "./baseApi";
import navReducer from "./features/navSlice";
import sidebarReducer from "./features/sidebarSlice";

const reducer = {
  navToggle: navReducer,
  sidebarToggle: sidebarReducer,
  [baseApi.reducerPath]: baseApi.reducer,
};
export default reducer;
