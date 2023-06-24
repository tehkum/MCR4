import { useEffect, useState } from "react";
import { useItems } from "../context/ItemContext";
import "./Homepage.css";
import { useParams } from "react-router";

export default function Comments() {
  const { postData, setPostData } = useItems();
  const [thisPost, setThisPost] = useState({});
  const [btn, setBtn] = useState({
    upvote: false,
    downvote: false,
  });
  
  const { postId } = useParams();

  useEffect(() => {
    setThisPost(postData.find((item) => item.postId === postId));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  const upvoteHandler = (id) => {
    setBtn({ ...btn, upvote: !btn.upvote });
    if (!btn.upvote) {
      postData.find((item) => item.postId === id).upvotes += 1;
      setPostData([...postData]);
    }
    if (btn.upvote) {
      postData.find((item) => item.postId === id).upvotes -= 1;
      setPostData([...postData]);
    }
  };

  const downvoteHandler = (id) => {
    setBtn({ ...btn, downvote: !btn.downvote });
    if (!btn.downvote) {
      postData.find((item) => item.postId === id).downvotes += 1;
      setPostData([...postData]);
    }
    if (btn.downvote) {
      postData.find((item) => item.postId === id).downvotes -= 1;
      setPostData([...postData]);
    }
  };

  const bookmarks = (postId) => {
    postData.find(item=>item.postId === postId).isBookmarked=!postData.find(item=>item.postId === postId).isBookmarked
        setPostData([...postData])
  }

  return (
    <div className="homepage-block" style={{padding: "1rem"}}>
      <div key={thisPost.postId} className="homepage-layout">
        <div className="upvote-btns">
          {btn.upvote ? (
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/office/80/triangle-stroked.png"
              alt="triangle-stroked"
              onClick={() => upvoteHandler(thisPost.postId)}
            />
          ) : (
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/windows/96/triangle-stroked.png"
              alt="triangle-stroked"
              onClick={() => upvoteHandler(thisPost.postId)}
            />
          )}
          <p>{+thisPost.upvotes - +thisPost.downvotes}</p>
          {btn.downvote ? (
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/office/80/triangle-stroked.png"
              alt="triangle-stroked"
              onClick={() => downvoteHandler(thisPost.postId)}
              style={{ transform: "rotate(180deg)" }}
            />
          ) : (
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/windows/96/triangle-stroked.png"
              alt="triangle-stroked"
              style={{ transform: "rotate(180deg)" }}
              onClick={() => downvoteHandler(thisPost.postId)}
            />
          )}
        </div>
        <div className="post-container">
          <div className="post-header">
            <img src={thisPost.picUrl} alt="..." width="50" height="50" />
            <p>
              post by <b>@{thisPost.username}</b>
            </p>
          </div>
          <div className="post-tag" style={{ display: "flex", gap: "10px" }}>
            {thisPost?.tags?.map((tag) => (
              <p
                style={{
                  backgroundColor: "#e4e3f7",
                  color: "purple",
                  padding: "4px",
                  borderRadius: "5px",
                }}
              >
                {tag}
              </p>
            ))}
          </div>
          <h3>{thisPost.post}</h3>
          <p>{thisPost.postDescription}</p>
          <div className="post-icons">
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/material-outlined/96/comments--v1.png"
              alt="comments--v1"
            />
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/material-outlined/96/share.png"
              alt="share"
            />
            {thisPost.isBookmarked ? <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/90/bookmark-ribbon.png" alt="bookmark-ribbon" onClick={()=>bookmarks(thisPost.postId)}/>:<img width="30" height="30" src="https://img.icons8.com/material-outlined/96/bookmark-ribbon--v1.png" alt="bookmark-ribbon--v1" onClick={()=>bookmarks(thisPost.postId)}/>}

          </div>
        </div>
      </div>
      <div className="Comment-box">
        <h3>Comments</h3>
        { thisPost?.comments?.map(comment=>
        <div className="post-container">
            <div className="post-header">
            <img
              src={comment.picUrl}
              alt="..."
              width="50"
              height="50"
            />
            <p>
              <b>{comment.username}</b>
            </p>
          </div>
          <p>Replying to @{thisPost?.username}</p>
          <p>{comment.comment}</p>
          <div className="post-icons">
          <img
              width="30"
              height="30"
              src="https://img.icons8.com/material-outlined/96/comments--v1.png"
              alt="comments--v1"
            />
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/material-outlined/96/share.png"
              alt="share"
            />
          </div>
          </div>)
          
        }
      </div>
    </div>
  );
}
