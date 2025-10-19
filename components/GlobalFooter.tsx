import { Phone, Mail, MapPin, Instagram } from "lucide-react";
import svgPaths from "../imports/svg-khrsp1zhh8";

interface GlobalFooterProps {
  currentLanguage: string;
  onNavigateToSection?: (section: string) => void;
  onNavigateToPage?: (page: string) => void;
  onSetSelectedAge?: (age: string) => void;
}

export default function GlobalFooter({
  currentLanguage,
  onNavigateToSection,
  onNavigateToPage,
  onSetSelectedAge,
}: GlobalFooterProps) {
  // Language translations
  const translations = {
    en: {
      tagline:
        "Creating magical moments and unforgettable celebrations for children and families across Thessaloniki.",
      quickLinks: "Quick Links",
      programs: "Programs",
      childrenPrograms: "Children Programs",
      adultPrograms: "Adult Programs",
      gallery: "Gallery",
      reviews: "Reviews",
      aboutUs: "About Us",
      ourTeam: "Our Team",
      ourPartners: "Our Partners",
      privacyPolicy: "Privacy Policy",
      termsConditions: "Terms & Conditions",
      services: "Services",
      contactUs: "Contact Us",
      leaveFeedback: "Leave Feedback",
      faq: "FAQ",
      bookEvent: "Book Event",
      getInTouch: "Get In Touch",
      followUs: "Follow Us",
      allRightsReserved:
        "© 2025 Joy Events. All rights reserved.",
      madeWithLove: "Made with ❤️ in Thessaloniki",
      availableHours: "Available 9 AM - 8 PM",
    },
    el: {
      tagline:
        "Δημιουργούμε μαγικές στιγμές και αξέχαστες γιορτές για παιδιά και οικογένειες σε όλη τη Θεσσαλονίκη.",
      quickLinks: "Γρήγοροι Σύνδεσμοι",
      programs: "Προγράμματα",
      childrenPrograms: "Παιδικά Προγράμματα",
      adultPrograms: "Προγράμματα Ενηλίκων",
      gallery: "Γκαλερί",
      reviews: "Κριτικές",
      aboutUs: "Σχετικά με Εμάς",
      ourTeam: "Η Ομάδα μας",
      ourPartners: "Οι Συνεργάτες μας",
      privacyPolicy: "Πολιτική Απορρήτου",
      termsConditions: "Όροι & Προϋποθέσεις",
      services: "Υπηρεσίες",
      contactUs: "Επικοινωνία",
      leaveFeedback: "Αφήστε Σχόλιο",
      faq: "Συχνές Ερωτήσεις",
      bookEvent: "Κλείστε Εκδήλωση",
      getInTouch: "Επικοινωνήστε",
      followUs: "Ακολουθήστε μας",
      allRightsReserved:
        "© 2025 Joy Events. Όλα τα δικαιώματα διατηρούνται.",
      madeWithLove: "Φτιαγμένο με ❤️ στη Θεσσαλονίκη",
      availableHours: "Διαθέσιμοι 9 π.μ. - 8 μ.μ.",
    },
    uk: {
      tagline:
        "Створюємо чарівні моменти та незабутні свята для дітей та сімей у всіх Салоніках.",
      quickLinks: "Швидкі Посилання",
      programs: "Програми",
      childrenPrograms: "Дитячі Програми",
      adultPrograms: "Програми для Дорослих",
      gallery: "Галерея",
      reviews: "Відгуки",
      aboutUs: "Про Нас",
      ourTeam: "Наша Команда",
      ourPartners: "Наші Партнери",
      privacyPolicy: "Політика Конфіденційності",
      termsConditions: "Умови та Положення",
      services: "Послуги",
      contactUs: "Зв'яжіться з Нами",
      leaveFeedback: "Залишити Відгук",
      faq: "Часті Питання",
      bookEvent: "Забронювати Подію",
      getInTouch: "Зв'яжіться",
      followUs: "Слідкуйте за нами",
      allRightsReserved:
        "© 2025 Joy Events. Всі права захищені.",
      madeWithLove: "Зроблено з ❤️ у Салоніках",
      availableHours: "Доступні 9:00 - 20:00",
    },
  };

  const t =
    translations[
      currentLanguage as keyof typeof translations
    ] || translations.en;

  const handleNavigation = (
    type: "section" | "page",
    target: string,
    extraAction?: () => void,
  ) => {
    if (extraAction) extraAction();

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
    <footer className="bg-[#FFFAF2] border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Company Info */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <button
                onClick={handleLogoClick}
                className="h-[82px] w-[190px] mb-6 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-2 rounded-lg"
                aria-label="Go to home page"
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
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                {t.tagline}
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-[#B26CC5] flex-shrink-0" />
                <span className="text-gray-600 text-sm">
                  Thessaloniki, Greece
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#B26CC5] flex-shrink-0" />
                <a
                  href="tel:+306987451036"
                  className="text-gray-600 hover:text-[#B26CC5] transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-2 rounded px-2 py-1"
                >
                  +30 698 745 1036
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#B26CC5] flex-shrink-0" />
                <a
                  href="mailto:joypartythess@gmail.com"
                  className="text-gray-600 hover:text-[#B26CC5] transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-2 rounded px-2 py-1"
                >
                  joypartythess@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-[#B26CC5] mb-6">
              {t.quickLinks}
            </h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() =>
                    handleNavigation(
                      "section",
                      "programs",
                      () => onSetSelectedAge?.("children515"),
                    )
                  }
                  className="text-gray-600 hover:text-[#B26CC5] transition-colors text-left w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-2 rounded px-2 py-1"
                >
                  {t.childrenPrograms}
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    handleNavigation(
                      "section",
                      "programs",
                      () => onSetSelectedAge?.("adults"),
                    )
                  }
                  className="text-gray-600 hover:text-[#B26CC5] transition-colors text-left w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-2 rounded px-2 py-1"
                >
                  {t.adultPrograms}
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    handleNavigation("section", "gallery")
                  }
                  className="text-gray-600 hover:text-[#B26CC5] transition-colors text-left w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-2 rounded px-2 py-1"
                >
                  {t.gallery}
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    handleNavigation("section", "reviews")
                  }
                  className="text-gray-600 hover:text-[#B26CC5] transition-colors text-left w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-2 rounded px-2 py-1"
                >
                  {t.reviews}
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    handleNavigation("section", "contact")
                  }
                  className="text-gray-600 hover:text-[#B26CC5] transition-colors text-left w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-2 rounded px-2 py-1"
                >
                  {t.bookEvent}
                </button>
              </li>
            </ul>
          </div>

          {/* About & Legal */}
          <div>
            <h4 className="text-lg font-bold text-[#B26CC5] mb-6">
              {t.aboutUs}
            </h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() =>
                    handleNavigation("page", "team")
                  }
                  className="text-gray-600 hover:text-[#B26CC5] transition-colors text-left w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-2 rounded px-2 py-1"
                >
                  {t.ourTeam}
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    handleNavigation("page", "partners")
                  }
                  className="text-gray-600 hover:text-[#B26CC5] transition-colors text-left w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-2 rounded px-2 py-1"
                >
                  {t.ourPartners}
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    handleNavigation("page", "privacy")
                  }
                  className="text-gray-600 hover:text-[#B26CC5] transition-colors text-left w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-2 rounded px-2 py-1"
                >
                  {t.privacyPolicy}
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    handleNavigation("page", "terms")
                  }
                  className="text-gray-600 hover:text-[#B26CC5] transition-colors text-left w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-2 rounded px-2 py-1"
                >
                  {t.termsConditions}
                </button>
              </li>
            </ul>
          </div>

          {/* Services & Support */}
          <div>
            <h4 className="text-lg font-bold text-[#B26CC5] mb-6">
              {t.services}
            </h4>
            <ul className="space-y-3 mb-8">
              <li>
                <button
                  onClick={() =>
                    handleNavigation("section", "contact")
                  }
                  className="text-gray-600 hover:text-[#B26CC5] transition-colors text-left w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-2 rounded px-2 py-1"
                >
                  {t.contactUs}
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    handleNavigation("page", "feedback")
                  }
                  className="text-gray-600 hover:text-[#B26CC5] transition-colors text-left w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-2 rounded px-2 py-1"
                >
                  {t.leaveFeedback}
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    handleNavigation("section", "faq")
                  }
                  className="text-gray-600 hover:text-[#B26CC5] transition-colors text-left w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-2 rounded px-2 py-1"
                >
                  {t.faq}
                </button>
              </li>
            </ul>

            {/* Social Media */}
            <div>
              <h5 className="text-base font-bold text-gray-800 mb-4">
                {t.followUs}
              </h5>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/joy.party_thess"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform group focus:outline-none focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-2"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://www.tiktok.com/@joy.party_thess"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:scale-110 transition-transform group focus:outline-none focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-2"
                  aria-label="Follow us on TikTok"
                >
                  <span className="text-white font-bold text-sm group-hover:scale-110 transition-transform">
                    TT
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 bg-gradient-to-r from-[#FFE366]/5 to-[#B26CC5]/5">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-600 text-sm">
                {t.allRightsReserved}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                {t.madeWithLove}
              </p>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#B26CC5] rounded-full animate-pulse"></div>
                <span className="text-gray-600 text-sm">
                  {t.availableHours}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}