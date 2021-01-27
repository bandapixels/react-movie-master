import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as acts from "./header.actions";
import "./header.scss";

const Header: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  return (
    <div className="header">
      <nav className="header-navigation">
        <Link to="/">Search</Link>
        <Link to="/my-movies">My Movies</Link>
      </nav>
      <select
        onChange={(e): acts.UpdateList =>
          dispatch(new acts.UpdateList(e.target.value))
        }
      >
        <option value="list">List</option>
        <option value="card">Card</option>
      </select>
    </div>
  );
};

export default Header;
