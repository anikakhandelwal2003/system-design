import React, { useState } from "react";

const NestedComponent = ({ comments, onDelete, onEdit, onAdd }) => {
  const [show, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [editText, setEditText] = useState(comments.text);

  const handleEdit = () => {
    if (editText.trim) {
      onEdit(comments.id, editText);
      setIsEditing(false);
    }
  };

  const handleReply = () => {
    if (newComment.trim()) {
      onAdd(comments.id, newComment);
      setIsAdding(false);
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={handleEdit} style={{ marginLeft: "10px" }}>
            Save
          </button>
        </>
      ) : (
        <div
          style={{
            fontWeight: comments?.children?.length > 0 ? "bold" : "normal",
          }}
        >
          <span onClick={() => setShow(!show)}>{comments.text}</span>
          <button
            style={{ marginLeft: "10px" }}
            onClick={() => setIsAdding(!isAdding)}
          >
            Add
          </button>
          <button
            onClick={() => setIsEditing(!isEditing)}
            style={{ marginLeft: "10px" }}
          >
            Edit
          </button>
          <button
            style={{ marginLeft: "10px" }}
            onClick={() => onDelete(comments.id)}
          >
            ❌
          </button>
        </div>
      )}

      {isAdding && (
        <>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleReply} style={{ marginLeft: "10px" }}>
            ADD
          </button>
        </>
      )}

      <div>
        {show &&
          comments?.children?.map((comment) => {
            return (
              <NestedComponent
                comments={comment}
                key={comment.id}
                onDelete={onDelete}
                onEdit={onEdit}
                onAdd={onAdd}
              />
            );
          })}
      </div>
    </div>
  );
};

export default NestedComponent;