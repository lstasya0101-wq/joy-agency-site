import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Phone,
  Globe,
  Star,
  Send,
  MessageSquare,
  Mail,
  Copy,
} from "lucide-react";
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
import {
  FormspreeService,
  useFormValidation,
  FormspreeFormData,
} from "./FormspreeService";
import { ReviewManager, Review } from "./ReviewManager";
import GlobalHeader from "./GlobalHeader";
import GlobalFooter from "./GlobalFooter";

// Import existing Figma assets
import svgPaths from "../imports/svg-khrsp1zhh8";

interface FeedbackProps {
  onBack: () => void;
  currentLanguage: string;
  setCurrentLanguage: (lang: string) => void;
  onNavigateToSection?: (section: string) => void;
  onNavigateToPage?: (page: string) => void;
}

export default function Feedback({
  onBack,
  currentLanguage,
  setCurrentLanguage,
  onNavigateToSection,
  onNavigateToPage,
}: FeedbackProps) {
  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    email: "",
    eventType: "",
    eventDate: "",
    message: "",
  });
  const [selectedRating, setSelectedRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentReviews, setRecentReviews] = useState<Review[]>(
    [],
  );
  const [errors, setErrors] = useState<Record<string, string>>(
    {},
  );

  const { validateField, messages } =
    useFormValidation(currentLanguage);

  // Initialize reviews and load recent ones
  useEffect(() => {
    ReviewManager.initializeDefaultReviews();
    const reviews = ReviewManager.getApprovedReviews().slice(
      0,
      3,
    ); // Get 3 most recent
    setRecentReviews(reviews);
  }, []);

  // Language translations
  const translations = {
    en: {
      city: "Thessaloniki",
      programs: "Programs",
      gallery: "Gallery",
      reviews: "Reviews",
      contactUs: "Contact us",
      leaveFeedback: "Leave Your Feedback",
      backToHome: "Back to Home",
      contactInformation: "Contact Information",
      sendMessage: "Send us a message",
      copyPhone: "Copy phone number",
      copyEmail: "Copy email",
      feedbackTitle: "We Value Your Opinion",
      feedbackDescription:
        "Your feedback helps us improve our services and create even more magical experiences for families. Share your thoughts about your recent event with us!",
      yourName: "Your Name",
      yourEmail: "Your Email",
      eventType: "Event Type",
      eventDate: "Event Date",
      overallRating: "Overall Rating",
      yourFeedback: "Your Feedback",
      feedbackPlaceholder: "Tell us about your experience...",
      submitFeedback: "Submit Feedback",
      thankYou: "Thank You!",
      ratingLabels: {
        5: "Excellent",
        4: "Very Good",
        3: "Good",
        2: "Fair",
        1: "Poor",
      },
    },
    el: {
      city: "Θεσσαλονίκη",
      programs: "Προγράμματα",
      gallery: "Γκαλερί",
      reviews: "Κριτικές",
      contactUs: "Επικοινωνία",
      leaveFeedback: "Αφήστε την Αξιολόγησή σας",
      backToHome: "Επιστροφή στην Αρχική",
      contactInformation: "Στοιχεία Επικοινωνίας",
      sendMessage: "Στείλτε μας μήνυμα",
      copyPhone: "Αντιγραφή τηλεφώνου",
      copyEmail: "Αντιγραφή email",
      feedbackTitle: "Εκτιμούμε τη Γνώμη σας",
      feedbackDescription:
        "Η ανατροφοδότησή σας μας βοηθά να βελτιώσουμε τις υπηρεσίες μας και να δημιουργήσουμε ακόμη πιο μαγικές εμπειρίες για οικογένειες. Μοιραστείτε τις σκέψεις σας για την πρόσφατη εκδήλωσή σας μαζί μας!",
      yourName: "Το Όνομά σας",
      yourEmail: "Το Email σας",
      eventType: "Τύπος Εκδήλωσης",
      eventDate: "Ημερομηνία Εκδήλωσης",
      overallRating: "Συνολική Αξιολόγηση",
      yourFeedback: "Η Αξιολόγησή σας",
      feedbackPlaceholder: "Πείτε μας για την εμπειρία σας...",
      submitFeedback: "Υποβολή Αξιολόγησης",
      thankYou: "Ευχαριστούμε!",
      ratingLabels: {
        5: "Εξαιρετικό",
        4: "Πολύ Καλό",
        3: "Καλό",
        2: "Μέτριο",
        1: "Κακό",
      },
    },
    uk: {
      city: "Салоніки",
      programs: "Програми",
      gallery: "Галерея",
      reviews: "Відгуки",
      contactUs: "Зв'яжіться з нами",
      leaveFeedback: "Залиште Ваш Відгук",
      backToHome: "Повернутися Додому",
      contactInformation: "Контактна Інформація",
      sendMessage: "Надішліть нам повідомлення",
      copyPhone: "Скопіювати номер телефону",
      copyEmail: "Скопіювати email",
      feedbackTitle: "Ми Цінуємо Вашу Думку",
      feedbackDescription:
        "Ваш відгук допомагає нам покращувати наші послуги та створювати ще більш чарівні враження для сімей. Поділіться своїми думками про вашу недавню подію з нами!",
      yourName: "Ваше Ім'я",
      yourEmail: "Ваш Email",
      eventType: "Тип Події",
      eventDate: "Дата Події",
      overallRating: "Загальна Оцінка",
      yourFeedback: "Ваш Відгук",
      feedbackPlaceholder: "Розкажіть нам про ваш досвід...",
      submitFeedback: "Надіслати Відгук",
      thankYou: "Дякуємо!",
      ratingLabels: {
        5: "Відмінно",
        4: "Дуже Добре",
        3: "Добре",
        2: "Задовільно",
        1: "Погано",
      },
    },
  };

  const t =
    translations[currentLanguage as keyof typeof translations];

  const handleInputChange = (field: string, value: string) => {
    setFeedbackForm((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate required fields
    const nameError = validateField(
      "name",
      feedbackForm.name,
      "name",
    );
    if (nameError) newErrors.name = nameError;

    const emailError = validateField(
      "email",
      feedbackForm.email,
      "email",
    );
    if (emailError) newErrors.email = emailError;

    const messageError = validateField(
      "message",
      feedbackForm.message,
      "message",
    );
    if (messageError) newErrors.message = messageError;

    if (selectedRating === 0) {
      newErrors.rating = "Please select a rating";
    }

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
      const formspreeData: FormspreeFormData = {
        name: feedbackForm.name,
        email: feedbackForm.email,
        message: feedbackForm.message,
        rating: selectedRating,
        eventType: feedbackForm.eventType,
        eventDate: feedbackForm.eventDate,
        formType: "review",
        language: currentLanguage,
      };

      const result =
        await FormspreeService.submitForm(formspreeData);

      if (result.success) {
        // Add review to local storage
        ReviewManager.addReview({
          name: feedbackForm.name,
          text: feedbackForm.message,
          rating: selectedRating,
          eventType: feedbackForm.eventType,
          eventDate: feedbackForm.eventDate,
          language: currentLanguage,
        });

        // Refresh recent reviews
        const reviews =
          ReviewManager.getApprovedReviews().slice(0, 3);
        setRecentReviews(reviews);

        // Reset form
        setFeedbackForm({
          name: "",
          email: "",
          eventType: "",
          eventDate: "",
          message: "",
        });
        setSelectedRating(0);
        setErrors({});

        FormspreeService.showNotification(
          messages.submitSuccess,
          "success",
        );
      } else {
        FormspreeService.showNotification(
          result.message || messages.submitError,
          "error",
        );
      }
    } catch (error) {
      console.error("Feedback form submission error:", error);
      FormspreeService.showNotification(
        messages.networkError,
        "error",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format recent reviews for display
  const formatReviews = (reviews: Review[]) => {
    return reviews.map((review) => ({
      name: review.name,
      rating: review.rating,
      text: review.text,
      event: review.eventType || "Event",
      image: review.image,
    }));
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
                  <span className="text-gray-800 hover:text-[#B26CC5] transition-colors cursor-pointer">
                    {t.programs}
                  </span>
                  <span className="text-gray-800 hover:text-[#B26CC5] transition-colors cursor-pointer">
                    {t.gallery}
                  </span>
                  <span className="text-gray-800 hover:text-[#B26CC5] transition-colors cursor-pointer">
                    {t.reviews}
                  </span>
                </nav>
              </div>
            </div>

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
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
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
            {t.leaveFeedback}
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-8">
            {t.feedbackTitle}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t.feedbackDescription}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Feedback Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="border-2 border-[#60266F] rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-shadow duration-300 bg-gradient-to-br from-white to-gray-50">
              <div className="flex items-center mb-8">
                <MessageSquare className="w-8 h-8 text-[#B26CC5] mr-3" />
                <h3 className="text-2xl font-black text-gray-800">
                  Share Your Experience
                </h3>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-medium text-gray-800 mb-2">
                      {t.yourName} *
                    </label>
                    <Input
                      value={feedbackForm.name}
                      onChange={(e) =>
                        handleInputChange(
                          "name",
                          e.target.value,
                        )
                      }
                      placeholder="Enter your name"
                      className={`rounded-2xl border-2 px-6 py-3 transition-colors duration-200 ${
                        errors.name
                          ? "border-red-500"
                          : "border-gray-300 focus:border-[#B26CC5]"
                      }`}
                      required
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-lg font-medium text-gray-800 mb-2">
                      {t.yourEmail} *
                    </label>
                    <Input
                      type="email"
                      value={feedbackForm.email}
                      onChange={(e) =>
                        handleInputChange(
                          "email",
                          e.target.value,
                        )
                      }
                      placeholder="Enter your email"
                      className={`rounded-2xl border-2 px-6 py-3 transition-colors duration-200 ${
                        errors.email
                          ? "border-red-500"
                          : "border-gray-300 focus:border-[#B26CC5]"
                      }`}
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-medium text-gray-800 mb-2">
                      {t.eventType}
                    </label>
                    <Select
                      value={feedbackForm.eventType}
                      onValueChange={(value) =>
                        handleInputChange("eventType", value)
                      }
                    >
                      <SelectTrigger className="rounded-2xl border-2 border-gray-300 px-6 py-3 focus:border-[#B26CC5] transition-colors duration-200">
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="princess">
                          Princess Party
                        </SelectItem>
                        <SelectItem value="mermaid">
                          The Little Mermaid
                        </SelectItem>
                        <SelectItem value="cars">
                          Cars Party
                        </SelectItem>
                        <SelectItem value="minecraft">
                          Minecraft Party
                        </SelectItem>
                        <SelectItem value="dance">
                          Dance Battle Party
                        </SelectItem>
                        <SelectItem value="escape">
                          Escape Room Adventure
                        </SelectItem>
                        <SelectItem value="bubble">
                          Bubble Show
                        </SelectItem>
                        <SelectItem value="other">
                          Other
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-lg font-medium text-gray-800 mb-2">
                      {t.eventDate}
                    </label>
                    <Input
                      type="date"
                      value={feedbackForm.eventDate}
                      onChange={(e) =>
                        handleInputChange(
                          "eventDate",
                          e.target.value,
                        )
                      }
                      className="rounded-2xl border-2 border-gray-300 px-6 py-3 focus:border-[#B26CC5] transition-colors duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-800 mb-4">
                    {t.overallRating} *
                  </label>
                  <div className="flex items-center space-x-2 flex-wrap">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() =>
                          handleRatingClick(rating)
                        }
                        className="group p-1"
                      >
                        <Star
                          className={`w-8 h-8 transition-colors duration-200 ${
                            selectedRating >= rating
                              ? "text-[#FFE366] fill-[#FFE366]"
                              : "text-gray-300 hover:text-[#FFE366] hover:fill-[#FFE366]"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-4 text-gray-600 text-sm">
                      {selectedRating > 0
                        ? `${selectedRating}/5 stars`
                        : "Click to rate"}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-800 mb-2">
                    {t.yourFeedback} *
                  </label>
                  <Textarea
                    value={feedbackForm.message}
                    onChange={(e) =>
                      handleInputChange(
                        "message",
                        e.target.value,
                      )
                    }
                    placeholder={t.feedbackPlaceholder}
                    rows={6}
                    className={`rounded-2xl border-2 px-6 py-4 transition-colors duration-200 resize-none ${
                      errors.message
                        ? "border-red-500"
                        : "border-gray-300 focus:border-[#B26CC5]"
                    }`}
                    required
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-[40px] bg-gradient-to-r from-[#FFE366] to-[#EEB601] text-[#60266F] hover:from-[#EEB601] hover:to-[#FFE366] text-xl font-black rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50"
                    style={{
                      fontFamily: "Bowlby One SC, sans-serif",
                    }}
                  >
                    <Send
                      className={`w-5 h-5 mr-2 ${isSubmitting ? "animate-pulse" : ""}`}
                    />
                    {isSubmitting
                      ? "Sending..."
                      : t.submitFeedback}
                  </Button>
                </motion.div>
              </form>
            </Card>
          </motion.div>

          {/* Recent Feedback */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-black text-gray-800 mb-8">
              Recent Feedback
            </h3>

            {formatReviews(recentReviews).map(
              (feedback, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.6 + index * 0.1,
                  }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="border-2 border-gray-200 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50 group">
                    <CardContent className="p-0">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 rounded-full border-2 border-[#FFE366] group-hover:scale-110 transition-transform duration-300 overflow-hidden bg-gray-100">
                          <ImageWithFallback
                            src={feedback.image}
                            alt={feedback.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-black text-gray-800 group-hover:text-[#B26CC5] transition-colors duration-200">
                              {feedback.name}
                            </h4>
                            <div className="flex space-x-1">
                              {[...Array(feedback.rating)].map(
                                (_, i) => (
                                  <Star
                                    key={i}
                                    className="w-4 h-4 fill-[#FFE366] text-[#FFE366]"
                                  />
                                ),
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-[#B26CC5] font-medium mb-2">
                            {feedback.event}
                          </p>
                          <p className="text-gray-600 leading-relaxed">
                            {feedback.text}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ),
            )}
          </motion.div>
        </div>
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
                    onClick={onBack}
                    className="text-lg text-gray-700 hover:text-[#B26CC5] transition-colors cursor-pointer text-left"
                  >
                    Children Programs
                  </button>
                </li>
                <li>
                  <button
                    onClick={onBack}
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
                    onClick={onBack}
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
                    onClick={onBack}
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
    </motion.div>
  );
}