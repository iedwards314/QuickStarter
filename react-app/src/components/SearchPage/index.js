import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react"
import ProjectsList from "../SplashPage/ProjectList";
import { searchProjects } from "../../store/project";

const SearchPage = () => {
    const { searchTerms } = useParams();
    const dispatch = useDispatch();
    dispatch(searchProjects(searchTerms))

    return (
        <>
            <p>Showing x results for {searchTerms}</p>
            <ProjectsList search={true}/>
        </>
        // render project list based on results with
        // search = true to alter logic
    )
};

export default SearchPage;
