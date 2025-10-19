import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone,
  MessageCircle,
  Star,
  Calendar,
  Users,
  Gift,
  ChevronDown,
  Check,
  Globe,
  Eye,
  Mail,
  Copy,
  Menu,
  X,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/ui/accordion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/ui/popover";
import { Logos } from "./components/Logos";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import ProductPage from "./components/ProductPage";
import ProgramDetailsPage from "./components/ProgramDetailsPage";
import PartnersSection from "./components/PartnersSection";
import OurTeam from "./components/OurTeam";
import OurPartners from "./components/OurPartners";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsConditions from "./components/TermsConditions";
import Feedback from "./components/Feedback";
import UnifiedContactForm from "./components/UnifiedContactForm";
import CookieConsent from "./components/CookieConsent";
import TestimonialsCarousel from "./components/TestimonialsCarousel";
import GlobalHeader from "./components/GlobalHeader";
import GlobalFooter from "./components/GlobalFooter";
import Gallery from "./components/Gallery";
import {
  ReviewManager,
  Review,
} from "./components/ReviewManager";

// Import existing Figma assets
import svgPaths from "./imports/svg-khrsp1zhh8";
import imgImage from "figma:asset/6e29e92a98c0b68421ddce991a358e32ae80c6a0.png";
import imgFrame415 from "figma:asset/fcb86a773d8f5683e8ea9f356c76d2a2a4af75b6.png";
import imgFrame416 from "figma:asset/f318e441967413f015640a101bbfe8509afbd941.png";
import imgFrame417 from "figma:asset/2d6d637d7b0bc85c06e4991646a1eaf0bf2067b2.png";
import imgFrame418 from "figma:asset/40e5b4343942a9983efcbaaf3ed389470f29e031.png";
import imgQuality1 from "figma:asset/d514ce0be73e3d6f425b74ea47d7659e38522ea4.png";
import imgCreativity11 from "figma:asset/dc45f608f28c115b68f9209968d31998132543ba.png";
import imgCreativity1 from "figma:asset/01ee32bce027d121c9cbd06dd56d3cb96c733c7a.png";
import imgEllipse1 from "figma:asset/a7c54f4338b2bc704f8002d090420c455158e6fa.png";
import imgEllipse2 from "figma:asset/873c29ee4f49b1eec1feb56ca8968d9f8b9d782d.png";
import imgEllipse3 from "figma:asset/90774ebf4317bb8069bc48a6c7e7b4fdca7bc760.png";
import imgEllipse4 from "figma:asset/ab1930d25d826db90d71d388e67fd89a44ac5168.png";
import imgNewProfile from "figma:asset/73bd802146e6c00358d4051fa4ffc2035cb47263.png";
import exampleImage from "figma:asset/562c5ae45fde3793023de2448b2f11faef33c31d.png";
import contactImage from "figma:asset/d089f21f74e02d9b5221bc0922591f4a8a269a26.png";
import happyKidsImage from "figma:asset/f990c58d50bdfd00ee7dbfc845ab85d9e2da9b2a.png";
import galleryMainImage from "figma:asset/25a06cd89a4f9757f60d536cb8a83d72a18ae934.png";
import specialOfferImage from "figma:asset/6b3c8014358ac2a7962fde01abbfa03b11497193.png";
import thessBalloonsLogo from "figma:asset/f8e629219cfcb09676f509c02db1ecb748995c22.png";
import facePaintingPartnerImage from "figma:asset/3c9b22cd357c47582c70aff9f2ade35fc8888246.png";
import facePaintingImage1 from "figma:asset/e9b0997fc2a80c00d02d10ad59b0f6b2cc3e9e70.png";
import facePaintingImage2 from "figma:asset/958e9bdfcde7e30aa6242072520e3a057ee9f098.png";
import facePaintingImage3 from "figma:asset/dfda9c2282333aaecb4e7206ff96ef21ee64b112.png";

// Import feedback images
import customerFeedback1 from "figma:asset/26a983019163613e881f82f64eaa540061e7800d.png";
import customerFeedback2 from "figma:asset/f31888393d48419be48dfe53f118e1776b3bd999.png";

