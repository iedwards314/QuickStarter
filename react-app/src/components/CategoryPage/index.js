import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getCategories } from "../../store/category";
import "./CategoryPage.css";


const CategoryPage = () => {

    // const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.categories);
    const { id } = useParams();
    //console.log('CAT ID', categories, id)

    let categoryInfo = categories[id]
    console.log(categoryInfo);
    //console.log('CAT NAME',categoryInfo.category)
    // useEffect(() => {
    //   dispatch(getCategories());
    // }, [dispatch]);


    return (
        <>
        <div className='category-img-container'>
        <img src={`${categoryInfo.image}`} alt={`${categoryInfo.category}`}></img>
        </div>
        <h2>{categoryInfo.category}</h2>
        </>
    )
}

export default CategoryPage;
