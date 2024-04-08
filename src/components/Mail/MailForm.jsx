import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import Quill from "react-quill";
import axios from "axios";

function EmailApp() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const sendEmail = async () => {
    try {
      const response = await axios.post(
        "https://react-auth-9e7aa-default-rtdb.firebaseio.com",
        {
          to: email,
          subject: subject,
          content: content,
          timestamp: Date.now(),
        }
      );
      console.log("Email sent successfully:", response.data);
      alert("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again later.");
    }
  };

  return (
    <div>
      <h1>Compose Email</h1>
      <div>
        <label>To:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Subject:</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div>
        <label>Content:</label>
        <Quill
          value={content}
          onChange={setContent}
          modules={{
            toolbar: [
              [{ header: "1" }, { header: "2" }, { font: [] }],
              [{ size: [] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [{ color: [] }, { background: [] }],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image", "video"],
              ["clean"],
            ],
          }}
          formats={[
            "header",
            "font",
            "size",
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "color",
            "background",
            "list",
            "bullet",
            "link",
            "image",
            "video",
          ]}
          placeholder="Write your email content here..."
        />
      </div>
      <button onClick={sendEmail}>Send Email</button>
    </div>
  );
}

export default EmailApp;
