import { ArrowRightOutlined } from "@ant-design/icons";
import { MessageDisplay } from "@/components/common";
import { ProductShowcaseGrid } from "@/components/product";
import {
  FEATURED_PRODUCTS,
  RECOMMENDED_PRODUCTS,
  SHOP,
} from "@/constants/routes";
import {
  useDocumentTitle,
  useFeaturedProducts,
  useRecommendedProducts,
  useScrollTop,
} from "@/hooks";
import bannerImg from "@/images/banner-girl.jpg";
import React from "react";
import bannerImg2 from "@/images/discount2.jpg";
import bannerImg3 from "@/images/discount3.jpg";
import bannerImg4 from "@/images/discount4.jpeg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
const images = [bannerImg, bannerImg2, bannerImg3,bannerImg4];

const Home = () => {
  useDocumentTitle("Sethji's Online Grocery Store  | Home");
  useScrollTop();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const maxIndex = isMobile ? images.length - 1 : Math.ceil(images.length / 3) - 1;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (maxIndex + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [isMobile]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const {
    featuredProducts,
    fetchFeaturedProducts,
    isLoading: isLoadingFeatured,
    error: errorFeatured,
  } = useFeaturedProducts(6);
  const {
    recommendedProducts,
    fetchRecommendedProducts,
    isLoading: isLoadingRecommended,
    error: errorRecommended,
  } = useRecommendedProducts(6);

  return (
    <main className="content">
      <div className="home">
        <div className="banner">
        <div className="carousel">
            <div className="carousel-track" style={{ transform: `translateX(-${currentIndex * (isMobile ? 100 : 33.33)}%)` }}>
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`carousel-slide`}
                >
                  <img src={image} alt={`Banner ${index + 1}`} />
                </div>
              ))}
            </div>
            <div className="carousel-dots">
              {Array.from({ length: Math.ceil(images.length / (isMobile ? 1 : 3)) }).map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentIndex ? "active" : ""}`}
                  onClick={() => goToSlide(index)}
                ></span>
              ))}
            </div>
          </div>
        </div>
        <div className="display">
          <div className="display-header">
            <h1>Featured Products</h1>
            <Link to={FEATURED_PRODUCTS}>See All</Link>
          </div>
          {errorFeatured && !isLoadingFeatured ? (
            <MessageDisplay
              message={errorFeatured}
              action={fetchFeaturedProducts}
              buttonLabel="Try Again"
            />
          ) : (
            <ProductShowcaseGrid
              products={featuredProducts}
              skeletonCount={6}
            />
          )}
        </div>
        <div className="display">
          <div className="display-header">
            <h1>Recommended Products</h1>
            <Link to={RECOMMENDED_PRODUCTS}>See All</Link>
          </div>
          {errorRecommended && !isLoadingRecommended ? (
            <MessageDisplay
              message={errorRecommended}
              action={fetchRecommendedProducts}
              buttonLabel="Try Again"
            />
          ) : (
            <ProductShowcaseGrid
              products={recommendedProducts}
              skeletonCount={6}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
