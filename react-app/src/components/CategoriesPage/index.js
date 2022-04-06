import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getCategories } from "../../store/project";
import "./CategoriesPage.css";

const CategoriesList = () => {
  const sectionsList = ["Games", "Music", "Health", "Film", "Food", "Tech"];
  return (
    <>
      <div>
        <h2>Sections</h2>

        <ul className="section-list">
        {sectionsList.map((section, index) => {
          return (
              <li key={index}>
                <NavLink className="section-list-item" exact to={`/categories/${index}`}>
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
        <p>Epic Fails</p>
        <p>Watch Out</p>
      </div>
    </>
  );
};

export default CategoriesList;
