import React, { useState } from "react";

const DropZone = ({ onChange, inputRef }) => {
  const [file, setFile] = useState(null);

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleInputChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    onChange(event.target.files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div
      style={{
        width: "300px",
        height: "200px",
        border: "2px dashed #aaa",
        borderRadius: "5px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {file ? (
        <div>
          <p>File selected: {file.name}</p>
          <p>File type: {file.type}</p>
        </div>
      ) : (
        <div>
          <p>Drag and drop a file here or</p>
          <input type="file" onChange={handleInputChange} {...inputRef} />
        </div>
      )}
    </div>
  );
};

export default DropZone;
