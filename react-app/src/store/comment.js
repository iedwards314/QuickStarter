const LOAD = "comments/LOAD"
const CREATE = "comments/CREATE"
const DELETE_ONE = "comments/EDIT_ONE"


const load = (comments) => ({
    type: LOAD,
    comments,
})

const createOne = (commentX) => ({
    type: CREATE,
    commentX,
})

const deleteOne = (id) => ({
    type: DELETE_ONE,
    id,
})


export const getComments = (id) => async (dispatch) => {
    const response = await fetch(`/api/comments/${id}`)
    if (response.ok) {
        const comments = await response.json();
        dispatch(load(comments))
        return comments
    }
}

export const createComments = (comment) => async (dispatch) => {
    const response = await fetch(`/api/comments/create`,{
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
    });
    if (response.ok) {
        const commentX = await response.json();
        dispatch(createOne(commentX))
        return commentX
    }
}

export const deleteComments = (comment) => async (dispatch) => {
    const response = await fetch(`/api/comments/delete/${comment.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
    });
    if (response.ok) {
        const id = await response.json();
        dispatch(deleteOne(id))
        return
    }
}

const initialState = {
    comments: {}
}

const commentReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case LOAD:
            const allComments = {};
            action.comments.forEach((comment) => {
                allComments[comment.id] = comment
            })
            newState = {comments: allComments}
            return newState
        case CREATE:
            newState = {comments: {...state.comments, [action.commentX.id]: action.commentX}}
            return newState
        case DELETE_ONE:
            newState = {comments: {...state.comments}}
            delete newState.comments[action.id.id];
            return newState
        default:
            return state;
    }
}

export default commentReducer
