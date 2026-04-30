
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./home.css";
import ProductCard from "../component/product";

const featuredProducts = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    price: 25.99,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=500",
    description: "Fever and pain relief medication"
  },
  {
    id: 2,
    name: "Vitamin C 1000mg",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1616671276441-2f2c277b8bf6?auto=format&fit=crop&q=80&w=500",
    description: "Immunity booster supplements"
  },
  {
    id: 3,
    name: "First Aid Kit",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&q=80&w=500",
    description: "Complete emergency care kit"
  },
  {
    id: 4,
    name: "Blood Pressure Monitor",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=500",
    description: "Digital BP monitor for home use"
  },
  {
    id: 5,
    name: "Diabetic Care Kit",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=500",
    description: "Complete diabetes management kit"
  },
  {
    id: 6,
    name: "Protein Supplement",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=500",
    description: "Whey protein for muscle growth"
  },
  {
    id: 7,
    name: "Protein Supplement",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=500",
    description: "Whey protein for muscle growth"
  },
  {
    id: 8,
    name: "Protein Supplement",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=500",
    description: "Whey protein for muscle growth"
  },
  {
    id: 9,
    name: "Protein Supplement",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=500",
    description: "Whey protein for muscle growth"
  }
];

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  const slides = [
    {
      id: 1,
      title: "Daily Routine for Good Health",
      description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr.",
      image: "/image/slider2.jpg",
    },
    {
      id: 2,
      title: "Sun Protection Cream SPF50",
      description: "Protect your skin with the best SPF50 sunscreen.",
      image: "/image/sun_cream.jpg",
    },
  ];



  return (
    <>
    <Slider {...settings} className="carousel-container">
      {slides.map((slide) => (
        <div key={slide.id} className="carousel-slide">
          <img src={slide.image} alt={slide.title} className="carousel-image" />
          <div className="carousel-text">
            <h1>{slide.title}</h1>
            <p>{slide.description}</p>
            <button className="buy-btn">BUY NOW</button>
          </div>
        </div>
      ))}
    </Slider>

    <div class="container">
    <div class="grid">
        <div class="info-card">
            <div class="icon-container">
                <svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            </div>
            <div>
                <h3 class="title">It's Safe To Buy On PharmaCare</h3>
                <p class="description">100% Satisfaction or Replacement / Refund</p>
            </div>
        </div>

        <div class="info-card">
            <div class="icon-container">
                <svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
            </div>
            <div>
                <h3 class="title">100% Secure Payment</h3>
                <p class="description">All major credit & debit cards accepted</p>
            </div>
        </div>
    </div>
</div>



<div className="featured-products-container">
      {/* Header Section */}
      <div className="featured-products-header">
        <h2>Featured Products</h2>
        <button className="view-all-button">VIEW ALL</button>
      </div>

      {/* Products Grid */}
      <div className="featured-products-grid">
        {featuredProducts.slice(0,6).map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>


    
    </>

  
  );
};

export default Home;
