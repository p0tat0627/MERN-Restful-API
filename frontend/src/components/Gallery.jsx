import React, { useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

const AudioUpload = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // cloudinary REST API upload
  const uploadToCloudinary = async (file, resourceType) => {
    const data = new FormData();
    data.append("file", file);
    data.append(
      "upload_preset",
      resourceType === "image" ? "images_preset" : "images_preset"
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
      console.error(
        "Error uploading file:",
        error.response ? error.response.data : error.message
      );
      return null;
    }
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    // convert filelist to an array before passing
    const filesArray = [...files];
    console.log("All the Images:", filesArray);
    setImageFiles(filesArray);
  };

  // post urls to database
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const imageUploadPromises = imageFiles.map(async (image) => {
        return uploadToCloudinary(image, "image");
      });

      const imageUrls = await Promise.all(imageUploadPromises);

      console.log("Images upload success:", imageUrls);

      await axios.post("http://localhost:8000/api/gallery/upload", {
        imgUrls: imageUrls,
      });

      console.log("Data sent to the server successfully!");
    } catch (error) {
      console.error(
        "Error uploading files:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <h4>Gallery (All gallery Images)</h4>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="image">
            Upload Gallery Images (Select all gallery images at once){" "}
          </label>
          <br />
          <input
            type="file"
            accept="image/*"
            id="image"
            multiple
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
