import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RootLayout } from '@layouts/RootLayout';
import { Home } from '@pages/Home';
import LeadForm from './pages/Products/Productform';
import Product from './pages/Products/product';
import CategoryForm from './pages/Products/CategoryForm';

// Lazy load service pages for code splitting
const ItSupport = React.lazy(() => import('@pages/services/ItSupport').then(m => ({ default: m.ItSupport })));
const CyberSecurity = React.lazy(() => import('@pages/services/CyberSecurity').then(m => ({ default: m.CyberSecurity })));
const Bcdr = React.lazy(() => import('@pages/services/Bcdr').then(m => ({ default: m.Bcdr })));
const Microsoft365 = React.lazy(() => import('@pages/services/Microsoft365').then(m => ({ default: m.Microsoft365 })));
const Telecom = React.lazy(() => import('@pages/services/Telecom').then(m => ({ default: m.Telecom })));
const DigitalServices = React.lazy(() => import('@pages/services/DigitalServices').then(m => ({ default: m.DigitalServices })));
const About = React.lazy(() => import('@pages/About').then(m => ({ default: m.About })));
const Contact = React.lazy(() => import('@pages/Contact').then(m => ({ default: m.Contact })));
const ThankYou = React.lazy(() => import('@pages/ThankYou').then(m => ({ default: m.ThankYou })));
const Privacy = React.lazy(() => import('@pages/Privacy').then(m => ({ default: m.Privacy })));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin">
      <div className="h-12 w-12 border-4 border-primary-500 border-t-accent-500 rounded-full" />
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/services/it-support-infrastructure" element={<Suspense fallback={<LoadingFallback />}><ItSupport /></Suspense>} />
          <Route path="/services/cyber-security" element={<Suspense fallback={<LoadingFallback />}><CyberSecurity /></Suspense>} />
          <Route path="/services/backup-business-continuity" element={<Suspense fallback={<LoadingFallback />}><Bcdr /></Suspense>} />
          <Route path="/services/microsoft-365-collaboration" element={<Suspense fallback={<LoadingFallback />}><Microsoft365 /></Suspense>} />
          <Route path="/services/telecom-cloud-telephony" element={<Suspense fallback={<LoadingFallback />}><Telecom /></Suspense>} />
          <Route path="/services/digital-services" element={<Suspense fallback={<LoadingFallback />}><DigitalServices /></Suspense>} />
          <Route path="/about" element={<Suspense fallback={<LoadingFallback />}><About /></Suspense>} />
          <Route path="/contact" element={<Suspense fallback={<LoadingFallback />}><Contact /></Suspense>} />
          <Route path="/thank-you" element={<Suspense fallback={<LoadingFallback />}><ThankYou /></Suspense>} />
          <Route path="/privacy" element={<Suspense fallback={<LoadingFallback />}><Privacy /></Suspense>} />
          <Route path="/productForm" element={<Suspense fallback={<LoadingFallback />}><LeadForm /></Suspense>} />
          <Route path="/products/:name" element={<Suspense fallback={<LoadingFallback />}><Product /></Suspense>} />
          <Route path="/categoryForm" element={<Suspense fallback={<LoadingFallback />}><CategoryForm /></Suspense>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
