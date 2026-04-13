import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { OnboardingPage } from './pages/Onboarding'
import { MarketplacePage } from './pages/Marketplace'
import { HarvestReportPage } from './pages/HarvestReport'
import { LandingPage } from './pages/Landing'
import { PremiumLayout } from './components/PremiumLayout'
import './i18n/config'

export default function App() {
  return (
    <BrowserRouter>
      <PremiumLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/harvest-report" element={<HarvestReportPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PremiumLayout>
    </BrowserRouter>
  )
}
