import { useState } from 'react'
import './style/project-navbar.css';

const ProjectNavBar = () => {
    const [allActive, setAllActive] = useState('comments');

    return (
    <>
        <div className="lower-link-container">
            <div className="project-links-list">
                <div
                    className={allActive === "comments" ? 'profile-nav-button selected' : 'profile-nav-button'}
                    onClick={() => setAllActive("comments")}>
                    Comments
                </div>
                <div
                    className={allActive === "updates" ? 'profile-nav-button selected' : 'profile-nav-button'}
                    onClick={() => setAllActive("updates")}>
                    Updates
                </div>
            </div>
        </div>
        {allActive === "comments" ?
        // insert comment component
        <p>Comments Component!</p> :
        allActive === "updates" ?
        // insert updates component
        <p>Updates Component!</p> :
        null}
    </>
    )
}

export default ProjectNavBar;
