import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      nexus: {
        title: "The Quantum Nexus",
        subtitle: "Integrated Real-World Assets",
        description: "The world's first unified command center bridging Crops, Livestock, and Energy assets on the blockchain.",
        tagline: "System Online • Secure Protocol",
        launch: "Launch Terminal",
        securityHeader: "Banking Grade Security",
        securityDesc: "End-to-end encrypted ledger anchoring for physical assets."
      },
      auth: {
        login: "Welcome Back",
        signup: "Create Account",
        phone: "Mobile Number",
        otp: "Verify OTP",
        submit: "Proceed to Terminal",
        switch: "Switch Language"
      },
      sectors: {
        crops: {
          title: "Argo-Credit",
          desc: "Input financing and crop-cycle credit tokens."
        },
        livestock: {
          title: "Bio-Trace",
          desc: "Cattle NFT passports and health provenance."
        },
        energy: {
          title: "Petro-Yield",
          desc: "Fractional ownership of oil production assets."
        }
      },
      nav: {
        dashboard: "Overview",
        marketplace: "Market",
        onboarding: "Access",
        logout: "Disconnect"
      }
    }
  },
  hi: {
    translation: {
      nexus: {
        title: "क्वांटम नेक्सस",
        subtitle: "एकीकृत वास्तविक-दुनिया संपत्ति",
        description: "फसल, पशुधन और ऊर्जा क्षेत्र को ब्लॉकचेन पर जोड़ने वाला दुनिया का पहला एकीकृत कमांड सेंटर।",
        tagline: "सिस्टम ऑनलाइन • सुरक्षित प्रोटोकॉल",
        launch: "टर्मिनल शुरू करें",
        securityHeader: "बैंकिंग स्तर की सुरक्षा",
        securityDesc: "भौतिक संपत्ति के लिए एंड-टू-एंड एन्क्रिप्टेड लेजर एंकरिंग।"
      },
      auth: {
        login: "आपका स्वागत है",
        signup: "खाता बनाएँ",
        phone: "मोबाइल नंबर",
        otp: "ओटीपी सत्यापित करें",
        submit: "टर्मिनल पर आगे बढ़ें",
        switch: "भाषा बदलें"
      },
      sectors: {
        crops: {
          title: "एग्रो-क्रेडिट",
          desc: "इनपुट फाइनेंसिंग और फसल-चक्र क्रेडिट टोकन।"
        },
        livestock: {
          title: "बायो-ट्रेस",
          desc: "मवेशी एनएफटी पासपोर्ट और स्वास्थ्य प्रमाण।"
        },
        energy: {
          title: "पेट्रो-यील्ड",
          desc: "तेल उत्पादन संपत्ति का आंशिक स्वामित्व।"
        }
      },
      nav: {
        dashboard: "अवलोकन",
        marketplace: "बाज़ार",
        onboarding: "एक्सेस",
        logout: "डिस्कनेक्ट"
      }
    }
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
})

export default i18n
