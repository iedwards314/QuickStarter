import { NavLink } from "react-router-dom";
import ProgressBar from "../ProgressBar";

const CampaignCard = ({project}) => {
    return (
      <NavLink exact to={`/projects/${project?.id}`}>
        <div className="project-div" key={project?.id}>
              <div className="project-image-container" exact to={`/projects/${project?.id}`}>
                <img className="project-image" src={project?.image} alt="project" />
              </div>
              <div  className="project-title"exact to={`/projects/${project?.id}`}>
                <h3 style={{color: "white", margin: "10px 0px 0px 0px"}}>{project?.title}</h3>
              </div>
              <div className="project-description" exact to={`/projects/${project?.id}`}>
                {project?.description}
              </div>
              <div style={{marginLeft: "20px", marginTop: "20px"}}>
                {Math.floor((project?.completion / project?.goal) * 100) > 0 ?
                <ProgressBar bgcolor={"#44fff0"} completed={Math.floor((project?.completion / project?.goal) * 100)} /> :
                <p style={{margin: "0px"}}>Be the first to contribute</p>}
                <p style={{margin: "10px 0px 0px 0px", color: "#44fff0"}}>{Math.floor((project?.completion / project?.goal) * 100)}% to goal</p>
              </div>
            </div>
      </NavLink>
    )
}

export default CampaignCard;
