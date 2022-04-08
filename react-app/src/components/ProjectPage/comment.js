import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments, createComments, deleteComments } from "../../store/comment";

import './ProjectPage.css';

const CommentsForm = ({ projectId }) => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.session?.user)
    const comments = useSelector((state) => state.comment.comments)

    let user_id = user?.id
    let project_id = projectId

    const [comment, setComment] = useState('');
    const updateComment = (e) => setComment(e.target.value);

    useEffect(() => {
        dispatch(getComments(projectId))
    }, [dispatch, projectId]);

    const commentSubmit = async (e) => {
        e?.preventDefault();
        const commentS = {
            comment,
            user_id,
            project_id,
          };
        await dispatch(createComments(commentS));
        await dispatch(getComments(projectId));
        setComment('');
    }

    const commentDeletion = async (comment) => {
        await dispatch(deleteComments(comment));
        //await dispatch(getComments(projectId));
    }


    return (
        <div className='view-project-comments-div'>
            <div className='written-comments-div'>
            {Object?.values(comments).map((comment) =>
            (<>
                <div className='comments-section-div' key={`div${comment?.id}`}>
                    <div>
                    <img alt={`UserDisplay`}src={`${comment?.user_image}`} />
                    </div>
                    <div className='comments-section-info'>
                    <h3 className="review-comment-h3" key={`h3${comment?.id}`}>{`"${comment?.comment}"`}</h3>
                    <h2 key={`h2{comment.id}`}>{`~${comment?.project_username}`}</h2>
                    </div>
                </div>
                {comment?.user_id===user?.id ?
                (<><button onClick={()=>commentDeletion(comment)} className='comment-button delete-comment-button' key={`Dbutton${comment?.id}`}>DELETE ⇈</button></>
                ) :
                (<></>)}
            </>
            )
            )}
            </div>
            { user?.id && (
                <div>
                    <section className="comment-form-holder centered middled">
                        <form className="write-comment-form" onSubmit={commentSubmit}>
                            <textarea
                            placeholder="Write out a Comment"
                            wrap='soft'
                            required
                            value={comment}
                            onChange={updateComment}
                            />
                            <button type='submit' className="comment-button publish-comment-button">Publish Comment</button>
                        </form>
                    </section>
                </div>)}
        </div>

    );
};

export default CommentsForm;
