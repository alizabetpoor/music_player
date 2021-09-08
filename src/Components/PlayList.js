import { useEffect, useState } from "react";
import "./PlayList.css";
const PlayList = ({ musics, playSelectedSong, currentMusic }) => {
  const [filtered, setFiltered] = useState(musics);
  const [searchText, setSearchText] = useState("");
  const clickHandlerPlayList = (id) => {
    playSelectedSong(id);
  };
  useEffect(() => {
    if (searchText === "") {
      setFiltered(musics);
    } else {
      const newList = musics.filter((item) =>
        item.name.toLowerCase().includes(searchText)
      );
      setFiltered(newList);
    }
  }, [searchText, musics]);
  return (
    <div className="playlist w-4/12 overflow-y-scroll rounded-r-xl text-white">
      <div className="w-full">
        <input
          className="search-box w-full font-semibold text-black placeholder-gray-400 text-base p-2 outline-none border-0"
          type="text"
          placeholder="search the song name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value.toLowerCase())}
        />
      </div>
      {filtered.map((item) => {
        return (
          <div
            key={item.id}
            onClick={() => clickHandlerPlayList(item.id)}
            className={`music flex ${
              musics[currentMusic].id === item.id ? "active" : "bg-gray-500"
            } items-center p-2 border-b border-gray-300 cursor-pointer`}
          >
            <div>
              <img
                className="h-16 w-16 rounded-full"
                src={item.image}
                alt={item.name}
              />
            </div>
            <div className="pl-2">
              <h4>{item.name}</h4>
            </div>
          </div>
        );
      })}
      {!filtered && <p>آهنگی با این اسم وجود ندارد</p>}
    </div>
  );
};

export default PlayList;
