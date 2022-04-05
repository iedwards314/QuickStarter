const ADD_ONE = "rewards/ADD_ONE";
const LOAD = "rewards/LOAD"

const addOne = (reward) => ({
    type: ADD_ONE,
    reward
});

const load = (rewards) => ({
    type: LOAD,
    rewards
})

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

export const getRewards = (projectId) => async (dispatch) => {
    const response = await fetch(`/api/rewards/${projectId}`);
    if (response.ok) {
        const rewards = await response.json();
        console.log(rewards);
        dispatch(load(rewards));
        return rewards;
    }
}

const initialState = {};

const rewardReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ADD_ONE:
            newState = {...state};
            newState[action.reward.id] = action.reward;
            return newState;
        case LOAD:
            newState = {...state};
            action.rewards.forEach((reward) => {
                newState[reward.id] = reward
            });
            return newState;
        default:
            return state;
    };
};

export default rewardReducer;
