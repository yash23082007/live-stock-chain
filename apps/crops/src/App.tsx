import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { OnboardingPage } from './pages/Onboarding'
import { MarketplacePage } from './pages/Marketplace'
import { HarvestReportPage } from './pages/HarvestReport'
import { NexusHub } from './pages/NexusHub'
import { AuthPage } from './pages/Auth'
import { AboutView } from './pages/About'
import { AgriNexusView } from './pages/AgriNexus'
import { BioTraceView } from './pages/BioTrace'
import { EnergyYieldView } from './pages/EnergyYield'
import { DashboardLayout } from './components/DashboardLayout'
import './i18n/config'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route 
          path="/*" 
          element={
            <DashboardLayout>
              <Routes>
                <Route path="/" element={<NexusHub />} />
                <Route path="/agri" element={<AgriNexusView />} />
                <Route path="/bio" element={<BioTraceView />} />
                <Route path="/energy" element={<EnergyYieldView />} />
                <Route path="/onboarding" element={<OnboardingPage />} />
                <Route path="/marketplace" element={<MarketplacePage />} />
                <Route path="/report" element={<HarvestReportPage />} />
                <Route path="/about" element={<AboutView />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </DashboardLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
