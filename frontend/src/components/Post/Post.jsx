import React, { useState } from "react";
import api from "../../api/api";

const CreatePost = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    try {
      const uploadResponse = await api.post("/post", formData);
      const imageUrl = uploadResponse.data.imageUrl;
      alert("Post saved successfully!");
      setImage(null);
      setDescription("");
    } catch (error) {
      console.error(error);
      alert("Failed to save post");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a new post</h2>
      <div>
        <label htmlFor="image">Image:</label>
        <input type="file" id="image" onChange={handleImageChange} />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <button type="submit">Save Post</button>
    </form>
  );
};

export default CreatePost;
