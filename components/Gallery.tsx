import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
} from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// Import existing project images
import imgFrame415 from "figma:asset/fcb86a773d8f5683e8ea9f356c76d2a2a4af75b6.png";
import imgFrame416 from "figma:asset/f318e441967413f015640a101bbfe8509afbd941.png";
import imgFrame417 from "figma:asset/2d6d637d7b0bc85c06e4991646a1eaf0bf2067b2.png";
import imgFrame418 from "figma:asset/40e5b4343942a9983efcbaaf3ed389470f29e031.png";
import galleryMainImage from "figma:asset/25a06cd89a4f9757f60d536cb8a83d72a18ae934.png";
import exampleImage from "figma:asset/562c5ae45fde3793023de2448b2f11faef33c31d.png";
import happyKidsImage from "figma:asset/f990c58d50bdfd00ee7dbfc845ab85d9e2da9b2a.png";

// Import Joy Events real gallery images
import newGalleryImage1 from "figma:asset/aa9ec268d9a224e8eb3ca7d0b593a17fea6fd41c.png";
import newGalleryImage2 from "figma:asset/0fb0ef2c43594e19bb3c6cc15edd30637bac816b.png";
import newGalleryImage3 from "figma:asset/7f7095b96400b8d8dfbd650a35f5da7ce02929f4.png";
import scienceExperimentImage from "figma:asset/658d5827f66cfe569a05331998365818a71fadd0.png";
import teamGroupImage from "figma:asset/6d11899d846be9ceee29879c2b92b8f07fbd1f43.png";
import facePaintingImage from "figma:asset/e875c0f200cee4d97e1aa45e60fe70a7741d8595.png";
import scienceShowImage from "figma:asset/bc5545e925e95f3cc4bba7ec6dfac98114e12cb5.png";
import kidsActivitiesImage from "figma:asset/9ceb4306458270f4161e3ce6e7e40e186b019fa2.png";
import starCraftWorkshopImage from "figma:asset/7c1ef4abf6f54c56a121ea795ddb7a10d9bb597b.png";
import christmasEventImage from "figma:asset/12774e9341f4b56b91c0d47ff30c55897e02b379.png";

// Import new face painting images
import facePaintingImage1 from "figma:asset/e9b0997fc2a80c00d02d10ad59b0f6b2cc3e9e70.png";
import facePaintingImage2 from "figma:asset/958e9bdfcde7e30aa6242072520e3a057ee9f098.png";
import facePaintingImage3 from "figma:asset/dfda9c2282333aaecb4e7206ff96ef21ee64b112.png";

interface GalleryProps {
  currentLanguage: string;
}

interface GalleryItem {
  id: number;
  type: "image" | "text";
  src?: string;
  alt?: string;
  title?: string;
  description?: string;
}

