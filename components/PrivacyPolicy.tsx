import {
  ArrowLeft,
  Shield,
  Eye,
  Lock,
  UserCheck,
  FileText,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import GlobalHeader from "./GlobalHeader";
import GlobalFooter from "./GlobalFooter";

interface PrivacyPolicyProps {
  onBack: () => void;
  currentLanguage: string;
  setCurrentLanguage: (language: string) => void;
  onNavigateToSection?: (section: string) => void;
  onNavigateToPage?: (page: string) => void;
}

export default function PrivacyPolicy({
  onBack,
  currentLanguage,
  setCurrentLanguage,
  onNavigateToSection,
  onNavigateToPage,
}: PrivacyPolicyProps) {
  // Complete language translations
  const translations = {
    en: {
      privacyPolicy: "Privacy Policy",
      lastUpdated: "Last updated: December 18, 2024",
      backToHome: "Back to Home",

      // Introduction
      introduction:
        "At Joy Events, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our services.",

      // Section headers
      dataCollection: "Information We Collect",
      dataUse: "How We Use Your Information",
      dataProtection: "Data Protection",
      yourRights: "Your Rights",
      cookies: "Cookies and Tracking",
      thirdParty: "Third-Party Services",
      dataRetention: "Data Retention",
      contactInfo: "Contact Information",
      changes: "Changes to This Policy",

      // Content
      dataCollectionContent: `We collect information you provide to us directly, such as:
      
      • Name and contact information (email, phone number)
      • Event details and preferences
      • Feedback and reviews
      • Communication records
      
      We also collect information automatically when you use our website:
      
      • Browser type and version
      • IP address and location data
      • Pages visited and time spent
      • Device information`,

      dataUseContent: `We use your information to:
      
      • Provide and improve our event planning services
      • Communicate with you about bookings and events
      • Send you updates and promotional materials (with consent)
      • Respond to your inquiries and support requests
      • Analyze website usage and improve user experience
      • Comply with legal obligations`,

      dataProtectionContent: `We implement appropriate security measures to protect your personal information:
      
      • SSL encryption for data transmission
      • Secure servers and databases
      • Limited access to personal information
      • Regular security audits and updates
      • Staff training on data protection
      
      However, no method of transmission over the internet is 100% secure.`,

      yourRightsContent: `Under GDPR and other applicable laws, you have the right to:
      
      • Access your personal data
      • Correct inaccurate information
      • Delete your personal data
      • Restrict processing of your data
      • Data portability
      • Object to processing
      • Withdraw consent at any time
      
      To exercise these rights, please contact us using the information below.`,

      cookiesContent: `We use cookies and similar technologies to:
      
      • Remember your preferences
      • Analyze website traffic
      • Improve user experience
      • Provide personalized content
      
      You can control cookies through your browser settings. Some features may not work properly if cookies are disabled.`,

      thirdPartyContent: `We may share information with trusted third parties:
      
      • Service providers (hosting, analytics, email)
      • Payment processors
      • Legal authorities when required by law
      
      We do not sell your personal information to third parties.`,

      dataRetentionContent: `We retain your personal information for as long as necessary to:
      
      • Provide our services
      • Comply with legal obligations
      • Resolve disputes
      • Enforce our agreements
      
      We regularly review and delete unnecessary data.`,

      contactInfoContent: `If you have questions about this Privacy Policy or our data practices, please contact us:
      
      Email: joypartythess@gmail.com
      Phone: +30 698 745 1036
      Location: Thessaloniki, Greece`,

      changesContent: `We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the "last updated" date.
      
      Your continued use of our services after any changes constitutes acceptance of the updated policy.`,
    },

    el: {
      privacyPolicy: "Πολιτική Απορρήτου",
      lastUpdated: "Τελευταία ενημέρωση: 18 Δεκεμβρίου 2024",
      backToHome: "Επιστροφή στην Αρχική",

      // Introduction
      introduction:
        "Στην Joy Events, λαμβάνουμε σοβαρά υπόψη το απόρρητό σας. Αυτή η Πολιτική Απορρήτου εξηγεί πώς συλλέγουμε, χρησιμοποιούμε και προστατεύουμε τις προσωπικές σας πληροφορίες όταν χρησιμοποιείτε τις υπηρεσίες μας.",

      // Section headers
      dataCollection: "Πληροφορίες που Συλλέγουμε",
      dataUse: "Πώς Χρησιμοποιούμε τις Πληροφορίες σας",
      dataProtection: "Προστασία Δεδομένων",
      yourRights: "Τα Δικαιώματά σας",
      cookies: "Cookies και Παρακολούθηση",
      thirdParty: "Υπηρεσίες Τρίτων",
      dataRetention: "Διατήρηση Δεδομένων",
      contactInfo: "Στοιχεία Επικοινωνίας",
      changes: "Αλλαγές σε Αυτή την Πολιτική",

      // Content
      dataCollectionContent: `Συλλέγουμε πληροφορίες που μας παρέχετε άμεσα, όπως:
      
      • Όνομα και στοιχεία επικοινωνίας (email, τηλέφωνο)
      • Λεπτομέρειες και προτιμήσεις εκδηλώσεων
      • Σχόλια και κριτικές
      • Αρχεία επικοινωνίας
      
      Συλλέγουμε επίσης πληροφορίες αυτόματα όταν χρησιμοποιείτε την ιστοσελίδα μας:
      
      • Τύπος και έκδοση περιηγητή
      • Διεύθυνση IP και δεδομένα τοποθεσίας
      • Σελίδες που επισκεφθήκατε και χρόνος παραμονής
      • Πληροφορίες συσκευής`,

      dataUseContent: `Χρησιμοποιούμε τις πληροφορίες σας για να:
      
      • Παρέχουμε και βελτιώνουμε τις υπηρεσίες οργάνωσης εκδηλώσεων
      • Επικοινωνούμε μαζί σας για κρατήσεις και εκδηλώσεις
      • Σας στέλνουμε ενημερώσεις και προωθητικό υλικό (με συγκατάθεση)
      • Απαντάμε στις ερωτήσεις και αιτήματα υποστήριξης
      • Αναλύουμε τη χρήση της ιστοσελίδας και βελτιώνουμε την εμπειρία χρήστη
      • Συμμορφωνόμαστε με νομικές υποχρεώσεις`,

      dataProtectionContent: `Εφαρμόζουμε κατάλληλα μέτρα ασφαλείας για την προστασία των προσωπικών σας πληροφοριών:
      
      • Κρυπτογράφηση SSL για τη μετάδοση δεδομένων
      • Ασφαλείς διακομιστές και βάσεις δεδομένων
      • Περιορισμένη πρόσβαση σε προσωπικές πληροφορίες
      • Τακτικοί έλεγχοι ασφαλείας και ενημερώσεις
      • Εκπαίδευση προσωπικού σε θέματα προστασίας δεδομένων
      
      Ωστόσο, καμία μέθοδος μετάδοσης μέσω διαδικτύου δεν είναι 100% ασφαλής.`,

      yourRightsContent: `Βάσει του GDPR και άλλων εφαρμοστέων νόμων, έχετε το δικαίωμα να:
      
      • Αποκτήσετε πρόσβαση στα προσωπικά σας δεδομένα
      • Διορθώσετε ανακριβείς πληροφορίες
      • Διαγράψετε τα προσωπικά σας δεδομένα
      • Περιορίσετε την επεξεργασία των δεδομένων σας
      • Φορητότητα δεδομένων
      • Αντιταχθείτε στην επεξεργασία
      • Ανακαλέσετε τη συγκατάθεση ανά πάσα στιγμή
      
      Για να ασκήσετε αυτά τα δικαιώματα, επικοινωνήστε μαζί μας χρησιμοποιώντας τις παρακάτω πληροφορίες.`,

      cookiesContent: `Χρησιμοποιούμε cookies και παρόμοιες τεχνολογίες για να:
      
      • Θυμόμαστε τις προτιμήσεις σας
      • Αναλύουμε την κίνηση της ιστοσελίδας
      • Βελτιώνουμε την εμπειρία χρήστη
      • Παρέχουμε εξατομικευμένο περιεχόμενο
      
      Μπορείτε να ελέγξετε τα cookies μέσω των ρυθμίσεων του περιηγητή σας. Ορισμένες λειτουργίες ενδέχεται να μη λειτουργούν σωστά εάν τα cookies είναι απενεργοποιημένα.`,

      thirdPartyContent: `Ενδέχεται να μοιραστούμε πληροφορίες με έμπιστους τρίτους:
      
      • Παρόχους υπηρεσιών (φιλοξενία, ανάλυση, email)
      • Επεξεργαστές πληρωμών
      • Νομικές αρχές όταν απαιτείται από το νόμο
      
      Δεν πουλάμε τις προσωπικές σας πληροφορίες σε τρίτους.`,

      dataRetentionContent: `Διατηρούμε τις προσωπικές σας πληροφορίες για όσο διάστημα είναι απαραίτητο για να:
      
      • Παρέχουμε τις υπηρεσίες μας
      • Συμμορφωνόμαστε με νομικές υποχρεώσεις
      • Επιλύουμε διαφορές
      • Επιβάλλουμε τις συμφωνίες μας
      
      Αναθεωρούμε τακτικά και διαγράφουμε περιττά δεδομένα.`,

      contactInfoContent: `Εάν έχετε ερωτήσεις σχετικά με αυτή την Πολιτική Απορρήτου ή τις πρακτικές δεδομένων μας, επικοινωνήστε μαζί μας:
      
      Email: joypartythess@gmail.com
      Τηλέφωνο: +30 698 745 1036
      Τοποθεσία: Θεσσαλονίκη, Ελλάδα`,

      changesContent: `Ενδέχεται να ενημερώσουμε αυτή την Πολιτική Απορρήτου κατά καιρούς. Θα σας ειδοποιήσουμε για οποιεσδήποτε ουσιαστικές αλλαγές δημοσιεύοντας τη νέα πολιτική στην ιστοσελίδα μας και ενημερώνοντας την ημερομηνία "τελευταίας ενημέρωσης".
      
      Η συνεχιζόμενη χρήση των υπηρεσιών μας μετά από οποιεσδήποτε αλλαγές συνιστά αποδοχή της ενημερωμένης πολιτικής.`,
    },

    uk: {
      privacyPolicy: "Політика Конфіденційності",
      lastUpdated: "Останнє оновлення: 18 грудня 2024",
      backToHome: "Повернутися Додому",

      // Introduction
      introduction:
        "У Joy Events ми серйозно ставимося до вашої конфіденційності. Ця Політика Конфіденційності пояснює, як ми збираємо, використовуємо та захищаємо вашу особисту інформацію, коли ви користуєтеся нашими послугами.",

      // Section headers
      dataCollection: "Інформація, яку ми Збираємо",
      dataUse: "Як ми Використовуємо вашу Інформацію",
      dataProtection: "Захист Даних",
      yourRights: "Ваші Права",
      cookies: "Файли Cookie та Відстеження",
      thirdParty: "Сторонні Сервіси",
      dataRetention: "Зберігання Даних",
      contactInfo: "Контактна Інформація",
      changes: "Зміни до цієї Політики",

      // Content
      dataCollectionContent: `Ми збираємо інформацію, яку ви надаєте нам безпосередньо, таку як:
      
      • Ім'я та контактна інформація (email, номер телефону)
      • Деталі та переваги подій
      • Відгуки та рецензії
      • Записи спілкування
      
      Ми також збираємо інформацію автоматично, коли ви користуєтеся нашим веб-сайтом:
      
      • Тип та версія браузера
      • IP-адреса та дані про місцезнаходження
      • Відвідані сторінки та час перебування
      • Інформація про пристрій`,

      dataUseContent: `Ми використовуємо вашу інформацію для:
      
      • Надання та покращення наших послуг з планування подій
      • Спілкування з вами щодо бронювань та подій
      • Надсилання вам оновлень та рекламних матеріалів (за згодою)
      • Відповіді на ваші запити та запити підтримки
      • Аналізу використання веб-сайту та покращення користувацького досвіду
      • Дотримання правових зобов'язань`,

      dataProtectionContent: `Ми впроваджуємо відповідні заходи безпеки для захисту вашої особистої інформації:
      
      • SSL-шифрування для передачі даних
      • Безпечні сервери та бази даних
      • Обмежений доступ до особистої інформації
      • Регулярні аудити безпеки та оновлення
      • Навчання персоналу з питань захисту даних
      
      Однак жоден метод передачі через інтернет не є на 100% безпечним.`,

      yourRightsContent: `Згідно з GDPR та іншими застосовними законами, ви маєте право:
      
      • Отримати доступ до ваших особистих даних
      • Виправити неточну інформацію
      • Видалити ваші особисті дані
      • Обмежити обробку ваших даних
      • Переносимість даних
      • Заперечити проти обробки
      • Відкликати згоду в будь-який час
      
      Щоб скористатися цими правами, будь ласка, зв'яжіться з нами, використовуючи інформацію нижче.`,

      cookiesContent: `Ми використовуємо файли cookie та подібні технології для:
      
      • Запам'ятовування ваших переваг
      • Аналізу трафіку веб-сайту
      • Покращення користувацького досвіду
      • Надання персоналізованого контенту
      
      Ви можете керувати файлами cookie через налаштування вашого браузера. Деякі функції можуть не працювати належним чином, якщо файли cookie вимкнені.`,

      thirdPartyContent: `Ми можемо ділитися інформацією з надійними третіми сторонами:
      
      • Постачальники послуг (хостинг, аналітика, email)
      • Процесори платежів
      • Правові органи, коли це вимагається законом
      
      Ми не продаємо вашу особисту інформацію третім сторонам.`,

      dataRetentionContent: `Ми зберігаємо вашу особисту інформацію стільки, скільки необхідно для:
      
      • Надання наших послуг
      • Дотримання правових зобов'язань
      • Вирішення спорів
      • Виконання наших угод
      
      Ми регулярно переглядаємо та видаляємо непотрібні дані.`,

      contactInfoContent: `Якщо у вас є питання щодо цієї Політики Конфіденційності або наших практик роботи з даними, будь ласка, зв'яжіться з нами:
      
      Email: joypartythess@gmail.com
      Телефон: +30 698 745 1036
      Місцезнаходження: Салоніки, Греція`,

      changesContent: `Ми можемо час від часу оновлювати цю Політику Конфіденційності. Ми повідомимо вас про будь-які суттєві зміни, опублікувавши нову політику на нашому веб-сайті та оновивши дату "останнього оновлення".
      
      Ваше продовження користування нашими послугами після будь-яких змін означає прийняття оновленої політики.`,
    },
  };

  const t =
    translations[
      currentLanguage as keyof typeof translations
    ] || translations.en;

  const sections = [
    {
      title: t.dataCollection,
      content: t.dataCollectionContent,
      icon: Eye,
    },
    {
      title: t.dataUse,
      content: t.dataUseContent,
      icon: UserCheck,
    },
    {
      title: t.dataProtection,
      content: t.dataProtectionContent,
      icon: Shield,
    },
    {
      title: t.yourRights,
      content: t.yourRightsContent,
      icon: FileText,
    },
    { title: t.cookies, content: t.cookiesContent, icon: Eye },
    {
      title: t.thirdParty,
      content: t.thirdPartyContent,
      icon: UserCheck,
    },
    {
      title: t.dataRetention,
      content: t.dataRetentionContent,
      icon: Lock,
    },
    {
      title: t.contactInfo,
      content: t.contactInfoContent,
      icon: UserCheck,
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
              {t.privacyPolicy}
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