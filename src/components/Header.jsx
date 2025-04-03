import { NavLink } from "react-router-dom";
import { WishListProducts, CartProducts } from "../store/ContextApi";
import React, { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Cart from "./Cart";
import MyMusic from "./MyMusic";
import musicc from "../assets/music 4.m4a";

export default function Header() {
  const { wishListProducts } = useContext(WishListProducts);
  const { cartProducts } = useContext(CartProducts);
  const [showOrDontShowCart, setShowOrDontShowCart] = useState(false);
  const isLogged = useSelector((state) => state.auth.isLogged);

  const [showOrDontShowShopMelody, setShowOrDontShowShopMelody] = useState(false);
  const [startStopAI, setStartStopAI] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [musics, setMusics] = useState([]);
  const [currentMusic, setCurrentMusic] = useState(null); 
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.createRef();

  useEffect(() => {
    if (isHidden) {
    }
  }, [isHidden]);

  const playMusic = (music) => {
    if (currentMusic === music.id) {
      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    } else {
      audioRef.current.src = music.url;
      audioRef.current.play();
      setCurrentMusic(music.id);
      setIsPlaying(true);
    }

    audioRef.current.onended = () => {
      setCurrentMusic(null);
      setIsPlaying(false);
    };
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (startStopAI) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
    setStartStopAI((prev) => !prev);
  };

  return (
    <>
      <div className="flex justify-between items-center h-9 text-xs px-14 bg-[#f4f4f4]">
        <div className="flex gap-5 pl-12">
          <div className="no-underline hover:underline hover:cursor-pointer">Haqqımızda</div>
          <div className="no-underline hover:underline hover:cursor-pointer">Müştəri xidmətləri</div>
          <div className="no-underline hover:underline hover:cursor-pointer">Bloq</div>
        </div>
        <div className="mr-12 hover:cursor-pointer">
          AZ
          <span className="ml-[2px] transform translate-y-[-0.5px] inline-block">
            <img src="https://mybrands.az/img/lang_pt.svg" alt="arrow" />
          </span>
        </div>
      </div>
      <div className="flex justify-between px-[100px] h-[100px] items-center">
        <NavLink to="/" className="no-underline hover:underline border-none">
          <img src="https://mybrands.az/img/logo.svg" alt="logoOWebsite" />
        </NavLink>
        <div className="flex gap-7">
          <div className="flex gap-7">
            <img className="w-5 hover:cursor-pointer" src="https://mybrands.az/img/search_black_icon.svg" alt="search" />
            <NavLink to="/wishlist-page" className="flex hover:cursor-pointer">
              <img className="w-5" src="https://mybrands.az/img/heart_empty_icon.svg" alt="wishlist" />
              <span
                style={{
                  backgroundColor: wishListProducts.length > 0 ? "#DE163E" : "",
                  color: wishListProducts.length > 0 ? "white" : "",
                  width: wishListProducts.length > 0 ? "15px" : "",
                  height: wishListProducts.length > 0 ? "15px" : "",
                  transform: wishListProducts.length > 0 ? "translate(-5px, 8px)" : "",
                  display: wishListProducts.length > 0 ? "flex" : "",
                  justifyContent: wishListProducts.length > 0 ? "center" : "",
                  alignItems: wishListProducts.length > 0 ? "center" : "",
                  fontSize: wishListProducts.length > 0 ? "10px" : "",
                  borderRadius: wishListProducts.length > 0 ? "100%" : ""
                }}
              >
                {wishListProducts.length > 0 ? wishListProducts.length : ""}
              </span>
            </NavLink>
            <div onClick={() => { setShowOrDontShowCart(prev => !prev); if (!isLogged) { alert("Hesabınıza daxil olmamısınız"); } }} className="hover:cursor-pointer flex">
              <img className="w-5" src="https://mybrands.az/img/basket_black_icon.svg" alt="bag" />
              <span
                style={{
                  backgroundColor: cartProducts?.cart_items?.length > 0 ? "#212D4A" : "",
                  color: cartProducts?.cart_items?.length > 0 ? "white" : "",
                  width: cartProducts?.cart_items?.length > 0 ? "15px" : "",
                  height: cartProducts?.cart_items?.length > 0 ? "15px" : "",
                  transform: cartProducts?.cart_items?.length > 0 ? "translate(-5px,8px)" : "",
                  display: cartProducts?.cart_items?.length > 0 ? "flex" : "",
                  justifyContent: cartProducts?.cart_items?.length > 0 ? "center" : "",
                  alignItems: cartProducts?.cart_items?.length > 0 ? "center" : "",
                  fontSize: cartProducts?.cart_items?.length > 0 ? "10px" : "",
                  borderRadius: cartProducts?.cart_items?.length > 0 ? "100%" : "",
                }}
              >
                {cartProducts?.cart_items?.length > 0 ? cartProducts?.cart_items?.length : ""}
              </span>
            </div>
            {showOrDontShowCart && isLogged && <Cart />}
          </div>
          <NavLink to="/login-page">
            <div className="flex gap-3 border-l-2 pl-8 translate-y-[12px]">
              <img className="w-5" src="https://mybrands.az/img/user_black_icon.svg" alt="user" />
              <span>{isLogged ? "Siz" : "Sizin hesabınız"}</span>
              <img className="w-3" src="https://mybrands.az/img/lang_pt.svg" alt="arrow" />
            </div>
          </NavLink>
          <div className="border-2 border-[#DE163E] rounded-lg p-[10px] flex gap-2 items-center bg-[#ffd4dc]">
            <div onClick={() => { setShowOrDontShowShopMelody(prev => !prev); setIsHidden(true); }} className="flex gap-2 items-center hover:text-gray-500 hover:cursor-pointer transition-all duration-500">
              <span>ShopMelody</span>
              <i className="fa-solid fa-music"></i>
            </div>
            {showOrDontShowShopMelody && (
              <div className="flex border-2 border-[#DE163E] px-[20px]">
                <span onClick={() => setIsHidden(prev => !prev)} className="border-r-2 pr-[20px] text-gray-700 hover:cursor-pointer border-[#DE163E]">My Music</span>
                <span onClick={toggleAudio} className="border-l-2 pl-[20px] text-gray-700 hover:cursor-pointer border-[#DE163E]">
                  AI suggestion {startStopAI ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>}
                </span>
                <audio ref={audioRef} src={musicc} />
              </div>
            )}
          </div>
        </div>
      </div>
      {!isHidden && (
        <MyMusic
          musics={musics}
          setMusics={setMusics}
          playMusic={playMusic}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentMusic={currentMusic}
          setCurrentMusic={setCurrentMusic}
        />
      )}
    </>
  );
}
