import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ReviewManager, Review } from "./ReviewManager";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface TestimonialsCarouselProps {
  currentLanguage: string;
  onLeaveReview: () => void;
}

export default function TestimonialsCarousel({
  currentLanguage,
  onLeaveReview,
}: TestimonialsCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Language translations
  const translations = {
    en: {
      customersSay: "What Our Families Say",
      leaveReview: "Leave a Review",
      parent: "Parent",
      mom: "Mom",
      dad: "Dad",
      father: "Father",
      mother: "Mother",
    },
    el: {
      customersSay: "Τι Λένε οι Οικογένειές μας",
      leaveReview: "Αφήστε μια Κριτική",
      parent: "Γονέας",
      mom: "Μαμά",
      dad: "Μπαμπάς",
      father: "Πατέρας",
      mother: "Μητέρα",
    },
    uk: {
      customersSay: "Що Кажуть Наші Сім'ї",
      leaveReview: "Залишити Відгук",
      parent: "Батько/Мати",
      mom: "Мама",
      dad: "Тато",
      father: "Батько",
      mother: "Мати",
    },
  };

  const t =
    translations[
      currentLanguage as keyof typeof translations
    ] || translations.en;

  // Sample testimonials with mix of names and roles
  const defaultTestimonials = [
    {
      text: "The kids had such an amazing time at the Princesses & Kingdoms party. The entertainers were fantastic, and everything was so well organized!",
      name: "Olena",
      role: t.parent,
      rating: 5,
      language: currentLanguage,
    },
    {
      text: "The Chemist Show was a huge success. Our son and his friends couldn't stop talking about it for days!",
      name: "Maria",
      role: t.mom,
      rating: 5,
      language: currentLanguage,
    },
    {
      text: "We booked the Minecraft program, and it was perfect for our teenagers. Great energy and super professional team.",
      name: "Andreas",
      role: t.father,
      rating: 5,
      language: currentLanguage,
    },
    {
      text: "SPA Day was unforgettable. The girls really felt like little stars with all the activities and the fashion show.",
      name: "Sofia",
      role: t.parent,
      rating: 5,
      language: currentLanguage,
    },
    {
      text: "Perfect organization from start to finish. The TikTok party was exactly what our daughter wanted!",
      name: "Dimitris",
      role: undefined, // No role for natural mix
      rating: 5,
      language: currentLanguage,
    },
    {
      text: "Amazing entertainers who really know how to engage children. Worth every penny!",
      name: "Elena",
      role: undefined, // No role for natural mix
      rating: 5,
      language: currentLanguage,
    },
  ];

  // Load reviews on component mount and language change
  useEffect(() => {
    ReviewManager.initializeDefaultReviews();
    const storedReviews = ReviewManager.getApprovedReviews();

    // Filter reviews by current language first, then add variety
    const languageReviews = storedReviews.filter(
      (review) => review.language === currentLanguage,
    );
    const otherReviews = storedReviews.filter(
      (review) => review.language !== currentLanguage,
    );

    // Mix language-specific reviews with others for variety
    let mixedReviews = [];
    if (languageReviews.length >= 4) {
      // Use language-specific reviews if we have enough
      mixedReviews = languageReviews.slice(0, 6);
    } else {
      // Mix language-specific with others to fill up to 6 reviews
      mixedReviews = [
        ...languageReviews,
        ...otherReviews,
      ].slice(0, 6);
    }

    // If still not enough reviews, add default testimonials
    if (mixedReviews.length < 6) {
      const needed = 6 - mixedReviews.length;
      mixedReviews = [
        ...mixedReviews,
        ...defaultTestimonials.slice(0, needed),
      ];
    }

    setReviews(mixedReviews);
    setCurrentSlide(0); // Reset to first slide when language changes
  }, [currentLanguage]);

  const nextSlide = () => {
    if (isAnimating || reviews.length === 0) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % reviews.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const prevSlide = () => {
    if (isAnimating || reviews.length === 0) return;
    setIsAnimating(true);
    setCurrentSlide(
      (prev) => (prev - 1 + reviews.length) % reviews.length,
    );
    setTimeout(() => setIsAnimating(false), 300);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Get slides to show (responsive: 1 on mobile, 2 on tablet, 3 on desktop)
  const getSlidesToShow = () => {
    if (typeof window === "undefined") return 1;
    if (window.innerWidth >= 1024) return 3; // lg breakpoint
    if (window.innerWidth >= 768) return 2; // md breakpoint
    return 1; // mobile
  };

  const [slidesToShow, setSlidesToShow] = useState(1);

  useEffect(() => {
    const handleResize = () =>
      setSlidesToShow(getSlidesToShow());
    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        prevSlide();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, isAnimating]);

  const getVisibleReviews = () => {
    const visible = [];
    for (let i = 0; i < slidesToShow; i++) {
      const index = (currentSlide + i) % reviews.length;
      visible.push({ ...reviews[index], slideIndex: i });
    }
    return visible;
  };

  if (reviews.length === 0) return null;

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-black text-center mb-16 text-gray-800"
          style={{ fontFamily: "Bowlby One SC, sans-serif" }}
        >
          {t.customersSay}
        </motion.h2>

        {/* Carousel Container */}
        <div
          className="relative"
          role="region"
          aria-label="Customer testimonials carousel"
        >
          {/* Navigation Arrows - Only show if there are more reviews than can be displayed */}
          {reviews.length > slidesToShow && (
            <>
              <button
                onClick={prevSlide}
                disabled={isAnimating}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-14 h-14 bg-white border-3 border-[#B26CC5] rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl hover:bg-[#B26CC5] hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed group focus:outline-none focus:ring-4 focus:ring-[#B26CC5]/30"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-7 h-7 group-hover:scale-110 transition-transform" />
              </button>

              <button
                onClick={nextSlide}
                disabled={isAnimating}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-14 h-14 bg-white border-3 border-[#B26CC5] rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl hover:bg-[#B26CC5] hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed group focus:outline-none focus:ring-4 focus:ring-[#B26CC5]/30"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-7 h-7 group-hover:scale-110 transition-transform" />
              </button>
            </>
          )}

          {/* Testimonials Grid */}
          <div className="mx-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className={`grid gap-8 ${
                  slidesToShow === 1
                    ? "grid-cols-1"
                    : slidesToShow === 2
                      ? "grid-cols-1 md:grid-cols-2"
                      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {getVisibleReviews().map((review, index) => (
                  <motion.div
                    key={`${currentSlide}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="h-full"
                  >
                    <Card className="h-full flex flex-col bg-white border-2 border-gray-200 hover:border-[#FFE366] rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group relative overflow-hidden">
                      {/* Decorative Quote */}
                      <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Quote className="w-12 h-12 text-[#B26CC5]" />
                      </div>

                      {/* Gradient Background on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#FFE366]/5 to-[#B26CC5]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <CardContent className="p-0 flex flex-col h-full relative z-10">
                        {/* Review Image - if available */}
                        {review.image && (
                          <div className="mb-4 flex justify-center">
                            <div className="w-full max-w-xs rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-[#FFE366]/30 group-hover:border-[#FFE366]">
                              <ImageWithFallback
                                src={review.image}
                                alt={`Feedback from ${review.name}`}
                                className="w-full h-auto object-cover"
                              />
                            </div>
                          </div>
                        )}

                        {/* Rating Stars */}
                        <div className="flex justify-center mb-4">
                          {[...Array(review.rating || 5)].map(
                            (_, i) => (
                              <Star
                                key={i}
                                className="w-5 h-5 fill-[#FFE366] text-[#FFE366] group-hover:scale-110 transition-transform duration-200"
                                style={{
                                  animationDelay: `${i * 50}ms`,
                                }}
                              />
                            ),
                          )}
                        </div>

                        {/* Testimonial Text */}
                        <div className="flex-grow flex items-center justify-center mb-6">
                          <p className="text-gray-700 text-center leading-relaxed font-medium text-lg italic group-hover:text-gray-800 transition-colors duration-200">
                            "{review.text}"
                          </p>
                        </div>

                        {/* Author Info */}
                        <div className="text-center pt-4 border-t border-gray-100 group-hover:border-[#FFE366]/30">
                          <div className="space-y-2">
                            <h4 className="font-black text-xl text-gray-800 group-hover:text-[#B26CC5] transition-colors duration-200">
                              {review.name}
                            </h4>
                            {review.role && (
                              <p className="text-[#B26CC5] font-semibold text-sm">
                                {review.role}
                              </p>
                            )}
                            {review.eventType && (
                              <p className="text-gray-500 text-xs font-medium bg-gray-50 rounded-full px-3 py-1 inline-block">
                                {review.eventType}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot Navigation - Only show if more reviews than visible */}
          {reviews.length > slidesToShow && (
            <div className="flex justify-center mt-12 space-x-3">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#B26CC5]/50 ${
                    index === currentSlide
                      ? "bg-[#B26CC5] scale-125 shadow-lg"
                      : "bg-gray-300 hover:bg-[#FFE366] hover:scale-110"
                  }`}
                  aria-label={`Go to testimonial ${index + 1} of ${reviews.length}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Leave Review Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 px-6"
        >
          <Button
            onClick={onLeaveReview}
            className="w-full sm:w-auto min-h-[50px] h-[50px] bg-gradient-to-r from-[#B26CC5] to-[#9C5CB0] hover:from-[#9C5CB0] hover:to-[#B26CC5] text-white font-bold text-base sm:text-lg px-6 sm:px-8 py-3 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 max-w-md mx-auto"
          >
            <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
            <span className="truncate">{t.leaveReview}</span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}