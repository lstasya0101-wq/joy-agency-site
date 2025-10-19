import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone,
  Globe,
  ArrowLeft,
  Mail,
  Copy,
  Menu,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import UnifiedContactForm from "./UnifiedContactForm";

// Import existing Figma assets
import svgPaths from "../imports/svg-khrsp1zhh8";

interface ProgramDetailsPageProps {
  program: {
    id: number;
    title: string;
    duration: string;
    ageRange: string;
    image: string;
    features: string[];
    recommendedAge: string;
    fullDescription: string;
    programKey: string;
  };
  onBack: () => void;
  currentLanguage: string;
  setCurrentLanguage: (lang: string) => void;
  onNavigateToSection?: (section: string) => void;
}

export default function ProgramDetailsPage({
  program,
  onBack,
  currentLanguage,
  setCurrentLanguage,
  onNavigateToSection,
}: ProgramDetailsPageProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Language translations for program details page
  const translations = {
    en: {
      city: "Thessaloniki",
      programs: "Programs",
      gallery: "Gallery",
      reviews: "Reviews",
      contactUs: "Contact us",
      recommendedAge: "Recommended age",
      backToPrograms: "Back to Programs",
      getInTouch: "GET IN TOUCH WITH US",
      weCanHelp: "We can help you choose",
      contactInformation: "Contact Information",
      sendMessage: "Send us a message",
      copyPhone: "Copy phone number",
      copyEmail: "Copy email",
      bookNow: "Book Now",
    },
    el: {
      city: "Θεσσαλονίκη",
      programs: "Προγράμματα",
      gallery: "Γκαλερί",
      reviews: "Κριτικές",
      contactUs: "Επικοινωνία",
      recommendedAge: "Προτεινόμενη ηλικία",
      backToPrograms: "Επιστροφή στα Προγράμματα",
      getInTouch: "ΕΠΙΚΟΙΝΩΝΗΣΤΕ ΜΑΖΙ ΜΑΣ",
      weCanHelp: "Μπορούμε να σας βοηθήσουμε να επιλέξετε",
      contactInformation: "Στοιχεία Επικοινωνίας",
      sendMessage: "Στείλτε μας μήνυμα",
      copyPhone: "Αντιγραφή τηλεφώνου",
      copyEmail: "Αντιγραφή email",
      bookNow: "Κλείστε Τώρα",
    },
    uk: {
      city: "Салоніки",
      programs: "Програми",
      gallery: "Галерея",
      reviews: "Відгуки",
      contactUs: "Зв'яжіться з нами",
      recommendedAge: "Рекомендований вік",
      backToPrograms: "Повернутися до Програм",
      getInTouch: "ЗВ'ЯЖІТЬСЯ З НАМИ",
      weCanHelp: "Ми можемо допомогти вам обрати",
      contactInformation: "Контактна Інформація",
      sendMessage: "Надішліть нам повідомлення",
      copyPhone: "Скопіювати номер телефону",
      copyEmail: "Скопіювати email",
      bookNow: "Забронювати",
    },
  };

  const t =
    translations[currentLanguage as keyof typeof translations];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="min-h-screen bg-[#FFFAF2]"
      >
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[#FFFAF2] shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-[#FFFAF2]/95"
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <button
                  onClick={onBack}
                  className="h-[82px] w-[190px] hover:opacity-80 transition-opacity"
                >
                  <svg
                    className="w-full h-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 190 83"
                  >
                    <g>
                      <g>
                        <g>
                          <circle
                            cx="17.7277"
                            cy="44.0791"
                            fill="#6148FC"
                            r="8"
                            transform="rotate(-55.4403 17.7277 44.0791)"
                          />
                          <circle
                            cx="32.4766"
                            cy="22.6672"
                            fill="#6148FC"
                            r="8"
                            transform="rotate(-55.4403 32.4766 22.6672)"
                          />
                        </g>
                        <path
                          d={svgPaths.p39235080}
                          fill="#6148FC"
                        />
                      </g>
                      <g>
                        <path
                          d={svgPaths.p954c880}
                          fill="#FFE366"
                        />
                        <path
                          d={svgPaths.p1b980380}
                          fill="#B26CC5"
                        />
                      </g>
                    </g>
                  </svg>
                </button>
                <div className="hidden md:flex items-center space-x-8">
                  <div className="flex items-center space-x-2 bg-gradient-to-r from-[#B26CC5]/10 to-[#FFE366]/10 px-4 py-2 rounded-full border border-[#B26CC5]/20">
                    <div className="w-2 h-2 bg-[#B26CC5] rounded-full animate-pulse"></div>
                    <span className="text-gray-700 font-medium text-sm">
                      {t.city}
                    </span>
                  </div>
                  <nav className="flex space-x-8 text-lg font-bold">
                    <button
                      onClick={() =>
                        onNavigateToSection &&
                        onNavigateToSection("programs")
                      }
                      className="text-gray-800 hover:text-[#B26CC5] transition-colors cursor-pointer"
                    >
                      {t.programs}
                    </button>
                    <button
                      onClick={() =>
                        onNavigateToSection &&
                        onNavigateToSection("gallery")
                      }
                      className="text-gray-800 hover:text-[#B26CC5] transition-colors cursor-pointer"
                    >
                      {t.gallery}
                    </button>
                    <button
                      onClick={() =>
                        onNavigateToSection &&
                        onNavigateToSection("reviews")
                      }
                      className="text-gray-800 hover:text-[#B26CC5] transition-colors cursor-pointer"
                    >
                      {t.reviews}
                    </button>
                  </nav>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-4">
                  <Select
                    value={currentLanguage}
                    onValueChange={setCurrentLanguage}
                  >
                    <SelectTrigger className="w-auto border-[#60266F] text-[#60266F] bg-white">
                      <Globe className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">🇺🇸 EN</SelectItem>
                      <SelectItem value="el">🇬🇷 ΕΛ</SelectItem>
                      <SelectItem value="uk">🇺🇦 УК</SelectItem>
                    </SelectContent>
                  </Select>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button className="bg-[#FFE366] text-[#60266F] hover:bg-[#EEB601] text-lg font-bold px-6 shadow-lg hover:shadow-xl transition-all duration-200">
                        {t.contactUs}{" "}
                        <Phone className="w-5 h-5 ml-2" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-6 bg-white border-2 border-[#B26CC5] rounded-2xl shadow-2xl">
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-800 text-center mb-4">
                          {t.contactInformation}
                        </h3>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-[#FFE366]/10 to-[#B26CC5]/10 rounded-xl border border-[#B26CC5]/20">
                            <div className="flex items-center space-x-3">
                              <Phone className="w-5 h-5 text-[#B26CC5]" />
                              <a
                                href="tel:+306987451036"
                                className="text-gray-800 font-medium hover:text-[#B26CC5] transition-colors"
                              >
                                +30 698 745 1036
                              </a>
                            </div>
                            <button
                              onClick={() =>
                                navigator.clipboard.writeText(
                                  "+306987451036",
                                )
                              }
                              className="p-1 hover:bg-[#B26CC5]/10 rounded transition-colors"
                              title={t.copyPhone}
                            >
                              <Copy className="w-4 h-4 text-[#B26CC5]" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-[#FFE366]/10 to-[#B26CC5]/10 rounded-xl border border-[#B26CC5]/20">
                            <div className="flex items-center space-x-3">
                              <Mail className="w-5 h-5 text-[#B26CC5]" />
                              <a
                                href="mailto:joypartythess@gmail.com"
                                className="text-gray-800 font-medium hover:text-[#B26CC5] transition-colors"
                              >
                                joypartythess@gmail.com
                              </a>
                            </div>
                            <button
                              onClick={() =>
                                navigator.clipboard.writeText(
                                  "joypartythess@gmail.com",
                                )
                              }
                              className="p-1 hover:bg-[#B26CC5]/10 rounded transition-colors"
                              title={t.copyEmail}
                            >
                              <Copy className="w-4 h-4 text-[#B26CC5]" />
                            </button>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-gray-200">
                          <Button
                            onClick={() =>
                              onNavigateToSection &&
                              onNavigateToSection("contact")
                            }
                            className="w-full bg-gradient-to-r from-[#B26CC5] to-[#9C5CB0] hover:from-[#9C5CB0] hover:to-[#B26CC5] text-white font-bold rounded-xl"
                          >
                            {t.sendMessage}
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Mobile menu button */}
                <Button
                  onClick={() =>
                    setIsMobileMenuOpen(!isMobileMenuOpen)
                  }
                  variant="ghost"
                  size="sm"
                  className="md:hidden p-2 hover:bg-gray-100 rounded-xl"
                >
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6 text-gray-700" />
                  ) : (
                    <Menu className="h-6 w-6 text-gray-700" />
                  )}
                </Button>
              </div>
            </div>

            {/* Mobile menu - Toggleable */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden mt-4 pb-4 border-t pt-4 bg-gradient-to-r from-[#FFE366]/5 to-[#B26CC5]/5 rounded-2xl mx-2 overflow-hidden"
                >
                  <nav className="flex flex-col space-y-2 px-4">
                    <button
                      onClick={() => {
                        onNavigateToSection &&
                          onNavigateToSection("programs");
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-left text-gray-800 hover:text-[#B26CC5] transition-colors font-medium py-4 px-2 rounded-xl hover:bg-white/50 text-lg"
                    >
                      {t.programs}
                    </button>
                    <button
                      onClick={() => {
                        onNavigateToSection &&
                          onNavigateToSection("gallery");
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-left text-gray-800 hover:text-[#B26CC5] transition-colors font-medium py-4 px-2 rounded-xl hover:bg-white/50 text-lg"
                    >
                      {t.gallery}
                    </button>
                    <button
                      onClick={() => {
                        onNavigateToSection &&
                          onNavigateToSection("reviews");
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-left text-gray-800 hover:text-[#B26CC5] transition-colors font-medium py-4 px-2 rounded-xl hover:bg-white/50 text-lg"
                    >
                      {t.reviews}
                    </button>

                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-2 mb-3">
                        <Globe className="w-5 h-5 text-[#B26CC5]" />
                        <span className="text-gray-700 font-medium">
                          Language
                        </span>
                      </div>
                      <Select
                        value={currentLanguage}
                        onValueChange={setCurrentLanguage}
                      >
                        <SelectTrigger className="w-full border-2 border-[#60266F] text-[#60266F] bg-white hover:bg-gray-50 transition-colors rounded-xl px-4 py-3">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">
                            🇺🇸 English
                          </SelectItem>
                          <SelectItem value="el">
                            🇬🇷 Ελληνικά
                          </SelectItem>
                          <SelectItem value="uk">
                            🇺🇦 Українська
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.header>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-7xl mx-auto px-6 py-6"
        >
          <Button
            onClick={onBack}
            variant="outline"
            className="h-[40px] border-[#B26CC5] text-[#B26CC5] hover:bg-[#B26CC5] hover:text-white font-bold rounded-2xl transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.backToPrograms}
          </Button>
        </motion.div>

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-7xl mx-auto px-6 py-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Program Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FFE366]">
                <ImageWithFallback
                  src={program.image}
                  alt={program.title}
                  className="w-full h-96 object-cover"
                />
              </div>
            </motion.div>

            {/* Program Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-6"
            >
              <h1
                className="text-4xl md:text-5xl font-black text-gray-800 mb-6"
                style={{
                  fontFamily: "Bowlby One SC, sans-serif",
                }}
              >
                {program.title}
              </h1>

              <div className="bg-gradient-to-r from-[#FFE366]/20 to-[#B26CC5]/20 rounded-2xl p-6 border border-[#B26CC5]/30">
                <h3 className="text-xl font-bold text-[#B26CC5] mb-3">
                  {t.recommendedAge}
                </h3>
                <p className="text-2xl font-bold text-gray-800">
                  {program.recommendedAge}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#FFE366]">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {program.fullDescription}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() =>
                    onNavigateToSection &&
                    onNavigateToSection("contact")
                  }
                  className="w-full min-h-[40px] h-[40px] bg-gradient-to-r from-[#B26CC5] to-[#9C5CB0] hover:from-[#9C5CB0] hover:to-[#B26CC5] text-white font-bold px-6 py-3 rounded-2xl text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  <span className="truncate">{t.bookNow}</span>
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="py-20 px-6 bg-gradient-to-br from-white to-gray-50"
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-4xl md:text-5xl font-black text-center mb-16 text-gray-800"
              style={{
                fontFamily: "Bowlby One SC, sans-serif",
              }}
            >
              {t.getInTouch}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-white p-8 rounded-3xl border-2 border-[#60266F] shadow-2xl hover:shadow-3xl transition-shadow duration-300"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-black text-gray-800 mb-3">
                  {t.weCanHelp}
                </h3>
                <p className="text-gray-600">
                  Tell us about your dream {program.title} event
                  and we'll make it happen!
                </p>
              </div>

              <UnifiedContactForm
                currentLanguage={currentLanguage}
                showHeader={false}
              />
            </motion.div>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="bg-[#FFFAF2] py-20 px-6 border-t border-gray-200"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-12">
              {/* Logo and Contact */}
              <div className="lg:col-span-2">
                <div className="h-[82px] w-[190px] mb-8">
                  <svg
                    className="w-full h-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 190 83"
                  >
                    <g>
                      <g>
                        <g>
                          <circle
                            cx="17.7277"
                            cy="44.0791"
                            fill="#6148FC"
                            r="8"
                            transform="rotate(-55.4403 17.7277 44.0791)"
                          />
                          <circle
                            cx="32.4766"
                            cy="22.6672"
                            fill="#6148FC"
                            r="8"
                            transform="rotate(-55.4403 32.4766 22.6672)"
                          />
                        </g>
                        <path
                          d={svgPaths.p39235080}
                          fill="#6148FC"
                        />
                      </g>
                      <g>
                        <path
                          d={svgPaths.p954c880}
                          fill="#FFE366"
                        />
                        <path
                          d={svgPaths.p1b980380}
                          fill="#B26CC5"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
                <div className="space-y-4">
                  <p className="text-lg text-gray-700">
                    Thessaloniki
                  </p>
                  <a
                    href="tel:+306987451036"
                    className="block text-lg text-gray-700 hover:text-[#B26CC5] transition-colors cursor-pointer"
                  >
                    +30 698 745 1036
                  </a>
                  <a
                    href="mailto:joypartythess@gmail.com"
                    className="block text-lg text-gray-700 hover:text-[#B26CC5] transition-colors cursor-pointer"
                  >
                    joypartythess@gmail.com
                  </a>
                </div>
              </div>

              {/* Programs */}
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-8">
                  Programs
                </h4>
                <ul className="space-y-4">
                  <li>
                    <button
                      onClick={() =>
                        onNavigateToSection &&
                        onNavigateToSection("programs")
                      }
                      className="text-lg text-gray-700 hover:text-[#B26CC5] transition-colors cursor-pointer text-left"
                    >
                      Children Programs
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() =>
                        onNavigateToSection &&
                        onNavigateToSection("programs")
                      }
                      className="text-lg text-gray-700 hover:text-[#B26CC5] transition-colors cursor-pointer text-left"
                    >
                      Adults Programs
                    </button>
                  </li>
                </ul>
              </div>

              {/* About Us */}
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-8">
                  About us
                </h4>
                <ul className="space-y-4">
                  <li>
                    <button
                      onClick={onBack}
                      className="text-lg text-gray-700 hover:text-[#B26CC5] transition-colors cursor-pointer text-left"
                    >
                      Our team
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={onBack}
                      className="text-lg text-gray-700 hover:text-[#B26CC5] transition-colors cursor-pointer text-left"
                    >
                      Our partners
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={onBack}
                      className="text-lg text-gray-700 hover:text-[#B26CC5] transition-colors cursor-pointer text-left"
                    >
                      Privacy policy
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={onBack}
                      className="text-lg text-gray-700 hover:text-[#B26CC5] transition-colors cursor-pointer text-left"
                    >
                      Terms and conditions
                    </button>
                  </li>
                </ul>
              </div>

              {/* Customer Service */}
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-8">
                  Customer service
                </h4>
                <ul className="space-y-4 mb-10">
                  <li>
                    <button
                      onClick={() =>
                        onNavigateToSection &&
                        onNavigateToSection("contact")
                      }
                      className="text-lg text-gray-700 hover:text-[#B26CC5] transition-colors cursor-pointer text-left"
                    >
                      Contact us
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={onBack}
                      className="text-lg text-gray-700 hover:text-[#B26CC5] transition-colors cursor-pointer text-left"
                    >
                      Leave a feedback
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() =>
                        onNavigateToSection &&
                        onNavigateToSection("faq")
                      }
                      className="text-lg text-gray-700 hover:text-[#B26CC5] transition-colors cursor-pointer text-left"
                    >
                      FAQ
                    </button>
                  </li>
                </ul>

                {/* Social Media */}
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-6">
                    Our social medias
                  </h4>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.instagram.com/joy.party_thess?igsh=bXVzZTIwZHRtZDZo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                    >
                      <span className="text-white font-bold">
                        IG
                      </span>
                    </a>
                    <a
                      href="https://www.tiktok.com/@joy.party_thess?_t=ZM-8zoq4Scg8t3&_r=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                    >
                      <span className="text-white font-bold">
                        TT
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-300 pt-8 text-center">
              <p className="font-medium tracking-wider text-gray-700">
                ©All rights reserved. 2025 Joy
              </p>
            </div>
          </div>
        </motion.footer>
      </motion.div>
    </AnimatePresence>
  );
}