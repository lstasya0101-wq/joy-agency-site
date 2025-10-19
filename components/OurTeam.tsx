import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Phone,
  Globe,
  Mail,
  Copy,
  Menu,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
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
import ApplicationForm from "./ApplicationForm";

// Import existing Figma assets
import svgPaths from "../imports/svg-khrsp1zhh8";

interface OurTeamProps {
  onBack: () => void;
  currentLanguage: string;
  setCurrentLanguage: (language: string) => void;
  onNavigateToSection?: (section: string) => void;
}

export default function OurTeam({
  onBack,
  currentLanguage,
  setCurrentLanguage,
  onNavigateToSection,
}: OurTeamProps) {
  const [showApplicationForm, setShowApplicationForm] =
    useState(false);
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
      ourTeam: "Our Team",
      meetTheTeam: "Coming Soon",
      teamDescription:
        "We're building an amazing team of passionate entertainers and event coordinators. Stay tuned as we introduce the wonderful people who will bring magic to your celebrations!",
      joinTeam: "Want to Join Our Team?",
      joinDescription:
        "We're always looking for talented, energetic entertainers who love bringing joy to children and families. If you have a passion for performance and creating magical moments, we'd love to hear from you!",
      applyNow: "Join our team",
      contactUs2: "Contact Us",
      backToHome: "Back to Home",
      contactInformation: "Contact Information",
      sendMessage: "Send us a message",
      copyPhone: "Copy phone number",
      copyEmail: "Copy email",
    },
    el: {
      city: "Θεσσαλονίκη",
      programs: "Προγράμματα",
      gallery: "Γκαλερί",
      reviews: "Κριτικές",
      contactUs: "Επικοινωνία",
      ourTeam: "Η Ομάδα μας",
      meetTheTeam: "Έρχεται Σύντομα",
      teamDescription:
        "Χτίζουμε μια καταπληκτική ομάδα από παθιασμένους διασκεδαστές και συντονιστές εκδηλώσεων. Μείνετε συντονισμένοι καθώς παρουσιάζουμε τους υπέροχους ανθρώπους που θα φέρουν μαγεία στις γιορτές σας!",
      joinTeam: "Θέλετε να Ενταχθείτε στην Ομάδα μας;",
      joinDescription:
        "Αναζητούμε πάντα ταλαντούχους, ενεργητικούς διασκεδαστές που αγαπούν να φέρνουν χαρά σε παιδιά και οικογένειες. Αν έχετε πάθος για την παράσταση και τη δημιουργία μαγικών στιγμών, θα θέλαμε να σας ακούσουμε!",
      applyNow: "Γίνετε μέλος της ομάδας μας",
      contactUs2: "Επικοινωνήστε μαζί μας",
      backToHome: "Επιστροφή στην Αρχική",
      contactInformation: "Στοιχεία Επικοινωνίας",
      sendMessage: "Στείλτε μας μήνυμα",
      copyPhone: "Αντιγραφή τηλεφώνου",
      copyEmail: "Αντιγραφή email",
    },
    uk: {
      city: "Салоніки",
      programs: "Програми",
      gallery: "Галерея",
      reviews: "Відгуки",
      contactUs: "Зв'яжіться з нами",
      ourTeam: "Наша Команда",
      meetTheTeam: "Незабаром",
      teamDescription:
        "Ми створюємо дивовижну команду пристрасних аніматорів та координаторів подій. Слідкуйте за оновленнями, коли ми представимо чудових людей, які принесуть магію у ваші святкування!",
      joinTeam: "Хочете Приєднатися до Нашої Команди?",
      joinDescription:
        "Ми завжди шукаємо талановитих, енергійних аніматорів, які люблять приносити радість дітям та сім'ям. Якщо у вас є пристрасть до виступів та створення магічних моментів, ми б хотіли почути від вас!",
      applyNow: "Приєднатися до нашої команди",
      contactUs2: "Зв'яжіться з Нами",
      backToHome: "Повернутися Додому",
      contactInformation: "Контактна Інформація",
      sendMessage: "Надішліть нам повідомлення",
      copyPhone: "Скопіювати номер телефону",
      copyEmail: "Скопіювати email",
    },
  };

  const t =
    translations[currentLanguage as keyof typeof translations];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-[#FFFAF2]"
    >
      {/* Header */}
      <header className="bg-[#FFFAF2] shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-[#FFFAF2]/95">
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
                  <SelectTrigger className="w-auto border-[#60266F] text-[#60266F] bg-white hover:bg-gray-50 transition-colors">
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
                          className="w-full h-[40px] bg-gradient-to-r from-[#B26CC5] to-[#9C5CB0] hover:from-[#9C5CB0] hover:to-[#B26CC5] text-white font-bold rounded-xl"
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

                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="text-left text-gray-800 hover:text-[#B26CC5] transition-colors font-medium py-4 px-2 rounded-xl hover:bg-white/50 text-lg w-full">
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
                            onClick={() => {
                              onNavigateToSection &&
                                onNavigateToSection("contact");
                              setIsMobileMenuOpen(false);
                            }}
                            className="w-full bg-gradient-to-r from-[#B26CC5] to-[#9C5CB0] hover:from-[#9C5CB0] hover:to-[#B26CC5] text-white font-bold rounded-xl"
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
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-[#B26CC5] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          {t.backToHome}
        </motion.button>

        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h1
            className="text-6xl md:text-7xl font-black text-gray-800 mb-6 bg-gradient-to-r from-[#B26CC5] to-[#FFE366] bg-clip-text text-transparent"
            style={{ fontFamily: "Bowlby One SC, sans-serif" }}
          >
            {t.ourTeam}
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-8">
            {t.meetTheTeam}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t.teamDescription}
          </p>
        </motion.div>

        {/* Coming Soon Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-[#FFE366]/20 to-[#B26CC5]/20 rounded-3xl p-16 border-2 border-[#B26CC5]/30 shadow-xl">
              <div className="mb-8">
                <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-[#FFE366] to-[#EEB601] rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-16 h-16 text-[#60266F]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3
                  className="text-4xl font-black text-gray-800 mb-4"
                  style={{
                    fontFamily: "Bowlby One SC, sans-serif",
                  }}
                >
                  {t.meetTheTeam}
                </h3>
              </div>
              <p className="text-xl text-gray-700 leading-relaxed font-medium max-w-2xl mx-auto">
                {t.teamDescription}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Join Team Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-r from-[#B26CC5] via-[#9C5CB0] to-[#FFE366] rounded-3xl p-12 text-center shadow-2xl"
        >
          <h2
            className="text-4xl font-black text-white mb-6"
            style={{ fontFamily: "Bowlby One SC, sans-serif" }}
          >
            {t.joinTeam}
          </h2>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto leading-relaxed">
            {t.joinDescription}
          </p>
          <Button
            onClick={() => setShowApplicationForm(true)}
            className="h-[40px] bg-white text-[#B26CC5] hover:bg-gray-100 text-xl font-bold px-12 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            {t.applyNow}
          </Button>
        </motion.section>
      </div>

      {/* Footer */}
      <footer className="bg-[#FFFAF2] py-20 px-6 border-t border-gray-200">
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
      </footer>

      {/* Application Form Modal */}
      <ApplicationForm
        isOpen={showApplicationForm}
        onClose={() => setShowApplicationForm(false)}
        type="team"
        currentLanguage={currentLanguage}
      />
    </motion.div>
  );
}