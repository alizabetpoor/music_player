import "./PlayList.css";
const PlayList = ({ musics, playSelectedSong, currentMusic }) => {
  const clickHandlerPlayList = (id) => {
    playSelectedSong(id);
  };
  return (
    <div className="playlist w-4/12 overflow-y-scroll rounded-r-xl text-white">
      {musics.map((item) => {
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
    </div>
  );
};

export default PlayList;
