import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getCategories } from "../../store/category";
import "./CategoriesPage.css";

const CategoriesList = () => {
    const dispatch = useDispatch();
    const sectionsList = ["Games", "Music", "Health", "Film", "Food", "Tech", "Epic Fails", "Watch Out"];

    useEffect(() => {
      dispatch(getCategories());
    }, [dispatch]);

  return (
    <>
      <div>
        <h2>Sections</h2>

        <ul className="section-list">
          {sectionsList.map((section, index) => {
            return (
              <li key={index}>
                <NavLink
                  className="section-list-item"
                  exact
                  to={`/categories/${index + 1}`}
                >
                  {`${section}`}
                </NavLink>
              </li>
            );
          })}
        </ul>

        <h2>Categories</h2>
        <p>Your Stuff</p>
        <p>Creators We Like</p>
        <p>Most Funded Projects</p>
        <p>Most Recent</p>
      </div>
    </>
  );
};

export default CategoriesList;
