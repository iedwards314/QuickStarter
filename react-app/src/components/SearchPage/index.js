import { useParams } from "react-router-dom";
import ProjectsList from "../SplashPage/ProjectList";

const SearchPage = () => {
    const { searchTerms } = useParams();
    if (searchTerms) {
        console.log(searchTerms);
    }

    return (
        <>
            <p>Showing x results for {searchTerms}</p>
            <ProjectsList />
        </>
        // render project list based on results with
        // search = true to alter logic
    )
};

export default SearchPage;
