import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ProjectsList from "../SplashPage/ProjectList";
import { searchProjects } from "../../store/project";
import "../SplashPage/style/project-list.css"

const SearchPage = () => {
    const { searchTerms } = useParams();
    const dispatch = useDispatch();
    dispatch(searchProjects(searchTerms))


    return (
        <>
            <p>Showing results for "{searchTerms}" :</p>
            <div className="splash-page-container">
                <ProjectsList search={true}/>
            </div>
        </>
    )
};

export default SearchPage;