export default function App() {
  const [selectedAge, setSelectedAge] = useState("children515");
  // Language state with persistence
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("joy-events-language") || "en"
      );
    }
    return "en";
  });

  // Save language preference
  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("joy-events-language", lang);
    }
  };
  const [currentView, setCurrentView] = useState<
    | "home"
    | "product"
    | "program-details"
    | "team"
    | "partners"
    | "privacy"
    | "terms"
    | "feedback"
  >("home");
  const [selectedProgram, setSelectedProgram] =
    useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);
  const [dynamicReviews, setDynamicReviews] = useState<
    Review[]
  >([]);

  // Initialize reviews on app load
  useEffect(() => {
    ReviewManager.initializeDefaultReviews();
    const reviews = ReviewManager.getApprovedReviews();
    setDynamicReviews(reviews);
  }, []);

  // Better hero image for children's parties
  const heroImage =
    "https://images.unsplash.com/photo-1727695034153-ff948d488bb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGJpcnRoZGF5JTIwcGFydHklMjBjZWxlYnJhdGlvbiUyMGNvbG9yZnVsJTIwYmFsbG9vbnN8ZW58MXx8fHwxNzU4MjI0NTE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

  // Language translations
  const translations = {
    en: {
      city: "Thessaloniki",
      programs: "Programs",
      gallery: "Gallery",
      reviews: "Reviews",
      contactUs: "Contact us",
      heroTitle: "Joy Events",
      heroSubtitle:
        "Creating magical moments and unforgettable celebrations for children and families across Thessaloniki.",
      viewPrograms: "View Programs",
      specialOffer: "SPECIAL OFFER!",
      specialOfferText:
        "Book 2 events this month and get 20% off your second booking!",
      claimOffer: "Claim Offer Now!",
      ourPrograms: "Our Programs",
      children515: "Children 5–15",
      adults: "Adults 18+",
      bookNow: "Book Now",
      viewDetails: "View Details",
      whyChooseUs: "Why Choose Us",
      highQuality: "High Quality Service",
      highQualityDesc:
        "Professional entertainers with many years of experience",
      quickOrg: "Fast Organization",
      quickOrgDesc:
        "Quick response and efficient event planning",
      careKids: "We Care About Your Children's Experience",
      careKidsDesc: "Your children's happiness is our mission",
      customersSay: "What Our Families Say",
      bookYourEvent: "Book Your Event",
      faq: "Frequently Asked Questions",
      ourGallery: "Our Gallery",
      getInTouch: "Get In Touch With Us",
      weCanHelp: "We can help you choose",
      yourName: "Your name",
      yourEmail: "Your email",
      chooseDates: "Choose the dates",
      bookDatesNote: "We book dates only for the current year",
      month: "Month",
      day: "Day",
      optionalDay: "Optional day",
      amountKids: "Amount of kids",
      program: "Program",
      programPlaceholder:
        "Do you have something that you liked?",
      send: "Send",
      weekend: "Weekend",
      weekday: "Weekday",
      holiday: "Holiday",
      child: "child",
      children: "children",
      backToHome: "Back to Home",
      contactInformation: "Contact Information",
      sendMessage: "Send us a message",
      copyPhone: "Copy phone number",
      copyEmail: "Copy email",
      // Program names
      spaDay: "SPA Day",
      princessesKingdoms: "Princesses and Kingdoms",
      chemistShow: "Chemist Show",
      harryPotter: "Harry Potter",
      minecraft: "Minecraft",
      tiktokParty: "TikTok Party Day",
      // Program descriptions
      programPrice: "from €120 / up to 3 hours",
      programParticipants: "15+ children",
      programFeature1:
        "1 or 2 entertainers in costumes of favorite characters",
      programFeature2: "Themed mini-show",
      programFeature3: "Fun interactive games",
      programFeature4: "Music and dancing, piñata",
      programFeature5: "Face art (face painting)",
      programNote:
        "Final price and number of entertainers depend on the package chosen",
      // Program detail page content
      recommendedAge: "Recommended age",
      backToPrograms: "Back to Programs",
      // Program detailed descriptions
      spaDay_age: "5–15 years",
      spaDay_description:
        'Children go to a luxurious kids\' SPA salon to relax, take care of themselves, and feel like real stars. The program includes beauty treatments, games, creative workshops, and a final "fashion show."',
      princessesKingdoms_age: "5–15 years",
      princessesKingdoms_description:
        'Children enter a magical kingdom, becoming princesses, knights, and wizards. They pass challenges to earn the title of "Defenders of the Kingdom," take part in a ball, and receive awards.',
      chemistShow_age: "5–18+ years",
      chemistShow_description:
        "Together with a cheerful scientist, children search for a missing ingredient for his experiment. Once it's found, they witness real lab experiments and even get to take part in them.",
      harryPotter_age: "8–18+ years",
      harryPotter_description:
        'Children enter "Hogwarts": get sorted into houses, try potion-making, defense against the dark arts, play Quidditch, and search for hidden treasures.',
      minecraft_age: "10–18+ years",
      minecraft_description:
        'Children dive into the world of Minecraft: they craft their own gear, gather resources, build shelters, fight mobs, and complete a quest to find the "Ender Dragon Egg."',
      tiktokParty_age: "10–18+ years",
      tiktokParty_description:
        "Children take part in creating a trendy TikTok video: filming, choosing outfits, and learning new dance moves. At the end, everyone enjoys lots of fun and receives a bright video memory of the day.",
      // Partners section
      ourPartners: "Our Partners",
      comingSoon: "Coming Soon",
      partnersComingSoon:
        "We're working on exciting partnerships that will bring even more amazing experiences to your events. Stay tuned for updates!",
      partnersDescription:
        "We work with the best local businesses to make your events extraordinary",
      // FAQ section
      faqQuestion1: "How far in advance should we book?",
      faqAnswer1:
        "We recommend booking at least 3 weeks in advance, especially during peak seasons (holidays, summer). However, we sometimes have last-minute availability, so don't hesitate to contact us!",
      faqQuestion2: "Can you customize the event to our theme?",
      faqAnswer2:
        "Absolutely! We love creating custom experiences. Whether it's a specific character, color scheme, or unique theme, our creative team will work with you to bring your vision to life.",
      faqQuestion3:
        "What happens if we need to cancel or reschedule?",
      faqAnswer3:
        "Cancellation policy:\n\nCancellation 14+ days in advance — 100% refund of the deposit / or credit towards a new date.\n\nCancellation less than 7 days in advance — deposit is retained to cover preparation costs.\n\nIf a child gets sick — we always arrange a reschedule with no penalties.",
      faqQuestion4: "Can you organize outdoor events?",
      faqAnswer4:
        "Yes! We organize both indoor and outdoor events. For outdoor events, we bring equipment and have backup plans ready. Just let us know your preferred location!",
      faqQuestion5: "What's included in the price?",
      faqAnswer5:
        "Depending on the package you choose, the price includes different options.",
      faqQuestion6:
        "Where can I find information about the packages?",
      faqAnswer6:
        "You can contact our staff member, and they will provide you with detailed information about the packages.",
      leaveReview: "Leave a review",
      // Adult programs
      cocktailParty: "Cocktail Party",
      wineTasting: "Wine Tasting Event",
      corporateTeamBuilding: "Corporate Team Building",
      dinnerParty: "Dinner Party",
      anniversaryCelebration: "Anniversary Celebration",
      birthdayCelebration: "Birthday Celebration",
      // Adult program descriptions
      cocktailParty_age: "18+ years",
      cocktailParty_description:
        "Professional cocktail party with expert bartender, premium drinks, elegant setup, and sophisticated atmosphere perfect for adult celebrations.",
      wineTasting_age: "21+ years",
      wineTasting_description:
        "Curated wine tasting experience with expert sommelier, premium wine selection, gourmet appetizers, and educational wine pairing sessions.",
      corporateTeamBuilding_age: "18+ years",
      corporateTeamBuilding_description:
        "Professional team building activities designed to strengthen workplace relationships, improve communication, and boost team productivity.",
      dinnerParty_age: "18+ years",
      dinnerParty_description:
        "Elegant dinner party experience with professional catering, sophisticated table setup, ambient lighting, and dedicated service staff.",
      anniversaryCelebration_age: "18+ years",
      anniversaryCelebration_description:
        "Romantic anniversary celebration with beautiful decorations, memory displays, professional photography, and custom romantic atmosphere.",
      birthdayCelebration_age: "18+ years",
      birthdayCelebration_description:
        "Sophisticated adult birthday celebration with themed decorations, entertainment options, premium catering, and professional event coordination.",
    },
    el: {
      city: "Θεσσαλονίκη",
      programs: "Προγράμματα",
      gallery: "Γκαλερί",
      reviews: "Κριτικές",
      contactUs: "Επικοινωνία",
      heroTitle: "Joy Events",
      heroSubtitle:
        "Δημιουργούμε μαγικές στιγμές και αξέχαστες γιορτές για παιδιά και οικογένειες σε όλη τη Θεσσαλονίκη.",
      viewPrograms: "Δείτε Προγράμματα",
      specialOffer: "ΕΙΔΙΚΗ ΠΡΟΣΦΟΡΑ!",
      specialOfferText:
        "Κλείστε 2 εκδηλώσεις αυτό το μήνα και πάρτε 20% έκπτωση στη δεύτερη κράτηση!",
      claimOffer: "*ΔΙΕΚΔΙΚΗΣΤΕ ΤΗΝ ΠΡΟΣΦΟΡΑ!",
      ourPrograms: "Τα Προγράμματά μας",
      children515: "Παιδιά 5–15",
      adults: "Ενήλικες 18+",
      bookNow: "Κλείστε Τώρα",
      viewDetails: "Λεπτομέρειες",
      whyChooseUs: "Γιατί να μας Επιλέξετε",
      highQuality: "Υψηλή Ποιότητα Υπηρεσιών",
      highQualityDesc:
        "Επαγγελματίες διασκεδαστές με πολυετή εμπειρία",
      quickOrg: "Γρήγορη Οργάνωση",
      quickOrgDesc:
        "Γρήγορη απάντηση και αποτελεσματικός σχεδιασμός εκδηλώσεων",
      careKids: "Φροντίζουμε για την Εμπειρία των Παιδιών σας",
      careKidsDesc:
        "Η ευτυχία των παιδιών σας είναι αποστολή μας",
      customersSay: "Τί λένε για μας",
      bookYourEvent: "Κλείστε την Εκδήλωσή σας",
      faq: "Συχνές Ερωτήσεις",
      ourGallery: "Η Γκαλερί μας",
      getInTouch: "Επικοινωνήστε μαζί μας",
      weCanHelp: "Μπορούμε να σας βοηθήσουμε να επιλέξετε",
      yourName: "Το όνομά σας",
      yourEmail: "Το email σας",
      chooseDates: "Επιλέξτε τις ημερομηνίες",
      bookDatesNote:
        "Κλείνουμε ημερομηνίες μόνο για το τρέχον έτος",
      month: "Μήνας",
      day: "Ημέρα",
      optionalDay: "Προαιρετική ημέρα",
      amountKids: "Αριθμός παιδιών",
      program: "Πρόγραμμα",
      programPlaceholder: "Έχετε κάτι που σας άρεσε;",
      send: "Αποστολή",
      weekend: "Σαββατοκύριακο",
      weekday: "Καθημερινή",
      holiday: "Αργία",
      child: "παιδί",
      children: "παιδιά",
      backToHome: "Επιστροφή στην Αρχική",
      contactInformation: "Στοιχεία Επικοινωνίας",
      sendMessage: "Στείλτε μας μήνυμα",
      copyPhone: "Αντιγραφή τηλεφώνου",
      copyEmail: "Αντιγραφή email",
      // Program names
      spaDay: "Ημέρα SPA",
      princessesKingdoms: "Πριγκίπισσες και Βασίλεια",
      chemistShow: "Παράσταση Χημίας",
      harryPotter: "Χάρι Πότερ",
      minecraft: "Minecraft",
      tiktokParty: "TikTok Party Day",
      // Program descriptions
      programPrice: "από €120 / έως 3 ώρες",
      programParticipants: "15+ παιδιά",
      programFeature1:
        "1 ή 2 ανιματέρ με κοστούμια αγαπημένων χαρακτήρων",
      programFeature2: "Θεματική μίνι παράσταση",
      programFeature3: "Διασκεδαστικά διαδραστικά παιχνίδια",
      programFeature4: "Μουσική και χορός, πινιάτα",
      programFeature5: "Ζωγραφική προσώπου",
      programNote:
        "Η τελική τιμή και ο αριθμός των διασκεδαστών εξαρτάται από το πακέτο που επιλέγετε",
      // Program detail page content
      recommendedAge: "Προτεινόμενη ηλικία",
      backToPrograms: "Επιστροφή στα Προγράμματα",
      // Program detailed descriptions
      spaDay_age: "5–15 χρόνια",
      spaDay_description:
        'Τα παιδιά πηγαίνουν σε ένα πολυτελές παιδικό SPA σαλόνι για να χαλαρώσουν, να φροντίσουν τον εαυτό τους και να νιώσουν σαν αληθινά αστέρια. Το πρόγραμμα περιλαμβάνει θεραπείες ομορφιάς, παιχνίδια, δημιουργικά εργαστήρια και ένα τελικό "fashion show."',
      princessesKingdoms_age: "5–15 χρόνια",
      princessesKingdoms_description:
        'Τα παιδιά εισέρχονται σε ένα μαγικό βασίλειο, γίνονται πριγκίπισσες, ιππότες και μάγοι. Περνούν προκλήσεις για να κερδίσουν τον τίτλο "Υπερασπιστές του Βασιλείου," συμμετέχουν σε χορό και λαμβάνουν βραβεία.',
      chemistShow_age: "5–18+ χρόνια",
      chemistShow_description:
        "Μαζί με έναν εύθυμο επιστήμονα, τα παιδιά αναζητούν ένα χαμένο συστατικό για το πείραμά του. Μόλις το βρουν, παρακολουθούν πραγματικά εργαστηριακά πειράματα και μάλιστα συμμετέχουν σε αυτά.",
      harryPotter_age: "8–18+ χρόνια",
      harryPotter_description:
        'Τα παιδιά εισέρχονται στο "Χόγκουαρτς": διαχωρίζονται σε σπίτια, δοκιμάζουν την παρασκευή φίλτρων, την άμυνα κατά των σκοτεινών τεχνών, παίζουν Κουίντιτς και αναζητούν κρυμμένους θησαυρούς.',
      minecraft_age: "10–18+ χρόνια",
      minecraft_description:
        'Τα παιδιά βουτούν στον κόσμο του Minecraft: κατασκευάζουν τον δικό τους εξοπλισμό, συλλέγουν πόρους, χτίζουν καταφύγια, πολεμούν τέρατα και ολοκληρώνουν μια αποστολή για να βρουν το "Αυγό του Ender Dragon."',
      tiktokParty_age: "10–18+ χρόνια",
      tiktokParty_description:
        "Τα παιδιά συμμετέχουν στη δημιουργία ενός μοντέρνου βίντεο TikTok: γυρίσματα, επιλογή ενδυμάτων και εκμάθηση νέων χορευτικών κινήσεων. Στο τέλος, όλοι απολαμβάνουν πολλή διασκέδαση και λαμβάνουν μια φωτεινή βιντεοσκοπημένη ανάμνηση της ημέρας.",
      // Partners section
      ourPartners: "Οι Συνεργάτες μας",
      comingSoon: "Έρχεται Σύντομα",
      partnersComingSoon:
        "Εργαζόμαστε για συναρπαστικές συνεργασίες που θα φέρουν ακόμα πιο καταπληκτικές εμπειρίες στις εκδηλώσεις σας. Μείνετε συντονισμένοι για ενημερώσεις!",
      partnersDescription:
        "Συνεργαζόμαστε με τις καλύτερες τοπικές επιχειρήσεις για να κάνουμε τις εκδηλώσεις σας εξαιρετικές",
      // FAQ section
      faqQuestion1: "Πόσο νωρίς πρέπει να κάνουμε κράτηση;",
      faqAnswer1:
        "Συστήνουμε κράτηση τουλάχιστον 3 εβδομάδες νωρίτερα, ειδικά κατά τις περιόδους αιχμής (διακοπές, καλοκαίρι). Ωστόσο, μερικές φορές έχουμε διαθεσιμότητα τελευταίας στιγμής, οπότε μη διστάσετε να επικοινωνήσετε μαζί μας!",
      faqQuestion2:
        "Μπορείτε να προσαρμόσετε την εκδήλωση στο θέμα μας;",
      faqAnswer2:
        "Απολύτως! Αγαπάμε να δημιουργούμε προσαρμοσμένες εμπειρίες. Είτε πρόκειται για έναν συγκεκριμένο χαρακτήρα, χρωματικό σχήμα ή μοναδικό θέμα, η δημιουργική μας ομάδα θα συνεργαστεί μαζί σας για να φέρει το όραμά σας στη ζωή.",
      faqQuestion3:
        "Τι συμβαίνει αν χριαστεί να ακυρώσουμε ή να αναβάλουμε;",
      faqAnswer3:
        "Πολιτική ακύρωσης:\n\nΑκύρωση 14+ ημέρες νωρίτερα — 100% επιστροφή της προκαταβολής / ή πίστωση για νέα ημερομηνία.\n\nΑκύρωση λιγότερο από 7 ημέρες νωρίτερα — η προκαταβολή κρατείται για να καλύψει τα κόστη προετοιμασίας.\n\nΑν ένα παιδί αρρωστήσει — πάντα οργανώνουμε αναβολή χωρίς ποινές.",
      faqQuestion4:
        "Μπορείτε να οργανώσετε υπαίθριες εκδηλώσεις;",
      faqAnswer4:
        "Ναι! Οργανώνουμε τόσο εσωτερικές όσο και υπαίθριες εκδηλώσεις. Για υπαίθριες εκδηλώσεις, φέρνουμε εξοπλισμό και έχουμε έτοιμα εφεδρικά σχέδια. Απλά ενημερώστε μας για την προτιμώμενη τοποθεσία σας!",
      faqQuestion5: "Τι περιλαμβάνεται στην τιμή;",
      faqAnswer5:
        "Ανάλογα με το πακέτο που επιλέγετε, η τιμή περιλαμβάνει διαφορετικές επιλογές.",
      faqQuestion6:
        "Πού μπορώ να βρω πληροφορίες για τα πακέτα;",
      faqAnswer6:
        "Μπορείτε να επικοινωνήσετε με το μέλος του προσωπικού μας και θα σας παρέχει λεπτομερείς πληροφορίες για τα πακέτα.",
      leaveReview: "Αφήστε μια κριτική",
      // Adult programs
      cocktailParty: "Cocktail Party",
      wineTasting: "Δοκιμή Κρασιού",
      corporateTeamBuilding: "Εταιρική Ομαδοποίηση",
      dinnerParty: "Δείπνο",
      anniversaryCelebration: "Εορτασμός Επετείου",
      birthdayCelebration: "Εορτασμός Γενεθλίων",
      // Adult program descriptions
      cocktailParty_age: "18+ χρόνια",
      cocktailParty_description:
        "Επαγγελματικό cocktail party με ειδικό μπάρμαν, premium ποτά, κομψή διακόσμηση και εκλεπτυσμένη ατμόσφαιρα ιδανική για εορτασμούς ενηλίκων.",
      wineTasting_age: "21+ χρόνια",
      wineTasting_description:
        "Επιμελημένη εμπειρία δοκιμής κρασιού με ειδικό σομελιέ, επιλογή premium κρασιών, γκουρμέ ορεκτικά και εκπαιδευτικές συνεδρίες συνδυασμού κρασιού.",
      corporateTeamBuilding_age: "18+ χρόνια",
      corporateTeamBuilding_description:
        "Επαγγελματικές δραστηριότητες ομαδοποίησης σχεδιασμένες να ενισχύσουν τις σχέσεις στο χώρο εργασίας, να βελτιώσουν την επικοινωνία και να αυξήσουν την παραγωγικότητα της ομάδας.",
      dinnerParty_age: "18+ χρόνια",
      dinnerParty_description:
        "Κομψή εμπειρία δείπνου με επαγγελματικό catering, εκλεπτυσμένη διακόσμηση τραπεζιού, ατμοσφαιρικό φωτισμό και αφιερωμένο προσωπικό εξυπηρέτησης.",
      anniversaryCelebration_age: "18+ χρόνια",
      anniversaryCelebration_description:
        "Ρομαντικός εορτασμός επετείου με όμορφες διακοσμήσεις, προβολή αναμνήσεων, επαγγελματική φωτογράφηση και προσαρμοσμένη ρομαντική ατμόσφαιρα.",
      birthdayCelebration_age: "18+ χρόνια",
      birthdayCelebration_description:
        "Εκλεπτυσμένος εορτασμός γενεθλίων ενηλίκων με θεματικές διακοσμήσεις, επιλογές διασκέδασης, premium catering και επαγγελματικό συντονισμό εκδήλωσης.",
    },
    uk: {
      city: "Салоніки",
      programs: "Програми",
      gallery: "Галерея",
      reviews: "Відгуки",
      contactUs: "Зв'яжіться з нами",
      heroTitle: "Joy Events",
      heroSubtitle:
        "Створюємо чарівні моменти та незабутні свята для дітей та сімей у всіх Салоніках.",
      viewPrograms: "Переглянути Програми",
      specialOffer: "СПЕЦІАЛЬНА ПРОПОЗИЦІЯ!",
      specialOfferText:
        "Забронюйте 2 події цього місяця та отримайте 20% знижки на друге бронювання!",
      claimOffer: "Скористатися Пропозицією!",
      ourPrograms: "Наші Програми",
      children515: "Діти 5–15",
      adults: "Дорослі 18+",
      bookNow: "Забронювати",
      viewDetails: "Деталі",
      whyChooseUs: "Чому Обрати Нас",
      highQuality: "Високоякісний Сервіс",
      highQualityDesc:
        "Професійні аніматори з багаторічним досвідом",
      quickOrg: "Швидка Організація",
      quickOrgDesc:
        "Швидка відповідь та ефективне планування подій",
      careKids: "Ми Турбуємося про Досвід Ваших Дітей",
      careKidsDesc: "Щастя ваших дітей - наша місія",
      customersSay: "Що Кажуть Наші Сім'ї",
      bookYourEvent: "Забронюйте Вашу Подію",
      faq: "Часто Задавані Питання",
      ourGallery: "Наша Галерея",
      getInTouch: "Зв'яжіться з Нами",
      weCanHelp: "Ми можемо допомогти вам обрати",
      yourName: "Ваше ім'я",
      yourEmail: "Ваш email",
      chooseDates: "Оберіть дати",
      bookDatesNote: "Ми бронюємо дати лише на поточний рік",
      month: "Місяць",
      day: "День",
      optionalDay: "Додатковий день",
      amountKids: "Кількість дітей",
      program: "Програма",
      programPlaceholder: "Чи є щось, що вам сподобалося?",
      send: "Відправити",
      weekend: "Вихідні",
      weekday: "Будній день",
      holiday: "Свято",
      child: "дитина",
      children: "дітей",
      backToHome: "Повернутися Додому",
      contactInformation: "Контактна Інформація",
      sendMessage: "Надішліть нам повідомлення",
      copyPhone: "Скопіювати номер телефону",
      copyEmail: "Скопіювати email",
      // Program names
      spaDay: "SPA День",
      princessesKingdoms: "Принцеси та Королівства",
      chemistShow: "Хімічне Шоу",
      harryPotter: "Гаррі Поттер",
      minecraft: "Майнкрафт",
      tiktokParty: "TikTok Вечірка",
      // Program descriptions
      programPrice: "від €120 / до 3 годин",
      programParticipants: "15+ дітей",
      programFeature1:
        "1 або 2 аніматори в костюмах улюблених персонажів",
      programFeature2: "Тематичне міні-шоу",
      programFeature3: "Веселі інтерактивні ігри",
      programFeature4: "Музика та танці, піньята",
      programFeature5: "Розфарбування обличчя",
      programNote:
        "Остаточна ціна та кількість аніматорів залежить від обраного пакету",
      // Program detail page content
      recommendedAge: "Рекомендований вік",
      backToPrograms: "Повернутися до Програм",
      // Program detailed descriptions
      spaDay_age: "5–15 років",
      spaDay_description:
        'Діти йдуть до розкішного дитячого SPA салону, щоб розслабитися, подбати про себе та відчути себе справжніми зірками. Програма включає косметичні процедури, ігри, творчі майстер-класи та фінальне "модне шоу."',
      princessesKingdoms_age: "5–15 років",
      princessesKingdoms_description:
        'Діти потрапляють у чарівне королівство, стаючи принцесами, лицарями та чарівниками. Вони проходять випробування, щоб отримати звання "Захисники Королівства," беруть участь у балу та отримують нагороди.',
      chemistShow_age: "5–18+ років",
      chemistShow_description:
        "Разом із веселим ученим діти шукають загублений інгредієнт для його експерименту. Коли його знаходять, вони стають свідками справжніх лабораторних експериментів і навіть беруть у них участь.",
      harryPotter_age: "8–18+ років",
      harryPotter_description:
        'Діти потрапляють до "Гоґвортсу": їх розподіляють на факультети, вони пробують варити зілля, захищатися від темних мистецтв, грають у квідич та шукають приховані скарби.',
      minecraft_age: "10–18+ років",
      minecraft_description:
        'Діти занурюються у світ Майнкрафту: створюють своє спорядження, збирають ресурси, будують укриття, борються з монстрами та виконують квест знайти "Яйце Дракона Енду."',
      tiktokParty_age: "10–18+ років",
      tiktokParty_description:
        "Діти беруть участь у створенні модного відео TikTok: зйомки, вібор одягу та вивчення нових танцювальних рухів. Наприкінці всі отримують масу задоволення та яскраве відео на пам'ять про день.",
      // Partners section
      ourPartners: "Наші Партнери",
      comingSoon: "Незабаром",
      partnersComingSoon:
        "Ми працюємо над захоплюючими партнерствами, які принесуть ще більше дивовижних вражень на ваші заходи. Слідкуйте за оновленнями!",
      partnersDescription:
        "Ми співпрацюємо з найкращими місцевими підприємствами, щоб зробити ваші події надзвичайними",
      // FAQ section
      faqQuestion1: "За скільки часу наперед слід бронювати?",
      faqAnswer1:
        "Ми рекомендуємо бронювати принаймні за 3 тижні наперед, особливо в пікові сезони (свята, літо). Проте, іноді у нас є доступність в останню хвилину, тому не соромтеся звертатися до нас!",
      faqQuestion2:
        "Чи можете ви налаштувати подію під нашу тему?",
      faqAnswer2:
        "Звичайно! Ми любимо створювати індивідуальні враження. Будь то конкретний персонаж, колірна схема або унікальна тема, наша творча команда працюватиме з вами, щоб втілити ваше бачення в життя.",
      faqQuestion3:
        "Що відбувається, якщо нам потрібно скасувати або перенести?",
      faqAnswer3:
        "Політика скасування:\n\nСкасування за 14+ днів наперед — 100% повернення депозиту / або кредит на нову дату.\n\nСкасування менше ніж за 7 днів наперед — депозит утримується для покриття витрат на підготовку.\n\nЯкщо дитина захворіла — ми завжди організовуємо перенесення без штрафів.",
      faqQuestion4:
        "Чи можете ви організувати заходи на відкритому повітрі?",
      faqAnswer4:
        "Так! Ми організовуємо як закриті, так і відкриті заходи. Для заходів на відкритому повітрі ми приносимо обладнання та маємо готові резервні плани. Просто повідомте нам про вашу бажану локацію!",
      faqQuestion5: "Що включено в ціну?",
      faqAnswer5:
        "Залежно від пакету, який ви обираєте, ціна включає різні опції.",
      faqQuestion6: "Де я можу знайти інформацію про пакети?",
      faqAnswer6:
        "Ви можете звернутися до нашого співробітника, і він надасть вам детальну інформацію про пакети.",
      leaveReview: "Залишити відгук",
      // Adult programs
      cocktailParty: "Коктейльна Вечірка",
      wineTasting: "Дегустація Вин",
      corporateTeamBuilding: "Корпоративний Тімбілдинг",
      dinnerParty: "Обідня Вечірка",
      anniversaryCelebration: "Святкування Річниці",
      birthdayCelebration: "Святкування Дня Народження",
      // Adult program descriptions
      cocktailParty_age: "18+ років",
      cocktailParty_description:
        "Професійна коктейльна вечірка з експертним барменом, преміум напоями, елегантним оформленням та витонченою атмосферою ідеальною для святкувань дорослих.",
      wineTasting_age: "21+ років",
      wineTasting_description:
        "Курована дегустація вин з експертним сомельє, вибором преміум вин, гурманськими закусками та освітніми сесіями поєднання вин.",
      corporateTeamBuilding_age: "18+ років",
      corporateTeamBuilding_description:
        "Професійні заходи тімбілдингу, розроблені для зміцнення відносин на робочому місці, покращення комунікації та підвищення продуктивності команди.",
      dinnerParty_age: "18+ років",
      dinnerParty_description:
        "Елегантна обідня вечірка з професійним кейтерингом, витонченим сервіруванням столу, атмосферним освітленням та спеціальним обслуговуючим персоналом.",
      anniversaryCelebration_age: "18+ років",
      anniversaryCelebration_description:
        "Романтичне святкування річниці з красивими прикрасами, виставкою спогадів, професійною фотографією та індивідуальною романтичною атмосферою.",
      birthdayCelebration_age: "18+ років",
      birthdayCelebration_description:
        "Витончене святкування дня народження для дорослих з тематичними прикрасами, варіантами розваг, преміум кейтерингом та професійною координацією заходу.",
    },
  };

  const t =
    translations[currentLanguage as keyof typeof translations];

  // Helper function to get program data by language
  const getProgramData = (
    keyPrefix: string,
    currentLang: string,
  ) => {
    const lang = currentLang as keyof typeof translations;
    return {
      price: translations[lang].programPrice,
      participants: translations[lang].programParticipants,
      features: [
        translations[lang].programFeature1,
        translations[lang].programFeature2,
        translations[lang].programFeature3,
        translations[lang].programFeature4,
        translations[lang].programFeature5,
      ],
      note: translations[lang].programNote,
    };
  };

  // Helper function to get program key for detailed descriptions
  const getProgramKey = (programTitle: string) => {
    const titleMap: { [key: string]: string } = {
      [t.spaDay]: "spaDay",
      [t.princessesKingdoms]: "princessesKingdoms",
      [t.chemistShow]: "chemistShow",
      [t.harryPotter]: "harryPotter",
      [t.minecraft]: "minecraft",
      [t.tiktokParty]: "tiktokParty",
      [t.cocktailParty]: "cocktailParty",
      [t.wineTasting]: "wineTasting",
      [t.corporateTeamBuilding]: "corporateTeamBuilding",
      [t.dinnerParty]: "dinnerParty",
      [t.anniversaryCelebration]: "anniversaryCelebration",
      [t.birthdayCelebration]: "birthdayCelebration",
    };
    return titleMap[programTitle] || "spaDay";
  };

  // Programs data organized by age group
  const programsByAge = {
    children515: [
      {
        id: 1,
        title: t.spaDay,
        duration: t.programPrice,
        ageRange: `${t.recommendedAge}: ${t.spaDay_age}`,
        image:
          "https://images.unsplash.com/photo-1597075958693-75173d1c837f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHNwYSUyMGRheSUyMHJlbGF4YXRpb24lMjBwYXJ0eXxlbnwxfHx8fDE3NTg5ODgwODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        features: [
          t.programFeature1,
          t.programFeature2,
          t.programFeature3,
          t.programFeature4,
          t.programFeature5,
        ],
        recommendedAge: t.spaDay_age,
        fullDescription: t.spaDay_description,
        programKey: "spaDay",
      },
      {
        id: 2,
        title: t.princessesKingdoms,
        duration: t.programPrice,
        ageRange: `${t.recommendedAge}: ${t.princessesKingdoms_age}`,
        image:
          "https://images.unsplash.com/photo-1694083884221-d23d8b1a83b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmluY2VzcyUyMGtpbmdkb20lMjBwYXJ0eSUyMGNoaWxkcmVuJTIwY29zdHVtZXN8ZW58MXx8fHwxNzU4OTg4MDg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        features: [
          t.programFeature1,
          t.programFeature2,
          t.programFeature3,
          t.programFeature4,
          t.programFeature5,
        ],
        recommendedAge: t.princessesKingdoms_age,
        fullDescription: t.princessesKingdoms_description,
        programKey: "princessesKingdoms",
      },
      {
        id: 3,
        title: t.chemistShow,
        duration: t.programPrice,
        ageRange: `${t.recommendedAge}: ${t.chemistShow_age}`,
        image:
          "https://images.unsplash.com/photo-1613271752699-ede48a285196?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVtaXN0cnklMjBzY2llbmNlJTIwZXhwZXJpbWVudCUyMGNoaWxkcmVuJTIwc2hvd3xlbnwxfHx8fDE3NTg5ODgwODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        features: [
          t.programFeature1,
          t.programFeature2,
          t.programFeature3,
          t.programFeature4,
          t.programFeature5,
        ],
        recommendedAge: t.chemistShow_age,
        fullDescription: t.chemistShow_description,
        programKey: "chemistShow",
      },
      {
        id: 4,
        title: t.harryPotter,
        duration: t.programPrice,
        ageRange: `${t.recommendedAge}: ${t.harryPotter_age}`,
        image:
          "https://images.unsplash.com/photo-1753164726456-487d6c6d1f9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXJyeSUyMHBvdHRlciUyMG1hZ2ljJTIwcGFydHklMjBjaGlsZHJlbnxlbnwxfHx8fDE3NTg5ODgwODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        features: [
          t.programFeature1,
          t.programFeature2,
          t.programFeature3,
          t.programFeature4,
          t.programFeature5,
        ],
        recommendedAge: t.harryPotter_age,
        fullDescription: t.harryPotter_description,
        programKey: "harryPotter",
      },
      {
        id: 5,
        title: t.minecraft,
        duration: t.programPrice,
        ageRange: `${t.recommendedAge}: ${t.minecraft_age}`,
        image:
          "https://images.unsplash.com/photo-1725439507649-dd6345bf9c7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5lY3JhZnQlMjBwYXJ0eSUyMGdhbWluZyUyMGNoaWxkcmVuJTIwYmlydGhkYXl8ZW58MXx8fHwxNzU4OTg4MDg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        features: [
          t.programFeature1,
          t.programFeature2,
          t.programFeature3,
          t.programFeature4,
          t.programFeature5,
        ],
        recommendedAge: t.minecraft_age,
        fullDescription: t.minecraft_description,
        programKey: "minecraft",
      },
      {
        id: 6,
        title: t.tiktokParty,
        duration: t.programPrice,
        ageRange: `${t.recommendedAge}: ${t.tiktokParty_age}`,
        image:
          "https://images.unsplash.com/photo-1645730826845-cd2ddec9984f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aWt0b2slMjBkYW5jZSUyMHBhcnR5JTIwdGVlbmFnZXJzJTIwc29jaWFsJTIwbWVkaWF8ZW58MXx8fHwxNzU4OTg4MDg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        features: [
          t.programFeature1,
          t.programFeature2,
          t.programFeature3,
          t.programFeature4,
          t.programFeature5,
        ],
        recommendedAge: t.tiktokParty_age,
        fullDescription: t.tiktokParty_description,
        programKey: "tiktokParty",
      },
    ],
    adults: [
      {
        id: 15,
        title: t.cocktailParty,
        duration: "4-6 hours event",
        ageRange: `${t.recommendedAge}: ${t.cocktailParty_age}`,
        image:
          "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHVsdCUyMGNvY2t0YWlsJTIwcGFydHklMjBldmVudHxlbnwxfHx8fDE3NTg5MDk1MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        features: [
          "Professional bartender",
          "Premium cocktails",
          "Elegant setup",
          "Background music",
        ],
        recommendedAge: t.cocktailParty_age,
        fullDescription: t.cocktailParty_description,
        programKey: "cocktailParty",
      },
      {
        id: 16,
        title: t.wineTasting,
        duration: "3-4 hours event",
        ageRange: `${t.recommendedAge}: ${t.wineTasting_age}`,
        image:
          "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwdGFzdGluZyUyMGV2ZW50JTIwYWR1bHR8ZW58MXx8fHwxNzU4OTA5NTA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        features: [
          "Curated wine selection",
          "Expert sommelier",
          "Cheese & appetizers",
          "Educational experience",
        ],
        recommendedAge: t.wineTasting_age,
        fullDescription: t.wineTasting_description,
        programKey: "wineTasting",
      },
      {
        id: 17,
        title: t.corporateTeamBuilding,
        duration: "Half/Full day",
        ageRange: `${t.recommendedAge}: ${t.corporateTeamBuilding_age}`,
        image:
          "https://images.unsplash.com/photo-1552664688-cf412ec27db2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjB0ZWFtJTIwYnVpbGRpbmclMjBldmVudHxlbnwxfHx8fDE3NTg5MDk1MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        features: [
          "Team activities",
          "Professional facilitator",
          "Catering options",
          "Venue coordination",
        ],
        recommendedAge: t.corporateTeamBuilding_age,
        fullDescription: t.corporateTeamBuilding_description,
        programKey: "corporateTeamBuilding",
      },
      {
        id: 18,
        title: t.dinnerParty,
        duration: "4-6 hours event",
        ageRange: `${t.recommendedAge}: ${t.dinnerParty_age}`,
        image:
          "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHVsdCUyMGRpbm5lciUyMHBhcnR5JTIwZWxlZ2FudHxlbnwxfHx8fDE3NTg5MDk1MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        features: [
          "Elegant table setup",
          "Professional catering",
          "Ambient lighting",
          "Service staff",
        ],
        recommendedAge: t.dinnerParty_age,
        fullDescription: t.dinnerParty_description,
        programKey: "dinnerParty",
      },
      {
        id: 19,
        title: t.anniversaryCelebration,
        duration: "4-8 hours event",
        ageRange: `${t.recommendedAge}: ${t.anniversaryCelebration_age}`,
        image:
          "https://images.unsplash.com/photo-1519225421980-715cb0215aed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbm5pdmVyc2FyeSUyMGNlbGVicmF0aW9uJTIwcGFydHl8ZW58MXx8fHwxNzU4OTA5NTA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        features: [
          "Romantic decorations",
          "Memory displays",
          "Professional photography",
          "Custom menu",
        ],
        recommendedAge: t.anniversaryCelebration_age,
        fullDescription: t.anniversaryCelebration_description,
        programKey: "anniversaryCelebration",
      },
      {
        id: 20,
        title: t.birthdayCelebration,
        duration: "3-6 hours event",
        ageRange: `${t.recommendedAge}: ${t.birthdayCelebration_age}`,
        image:
          "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHVsdCUyMGJpcnRoZGF5JTIwY2VsZWJyYXRpb24lMjBwYXJ0eXxlbnwxfHx8fDE3NTg5MDk1MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        features: [
          "Themed decorations",
          "Entertainment options",
          "Catering service",
          "Professional coordination",
        ],
        recommendedAge: t.birthdayCelebration_age,
        fullDescription: t.birthdayCelebration_description,
        programKey: "birthdayCelebration",
      },
    ],
  };

  const faqData = [
    {
      question: t.faqQuestion1,
      answer: t.faqAnswer1,
    },
    {
      question: t.faqQuestion2,
      answer: t.faqAnswer2,
    },
    {
      question: t.faqQuestion3,
      answer: t.faqAnswer3,
    },
    {
      question: t.faqQuestion4,
      answer: t.faqAnswer4,
    },
    {
      question: t.faqQuestion5,
      answer: t.faqAnswer5,
    },
    {
      question: t.faqQuestion6,
      answer: t.faqAnswer6,
    },
  ];

  const scrollToSection = (sectionId: string) => {
    // If we're not on home page, go to home first then scroll
    if (currentView !== "home") {
      setCurrentView("home");
      setSelectedProgram(null);
      // Use setTimeout to allow page to change before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const viewProgramDetails = (program: any) => {
    setSelectedProgram(program);
    setCurrentView("program-details");
    window.scrollTo(0, 0);
  };

  const goBackToHome = () => {
    setCurrentView("home");
    setSelectedProgram(null);
    window.scrollTo(0, 0);
  };

  const navigateToPage = (
    page:
      | "home"
      | "product"
      | "program-details"
      | "team"
      | "partners"
      | "privacy"
      | "terms"
      | "feedback",
  ) => {
    setCurrentView(page);
    setSelectedProgram(null);
    window.scrollTo(0, 0);
  };

  if (currentView === "product" && selectedProgram) {
    return (
      <AnimatePresence mode="wait">
        <ProductPage
          key="product-page"
          program={selectedProgram}
          onBack={goBackToHome}
          currentLanguage={currentLanguage}
          setCurrentLanguage={setCurrentLanguage}
          onNavigateToSection={scrollToSection}
        />
      </AnimatePresence>
    );
  }

  if (currentView === "program-details" && selectedProgram) {
    return (
      <AnimatePresence mode="wait">
        <ProgramDetailsPage
          key="program-details-page"
          program={selectedProgram}
          onBack={goBackToHome}
          currentLanguage={currentLanguage}
          setCurrentLanguage={handleLanguageChange}
          onNavigateToSection={scrollToSection}
          onNavigateToPage={navigateToPage}
        />
      </AnimatePresence>
    );
  }

  if (currentView === "team") {
    return (
      <AnimatePresence mode="wait">
        <OurTeam
          key="team-page"
          onBack={goBackToHome}
          currentLanguage={currentLanguage}
          setCurrentLanguage={handleLanguageChange}
          onNavigateToSection={scrollToSection}
          onNavigateToPage={navigateToPage}
        />
      </AnimatePresence>
    );
  }

  if (currentView === "partners") {
    return (
      <AnimatePresence mode="wait">
        <OurPartners
          key="partners-page"
          onBack={goBackToHome}
          currentLanguage={currentLanguage}
          setCurrentLanguage={handleLanguageChange}
          onNavigateToSection={scrollToSection}
          onNavigateToPage={navigateToPage}
        />
      </AnimatePresence>
    );
  }

  if (currentView === "privacy") {
    return (
      <AnimatePresence mode="wait">
        <PrivacyPolicy
          key="privacy-page"
          onBack={goBackToHome}
          currentLanguage={currentLanguage}
          setCurrentLanguage={handleLanguageChange}
          onNavigateToSection={scrollToSection}
          onNavigateToPage={navigateToPage}
        />
      </AnimatePresence>
    );
  }

  if (currentView === "terms") {
    return (
      <AnimatePresence mode="wait">
        <TermsConditions
          key="terms-page"
          onBack={goBackToHome}
          currentLanguage={currentLanguage}
          setCurrentLanguage={handleLanguageChange}
          onNavigateToSection={scrollToSection}
          onNavigateToPage={navigateToPage}
        />
      </AnimatePresence>
    );
  }

  if (currentView === "feedback") {
    return (
      <AnimatePresence mode="wait">
        <Feedback
          key="feedback-page"
          onBack={goBackToHome}
          currentLanguage={currentLanguage}
          setCurrentLanguage={handleLanguageChange}
          onNavigateToSection={scrollToSection}
          onNavigateToPage={navigateToPage}
        />
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="home-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen bg-[#FFFAF2]"
      >
        <GlobalHeader
          currentLanguage={currentLanguage}
          setCurrentLanguage={handleLanguageChange}
          onNavigateToSection={scrollToSection}
          onNavigateToPage={navigateToPage}
        />

        {/* Hero Section */}
        <section className="relative">
          <div className="h-[700px] relative rounded-[40px] mx-6 mt-6 overflow-hidden shadow-2xl">
            <div
              className="absolute inset-0 bg-gradient-to-br from-black/40 via-purple-900/30 to-pink-900/40"
              style={{
                backgroundImage: `url('${heroImage}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20"
              >
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-6xl md:text-8xl font-black mb-8 text-white drop-shadow-2xl"
                  style={{
                    fontFamily: "Bowlby One SC, sans-serif",
                    textShadow:
                      "4px 4px 8px rgba(0,0,0,0.8), 0 0 20px rgba(255,227,102,0.5)",
                  }}
                >
                  {t.heroTitle}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-xl md:text-2xl mb-8 max-w-3xl font-bold text-white bg-black/20 backdrop-blur-sm rounded-2xl px-6 py-4"
                >
                  {t.heroSubtitle}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="w-full max-w-md mx-auto"
                >
                  <Button
                    onClick={() => scrollToSection("programs")}
                    size="lg"
                    className="w-full sm:w-auto min-h-[60px] h-[60px] bg-gradient-to-r from-[#FFE366] to-[#EEB601] text-[#60266F] hover:from-[#EEB601] hover:to-[#FFE366] text-xl sm:text-2xl font-black px-8 sm:px-12 py-3 sm:py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
                    style={{
                      fontFamily: "Bowlby One SC, sans-serif",
                    }}
                  >
                    {t.viewPrograms}
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            {/* Floating elements */}
            <div
              className="absolute top-20 left-20 w-8 h-8 bg-[#FFE366] rounded-full opacity-80 animate-bounce"
              style={{ animationDelay: "0s" }}
            />
            <div
              className="absolute top-40 right-32 w-6 h-6 bg-[#B26CC5] rounded-full opacity-80 animate-bounce"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute bottom-32 left-40 w-4 h-4 bg-[#FFE366] rounded-full opacity-80 animate-bounce"
              style={{ animationDelay: "2s" }}
            />
          </div>
        </section>

        {/* Special Offer Section */}
        <section className="py-16 px-6 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
            >
              {/* Left Column - Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center lg:text-left space-y-6"
              >
                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-800 leading-tight uppercase tracking-wider"
                  style={{
                    fontFamily: "Bowlby One SC, sans-serif",
                  }}
                >
                  {t.specialOffer}
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-lg mx-auto lg:mx-0"
                  style={{ lineHeight: "1.6" }}
                >
                  {t.specialOfferText}
                </motion.p>

                {/* Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="pt-4"
                >
                  <Button
                    onClick={() => scrollToSection("contact")}
                    className="w-full sm:w-auto min-h-[50px] h-[50px] bg-gray-900 hover:bg-gray-800 text-white font-bold text-lg px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 uppercase tracking-wide"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {t.claimOffer}
                  </Button>
                </motion.div>
              </motion.div>

              {/* Right Column - Image */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                <div className="relative max-w-lg mx-auto lg:max-w-none">
                  {/* Main Image Container */}
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 group">
                    <ImageWithFallback
                      src={specialOfferImage}
                      alt="Special Offer"
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Subtle overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Decorative elements */}
                  <motion.div
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="absolute -top-4 -right-4 w-16 h-16 bg-[#FFE366] rounded-full flex items-center justify-center shadow-xl border-4 border-white z-10"
                  >
                    <Gift className="w-8 h-8 text-[#60266F]" />
                  </motion.div>

                  <motion.div
                    animate={{
                      y: [-5, 5, -5],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="absolute -bottom-4 -left-4 w-12 h-12 bg-[#B26CC5] rounded-full flex items-center justify-center shadow-lg border-3 border-white z-10"
                  >
                    <Star className="w-6 h-6 text-white" />
                  </motion.div>

                  {/* Background decoration */}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#FFE366]/20 to-[#B26CC5]/20 rounded-3xl transform rotate-3 scale-105"></div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Programs Section */}
        <section id="programs" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-black text-center mb-16 text-gray-800"
              style={{
                fontFamily: "Bowlby One SC, sans-serif",
              }}
            >
              {t.ourPrograms}
            </motion.h2>

            {/* Age Group Tabs */}
            <div className="flex justify-center mb-12">
              {/* Desktop version - unified container */}
              <div className="hidden sm:block">
                <div className="bg-white rounded-full p-2 shadow-xl border border-gray-100">
                  {[
                    {
                      key: "children515",
                      label: t.children515,
                      color: "#FFE366",
                    },
                    {
                      key: "adults",
                      label: t.adults,
                      color: "#B26CC5",
                    },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setSelectedAge(tab.key)}
                      className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 ${
                        selectedAge === tab.key
                          ? "text-[#60266F] shadow-lg transform scale-105"
                          : "text-gray-600 hover:text-[#60266F] hover:scale-102"
                      }`}
                      style={{
                        backgroundColor:
                          selectedAge === tab.key
                            ? tab.color
                            : "transparent",
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile version - separate buttons */}
              <div className="flex sm:hidden gap-3 w-full max-w-md px-4">
                {[
                  {
                    key: "children515",
                    label: t.children515,
                    color: "#FFE366",
                  },
                  {
                    key: "adults",
                    label: t.adults,
                    color: "#B26CC5",
                  },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setSelectedAge(tab.key)}
                    className={`flex-1 px-4 py-4 rounded-2xl font-bold text-base transition-all duration-300 shadow-lg border-2 ${
                      selectedAge === tab.key
                        ? "text-[#60266F] shadow-xl transform scale-105 border-white"
                        : "text-gray-600 hover:text-[#60266F] hover:scale-102 bg-white border-gray-200"
                    }`}
                    style={{
                      backgroundColor:
                        selectedAge === tab.key
                          ? tab.color
                          : undefined,
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Programs Grid */}
            <motion.div
              key={selectedAge}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {programsByAge[
                selectedAge as keyof typeof programsByAge
              ].map((program) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: (program.id % 10) * 0.1,
                  }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="h-full"
                >
                  <Card className="h-full flex flex-col border-2 border-[#60266F] rounded-3xl overflow-hidden hover:shadow-2xl hover:border-[#FFE366] transition-all duration-300 group bg-gradient-to-br from-white to-gray-50">
                    <div className="relative overflow-hidden">
                      <ImageWithFallback
                        src={program.image}
                        alt={program.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <CardContent className="p-6 flex flex-col flex-grow">
                      <h3 className="text-2xl font-black text-gray-800 mb-2 group-hover:text-[#B26CC5] transition-colors duration-200">
                        {program.title}
                      </h3>
                      <p className="text-gray-600 mb-1 font-medium">
                        {program.duration}
                      </p>
                      <p className="text-gray-600 mb-4 font-light">
                        {program.ageRange}
                      </p>
                      <ul className="space-y-2 mb-4 flex-grow">
                        {program.features
                          .slice(0, 3)
                          .map((feature, index) => (
                            <li
                              key={index}
                              className="flex items-center text-sm"
                            >
                              <Check className="w-4 h-4 text-[#B26CC5] mr-2 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                      </ul>
                      <div className="mb-6 p-3 bg-gradient-to-r from-[#FFE366]/10 to-[#B26CC5]/10 rounded-xl border border-[#B26CC5]/20">
                        <p className="text-xs text-gray-600 text-center italic">
                          {t.programNote}
                        </p>
                      </div>
                      <div className="space-y-3 mt-auto">
                        <Button
                          onClick={() =>
                            viewProgramDetails(program)
                          }
                          variant="outline"
                          className="w-full min-h-[40px] h-[40px] border-[#B26CC5] text-[#B26CC5] hover:bg-[#B26CC5] hover:text-white font-bold px-4 py-3 rounded-2xl transition-all duration-200"
                        >
                          <Eye className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span className="truncate">
                            {t.viewDetails}
                          </span>
                        </Button>
                        <Button
                          onClick={() =>
                            scrollToSection("contact")
                          }
                          className="w-full min-h-[40px] h-[40px] bg-gradient-to-r from-[#B26CC5] to-[#9C5CB0] hover:from-[#9C5CB0] hover:to-[#B26CC5] text-white font-bold px-4 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                          <span className="truncate">
                            {t.bookNow}
                          </span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-black text-center mb-16 text-gray-800"
              style={{
                fontFamily: "Bowlby One SC, sans-serif",
              }}
            >
              {t.ourPartners}
            </motion.h2>

            {/* Partners Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <p className="text-xl text-gray-700 leading-relaxed font-medium max-w-3xl mx-auto">
                {t.partnersDescription}
              </p>
            </motion.div>

            {/* Partners Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Thess Balloons Partner */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <div className="bg-white rounded-3xl p-8 border-2 border-[#B26CC5] shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-[#FFE366] group-hover:scale-105 transform">
                  <div className="relative mb-6">
                    <div className="w-40 h-40 mx-auto bg-white rounded-2xl flex items-center justify-center p-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <ImageWithFallback
                        src={thessBalloonsLogo}
                        alt="Thess Balloons - Κάθε Μπαλόνι Ένα Χαμόγελο"
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    {/* Decorative element */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#FFE366] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                      <Star className="w-4 h-4 text-[#60266F]" />
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-2xl font-black text-gray-800 mb-2 group-hover:text-[#B26CC5] transition-colors duration-200">
                      Thess Balloons
                    </h3>
                    <p className="text-gray-600 font-medium mb-4">
                      {currentLanguage === "el"
                        ? "Κάθε Μπαλόνι Ένα Χαμόγελο"
                        : currentLanguage === "uk"
                          ? "Кожна Кулька - Посмішка"
                          : "Every Balloon A Smile"}
                    </p>
                    <div className="flex items-center justify-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-[#FFE366] fill-current"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Face Painting Partner */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <div className="bg-white rounded-3xl p-8 border-2 border-[#B26CC5] shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-[#FFE366] group-hover:scale-105 transform">
                  <div className="relative mb-6">
                    <div className="w-40 h-40 mx-auto bg-white rounded-2xl flex items-center justify-center p-2 shadow-lg group-hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <ImageWithFallback
                        src={facePaintingPartnerImage}
                        alt="Professional Face Painting - Creative Designs for Kids"
                        className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    {/* Decorative element */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#FFE366] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                      <Star className="w-4 h-4 text-[#60266F]" />
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-2xl font-black text-gray-800 mb-2 group-hover:text-[#B26CC5] transition-colors duration-200">
                      {currentLanguage === "el"
                        ? "Face Painting"
                        : currentLanguage === "uk"
                          ? "Розмалювання Обличчя"
                          : "Face Painting"}
                    </h3>
                    <p className="text-gray-600 font-medium mb-4">
                      {currentLanguage === "el"
                        ? "Επαγγελματική Ζωγραφική Προσώπου"
                        : currentLanguage === "uk"
                          ? "П��офесійне Розмалювання Обличчя"
                          : "Professional Face Painting Services"}
                    </p>
                    <div className="flex items-center justify-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-[#FFE366] fill-current"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Coming Soon Slot */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 border-2 border-dashed border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#B26CC5] group-hover:from-[#FFE366]/10 group-hover:to-[#B26CC5]/10 min-h-[280px] flex flex-col justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center shadow-lg group-hover:from-[#FFE366] group-hover:to-[#EEB601] transition-all duration-300">
                      <Gift className="w-10 h-10 text-gray-400 group-hover:text-[#60266F] transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-500 mb-4 group-hover:text-[#B26CC5] transition-colors duration-200">
                      {t.comingSoon}
                    </h3>
                    <p className="text-gray-400 text-sm group-hover:text-gray-600 transition-colors duration-200">
                      {currentLanguage === "el"
                        ? "Νέος συνεργάτης σύντομα"
                        : currentLanguage === "uk"
                          ? "Новий партнер незабаром"
                          : "New partner soon"}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-white to-gray-50">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-black text-center mb-16 text-gray-800"
              style={{
                fontFamily: "Bowlby One SC, sans-serif",
              }}
            >
              {t.whyChooseUs}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  image: imgQuality1,
                  title: t.highQuality,
                  description: t.highQualityDesc,
                },
                {
                  image: imgCreativity11,
                  title: t.quickOrg,
                  description: t.quickOrgDesc,
                },
                {
                  image: imgCreativity1,
                  title: t.careKids,
                  description: t.careKidsDesc,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="text-center group h-full flex flex-col"
                >
                  <div className="w-56 h-56 mx-auto mb-6 rounded-full overflow-hidden bg-gradient-to-br from-[#FFE366] to-[#EEB601] p-8 shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-grow flex flex-col justify-between">
                    <h3
                      className="text-2xl font-black text-gray-800 mb-4 group-hover:text-[#B26CC5] transition-colors duration-200 min-h-[4rem] flex items-center justify-center"
                      style={{
                        fontFamily: "Bowlby One SC, sans-serif",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed flex-grow flex items-center justify-center">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Reviews - Testimonials Carousel */}
        <section id="reviews">
          <TestimonialsCarousel
            currentLanguage={currentLanguage}
            onLeaveReview={() => navigateToPage("feedback")}
          />

          {/* Book Your Event Button */}
          <div className="text-center pb-20 px-6">
            <Button
              onClick={() => scrollToSection("contact")}
              className="w-full sm:w-auto min-h-[50px] h-[50px] bg-gradient-to-r from-[#FFE366] to-[#EEB601] text-[#60266F] hover:from-[#EEB601] hover:to-[#FFE366] text-lg sm:text-xl font-black px-8 sm:px-12 py-3 sm:py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 max-w-md mx-auto"
              style={{
                fontFamily: "Bowlby One SC, sans-serif",
              }}
            >
              <span className="truncate">
                {t.bookYourEvent}
              </span>
            </Button>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-white to-gray-50">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-black text-center mb-16 text-gray-800"
              style={{
                fontFamily: "Bowlby One SC, sans-serif",
              }}
            >
              {t.faq}
            </motion.h2>

            <Accordion
              type="single"
              collapsible
              className="space-y-4"
            >
              {faqData.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="border-2 border-gray-200 rounded-2xl px-6 py-2 hover:border-[#FFE366] transition-colors duration-200 bg-white shadow-lg hover:shadow-xl"
                  >
                    <AccordionTrigger className="text-left font-bold text-lg hover:no-underline hover:text-[#B26CC5] transition-colors duration-200">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pt-4 text-lg leading-relaxed">
                      <div className="whitespace-pre-line">
                        {faq.answer}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Gallery Section */}
        <Gallery currentLanguage={currentLanguage} />

        {/* Contact Section */}
        <section
          id="contact"
          className="py-20 px-6 bg-gradient-to-br from-white to-gray-50"
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-black text-center mb-16 text-gray-800"
              style={{
                fontFamily: "Bowlby One SC, sans-serif",
              }}
            >
              {t.getInTouch}
            </motion.h2>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-3xl border-2 border-[#60266F] shadow-2xl hover:shadow-3xl transition-shadow duration-300"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-black text-gray-800 mb-3">
                  {t.weCanHelp}
                </h3>
                <p className="text-gray-600">
                  Tell us about your dream event and we'll make
                  it happen!
                </p>
              </div>

              <UnifiedContactForm
                currentLanguage={currentLanguage}
                showHeader={false}
              />
            </motion.div>

            {/* Contact Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
            >
              {[
                {
                  icon: Phone,
                  title: "Call Us",
                  info: "+30 698 745 1036",
                  action: "tel:+306987451036",
                  color: "from-[#FFE366] to-[#EEB601]",
                  description: "Available 9 AM - 8 PM",
                },
                {
                  icon: Mail,
                  title: "Email Us",
                  info: "joypartythess@gmail.com",
                  action: "mailto:joypartythess@gmail.com",
                  color: "from-[#B26CC5] to-[#9C5CB0]",
                  description: "We reply within 2 hours",
                },
                {
                  icon: MessageCircle,
                  title: "Follow Us",
                  info: "@joy.party_thess",
                  action:
                    "https://www.instagram.com/joy.party_thess",
                  color: "from-[#EEB601] to-[#FFE366]",
                  description: "See our latest events",
                },
              ].map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.action}
                  target={
                    contact.action.startsWith("http")
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    contact.action.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.6 + index * 0.1,
                  }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`bg-gradient-to-r ${contact.color} p-6 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer border-2 border-white`}
                >
                  <contact.icon className="w-10 h-10 text-[#60266F] mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
                  <h4 className="font-bold text-[#60266F] mb-2 text-lg">
                    {contact.title}
                  </h4>
                  <p className="text-[#60266F] font-bold mb-1">
                    {contact.info}
                  </p>
                  <p className="text-[#60266F] text-sm opacity-80">
                    {contact.description}
                  </p>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>

        <GlobalFooter
          currentLanguage={currentLanguage}
          onNavigateToSection={scrollToSection}
          onNavigateToPage={navigateToPage}
          onSetSelectedAge={setSelectedAge}
        />

        {/* Floating Chat Button */}
        <motion.div
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 1,
            type: "spring",
            stiffness: 200,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            onClick={() => scrollToSection("contact")}
            className="bg-gradient-to-r from-[#B26CC5] to-[#9C5CB0] hover:from-[#9C5CB0] hover:to-[#B26CC5] text-white rounded-full w-14 h-14 sm:w-16 sm:h-16 shadow-2xl border-2 sm:border-4 border-white hover:shadow-3xl transition-all duration-300 min-h-[56px] sm:min-h-[64px] p-0"
            size="sm"
          >
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
        </motion.div>

        {/* Cookie Consent Banner */}
        <CookieConsent
          currentLanguage={currentLanguage}
          onNavigateToPrivacy={() => navigateToPage("privacy")}
        />
      </motion.div>
    </AnimatePresence>
  );
}