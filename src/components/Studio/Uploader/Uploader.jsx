import axios from "axios";
import { useEffect, useState } from "react";

export default function Uploader() {
    const [video, setVideo] = useState(null);
    const [videoTitle, setVideoTitle] = useState('');
    const [thumbnails, setThumbnails] = useState([]);

    const handleVideoUpload = (event) => {
        const uploadedFile = event.target.files[0];
        if (uploadedFile) {
            setVideo(uploadedFile);
        }
    };

    const handleTitleChange = (event) => {
        setVideoTitle(event.target.value);
    };

    const handleThumbnailUpload = (event) => {
        const uploadedFiles = Array.from(event.target.files);

        // Filter only image files
        const imageFiles = uploadedFiles.filter(file => file.type.startsWith("image/"));

        if (imageFiles.length > 3) {
            alert("You can only upload up to 3 images.");
            return;
        }

        // Convert files into object URLs for preview
        const imagePreviews = imageFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        console.log("Uploaded Images:", imagePreviews);
        setThumbnails(imagePreviews);
    };

    useEffect(() => {
        console.log("File selected:", video);
        if (video) {
            setVideoTitle(video.name.split('.').slice(0, -1).join('.'));
        }
    }, [video]);

    // Clean up object URLs to avoid memory leaks
    useEffect(() => {
        return () => {
            thumbnails.forEach(thumbnail => URL.revokeObjectURL(thumbnail.preview));
        };
    }, [thumbnails]);

    const submitVideo = async () => {
        if (!video) {
            alert("Please select a video file to upload.");
            return;
        }

        const token = localStorage.getItem("authToken"); // Retrieve token from localStorage

        const formData = new FormData();
        formData.append("videoFile", video); // Append video file
        formData.append("title", videoTitle);
        formData.append("description", "sample description");
        formData.append("public", true);
        formData.append("comments", true);

        // Append thumbnails
        thumbnails.forEach((thumbnail, index) => {
            console.log(index)
            formData.append(`thumbnails`, thumbnail.file);
        });

        try {
            const response = await axios.post("http://localhost:3000/api/v1/video/upload", formData, {
                headers: {
                    Authorization: `Bearer ${token}`, // Send token in Authorization header
                    "Content-Type": "multipart/form-data", // Required for file uploads
                },
            });

            console.log("Upload successful:", response.data);
        } catch (error) {
            console.error("Upload failed:", error.response?.data || error.message);
        }
    };


    return (
        <div className="p-6 mx-auto">
            <div className="text-2xl font-bold mb-4">
                Upload Video
                <hr className="mt-2" />
            </div>

            {/* Responsive Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* File Upload Column */}
                <div>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-md">Upload file</span>
                        </div>
                        <input type="file" className="file-input file-input-bordered w-full" accept="video/*" onChange={handleVideoUpload} />
                    </label>
                </div>

                {/* Title Input Column */}
                <div>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-md">Video Title</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Enter video title"
                            className="input input-bordered w-full"
                            value={videoTitle || ''}
                            onChange={handleTitleChange}
                        />
                    </label>
                </div>

                {/* Thumbnail Upload Column */}
                <div>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-md">Thumbnails (at max 3)</span>
                        </div>
                        <input
                            type="file"
                            className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                            onChange={handleThumbnailUpload}
                            accept="image/*"
                            multiple
                        />
                    </label>

                    {/* Thumbnail Preview */}
                    <div className="flex gap-4 mt-4">
                        {thumbnails.map((thumbnail, index) => (
                            <div key={index} className="avatar">
                                <div className="w-32 h-32 rounded border">
                                    <img src={thumbnail.preview} alt={`Thumbnail ${index + 1}`} className="object-cover w-full h-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Description</span>
                            <span className="label-text-alt">Max 500 characters</span>
                        </div>
                        <textarea className="textarea textarea-bordered h-40" placeholder="Enter Video Description"></textarea>
                    </label>
                </div>

                <div>
                    <span className="form-control flex flex-row items-center gap-2 mb-6">
                        <span className="label-text">Public</span>
                        <input type="checkbox" className="toggle" defaultChecked />
                        <span className="label-text">Comments</span>
                        <input type="checkbox" className="toggle" defaultChecked />
                    </span>



                    {/* <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">Remember me</span>
                            <input type="checkbox" className="toggle" defaultChecked />
                        </label>
                    </div> */}
                </div>
                <div>
                    <button className="btn btn-outline btn-primary" onClick={submitVideo}>Submit</button>
                </div>
            </div>

        </div>
    );
}
