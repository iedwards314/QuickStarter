const LOAD = "categories/LOAD"

const load = (categories) => ({
    type: LOAD,
    categories,
})

export const getCategories = () => async (dispatch) => {
    console.log('I EXIST HERE AND I AM LETTING YOU KNOW!')
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
            console.log('WHAT THE FUCK', action)
            action.categories.categories.forEach((category) => {
                allCategories[category.id] = category
            })
            return { ...state, categories: allCategories }
        default:
            return state;
    }
}

export default categoryReducer
