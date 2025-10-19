import { useState } from "react";
import { motion } from "motion/react";
import {
  Calendar,
  Users,
  Send,
  Loader2,
  Star,
} from "lucide-react";
import { Button } from "./ui/button";
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
  FormspreeService,
  useFormValidation,
  FormspreeFormData,
} from "./FormspreeService";

interface UnifiedContactFormProps {
  currentLanguage: string;
  programTitle?: string;
  formType?:
    | "contact"
    | "program-booking"
    | "partner"
    | "team"
    | "review";
  showHeader?: boolean;
  wrapperClassName?: string;
  onSuccess?: () => void;
}

export default function UnifiedContactForm({
  currentLanguage,
  programTitle,
  formType = "contact",
  showHeader = true,
  wrapperClassName = "",
  onSuccess,
}: UnifiedContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    programChoice: programTitle || "",
    eventDate: "",
    numberOfKids: "",
    preferredTime: "",
    rating: 0,
  });
  const [consentChecked, setConsentChecked] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>(
    {},
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { validateField, messages } =
    useFormValidation(currentLanguage);

  // Available programs for selection
  const availablePrograms = [
    "SPA Day",
    "Princesses and Kingdoms",
    "Chemist Show",
    "Harry Potter",
    "Minecraft",
    "TikTok Party Day",
    "Cocktail Party",
    "Wine Tasting Event",
    "Corporate Team Building",
    "Dinner Party",
    "Anniversary Celebration",
    "Birthday Celebration",
    "Custom Theme Party",
  ];

  // Language translations
  const translations = {
    en: {
      weCanHelp: "We can help you choose",
      contactFormTitle: "Get in Touch",
      programBookingTitle: "Book Your Program",
      partnerFormTitle: "Become Our Partner",
      teamFormTitle: "Join Our Team",
      reviewFormTitle: "Leave a Review",
      yourName: "Your Name",
      yourEmail: "Your Email",
      yourPhone: "Your Phone (Optional)",
      yourMessage: "Your Message",
      selectProgram: "Select Program",
      eventDate: "Preferred Event Date",
      numberOfKids: "Number of Children",
      preferredTime: "Preferred Time",
      rating: "Your Rating",
      send: "Send Message",
      submitting: "Sending...",
      programPlaceholder: "Tell us about your dream event...",
      messagePlaceholder:
        "Tell us more about what you're looking for...",
      partnerMessage:
        "Tell us about your business and how you'd like to partner with us...",
      teamMessage:
        "Tell us about your experience and why you'd like to join our team...",
      reviewMessage:
        "Share your experience with our services...",
      selectProgramPlaceholder:
        "Choose a program that interests you",
      morning: "Morning (9AM - 12PM)",
      afternoon: "Afternoon (12PM - 5PM)",
      evening: "Evening (5PM - 8PM)",
      weekend: "Weekend",
      weekday: "Weekday",
    },
    el: {
      weCanHelp: "Μπορούμε να σας βοηθήσουμε να επιλέξετε",
      contactFormTitle: "Επικοινωνήστε μαζί μας",
      programBookingTitle: "Κλείστε το Πρόγραμμά σας",
      partnerFormTitle: "Γίνετε Συνεργάτης μας",
      teamFormTitle: "Ενταχθείτε στην Ομάδα μας",
      reviewFormTitle: "Αφήστε μια Κριτική",
      yourName: "Το Όνομά σας",
      yourEmail: "Το Email σας",
      yourPhone: "Το Τηλέφωνό σας (Προαιρετικό)",
      yourMessage: "Το Μήνυμά σας",
      selectProgram: "Επιλέξτε Πρόγραμμα",
      eventDate: "Προτιμώμενη Ημερομηνία",
      numberOfKids: "Αριθμός Παιδιών",
      preferredTime: "Προτιμώμενη Ώρα",
      rating: "Η Αξιολόγησή σας",
      send: "Αποστολή Μηνύματος",
      submitting: "Αποστολή...",
      programPlaceholder:
        "Πείτε μας για την εκδήλωση των ονείρων σας...",
      messagePlaceholder:
        "Πείτε μας περισσότερα για αυτό που ψάχνετε...",
      partnerMessage:
        "Πείτε μας για την επιχείρησή σας και πώς θα θέλατε να συνεργαστείτε μαζί μας...",
      teamMessage:
        "Πείτε μας για την εμπειρία σας και γιατί θα θέλατε να ενταχθείτε στην ομάδα μας...",
      reviewMessage:
        "Μοιραστείτε την εμπειρία σας με τις υπηρεσίες μας...",
      selectProgramPlaceholder:
        "Επιλέξτε ένα πρόγραμμα που σας ενδιαφέρει",
      morning: "Πρωί (9:00 - 12:00)",
      afternoon: "Απόγευμα (12:00 - 17:00)",
      evening: "Βράδυ (17:00 - 20:00)",
      weekend: "Σαββατοκύριακο",
      weekday: "Καθημερινή",
    },
    uk: {
      weCanHelp: "Ми можемо допомогти вам обрати",
      contactFormTitle: "Зв'яжіться з нами",
      programBookingTitle: "Заброньте вашу програму",
      partnerFormTitle: "Станьте нашим партнером",
      teamFormTitle: "Приєднайтесь до нашої команди",
      reviewFormTitle: "Залиште відгук",
      yourName: "Ваше ім'я",
      yourEmail: "Ваш Email",
      yourPhone: "Ваш телефон (необов'язково)",
      yourMessage: "Ваше повідомлення",
      selectProgram: "Оберіть програму",
      eventDate: "Бажана дата події",
      numberOfKids: "Кількість дітей",
      preferredTime: "Бажаний час",
      rating: "Ваша оцінка",
      send: "Надіслати повідомлення",
      submitting: "Відправка...",
      programPlaceholder:
        "Розкажіть нам про вашу подію мрії...",
      messagePlaceholder:
        "Розкажіть нам більше про те, що ви шукаете...",
      partnerMessage:
        "Розкажіть нам про ваш бізнес і як ви хотіли б співпрацювати з нами...",
      teamMessage:
        "Розкажіть нам про ваш досвід і чому ви хочете приєднатися до нашої команди...",
      reviewMessage:
        "Поділіться вашим досвідом користування нашими послугами...",
      selectProgramPlaceholder:
        "Оберіть програму, яка вас цікавить",
      morning: "Ранок (9:00 - 12:00)",
      afternoon: "День (12:00 - 17:00)",
      evening: "Вечір (17:00 - 20:00)",
      weekend: "Вихідні",
      weekday: "Будній день",
    },
  };

  const t =
    translations[
      currentLanguage as keyof typeof translations
    ] || translations.en;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleRatingClick = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
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

    // Validate message for most form types
    if (
      formType !== "program-booking" &&
      !formData.message.trim()
    ) {
      newErrors.message = messages.messageRequired;
    }

    // Validate program selection for booking forms
    if (
      formType === "program-booking" &&
      !formData.programChoice
    ) {
      newErrors.programChoice = messages.programRequired;
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
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        message: formData.message || getDefaultMessage(),
        programChoice: formData.programChoice || undefined,
        formType,
        eventDate: formData.eventDate || undefined,
        numberOfKids: formData.numberOfKids || undefined,
        preferredTime: formData.preferredTime || undefined,
        rating: formData.rating || undefined,
        language: currentLanguage,
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
          message: "",
          programChoice: programTitle || "",
          eventDate: "",
          numberOfKids: "",
          preferredTime: "",
          rating: 0,
        });
        setErrors({});

        // Call success callback if provided
        if (onSuccess) {
          onSuccess();
        }
      } else {
        FormspreeService.showNotification(
          result.message || messages.submitError,
          "error",
        );
      }
    } catch (error) {
      console.error("Form submission error:", error);
      FormspreeService.showNotification(
        messages.networkError,
        "error",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDefaultMessage = (): string => {
    switch (formType) {
      case "program-booking":
        return `Program booking request for: ${formData.programChoice || "General inquiry"}`;
      case "partner":
        return "Partnership inquiry";
      case "team":
        return "Team application";
      case "review":
        return formData.message || "Customer review";
      default:
        return "Contact inquiry";
    }
  };

  const getFormTitle = (): string => {
    switch (formType) {
      case "program-booking":
        return t.programBookingTitle;
      case "partner":
        return t.partnerFormTitle;
      case "team":
        return t.teamFormTitle;
      case "review":
        return t.reviewFormTitle;
      default:
        return t.contactFormTitle;
    }
  };

  const getMessagePlaceholder = (): string => {
    switch (formType) {
      case "program-booking":
        return t.programPlaceholder;
      case "partner":
        return t.partnerMessage;
      case "team":
        return t.teamMessage;
      case "review":
        return t.reviewMessage;
      default:
        return t.messagePlaceholder;
    }
  };

  return (
    <div className={wrapperClassName}>
      {showHeader && (
        <div className="mb-6">
          <h3 className="text-2xl font-black text-gray-800 mb-3">
            {getFormTitle()}
          </h3>
          <p className="text-gray-600">{t.weCanHelp}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name and Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label className="block text-base sm:text-lg font-medium text-gray-800 mb-2">
              {t.yourName} *
            </label>
            <Input
              value={formData.name}
              onChange={(e) =>
                handleInputChange("name", e.target.value)
              }
              placeholder="Enter your name"
              className={`w-full min-h-[40px] h-[44px] rounded-2xl border-2 px-4 sm:px-6 py-3 text-base transition-colors duration-200 ${
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
            <label className="block text-base sm:text-lg font-medium text-gray-800 mb-2">
              {t.yourEmail} *
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) =>
                handleInputChange("email", e.target.value)
              }
              placeholder="Enter your email"
              className={`w-full min-h-[40px] h-[44px] rounded-2xl border-2 px-4 sm:px-6 py-3 text-base transition-colors duration-200 ${
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

        {/* Phone */}
        <div>
          <label className="block text-base sm:text-lg font-medium text-gray-800 mb-2">
            {t.yourPhone}
          </label>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              handleInputChange("phone", e.target.value)
            }
            placeholder="+30 698 745 1036"
            className={`w-full min-h-[40px] h-[44px] rounded-2xl border-2 px-4 sm:px-6 py-3 text-base transition-colors duration-200 ${
              errors.phone
                ? "border-red-500"
                : "border-gray-300 focus:border-[#B26CC5]"
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Program Selection (for booking and contact forms) */}
        {(formType === "program-booking" ||
          formType === "contact") && (
          <div>
            <label className="block text-base sm:text-lg font-medium text-gray-800 mb-2">
              {t.selectProgram}{" "}
              {formType === "program-booking" ? "*" : ""}
            </label>
            <Select
              value={formData.programChoice}
              onValueChange={(value) =>
                handleInputChange("programChoice", value)
              }
            >
              <SelectTrigger
                className={`w-full min-h-[40px] h-[44px] rounded-2xl border-2 px-4 sm:px-6 py-3 text-base transition-colors duration-200 ${
                  errors.programChoice
                    ? "border-red-500"
                    : "border-gray-300 focus:border-[#B26CC5]"
                }`}
              >
                <SelectValue
                  placeholder={t.selectProgramPlaceholder}
                />
              </SelectTrigger>
              <SelectContent>
                {availablePrograms.map((program) => (
                  <SelectItem key={program} value={program}>
                    {program}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.programChoice && (
              <p className="text-red-500 text-sm mt-1">
                {errors.programChoice}
              </p>
            )}
          </div>
        )}

        {/* Event Details (for booking forms) */}
        {formType === "program-booking" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <div>
                <label className="block text-base sm:text-lg font-medium text-gray-800 mb-2">
                  {t.eventDate}
                </label>
                <Input
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) =>
                    handleInputChange(
                      "eventDate",
                      e.target.value,
                    )
                  }
                  className="w-full min-h-[40px] h-[44px] rounded-2xl border-2 border-gray-300 px-4 sm:px-6 py-3 text-base focus:border-[#B26CC5] transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-base sm:text-lg font-medium text-gray-800 mb-2">
                  {t.numberOfKids}
                </label>
                <Select
                  value={formData.numberOfKids}
                  onValueChange={(value) =>
                    handleInputChange("numberOfKids", value)
                  }
                >
                  <SelectTrigger className="w-full min-h-[40px] h-[44px] rounded-2xl border-2 border-gray-300 px-4 sm:px-6 py-3 text-base focus:border-[#B26CC5] transition-colors duration-200">
                    <SelectValue placeholder="Select number" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(20)].map((_, i) => (
                      <SelectItem
                        key={i + 1}
                        value={`${i + 1}`}
                      >
                        {i + 1} {i === 0 ? "child" : "children"}
                      </SelectItem>
                    ))}
                    <SelectItem value="20+">
                      20+ children
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="sm:col-span-2 lg:col-span-1">
                <label className="block text-base sm:text-lg font-medium text-gray-800 mb-2">
                  {t.preferredTime}
                </label>
                <Select
                  value={formData.preferredTime}
                  onValueChange={(value) =>
                    handleInputChange("preferredTime", value)
                  }
                >
                  <SelectTrigger className="w-full min-h-[40px] h-[44px] rounded-2xl border-2 border-gray-300 px-4 sm:px-6 py-3 text-base focus:border-[#B26CC5] transition-colors duration-200">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">
                      {t.morning}
                    </SelectItem>
                    <SelectItem value="afternoon">
                      {t.afternoon}
                    </SelectItem>
                    <SelectItem value="evening">
                      {t.evening}
                    </SelectItem>
                    <SelectItem value="weekend">
                      {t.weekend}
                    </SelectItem>
                    <SelectItem value="weekday">
                      {t.weekday}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        )}

        {/* Rating (for review forms) */}
        {formType === "review" && (
          <div>
            <label className="block text-lg font-medium text-gray-800 mb-4">
              {t.rating} *
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  className="group p-1"
                >
                  <Star
                    className={`w-8 h-8 transition-colors duration-200 ${
                      formData.rating >= star
                        ? "text-[#FFE366] fill-[#FFE366]"
                        : "text-gray-300 hover:text-[#FFE366] hover:fill-[#FFE366]"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-4 text-gray-600 text-sm">
                {formData.rating > 0
                  ? `${formData.rating}/5 stars`
                  : "Click to rate"}
              </span>
            </div>
          </div>
        )}

        {/* Message */}
        <div>
          <label className="block text-base sm:text-lg font-medium text-gray-800 mb-2">
            {t.yourMessage}{" "}
            {formType !== "program-booking" ? "*" : ""}
          </label>
          <Textarea
            value={formData.message}
            onChange={(e) =>
              handleInputChange("message", e.target.value)
            }
            placeholder={getMessagePlaceholder()}
            rows={formType === "review" ? 6 : 4}
            className={`w-full rounded-2xl border-2 px-4 sm:px-6 py-3 sm:py-4 text-base leading-relaxed transition-colors duration-200 resize-none ${
              errors.message
                ? "border-red-500"
                : "border-gray-300 focus:border-[#B26CC5]"
            }`}
            required={formType !== "program-booking"}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.message}
            </p>
          )}
        </div>

        {/* Honeypot field for spam protection */}
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          style={{ display: "none" }}
        />

        {/* Consent checkbox for reviews */}
        {formType === "review" && (
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="consent"
              checked={consentChecked}
              onChange={(e) =>
                setConsentChecked(e.target.checked)
              }
              className="mt-1 w-4 h-4 text-[#B26CC5] border-2 border-gray-300 rounded focus:ring-[#B26CC5] focus:ring-2"
              required
            />
            <label
              htmlFor="consent"
              className="text-sm text-gray-700 leading-relaxed"
            >
              I agree my first name and review may be published.{" "}
              <span className="text-red-500">*</span>
            </label>
          </div>
        )}

        {/* Legal links */}
        <div className="text-center text-sm text-gray-600">
          <p>
            By submitting this form, you agree to our{" "}
            <button
              type="button"
              onClick={() => window.open("/privacy", "_blank")}
              className="text-[#B26CC5] hover:underline"
            >
              Privacy Policy
            </button>{" "}
            and{" "}
            <button
              type="button"
              onClick={() => window.open("/terms", "_blank")}
              className="text-[#B26CC5] hover:underline"
            >
              Terms & Conditions
            </button>
          </p>
        </div>

        {/* Submit Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full min-h-[50px] h-[50px] bg-gradient-to-r from-[#FFE366] to-[#EEB601] text-[#60266F] hover:from-[#EEB601] hover:to-[#FFE366] text-lg sm:text-xl font-black px-6 py-3 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50"
            style={{ fontFamily: "Bowlby One SC, sans-serif" }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin flex-shrink-0" />
                <span className="truncate">
                  {messages.submitting}
                </span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                <span className="truncate">{t.send}</span>
              </>
            )}
          </Button>
        </motion.div>
      </form>
    </div>
  );
}