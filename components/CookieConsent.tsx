import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cookie, X, Info } from "lucide-react";
import { Button } from "./ui/button";

interface CookieConsentProps {
  currentLanguage: string;
  onNavigateToPrivacy: () => void;
}

export default function CookieConsent({
  currentLanguage,
  onNavigateToPrivacy,
}: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const hasConsent = localStorage.getItem(
      "joy-events-cookie-consent",
    );
    if (!hasConsent) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const translations = {
    en: {
      cookieTitle: "We use cookies",
      cookieText:
        "We use cookies to improve your experience on our website and analyze traffic. By continuing to browse, you agree to our use of cookies as described in our Privacy Policy.",
      accept: "Accept All",
      decline: "Decline All",
      moreInfo: "More Info",
      privacyPolicy: "Privacy Policy",
    },
    el: {
      cookieTitle: "Χρησιμοποιούμε cookies",
      cookieText:
        "Χρησιμοποιούμε cookies για να βελτιώσουμε την εμπειρία σας στην ιστοσελίδα μας και να αναλύσουμε την κίνηση. Συνεχίζοντας την περιήγηση, συμφωνείτε με τη χρήση cookies όπως περιγράφεται στην Πολιτική Απορρήτου μας.",
      accept: "Αποδοχή Όλων",
      decline: "Απόρριψη Όλων",
      moreInfo: "Περισσότερες Πληροφορίες",
      privacyPolicy: "Πολιτική Απορρήτου",
    },
    uk: {
      cookieTitle: "Ми використовуємо файли cookie",
      cookieText:
        "Ми використовуємо файли cookie для покращення вашого досвіду на нашому веб-сайті та аналізу трафіку. Продовжуючи перегляд, ви погоджуєтеся з нашим використанням файлів cookie, як описано в нашій Політиці Конфіденційності.",
      accept: "Прийняти Все",
      decline: "Відхилити Все",
      moreInfo: "Докладніше",
      privacyPolicy: "Політика Конфіденційності",
    },
  };

  const t =
    translations[
      currentLanguage as keyof typeof translations
    ] || translations.en;

  const handleAccept = () => {
    localStorage.setItem(
      "joy-events-cookie-consent",
      "accepted",
    );
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(
      "joy-events-cookie-consent",
      "declined",
    );
    setIsVisible(false);
  };

  const handleMoreInfo = () => {
    onNavigateToPrivacy();
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-[60] p-4"
        >
          <div className="max-w-6xl mx-auto">
            <div className="bg-white border-2 border-[#B26CC5] rounded-2xl shadow-2xl p-6 relative">
              {/* Dismiss button */}
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                {/* Cookie Icon */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#FFE366] to-[#EEB601] rounded-full flex items-center justify-center">
                    <Cookie className="w-6 h-6 text-[#60266F]" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {t.cookieTitle}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-0">
                    {t.cookieText}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 w-full md:w-auto">
                  <Button
                    onClick={handleMoreInfo}
                    variant="outline"
                    className="w-full sm:w-auto min-h-[40px] h-[40px] border-[#B26CC5] text-[#B26CC5] hover:bg-[#B26CC5] hover:text-white font-medium px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-2"
                  >
                    <Info className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">
                      {t.moreInfo}
                    </span>
                  </Button>

                  <Button
                    onClick={handleDecline}
                    variant="outline"
                    className="w-full sm:w-auto min-h-[40px] h-[40px] border-gray-300 text-gray-600 hover:bg-gray-100 font-medium px-4 py-3 rounded-xl transition-all duration-200"
                  >
                    <span className="truncate">
                      {t.decline}
                    </span>
                  </Button>

                  <Button
                    onClick={handleAccept}
                    className="w-full sm:w-auto min-h-[40px] h-[40px] bg-gradient-to-r from-[#B26CC5] to-[#9C5CB0] hover:from-[#9C5CB0] hover:to-[#B26CC5] text-white font-bold px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <span className="truncate">{t.accept}</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}