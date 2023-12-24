import React, { useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

const AudioUpload = () => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);


  // cloudinary REST API upload
  const uploadToCloudinary = async (file, resourceType) => {
    const data = new FormData();
    data.append("file", file);
    data.append(
      "upload_preset",
      resourceType === "auto" ? "audios_preset" : "images_preset"
    );

    try {
      const cloudName = "avoidrafa";
      const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
      const res = await axios.post(api, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const secureUrl = res.data.secure_url;
      return secureUrl;
    } catch (error) {
      console.error("Error uploading file:", error.response ? error.response.data : error.message);
      return null;
    }
  };

  const handleAudioChange = (e) => {
    const files = e.target.files;
    // convert filelist to an array before passing
    const filesArray = [...files];
    console.log("Audio Files:", filesArray);
    setAudioFiles(filesArray);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
  };

  // post urls to database
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const audioUploadPromises = audioFiles.map(async (audio) => {
        return uploadToCloudinary(audio, "auto");
      });

      const audioUrls = await Promise.all(audioUploadPromises);
      const imageUrl = await uploadToCloudinary(img, "image");
      const audioFileNames = audioFiles.map((file) => file.name);

      console.log("Image upload success:", imageUrl);
      console.log("Audio uploads success:", audioUrls);

      await axios.post("http://localhost:8000/api/album/upload", {
        audioUrls: audioUrls,
        audioFileNames: audioFileNames,
        imgUrl: imageUrl,
      });

      console.log("Data sent to the server successfully!");
    } catch (error) {
      console.error("Error uploading files:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="audio">Upload Audio Files (Select all the songs of the album at once):</label>
          <br />
          <input
            type="file"
            accept="audio/*"
            id="audio"
            multiple
            onChange={handleAudioChange}
          />
        </div>
        <div>
          <label htmlFor="image">Upload Image:</label>
          <br />
          <input
            type="file"
            accept="image/*"
            id="image"
            onChange={handleImageChange}
          />
        </div>
        <br />
        <button type="submit">Upload Files</button>
      </form>

      {loading && (
        <ThreeDots
          height={80}
          width={80}
          radius={9}
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          visible={true}
        />
      )}
    </div>
  );
};

export default AudioUpload;
