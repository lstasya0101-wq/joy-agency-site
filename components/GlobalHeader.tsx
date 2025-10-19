import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone,
  Copy,
  Mail,
  Menu,
  X,
  Globe,
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
import svgPaths from "../imports/svg-khrsp1zhh8";

interface GlobalHeaderProps {
  currentLanguage: string;
  setCurrentLanguage: (lang: string) => void;
  onNavigateToSection?: (section: string) => void;
  onNavigateToPage?: (page: string) => void;
  showCityBadge?: boolean;
}

export default function GlobalHeader({
  currentLanguage,
  setCurrentLanguage,
  onNavigateToSection,
  onNavigateToPage,
  showCityBadge = true,
}: GlobalHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  // Language translations
  const translations = {
    en: {
      city: "Thessaloniki",
      programs: "Programs",
      gallery: "Gallery",
      reviews: "Reviews",
      contactUs: "Contact us",
      contactInformation: "Contact Information",
      sendMessage: "Send us a message",
      copyPhone: "Copy phone number",
      copyEmail: "Copy email",
      home: "Home",
      ourTeam: "Our Team",
      ourPartners: "Our Partners",
      privacyPolicy: "Privacy Policy",
      termsConditions: "Terms & Conditions",
      feedback: "Feedback",
    },
    el: {
      city: "Θεσσαλονίκη",
      programs: "Προγράμματα",
      gallery: "Γκαλερί",
      reviews: "Κριτικές",
      contactUs: "Επικοινωνία",
      contactInformation: "Στοιχεία Επικοινωνίας",
      sendMessage: "Στείλτε μας μήνυμα",
      copyPhone: "Αντιγραφή τηλεφώνου",
      copyEmail: "Αντιγραφή email",
      home: "Αρχική",
      ourTeam: "Η Ομάδα μας",
      ourPartners: "Οι Συνεργάτες μας",
      privacyPolicy: "Πολιτική Απορρήτου",
      termsConditions: "Όροι & Προϋποθέσεις",
      feedback: "Αξιολόγηση",
    },
    uk: {
      city: "Салоніки",
      programs: "Програми",
      gallery: "Галерея",
      reviews: "Відгуки",
      contactUs: "Зв'яжіться з нами",
      contactInformation: "Контактна Інформація",
      sendMessage: "Надішліть нам повідомлення",
      copyPhone: "Скопіювати номер телефону",
      copyEmail: "Скопіювати email",
      home: "Головна",
      ourTeam: "Наша Команда",
      ourPartners: "Наші Партнери",
      privacyPolicy: "Політика Конфіденційності",
      termsConditions: "Умови та Положення",
      feedback: "Відгук",
    },
  };

  const t =
    translations[
      currentLanguage as keyof typeof translations
    ] || translations.en;

  const handleNavigation = (
    type: "section" | "page",
    target: string,
  ) => {
    setIsMobileMenuOpen(false);

    if (type === "section" && onNavigateToSection) {
      onNavigateToSection(target);
    } else if (type === "page" && onNavigateToPage) {
      onNavigateToPage(target);
    }
  };

  const handleLogoClick = () => {
    if (onNavigateToPage) {
      onNavigateToPage("home");
    }
  };

  return (
    <header className="bg-[#FFFAF2] shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-[#FFFAF2]/95">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <button
              onClick={handleLogoClick}
              className="h-[82px] w-[190px] hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-2 rounded-lg"
              aria-label={t.home}
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
              {showCityBadge && (
                <div className="flex items-center space-x-2 bg-gradient-to-r from-[#B26CC5]/10 to-[#FFE366]/10 px-4 py-2 rounded-full border border-[#B26CC5]/20">
                  <div className="w-2 h-2 bg-[#B26CC5] rounded-full animate-pulse"></div>
                  <span className="text-gray-700 font-medium text-sm">
                    {t.city}
                  </span>
                </div>
              )}

              <nav className="flex space-x-8 text-lg font-bold">
                <button
                  onClick={() =>
                    handleNavigation("section", "programs")
                  }
                  className="text-gray-800 hover:text-[#B26CC5] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-2 rounded px-2 py-1"
                >
                  {t.programs}
                </button>
                <button
                  onClick={() =>
                    handleNavigation("section", "gallery")
                  }
                  className="text-gray-800 hover:text-[#B26CC5] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-2 rounded px-2 py-1"
                >
                  {t.gallery}
                </button>
                <button
                  onClick={() =>
                    handleNavigation("section", "reviews")
                  }
                  className="text-gray-800 hover:text-[#B26CC5] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-2 rounded px-2 py-1"
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
                <SelectTrigger className="w-auto border-[#60266F] text-[#60266F] bg-white hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-2">
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
                  <Button className="h-[40px] bg-[#FFE366] text-[#60266F] hover:bg-[#EEB601] text-lg font-bold px-6 shadow-lg hover:shadow-xl transition-all duration-200 focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-2">
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
                          className="p-1 hover:bg-[#B26CC5]/10 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-1"
                          title={t.copyPhone}
                          aria-label={t.copyPhone}
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
                          className="p-1 hover:bg-[#B26CC5]/10 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-1"
                          title={t.copyEmail}
                          aria-label={t.copyEmail}
                        >
                          <Copy className="w-4 h-4 text-[#B26CC5]" />
                        </button>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-200">
                      <Button
                        onClick={() =>
                          handleNavigation("section", "contact")
                        }
                        className="w-full h-[40px] bg-gradient-to-r from-[#B26CC5] to-[#9C5CB0] hover:from-[#9C5CB0] hover:to-[#B26CC5] text-white font-bold rounded-xl focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-2"
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
              className="md:hidden h-[40px] p-2 hover:bg-gray-100 rounded-xl focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-2"
              aria-label={
                isMobileMenuOpen ? "Close menu" : "Open menu"
              }
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
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
                  onClick={() =>
                    handleNavigation("section", "programs")
                  }
                  className="text-left text-gray-800 hover:text-[#B26CC5] transition-colors font-medium py-4 px-2 rounded-xl hover:bg-white/50 text-lg focus:outline-none focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-2"
                >
                  {t.programs}
                </button>
                <button
                  onClick={() =>
                    handleNavigation("section", "gallery")
                  }
                  className="text-left text-gray-800 hover:text-[#B26CC5] transition-colors font-medium py-4 px-2 rounded-xl hover:bg-white/50 text-lg focus:outline-none focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-2"
                >
                  {t.gallery}
                </button>
                <button
                  onClick={() =>
                    handleNavigation("section", "reviews")
                  }
                  className="text-left text-gray-800 hover:text-[#B26CC5] transition-colors font-medium py-4 px-2 rounded-xl hover:bg-white/50 text-lg focus:outline-none focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-2"
                >
                  {t.reviews}
                </button>

                <Popover>
                  <PopoverTrigger asChild>
                    <button className="text-left text-gray-800 hover:text-[#B26CC5] transition-colors font-medium py-4 px-2 rounded-xl hover:bg-white/50 text-lg w-full focus:outline-none focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-2">
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 mr-2" />
                        {t.contactUs}
                      </div>
                    </button>
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
                            className="p-1 hover:bg-[#B26CC5]/10 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-1"
                            title={t.copyPhone}
                            aria-label={t.copyPhone}
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
                            className="p-1 hover:bg-[#B26CC5]/10 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-1"
                            title={t.copyEmail}
                            aria-label={t.copyEmail}
                          >
                            <Copy className="w-4 h-4 text-[#B26CC5]" />
                          </button>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-200">
                        <Button
                          onClick={() =>
                            handleNavigation(
                              "section",
                              "contact",
                            )
                          }
                          className="w-full bg-gradient-to-r from-[#B26CC5] to-[#9C5CB0] hover:from-[#9C5CB0] hover:to-[#B26CC5] text-white font-bold rounded-xl focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-2"
                        >
                          {t.sendMessage}
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

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
                    <SelectTrigger className="w-full border-2 border-[#60266F] text-[#60266F] bg-white hover:bg-gray-50 transition-colors rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-2">
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
    </header>
  );
}