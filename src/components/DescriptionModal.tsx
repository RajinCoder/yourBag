"use client";

import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  status: boolean;
  onClick: () => void;
  moveName: string;
  moveDescr: string;
}

interface VideoDetails {
  videoId: string;
  thumbnailUrl: string;
}

function DescriptionModal({ status, onClick, moveName, moveDescr }: Props) {
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);

  useEffect(() => {
    fetchVideoDetails();
  }, [moveName, moveDescr]);

  const fetchVideoDetails = async () => {
    try {
      // Adjust the endpoint URL as necessary
      const response = await fetch(
        `/api/search?searchTerm=${encodeURIComponent(
          `${moveName} how to basketball`
        )}`
      );
      const data = await response.json();

      if (data.videoId && data.thumbnailUrl) {
        setVideoDetails({
          videoId: data.videoId,
          thumbnailUrl: data.thumbnailUrl,
        });
      } else {
        alert(data.error || "No results found");
        setVideoDetails(null);
      }
    } catch (error) {
      console.error("Failed to fetch video details:", error);
      alert("Error fetching video details");
      setVideoDetails(null);
    }
  };

  return (
    <div className="flex flex-row">
      <Modal
        show={status}
        onClose={onClick}
        className="backdrop-blur-sm bg-opacity-60" // For background blur and opacity
      >
        <div className="overflow-auto h-[80vh] w-full flex flex-col justify-between">
          {" "}
          {/* Adjust height and enable scrolling */}
          <Modal.Header className="pt-4 text-black flex justify-between px-8">
            {moveName}
          </Modal.Header>
          <Modal.Body className="text-black">
            <h2>Tutorial</h2>
            {videoDetails && (
              <a
                href={`https://www.youtube.com/watch?v=${videoDetails.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={videoDetails.thumbnailUrl}
                  className="w-full md:h-[70vh]"
                  alt="Video Thumbnail"
                />
              </a>
            )}
            <h2 className="mt-10">Full Description</h2>
            <div className="">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {moveDescr}
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-gray-100 h-20 dark:bg-gray-800 rounded-br-lg rounded-bl-lg">
            <Link
              className="text-center rounded-b-md h-full w-full text-white"
              target="_blank"
              rel="noopener noreferrer"
              to={`https://www.youtube.com/watch?v=${
                videoDetails ? videoDetails.videoId : ""
              }`}
            >
              Watch Video
            </Link>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
}

export default DescriptionModal;
