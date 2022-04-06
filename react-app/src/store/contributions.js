const GET_ONE = "contributions/GET_ONE";

const getOne = (contribution) => ({
    type: GET_ONE,
    contribution
})

export const loadContribution = (contributionId) => async (dispatch) => {
    const response = await fetch(`/api/contributions/${contributionId}`);
    if (response.ok) {
        const contribution = await response.json();
        dispatch(getOne(contribution));
        return contribution;
    };
};

export const postContribution = async (contribution) => {
    const response = await fetch('/api/contributions/create', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(contribution),
    });
    if (response.ok) {
        const res = await response.json();
        return res;
    };
}

const initialState = {};

const contributionReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_ONE:
            newState = {};
            newState[action.contribution.id] = action.contribution;
            return newState;
        default:
            return state;
    }
}

export default contributionReducer;
