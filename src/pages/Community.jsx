import React from "react";
import { Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./Community.css";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
const Community = ({ posts }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const goToPost = () => {
    if (user) {
      navigate("/community/create");
    } else {
      navigate("/SignIn");
    }
  };
  return (
    <Container>
      <div className="community-container">
        <div className="section-title">커뮤니티</div>
        <div className="post-upload-container">
          <div>
            <button className="post-upload" onClick={goToPost}>
              게시글 쓰기
            </button>
          </div>
        </div>
        <Row>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="post-container">
                <div className="post-author">{user.displayName}</div>
                <div className="post-detail">{post.detail}</div>
                <div className="post-sub">
                  <div className="post-date">{post.date}</div>
                  <div className="post-view">
                    <FontAwesomeIcon icon={faEye} />{" "}
                    {Math.floor(Math.random() * 100)}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>게시글이 없습니다. 첫 게시글을 작성해보세요!</p>
          )}
        </Row>
      </div>
    </Container>
  );
};

export default Community;
