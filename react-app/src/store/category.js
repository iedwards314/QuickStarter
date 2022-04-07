const LOAD = "categories/LOAD"

const load = (categories) => ({
    type: LOAD,
    categories,
})

export const getCategories = () => async (dispatch) => {
    const response = await fetch(`/api/categories/`)
    if (response.ok) {
        const categories = await response.json();
        dispatch(load(categories))
        return categories
    }
}

const initialState = {
    selected: {}
}

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const allCategories = {};
            action.categories.categories.forEach((category) => {
                allCategories[category.id] = category
            })
            return { ...state, categories: allCategories }
        default:
            return state;
    }
}

export default categoryReducer
