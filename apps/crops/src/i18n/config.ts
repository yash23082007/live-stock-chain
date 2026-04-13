import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Premium Internationalization supporting 10 Indian Languages + English
const resources = {
  en: { translation: { greeting: "Welcome to Farm Input Finance", marketplace: "Marketplace", onboarding: "Onboarding", report: "Harvest Report" } },
  hi: { translation: { greeting: "कृषि इनपुट फाइनेंस में आपका स्वागत है", marketplace: "बाज़ार", onboarding: "ऑनबोर्डिंग", report: "फसल रिपोर्ट" } },
  bn: { translation: { greeting: "ফার্ম ইনপুট ফাইন্যান্সে স্বাগতম", marketplace: "মার্কেটপ্লেস", onboarding: "অনবোর্ডিং", report: "ফসল রিপোর্ট" } },
  te: { translation: { greeting: "ఫార్మ్ ఇన్‌పుట్ ఫైనాన్స్‌కు స్వాగతం", marketplace: "మార్కెట్‌ప్లేస్", onboarding: "ఆన్‌బోర్డింగ్", report: "పంట నివేదిక" } },
  mr: { translation: { greeting: "फार्म इनपुट फायनान्समध्ये आपले स्वागत आहे", marketplace: "मार्केटप्लेस", onboarding: "ऑनबोर्डिंग", report: "पीक अहवाल" } },
  ta: { translation: { greeting: "பண்ணை உள்ளீட்டு நிதிக்கு வரவேற்கிறோம்", marketplace: "சந்தை", onboarding: "உள்நுழைதல்", report: "அறுவடை அறிக்கை" } },
  gu: { translation: { greeting: "ફાર્મ ઇનપુટ ફાઇનાન્સમાં તમારું સ્વાગત છે", marketplace: "માર્કેટપ્લેસ", onboarding: "ઓનબોર્ડિંગ", report: "લણણી રિપોર્ટ" } },
  kn: { translation: { greeting: "ಫಾರ್ಮ್ ಇನ್‌ಪುಟ್ ಫೈನಾನ್ಸ್‌ಗೆ ಸುಸ್ವಾಗತ", marketplace: "ಮಾರುಕಟ್ಟೆ", onboarding: "ಆನ್‌ಬೋರ್ಡಿಂಗ್", report: "ಕೊಯ್ಲು ವರದಿ" } },
  ml: { translation: { greeting: "ഫാം ഇൻപുട്ട് ഫിനാൻസിലേക്ക് സ്വാഗതം", marketplace: "മാർക്കറ്റ്പ്ലേസ്", onboarding: "ഓൺബോർഡിംഗ്", report: "വിളവെടുപ്പ് റിപ്പോർട്ട്" } },
  or: { translation: { greeting: "ଫାର୍ମ ଇନପୁଟ୍ ଫାଇନାନ୍ସକୁ ସ୍ୱାଗତ", marketplace: "ବଜାର", onboarding: "ଅନବୋର୍ଡିଂ", report: "ଅମଳ ରିପୋର୍ଟ" } },
  pa: { translation: { greeting: "ਫਾਰਮ ਇਨਪੁਟ ਫਾਈਨਾਂਸ ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ", marketplace: "ਮਾਰਕੀਟਪਲੇਸ", onboarding: "ਆਨਬੋਰਡਿੰਗ", report: "ਵਾਢੀ ਦੀ ਰਿਪੋਰਟ" } }
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
})

export default i18n
