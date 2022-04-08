import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments, createComments, deleteComments, editComments } from "../../store/comment";

import './ProjectPage.css';

const CommentsForm = ({ projectId }) => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.session.user)
    const comments = useSelector((state) => state.comment.comments)

    let user_id = user.id
    let project_id = projectId

    const [comment, setComment] = useState('');
    const updateComment = (e) => setComment(e.target.value);

    useEffect(() => {
        dispatch(getComments(projectId))
    }, [dispatch, projectId]);

    const commentSubmit = async (e) => {
        e.preventDefault();
        const commentS = {
            comment,
            user_id,
            project_id,
          };

        await dispatch(createComments(commentS));
        await dispatch(getComments(projectId));
    }

    const commentDeletion = async (id) => {
        await dispatch(deleteComments(id));
        await dispatch(getComments(projectId));
    }

    const commentEdit = async (e,id) => {
      e.preventDefault();

      const payload = {
        id,
        comment
      };
      console.log('YOOYOYOYO', payload)
      let editedComment
      try {
          editedComment = await dispatch(editComments(payload));
      } catch (error) {
          console.log("There is an error")
      }
    };


    return (
        <div className='view-project-comments-div'>
            <div className='written-comments-div'>
            {Object.values(comments).map((comment) =>
            (<>
                <div className='comments-section-div' key={`div${comment.id}`}>
                    <h3 className="review-comment-h3" key={`h3${comment.id}`}>{comment.comment}</h3>
                    <h2 key={`h2{comment.id}`}>{comment.project_username}</h2>
                </div>
                {comment.user_id===user.id ?
                (<><button onClick={()=>commentDeletion(comment.id)} className='comment-button' key={`button${comment.id}`}>DELETE ⇈</button>
                <button onClick={()=>commentEdit(comment.id)} className='comment-button' key={`button${comment.id}`}>EDIT ⇈</button></>
                ) :
                (<></>)}
            </>
            )
            )}
            </div>
            <section className="comment-form-holder centered middled">
            <form className="write-comment-form" onSubmit={commentSubmit}>
                <input
                type="text"
                placeholder="Write out a Comment"
                value={comment}
                onChange={updateComment}
                />
                <button type='submit' className="comment-button">Publish Comment</button>
            </form>
            </section>
        </div>
    );
};


export default CommentsForm;
