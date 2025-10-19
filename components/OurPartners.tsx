import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Phone,
  Globe,
  MapPin,
  Star,
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
import thessBalloonsLogo from "figma:asset/f8e629219cfcb09676f509c02db1ecb748995c22.png";
import facePaintingPartnerImage from "figma:asset/3c9b22cd357c47582c70aff9f2ade35fc8888246.png";
import facePaintingImage1 from "figma:asset/e9b0997fc2a80c00d02d10ad59b0f6b2cc3e9e70.png";
import facePaintingImage2 from "figma:asset/958e9bdfcde7e30aa6242072520e3a057ee9f098.png";
import facePaintingImage3 from "figma:asset/dfda9c2282333aaecb4e7206ff96ef21ee64b112.png";

interface OurPartnersProps {
  onBack: () => void;
  currentLanguage: string;
  setCurrentLanguage: (language: string) => void;
  onNavigateToSection?: (section: string) => void;
}

export default function OurPartners({
  onBack,
  currentLanguage,
  setCurrentLanguage,
  onNavigateToSection,
}: OurPartnersProps) {
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
      ourPartners: "Our Partners",
      partnersTitle: "Meet Our Amazing Partner Network",
      partnersDescription:
        "We work with the finest local businesses in Thessaloniki to ensure every aspect of your event is absolutely perfect. Our carefully selected partners share our commitment to quality and customer satisfaction.",
      whyPartner: "Why We Partner",
      partnerBenefits: "Partnership Benefits",
      becomePartner: "Become a Partner",
      becomePartnerDesc:
        "Interested in joining our partner network? We're always looking for quality businesses that share our values.",
      applyPartnership: "Apply for Partnership",
      location: "Location",
      specialties: "Specialties",
      rating: "Rating",
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
      ourPartners: "Οι Συνεργάτες μας",
      partnersTitle:
        "Γνωρίστε το Καταπληκτικό Δίκτυο Συνεργατών μας",
      partnersDescription:
        "Συνεργαζόμαστε με τις καλύτερες τοπικές επιχειρήσεις στη Θεσσαλονίκη για να διασφαλίσουμε ότι κάθε πτυχή της εκδήλωσής σας είναι απολύτως τέλεια. Οι προσεκτικά επιλεγμένοι συνεργάτες μας μοιράζονται τη δέσμευσή μας για ποιότητα και ικανοποίηση πελατών.",
      whyPartner: "Γιατί Συνεργαζόμαστε",
      partnerBenefits: "Οφέλη Συνεργασίας",
      becomePartner: "Γίνετε Συνεργάτης",
      becomePartnerDesc:
        "Ενδιαφέρεστε να ενταχθείτε στο δίκτυο συνεργατών μας; Αναζητούμε πάντα ποιοτικές επιχειρήσεις που μοιράζονται τις αξίες μας.",
      applyPartnership: "Αίτηση για Συνεργασία",
      location: "Τοποθεσία",
      specialties: "Ειδικότητες",
      rating: "Βαθμολογία",
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
      ourPartners: "Наші Партнери",
      partnersTitle:
        "Познайомтеся з Нашою Дивовижною Мережею Партнерів",
      partnersDescription:
        "Ми працюємо з найкращими місцевими бізнесами в Салоніках, щоб забезпечити абсолютну досконалість кожного аспекту вашої події. Наші ретельно відібрані партнери поділяють нашу відданість якості та задоволенню клієнтів.",
      whyPartner: "Чому Ми Партнери",
      partnerBenefits: "Переваги Партнерства",
      becomePartner: "Стати Партнером",
      becomePartnerDesc:
        "Зацікавлені в приєднанні до нашої мережі партнерів? Ми завжди шукаємо якісні бізнеси, які поділяють наші цінності.",
      applyPartnership: "Подати Заявку на Партнерство",
      location: "Розташування",
      specialties: "Спе��іалізації",
      rating: "Рейтинг",
      backToHome: "Повернутися Додому",
      contactInformation: "Контактна Інформація",
      sendMessage: "Надішліть нам повідомлення",
      copyPhone: "Скопіювати номер телефону",
      copyEmail: "Скопіювати email",
    },
  };

  const t =
    translations[currentLanguage as keyof typeof translations];

  const getPartnerContent = () => {
    const isEnglish = currentLanguage === "en";
    const isGreek = currentLanguage === "el";
    const isUkrainian = currentLanguage === "uk";

    return [
      {
        name: "Thess Balloons",
        image: thessBalloonsLogo,
        description: isGreek
          ? "Εξειδικευμένη εταιρεία διακόσμησης με μπαλόνια που δημιουργεί μαγικές στιγμές και φέρνει χαμόγελα σε κάθε εκδήλωση. Κάθε μπαλόνι ένα χαμόγελο!"
          : isUkrainian
            ? "Спеціалізована компанія з оформлення кульками, яка створює магічні моменти та приносить посмішки на кожну подію. Кожна кулька - посмішка!"
            : "Specialized balloon decoration company creating magical moments and bringing smiles to every event. Every balloon a smile!",
        location: "Thessaloniki, Greece",
        specialties: isGreek
          ? [
              "Διακόσμηση με μπαλόνια",
              "Θεματικές συνθέσεις",
              "Προσωποποιημένα σχέδια",
              "Επαγγελματική εξυπηρέτηση",
            ]
          : isUkrainian
            ? [
                "Оформлення кульками",
                "Тематичні композиції",
                "Персоналізовані дизайни",
                "Професійне обслуговування",
              ]
            : [
                "Balloon decorations",
                "Themed arrangements",
                "Custom designs",
                "Professional service",
              ],
        rating: 5.0,
        isRealPartner: true,
      },
      {
        name: isGreek
          ? "Face Painting"
          : isUkrainian
            ? "Розмалювання Обличчя"
            : "Face Painting",
        image: facePaintingPartnerImage,
        galleryImages: [
          facePaintingImage1,
          facePaintingImage2,
          facePaintingImage3,
        ],
        description: isGreek
          ? "Επαγγελματική υπηρεσία ζωγραφικής προσώπου που μεταμορφώνει τα παιδιά σε αγαπημένους χαρακτήρες, ζώα και φανταστικά όντα. Από πριγκίπισσες και σούπερ ήρωες μέχρι γλυκά ζωάκια και μαγικά σχέδια!"
          : isUkrainian
            ? "Професійна послуга розмалювання обличчя, яка перетворює дітей на улюблених персонажів, тварин та фантастичних істот. Від принцес та супергероїв до милих тваринок та магічних дизайнів!"
            : "Professional face painting service that transforms children into beloved characters, animals, and fantasy creatures. From princesses and superheroes to adorable animals and magical designs!",
        location: "Thessaloniki, Greece",
        specialties: isGreek
          ? [
              "Ζωγραφική προσώπου",
              "Θεματικά σχέδια",
              "Ασφαλή χρώματα",
              "Παιδικοί χαρακτήρες",
            ]
          : isUkrainian
            ? [
                "Розмалювання обличчя",
                "Тематичні дизайни",
                "Безпечні фарби",
                "Дитячі персонажі",
              ]
            : [
                "Face painting",
                "Themed designs",
                "Safe paints",
                "Children's characters",
              ],
        rating: 5.0,
        isRealPartner: true,
        isFacePainting: true,
      },
    ];
  };

  const partners = getPartnerContent();

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
            {t.ourPartners}
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-8">
            {t.partnersTitle}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t.partnersDescription}
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="flex justify-center mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
            {partners.map((partner, index) => {
              const isGreek = currentLanguage === "el";
              const isUkrainian = currentLanguage === "uk";

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4 + index * 0.1,
                  }}
                  whileHover={{ y: -10 }}
                >
                  <Card
                    className={`border-2 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 bg-gradient-to-br group h-full ${
                      partner.isRealPartner
                        ? "border-[#FFE366] from-[#FFE366]/5 to-[#B26CC5]/5 hover:border-[#B26CC5]"
                        : "border-[#60266F] from-white to-gray-50"
                    }`}
                  >
                    <div className="relative">
                      {partner.isRealPartner ? (
                        // Special layout for real partners
                        partner.isFacePainting ? (
                          // Face Painting partner layout with gallery
                          <div className="bg-white p-4">
                            {/* Main image */}
                            <div className="h-48 overflow-hidden rounded-xl mb-3">
                              <ImageWithFallback
                                src={partner.image}
                                alt={partner.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            {/* Gallery grid */}
                            <div className="grid grid-cols-3 gap-2">
                              {partner.galleryImages?.map(
                                (
                                  galleryImg: string,
                                  idx: number,
                                ) => (
                                  <div
                                    key={idx}
                                    className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group/gallery"
                                  >
                                    <ImageWithFallback
                                      src={galleryImg}
                                      alt={`${partner.name} Example ${idx + 1}`}
                                      className="w-full h-16 object-cover group-hover/gallery:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-300" />
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        ) : (
                          // Thess Balloons layout
                          <div className="h-64 bg-white flex items-center justify-center p-8">
                            <ImageWithFallback
                              src={partner.image}
                              alt={partner.name}
                              className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        )
                      ) : (
                        // Regular image layout for other partners
                        <>
                          <ImageWithFallback
                            src={partner.image}
                            alt={partner.name}
                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </>
                      )}

                      {/* Rating badge */}
                      <div
                        className={`absolute top-4 right-4 rounded-full px-3 py-1 flex items-center space-x-1 ${
                          partner.isRealPartner
                            ? "bg-gradient-to-r from-[#FFE366] to-[#EEB601] border-2 border-white"
                            : "bg-white/90 backdrop-blur-sm"
                        }`}
                      >
                        <Star
                          className={`w-4 h-4 ${
                            partner.isRealPartner
                              ? "fill-[#60266F] text-[#60266F]"
                              : "fill-yellow-400 text-yellow-400"
                          }`}
                        />
                        <span
                          className={`font-bold ${
                            partner.isRealPartner
                              ? "text-[#60266F]"
                              : "text-gray-800"
                          }`}
                        >
                          {partner.rating}
                        </span>
                      </div>

                      {/* Special badge for real partners */}
                      {partner.isRealPartner && (
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-[#B26CC5] to-[#9C5CB0] text-white px-3 py-1 rounded-full text-sm font-bold border-2 border-white">
                          ✓{" "}
                          {isGreek
                            ? "Συνεργάτης"
                            : isUkrainian
                              ? "Партнер"
                              : "Partner"}
                        </div>
                      )}
                    </div>
                    <CardContent className="p-8">
                      <h3 className="text-3xl font-black text-gray-800 mb-3 group-hover:text-[#B26CC5] transition-colors duration-200">
                        {partner.name}
                      </h3>

                      <div className="flex items-center text-gray-600 mb-4">
                        <MapPin className="w-4 h-4 mr-2 text-[#B26CC5]" />
                        <span className="text-sm">
                          {partner.location}
                        </span>
                      </div>

                      <p className="text-gray-600 leading-relaxed mb-6">
                        {partner.description}
                      </p>

                      <div>
                        <h4 className="font-bold text-gray-800 mb-3">
                          {t.specialties}:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {partner.specialties.map(
                            (specialty, idx) => (
                              <span
                                key={idx}
                                className="bg-gradient-to-r from-[#FFE366] to-[#EEB601] text-[#60266F] px-3 py-1 rounded-full text-sm font-medium"
                              >
                                {specialty}
                              </span>
                            ),
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Become Partner Section */}
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
            {t.becomePartner}
          </h2>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto leading-relaxed">
            {t.becomePartnerDesc}
          </p>
          <Button
            onClick={() => setShowApplicationForm(true)}
            className="bg-white text-[#B26CC5] hover:bg-gray-100 text-xl font-bold px-12 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            {t.applyPartnership}
          </Button>
        </motion.section>
      </div>

      {/* Application Form Modal */}
      <ApplicationForm
        isOpen={showApplicationForm}
        onClose={() => setShowApplicationForm(false)}
        type="partner"
        currentLanguage={currentLanguage}
        onNavigateToPage={onNavigateToPage}
      />
    </motion.div>
  );
}