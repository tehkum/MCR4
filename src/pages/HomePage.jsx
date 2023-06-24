import { useState } from "react";
import { useItems } from "../context/ItemContext";
import "./Homepage.css";
import { useNavigate } from "react-router";

export default function HomePage() {
  const { postData, setPostData, trend } = useItems();
  const [btn, setBtn] = useState({
    upvote: false,
    downvote: false,
  });

  const sorted = (trend === "mostUpvoted")
  ? postData.sort((a, b) => (parseInt(b.upvotes) - parseInt(b.downvotes)) - (parseInt(a.upvotes) - parseInt(a.downvotes)))
  : postData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const navigate = useNavigate();

  const upvoteHandler = (id) => {
    setBtn({...btn, upvote: !btn.upvote})
    if(!btn.upvote){
        postData.find(item=>item.postId === id).upvotes+=1
        setPostData([...postData])
    }
    if(btn.upvote){
        postData.find(item=>item.postId === id).upvotes-=1
        setPostData([...postData])
    }
  };

  const downvoteHandler = (id) => {
    setBtn({...btn, downvote: !btn.downvote})
    if(!btn.downvote){
        postData.find(item=>item.postId === id).downvotes+=1
        setPostData([...postData])
    }
    if(btn.downvote){
        postData.find(item=>item.postId === id).downvotes-=1
        setPostData([...postData])
    }
  }

  const bookmarks = (postId) => {
    postData.find(item=>item.postId === postId).isBookmarked=!postData.find(item=>item.postId === postId).isBookmarked
        setPostData([...postData])
  }

  return (
    <div className="homepage-block">
      {sorted.map((items, index) => {
        return (
          <div key={items.postId} className="homepage-layout">
            <div className="upvote-btns">
              {btn.upvote ? (
                <img
                  width="30"
                  height="30"
                  src="https://img.icons8.com/office/80/triangle-stroked.png"
                  alt="triangle-stroked"
                  onClick={()=>upvoteHandler(items.postId)}
                />
              ) : (
                <img
                  width="30"
                  height="30"
                  src="https://img.icons8.com/windows/96/triangle-stroked.png"
                  alt="triangle-stroked"
                  onClick={()=>upvoteHandler(items.postId)}
                />
              )}
              <p>{+items.upvotes - +items.downvotes}</p>
              {btn.downvote ? (
                <img
                  width="30"
                  height="30"
                  src="https://img.icons8.com/office/80/triangle-stroked.png"
                  alt="triangle-stroked"
                  onClick={()=>downvoteHandler(items.postId)}
                  style={{ transform: "rotate(180deg)" }}
                />
              ) : (
                <img
                  width="30"
                  height="30"
                  src="https://img.icons8.com/windows/96/triangle-stroked.png"
                  alt="triangle-stroked"
                  style={{ transform: "rotate(180deg)" }}
                  onClick={()=>downvoteHandler(items.postId)}
                />
              )}
            </div>
            <div className="post-container">
              <div className="post-header">
                <img src={items.picUrl} alt="..." width="50" height="50" />
                <p>
                  post by <b>@{items.username}</b>
                </p>
              </div>
              <div
                className="post-tag"
                style={{ display: "flex", gap: "10px" }}
              >
                {items.tags.map((tag) => (
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
              <h3>{items.post}</h3>
              <p>{items.postDescription}</p>
              <div className="post-icons">
              <img width="30" height="30" src="https://img.icons8.com/material-outlined/96/comments--v1.png" alt="comments--v1" onClick={()=>navigate(`/comments/${items.postId}`)}/>
              <img width="30" height="30" src="https://img.icons8.com/material-outlined/96/share.png" alt="share"/>
              {items.isBookmarked ? <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/90/bookmark-ribbon.png" alt="bookmark-ribbon" onClick={()=>bookmarks(items.postId)}/>:<img width="30" height="30" src="https://img.icons8.com/material-outlined/96/bookmark-ribbon--v1.png" alt="bookmark-ribbon--v1" onClick={()=>bookmarks(items.postId)}/>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
