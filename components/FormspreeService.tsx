// Formspree integration service for Joy Events
export interface FormspreeFormData {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  programChoice?: string;
  formType:
    | "contact"
    | "program-booking"
    | "partner"
    | "team"
    | "review";
  eventDate?: string;
  numberOfKids?: string;
  preferredTime?: string;
  rating?: number;
  eventType?: string;
  language: string;
}

export class FormspreeService {
  // Formspree endpoint for Joy Events
  private static readonly FORMSPREE_ENDPOINT =
    "https://formspree.io/f/xdkwzyab";

  // Form validation
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validatePhone(phone: string): boolean {
    if (!phone) return true; // Phone is optional
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,20}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  }

  static validateRequired(value: string): boolean {
    return value.trim().length > 0;
  }

  // Submit form to Formspree
  static async submitForm(
    formData: FormspreeFormData,
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Validate required fields
      if (!this.validateRequired(formData.name)) {
        return { success: false, message: "Name is required" };
      }

      if (
        !this.validateRequired(formData.email) ||
        !this.validateEmail(formData.email)
      ) {
        return {
          success: false,
          message: "Valid email is required",
        };
      }

      if (
        formData.phone &&
        !this.validatePhone(formData.phone)
      ) {
        return {
          success: false,
          message: "Please enter a valid phone number",
        };
      }

      // Prepare form data for Formspree
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("_replyto", formData.email);

      // Add honeypot field for spam protection
      formDataToSend.append("_gotcha", "");

      if (formData.phone) {
        formDataToSend.append("phone", formData.phone);
      }

      if (formData.message) {
        formDataToSend.append("message", formData.message);
      }

      if (formData.programChoice) {
        formDataToSend.append(
          "program",
          formData.programChoice,
        );
      }

      if (formData.eventDate) {
        formDataToSend.append("eventDate", formData.eventDate);
      }

      if (formData.numberOfKids) {
        formDataToSend.append(
          "numberOfKids",
          formData.numberOfKids,
        );
      }

      if (formData.preferredTime) {
        formDataToSend.append(
          "preferredTime",
          formData.preferredTime,
        );
      }

      if (formData.rating) {
        formDataToSend.append(
          "rating",
          formData.rating.toString(),
        );
      }

      if (formData.eventType) {
        formDataToSend.append("eventType", formData.eventType);
      }

      // Add form type and language for better organization
      formDataToSend.append("formType", formData.formType);
      formDataToSend.append("language", formData.language);
      formDataToSend.append(
        "_subject",
        `Joy Events - ${this.getFormTypeLabel(formData.formType)} Form Submission`,
      );

      // Submit to Formspree with JSON headers for better handling
      const response = await fetch(this.FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formDataToSend,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        return {
          success: true,
          message: "Form submitted successfully",
        };
      } else {
        const errorData = await response
          .json()
          .catch(() => ({}));
        return {
          success: false,
          message:
            errorData.error ||
            errorData.message ||
            "Something went wrong, please try again",
        };
      }
    } catch (error) {
      console.error("Form submission error:", error);
      return {
        success: false,
        message:
          "Network error. Please check your connection and try again.",
      };
    }
  }

  // Get form type label for email subject
  private static getFormTypeLabel(formType: string): string {
    const labels = {
      contact: "Contact",
      "program-booking": "Program Booking",
      partner: "Partner Application",
      team: "Team Application",
      review: "Customer Review",
    };
    return labels[formType as keyof typeof labels] || "General";
  }

  // Get localized messages
  static getLocalizedMessages(language: string) {
    const messages = {
      en: {
        nameRequired: "Name is required",
        emailRequired: "Email is required",
        emailInvalid: "Please enter a valid email address",
        phoneInvalid: "Please enter a valid phone number",
        messageRequired: "Message is required",
        programRequired: "Please select a program",
        submitting: "Sending...",
        submitSuccess: "Thank you! We will contact you soon.",
        submitError: "Something went wrong, please try again.",
        networkError:
          "Network error. Please check your connection and try again.",
        fillRequired: "Please fill in all required fields",
      },
      el: {
        nameRequired: "Το όνομα είναι υποχρεωτικό",
        emailRequired: "Το email είναι υποχρεωτικό",
        emailInvalid: "Παρακαλώ εισάγετε ένα έγκυρο email",
        phoneInvalid:
          "Παρακαλώ εισάγετε έναν έγκυρο αριθμό τηλεφώνου",
        messageRequired: "Το μήνυμα είναι υποχρεωτικό",
        programRequired: "Παρακαλώ επιλέξτε ένα πρόγραμμα",
        submitting: "Αποστολή...",
        submitSuccess:
          "Ευχαριστούμε! Θα επικοινωνήσουμε μαζί σας σύντομα.",
        submitError:
          "Κάτι πήγε στραβά, παρακαλώ δοκιμάστε ξανά.",
        networkError:
          "Σφάλμα δικτύου. Παρακαλώ ελέγξτε τη σύνδεσή σας και δοκιμάστε ξανά.",
        fillRequired:
          "Παρακαλώ συμπληρώστε όλα τα υποχρεωτικά πεδία",
      },
      uk: {
        nameRequired: "Ім'я обов'язкове",
        emailRequired: "Email обов'язковий",
        emailInvalid: "Будь ласка, введіть дійсну email адресу",
        phoneInvalid:
          "Будь ласка, введіть дійсний номер телефону",
        messageRequired: "Повідомлення обов'язкове",
        programRequired: "Будь ласка, оберіть програму",
        submitting: "Відправка...",
        submitSuccess:
          "Дякуємо! Ми зв'яжемося з вами найближчим часом.",
        submitError: "Щось пішло не так, спробуйте ще раз.",
        networkError:
          "Помилка мережі. Перевірте підключення та спробуйте ще раз.",
        fillRequired:
          "Будь ласка, заповніть всі обов'язкові поля",
      },
    };

    return (
      messages[language as keyof typeof messages] || messages.en
    );
  }

  // Show toast notification (you can integrate with your preferred toast library)
  static showNotification(
    message: string,
    type: "success" | "error" = "success",
  ) {
    // For now, we'll use a simple alert, but you can integrate with react-hot-toast or similar
    if (type === "success") {
      // Create a temporary success notification
      const notification = document.createElement("div");
      notification.className = `fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300`;
      notification.textContent = message;
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.style.opacity = "0";
        setTimeout(
          () => document.body.removeChild(notification),
          300,
        );
      }, 4000);
    } else {
      // Create a temporary error notification
      const notification = document.createElement("div");
      notification.className = `fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300`;
      notification.textContent = message;
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.style.opacity = "0";
        setTimeout(
          () => document.body.removeChild(notification),
          300,
        );
      }, 5000);
    }
  }
}

// Form field validation hooks
export const useFormValidation = (language: string) => {
  const messages =
    FormspreeService.getLocalizedMessages(language);

  const validateField = (
    field: string,
    value: string,
    type: "name" | "email" | "phone" | "message" | "program",
  ) => {
    switch (type) {
      case "name":
        return FormspreeService.validateRequired(value)
          ? ""
          : messages.nameRequired;
      case "email":
        if (!FormspreeService.validateRequired(value))
          return messages.emailRequired;
        return FormspreeService.validateEmail(value)
          ? ""
          : messages.emailInvalid;
      case "phone":
        return FormspreeService.validatePhone(value)
          ? ""
          : messages.phoneInvalid;
      case "message":
        return FormspreeService.validateRequired(value)
          ? ""
          : messages.messageRequired;
      case "program":
        return FormspreeService.validateRequired(value)
          ? ""
          : messages.programRequired;
      default:
        return "";
    }
  };

  return { validateField, messages };
};