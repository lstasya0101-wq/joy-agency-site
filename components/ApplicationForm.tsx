import { useState } from "react";
import { motion } from "motion/react";
import {
  X,
  Send,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Heart,
  Users,
  Star,
  Building,
  Globe,
  CheckCircle,
  AlertCircle,
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
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Checkbox } from "./ui/checkbox";

interface ApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
  type: "team" | "partner";
  currentLanguage: string;
  onNavigateToPage?: (page: "privacy" | "terms") => void;
}

export default function ApplicationForm({
  isOpen,
  onClose,
  type,
  currentLanguage,
  onNavigateToPage,
}: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    // Partner fields
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    message: "",
    consent: false,
    // Team fields
    fullName: "",
    city: "",
    role: "",
    portfolio: "",
    teamConsent: false,
    // Legacy fields for team applications
    location: "",
    experience: "",
    motivation: "",
    availability: "",
    skills: "",
    businessName: "",
    businessType: "",
    services: "",
    yearsInBusiness: "",
    references: "",
    specialization: "",
    // Honeypot field
    _gotcha: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>(
    {},
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Validation functions
  const validateField = (
    field: string,
    value: string,
  ): string => {
    switch (field) {
      case "companyName":
        return !value.trim()
          ? t.fieldRequired
          : value.trim().length < 2
            ? t.nameMinLength
            : "";
      case "contactName":
        return !value.trim()
          ? t.fieldRequired
          : value.trim().length < 2
            ? t.nameMinLength
            : "";
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !value.trim()
          ? t.fieldRequired
          : !emailRegex.test(value)
            ? t.emailInvalid
            : "";
      case "message":
        return !value.trim()
          ? t.fieldRequired
          : value.trim().length < 10
            ? t.messageMinLength
            : "";
      case "consent":
        return !formData.consent ? t.consentRequired : "";
      case "teamConsent":
        return !formData.teamConsent ? t.consentRequired : "";
      default:
        return "";
    }
  };

  // Language translations
  const translations = {
    en: {
      joinTeamTitle: "Join Our Amazing Team!",
      partnerTitle: "Become Our Partner!",
      joinTeamSubtitle:
        "We're looking for passionate entertainers who love bringing joy to children and families.",
      partnerSubtitle:
        "Join our network of trusted local businesses in Thessaloniki.",

      // Partner form fields
      companyName: "Company Name",
      contactName: "Contact Name",
      email: "Email Address",
      phone: "Phone Number",
      website: "Website",
      message: "Message",
      consent: "Consent",

      // Team form fields
      fullName: "Full Name",
      city: "City",
      role: "Role you're applying for",
      portfolio: "Portfolio / CV Link",
      teamConsent: "Team Consent",

      // Legacy team fields
      location: "Location/City",
      experience: "Years of Experience in Entertainment",
      motivation: "Why do you want to join Joy Events?",
      availability: "Availability",
      skills: "Special Skills & Talents",
      portfolio: "Portfolio/Social Media Links",

      // Partner specific fields
      businessName: "Business Name",
      businessType: "Type of Business",
      services: "Services You Provide",
      yearsInBusiness: "Years in Business",
      references: "Client References (Optional)",
      specialization: "Your Specialization",

      // Options
      fullTime: "Full-time",
      partTime: "Part-time",
      weekends: "Weekends only",
      flexible: "Flexible",

      // Business types
      catering: "Catering",
      photography: "Photography",
      decorations: "Decorations",
      venue: "Venue",
      entertainment: "Entertainment",
      other: "Other",

      // Actions
      submitApplication: "Submit Application",
      cancel: "Cancel",

      // Status messages
      applicationSent:
        "Application submitted successfully! We'll contact you soon.",
      submissionError:
        "There was an error submitting your application. Please try again.",

      // Validation messages
      fieldRequired: "This field is required",
      nameMinLength: "Name must be at least 2 characters",
      emailInvalid: "Please enter a valid email address",
      messageMinLength:
        "Message must be at least 10 characters",
      consentRequired: "You must agree to the consent terms",

      // Legal links
      consentText:
        "I agree my data may be used to contact me regarding partnerships.",
      teamConsentText:
        "I agree my data may be used for recruitment purposes.",
      readMore: "Read our",
      privacyPolicy: "Privacy Policy",
      terms: "Terms & Conditions",
      and: "and",

      // Placeholders
      // Partner placeholders
      companyNamePlaceholder: "Your company name",
      contactNamePlaceholder: "Your full name",
      websitePlaceholder: "https://your-website.com (optional)",
      messagePlaceholder:
        "Tell us about your business and how you'd like to partner with us...",

      // Team placeholders
      fullNamePlaceholder: "Your full name",
      emailPlaceholder: "your.email@example.com",
      phonePlaceholder: "+30 123 456 7890 (optional)",
      cityPlaceholder: "Thessaloniki, Greece (optional)",
      rolePlaceholder:
        "e.g., Children's Entertainer, Face Painter, Magician (optional)",
      portfolioPlaceholder:
        "LinkedIn, Instagram, or CV link (optional)",
      messageTeamPlaceholder:
        "Tell us why you want to join our team and what makes you special...",
      locationPlaceholder: "Thessaloniki, Greece",
      experiencePlaceholder:
        "e.g., 3 years in children's entertainment",
      motivationPlaceholder:
        "Tell us why you're passionate about entertaining children...",
      skillsPlaceholder:
        "e.g., Face painting, balloon twisting, magic tricks...",
      portfolioPlaceholder:
        "Links to your work, Instagram, etc.",
      businessNamePlaceholder: "Your business name",
      servicesPlaceholder: "Describe the services you offer...",
      referencesPlaceholder:
        "Contact information for previous clients...",
      specializationPlaceholder:
        "What makes your business unique...",
    },
    el: {
      joinTeamTitle: "Ενταχθείτε στην Υπέροχη Ομάδα μας!",
      partnerTitle: "Γίνετε Συνεργάτης μας!",
      joinTeamSubtitle:
        "Αναζητούμε παθιασμένους διασκεδαστές που αγαπούν να φέρνουν χαρά σε παιδιά και οικογένειες.",
      partnerSubtitle:
        "Ενταχθείτε στο δίκτυο των αξιόπιστων τοπικών επιχειρήσεών μας στη Θεσσαλονίκη.",

      // Partner form fields
      companyName: "Όνομα Εταιρείας",
      contactName: "Όνομα Επικοινωνίας",
      email: "Διεύθυνση Email",
      phone: "Τηλέφωνο",
      website: "Ιστότοπος",
      message: "Μήνυμα",
      consent: "Συναίνεση",

      // Team form fields
      fullName: "Πλήρες Όνομα",
      city: "Πόλη",
      role: "Ρόλος για τον οποίο κάνετε αίτηση",
      portfolio: "Portfolio / Σύνδεσμος CV",
      teamConsent: "Συναίνεση Ομάδας",

      // Legacy team fields
      location: "Τοποθεσία/Πόλη",

      experience: "Χρόνια Εμπειρίας στη Διασκέδαση",
      motivation: "Γιατί θέλετε να ενταχθείτε στα Joy Events;",
      availability: "Διαθεσιμότητα",
      skills: "Ειδικές Δεξιότητες & Ταλέντα",
      portfolio: "Portfolio/Σύνδεσμοι Social Media",

      businessName: "Όνομα Επιχείρησης",
      businessType: "Τύπος Επιχείρησης",
      services: "Υπηρεσίες που Παρέχετε",
      yearsInBusiness: "Χρόνια στην Επιχείρηση",
      references: "Συστάσεις Πελατών (Προαιρετικό)",
      specialization: "Η Ειδικότητά σας",

      fullTime: "Πλήρης απασχόληση",
      partTime: "Μερική απασχόληση",
      weekends: "Μόνο Σαββατοκύριακα",
      flexible: "Ευέλικτη",

      catering: "Catering",
      photography: "Φωτογραφία",
      decorations: "Διακοσμήσεις",
      venue: "Χώρος εκδηλώσεων",
      entertainment: "Διασκέδαση",
      other: "Άλλο",

      submitApplication: "Υποβολή Αίτησης",
      cancel: "Ακύρωση",

      applicationSent:
        "Η αίτηση υποβλήθηκε επιτυχώς! Θα επικοινωνήσουμε μαζί σας σύντομα.",
      submissionError:
        "Υπήρξε σφάλμα κατά την υποβολή της αίτησής σας. Παρακαλώ δοκιμάστε ξανά.",

      // Validation messages
      fieldRequired: "Αυτό το πεδίο είναι υποχρεωτικό",
      nameMinLength:
        "Το όνομα πρέπει να έχει τουλάχιστον 2 χαρακτήρες",
      emailInvalid:
        "Παρακαλώ εισάγετε μια έγκυρη διεύθυνση email",
      messageMinLength:
        "Το μήνυμα πρέπει να έχει τουλάχιστον 10 χαρακτήρες",
      consentRequired:
        "Πρέπει να συμφωνήσετε με τους όρους συναίνεσης",

      // Legal links
      consentText:
        "Συμφωνώ τα δεδομένα μου να χρησιμοποιηθούν για επικοινωνία σχετικά με συνεργασίες.",
      teamConsentText:
        "Συμφωνώ τα δεδομένα μου να χρησιμοποιηθούν για σκοπούς πρόσληψης.",
      readMore: "Διαβάστε τους",
      privacyPolicy: "Όρους Προστασίας Προσωπικών Δεδομένων",
      terms: "Όρους & Προϋποθέσεις",
      and: "και",

      // Partner placeholders
      companyNamePlaceholder: "Το όνομα της εταιρείας σας",
      contactNamePlaceholder: "Το πλήρες όνομά σας",
      websitePlaceholder:
        "https://ο-ιστότοπός-σας.com (προαιρετικό)",
      messagePlaceholder:
        "Πείτε μας για την επιχείρησή σας και πώς θα θέλατε να συνεργαστείτε μαζί μας...",

      // Team placeholders
      fullNamePlaceholder: "Το πλήρες όνομά σας",
      emailPlaceholder: "το.email.σας@example.com",
      phonePlaceholder: "+30 123 456 7890 (προαιρετικό)",
      cityPlaceholder: "Θεσσαλονίκη, Ελλάδα (προαιρετικό)",
      rolePlaceholder:
        "π.χ., Διασκεδαστής Παιδιών, Face Painter, Μάγος (προαιρετικό)",
      portfolioPlaceholder:
        "Σύνδεσμος LinkedIn, Instagram ή CV (προαιρετικό)",
      messageTeamPlaceholder:
        "Πείτε μας γιατί θέλετε να ενταχθείτε στην ομάδα μας και τι σας κάνει ξεχωριστό...",
      locationPlaceholder: "Θεσσαλονίκη, Ελλάδα",
      experiencePlaceholder:
        "π.χ., 3 χρόνια στη διασκέδαση παιδιών",
      motivationPlaceholder:
        "Πείτε μας γιατί έχετε πάθος για τη διασκέδαση παιδιών...",
      skillsPlaceholder:
        "π.χ., Face painting, μπαλόνια, μαγικά...",
      portfolioPlaceholder:
        "Σύνδεσμοι στη δουλειά σας, Instagram, κλπ.",
      businessNamePlaceholder: "Το όνομα της επιχείρησής σας",
      servicesPlaceholder:
        "Περιγράψτε τις υπηρεσίες που προσφέρετε...",
      referencesPlaceholder:
        "Στοιχεία επικοινωνίας προηγούμενων πελατών...",
      specializationPlaceholder:
        "Τι κάνει την επιχείρησή σας μοναδική...",
    },
    uk: {
      joinTeamTitle:
        "Приєднайтеся до Нашої Дивовижної Команди!",
      partnerTitle: "Станьте Нашим Партнером!",
      joinTeamSubtitle:
        "Ми шукаємо пристрасних аніматорів, які люблять приносити радість дітям та сім'ям.",
      partnerSubtitle:
        "Приєднайтеся до нашої мережі надійних місцевих бізнесів у Салоніках.",

      // Partner form fields
      companyName: "Назва Компанії",
      contactName: "Контактне Ім'я",
      email: "Адреса Email",
      phone: "Номер Телефону",
      website: "Веб-сайт",
      message: "Повідомлення",
      consent: "Згода",

      // Team form fields
      fullName: "Повне Ім'я",
      city: "Місто",
      role: "Роль, на яку ви подаєте заявку",
      portfolio: "Портфоліо / Посилання на CV",
      teamConsent: "Згода Команди",

      // Legacy team fields
      location: "Розташування/Місто",

      experience: "Роки Досвіду в Розвагах",
      motivation: "Чому ви хочете приєднатися до Joy Events?",
      availability: "Доступність",
      skills: "Спеціальні Навички та Таланти",
      portfolio: "Портфоліо/Посилання на Соц. Мережі",

      businessName: "Назва Бізнесу",
      businessType: "Тип Бізнесу",
      services: "Послуги, які Ви Надаєте",
      yearsInBusiness: "Роки в Бізнесі",
      references: "Рекомендації Клієнтів (Опціонально)",
      specialization: "Ваша Спеціалізація",

      fullTime: "Повний день",
      partTime: "Неповний день",
      weekends: "Тільки вихідні",
      flexible: "Гнучкий",

      catering: "Кейтеринг",
      photography: "Фотографія",
      decorations: "Декорації",
      venue: "Майданчик",
      entertainment: "Розваги",
      other: "Інше",

      submitApplication: "Подати Заявку",
      cancel: "Скасувати",

      applicationSent:
        "Заявку успішно подано! Ми зв'яжемося з вами найближчим часом.",
      submissionError:
        "Сталася помилка при поданні вашої заявки. Будь ласка, спробуйте ще раз.",

      // Validation messages
      fieldRequired: "Це поле є обов'язковим",
      nameMinLength: "Ім'я повинно містити принаймні 2 символи",
      emailInvalid:
        "Будь ласка, введіть дійсну адресу електронної пошти",
      messageMinLength:
        "Повідомлення повинно містити принаймні 10 символів",
      consentRequired: "Ви повинні погодитися з умовами згоди",

      // Legal links
      consentText:
        "Я погоджуюся, що мої дані можуть бути використані для зв'язку зі мною щодо партнерства.",
      teamConsentText:
        "Я погоджуюся, що мої дані можуть бути використані для цілей найму.",
      readMore: "Прочитайте нашу",
      privacyPolicy: "Політику Конфіденційності",
      terms: "Умови та Положення",
      and: "та",

      // Partner placeholders
      companyNamePlaceholder: "Назва вашої компанії",
      contactNamePlaceholder: "Ваше повне ім'я",
      websitePlaceholder: "https://ваш-сайт.com (опціонально)",
      messagePlaceholder:
        "Розкажіть нам про ваш бізнес і як ви хотіли б стати партнерами з нами...",

      // Team placeholders
      fullNamePlaceholder: "Ваше повне ім'я",
      emailPlaceholder: "ваш.email@example.com",
      phonePlaceholder: "+30 123 456 7890 (опціонально)",
      cityPlaceholder: "Салоніки, Греція (опціонально)",
      rolePlaceholder:
        "наприклад, Дитячий Аніматор, Художник, Фокусник (опціонально)",
      portfolioPlaceholder:
        "Посилання на LinkedIn, Instagram або CV (опціонально)",
      messageTeamPlaceholder:
        "Розкажіть нам, чому ви хочете приєднатися до нашої команди і що робить вас особливим...",
      locationPlaceholder: "Салоніки, Греція",
      experiencePlaceholder:
        "наприклад, 3 роки в розвагах для дітей",
      motivationPlaceholder:
        "Розкажіть нам, чому ви захоплюєтеся розвагами для дітей...",
      skillsPlaceholder:
        "наприклад, розмальовування облич, повітряні кульки, фокуси...",
      portfolioPlaceholder:
        "Посилання на вашу роботу, Instagram, тощо.",
      businessNamePlaceholder: "Назва вашого бізнесу",
      servicesPlaceholder: "Опишіть послуги, які ви надаєте...",
      referencesPlaceholder:
        "Контактна інформація попередніх клієнтів...",
      specializationPlaceholder:
        "Що робить ваш бізнес унікальним...",
    },
  };

  const t =
    translations[currentLanguage as keyof typeof translations];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const resetForm = () => {
    setFormData({
      // Partner fields
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      website: "",
      message: "",
      consent: false,
      // Team fields
      fullName: "",
      city: "",
      role: "",
      portfolio: "",
      teamConsent: false,
      // Legacy fields for team applications
      location: "",
      experience: "",
      motivation: "",
      availability: "",
      skills: "",
      businessName: "",
      businessType: "",
      services: "",
      yearsInBusiness: "",
      references: "",
      specialization: "",
      _gotcha: "",
    });
    setErrors({});
    setSubmitStatus({ type: null, message: "" });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (type === "partner") {
      // Partner form validation
      const companyNameError = validateField(
        "companyName",
        formData.companyName,
      );
      if (companyNameError)
        newErrors.companyName = companyNameError;

      const contactNameError = validateField(
        "contactName",
        formData.contactName,
      );
      if (contactNameError)
        newErrors.contactName = contactNameError;

      const emailError = validateField("email", formData.email);
      if (emailError) newErrors.email = emailError;

      const messageError = validateField(
        "message",
        formData.message,
      );
      if (messageError) newErrors.message = messageError;

      const consentError = validateField(
        "consent",
        formData.consent.toString(),
      );
      if (consentError) newErrors.consent = consentError;
    } else {
      // Team form validation
      const nameError = validateField(
        "contactName",
        formData.fullName,
      );
      if (nameError) newErrors.fullName = nameError;

      const emailError = validateField("email", formData.email);
      if (emailError) newErrors.email = emailError;

      const messageError = validateField(
        "message",
        formData.message,
      );
      if (messageError) newErrors.message = messageError;

      const consentError = validateField(
        "teamConsent",
        formData.teamConsent.toString(),
      );
      if (consentError) newErrors.teamConsent = consentError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check honeypot
    if (formData._gotcha) {
      console.log("Spam detected");
      return;
    }

    if (!validateForm()) {
      setSubmitStatus({
        type: "error",
        message: t.submissionError,
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const formDataToSubmit = new FormData();

      if (type === "partner") {
        // Partner form submission to the specific endpoint
        formDataToSubmit.append(
          "companyName",
          formData.companyName,
        );
        formDataToSubmit.append(
          "contactName",
          formData.contactName,
        );
        formDataToSubmit.append("email", formData.email);
        formDataToSubmit.append("phone", formData.phone || "");
        formDataToSubmit.append(
          "website",
          formData.website || "",
        );
        formDataToSubmit.append("message", formData.message);
        formDataToSubmit.append(
          "consent",
          formData.consent.toString(),
        );
        formDataToSubmit.append("language", currentLanguage);
        formDataToSubmit.append("formType", "partner");
        formDataToSubmit.append("_gotcha", formData._gotcha);

        const response = await fetch(
          "https://formspree.io/f/mzzjgyap",
          {
            method: "POST",
            body: formDataToSubmit,
            headers: {
              Accept: "application/json",
            },
          },
        );

        if (response.ok) {
          setSubmitStatus({
            type: "success",
            message: t.applicationSent,
          });
          resetForm();
          setTimeout(() => onClose(), 3000);
        } else {
          const data = await response.json();
          setSubmitStatus({
            type: "error",
            message: data.error || t.submissionError,
          });
        }
      } else {
        // Team form submission to the new endpoint
        formDataToSubmit.append("fullName", formData.fullName);
        formDataToSubmit.append("email", formData.email);
        formDataToSubmit.append("phone", formData.phone || "");
        formDataToSubmit.append("city", formData.city || "");
        formDataToSubmit.append("role", formData.role || "");
        formDataToSubmit.append(
          "portfolio",
          formData.portfolio || "",
        );
        formDataToSubmit.append("message", formData.message);
        formDataToSubmit.append(
          "teamConsent",
          formData.teamConsent.toString(),
        );
        formDataToSubmit.append("language", currentLanguage);
        formDataToSubmit.append("formType", "team");
        formDataToSubmit.append("_gotcha", formData._gotcha);

        const response = await fetch(
          "https://formspree.io/f/xqaybwdn",
          {
            method: "POST",
            body: formDataToSubmit,
            headers: {
              Accept: "application/json",
            },
          },
        );

        if (response.ok) {
          setSubmitStatus({
            type: "success",
            message: t.applicationSent,
          });
          resetForm();
          setTimeout(() => onClose(), 3000);
        } else {
          const data = await response.json();
          setSubmitStatus({
            type: "error",
            message: data.error || t.submissionError,
          });
        }
      }
    } catch (error) {
      console.error("Application submission error:", error);
      setSubmitStatus({
        type: "error",
        message: t.submissionError,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <Card className="border-none shadow-none rounded-3xl">
          <CardHeader className="relative bg-gradient-to-r from-[#B26CC5] via-[#9C5CB0] to-[#FFE366] text-white rounded-t-3xl">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <CardTitle className="text-center">
              <div className="flex items-center justify-center mb-4">
                {type === "team" ? (
                  <Users className="w-8 h-8 mr-3" />
                ) : (
                  <Star className="w-8 h-8 mr-3" />
                )}
              </div>
              <h2
                className="text-3xl font-black mb-2"
                style={{
                  fontFamily: "Bowlby One SC, sans-serif",
                }}
              >
                {type === "team"
                  ? t.joinTeamTitle
                  : t.partnerTitle}
              </h2>
              <p className="text-lg opacity-90 font-normal">
                {type === "team"
                  ? t.joinTeamSubtitle
                  : t.partnerSubtitle}
              </p>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-8">
            {/* Status Messages */}
            {submitStatus.type && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl mb-6 flex items-center ${
                  submitStatus.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
                role="alert"
                aria-live="polite"
              >
                {submitStatus.type === "success" ? (
                  <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                )}
                {submitStatus.message}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot field - hidden from users */}
              <input
                type="text"
                name="_gotcha"
                value={formData._gotcha}
                onChange={(e) =>
                  handleInputChange("_gotcha", e.target.value)
                }
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              {type === "partner" ? (
                <>
                  {/* Partner Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 mb-2"
                        htmlFor="companyName"
                      >
                        <Building className="w-4 h-4 inline mr-2" />
                        {t.companyName} *
                      </label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) =>
                          handleInputChange(
                            "companyName",
                            e.target.value,
                          )
                        }
                        placeholder={t.companyNamePlaceholder}
                        className={`w-full min-h-[40px] h-[40px] rounded-xl border-2 transition-colors ${
                          errors.companyName
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-300 focus:border-[#B26CC5]"
                        }`}
                        required
                        aria-describedby={
                          errors.companyName
                            ? "companyName-error"
                            : undefined
                        }
                      />
                      {errors.companyName && (
                        <p
                          id="companyName-error"
                          className="text-red-500 text-sm mt-1"
                          role="alert"
                        >
                          {errors.companyName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 mb-2"
                        htmlFor="contactName"
                      >
                        <User className="w-4 h-4 inline mr-2" />
                        {t.contactName} *
                      </label>
                      <Input
                        id="contactName"
                        value={formData.contactName}
                        onChange={(e) =>
                          handleInputChange(
                            "contactName",
                            e.target.value,
                          )
                        }
                        placeholder={t.contactNamePlaceholder}
                        className={`w-full min-h-[40px] h-[40px] rounded-xl border-2 transition-colors ${
                          errors.contactName
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-300 focus:border-[#B26CC5]"
                        }`}
                        required
                        aria-describedby={
                          errors.contactName
                            ? "contactName-error"
                            : undefined
                        }
                      />
                      {errors.contactName && (
                        <p
                          id="contactName-error"
                          className="text-red-500 text-sm mt-1"
                          role="alert"
                        >
                          {errors.contactName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 mb-2"
                        htmlFor="email"
                      >
                        <Mail className="w-4 h-4 inline mr-2" />
                        {t.email} *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange(
                            "email",
                            e.target.value,
                          )
                        }
                        placeholder={t.emailPlaceholder}
                        className={`w-full min-h-[40px] h-[40px] rounded-xl border-2 transition-colors ${
                          errors.email
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-300 focus:border-[#B26CC5]"
                        }`}
                        required
                        aria-describedby={
                          errors.email
                            ? "email-error"
                            : undefined
                        }
                      />
                      {errors.email && (
                        <p
                          id="email-error"
                          className="text-red-500 text-sm mt-1"
                          role="alert"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 mb-2"
                        htmlFor="phone"
                      >
                        <Phone className="w-4 h-4 inline mr-2" />
                        {t.phone}
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange(
                            "phone",
                            e.target.value,
                          )
                        }
                        placeholder={t.phonePlaceholder}
                        className="w-full min-h-[40px] h-[40px] rounded-xl border-2 border-gray-300 focus:border-[#B26CC5] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-2"
                      htmlFor="website"
                    >
                      <Globe className="w-4 h-4 inline mr-2" />
                      {t.website}
                    </label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) =>
                        handleInputChange(
                          "website",
                          e.target.value,
                        )
                      }
                      placeholder={t.websitePlaceholder}
                      className="w-full min-h-[40px] h-[40px] rounded-xl border-2 border-gray-300 focus:border-[#B26CC5] transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-2"
                      htmlFor="message"
                    >
                      <Heart className="w-4 h-4 inline mr-2" />
                      {t.message} *
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange(
                          "message",
                          e.target.value,
                        )
                      }
                      placeholder={t.messagePlaceholder}
                      className={`w-full rounded-xl border-2 transition-colors min-h-[120px] ${
                        errors.message
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-300 focus:border-[#B26CC5]"
                      }`}
                      rows={6}
                      required
                      aria-describedby={
                        errors.message
                          ? "message-error"
                          : undefined
                      }
                    />
                    {errors.message && (
                      <p
                        id="message-error"
                        className="text-red-500 text-sm mt-1"
                        role="alert"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Consent Checkbox */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="consent"
                        checked={formData.consent}
                        onCheckedChange={(checked) =>
                          handleInputChange(
                            "consent",
                            checked.toString(),
                          )
                        }
                        className={`mt-1 ${errors.consent ? "border-red-500" : ""}`}
                        required
                        aria-describedby={
                          errors.consent
                            ? "consent-error"
                            : undefined
                        }
                      />
                      <label
                        htmlFor="consent"
                        className="text-sm text-gray-700 leading-relaxed cursor-pointer"
                      >
                        {t.consentText}
                      </label>
                    </div>
                    {errors.consent && (
                      <p
                        id="consent-error"
                        className="text-red-500 text-sm"
                        role="alert"
                      >
                        {errors.consent}
                      </p>
                    )}

                    {/* Legal Links */}
                    <div className="text-sm text-gray-600 leading-relaxed">
                      {t.readMore}{" "}
                      <button
                        type="button"
                        onClick={() =>
                          onNavigateToPage?.("privacy")
                        }
                        className="text-[#B26CC5] hover:text-[#9C5CB0] underline focus:outline-none focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-2 rounded"
                      >
                        {t.privacyPolicy}
                      </button>{" "}
                      {t.and}{" "}
                      <button
                        type="button"
                        onClick={() =>
                          onNavigateToPage?.("terms")
                        }
                        className="text-[#B26CC5] hover:text-[#9C5CB0] underline focus:outline-none focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-2 rounded"
                      >
                        {t.terms}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Team Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 mb-2"
                        htmlFor="fullName"
                      >
                        <User className="w-4 h-4 inline mr-2" />
                        {t.fullName} *
                      </label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) =>
                          handleInputChange(
                            "fullName",
                            e.target.value,
                          )
                        }
                        placeholder={t.fullNamePlaceholder}
                        className={`w-full min-h-[40px] h-[40px] rounded-xl border-2 transition-colors ${
                          errors.fullName
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-300 focus:border-[#B26CC5]"
                        }`}
                        required
                        aria-describedby={
                          errors.fullName
                            ? "fullName-error"
                            : undefined
                        }
                      />
                      {errors.fullName && (
                        <p
                          id="fullName-error"
                          className="text-red-500 text-sm mt-1"
                          role="alert"
                        >
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 mb-2"
                        htmlFor="teamEmail"
                      >
                        <Mail className="w-4 h-4 inline mr-2" />
                        {t.email} *
                      </label>
                      <Input
                        id="teamEmail"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange(
                            "email",
                            e.target.value,
                          )
                        }
                        placeholder={t.emailPlaceholder}
                        className={`w-full min-h-[40px] h-[40px] rounded-xl border-2 transition-colors ${
                          errors.email
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-300 focus:border-[#B26CC5]"
                        }`}
                        required
                        aria-describedby={
                          errors.email
                            ? "teamEmail-error"
                            : undefined
                        }
                      />
                      {errors.email && (
                        <p
                          id="teamEmail-error"
                          className="text-red-500 text-sm mt-1"
                          role="alert"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 mb-2"
                        htmlFor="teamPhone"
                      >
                        <Phone className="w-4 h-4 inline mr-2" />
                        {t.phone}
                      </label>
                      <Input
                        id="teamPhone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange(
                            "phone",
                            e.target.value,
                          )
                        }
                        placeholder={t.phonePlaceholder}
                        className="w-full min-h-[40px] h-[40px] rounded-xl border-2 border-gray-300 focus:border-[#B26CC5] transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 mb-2"
                        htmlFor="city"
                      >
                        <MapPin className="w-4 h-4 inline mr-2" />
                        {t.city}
                      </label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) =>
                          handleInputChange(
                            "city",
                            e.target.value,
                          )
                        }
                        placeholder={t.cityPlaceholder}
                        className="w-full min-h-[40px] h-[40px] rounded-xl border-2 border-gray-300 focus:border-[#B26CC5] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 mb-2"
                        htmlFor="role"
                      >
                        <Briefcase className="w-4 h-4 inline mr-2" />
                        {t.role}
                      </label>
                      <Input
                        id="role"
                        value={formData.role}
                        onChange={(e) =>
                          handleInputChange(
                            "role",
                            e.target.value,
                          )
                        }
                        placeholder={t.rolePlaceholder}
                        className="w-full min-h-[40px] h-[40px] rounded-xl border-2 border-gray-300 focus:border-[#B26CC5] transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 mb-2"
                        htmlFor="portfolio"
                      >
                        <Globe className="w-4 h-4 inline mr-2" />
                        {t.portfolio}
                      </label>
                      <Input
                        id="portfolio"
                        type="url"
                        value={formData.portfolio}
                        onChange={(e) =>
                          handleInputChange(
                            "portfolio",
                            e.target.value,
                          )
                        }
                        placeholder={t.portfolioPlaceholder}
                        className="w-full min-h-[40px] h-[40px] rounded-xl border-2 border-gray-300 focus:border-[#B26CC5] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-2"
                      htmlFor="teamMessage"
                    >
                      <Heart className="w-4 h-4 inline mr-2" />
                      {t.message} *
                    </label>
                    <Textarea
                      id="teamMessage"
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange(
                          "message",
                          e.target.value,
                        )
                      }
                      placeholder={t.messageTeamPlaceholder}
                      className={`w-full rounded-xl border-2 transition-colors min-h-[120px] ${
                        errors.message
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-300 focus:border-[#B26CC5]"
                      }`}
                      rows={6}
                      required
                      aria-describedby={
                        errors.message
                          ? "teamMessage-error"
                          : undefined
                      }
                    />
                    {errors.message && (
                      <p
                        id="teamMessage-error"
                        className="text-red-500 text-sm mt-1"
                        role="alert"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Team Consent Checkbox */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="teamConsent"
                        checked={formData.teamConsent}
                        onCheckedChange={(checked) =>
                          handleInputChange(
                            "teamConsent",
                            checked.toString(),
                          )
                        }
                        className={`mt-1 ${errors.teamConsent ? "border-red-500" : ""}`}
                        required
                        aria-describedby={
                          errors.teamConsent
                            ? "teamConsent-error"
                            : undefined
                        }
                      />
                      <label
                        htmlFor="teamConsent"
                        className="text-sm text-gray-700 leading-relaxed cursor-pointer"
                      >
                        {t.teamConsentText}
                      </label>
                    </div>
                    {errors.teamConsent && (
                      <p
                        id="teamConsent-error"
                        className="text-red-500 text-sm"
                        role="alert"
                      >
                        {errors.teamConsent}
                      </p>
                    )}

                    {/* Legal Links */}
                    <div className="text-sm text-gray-600 leading-relaxed">
                      {t.readMore}{" "}
                      <button
                        type="button"
                        onClick={() =>
                          onNavigateToPage?.("privacy")
                        }
                        className="text-[#B26CC5] hover:text-[#9C5CB0] underline focus:outline-none focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-2 rounded"
                      >
                        {t.privacyPolicy}
                      </button>{" "}
                      {t.and}{" "}
                      <button
                        type="button"
                        onClick={() =>
                          onNavigateToPage?.("terms")
                        }
                        className="text-[#B26CC5] hover:text-[#9C5CB0] underline focus:outline-none focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-2 rounded"
                      >
                        {t.terms}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Partner Specific Fields */}
              {type === "partner" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.businessName}
                      </label>
                      <Input
                        value={formData.businessName}
                        onChange={(e) =>
                          handleInputChange(
                            "businessName",
                            e.target.value,
                          )
                        }
                        placeholder={t.businessNamePlaceholder}
                        className="rounded-xl border-2 border-gray-300 focus:border-[#B26CC5] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.businessType}
                      </label>
                      <Select
                        value={formData.businessType}
                        onValueChange={(value) =>
                          handleInputChange(
                            "businessType",
                            value,
                          )
                        }
                      >
                        <SelectTrigger className="rounded-xl border-2 border-gray-300 focus:border-[#B26CC5] transition-colors">
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="catering">
                            {t.catering}
                          </SelectItem>
                          <SelectItem value="photography">
                            {t.photography}
                          </SelectItem>
                          <SelectItem value="decorations">
                            {t.decorations}
                          </SelectItem>
                          <SelectItem value="venue">
                            {t.venue}
                          </SelectItem>
                          <SelectItem value="entertainment">
                            {t.entertainment}
                          </SelectItem>
                          <SelectItem value="other">
                            {t.other}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.services}
                    </label>
                    <Textarea
                      value={formData.services}
                      onChange={(e) =>
                        handleInputChange(
                          "services",
                          e.target.value,
                        )
                      }
                      placeholder={t.servicesPlaceholder}
                      className="rounded-xl border-2 border-gray-300 focus:border-[#B26CC5] transition-colors"
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.yearsInBusiness}
                      </label>
                      <Input
                        value={formData.yearsInBusiness}
                        onChange={(e) =>
                          handleInputChange(
                            "yearsInBusiness",
                            e.target.value,
                          )
                        }
                        placeholder="e.g., 5 years"
                        className="rounded-xl border-2 border-gray-300 focus:border-[#B26CC5] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.specialization}
                      </label>
                      <Input
                        value={formData.specialization}
                        onChange={(e) =>
                          handleInputChange(
                            "specialization",
                            e.target.value,
                          )
                        }
                        placeholder={
                          t.specializationPlaceholder
                        }
                        className="rounded-xl border-2 border-gray-300 focus:border-[#B26CC5] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.references}
                    </label>
                    <Textarea
                      value={formData.references}
                      onChange={(e) =>
                        handleInputChange(
                          "references",
                          e.target.value,
                        )
                      }
                      placeholder={t.referencesPlaceholder}
                      className="rounded-xl border-2 border-gray-300 focus:border-[#B26CC5] transition-colors"
                      rows={3}
                    />
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="w-full sm:flex-1 min-h-[40px] h-[40px] rounded-xl border-2 border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-2"
                >
                  {t.cancel}
                </Button>
                <Button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    submitStatus.type === "success"
                  }
                  className="w-full sm:flex-1 min-h-[40px] h-[40px] bg-gradient-to-r from-[#B26CC5] to-[#9C5CB0] hover:from-[#9C5CB0] hover:to-[#B26CC5] text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#B26CC5] focus:ring-offset-2"
                >
                  <Send
                    className={`w-4 h-4 mr-2 ${isSubmitting ? "animate-pulse" : ""}`}
                  />
                  {isSubmitting
                    ? currentLanguage === "el"
                      ? "Αποστολή..."
                      : currentLanguage === "uk"
                        ? "Надсилання..."
                        : "Sending..."
                    : t.submitApplication}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}