import { useState, useRef } from 'react';

function TestPage() {
    const [imageSrc, setImageSrc] = useState('../../assets/Img/right-arrow.png'); // Replace with your default image path
    const fileInputRef = useRef(null);
  
    const handleDoubleClick = () => {
      fileInputRef.current.click(); // Trigger file input click
    };
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageSrc(reader.result); // Update the image source with the new image
        };
        reader.readAsDataURL(file);
      }
    };
  
    return (
      <div style={{marginLeft: '100px'}}>
        <img
          src={imageSrc}
          alt="Click to change"
          onDoubleClick={handleDoubleClick}
          style={{ cursor: 'pointer', width: '300px', height: 'auto' }} // Adjust size as needed
        />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }} // Hide the file input
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    );
  }

export default TestPage;