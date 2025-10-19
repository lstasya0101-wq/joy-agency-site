import { toast } from "sonner@2.0.3";

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  month?: string;
  day?: string;
  optionalDay?: string;
  amountKids?: string;
  program?: string;
  message?: string;
  language: string;
  formType:
    | "contact"
    | "booking"
    | "application-team"
    | "application-partner"
    | "feedback";
  programTitle?: string;
}

export interface ApplicationFormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  experience?: string;
  motivation?: string;
  availability?: string;
  skills?: string;
  portfolio?: string;
  businessName?: string;
  businessType?: string;
  services?: string;
  yearsInBusiness?: string;
  references?: string;
  specialization?: string;
  language: string;
  type: "team" | "partner";
}

export interface FeedbackFormData {
  name: string;
  email: string;
  rating: number;
  message: string;
  eventType?: string;
  eventDate?: string;
  language: string;
}

// Email service that sends emails to joypartythess@gmail.com
export class EmailService {
  private static readonly TO_EMAIL = "joypartythess@gmail.com";

  static async sendContactForm(
    data: ContactFormData,
  ): Promise<boolean> {
    try {
      // In a real application, this would send to your backend API
      // For now, we'll simulate the email sending and show success

      console.log(
        "Sending contact form email to:",
        this.TO_EMAIL,
      );
      console.log("Form data:", data);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Format email content
      const emailContent = this.formatContactEmail(data);

      // In production, replace this with actual email service call
      // Example: await fetch('/api/send-email', { method: 'POST', body: JSON.stringify(emailContent) })

      console.log("Email content that would be sent:");
      console.log(emailContent);

      return true;
    } catch (error) {
      console.error(
        "Failed to send contact form email:",
        error,
      );
      return false;
    }
  }

  static async sendApplicationForm(
    data: ApplicationFormData,
  ): Promise<boolean> {
    try {
      console.log(
        "Sending application form email to:",
        this.TO_EMAIL,
      );
      console.log("Application data:", data);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const emailContent = this.formatApplicationEmail(data);

      console.log("Email content that would be sent:");
      console.log(emailContent);

      return true;
    } catch (error) {
      console.error(
        "Failed to send application form email:",
        error,
      );
      return false;
    }
  }

  static async sendFeedbackForm(
    data: FeedbackFormData,
  ): Promise<boolean> {
    try {
      console.log(
        "Sending feedback form email to:",
        this.TO_EMAIL,
      );
      console.log("Feedback data:", data);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const emailContent = this.formatFeedbackEmail(data);

      console.log("Email content that would be sent:");
      console.log(emailContent);

      return true;
    } catch (error) {
      console.error(
        "Failed to send feedback form email:",
        error,
      );
      return false;
    }
  }

  private static formatContactEmail(
    data: ContactFormData,
  ): object {
    const subject =
      data.formType === "booking"
        ? `New Booking Request - ${data.programTitle || "General"}`
        : "New Contact Form Submission - Joy Events";

    let body = `
New ${data.formType === "booking" ? "booking request" : "contact form"} from Joy Events website

CONTACT DETAILS:
Name: ${data.name}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ""}
Language: ${data.language}

${data.programTitle ? `PROGRAM: ${data.programTitle}` : ""}

${
  data.month || data.day
    ? `
EVENT DETAILS:
${data.month ? `Preferred Month: ${data.month}` : ""}
${data.day ? `Preferred Day: ${data.day}` : ""}
${data.optionalDay ? `Day Type: ${data.optionalDay}` : ""}
${data.amountKids ? `Number of Children: ${data.amountKids}` : ""}
`
    : ""
}

${data.program ? `Additional Program Info: ${data.program}` : ""}
${data.message ? `Message: ${data.message}` : ""}

---
Sent from Joy Events website
Time: ${new Date().toLocaleString()}
    `.trim();

    return {
      to: this.TO_EMAIL,
      subject,
      body,
      html: body.replace(/\n/g, "<br>"),
    };
  }

  private static formatApplicationEmail(
    data: ApplicationFormData,
  ): object {
    const subject = `New ${data.type === "team" ? "Team" : "Partnership"} Application - Joy Events`;

    let body = `
New ${data.type === "team" ? "team member" : "partnership"} application from Joy Events website

APPLICANT DETAILS:
Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone}
Location: ${data.location}
Language: ${data.language}

${
  data.type === "team"
    ? `
TEAM APPLICATION DETAILS:
Experience: ${data.experience || "Not specified"}
Availability: ${data.availability || "Not specified"}
Skills: ${data.skills || "Not specified"}
Portfolio: ${data.portfolio || "Not specified"}

Motivation:
${data.motivation || "Not provided"}
`
    : `
PARTNERSHIP APPLICATION DETAILS:
Business Name: ${data.businessName || "Not specified"}
Business Type: ${data.businessType || "Not specified"}
Years in Business: ${data.yearsInBusiness || "Not specified"}
Specialization: ${data.specialization || "Not specified"}

Services:
${data.services || "Not provided"}

References:
${data.references || "Not provided"}
`
}

---
Sent from Joy Events website
Time: ${new Date().toLocaleString()}
    `.trim();

    return {
      to: this.TO_EMAIL,
      subject,
      body,
      html: body.replace(/\n/g, "<br>"),
    };
  }

