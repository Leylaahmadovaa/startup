import { useState, useRef } from "react";

export default function MyMusic({
  musics,
  setMusics,
  playMusic,
  isPlaying,
  setIsPlaying,
  currentMusic,
  setCurrentMusic,
}) {
  const [error, setError] = useState("");
  const audioRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileExists = musics.some(
        (music) => music.title === file.name && music.size === file.size
      );

      if (fileExists) {
        setError("This audio file is already added!");
        setTimeout(() => setError(""), 3000);
        return;
      }

      const url = URL.createObjectURL(file);
      setMusics((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          title: file.name,
          size: file.size,
          url: url,
        },
      ]);
    }
  };

  const deleteMusic = (music) => {
    if (music.id === currentMusic?.id) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false);
      setCurrentMusic(null);
    }

    setMusics((prev) => prev.filter((element) => element.id !== music.id));
  };

  const handlePlayPauseMusic = (music) => {
    if (currentMusic?.id === music.id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const newAudio = new Audio(music.url);
      audioRef.current = newAudio;
      newAudio.play();
      setIsPlaying(true);
      setCurrentMusic(music);
    }
  };

  return (
    <div className="absolute z-50 right-[100px] bg-white border-2 w-[410px] h-[300px] flex flex-col justify-between items-center">
      {error && (
        <div className="bg-red-500 text-white w-[90%] text-center py-1 rounded">
          {error}
        </div>
      )}
      <div className="border-2 w-[90%] h-[80%] mt-[10px] overflow-y-scroll">
        {musics.map((music) => (
          <div
            key={music.id}
            onClick={() => handlePlayPauseMusic(music)}
            className="border-2 w-[100%] flex justify-between items-center px-[10px] cursor-pointer"
          >
            {music.title}
            <div className="flex gap-4">
              <div>
                {music.id === currentMusic?.id && isPlaying ? (
                  <i className="fa-solid fa-pause"></i>
                ) : (
                  <i className="fa-solid fa-play"></i>
                )}
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  deleteMusic(music);
                }}
              >
                <i className="fa-solid fa-trash"></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="bg-gray-400 w-[200px] mb-[10px] rounded-full py-[5px] text-white hover:cursor-pointer">
        <input
          id="file"
          type="file"
          className="hidden"
          accept="audio/*"
          onChange={handleFileUpload}
        />
        <label htmlFor="file" className="hover:cursor-pointer">
          UPLOAD MUSIC
        </label>
      </button>
    </div>
  );
}
