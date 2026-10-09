import { NavLink } from "react-router-dom";
import { TrendProducts, WishListProducts } from "../store/ContextApi";
import { useContext, useEffect } from "react";
export default function Trend() {
  const { trendProducts, setTrendProducts } = useContext(TrendProducts);
  const { wishListProducts, setWishListProducts } = useContext(WishListProducts);
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
    trendProducts && trendProducts.length > 0 && trendProducts.slice(0, 6).map((element) => {
      return (
        <NavLink
          style={{
            height: "430px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          key={element.product.id}
          to={`/product/${element.product.id}`}
        >
          <div>
            <img
              className="h-[300px]"
              src={"http://test.mybrands.az"+element.image.items[0].file}
              alt="item"
            />

            <div
            onClick={(e) => {
              e.preventDefault();
              ClickToAddOrRemoveWishList(element.product.id,`http://test.mybrands.az${element.image.items[0].file}`, element.product.title_az, element.product.title_az.split(",")[1], element.price);
            }}
            style={{backgroundColor:isProductInWishlist(element.product.id)?"#DE163E":"#F6F6F6"}}
            className="bg-[#F6F7F9] hover:shadow-lg translate-y-[-50px] translate-x-[10px] w-[40px] rounded-[100%] box-border p-[10px]">
              {/* <img
                src={isProductInWishlist(element.product.id)?"https://mybrands.az/img/empty_heart_white_icon.svg":"https://mybrands.az/img/heart_empty_icon.svg"}
                alt="wishlistIcon"
              /> */}
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 30 30" fill="none" class="w-6 h-6 shrink-0 text-red-600"><path d="M20.8594 3.75C18.4395 3.75 16.3207 4.79062 15 6.54961C13.6793 4.79062 11.5605 3.75 9.14062 3.75C7.21433 3.75217 5.36755 4.51835 4.00545 5.88045C2.64335 7.24255 1.87717 9.08933 1.875 11.0156C1.875 19.2187 14.0379 25.8586 14.5559 26.1328C14.6924 26.2063 14.845 26.2447 15 26.2447C15.155 26.2447 15.3076 26.2063 15.4441 26.1328C15.9621 25.8586 28.125 19.2187 28.125 11.0156C28.1228 9.08933 27.3566 7.24255 25.9946 5.88045C24.6325 4.51835 22.7857 3.75217 20.8594 3.75ZM15 24.2344C12.8602 22.9875 3.75 17.3074 3.75 11.0156C3.75186 9.58651 4.3204 8.21647 5.33093 7.20593C6.34147 6.1954 7.71151 5.62686 9.14062 5.625C11.4199 5.625 13.3336 6.83906 14.1328 8.78906C14.2034 8.96101 14.3236 9.10808 14.478 9.21158C14.6324 9.31508 14.8141 9.37034 15 9.37034C15.1859 9.37034 15.3676 9.31508 15.522 9.21158C15.6764 9.10808 15.7966 8.96101 15.8672 8.78906C16.6664 6.83555 18.5801 5.625 20.8594 5.625C22.2885 5.62686 23.6585 6.1954 24.6691 7.20593C25.6796 8.21647 26.2481 9.58651 26.25 11.0156C26.25 17.298 17.1375 22.9863 15 24.2344Z" fill="currentColor"></path></svg>
            </div>
          </div>
          <p className="text-sm mt-[-25px] mb-[30px] translate-y-[-18px]">
            {element.product.title_az}
          </p>
          <p className="font-bold text-[18px] translate-y-[-35px]">
            &#8380; {element.price}
          </p>
        </NavLink>
      );
    })
  );  
}