  private static formatFeedbackEmail(
    data: FeedbackFormData,
  ): object {
    const subject = `New Customer Feedback - ${data.rating} Star Review - Joy Events`;

    let body = `
New customer feedback from Joy Events website

CUSTOMER DETAILS:
Name: ${data.name}
Email: ${data.email}
Language: ${data.language}

FEEDBACK:
Rating: ${"★".repeat(data.rating)}${"☆".repeat(5 - data.rating)} (${data.rating}/5)
${data.eventType ? `Event Type: ${data.eventType}` : ""}
${data.eventDate ? `Event Date: ${data.eventDate}` : ""}

Message:
${data.message}

---
Sent from Joy Events website
Time: ${new Date().toLocaleString()}
    `.trim();

    return {
      to: this.TO_EMAIL,
      subject,
      body,
      html: body.replace(/\n/g, "<br>"),
    };
  }

  // Utility function to show appropriate success/error messages
  static showFormResult(
    success: boolean,
    formType: string,
    language: string = "en",
  ) {
    const messages = {
      en: {
        contact: {
          success:
            "Message sent successfully! We'll contact you soon.",
          error:
            "Failed to send message. Please try again or contact us directly.",
        },
        booking: {
          success:
            "Booking request sent successfully! We'll confirm availability soon.",
          error:
            "Failed to send booking request. Please try again or contact us directly.",
        },
        application: {
          success:
            "Application submitted successfully! We'll review it and contact you soon.",
          error:
            "Failed to submit application. Please try again or contact us directly.",
        },
        feedback: {
          success:
            "Thank you for your feedback! We appreciate your review.",
          error: "Failed to submit feedback. Please try again.",
        },
      },
      el: {
        contact: {
          success:
            "Το μήνυμα στάλθηκε επιτυχώς! Θα επικοινωνήσουμε μαζί σας σύντομα.",
          error:
            "Αποτυχία αποστολής μηνύματος. Παρακαλώ δοκιμάστε ξανά ή επικοινωνήστε μαζί μας απευθείας.",
        },
        booking: {
          success:
            "Το αίτημα κράτησης στάλθηκε επιτυχώς! Θα επιβεβαιώσουμε τη διαθεσιμότητα σύντομα.",
          error:
            "Αποτυχία αποστολής αιτήματος κράτησης. Παρακαλώ δοκιμάστε ξανά ή επικοινωνήστε μαζί μας απευθείας.",
        },
        application: {
          success:
            "Η αίτηση υποβλήθηκε επιτυχώς! Θα την εξετάσουμε και θα επικοινωνήσουμε μαζί σας σύντομα.",
          error:
            "Αποτυχία υποβολής αίτησης. Παρακαλώ δοκιμάστε ξανά ή επικοινωνήστε μαζί μας απευθείας.",
        },
        feedback: {
          success:
            "Ευχαριστούμε για τα σχόλιά σας! Εκτιμούμε την αξιολόγησή σας.",
          error:
            "Αποτυχία υποβολής σχολίων. Παρακαλώ δοκιμάστε ξανά.",
        },
      },
      uk: {
        contact: {
          success:
            "Повідомлення надіслано успішно! Ми зв'яжемося з вами найближчим часом.",
          error:
            "Не вдалося надіслати повідомлення. Спробуйте ще раз або зв'яжіться з нами безпосередньо.",
        },
        booking: {
          success:
            "Запит на бронювання надіслано успішно! Ми підтвердимо доступність найближчим часом.",
          error:
            "Не вдалося надіслати запит на бронювання. Спробуйте ще раз або зв'яжіться з нами безпосередньо.",
        },
        application: {
          success:
            "Заявку подано успішно! Ми розглянемо її та зв'яжемося з вами найближчим часом.",
          error:
            "Не вдалося подати заявку. Спробуйте ще раз або зв'яжіться з нами безпосередньо.",
        },
        feedback: {
          success:
            "Дякуємо за ваш відгук! Ми цінуємо вашу оцінку.",
          error:
            "Не вдалося надіслати відгук. Спробуйте ще раз.",
        },
      },
    };

    const langMessages =
      messages[language as keyof typeof messages] ||
      messages.en;
    const formMessages =
      langMessages[formType as keyof typeof langMessages] ||
      langMessages.contact;

    if (success) {
      toast.success(formMessages.success);
    } else {
      toast.error(formMessages.error);
    }
  }
}