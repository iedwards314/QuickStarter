const ADD_ONE = "rewards/ADD_ONE";

const addOne = (reward) => ({
    type: ADD_ONE,
    reward
});

export const addReward = (reward) => async (dispatch) => {
    const response = await fetch('/api/rewards/create', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reward),
    });
    if (response.ok) {
        const reward = await response.json();
        dispatch(addOne(reward))
        return reward
    };
};

const initialState = {};

const rewardReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ADD_ONE:
            newState = {...state};
            newState[action.reward.id] = action.reward;
            return newState;
        default:
            return state;
    };
};

export default rewardReducer;
