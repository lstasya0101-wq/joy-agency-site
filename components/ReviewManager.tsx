// Review management system for storing and retrieving reviews
export interface Review {
  id: string;
  name: string;
  image?: string;
  text: string;
  rating: number;
  eventType?: string;
  eventDate?: string;
  language: string;
  createdAt: string;
  approved: boolean;
}

export class ReviewManager {
  private static readonly STORAGE_KEY = "joy-events-reviews";

  // Get all reviews from localStorage
  static getAllReviews(): Review[] {
    try {
      const reviews = localStorage.getItem(this.STORAGE_KEY);
      return reviews ? JSON.parse(reviews) : [];
    } catch {
      return [];
    }
  }

  // Add a new review
  static addReview(
    review: Omit<Review, "id" | "createdAt" | "approved">,
  ): Review {
    const newReview: Review = {
      ...review,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      approved: true, // In a real app, this would be false until admin approval
    };

    const reviews = this.getAllReviews();
    reviews.unshift(newReview); // Add to beginning

    try {
      localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(reviews),
      );
    } catch {
      // Handle storage quota exceeded
      console.warn("Could not save review to localStorage");
    }

    return newReview;
  }

  // Get approved reviews for display
  static getApprovedReviews(): Review[] {
    return this.getAllReviews().filter(
      (review) => review.approved,
    );
  }

  // Get reviews by language
  static getReviewsByLanguage(language: string): Review[] {
    return this.getApprovedReviews().filter(
      (review) => review.language === language,
    );
  }

  // Initialize with default reviews if none exist - ONLY REAL CUSTOMER FEEDBACK
  static initializeDefaultReviews(): void {
    const existingReviews = this.getAllReviews();
    if (existingReviews.length === 0) {
      const defaultReviews: Review[] = [
        // Real Customer Feedback - Greek Original
        {
          id: "real-feedback-el-1",
          name: "Οικογένεια Π.",
          image:
            "figma:asset/26a983019163613e881f82f64eaa540061e7800d.png",
          text: "Ευχαριστούμε πολύ την ομάδα για το υπέροχο πάρτι! Όλα ήταν άψογα. Ο μικρός μας ακόμα μιλάει για το πόσο ωραία πέρασε με τους φίλους του 🎉🎉",
          rating: 5,
          language: "el",
          eventType: "Παιδικό Πάρτι",
          createdAt: "2024-12-20T16:30:00Z",
          approved: true,
        },
        {
          id: "real-feedback-el-2",
          name: "Οικογένεια Σ.",
          image:
            "figma:asset/f31888393d48419be48dfe53f118e1776b3bd999.png",
          text: "Σας ευχαριστούμε πολύ, ήταν εξαιρετική εμπειρία!! Η ομάδα σας κράτησε όλα τα παιδιά απασχολημένα και χαρούμενα, ο στολισμός υπέροχος και η οργάνωση άψογη. Η βαφτιστική μου ενθουσιαστήκε!! Θα σας προτιμήσουμε σίγουρα ξανά και για τα παιδιά μας!!",
          rating: 5,
          language: "el",
          eventType: "Βάπτιση",
          createdAt: "2024-12-18T14:15:00Z",
          approved: true,
        },
        // English Translations of Real Customer Feedback
        {
          id: "real-feedback-en-1",
          name: "Family P.",
          image:
            "figma:asset/26a983019163613e881f82f64eaa540061e7800d.png",
          text: "Thank you so much to the team for the wonderful party! Everything was perfect. Our little one still talks about how much fun he had with his friends! 🎉🎉",
          rating: 5,
          language: "en",
          eventType: "Children's Party",
          createdAt: "2024-12-20T16:30:00Z",
          approved: true,
        },
        {
          id: "real-feedback-en-2",
          name: "Family S.",
          image:
            "figma:asset/f31888393d48419be48dfe53f118e1776b3bd999.png",
          text: "Thank you so much, it was an exceptional experience!! Your team kept all the children engaged and happy, the decorations were wonderful and the organization was flawless. My goddaughter was thrilled!! We will definitely choose you again for our children!!",
          rating: 5,
          language: "en",
          eventType: "Baptism",
          createdAt: "2024-12-18T14:15:00Z",
          approved: true,
        },
        // Ukrainian Translations of Real Customer Feedback
        {
          id: "real-feedback-uk-1",
          name: "Сім'я П.",
          image:
            "figma:asset/26a983019163613e881f82f64eaa540061e7800d.png",
          text: "Дуже дякуємо команді за чудове свято! Все було ідеально. Наш малюк досі розповідає, як весело він провів час з друзями! 🎉🎉",
          rating: 5,
          language: "uk",
          eventType: "Дитяче Свято",
          createdAt: "2024-12-20T16:30:00Z",
          approved: true,
        },
        {
          id: "real-feedback-uk-2",
          name: "Сім'я С.",
          image:
            "figma:asset/f31888393d48419be48dfe53f118e1776b3bd999.png",
          text: "Дуже дякуємо, це був виняткові досвід!! Ваша команда тримала всіх дітей зайнятими та щасливими, прикраси були чудові, а організація бездоганна. Моя хрещениця була в захваті!! Ми обов'язково оберемо вас знову для наших дітей!!",
          rating: 5,
          language: "uk",
          eventType: "Хрещення",
          createdAt: "2024-12-18T14:15:00Z",
          approved: true,
        },
      ];

      try {
        localStorage.setItem(
          this.STORAGE_KEY,
          JSON.stringify(defaultReviews),
        );
      } catch {
        console.warn("Could not initialize default reviews");
      }
    }
  }

  // Helper to generate unique IDs
  private static generateId(): string {
    return (
      "review-" +
      Date.now() +
      "-" +
      Math.random().toString(36).substr(2, 9)
    );
  }

  // Remove a review (admin function)
  static removeReview(id: string): boolean {
    const reviews = this.getAllReviews();
    const filteredReviews = reviews.filter(
      (review) => review.id !== id,
    );

    if (filteredReviews.length !== reviews.length) {
      try {
        localStorage.setItem(
          this.STORAGE_KEY,
          JSON.stringify(filteredReviews),
        );
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }

  // Update review approval status
  static updateReviewApproval(
    id: string,
    approved: boolean,
  ): boolean {
    const reviews = this.getAllReviews();
    const reviewIndex = reviews.findIndex(
      (review) => review.id === id,
    );

    if (reviewIndex !== -1) {
      reviews[reviewIndex].approved = approved;
      try {
        localStorage.setItem(
          this.STORAGE_KEY,
          JSON.stringify(reviews),
        );
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }
}