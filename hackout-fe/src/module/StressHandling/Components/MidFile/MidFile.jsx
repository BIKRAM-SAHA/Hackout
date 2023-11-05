import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GridContainer, Outer } from "./MidFile.styles";
import axios from "axios";

function MidFile() {
  const location = useLocation();
  const [videos, setVideos] = useState();

  useEffect(() => {
    const render = async () => {
      const API_URL = `${import.meta.env.VITE_BASE_URL}/videos`;
      const options = {
        patient_id: 3,
        type: location.state.type,
      };

      try {
        const response = await axios.post(API_URL, options);
        setVideos(response.data.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    render();
  }, [location.state.type]);

  return (
    <Outer>
      <GridContainer>
        {videos &&
          videos.map((video, index) =>
            video!==null && (
              <li key={index}>
                <iframe
                  src={`https://www.youtube.com/embed/${video}`}
                  allowFullScreen="true"
                ></iframe>
              </li>
            )
          )}
      </GridContainer>
    </Outer>
  );
}

export default MidFile;
