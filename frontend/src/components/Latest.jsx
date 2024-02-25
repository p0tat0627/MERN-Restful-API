import React, { useState } from "react";
import axios from "axios";
import {ThreeDots} from "react-loader-spinner";

const Latest = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadFile = async (type) => {
    const data = new FormData();
    data.append("file", img);
    data.append(
      "upload_preset",
      type === 'image' ? 'images_preset' : 'images_preset'
    );

    try {
      let cloudName = "avoidrafa";
      console.log(cloudName);
      let resourceType = 'image';
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      console.log(secure_url);
      return secure_url;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // upload the image file
      const imgUrl = await uploadFile('image');
      // send api request to cloudinary for upload
      await axios.post(`http://localhost:8000/api/latest/upload`, {
        text,
        imgUrl,
      });
      // reset states
      setImg(null);
      setText("");

      console.log("Latest image and text upload success!");
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
      <h4>Latest Release (Album name & Album Image)</h4>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="text">Input Latest Album Name:</label>
        <br />
          <textarea
            type="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
          />
        </div>
        <div>
          <label htmlFor="img">Upload Latest Album Image:</label>
          <br />
          <input
            type="file"
            accept="image/*"
            id="img"
            onChange={(e) => setImg((prev) => e.target.files[0])}
          />
        </div>
        <br />
        <button type="submit">Upload</button>
      </form>

      {
        loading && <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      }
      
    </div>
  );
};

export default Latest;
