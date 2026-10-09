import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AllProducts, PageNumber, WishListProducts, LoadingProducts, Productss } from "../store/ContextApi";
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
import './productsImageHover.css'

export default function Products() {
  const { products, setProducts } = useContext(AllProducts);
  const { wishListProducts, setWishListProducts } = useContext(WishListProducts);
  const { pageNumber, setPageNumber } = useContext(PageNumber);
  const { loading, setLoading } = useContext(LoadingProducts);
  const { productss, setProductss } = useContext(Productss); //to determine finish page

  const ClickToAddOrRemoveWishList = (productId, productImage, productTitle, productSubTitle, productPrice) => {
    setWishListProducts((prevWishList) => {
      const exists = prevWishList.some((item) => item.id === productId);
      if (exists) {
        return prevWishList.filter((item) => item.id !== productId);
      } 
      else {
        return [
          ...prevWishList,
          {
            id: productId,
            image: productImage,
            title: productTitle,
            subTitle: productSubTitle,
            price: productPrice,
          },
        ];
      }
    });
  };
  
  const isProductInWishlist = (productId) => {
    return wishListProducts.some((item) => item.id === productId);
  };
  
  useEffect(() => {
    localStorage.setItem("wishListProductsList", JSON.stringify(wishListProducts));
  }, [wishListProducts]);

  return (
    <div className="w-[57%]">
      <div className="text-gray-500 font-semibold text-[14px] underline underline-offset-2 cursor-default w-[100px] text-center mb-[5px]">Səhifə {pageNumber}</div>
      <div className="grid grid-cols-3 gap-5 place-content-center">
        {loading&&<div className="flex flex-col gap-[20px] items-center w-[800px] h-[370px] pt-[38px]">  
        <Flex align="center" gap="middle">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </Flex>
        </div>}
        {!loading&&products &&
          products.length > 0 &&
          products.map((element) => {
            return (
              <div className="div" key={element.id}>
              <NavLink to={`/product/${element.product.id}`}>
                <div className=" relative h-[409px] flex flex-col justify-end overflow-hidden">
                  <img
                    className="img h-[409px] w-[279px] absolute z-[-1] transition-all duration-700"
                    src={element.image.items[0].file}
                    alt="item"
                  />
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      ClickToAddOrRemoveWishList(element.product.id,element.image.items[0].file, element.product.title_az, element.product.title_az.split(",")[1], element.price);
                    }}
                    style={{backgroundColor:isProductInWishlist(element.product.id)?"#DE163E":"#F6F6F6"}}
                    className="bg-[#F6F6F6] hover:shadow-lg translate-y-[-14px] translate-x-[25px] w-[40px] rounded-[100%] box-border p-[10px]"
                  >
                    {/* <img
                      src={isProductInWishlist(element.product.id)?"https://mybrands.az/img/empty_heart_white_icon.svg":"https://mybrands.az/img/heart_empty_icon.svg"}
                      alt="wishlist"
                    /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 30 30" fill="none" class="w-6 h-6 shrink-0 text-red-600"><path d="M20.8594 3.75C18.4395 3.75 16.3207 4.79062 15 6.54961C13.6793 4.79062 11.5605 3.75 9.14062 3.75C7.21433 3.75217 5.36755 4.51835 4.00545 5.88045C2.64335 7.24255 1.87717 9.08933 1.875 11.0156C1.875 19.2187 14.0379 25.8586 14.5559 26.1328C14.6924 26.2063 14.845 26.2447 15 26.2447C15.155 26.2447 15.3076 26.2063 15.4441 26.1328C15.9621 25.8586 28.125 19.2187 28.125 11.0156C28.1228 9.08933 27.3566 7.24255 25.9946 5.88045C24.6325 4.51835 22.7857 3.75217 20.8594 3.75ZM15 24.2344C12.8602 22.9875 3.75 17.3074 3.75 11.0156C3.75186 9.58651 4.3204 8.21647 5.33093 7.20593C6.34147 6.1954 7.71151 5.62686 9.14062 5.625C11.4199 5.625 13.3336 6.83906 14.1328 8.78906C14.2034 8.96101 14.3236 9.10808 14.478 9.21158C14.6324 9.31508 14.8141 9.37034 15 9.37034C15.1859 9.37034 15.3676 9.31508 15.522 9.21158C15.6764 9.10808 15.7966 8.96101 15.8672 8.78906C16.6664 6.83555 18.5801 5.625 20.8594 5.625C22.2885 5.62686 23.6585 6.1954 24.6691 7.20593C25.6796 8.21647 26.2481 9.58651 26.25 11.0156C26.25 17.298 17.1375 22.9863 15 24.2344Z" fill="currentColor"></path></svg>
                  </div>
                </div>
                <p className="text-sm mt-[14px] mb-[30px]">
                  {element.product.title_az}
                </p>
                <p className="font-bold text-[20px]">&#8380; {element.price}</p>
              </NavLink>
              </div>
            );
          })}
      </div>

      <div className="flex justify-center gap-[55px] mb-[20px] mt-[55px]">
        <div
        onClick={()=>{
          if(pageNumber>0){
            setPageNumber(prev=>prev-1)
          }
        }}
        className="border-[#212D4A] border-2 text-[#212D4A] w-[350px] h-[50px] flex justify-center items-center font-semibold text-lg hover:cursor-pointer hover:border-[3px]">
          ÖNCƏKİ SƏHİFƏ
        </div>
        <div
        onClick={()=>{
          // if(products&&products.length>=1){
            // }
            if(productss!=undefined){
              setPageNumber(prev=>prev+1)
          }
        }}
        className="border-[#212D4A] border-2 text-[#212D4A] w-[350px] h-[50px] flex justify-center items-center font-semibold text-lg hover:cursor-pointer hover:border-[3px]">
          NÖVBƏTİ SƏHİFƏ
        </div>
      </div>
    </div>
  );
}
