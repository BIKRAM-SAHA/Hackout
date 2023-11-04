import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GridContainer, Outer } from "./MidFile.styles";

function MidFile() {
  const [videos, setVideos] = useState([
    { resourceId: "W1rhJu_mZ8U" },
    { resourceId: "W1rhJu_mZ8U" },
    { resourceId: "W1rhJu_mZ8U" },
    { resourceId: "VYQvDoov69Q" },
    { resourceId: "VYQvDoov69Q" },
    { resourceId: "VYQvDoov69Q" },
    { resourceId: "VYQvDoov69Q" },
    { resourceId: "VYQvDoov69Q" },
    { resourceId: "VYQvDoov69Q" },
    { resourceId: "VYQvDoov69Q" },
    { resourceId: "VYQvDoov69Q" },
    { resourceId: "VYQvDoov69Q" },
    { resourceId: "VYQvDoov69Q" },
    { resourceId: "VYQvDoov69Q" },
    { resourceId: "VYQvDoov69Q" },
    { resourceId: "VYQvDoov69Q" },
    { resourceId: "VYQvDoov69Q" },
    { resourceId: "VYQvDoov69Q" },
    { resourceId: "VYQvDoov69Q" },
    { resourceId: "VYQvDoov69Q" },
    { resourceId: "VYQvDoov69Q" },
    { resourceId: "VYQvDoov69Q" },
    { resourceId: "VYQvDoov69Q" },
    { resourceId: "VYQvDoov69Q" },
    { resourceId: "VYQvDoov69Q" },
    { resourceId: "VYQvDoov69Q" },
    { resourceId: "VYQvDoov69Q" },
    { resourceId: "VYQvDoov69Q" },
    { resourceId: "VYQvDoov69Q" },
    { resourceId: "VYQvDoov69Q" },
    { resourceId: "VYQvDoov69Q" },
    { resourceId: "VYQvDoov69Q" },
    { resourceId: "VYQvDoov69Q" },
    { resourceId: "VYQvDoov69Q" },
    { resourceId: "VYQvDoov69Q" },
    { resourceId: "VYQvDoov69Q" },
    { resourceId: "VYQvDoov69Q" },
    { resourceId: "VYQvDoov69Q" },
    { resourceId: "VYQvDoov69Q" },
    { resourceId: "VYQvDoov69Q" },
    { resourceId: "VYQvDoov69Q" },
    { resourceId: "VYQvDoov69Q" },
    { resourceId: "VYQvDoov69Q" },
  ]);
  return (
    <Outer>
      <GridContainer>
        {videos.map((video) => (
          <li key={video.index}>
            <iframe
              src={`https://www.youtube.com/embed/${video.resourceId}`}
              allowfullscreen="true"
            ></iframe>
          </li>
        ))}
      </GridContainer>
    </Outer>
  );
}

export default MidFile;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function VideoList() {
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     // Replace 'YOUR_API_KEY' with the API key you generated
//     const API_KEY = "YOUR_API_KEY";
//     const PLAYLIST_ID = "YOUR_PLAYLIST_ID"; // Optional, if you want to display videos from a specific playlist

//     // API endpoint to fetch videos from a playlist (or search results)
//     const API_URL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${PLAYLIST_ID}&key=${API_KEY}`;

//     axios
//       .get(API_URL)
//       .then((response) => {
//         setVideos(response.data.items);
//       })
//       .catch((error) => {
//         console.error("Error fetching videos:", error);
//       });
//   }, []);

//   return (
//     <div>
//       <h2>YouTube Videos</h2>
//       <ul>
//         {videos.map((video) => (
//           <li key={video.snippet.resourceId.videoId}>
//             <iframe
//               title={video.snippet.title}
//               src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}
//             ></iframe>
//             <h3>{video.snippet.title}</h3>
//             <p>{video.snippet.description}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default VideoList;
