'use client';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import FloatingLeaves from '@/components/common/FloatingLeaves';
import {
  ArrowRight,
  Shield,
  Lock,
  Eye,
  FileText,
  Users,
  X,
  Leaf,
  ChevronUp,
  BookOpen,
  HelpCircle,
  Fingerprint,
  Globe,
  Sparkles,
  ImageIcon,
} from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
 

// Scroll reveal hook
function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: '0px 0px -100px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, isVisible];
}

// Leaf pattern (only texture)
const leafPatternStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322c55e' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  backgroundRepeat: 'repeat',
};

export default function LegalPage() {
  const { t } = useLanguage();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (title, desc, type = 'Legal') => {
    setModalContent({ title, type, desc });
    setModalOpen(true);
  };
  const closeModal = () => { setModalOpen(false); setModalContent(null); };

  const [ref1, vis1] = useScrollReveal(0.2);
  const [ref2, vis2] = useScrollReveal(0.2);
  const [ref3, vis3] = useScrollReveal(0.2);
  const [ref4, vis4] = useScrollReveal(0.2);
  const [ref5, vis5] = useScrollReveal(0.2);
  const [ref6, vis6] = useScrollReveal(0.2);
  const [ref7, vis7] = useScrollReveal(0.2);
  const [ref8, vis8] = useScrollReveal(0.2);

  const revealClass = (visible) =>
    `transition-all duration-700 ease-out ${
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`;

  // Animated stats
  const [encryptedCount, setEncryptedCount] = useState(0);
  const [monitorCount, setMonitorCount] = useState(0);
  const statsRef = useRef(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    const node = statsRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStartedRef.current) {
          hasStartedRef.current = true;
          let step = 0;
          const totalSteps = 40;
          const interval = setInterval(() => {
            step++;
            const p = step / totalSteps;
            setEncryptedCount(Math.round(100 * p));
            setMonitorCount(Math.round(24 * p));
            if (step >= totalSteps) {
              clearInterval(interval);
              setEncryptedCount(100);
              setMonitorCount(24);
            }
          }, 40);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const [showBackToTop, setShowBackToTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const safeT = (key, fallback = '') => {
    const value = t(key);
    return typeof value === 'string' ? value : fallback;
  };

  // Define missing titles inline
  const modalReadMore = "Read More";
  const modalTerms = "Terms";
  const modalCondition = "Term Condition";
  const modalPrivacy = "Privacy";
  const modalData = "Collected Data";

  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* HERO SECTION - only background image, no glass effect on paragraph, NOW FIXED */}
      <section
        className="relative flex items-center justify-center min-h-screen bg-fixed bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url(' ./forsett4.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <div className="absolute inset-0 " />
        <FloatingLeaves />
        <div ref={ref1} className={`relative z-10 text-center text-white max-w-4xl px-4 sm:px-6 ${revealClass(vis1)}`}>
          
          <h1 className="text-4xl  md:text-5xl font-extrabold tracking-tight drop-shadow-2xl bg-gradient-to-r from-white to-white bg-clip-text text-transparent">
            {safeT('legal.hero.title', 'Legal & Privacy')}
          </h1>
          <p className="mt-4 text-xl text-green-100 max-w-3xl mx-auto drop-shadow-lg px-4 py-2">
            {safeT('legal.hero.subtitle', 'Our commitment to transparency, your rights, and the spirit of the forest.')}
          </p>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
         </div>
      </section>

      {/* TERMS OF USE - WHITE */}
      <section className="py-24 bg-white relative" style={leafPatternStyle}>
        <div ref={ref2} className={`max-w-7xl mx-auto px-4 sm:px-6 relative ${revealClass(vis2)}`}>
          <div className="text-center mb-12">
            <span className="text-green-600 font-semibold tracking-wider uppercase text-sm">Legal Framework</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-green-900 mt-2">
              {safeT('legal.terms.title', 'Terms of Use')}
            </h2>
            <div className="w-24 h-1 bg-green-500 mx-auto mt-4 rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-6">
              {safeT('legal.terms.subtitle', 'Please read these terms carefully before using our website')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: safeT('legal.terms.acceptance.title', 'Acceptance of Terms'), desc: safeT('legal.terms.acceptance.desc', 'By accessing this website, you agree to be bound by these terms.'), long: safeT('legal.terms.acceptance.long', 'By using the Forest Explorer website, you confirm that you have read, understood, and agree to be bound by these Terms of Use.') },
              { icon: FileText, title: safeT('legal.terms.updates.title', 'Changes to Terms'), desc: safeT('legal.terms.updates.desc', 'We may modify these terms at any time. Continued use means acceptance.'), long: safeT('legal.terms.updates.long', 'Forest Explorer reserves the right to update or change these Terms of Use at any time without prior notice.') },
              { icon: HelpCircle, title: safeT('legal.terms.questions.title', 'Questions?'), desc: safeT('legal.terms.questions.desc', 'Contact us for any clarifications regarding our terms.'), long: safeT('legal.terms.questions.long', 'If you have any questions about these Terms of Use, please reach out to our support team via the contact page.') },
            ].map((item, i) => (
              <div key={i} onClick={() => openModal(item.title, item.long, modalTerms)}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 transition-all duration-500 cursor-pointer border border-green-100 hover:border-green-400 transform hover:-translate-y-2 hover:scale-[1.02] backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/0 to-green-50/0 group-hover:from-green-50/50 group-hover:to-transparent rounded-2xl transition-all duration-500" />
                <div className="relative z-10">
                  <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-green-200 transition-colors">
                    <item.icon className="text-green-700 w-7 h-7 group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-green-900">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  {/* Button style instead of simple text */}
                  <div className="mt-6">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                      {modalReadMore} <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KEY TERMS - LIGHT GREEN */}
      <section className="py-24 bg-green-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent" />
        <div ref={ref3} className={`max-w-4xl mx-auto px-4 sm:px-6 ${revealClass(vis3)}`}>
          <div className="text-center mb-12">
            <Leaf className="inline-block w-10 h-10 text-green-600 mb-2" />
            <h2 className="text-3xl sm:text-4xl font-bold text-green-900">
              {safeT('legal.terms.key_terms_title', 'Key Terms Explained')}
            </h2>
            <p className="text-gray-600 mt-2">Important legal concepts simplified</p>
          </div>
          <div className="space-y-6">
            {[
              { title: safeT('legal.terms.content_use.title', 'Content Use'), short: safeT('legal.terms.content_use.short', 'All text, images, and media are protected. Do not copy or redistribute without permission.'), long: safeT('legal.terms.content_use.long', 'All content on Forest Explorer is protected by international copyright laws. You may view, download, and print pages for personal, non-commercial use only.') },
              { title: safeT('legal.terms.conduct.title', 'User Conduct'), short: safeT('legal.terms.conduct.short', 'Respect the community and nature. No illegal or harmful activity allowed.'), long: safeT('legal.terms.conduct.long', 'You agree to use Forest Explorer only for lawful purposes. You shall not post any harmful, harassing, or defamatory material.') },
              { title: safeT('legal.terms.account.title', 'Account Responsibility'), short: safeT('legal.terms.account.short', 'You are responsible for keeping your login credentials secure.'), long: safeT('legal.terms.account.long', 'If you create an account, you are solely responsible for maintaining the confidentiality of your password and account, and for all activities that occur under your account.') },
            ].map((item, i) => (
              <div key={i} onClick={() => openModal(item.title, item.long, modalCondition)}
                className="flex gap-5 bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group border-l-4 border-l-green-500 border border-green-100 hover:border-green-300 hover:translate-x-1">
                <div className="shrink-0 mt-1">
                  <Shield className="text-green-600 w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl text-gray-800 group-hover:text-green-700">{item.title}</h3>
                  <p className="text-gray-600 mt-1">{item.short}</p>
                  <div className="mt-3">
                    <span className="inline-flex items-center gap-1 text-green-600 text-sm font-medium group-hover:underline">
                      {modalReadMore} <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRIVACY POLICY - WHITE */}
      <section className="py-24 bg-white">
        <div ref={ref4} className={`max-w-7xl mx-auto px-4 sm:px-6 text-center ${revealClass(vis4)}`}>
          <Fingerprint className="mx-auto text-green-600 w-12 h-12 mb-4" />
          <h2 className="text-4xl sm:text-5xl font-bold text-green-900 mb-4">
            {safeT('legal.privacy.title', 'Privacy Policy')}
          </h2>
          <div className="w-24 h-1 bg-green-500 mx-auto mt-2 mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-16">
            {safeT('legal.privacy.subtitle', 'Your data is safe with us — just like a hidden forest glade.')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: safeT('legal.privacy.no_agendas.title', 'No Hidden Agendas'), desc: safeT('legal.privacy.no_agendas.desc', 'We don’t sell your personal data to third parties. Ever.'), long: safeT('legal.privacy.no_agendas.long', 'Your privacy is not up for sale. Forest Explorer does not rent, sell, or share your personal information with any third-party companies for their marketing purposes.') },
              { icon: Lock, title: safeT('legal.privacy.protection.title', 'Strong Protection'), desc: safeT('legal.privacy.protection.desc', 'We use industry-standard security measures to safeguard your data.'), long: safeT('legal.privacy.protection.long', 'We implement a variety of security technologies and procedures to help protect your personal information from unauthorized access, use, or disclosure. This includes encrypted connections (SSL/TLS) and firewalls.') },
              { icon: Eye, title: safeT('legal.privacy.transparency.title', 'Complete Transparency'), desc: safeT('legal.privacy.transparency.desc', 'You can request a copy of all data we hold about you anytime.'), long: safeT('legal.privacy.transparency.long', 'You have the right to request access to, correction, or deletion of your personal data. Simply contact us via the form on the contact page, and we will respond within 30 days.') },
            ].map((item, i) => (
              <div key={i} onClick={() => openModal(item.title, item.long, modalPrivacy)}
                className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl border border-gray-100 hover:border-green-300 p-8 transition-all duration-400 cursor-pointer transform hover:-translate-y-2">
                <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-green-100 transition-colors">
                  <item.icon className="text-green-700 w-8 h-8 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-green-800">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
                <div className="mt-5">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                    {modalReadMore} <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE COLLECT - LIGHT GREEN with visible images (section with images) */}
      <section className="py-24 bg-green-50 relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-200/30 rounded-full blur-3xl -z-0" />
        <div ref={ref5} className={`max-w-4xl mx-auto px-4 sm:px-6 relative ${revealClass(vis5)}`}>
          <Globe className="mx-auto text-green-600 w-10 h-10 mb-3" />
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 text-center mb-4">
            {safeT('legal.privacy.collect_title', 'What Information We Collect')}
          </h2>
          <p className="text-center text-gray-600 mb-12">We collect minimal data to improve your experience</p>
          <div className="space-y-6">
            {[
              { title: safeT('legal.privacy.personal.title', 'Personal Info'), short: safeT('legal.privacy.personal.short', 'Name, email, and messages you send us.'), long: safeT('legal.privacy.personal.long', 'When you contact us, sign up for a newsletter, or use certain features, we may ask for personal details such as your name, email address, and any message you choose to send. This information is used only to respond to your requests.'), img: './forset1.jpg' },
              { title: safeT('legal.privacy.browsing.title', 'Browsing Data'), short: safeT('legal.privacy.browsing.short', 'Anonymous usage statistics to improve our site.'), long: safeT('legal.privacy.browsing.long', 'Like most websites, we collect non-personal data such as your IP address (anonymized), browser type, pages visited, time spent, and referral URLs. This helps us understand how visitors use Forest Explorer so we can optimize content.'), img: './forset2.jpg' },
              { title: safeT('legal.privacy.cookies.title', 'Cookies'), short: safeT('legal.privacy.cookies.short', 'Small files that remember your preferences.'), long: safeT('legal.privacy.cookies.long', 'We use essential cookies to enable core functionality (e.g., language preference, login state). You can disable cookies in your browser settings, but some parts of the site may not work properly. We do not use tracking cookies from third-party advertisers.'), img: './forest3.jpg' },
            ].map((item, i) => (
              <div key={i} onClick={() => openModal(item.title, item.long, modalData)}
                className="flex gap-5 bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer group border border-green-100 hover:border-green-400 hover:bg-green-50/30">
                <div className="shrink-0 w-24 h-24 rounded-lg overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-xl text-gray-800 group-hover:text-green-700">{item.title}</h3>
                  <p className="text-gray-600 mt-1">{item.short}</p>
                  <div className="mt-3">
                    <span className="inline-flex items-center gap-1 text-green-600 text-sm font-medium group-hover:underline">
                      {modalReadMore} <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION - DARK GREEN GRADIENT */}
      <section className="py-20 bg-gradient-to-r from-green-800 via-green-700 to-green-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')] opacity-10" />
        <div ref={statsRef} className={`max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative ${revealClass(true)}`}>
          <div className="p-5 backdrop-blur-sm bg-white/10 rounded-2xl hover:bg-white/20 transition-all">
            <Lock className="mx-auto w-10 h-10 mb-3 text-green-300" />
            <div className="text-5xl font-bold">{encryptedCount}%</div>
            <div className="mt-2 text-green-200 text-sm uppercase tracking-wider font-semibold">{safeT('legal.stats.encrypted', 'Encrypted')}</div>
          </div>
          <div className="p-5 backdrop-blur-sm bg-white/10 rounded-2xl hover:bg-white/20 transition-all">
            <Shield className="mx-auto w-10 h-10 mb-3 text-green-300" />
            <div className="text-5xl font-bold">0</div>
            <div className="mt-2 text-green-200 text-sm uppercase tracking-wider font-semibold">{safeT('legal.stats.data_sold', 'Data Sold')}</div>
          </div>
          <div className="p-5 backdrop-blur-sm bg-white/10 rounded-2xl hover:bg-white/20 transition-all">
            <Eye className="mx-auto w-10 h-10 mb-3 text-green-300" />
            <div className="text-5xl font-bold">{monitorCount}/7</div>
            <div className="mt-2 text-green-200 text-sm uppercase tracking-wider font-semibold">{safeT('legal.stats.monitoring', 'Day Monitoring')}</div>
          </div>
          <div className="p-5 backdrop-blur-sm bg-white/10 rounded-2xl hover:bg-white/20 transition-all">
            <Sparkles className="mx-auto w-10 h-10 mb-3 text-green-300" />
            <div className="text-5xl font-bold">∞</div>
            <div className="mt-2 text-green-200 text-sm uppercase tracking-wider font-semibold">{safeT('legal.stats.trust', 'Trust')}</div>
          </div>
        </div>
      </section>

      {/* STILL UNSURE - WHITE */}
      <section className="py-24 bg-white">
        <div ref={ref7} className={`max-w-3xl mx-auto text-center px-4 ${revealClass(vis7)}`}>
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
            <Users className="text-green-700 w-10 h-10" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-green-900 mb-6">
            {safeT('legal.still_unsure.title', 'Still have questions?')}
          </h2>
          <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
            {safeT('legal.still_unsure.desc', 'We\'re here to help you explore safely. Reach out anytime.')}
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <Link href={ROUTES.CONTACT}>
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-medium inline-flex items-center gap-2 shadow-lg transition-all hover:scale-105">
                {safeT('legal.still_unsure.contact', 'Contact Us')} <ArrowRight size={18} />
              </button>
            </Link>
            <Link href={ROUTES.CHAT}>
              <button className="border-2 border-green-600 text-green-700 hover:bg-green-50 px-8 py-4 rounded-xl font-medium inline-flex items-center gap-2 transition-all hover:scale-105">
                {safeT('legal.still_unsure.ask_spirit', 'Ask Forest Spirit')} <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA SECTION - solid dark green (no image) */}
      <section className="py-28 bg-green-800 relative">
        <div ref={ref8} className={`relative max-w-4xl mx-auto text-center text-white px-4 ${revealClass(vis8)}`}>
          <Leaf className="mx-auto w-14 h-14 mb-5 text-green-200 animate-pulse" />
          <h2 className="text-4xl  md:text-5xl font-bold mb-6 drop-shadow-lg">
            {safeT('legal.cta.title', 'Walk with confidence')}
          </h2>
          <p className="text-green-100 text-xl mb-10 max-w-xl mx-auto">
            {safeT('legal.cta.desc', 'Your adventure awaits — and your rights are always protected.')}
          </p>
          <Link href={ROUTES.EXPLORE}
            className="inline-flex items-center gap-3 bg-white text-green-800 hover:bg-green-100 px-12 py-5 text-xl rounded-xl shadow-xl transition-all hover:scale-105 font-semibold">
            {safeT('legal.cta.button', 'Start Exploring')} <ArrowRight size={24} />
          </Link>
        </div>
      </section>

      {/* MODAL - WITHOUT IMAGE */}
      {modalOpen && modalContent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-all duration-300" onClick={closeModal}>
          <div className="relative max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-100" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 rounded-full p-2 shadow backdrop-blur-sm transition">
              <X size={24} className="text-white" />
            </button>
            <div className="p-8">
              <span className="inline-block text-sm font-medium uppercase tracking-wider text-green-700 bg-green-100 px-3 py-1 rounded-full mb-4">
                {modalContent.type}
              </span>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{modalContent.title}</h3>
              <p className="text-gray-600 whitespace-pre-line leading-relaxed">{modalContent.desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* BACK TO TOP BUTTON */}
      {showBackToTop && (
        <button onClick={scrollToTop} className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl" aria-label="Scroll to top">
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
}