const ADD_ONE = "updates/ADD_ONE";
const LOAD = "updates/LOAD";
const DELETE = "updates/DELETE";

const addOne = (update) => ({
    type: ADD_ONE,
    update
});

const load = (updates) => ({
    type: LOAD,
    updates
})

const deleteOne = (updateId) => ({
    type: DELETE,
    updateId
})

export const getUpdates = (projectId) => async (dispatch) => {
    const response = await fetch(`/api/updates/${projectId}`);
    if (response.ok) {
        const updates = await response.json();
        dispatch(load(updates));
        return updates;
    }
}

export const addUpdate = (update) => async (dispatch) => {
    const response = await fetch('/api/updates/create', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(update),
    });
    if (response.ok) {
        const update = await response.json();
        dispatch(addOne(update))
        return update
    };
};

export const deleteReward = (updateId) => async (dispatch) => {
    const response = await fetch(`/api/updates/delete/${updateId}`, {
        method: "DELETE"
    });
    if (response.ok) {
        const res = await response.json();
        dispatch(deleteOne(res))
        return res;
    };
};

const initialState = {};

const updateReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ADD_ONE:
            newState = {...state};
            newState[action.update.id] = action.update;
            return newState;
        case LOAD:
            newState = {};
            action.updates.forEach((update) => {
                newState[update.id] = update
            });
            return newState;
        case DELETE:
            newState = {...state};
            delete newState[action.updateId];
            return newState;
        default:
            return state;
    };
};

export default updateReducer;
