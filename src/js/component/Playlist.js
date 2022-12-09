import React, { useEffect, useState, useRef } from "react";
import "../../styles/index.css";
// import { FaSpotify } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faForwardFast,
  faBackwardFast,
  FaSpotify,
} from "@fortawesome/free-solid-svg-icons";
const Playlist = () => {
  const [songs, setSongs] = useState(null);
  const [currentSong, setCurrentSong] = useState();
  const [playButton, setPlayButton] = useState(true);
  let audioRef = useRef();

  useEffect(() => {
    getInfoSongs();
  }, []);

  const getInfoSongs = async () => {
    let url = "https://assets.breatheco.de/apis/sound/songs";
    let options_get = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(url, options_get);
      const data = await response.json();
      console.log(data);
      setSongs(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const play = (url, i) => {
    setCurrentSong(i);
    setPlayButton(false);
    audioRef.current.src = "https://assets.breatheco.de/apis/sound/" + url;
    audioRef.current.play();
  };

  const handleButtonPlay = () => {
    setPlayButton(false);
    audioRef.current.play();
  };

  const handleButtonPause = () => {
    setPlayButton(true);
    audioRef.current.pause();
    console.log(playButton);
  };

  const handleButtonBackward = () => {
    if (currentSong - 1 < 0) {
      audioRef.current.src =
        "https://assets.breatheco.de/apis/sound/" + songs[songs.length - 1].url;
      audioRef.current.play();
      setCurrentSong(songs.length - 1);
    } else {
      audioRef.current.src =
        "https://assets.breatheco.de/apis/sound/" + songs[currentSong - 1].url;
      audioRef.current.play();
      setCurrentSong(currentSong - 1);
    }
  };

  const handleButtonForward = () => {
    if (currentSong + 1 >= songs.length) {
      audioRef.current.src =
        "https://assets.breatheco.de/apis/sound/" + songs[0].url;
      audioRef.current.play();
      setCurrentSong(0);
    } else {
      audioRef.current.src =
        "https://assets.breatheco.de/apis/sound/" + songs[currentSong + 1].url;
      audioRef.current.play();
      setCurrentSong(currentSong + 1);
    }
  };

  return (
    <>
      <div className="contain">
        <div className="title sticky-top">
          <h1 className="text-center fw-bold"> Audioplayer</h1>
        </div>
        <audio ref={audioRef}>
          Your browser does not support the audio tag.
        </audio>
        {!!songs && songs.length > 0 ? (
          <ul className="list-group">
            {songs.map((song, index) => {
              return (
                <li
                  className="list-group-item Playlist fst-italic"
                  key={index}
                  onClick={() => play(song.url, index)}
                >
                  {" "}
                  {index + 1}.- {song.name}
                </li>
              );
            })}{" "}
          </ul>
        ) : (
            <div class="d-flex justify-content-center">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden  m-auto">Loading...</span>
          </div>
          </div>
        )}
        <div className="controls">
          <button>
            <FontAwesomeIcon
              icon={faBackwardFast}
              onClick={handleButtonBackward}
            />
          </button>
          {!playButton ? (
            <button>
              <FontAwesomeIcon icon={faPause} onClick={handleButtonPause} />
            </button>
          ) : (
            <button>
              <FontAwesomeIcon icon={faPlay} onClick={handleButtonPlay} />
            </button>
          )}
          <button>
            <FontAwesomeIcon
              icon={faForwardFast}
              onClick={handleButtonForward}
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default Playlist;
