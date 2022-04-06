import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getCategories } from "../../store/category";
import "./CategoryPage.css";


const CategoryPage = () => {

    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.categories);
    const { id } = useParams();
    console.log('CAT ID', categories, id)

    let categoryInfo = categories[id]
    console.log('CAT NAME',categoryInfo.category)
    useEffect(() => {
      dispatch(getCategories());
    }, [dispatch]);


    return (
        <div>
        <h2>{categoryInfo.category}</h2>
        </div>
    )
}

export default CategoryPage;