export default function Gallery({
  currentLanguage,
}: GalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Language translations
  const translations = {
    en: {
      ourGallery: "Our Gallery",
      memorableMoments: "Memorable Moments",
      memorableMomentsDesc:
        "We create unique experiences where children and families share joy, laughter, and unforgettable emotions.",
      joyfulCelebrations: "Joyful Celebrations",
      joyfulCelebrationsDesc:
        "Every party tells a story of happiness, creativity, and magical memories that last a lifetime.",
      previousImage: "Previous image",
      nextImage: "Next image",
      closeGallery: "Close gallery",
      imageOf: "Image {{current}} of {{total}}",
    },
    el: {
      ourGallery: "Η Γκαλερί μας",
      memorableMoments: "Αξέχαστες Στιγμές",
      memorableMomentsDesc:
        "Δημιουργούμε μοναδικές εμπειρίες όπου παιδιά και οικογένειες μοιράζονται χαρά, γέλιο και αξέχαστα συναισθήματα.",
      joyfulCelebrations: "Χαρούμενες Γιορτές",
      joyfulCelebrationsDesc:
        "Κάθε πάρτι λέει μια ιστορία ευτυχίας, δημιουργικότητας και μαγικών αναμνήσεων που διαρκούν μια ζωή.",
      previousImage: "Προηγούμενη εικόνα",
      nextImage: "Επόμενη εικόνα",
      closeGallery: "Κλείσιμο γκαλερί",
      imageOf: "Εικόνα {{current}} από {{total}}",
    },
    uk: {
      ourGallery: "Наша Галерея",
      memorableMoments: "Незабутні Моменти",
      memorableMomentsDesc:
        "Ми створюємо унікальні враження, де діти та сім'ї діляться радістю, сміхом та незабутніми емоціями.",
      joyfulCelebrations: "Радісні Святкування",
      joyfulCelebrationsDesc:
        "Кожна вечірка розповідає історію щастя, творчості та чарівних спогадів, які залишаються на все життя.",
      previousImage: "Попереднє зображення",
      nextImage: "Наступне зображення",
      closeGallery: "Закрити галерею",
      imageOf: "Зображення {{current}} з {{total}}",
    },
  };

  const t =
    translations[
      currentLanguage as keyof typeof translations
    ] || translations.en;

  // Gallery items - all Joy Events real photos
  const galleryItems: GalleryItem[] = [
    // Joy Events real celebration photos
    {
      id: 1,
      type: "image",
      src: newGalleryImage1,
      alt: "Professional magician entertaining children and families at Joy Events party",
    },
    {
      id: 2,
      type: "image",
      src: newGalleryImage2,
      alt: "Joy Events entertainers performing interactive show for children at home party",
    },
    {
      id: 3,
      type: "image",
      src: newGalleryImage3,
      alt: "Children enjoying creative activities and games at Joy Events celebration",
    },
    {
      id: 4,
      type: "image",
      src: scienceExperimentImage,
      alt: "Joy Events science show - children watching educational chemistry experiments",
    },
    {
      id: 5,
      type: "image",
      src: teamGroupImage,
      alt: "Joy Events professional team and families celebrating together in costumes",
    },
    {
      id: 6,
      type: "image",
      src: facePaintingImage,
      alt: "Joy Events professional face painting service - artist creating designs for children",
    },
    {
      id: 7,
      type: "image",
      src: scienceShowImage,
      alt: "Joy Events interactive science demonstration with children participating in experiments",
    },
    {
      id: 8,
      type: "image",
      src: kidsActivitiesImage,
      alt: "Children engaged in Joy Events creative workshop activities and crafts",
    },
    {
      id: 9,
      type: "image",
      src: starCraftWorkshopImage,
      alt: "Joy Events creative star-making workshop - children and adults crafting decorative stars together",
    },
    {
      id: 10,
      type: "image",
      src: christmasEventImage,
      alt: "Joy Events Christmas themed entertainment - costumed performers engaging children and families in festive celebration",
    },
    {
      id: 11,
      type: "image",
      src: facePaintingImage1,
      alt: "Professional face painting - Halloween skull design showing artistic skill and creativity",
    },
    {
      id: 12,
      type: "image",
      src: facePaintingImage2,
      alt: "Adorable crab face painting design - ocean themed artwork perfect for children",
    },
    {
      id: 13,
      type: "image",
      src: facePaintingImage3,
      alt: "Spider-Man face painting - superhero character design loved by children at parties",
    },
  ];

  // Filter only images for lightbox
  const imageItems = galleryItems.filter(
    (item) => item.type === "image",
  );

  const openLightbox = (imageIndex: number) => {
    const imageItem = galleryItems.find(
      (item) => item.id === imageIndex && item.type === "image",
    );
    if (imageItem) {
      const lightboxIndex = imageItems.findIndex(
        (img) => img.id === imageItem.id,
      );
      setCurrentImageIndex(lightboxIndex);
      setLightboxOpen(true);
    }
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? imageItems.length - 1 : prev - 1,
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) =>
      prev === imageItems.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <section
      id="gallery"
      className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-black text-center mb-4 text-gray-800"
          style={{ fontFamily: "Bowlby One SC, sans-serif" }}
        >
          {t.ourGallery}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto"
        >
          Discover the magical moments we create at every
          celebration
        </motion.p>

        {/* Uniform Grid Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.05,
                duration: 0.6,
              }}
              whileHover={{
                y: -8,
                scale: 1.03,
                transition: { duration: 0.2 },
              }}
              className="group cursor-pointer"
              onClick={() =>
                item.type === "image" && openLightbox(item.id)
              }
            >
              {item.type === "image" ? (
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-white group-hover:border-[#FFE366] bg-white">
                  <ImageWithFallback
                    src={item.src!}
                    alt={item.alt!}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Hover effect indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                      <div className="w-6 h-6 border-2 border-[#B26CC5] rounded border-dashed animate-spin" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-[#B26CC5]/10 to-[#FFE366]/10 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-[#B26CC5]/20 group-hover:border-[#B26CC5]/40 aspect-square flex flex-col justify-center">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="text-center"
                  >
                    <h3
                      className="text-xl md:text-2xl font-black text-[#B26CC5] mb-3 group-hover:text-[#9C5CB0] transition-colors duration-300"
                      style={{
                        fontFamily: "Bowlby One SC, sans-serif",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-sm group-hover:text-gray-800 transition-colors duration-300">
                      {item.description}
                    </p>

                    {/* Decorative elements */}
                    <div className="flex justify-center items-center mt-4 space-x-2">
                      <div className="w-2 h-2 bg-[#FFE366] rounded-full animate-pulse"></div>
                      <div
                        className="w-3 h-3 bg-[#B26CC5] rounded-full animate-pulse"
                        style={{ animationDelay: "0.5s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-[#FFE366] rounded-full animate-pulse"
                        style={{ animationDelay: "1s" }}
                      ></div>
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}

          {/* Text blocks for memorable moments and joyful celebrations */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              delay: galleryItems.length * 0.05,
              duration: 0.6,
            }}
            whileHover={{
              y: -8,
              scale: 1.03,
              transition: { duration: 0.2 },
            }}
            className="group"
          >
            <div className="bg-gradient-to-br from-[#B26CC5]/10 to-[#FFE366]/10 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-[#B26CC5]/20 group-hover:border-[#B26CC5]/40 aspect-square flex flex-col justify-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="text-center"
              >
                <h3
                  className="text-xl md:text-2xl font-black text-[#B26CC5] mb-3 group-hover:text-[#9C5CB0] transition-colors duration-300"
                  style={{
                    fontFamily: "Bowlby One SC, sans-serif",
                  }}
                >
                  {t.memorableMoments}
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm group-hover:text-gray-800 transition-colors duration-300">
                  {t.memorableMomentsDesc}
                </p>

                {/* Decorative elements */}
                <div className="flex justify-center items-center mt-4 space-x-2">
                  <div className="w-2 h-2 bg-[#FFE366] rounded-full animate-pulse"></div>
                  <div
                    className="w-3 h-3 bg-[#B26CC5] rounded-full animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-[#FFE366] rounded-full animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              delay: (galleryItems.length + 1) * 0.05,
              duration: 0.6,
            }}
            whileHover={{
              y: -8,
              scale: 1.03,
              transition: { duration: 0.2 },
            }}
            className="group"
          >
            <div className="bg-gradient-to-br from-[#FFE366]/10 to-[#B26CC5]/10 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-[#FFE366]/30 group-hover:border-[#FFE366]/50 aspect-square flex flex-col justify-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="text-center"
              >
                <h3
                  className="text-xl md:text-2xl font-black text-[#EEB601] mb-3 group-hover:text-[#B8910F] transition-colors duration-300"
                  style={{
                    fontFamily: "Bowlby One SC, sans-serif",
                  }}
                >
                  {t.joyfulCelebrations}
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm group-hover:text-gray-800 transition-colors duration-300">
                  {t.joyfulCelebrationsDesc}
                </p>

                {/* Decorative elements */}
                <div className="flex justify-center items-center mt-4 space-x-2">
                  <div className="w-2 h-2 bg-[#B26CC5] rounded-full animate-pulse"></div>
                  <div
                    className="w-3 h-3 bg-[#FFE366] rounded-full animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-[#B26CC5] rounded-full animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <Button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white border-white/20 rounded-full w-12 h-12 p-0"
                variant="outline"
                aria-label={t.closeGallery}
              >
                <X className="w-6 h-6" />
              </Button>

              {/* Previous button */}
              <Button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white border-white/20 rounded-full w-12 h-12 p-0"
                variant="outline"
                aria-label={t.previousImage}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              {/* Next button */}
              <Button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white border-white/20 rounded-full w-12 h-12 p-0"
                variant="outline"
                aria-label={t.nextImage}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>

              {/* Image */}
              <div className="relative w-full h-full flex items-center justify-center">
                <ImageWithFallback
                  src={imageItems[currentImageIndex]?.src || ""}
                  alt={imageItems[currentImageIndex]?.alt || ""}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
              </div>

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                {t.imageOf
                  .replace(
                    "{{current}}",
                    (currentImageIndex + 1).toString(),
                  )
                  .replace(
                    "{{total}}",
                    imageItems.length.toString(),
                  )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}