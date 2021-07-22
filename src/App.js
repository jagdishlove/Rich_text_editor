import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import "./app.css";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function App() {
  const [text, setText] = useState("");
  const [post, setPost] = useState("");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const initialValues = {
    email: "j@gamil.com"
  };

  const onSubmit = (values) => {
    setText(values.email);
    const v = stateToHTML(editorState.getCurrentContent());
    setPost(v);
  };

  const validationSchema = Yup.object({
    // values.email
    email: Yup.string().email("Invalid email format").required("required")
    // ,posts: Yup.string().required("required")
  });

  //Formik for form managing

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  });

  const onEditorChange = (editorState) => {
    setEditorState(editorState);

    // const content = editorState.getCurrentContent();
    // const contentToSave = convertToRaw(content).blocks;
    // const value = contentToSave.map(block => (!block.text.trim() && '') || block.text).join('');
    // const v = stateToHTML(editorState.getCurrentContent());
    // setPost(v);
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      onEditorChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  const onStrikeThroughClick = () => {
    onEditorChange(RichUtils.toggleInlineStyle(editorState, "STRIKETHROUGH"));
  };

  const onItalicClick = () => {
    onEditorChange(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const onBoldClick = () => {
    onEditorChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const onUnderlineClick = () => {
    onEditorChange(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  return (
    <div className="App">
      <form onSubmit={formik.handleSubmit}>
        <div className="form">
          <div>
            <div className="input">
              <label htmlFor="email">Email</label>
              <input
                onBlur={formik.handleBlur}
                type="email"
                name="email"
                id="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder="write email..."
              />
              {formik.touched.email && formik.errors.email ? (
                <div style={{ color: "red", textAlign: "center" }}>
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="editorContainer">
          <button className="underline" onClick={onUnderlineClick}>
            U
          </button>
          <button className="underline" onClick={onUnderlineClick}>
            U
          </button>
          <button className="bold" onClick={onBoldClick}>
            <b>B</b>
          </button>
          <button className="italic" onClick={onItalicClick}>
            <em>I</em>
          </button>
          <button className="strikethrough" onClick={onStrikeThroughClick}>
            abc
          </button>

          <div className="editors">
            <Editor
              editorState={editorState}
              handleKeyCommand={handleKeyCommand}
              onChange={onEditorChange}
              // onBlur={formik.handleBlur}
              type="text"
              name="posts"
              id="posts"
              value={formik.values.posts}
              placeholder="write message..."
            />
          </div>
        </div>
        <button className="btn">Submit</button>
      </form>

      <p>Email:{text}</p>
      <p>
        Message: <p dangerouslySetInnerHTML={{ __html: post }}></p>
      </p>
    </div>
  );
}
