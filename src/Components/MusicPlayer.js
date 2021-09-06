import "./MusicPlayer.css";
import { BiPlay, BiPause, BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import Musics from "../Music/Musics";
import "animate.css";
import { useEffect, useRef, useState } from "react";
import PlayList from "./PlayList";
import Controller from "./Controller";
const MusicPlayer = () => {
  const [played, setPlayed] = useState(false);
  const [musics, setMusics] = useState(Musics);
  const [currentMusic, setCurrentMusic] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioplayer = useRef();
  const changePlayedHandler = () => {
    played ? audioplayer.current.pause() : audioplayer.current.play();
    setPlayed((prev) => !prev);
  };
  const loadAndPlay = () => {
    audioplayer.current.load();
    setCurrentTime(0);
    setDuration(0);
    if (played) {
      audioplayer.current.play();
    }
  };
  const playSelectedSong = (id) => {
    const index = musics.findIndex((item) => item.id === id);
    audioplayer.current.pause();
    setCurrentMusic(index);
    loadAndPlay();
  };
  const nextMusicHandler = () => {
    audioplayer.current.pause();
    setCurrentMusic((prev) => {
      if (prev + 1 >= musics.length) {
        return 0;
      }
      return prev + 1;
    });
    loadAndPlay();
  };

  const prevMusicHandler = () => {
    audioplayer.current.pause();
    // console.log(audioplayer.current.duration);
    // audioplayer.current.currentTime = audioplayer.current.duration - 0.5;
    // audioplayer.current = "";
    setCurrentMusic((prev) => {
      if (prev - 1 < 0) {
        return musics.length - 1;
      }
      return prev - 1;
    });
    loadAndPlay();
  };
  const musicEndHandler = () => {
    setCurrentMusic((prev) => {
      if (prev + 1 >= musics.length) {
        return 0;
      }
      return prev + 1;
    });
    loadAndPlay();
  };
  useEffect(() => {
    const changeCurrentTime = (event) => {
      if (event.target.duration && event.target.currentTime) {
        setCurrentTime(event.target.currentTime);
        setDuration(audioplayer.current.duration);
      }
    };
    audioplayer.current.addEventListener("timeupdate", (e) =>
      changeCurrentTime(e)
    );

    return audioplayer.current.removeEventListener(
      "timeupdate",
      changeCurrentTime
    );
  }, [audioplayer]);
  return (
    <div className="musicplayer-container flex rounded-xl">
      <div className="player flex flex-col relative w-8/12">
        <div className="music-cover h-full z-0">
          <img
            className="rounded-l-xl w-full h-full"
            src={musics[currentMusic].image}
            alt={musics[currentMusic].name}
          />
        </div>
        <div className="music-controller pt-2 h-1/4 transition flex flex-col opacity-70 hover:opacity-100 rounded-bl-xl absolute bottom-0 left-0 w-full z-10">
          <audio
            className="sr-only"
            ref={audioplayer}
            onEnded={musicEndHandler}
          >
            <source
              src={musics[currentMusic].url}
              type={musics[currentMusic].type}
            />
          </audio>
          <div className="music-detail flex justify-center font-bold text-base">
            <p>name music: {musics[currentMusic].name}</p>
          </div>
          <Controller
            audioplayer={audioplayer}
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
            duration={duration}
            setDuration={setDuration}
          />
          <ul className="flex w-full items-center">
            <li>
              <button
                onClick={prevMusicHandler}
                className="w-12 h-12 hover:bg-opacity-30 transition rounded-full hover:bg-gray-300"
              >
                <BiSkipPrevious className="h-full w-full" />
              </button>
            </li>
            <li>
              <button
                onClick={changePlayedHandler}
                className="w-12 h-12 transition hover:bg-opacity-30 rounded-full hover:bg-gray-300"
              >
                {played ? (
                  <BiPause className="w-full h-full  animate__animated animate__fadeIn" />
                ) : (
                  <BiPlay className="w-full h-full ml-1 animate__animated animate__fadeIn" />
                )}
              </button>
            </li>
            <li>
              <button
                onClick={nextMusicHandler}
                className="w-12 h-12 transition hover:bg-opacity-30 rounded-full hover:bg-gray-300"
              >
                <BiSkipNext className="w-full h-12 full" />
              </button>
            </li>
          </ul>
        </div>
      </div>
      <PlayList
        playSelectedSong={playSelectedSong}
        musics={musics}
        currentMusic={currentMusic}
      />
    </div>
  );
};

export default MusicPlayer;
