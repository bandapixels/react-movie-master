import { combineReducers } from "redux";

import searchState from "../features/SearchContainer/searchContainer.reducer";
import headerState from "../shared/Header/header.reducer";

export default combineReducers({ searchState, headerState });
