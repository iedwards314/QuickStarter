const LOAD = "projects/LOAD"
const ADD_ONE = "projects/ADD_ONE"
const DELETE_ONE = "projects/DELETE_ONE"
const EDIT_ONE = "projects/EDIT_ONE"
const GET_ONE = "projects/GET_ONE"

const load = (projects) => ({
    type: LOAD,
    projects,
})

const addOne = (project) => ({
    type: ADD_ONE,
    project,
})

const deleteOne = (projectId) => ({
    type: DELETE_ONE,
    projectId,
})

const editOne = (project) => ({
    type: EDIT_ONE,
    project,
})

const getOne = (project) => ({
    type: GET_ONE,
    project
})

export const getProjects = () => async (dispatch) => {
    const response = await fetch(`/api/projects`)
    if (response.ok) {
        const projects = await response.json();
        dispatch(load(projects))
        return projects
    }
}

export const getProject = (project) => async (dispatch) => {
    const reponse = await fetch(`/api/projects/${project.id}`)
    if (response.ok) {
        const project = await response.json();
        dispatch(getOne(project))
        return project
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

export const deleteProject = (projectId) => async (dispatch) => {
    const response = await fetch(`/api/projects/delete/${projectId}`, {
        method: "DELETE",
    });
    if (response.ok) {
        const projectId = await response.json();
        dispatch(deleteOne(projectId))
        return;
    }
}

export const editProject = (project, id) => async (dispatch) => {
    const response = await fetch(`/api/projects/edit/${id}`, {
        method: "PUT",
        body: JSON.stringify(project)
    });
    if (response.ok) {
        const editProject = await response.json();
        dispatch(editOne(editProject))
        return;
    }
}

const initialState = {
    projects: {},
    selected: {},
}

const projectReducer = (state = initialState, action) => {
    let setState;
    switch (action.type) {
        case LOAD:
            const allProjects = {};
            console.log('HEY THERE NMOPTICE ME',action.projects.projects)
            action.projects.projects.forEach((project) => {
                allProjects[project.id] = project
            })
            return { ...state, projects: allProjects }
        case ADD_ONE:
            setState = {...state}
            setState.projects[action.project.id] = action.project
            return setState
        case DELETE_ONE:
            setState = {...state}
            delete setState.projects[action.projectId];
            return setState
        case EDIT_ONE:
            setState = {...state}
            let prj = action.project
            setState.projects[prj.id] = prj
            return setState
        case GET_ONE:
            setState = {...state}
            let project = action.project
            setState.selected[project.id] = project
            return setState
        default:
            return state;
    }
}

export default projectReducer
