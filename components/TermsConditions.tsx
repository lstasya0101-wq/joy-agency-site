import {
  ArrowLeft,
  FileText,
  DollarSign,
  Calendar,
  AlertTriangle,
  Users,
  Phone,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import GlobalHeader from "./GlobalHeader";
import GlobalFooter from "./GlobalFooter";

interface TermsConditionsProps {
  onBack: () => void;
  currentLanguage: string;
  setCurrentLanguage: (language: string) => void;
  onNavigateToSection?: (section: string) => void;
  onNavigateToPage?: (page: string) => void;
}

export default function TermsConditions({
  onBack,
  currentLanguage,
  setCurrentLanguage,
  onNavigateToSection,
  onNavigateToPage,
}: TermsConditionsProps) {
  // Complete language translations
  const translations = {
    en: {
      termsConditions: "Terms & Conditions",
      lastUpdated: "Last updated: December 18, 2024",
      backToHome: "Back to Home",

      // Introduction
      introduction:
        "Welcome to Joy Events. These Terms and Conditions outline the rules and regulations for the use of our services. By using our services, you accept these terms and conditions in full.",

      // Section headers
      serviceTerms: "Service Terms",
      bookingPolicy: "Booking Policy",
      paymentTerms: "Payment Terms",
      cancellationPolicy: "Cancellation Policy",
      liability: "Liability",
      userResponsibilities: "User Responsibilities",
      intellectualProperty: "Intellectual Property",
      privacy: "Privacy",
      disputeResolution: "Dispute Resolution",
      contactInfo: "Contact Information",
      changes: "Changes to Terms",

      // Content
      serviceTermsContent: `Joy Events provides event planning and entertainment services including:
      
      • Children's birthday parties and celebrations
      • Adult events and corporate functions
      • Entertainment services (face painting, shows, games)
      • Event coordination and planning
      
      All services are subject to availability and booking confirmation.`,

      bookingPolicyContent: `Booking Terms:
      
      • All bookings must be confirmed in writing or via email
      • A deposit is required to secure your booking
      • We recommend booking at least 3 weeks in advance
      • Last-minute bookings (less than 7 days) are subject to availability
      • Event details can be modified up to 7 days before the event
      • Weather-dependent outdoor events have alternative arrangements`,

      paymentTermsContent: `Payment Information:
      
      • Deposit: 30% of total cost required at booking
      • Balance: Due 7 days before the event
      • Accepted methods: Bank transfer, cash, card
      • All prices include VAT where applicable
      • Additional services requested on the day incur extra charges
      • Late payment may result in service suspension`,

      cancellationPolicyContent: `Cancellation Terms:
      
      • 14+ days before event: 100% deposit refund
      • 7-14 days before event: 50% deposit refund
      • Less than 7 days: No refund (deposit retained)
      • Weather cancellations: Full refund or rescheduling
      • Child illness: Free rescheduling within 3 months
      • Force majeure events: Alternative arrangements discussed`,

      liabilityContent: `Liability Limitations:
      
      • Joy Events carries public liability insurance
      • We are not liable for injuries due to participant negligence
      • Maximum liability limited to the service fee paid
      • Parents/guardians must supervise children at all times
      • Venue-related incidents are the venue owner's responsibility
      • We reserve the right to stop services if safety is compromised`,

      userResponsibilitiesContent: `Client Responsibilities:
      
      • Provide accurate information about participants
      • Ensure safe environment and venue access
      • Inform us of any allergies or medical conditions
      • Provide adequate space and facilities
      • Respect our staff and equipment
      • Follow all safety instructions given by entertainers
      • Notify us immediately of any incidents or concerns`,

      intellectualPropertyContent: `Intellectual Property Rights:
      
      • All content, logos, and materials are owned by Joy Events
      • Photos/videos taken during events may be used for marketing
      • Client can request exclusion from marketing materials
      • We respect third-party intellectual property rights
      • Custom decorations become client property after payment`,

      privacyContent: `Privacy and Data Protection:
      
      • We collect and process personal data as outlined in our Privacy Policy
      • Client information is kept confidential
      • Marketing communications require explicit consent
      • Data is stored securely and deleted when no longer needed
      • Clients have rights under GDPR (access, correction, deletion)`,

      disputeResolutionContent: `Dispute Resolution:
      
      • We aim to resolve all issues amicably
      • Complaints should be made within 7 days of the event
      • Written complaints will receive written responses
      • Mediation may be sought for unresolved disputes
      • Greek law governs all agreements
      • Jurisdiction lies with Greek courts`,

      contactInfoContent: `For questions about these Terms & Conditions, contact us:
      
      Email: joypartythess@gmail.com
      Phone: +30 698 745 1036
      Location: Thessaloniki, Greece
      
      Business hours: Monday-Friday 9:00-18:00`,

      changesContent: `Changes to These Terms:
      
      • We may update these terms periodically
      • Material changes will be communicated via email
      • Continued use of services indicates acceptance
      • Previous bookings remain under original terms
      • Check our website for the most current version`,
    },

    el: {
      termsConditions: "Όροι & Προϋποθέσεις",
      lastUpdated: "Τελευταία ενημέρωση: 18 Δεκεμβρίου 2024",
      backToHome: "Επιστροφή στην Αρχική",

      // Introduction
      introduction:
        "Καλώς ήρθατε στην Joy Events. Αυτοί οι Όροι και Προϋποθέσεις περιγράφουν τους κανόνες και τους κανονισμούς για τη χρήση των υπηρεσιών μας. Χρησιμοποιώντας τις υπηρεσίες μας, αποδέχεστε πλήρως αυτούς τους όρους και προϋποθέσεις.",

      // Section headers
      serviceTerms: "Όροι Υπηρεσιών",
      bookingPolicy: "Πολιτική Κρατήσεων",
      paymentTerms: "Όροι Πληρωμής",
      cancellationPolicy: "Πολιτική Ακύρωσης",
      liability: "Ευθύνη",
      userResponsibilities: "Υπευθυνότητες Χρήστη",
      intellectualProperty: "Πνευματική Ιδιοκτησία",
      privacy: "Απόρρητο",
      disputeResolution: "Επίλυση Διαφορών",
      contactInfo: "Στοιχεία Επικοινωνίας",
      changes: "Αλλαγές στους Όρους",

      // Content
      serviceTermsContent: `Η Joy Events παρέχει υπηρεσίες οργάνωσης εκδηλώσεων και διασκέδασης που περιλαμβάνουν:
      
      • Παιδικά γενέθλια και εορτασμούς
      • Εκδηλώσεις ενηλίκων και εταιρικές λειτουργίες
      • Υπηρεσίες διασκέδασης (ζωγραφική προσώπου, παραστάσεις, παιχνίδια)
      • Συντονισμός και σχεδιασμός εκδηλώσεων
      
      Όλες οι υπηρεσίες υπόκεινται σε διαθεσιμότητα και επιβεβαίωση κράτησης.`,

      bookingPolicyContent: `Όροι Κράτησης:
      
      • Όλες οι κρατήσεις πρέπει να επιβεβαιώνονται γραπτώς ή μέσω email
      • Απαιτείται προκαταβολή για την εξασφάλιση της κράτησης
      • Συνιστούμε κράτηση τουλάχιστον 3 εβδομάδες νωρίτερα
      • Κρατήσεις τελευταίας στιγμής (λιγότερο από 7 ημέρες) υπόκεινται σε διαθεσιμότητα
      • Τα στοιχεία της εκδήλωσης μπορούν να τροποποιηθούν έως και 7 ημέρες πριν
      • Εξωτερικές εκδηλώσεις που εξαρτώνται από καιρό έχουν εναλλακτικές ρυθμίσεις`,

      paymentTermsContent: `Πληροφορίες Πληρωμής:
      
      • Προκαταβολή: 30% του συνολικού κόστους απαιτείται κατά την κράτηση
      • Υπόλοιπο: Οφείλεται 7 ημέρες πριν την εκδήλωση
      • Αποδεκτ��ς μέθοδοι: Τραπεζικό έμβασμα, μετρητά, κάρτα
      • Όλες οι τιμές περιλαμβάνουν ΦΠΑ όπου εφαρμόζεται
      • Επιπλέον υπηρεσίες που ζητούνται την ημέρα της εκδήλωσης έχουν επιπλέον χρεώσεις
      • Καθυστερημένη πληρωμή μπορεί να οδηγήσει σε αναστολή υπηρεσίας`,

      cancellationPolicyContent: `Όροι Ακύρωσης:
      
      • 14+ ημέρες πριν την εκδήλωση: 100% επιστροφή προκαταβολής
      • 7-14 ημέρες πριν την εκδήλωση: 50% επιστροφή προκαταβολής
      • Λιγότερο από 7 ημέρες: Χωρίς επιστροφή (η προκαταβολή κρατείται)
      • Ακυρώσεις λόγω καιρού: Πλήρης επιστροφή ή αναπρογραμματισμός
      • Ασθένεια παιδιού: Δωρεάν αναπρογραμματισμός εντός 3 μηνών
      • Γεγονότα ανωτέρας βίας: Συζητούνται εναλλακτικές ρυθμίσεις`,

      liabilityContent: `Περιορισμοί Ευθύνης:
      
      • Η Joy Events φέρει ασφάλιση αστικής ευθύνης
      • Δεν ευθυνόμαστε για τραυματισμούς λόγω αμέλειας συμμετεχόντων
      • Μέγιστη ευθύνη περιορίζεται στο ποσό της υπηρεσίας που πληρώθηκε
      • Γονείς/κηδεμόνες πρέπει να επιβλέπουν τα παιδιά πάντα
      • Περιστατικά σχετιζόμενα με τον χώρο είναι ευθύνη του ιδιοκτήτη
      • Διατηρούμε το δικαίωμα να σταματήσουμε τις υπηρεσίες εάν κινδυνεύει η ασφάλεια`,

      userResponsibilitiesContent: `Υπευθυνότητες Πελάτη:
      
      • Παροχή ακριβών πληροφοριών για τους συμμετέχοντες
      • Εξασφάλιση ασφαλούς περιβάλλοντος και πρόσβασης στον χώρο
      • Ενημέρωσή μας για τυχόν αλλεργίες ή ιατρικές καταστάσεις
      • Παροχή επαρκούς χώρου και εγκαταστάσεων
      • Σεβασμός προς το προσωπικό και τον εξοπλισμό μας
      • Τήρηση όλων των οδηγιών ασφαλείας από τους διασκεδαστές
      • Άμεση ειδοποίησή μας για τυχόν περιστατικά ή ανησυχίες`,

      intellectualPropertyContent: `Δικαιώματα Πνευματικής Ιδιοκτησίας:
      
      • Όλο το περιεχόμενο, λογότυπα και υλικά ανήκουν στην Joy Events
      • Φωτογραφίες/βίντεο από εκδηλώσεις μπορεί να χρησιμοποιηθούν για μάρκετινγκ
      • Ο πελάτης μπορεί να ζητήσει εξαίρεση από υλικό μάρκετινγκ
      • Σεβόμαστε τα δικαιώματα πνευματικής ιδιοκτησίας τρίτων
      • Προσαρμοσμένες διακοσμήσεις γίνονται ιδιοκτησία πελάτη μετά την πληρωμή`,

      privacyContent: `Απόρρητο και Προστασία Δεδομένων:
      
      • Συλλέγουμε και επεξεργαζόμαστε προσωπικά δεδομένα όπως περιγράφεται στην Πολιτική Απορρήτου μας
      • Οι πληροφορίες πελατών παραμένουν εμπιστευτικές
      • Οι επικοινωνίες μάρκετινγκ απαιτούν ρητή συγκατάθεση
      • Τα δεδομένα αποθηκεύονται με ασφάλεια και διαγράφονται όταν δεν χρειάζονται πλέον
      • Οι πελάτες έχουν δικαιώματα υπό το GDPR (πρόσβαση, διόρθωση, διαγραφή)`,

      disputeResolutionContent: `Επίλυση Διαφορών:
      
      • Στοχεύουμε να επιλύουμε όλα τα ζητήματα φιλικά
      • Οι καταγγελίες πρέπει να γίνονται εντός 7 ημερών από την εκδήλωση
      • Οι γραπτές καταγγελίες θα λαμβάνουν γραπτές απαντήσεις
      • Μπορεί να ζητηθεί διαμεσολάβηση για ανεπίλυτες διαφορές
      • Το ελληνικό δίκαιο διέπει όλες τις συμφωνίες
      • Αρμοδιότητα των ελληνικών δικαστηρίων`,

      contactInfoContent: `Για ερωτήσεις σχετικά με αυτούς τους Όρους & Προϋποθέσεις, επικοινωνήστε μαζί μας:
      
      Email: joypartythess@gmail.com
      Τηλέφωνο: +30 698 745 1036
      Τοποθεσία: Θεσσαλονίκη, Ελλάδα
      
      Ώρες λειτουργίας: Δευτέρα-Παρασκευή 9:00-18:00`,

      changesContent: `Αλλαγές σε Αυτούς τους Όρους:
      
      • Ενδέχεται να ενημερώνουμε αυτούς τους όρους περιοδικά
      • Οι ουσιαστικές αλλαγές θα κοινοποιούνται μέσω email
      • Η συνεχιζόμενη χρήση των υπηρεσιών υποδηλώνει αποδοχή
      • Οι προηγούμενες κρατήσεις παραμένουν υπό τους αρχικούς όρους
      • Ελέγξτε την ιστοσελίδα μας για την πιο πρόσφατη έκδοση`,
    },

    uk: {
      termsConditions: "Умови та Положення",
      lastUpdated: "Останнє оновлення: 18 грудня 2024",
      backToHome: "Повернутися Додому",

      // Introduction
      introduction:
        "Ласкаво просимо до Joy Events. Ці Умови та Положення описують правила та положення для використання наших послуг. Використовуючи наші послуги, ви повністю приймаєте ці умови та положення.",

      // Section headers
      serviceTerms: "Умови Послуг",
      bookingPolicy: "Політика Бронювання",
      paymentTerms: "Умови Оплати",
      cancellationPolicy: "Політика Скасування",
      liability: "Відповідальність",
      userResponsibilities: "Обов'язки Користувача",
      intellectualProperty: "Інтелектуальна Власність",
      privacy: "Конфіденційність",
      disputeResolution: "Вирішення Спорів",
      contactInfo: "Контактна Інформація",
      changes: "Зміни до Умов",

      // Content
      serviceTermsContent: `Joy Events надає послуги з планування подій та розваг, включаючи:
      
      • Дитячі дні народження та святкування
      • Заходи для дорослих та корпоративні функції
      • Розважальні послуги (розмальовування обличчя, шоу, ігри)
      • Координація та планування подій
      
      Всі послуги залежать від наявності та підтвердження бронювання.`,

      bookingPolicyContent: `Умови Бронювання:
      
      • Всі бронювання повинні бути підтверджені письмово або електронною поштою
      • Для забезпечення бронювання потрібна передоплата
      • Рекомендуємо бронювати принаймні за 3 тижні наперед
      • Бронювання в останню хвилину (менше 7 днів) залежить від наявності
      • Деталі події можна змінити до 7 днів до події
      • Зовнішні заходи, що залежать від погоди, мають альтернативні домовленості`,

      paymentTermsContent: `Інформація про Оплату:
      
      • Депозит: 30% від загальної вартості потрібно при бронюванні
      • Залишок: Сплачується за 7 днів до події
      • Прийнятні методи: Банківський переказ, готівка, картка
      • Всі ціни включають ПДВ, де застосовується
      • Додаткові послуги, замовлені в день події, мають додаткові збори
      • Затримка оплати може призвести до призупинення послуг`,

      cancellationPolicyContent: `Умови Скасування:
      
      • 14+ днів до події: 100% повернення депозиту
      • 7-14 днів до події: 50% повернення депозиту
      • Менше 7 днів: Без повернення (депозит утримується)
      • Скасування через погоду: Повне повернення або перенесення
      • Хвороба дитини: Безкоштовне перенесення протягом 3 місяців
      • Форс-мажорні обставини: Обговорюються альтернативні домовленості`,

      liabilityContent: `Обмеження Відповідальності:
      
      • Joy Events має страхування публічної відповідальності
      • Ми не несемо відповідальності за травми через недбалість учасників
      • Максимальна відповідальність обмежена сплаченою за послугу сумою
      • Батьки/опікуни повинні наглядати за дітьми весь час
      • Інциденти, пов'язані з місцем проведення, є відповідальністю власника
      • Ми залишаємо за собою право припинити послуги, якщо безпека під загрозою`,

      userResponsibilitiesContent: `Обов'язки Клієнта:
      
      • Надання точної інформації про учасників
      • Забезпечення безпечного середовища та доступу до місця
      • Повідомлення нас про будь-які алергії або медичні стани
      • Надання достатнього простору та зручностей
      • Повага до нашого персоналу та обладнання
      • Дотримання всіх інструкцій з безпеки від аніматорів
      • Негайне повідомлення нас про будь-які інциденти або занепокоєння`,

      intellectualPropertyContent: `Права Інтелектуальної Власності:
      
      • Весь контент, логотипи та матеріали належать Joy Events
      • Фото/відео, зроблені під час подій, можуть використовуватися для маркетингу
      • Клієнт може попросити виключення з маркетингових матеріалів
      • Ми поважаємо права інтелектуальної власності третіх сторін
      • Індивідуальні прикраси стають власністю клієнта після оплати`,

      privacyContent: `Конфіденційність та Захист Даних:
      
      • Ми збираємо та обробляємо особисті дані, як зазначено в нашій Політиці Конфіденційності
      • Інформація клієнтів зберігається конфіденційно
      • Маркетингові комунікації потребують явної згоди
      • Дані зберігаються безпечно та видаляються, коли більше не потрібні
      • Клієнти мають права згідно з GDPR (доступ, виправлення, видалення)`,

      disputeResolutionContent: `Вирішення Спорів:
      
      • Ми прагнемо вирішувати всі питання мирно
      • Скарги слід подавати протягом 7 днів після події
      • Письмові скарги отримають письмові відповіді
      • Для невирішених спорів може використовуватися медіація
      • Грецьке право регулює всі угоди
      • Юрисдикція належить грецьким судам`,

      contactInfoContent: `З питаннями щодо цих Умов та Положень звертайтеся до нас:
      
      Email: joypartythess@gmail.com
      Телефон: +30 698 745 1036
      Місцезнаходження: Салоніки, Греція
      
      Робочі години: Понеділок-П'ятниця 9:00-18:00`,

      changesContent: `Зміни до Цих Умов:
      
      • Ми можемо періодично оновлювати ці умови
      • Суттєві зміни будуть повідомлені електронною поштою
      • Продовження користування послугами означає прийняття
      • Попередні бронювання залишаються під первинними умовами
      • Перевіряйте наш веб-сайт для найактуальнішої версії`,
    },
  };

  const t =
    translations[
      currentLanguage as keyof typeof translations
    ] || translations.en;

  const sections = [
    {
      title: t.serviceTerms,
      content: t.serviceTermsContent,
      icon: FileText,
    },
    {
      title: t.bookingPolicy,
      content: t.bookingPolicyContent,
      icon: Calendar,
    },
    {
      title: t.paymentTerms,
      content: t.paymentTermsContent,
      icon: DollarSign,
    },
    {
      title: t.cancellationPolicy,
      content: t.cancellationPolicyContent,
      icon: AlertTriangle,
    },
    {
      title: t.liability,
      content: t.liabilityContent,
      icon: Users,
    },
    {
      title: t.userResponsibilities,
      content: t.userResponsibilitiesContent,
      icon: Users,
    },
    {
      title: t.intellectualProperty,
      content: t.intellectualPropertyContent,
      icon: FileText,
    },
    {
      title: t.privacy,
      content: t.privacyContent,
      icon: FileText,
    },
    {
      title: t.disputeResolution,
      content: t.disputeResolutionContent,
      icon: Users,
    },
    {
      title: t.contactInfo,
      content: t.contactInfoContent,
      icon: Phone,
    },
    {
      title: t.changes,
      content: t.changesContent,
      icon: FileText,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFAF2]">
      <GlobalHeader
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
        onNavigateToSection={onNavigateToSection}
        onNavigateToPage={onNavigateToPage}
        showCityBadge={false}
      />

      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-12">
          <Button
            onClick={onBack}
            variant="outline"
            className="mb-8 h-[40px] border-[#B26CC5] text-[#B26CC5] hover:bg-[#B26CC5] hover:text-white font-bold rounded-2xl transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.backToHome}
          </Button>

          <div className="text-center mb-8">
            <h1
              className="text-5xl md:text-6xl font-black text-gray-800 mb-4"
              style={{
                fontFamily: "Bowlby One SC, sans-serif",
              }}
            >
              {t.termsConditions}
            </h1>
            <p className="text-gray-600 text-lg">
              {t.lastUpdated}
            </p>
          </div>

          {/* Introduction */}
          <Card className="border-2 border-[#B26CC5] rounded-3xl p-8 bg-gradient-to-br from-[#FFE366]/10 to-[#B26CC5]/10">
            <CardContent className="p-0">
              <p className="text-lg text-gray-700 leading-relaxed">
                {t.introduction}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <Card
              key={index}
              className="border-2 border-gray-200 rounded-3xl p-8 hover:border-[#FFE366] transition-all duration-300 bg-white shadow-lg hover:shadow-xl"
            >
              <CardContent className="p-0">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#B26CC5] to-[#9C5CB0] rounded-full flex items-center justify-center mr-4">
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {section.title}
                  </h2>
                </div>
                <div className="prose prose-lg max-w-none">
                  <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                    {section.content}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <GlobalFooter
        currentLanguage={currentLanguage}
        onNavigateToSection={onNavigateToSection}
        onNavigateToPage={onNavigateToPage}
      />
    </div>
  );
}