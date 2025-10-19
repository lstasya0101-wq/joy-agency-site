import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
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

interface BookingFormProps {
  currentLanguage: string;
  programTitle?: string;
}

export default function BookingForm({
  currentLanguage,
  programTitle,
}: BookingFormProps) {
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    month: "",
    day: "",
    optionalDay: "",
    amountKids: "",
    program: "",
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
    },
    el: {
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
    },
    uk: {
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
    },
  };

  const t =
    translations[currentLanguage as keyof typeof translations];

  const handleInputChange = (field: string, value: string) => {
    setBookingForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate required fields
    const nameError = validateField(
      "name",
      bookingForm.name,
      "name",
    );
    if (nameError) newErrors.name = nameError;

    const emailError = validateField(
      "email",
      bookingForm.email,
      "email",
    );
    if (emailError) newErrors.email = emailError;

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
      const message = `Program booking request for: ${programTitle || bookingForm.program || "General inquiry"}
      
Date preference: ${bookingForm.month ? `${bookingForm.month} ${bookingForm.day}` : "Not specified"}
Optional day type: ${bookingForm.optionalDay || "Not specified"}
Number of children: ${bookingForm.amountKids || "Not specified"}
Additional program details: ${bookingForm.program || "Not specified"}`;

      const formspreeData: FormspreeFormData = {
        name: bookingForm.name,
        email: bookingForm.email,
        message: message,
        formType: "program-booking",
        language: currentLanguage,
        programChoice:
          programTitle || bookingForm.program || undefined,
        eventDate:
          bookingForm.month && bookingForm.day
            ? `${bookingForm.month} ${bookingForm.day}`
            : undefined,
        numberOfKids: bookingForm.amountKids || undefined,
        preferredTime: bookingForm.optionalDay || undefined,
      };

      const result =
        await FormspreeService.submitForm(formspreeData);

      if (result.success) {
        FormspreeService.showNotification(
          messages.submitSuccess,
          "success",
        );

        // Reset form
        setBookingForm({
          name: "",
          email: "",
          month: "",
          day: "",
          optionalDay: "",
          amountKids: "",
          program: "",
        });
        setErrors({});
      } else {
        FormspreeService.showNotification(
          result.message || messages.submitError,
          "error",
        );
      }
    } catch (error) {
      console.error("Booking form submission error:", error);
      FormspreeService.showNotification(
        messages.networkError,
        "error",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800">
        {t.weCanHelp}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-medium text-gray-800 mb-2">
              {t.yourName} *
            </label>
            <Input
              value={bookingForm.name}
              onChange={(e) =>
                handleInputChange("name", e.target.value)
              }
              placeholder={t.yourName}
              className={`rounded-2xl border-2 px-6 py-3 transition-colors duration-200 min-h-[40px] ${
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
              value={bookingForm.email}
              onChange={(e) =>
                handleInputChange("email", e.target.value)
              }
              placeholder={t.yourEmail}
              className={`rounded-2xl border-2 px-6 py-3 transition-colors duration-200 min-h-[40px] ${
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

        <div>
          <label className="block text-lg font-medium text-gray-800 mb-2">
            {t.chooseDates}
          </label>
          <p className="text-gray-600 mb-4">
            {t.bookDatesNote}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Select
              value={bookingForm.month}
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
              value={bookingForm.day}
              onValueChange={(value) =>
                handleInputChange("day", value)
              }
            >
              <SelectTrigger className="rounded-2xl border-2 border-gray-300 px-6 py-3 focus:border-[#B26CC5] transition-colors duration-200">
                <SelectValue placeholder={t.day} />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 31 }, (_, i) => (
                  <SelectItem key={i + 1} value={String(i + 1)}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Select
            value={bookingForm.optionalDay}
            onValueChange={(value) =>
              handleInputChange("optionalDay", value)
            }
          >
            <SelectTrigger className="rounded-2xl border-2 border-gray-300 px-6 py-3 focus:border-[#B26CC5] transition-colors duration-200">
              <SelectValue placeholder={t.optionalDay} />
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
          <Select
            value={bookingForm.amountKids}
            onValueChange={(value) =>
              handleInputChange("amountKids", value)
            }
          >
            <SelectTrigger className="rounded-2xl border-2 border-gray-300 px-6 py-3 focus:border-[#B26CC5] transition-colors duration-200">
              <SelectValue placeholder={t.amountKids} />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 20 }, (_, i) => (
                <SelectItem key={i + 1} value={String(i + 1)}>
                  {i + 1} {i === 0 ? t.child : t.children}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-800 mb-2">
            {t.program}
          </label>
          <Input
            value={bookingForm.program}
            onChange={(e) =>
              handleInputChange("program", e.target.value)
            }
            placeholder={t.programPlaceholder}
            className="rounded-2xl border-2 border-gray-300 px-6 py-3 focus:border-[#B26CC5] transition-colors duration-200"
          />
        </div>

        {/* Honeypot field for spam protection */}
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          style={{ display: "none" }}
        />

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

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-[#FFE366] to-[#EEB601] text-[#60266F] hover:from-[#EEB601] hover:to-[#FFE366] text-xl font-black py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
          style={{ fontFamily: "Bowlby One SC, sans-serif" }}
        >
          {isSubmitting ? "Sending..." : t.send}
        </Button>
      </form>
    </div>
  );
}