const LOAD = "projects/LOAD"
const ADD_ONE = "projects/ADD_ONE"
const DELETE_ONE = "projects/DELETE_ONE"
const EDIT_ONE = "projects/EDIT_ONE"
const GET_ONE = "projects/GET_ONE"
const GET_CAT = "projects/GET_CAT"
const SEARCH = "projects/SEARCH"

const load = (projects) => ({
    type: LOAD,
    projects,
})

const addOne = (project) => ({
    type: ADD_ONE,
    project,
})

const deleteOne = (project) => ({
    type: DELETE_ONE,
    project,
})

const editOne = (project) => ({
    type: EDIT_ONE,
    project,
})

const getOne = (project) => ({
    type: GET_ONE,
    project
})

const getCat = (projects) => ({
    type: GET_CAT,
    projects
})

export const getProjects = () => async (dispatch) => {
    const response = await fetch(`/api/projects`)
    if (response.ok) {
        const projects = await response.json();
        dispatch(load(projects))
        return projects
    }
}

export const getProject = (projectId) => async (dispatch) => {
    const response = await fetch(`/api/projects/${projectId}`)
    if (response.ok) {
        const project = await response.json();
        dispatch(getOne(project))
        return project
    }
}

export const getCategory = (id) => async (dispatch) => {
    const response = await fetch(`/api/categories/project/${id}`)
    if (response.ok) {
        const projects = await response.json();
        dispatch(getCat(projects))
        return projects
    }
}

export const addProject = (project) => async (dispatch) => {
    const response = await fetch(`/api/projects/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
    });
    if (response.ok) {
        const project = await response.json();
        dispatch(addOne(project))
        return project
    }
}

export const deleteProject = (project) => async (dispatch) => {
    const response = await fetch(`/api/projects/delete/${project.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
    });
    if (response.ok) {
        const project = await response.json();
        dispatch(deleteOne(project))
        return project;
    }
}

export const editProject = (project, id) => async (dispatch) => {
    const response = await fetch(`/api/projects/edit/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(project)
    });
    if (response.ok) {
        const editProject = await response.json();
        dispatch(editOne(editProject))
        return editProject;
    }
}

export const searchProjects = (searchTerms) => async (dispatch) => {
    const response = await fetch(`/api/projects/search/${searchTerms}`);
    if (response.ok) {
        const searchedProjects = await response.json();
        console.log(searchedProjects);
        dispatch(load(searchedProjects));
        return searchedProjects;
    }
}

const initialState = {
    projects: {},
    selected: {},
    category: {},
}


const projectReducer = (state = initialState, action) => {
    let setState;
    switch (action.type) {
        case LOAD:
            const allProjects = {};
            action.projects.projects.forEach((project) => {
                allProjects[project.id] = project
            })
            return { ...state, projects: allProjects }
        case ADD_ONE:
            setState = {...state, projects: {...state.projects, [action.project.id]: action.project}, selected: {...state.selected}}
            return setState
        case DELETE_ONE:
            setState = {...state, projects: {...state.projects}, selected: {...state.selected}}
            delete setState.projects[action.projectId];
            return setState
        case EDIT_ONE:
            setState = {...state, projects: {...state.projects, [action.project.id]: action.project}, selected: {...state.selected}}
            return setState
        case GET_ONE:
            setState = {...state, projects: {...state.projects}, selected: { [action.project.id]: {...action.project}}}
            return setState
        case GET_CAT:
            setState = {...state, projects: {...state.projects}, selected: {...state.selected}, category: action.projects }
            return setState
        default:
            return state;
    }
}

export default projectReducer
