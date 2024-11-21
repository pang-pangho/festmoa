import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Create.css";

const Create = ({ onAddPost }) => {
  const [formInput, setFormInput] = useState({
    author: "",
    title: "",
    detail: "",
  });
  const navigate = useNavigate();

  const changeHandler = (event) => {
    const { id, value } = event.target;
    setFormInput((prevState) => ({ ...prevState, [id]: value }));
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const newPost = {
      id: Date.now(), // 고유 ID 생성
      author: formInput.author,
      title: formInput.title,
      detail: formInput.detail,
      date: new Date().toISOString().split("T")[0], // 현재 날짜
    };

    onAddPost(newPost); // 부모 컴포넌트(App)로 데이터 전달
    navigate("/community"); // 커뮤니티 페이지로 이동
  };

  return (
    <Container className="create-container">
      <div className="section-title">게시글 작성</div>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="author">작성자</label>
          <input
            type="text"
            className="form-control"
            id="author"
            placeholder="작성자 이름을 입력하세요"
            value={formInput.author}
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="제목을 입력하세요"
            value={formInput.title}
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="detail">내용</label>
          <textarea
            className="form-control"
            id="detail"
            rows="5"
            placeholder="내용을 입력하세요"
            value={formInput.detail}
            onChange={changeHandler}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          저장
        </button>
      </form>
    </Container>
  );
};

export default Create;
