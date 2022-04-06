import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams, NavLink } from "react-router-dom";
import { getProject, deleteProject } from "../../store/project";
import './CategoriesPage.css';

const CategoriesList = () => {

return (
    <>
      <div>
          <h2>Categies Page</h2>
      </div>
    </>
  );
};

export default CategoriesList;
