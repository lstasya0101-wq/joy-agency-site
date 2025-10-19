import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronRight,
  ChevronDown,
  Star,
  Phone,
  Globe,
  ArrowLeft,
  Mail,
  Copy,
  Menu,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
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

// Import existing Figma assets for product page
import svgPaths from "../imports/svg-khrsp1zhh8";
import imgRectangle15 from "figma:asset/f3429f03b3d5bb83191efe4ebbfe86c045e57e78.png";
import imgRectangle16 from "figma:asset/7e1a05ef0a464167ad393a99c7f6e9b7845092e9.png";
import imgImage22 from "figma:asset/82c8c7ac9c22e48223ec5cb2d882f7df3fd45a77.png";
import imgImage5 from "figma:asset/23b0d5f3e796fb8c48f1dcddf066dc0b76d0aa75.png";
import imgImage6 from "figma:asset/ebf0917871ddf9a13238acbd63b25c4849bd8dbb.png";
import imgImage12 from "figma:asset/16ce0b777e9ad875e17410b49514c6d14cc1f7af.png";
import imgImage11 from "figma:asset/9761096fc0f77ded536c9d48d3c7c0a87f67bf64.png";
import imgImage10 from "figma:asset/04be51bb20fe6883c3c6866ef4292045d6a47f14.png";
import imgImage9 from "figma:asset/91157ee21af27dc3ca274d3040f5b9417ce2e4b5.png";
import imgImage1 from "figma:asset/0fc527f767e0f75201aaf675ec0df67e1a064817.png";
import imgImage4 from "figma:asset/73fcadbbcdad2fe37f80565ee31f0bb273cbdb64.png";
import imgEllipse1 from "figma:asset/a7c54f4338b2bc704f8002d090420c455158e6fa.png";
import imgEllipse2 from "figma:asset/873c29ee4f49b1eec1feb56ca8968d9f8b9d782d.png";
import imgEllipse3 from "figma:asset/90774ebf4317bb8069bc48a6c7e7b4fdca7bc760.png";
import imgEllipse4 from "figma:asset/ab1930d25d826db90d71d388e67fd89a44ac5168.png";
import imgRectangle36 from "figma:asset/6f4a9758aab8d5ae10b1693caf801d6a805e3ec6.png";

interface ProductPageProps {
  program: {
    id: number;
    title: string;
    duration: string;
    ageRange: string;
    price: string;
    image: string;
    features: string[];
    description?: string;
  };
  onBack: () => void;
  currentLanguage: string;
  setCurrentLanguage: (lang: string) => void;
  onNavigateToSection?: (section: string) => void;
}

