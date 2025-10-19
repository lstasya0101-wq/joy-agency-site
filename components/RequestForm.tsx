import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Phone,
  Globe,
  Mail,
  Copy,
  Send,
  Calendar,
} from "lucide-react";
import {
  FormspreeService,
  useFormValidation,
  FormspreeFormData,
} from "./FormspreeService";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
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

// Import existing Figma assets
import svgPaths from "../imports/svg-khrsp1zhh8";

interface RequestFormProps {
  onBack: () => void;
  currentLanguage: string;
  setCurrentLanguage: (lang: string) => void;
  onNavigateToSection?: (section: string) => void;
  preSelectedProgram?: {
    id: number;
    title: string;
    duration: string;
    ageRange: string;
    price: string;
    image: string;
    features: string[];
  } | null;
}

export default function RequestForm({
  onBack,
  currentLanguage,
  setCurrentLanguage,
  onNavigateToSection,
  preSelectedProgram,
}: RequestFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    month: "",
    day: "",
    dayType: "",
    amountKids: "",
    program: preSelectedProgram?.title || "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>(
    {},
  );

  const { validateField, messages } =
    useFormValidation(currentLanguage);

  // Language translations
  const translations = {
    en: {
      city: "Thessaloniki",
      programs: "Programs",
      gallery: "Gallery",
      reviews: "Reviews",
      contactUs: "Contact us",
      requestForm: "Program Request Form",
      requestTitle: "Request Your Event",
      requestSubtitle:
        "Fill out the form below and we'll get back to you within 24 hours to discuss your perfect event!",
      yourName: "Your Name *",
      yourEmail: "Your Email *",
      yourPhone: "Your Phone Number",
      chooseDates: "Choose Your Preferred Date",
      bookDatesNote: "We book dates only for the current year",
      month: "Month",
      day: "Day",
      dayType: "Day Type",
      amountKids: "Number of Children",
      selectedProgram: "Selected Program",
      additionalMessage: "Additional Message",
      messagePlaceholder:
        "Tell us about any special requirements, themes, or questions you have...",
      submitRequest: "Submit Request",
      weekend: "Weekend",
      weekday: "Weekday",
      holiday: "Holiday",
      child: "child",
      children: "children",
      backToProgram: "Back to Program",
      contactInformation: "Contact Information",
      sendMessage: "Send us a message",
      copyPhone: "Copy phone number",
      copyEmail: "Copy email",
      programDetails: "Program Details",
      duration: "Duration",
      ageRange: "Age Range",
      price: "Price",
      phoneOptional: "(Optional)",
    },
    el: {
      city: "Θεσσαλονίκη",
      programs: "Προγράμματα",
      gallery: "Γκαλερί",
      reviews: "Κριτικές",
      contactUs: "Επικοινωνία",
      requestForm: "Φόρμα Αίτησης Προγράμματος",
      requestTitle: "Αιτηθείτε την Εκδήλωσή σας",
      requestSubtitle:
        "Συμπληρώστε την παρακάτω φόρμα και θα επικοινωνήσουμε μαζί σας εντός 24 ωρών για να συζητήσουμε την τέλεια εκδήλωσή σας!",
      yourName: "Το Όνομά σας *",
      yourEmail: "Το Email σας *",
      yourPhone: "Τηλέφωνό σας",
      chooseDates: "Επιλέξτε την Προτιμώμενη Ημερομηνία",
      bookDatesNote:
        "Κλείνουμε ημερομηνίες μόνο για το τρέχον έτος",
      month: "Μήνας",
      day: "Ημέρα",
      dayType: "Τύπος Ημέρας",
      amountKids: "Αριθμός Παιδιών",
      selectedProgram: "Επιλεγμένο Πρόγραμμα",
      additionalMessage: "Επιπλέον Μήνυμα",
      messagePlaceholder:
        "Πείτε μας για τυχόν ειδικές απαιτήσεις, θέματα ή ερωτήσεις που έχετε...",
      submitRequest: "Υποβολή Αίτησης",
      weekend: "Σαββατοκύριακο",
      weekday: "Καθημερινή",
      holiday: "Αργία",
      child: "παιδί",
      children: "παιδιά",
      backToProgram: "Επιστροφή στο Πρόγραμμα",
      contactInformation: "Στοιχεία Επικοινωνίας",
      sendMessage: "Στείλτε μας μήνυμα",
      copyPhone: "Αντιγραφή τηλεφώνου",
      copyEmail: "Αντιγραφή email",
      programDetails: "Λεπτομέρειες Προγράμματος",
      duration: "Διάρκεια",
      ageRange: "Ηλικιακή Ομάδα",
      price: "Τιμή",
      phoneOptional: "(Προαιρετικό)",
    },
    uk: {
      city: "Салоніки",
      programs: "Програми",
      gallery: "Галерея",
      reviews: "Відгуки",
      contactUs: "Зв'яжіться з нами",
      requestForm: "Форма Запиту Програми",
      requestTitle: "Замовте Вашу Подію",
      requestSubtitle:
        "Заповніть форму нижче, і ми зв'яжемося з вами протягом 24 годин, щоб обговорити вашу ідеальну подію!",
      yourName: "Ваше Ім'я *",
      yourEmail: "Ваш Email *",
      yourPhone: "Ваш Номер Телефону",
      chooseDates: "Оберіть Бажану Дату",
      bookDatesNote: "Ми бронюємо дати лише на поточний рік",
      month: "Місяць",
      day: "День",
      dayType: "Тип Дня",
      amountKids: "Кількість Дітей",
      selectedProgram: "Обрана Програма",
      additionalMessage: "Додаткове Повідомлення",
      messagePlaceholder:
        "Розкажіть нам про будь-які особливі вимоги, теми або питання, які у вас є...",
      submitRequest: "Подати Запит",
      weekend: "Вихідні",
      weekday: "Будній день",
      holiday: "Свято",
      child: "дитина",
      children: "дітей",
      backToProgram: "Повернутися до Програми",
      contactInformation: "Контактна Інформація",
      sendMessage: "Надішліть нам повідомлення",
      copyPhone: "Скопіювати номер телефону",
      copyEmail: "Скопіювати email",
      programDetails: "Деталі Програми",
      duration: "Тривалість",
      ageRange: "Вікова Група",
      price: "Ціна",
      phoneOptional: "(Необов'язково)",
    },
  };

  const t =
    translations[currentLanguage as keyof typeof translations];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate required fields
    const nameError = validateField(
      "name",
      formData.name,
      "name",
    );
    if (nameError) newErrors.name = nameError;

    const emailError = validateField(
      "email",
      formData.email,
      "email",
    );
    if (emailError) newErrors.email = emailError;

    const phoneError = validateField(
      "phone",
      formData.phone,
      "phone",
    );
    if (phoneError) newErrors.phone = phoneError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      FormspreeService.showNotification(
        messages.fillRequired,
        "error",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const message = `Program request form submission:
      
Selected Program: ${formData.program || "Not specified"}
Date preference: ${formData.month ? `${formData.month} ${formData.day}` : "Not specified"}
Day type: ${formData.dayType || "Not specified"}
Number of children: ${formData.amountKids || "Not specified"}
Additional message: ${formData.message || "None"}`;

      const formspreeData: FormspreeFormData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        message: message,
        formType: "program-booking",
        language: currentLanguage,
        programChoice: formData.program || undefined,
        eventDate:
          formData.month && formData.day
            ? `${formData.month} ${formData.day}`
            : undefined,
        numberOfKids: formData.amountKids || undefined,
        preferredTime: formData.dayType || undefined,
      };

      const result =
        await FormspreeService.submitForm(formspreeData);

      if (result.success) {
        FormspreeService.showNotification(
          messages.submitSuccess,
          "success",
        );

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          month: "",
          day: "",
          dayType: "",
          amountKids: "",
          program: preSelectedProgram?.title || "",
          message: "",
        });
        setErrors({});
      } else {
        FormspreeService.showNotification(
          result.message || messages.submitError,
          "error",
        );
      }
    } catch (error) {
      console.error("Request form submission error:", error);
      FormspreeService.showNotification(
        messages.networkError,
        "error",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
          </div>

          {/* Mobile menu - Always visible */}
          <div className="md:hidden mt-4 pb-4 border-t pt-4 bg-gradient-to-r from-[#FFE366]/5 to-[#B26CC5]/5 rounded-2xl mx-2">
            <nav className="flex flex-col space-y-2 px-4">
              <button
                onClick={() =>
                  onNavigateToSection &&
                  onNavigateToSection("programs")
                }
                className="text-left text-gray-800 hover:text-[#B26CC5] transition-colors font-medium py-4 px-2 rounded-xl hover:bg-white/50 text-lg"
              >
                {t.programs}
              </button>
              <button
                onClick={() =>
                  onNavigateToSection &&
                  onNavigateToSection("gallery")
                }
                className="text-left text-gray-800 hover:text-[#B26CC5] transition-colors font-medium py-4 px-2 rounded-xl hover:bg-white/50 text-lg"
              >
                {t.gallery}
              </button>
              <button
                onClick={() =>
                  onNavigateToSection &&
                  onNavigateToSection("reviews")
                }
                className="text-left text-gray-800 hover:text-[#B26CC5] transition-colors font-medium py-4 px-2 rounded-xl hover:bg-white/50 text-lg"
              >
                {t.reviews}
              </button>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-left text-gray-800 hover:text-[#B26CC5] transition-colors font-medium py-4 px-2 rounded-xl hover:bg-white/50 text-lg">
                    {t.contactUs}
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
              <div className="pt-4 border-t border-gray-200">
                <Select
                  value={currentLanguage}
                  onValueChange={setCurrentLanguage}
                >
                  <SelectTrigger className="w-full border-[#60266F] text-[#60266F] bg-white hover:bg-gray-50 transition-colors">
                    <Globe className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">🇺🇸 EN</SelectItem>
                    <SelectItem value="el">🇬🇷 ΕΛ</SelectItem>
                    <SelectItem value="uk">🇺🇦 УК</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-[#B26CC5] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          {t.backToProgram}
        </motion.button>

        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1
            className="text-5xl md:text-6xl font-black text-gray-800 mb-6 bg-gradient-to-r from-[#B26CC5] to-[#FFE366] bg-clip-text text-transparent"
            style={{ fontFamily: "Bowlby One SC, sans-serif" }}
          >
            {t.requestForm}
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-4">
            {t.requestTitle}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t.requestSubtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Program Details Sidebar */}
          {preSelectedProgram && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-1"
            >
              <Card className="border-2 border-[#B26CC5] rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
                <div className="relative">
                  <ImageWithFallback
                    src={preSelectedProgram.image}
                    alt={preSelectedProgram.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-[#FFE366] to-[#EEB601] text-[#60266F] px-4 py-2 rounded-full font-black shadow-lg">
                    {preSelectedProgram.price}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-black text-gray-800 mb-4 text-[#B26CC5]">
                    {t.programDetails}
                  </h3>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">
                    {preSelectedProgram.title}
                  </h4>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-[#B26CC5] mr-2" />
                      <span className="text-gray-600">
                        <strong>{t.duration}:</strong>{" "}
                        {preSelectedProgram.duration}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-600">
                        <strong>{t.ageRange}:</strong>{" "}
                        {preSelectedProgram.ageRange}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-600">
                        <strong>{t.price}:</strong>{" "}
                        {preSelectedProgram.price}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-800 mb-2">
                      Features:
                    </h5>
                    <ul className="space-y-1">
                      {preSelectedProgram.features.map(
                        (feature, index) => (
                          <li
                            key={index}
                            className="flex items-center text-sm"
                          >
                            <div className="w-2 h-2 bg-[#B26CC5] rounded-full mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Request Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className={
              preSelectedProgram
                ? "lg:col-span-2"
                : "lg:col-span-3"
            }
          >
            <Card className="border-2 border-[#60266F] rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-shadow duration-300 bg-gradient-to-br from-white to-gray-50">
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-medium text-gray-800 mb-2">
                      {t.yourName}
                    </label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange(
                          "name",
                          e.target.value,
                        )
                      }
                      placeholder="Enter your name"
                      className="rounded-2xl border-2 border-gray-300 px-6 py-3 focus:border-[#B26CC5] transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-medium text-gray-800 mb-2">
                      {t.yourEmail}
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange(
                          "email",
                          e.target.value,
                        )
                      }
                      placeholder="Enter your email"
                      className="rounded-2xl border-2 border-gray-300 px-6 py-3 focus:border-[#B26CC5] transition-colors duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-800 mb-2">
                    {t.yourPhone}{" "}
                    <span className="text-gray-500">
                      {t.phoneOptional}
                    </span>
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      handleInputChange("phone", e.target.value)
                    }
                    placeholder="+30 123 456 7890"
                    className="rounded-2xl border-2 border-gray-300 px-6 py-3 focus:border-[#B26CC5] transition-colors duration-200"
                  />
                </div>

                {/* Date Selection */}
                <div>
                  <label className="block text-lg font-medium text-gray-800 mb-2">
                    {t.chooseDates}
                  </label>
                  <p className="text-gray-600 mb-4">
                    {t.bookDatesNote}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Select
                      value={formData.month}
                      onValueChange={(value) =>
                        handleInputChange("month", value)
                      }
                    >
                      <SelectTrigger className="rounded-2xl border-2 border-gray-300 px-6 py-3 focus:border-[#B26CC5] transition-colors duration-200">
                        <SelectValue placeholder={t.month} />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "January",
                          "February",
                          "March",
                          "April",
                          "May",
                          "June",
                          "July",
                          "August",
                          "September",
                          "October",
                          "November",
                          "December",
                        ].map((month) => (
                          <SelectItem
                            key={month}
                            value={month.toLowerCase()}
                          >
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={formData.day}
                      onValueChange={(value) =>
                        handleInputChange("day", value)
                      }
                    >
                      <SelectTrigger className="rounded-2xl border-2 border-gray-300 px-6 py-3 focus:border-[#B26CC5] transition-colors duration-200">
                        <SelectValue placeholder={t.day} />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 31 }, (_, i) => (
                          <SelectItem
                            key={i + 1}
                            value={String(i + 1)}
                          >
                            {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={formData.dayType}
                      onValueChange={(value) =>
                        handleInputChange("dayType", value)
                      }
                    >
                      <SelectTrigger className="rounded-2xl border-2 border-gray-300 px-6 py-3 focus:border-[#B26CC5] transition-colors duration-200">
                        <SelectValue placeholder={t.dayType} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekend">
                          {t.weekend}
                        </SelectItem>
                        <SelectItem value="weekday">
                          {t.weekday}
                        </SelectItem>
                        <SelectItem value="holiday">
                          {t.holiday}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Event Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-medium text-gray-800 mb-2">
                      {t.amountKids}
                    </label>
                    <Select
                      value={formData.amountKids}
                      onValueChange={(value) =>
                        handleInputChange("amountKids", value)
                      }
                    >
                      <SelectTrigger className="rounded-2xl border-2 border-gray-300 px-6 py-3 focus:border-[#B26CC5] transition-colors duration-200">
                        <SelectValue
                          placeholder={t.amountKids}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 20 }, (_, i) => (
                          <SelectItem
                            key={i + 1}
                            value={String(i + 1)}
                          >
                            {i + 1}{" "}
                            {i === 0 ? t.child : t.children}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-lg font-medium text-gray-800 mb-2">
                      {t.selectedProgram}
                    </label>
                    <Input
                      value={formData.program}
                      onChange={(e) =>
                        handleInputChange(
                          "program",
                          e.target.value,
                        )
                      }
                      placeholder="Program name"
                      className="rounded-2xl border-2 border-gray-300 px-6 py-3 focus:border-[#B26CC5] transition-colors duration-200"
                      readOnly={!!preSelectedProgram}
                    />
                  </div>
                </div>

                {/* Additional Message */}
                <div>
                  <label className="block text-lg font-medium text-gray-800 mb-2">
                    {t.additionalMessage}
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange(
                        "message",
                        e.target.value,
                      )
                    }
                    placeholder={t.messagePlaceholder}
                    rows={5}
                    className="rounded-2xl border-2 border-gray-300 px-6 py-4 focus:border-[#B26CC5] transition-colors duration-200 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#FFE366] to-[#EEB601] text-[#60266F] hover:from-[#EEB601] hover:to-[#FFE366] text-xl font-black py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                    style={{
                      fontFamily: "Bowlby One SC, sans-serif",
                    }}
                  >
                    <Send className="w-5 h-5 mr-2" />
                    {t.submitRequest}
                  </Button>
                </motion.div>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}