import { MessageDisplay } from '@/components/common';
import { ProductShowcaseGrid } from '@/components/product';
import { useDocumentTitle, useFeaturedProducts, useScrollTop } from '@/hooks';
import bannerImg from '@/images/banner-guy.jpeg';
import bannerImg2 from '@/images/discount2.jpg';
import bannerImg3 from '@/images/discount3.jpg';
import React from 'react';

const images = [bannerImg, bannerImg2, bannerImg3];

const FeaturedProducts = () => {
  useDocumentTitle("Featured Products | Sethji's");
  useScrollTop();

  const {
    featuredProducts,
    fetchFeaturedProducts,
    isLoading,
    error
  } = useFeaturedProducts();

  return (
    <main className="content">
      <div className="featured">
        <div className="banner">
          <div className="banner-desc">
            <h1>Featured Products</h1>
            <p>Discover handpicked selections that elevate your shopping experience. 
              Our featured products showcase quality and innovation, ensuring you find the best for every need. </p>
          </div>
          <div className="banner-img">
            <img src={bannerImg} alt="" />
          </div>
        </div>
        <div className="display">
          <div className="product-display-grid">
            {(error && !isLoading) ? (
              <MessageDisplay
                message={error}
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
        </div>
      </div>
    </main>
  );
};

export default FeaturedProducts;
