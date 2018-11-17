import React from "react";

const Comments = props => {
  return (
    <div>
      {props.comments.map((comments, i) => (
        <div
          className="panel panel-default"
          style={{ marginBottom: "5px" }}
          key={i}
        >
          <div className="panel-body">
            <button
              className="btn btn-sm btn-danger pull-right change-saved"
              data-id=""
              onClick={() => props.deleteComment(comments._id)}
            >
              X
            </button>

            <p>{comments.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