export default function ProductPage({
  program,
  onBack,
  currentLanguage,
  setCurrentLanguage,
  onNavigateToSection,
}: ProductPageProps) {
  const [isDescriptionOpen, setIsDescriptionOpen] =
    useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Language translations for product page
  const translations = {
    en: {
      city: "Thessaloniki",
      programs: "Programs",
      gallery: "Gallery",
      reviews: "Reviews",
      contactUs: "Contact us",
      homePage: "Home page",
      catalogue: "Catalogue",
      programPage: "Program page",
      description: "Description",
      ourGallery: "Our gallery",
      ourCustomersSay: "Our customers say:",
      loadMore: "Load more",
      getInTouch: "GET IN TOUCH WITH US",
      weCanHelp: "We can help you to choose",
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
      leaveRequest: "Leave request",
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
      homePage: "Αρχική σελίδα",
      catalogue: "Κατάλογος",
      programPage: "Σελίδα προγράμματος",
      description: "Περιγραφή",
      ourGallery: "Η Γκαλερί μας",
      ourCustomersSay: "Οι Πελάτες μας Λένε:",
      loadMore: "Φόρτωση περισσότερων",
      getInTouch: "ΕΠΙΚΟΙΝΩΝΗΣΤΕ ΜΑΖΙ ΜΑΣ",
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
      leaveRequest: "Υποβολή αιτήματος",
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
      homePage: "Головна сторінка",
      catalogue: "Каталог",
      programPage: "Сторінка програми",
      description: "Опис",
      ourGallery: "Наша Галерея",
      ourCustomersSay: "Наші Клієнти Кажуть:",
      loadMore: "Завантажити більше",
      getInTouch: "ЗВ'ЯЖІТЬСЯ З НАМИ",
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
      programPlaceholder: "Чи є щ��сь, що вам сподобалося?",
      send: "Відправити",
      leaveRequest: "Залишити запит",
      contactInformation: "Контактна Інформація",
      sendMessage: "Надішліть нам повідомлення",
      copyPhone: "Скопіювати номер телефону",
      copyEmail: "Скопіювати email",
    },
  };

  const t =
    translations[currentLanguage as keyof typeof translations];

  // Get unique content for each program
  const getProgramContent = (programId: number) => {
    const programContents = {
      1: {
        // Princess Party
        description:
          "Transform your little one into royalty with our magical Princess Party! Complete with enchanting costumes, sparkling face painting, and a mesmerizing bubble show that creates a fairy-tale atmosphere. Our professional entertainers bring beloved princess characters to life with music, dancing, and interactive storytelling that will make every child feel like they're living in their own magical kingdom.",
        heroImage:
          "https://images.unsplash.com/photo-1625516462008-fbf5b4242bd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmluY2VzcyUyMGRyZXNzJTIwdXAlMjBnaXJsJTIwY29zdHVtZXxlbnwxfHx8fDE3NTgyMjcwMTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        gallery: [
          "https://images.unsplash.com/photo-1625516462008-fbf5b4242bd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmluY2VzcyUyMGRyZXNzJTIwdXAlMjBnaXJsJTIwY29zdHVtZXxlbnwxfHx8fDE3NTgyMjcwMTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          "https://images.unsplash.com/photo-1578662105094-8e1df63d40e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmluY2VzcyUyMGNyb3duJTIwZ2lybHMlMjBwYXJ0eXxlbnwxfHx8fDE3NTgyMjcwMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          "https://images.unsplash.com/photo-1587050960152-a3b867e6e244?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNlJTIwcGFpbnRpbmclMjBjaGlsZHJlbiUyMGVudGVydGFpbm1lbnR8ZW58MXx8fHwxNzU4MjI3MDI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          imgImage12,
          imgImage11,
          imgImage10,
          imgImage9,
          imgImage1,
        ],
        testimonials: [
          {
            name: "Sophie Williams",
            text: "My daughter felt like a real princess! The costumes were beautiful and the entertainment was magical. Every detail was perfect.",
            rating: 5,
          },
          {
            name: "Maria Papadopoulou",
            text: "The bubble show was absolutely enchanting! All the children were mesmerized and had the most wonderful time.",
            rating: 5,
          },
        ],
      },
      2: {
        // The Little Mermaid
        description:
          "Dive into an underwater adventure with Ariel and friends! Our Little Mermaid party brings the magic of the ocean to life with captivating storytelling, beautiful singing performances, and interactive games that transport children to an underwater paradise. Complete with mermaid-themed decorations and a special photo session to capture these precious memories.",
        heroImage:
          "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXJtYWlkJTIwY29zdHVtZSUyMGNoaWxkJTIwdW5kZXJ3YXRlcnxlbnwxfHx8fDE3NTgyMjcwMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        gallery: [
          "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXJtYWlkJTIwY29zdHVtZSUyMGNoaWxkJTIwdW5kZXJ3YXRlcnxlbnwxfHx8fDE3NTgyMjcwMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          "https://images.unsplash.com/photo-1567473030492-533b30c5494c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bmRlcndhdGVyJTIwdGhlbWUlMjBkZWNvcmF0aW9uc3xlbnwxfHx8fDE3NTgyMjcwMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhzZWElMjBvY2VhbiUyMGJsdWUlMjB0aGVtZXxlbnwxfHx8fDE3NTgyMjcwNDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          imgRectangle15,
          imgRectangle16,
          imgImage6,
          imgImage12,
          imgImage11,
        ],
        testimonials: [
          {
            name: "Elena Georgiadou",
            text: "Ariel was amazing! The storytelling was so engaging and my daughter couldn't stop talking about the underwater adventure.",
            rating: 5,
          },
          {
            name: "Anna Konstantinou",
            text: "Beautiful decorations and the singing was absolutely lovely. A truly magical mermaid experience!",
            rating: 5,
          },
        ],
      },
      3: {
        // Cars Party
        description:
          "Rev up the excitement with our high-octane Cars Party! Race into adventure with Lightning McQueen and friends in this action-packed celebration featuring racing games, car decorating activities, and adrenaline-pumping themed music. Perfect for young speedsters who love fast cars and exciting competitions!",
        heroImage:
          "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWNpbmclMjBjYXJzJTIwY2hpbGRyZW4lMjB0b3l8ZW58MXx8fHwxNzU4MjI3MDQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        gallery: [
          "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWNpbmclMjBjYXJzJTIwY2hpbGRyZW4lMjB0b3l8ZW58MXx8fHwxNzU4MjI3MDQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          "https://images.unsplash.com/photo-1551830820-330ad2ddd6ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjByYWNpbmclMjBjYXIlMjB0b3l8ZW58MXx8fHwxNzU4MjI3MDQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          "https://images.unsplash.com/photo-1621205809211-6bf5a1a0f1ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHBsYXlpbmclMjBjYXJzJTIwcmFjaW5nfGVufDF8fHx8MTc1ODIyNzA1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          imgImage1,
          imgImage4,
          imgImage5,
          imgImage10,
          imgImage9,
        ],
        testimonials: [
          {
            name: "Dimitris Nikolaou",
            text: "My son and his friends had an absolute blast! The racing games were so much fun and very well organized.",
            rating: 5,
          },
          {
            name: "Christina Petrou",
            text: "High energy entertainment that kept all the kids engaged. The car decorating activity was a huge hit!",
            rating: 5,
          },
        ],
      },
      4: {
        // Minecraft Party
        description:
          "Build, explore, and create in the ultimate Minecraft adventure! Our themed celebration includes exciting building challenges, treasure hunts, and interactive games inspired by the beloved game. Perfect for young adventurers who want to create, explore, and have endless blocky fun together in their very own Minecraft world!",
        heroImage:
          "https://images.unsplash.com/photo-1725439507649-dd6345bf9c7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5lY3JhZnQlMjBwYXJ0eSUyMGJsb2NrcyUyMGdhbWluZyUyMGNoaWxkcmVufGVufDF8fHx8MTc1ODIyNTE1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        gallery: [
          "https://images.unsplash.com/photo-1725439507649-dd6345bf9c7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5lY3JhZnQlMjBwYXJ0eSUyMGJsb2NrcyUyMGdhbWluZyUyMGNoaWxkcmVufGVufDF8fHx8MTc1ODIyNTE1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          imgImage22,
          imgImage11,
          imgImage12,
          imgImage6,
          imgImage5,
          imgImage4,
          imgImage1,
        ],
        testimonials: [
          {
            name: "Alexandros Stavros",
            text: "Perfect for Minecraft fans! The building challenges were creative and kept the kids entertained for hours.",
            rating: 5,
          },
          {
            name: "Sophia Andreou",
            text: "My son felt like he was inside his favorite game! Amazing attention to detail and lots of fun activities.",
            rating: 5,
          },
        ],
      },
      5: {
        // Dance Battle Party
        description:
          "Turn up the beat and light up the night! Our Dance Battle Party brings the energy with professional DJ, dynamic lighting, dance competitions, and a social media setup to capture all the epic moves. Perfect for teens who love to express themselves through dance and want an unforgettable party experience!",
        heroImage:
          "https://images.unsplash.com/photo-1715576565319-728b388d81fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW5jZSUyMHBhcnR5JTIwdGVlbiUyMGRpc2NvJTIwbGlnaHRzfGVufDF8fHx8MTc1ODIyNTE2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        gallery: [
          "https://images.unsplash.com/photo-1715576565319-728b388d81fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhkYW5jZSUyMHBhcnR5JTIwdGVlbiUyMGRpc2NvJTIwbGlnaHRzfGVufDF8fHx8MTc1ODIyNTE2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          imgImage9,
          imgImage10,
          imgImage1,
          imgImage4,
          imgImage5,
          imgImage6,
          imgRectangle36,
        ],
        testimonials: [
          {
            name: "Marios Kostas",
            text: "Best party ever! The DJ was amazing and the dance battles were so much fun. All my friends loved it!",
            rating: 5,
          },
          {
            name: "Eirini Papadaki",
            text: "The lighting and music created the perfect atmosphere. My daughter felt like a real dancer!",
            rating: 5,
          },
        ],
      },
      6: {
        // Escape Room Adventure
        description:
          "Put your problem-solving skills to the test in our thrilling Escape Room Adventure! Work together to solve mind-bending puzzles, uncover hidden clues, and escape before time runs out. With multiple mystery themes and exciting team building challenges, this experience promotes cooperation and critical thinking while delivering non-stop excitement!",
        heroImage:
          "https://images.unsplash.com/photo-1622617760286-e11b543f5ab7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHtlc2NhcGUlMjByb29tJTIwcHV6emxlJTIwbXlzdGVyeSUyMGdhbWV8ZW58MXx8fHwxNzU4MjI1MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        gallery: [
          "https://images.unsplash.com/photo-1622617760286-e11b543f5ab7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHtlc2NhcGUlMjByb29tJTIwcHV6emxlJTIwbXlzdGVyeSUyMGdhbWV8ZW58MXx8fHwxNzU4MjI1MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          imgRectangle15,
          imgRectangle16,
          imgImage12,
          imgImage11,
          imgImage10,
          imgImage22,
          imgImage9,
        ],
        testimonials: [
          {
            name: "Nikos Mavros",
            text: "Incredible experience! The puzzles were challenging but fair, and working as a team was so much fun.",
            rating: 5,
          },
          {
            name: "Katerina Dimitriou",
            text: "Perfect for teens who love mysteries! The themes were exciting and the whole experience was thrilling.",
            rating: 5,
          },
        ],
      },
    };

    return (
      programContents[
        programId as keyof typeof programContents
      ] || {
        description: `${program.title} is a fantastic entertainment program designed to create unforgettable memories. Our professional entertainers bring energy, creativity, and joy to every celebration, ensuring an amazing experience for all participants.`,
        heroImage: imgImage22,
        gallery: [
          imgImage5,
          imgImage6,
          imgImage12,
          imgImage11,
          imgImage10,
          imgImage9,
          imgImage1,
          imgImage4,
        ],
        testimonials: [
          {
            name: "Emily Carter",
            text: "From start to finish, everything felt magical. Thank you for creating such unforgettable memories for all of us.",
            rating: 5,
          },
          {
            name: "Alex Morgan",
            text: "The event was absolutely amazing! Everything was so well-organized, and the atmosphere kept us smiling the whole time.",
            rating: 5,
          },
        ],
      }
    );
  };

  const programContent = getProgramContent(program.id);

  // Get testimonials with images for this specific program
  const testimonials = programContent.testimonials.map(
    (testimonial, index) => ({
      ...testimonial,
      image:
        [imgEllipse1, imgEllipse2, imgEllipse3, imgEllipse4][
          index
        ] || imgEllipse1,
    }),
  );

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
                                  onNavigateToSection(
                                    "contact",
                                  );
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
        </motion.header>

        {/* Hero Section */}
        <section className="relative h-[600px] mx-6 my-6 rounded-3xl overflow-hidden shadow-2xl">
          <div
            className="absolute inset-0 bg-gradient-to-br from-black/40 via-purple-900/30 to-pink-900/40"
            style={{
              backgroundImage: `url('${programContent.heroImage}')`,
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
              <h1
                className="text-5xl md:text-7xl font-black mb-6 text-white drop-shadow-2xl"
                style={{
                  fontFamily: "Bowlby One SC, sans-serif",
                }}
              >
                {program.title}
              </h1>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <div className="bg-[#FFE366] text-[#60266F] px-6 py-3 rounded-full font-bold text-lg">
                  {program.duration}
                </div>
                <div className="bg-[#B26CC5] text-white px-6 py-3 rounded-full font-bold text-lg">
                  {program.ageRange}
                </div>
                <div className="bg-gradient-to-r from-[#EEB601] to-[#FFE366] text-[#60266F] px-6 py-3 rounded-full font-bold text-xl">
                  {program.price}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Program Description */}
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[#60266F]"
            >
              <button
                onClick={() =>
                  setIsDescriptionOpen(!isDescriptionOpen)
                }
                className="flex items-center justify-between w-full text-left"
              >
                <h2
                  className="text-3xl font-black text-gray-800"
                  style={{
                    fontFamily: "Bowlby One SC, sans-serif",
                  }}
                >
                  {t.description}
                </h2>
                {isDescriptionOpen ? (
                  <ChevronDown className="w-8 h-8 text-[#B26CC5]" />
                ) : (
                  <ChevronRight className="w-8 h-8 text-[#B26CC5]" />
                )}
              </button>

              <AnimatePresence>
                {isDescriptionOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-lg text-gray-600 mt-6 leading-relaxed">
                      {programContent.description}
                    </p>

                    <div className="mt-8">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">
                        Features included:
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {program.features.map(
                          (feature, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-3 p-3 bg-gradient-to-r from-[#FFE366]/10 to-[#B26CC5]/10 rounded-xl"
                            >
                              <div className="w-2 h-2 bg-[#B26CC5] rounded-full"></div>
                              <span className="text-gray-700 font-medium">
                                {feature}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <h2
              className="text-4xl md:text-5xl font-black text-center mb-12 text-gray-800"
              style={{
                fontFamily: "Bowlby One SC, sans-serif",
              }}
            >
              {t.ourGallery}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programContent.gallery.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="aspect-square rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${program.title} gallery ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Reviews */}
        <section className="py-12 px-6 bg-gradient-to-br from-white to-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2
              className="text-4xl md:text-5xl font-black text-center mb-12 text-gray-800"
              style={{
                fontFamily: "Bowlby One SC, sans-serif",
              }}
            >
              {t.ourCustomersSay}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="border-2 border-[#60266F] rounded-3xl p-8 relative h-80 bg-gradient-to-br from-white to-gray-50 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                      <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-100">
                        <ImageWithFallback
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="pt-20 text-center">
                      <h4 className="text-2xl font-bold text-gray-800 mb-4">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {testimonial.text}
                      </p>
                      <div className="flex justify-center space-x-1">
                        {[...Array(testimonial.rating)].map(
                          (_, i) => (
                            <Star
                              key={i}
                              className="w-6 h-6 fill-[#FFE366] text-[#FFE366]"
                            />
                          ),
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <h2
              className="text-4xl md:text-5xl font-black text-center mb-12 text-gray-800"
              style={{
                fontFamily: "Bowlby One SC, sans-serif",
              }}
            >
              {t.getInTouch}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative"
              >
                <ImageWithFallback
                  src={programContent.heroImage}
                  alt={program.title}
                  className="w-full h-[600px] object-cover rounded-3xl shadow-2xl"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-white p-8 rounded-3xl border-2 border-[#60266F] shadow-2xl"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-8">
                  {t.weCanHelp}
                </h3>

                <UnifiedContactForm
                  currentLanguage={currentLanguage}
                  programTitle={program.title}
                  formType="booking"
                  showHeader={false}
                />
              </motion.div>
            </div>
          </div>
        </section>
      </motion.div>
    </AnimatePresence>
  );
}