import React from 'react';
 
import { useReactMediaRecorder } from "react-media-recorder";
 
const VideoCapture = () => {
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({ video: true });
 
  return (
    <div>
      <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <video src={mediaBlobUrl} controls autoplay loop />
    </div>
  );
};

export default VideoCapture;