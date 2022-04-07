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
      <div className="categories-container">
        <p className="categories-header">Sections</p>
        <div className="line-break"></div>
        <ul className="section-list">
          {sectionsList.map((section, index) => {
            return (
              <li className="section-list-list" key={index}>
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

        <p className="categories-header">Categories</p>
        <div className="line-break"></div>
        <p className="categories-stuff">Your Stuff</p>
        <p className="categories-stuff">Creators We Like</p>
        <p className="categories-stuff">Most Funded Projects</p>
        <p className="categories-stuff">Most Recent</p>
      </div>
    </>
  );
};

export default CategoriesList;
