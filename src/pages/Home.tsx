import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Waves, 
  Mountain, 
  Aperture, 
  CheckCircle2, 
  Mail, 
  Phone,
  ChevronRight,
  MapPin,
  Calendar,
  Compass
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import appDataRaw from '../data/destination_settings.json';
import { RawAppData, Destination } from '../types';

const appData = appDataRaw as RawAppData;

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const { t, i18n } = useTranslation();
  const isZH = i18n.language === 'xy';

  // Merge static data with translations
  const translatedDestinations: Destination[] = appData.destinations.map(d => ({
    ...d,
    title: t(`destinations.${d.id}.title`).replaceAll('<br/>', ''),
    activity: t(`destinations.${d.id}.activity`),
    location: t(`destinations.${d.id}.location`),
    shortDescription: t(`destinations.${d.id}.shortDescription`),
    fullDescription: t(`destinations.${d.id}.fullDescription`),
    buttonText: t(`destinations.${d.id}.buttonText`),
    highlights: t(`destinations.${d.id}.highlights`, { returnObjects: true }) as string[]
  }));

  const filteredDestinations = activeTab === 'all' 
    ? translatedDestinations 
    : translatedDestinations.filter(d => d.id === activeTab);

  const getActivityIcon = (id: string) => {
    if (id === 'surf') return <Waves className="w-5 h-5" />;
    if (id === 'bike') return <Aperture className="w-5 h-5" />;
    if (id === 'climb') return <Mountain className="w-5 h-5" />;
    return <Compass className="w-5 h-5" />;
  };

  return (
    <>
      {/* Hero Section */}
      <header className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/adventure/1920/1080" 
            alt="Adventure Background" 
            className="w-full h-full object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block bg-orange-600 text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
              {t('company.tagline')}
            </span>
            <h1 className={`text-6xl md:text-8xl font-display font-bold text-white mb-8 ${isZH ? 'leading-[1.15]' : 'leading-none'}`}>
              <Trans 
                i18nKey="hero.title"
                components={{
                  highlight: <span className="text-orange-500" />,
                  br: <br />
                }}
              />
            </h1>
            <p className="text-stone-200 text-lg md:text-xl mb-10 leading-relaxed whitespace-pre-line">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#destinations" className="bg-white text-stone-900 px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-orange-600 hover:text-white transition-all">
                {t('common.explorePackages')} <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#about" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all">
                {t('common.ourStory')}
              </a>
            </div>
          </motion.div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-12 right-6 hidden lg:block">
          <div className="flex gap-12 text-white">
            <div>
              <div className="text-4xl font-display font-bold">15+</div>
              <div className="text-xs uppercase tracking-widest opacity-60">{t('common.yearsExperience')}</div>
            </div>
            <div>
              <div className="text-4xl font-display font-bold">100%</div>
              <div className="text-xs uppercase tracking-widest opacity-60">{t('common.safetyRecord')}</div>
            </div>
            <div>
              <div className="text-4xl font-display font-bold">{t('common.local')}</div>
              <div className="text-xs uppercase tracking-widest opacity-60">{t('common.localExpertGuides')}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Destinations Section */}
      <section id="destinations" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">{t('common.latestPackages')}</h2>
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <p className="text-stone-500 text-lg md:text-xl whitespace-pre-line max-w-4xl">
              <Trans 
                i18nKey="common.packagesSubtitle"
                components={{
                  contactLink: <a href="#contact" className="text-orange-600 hover:underline font-bold" />
                }}
              />
            </p>
            
            <div className={`flex flex-row bg-stone-100 p-1 rounded-2xl shrink-0 ${isZH ? 'scale-110 origin-top-left md:origin-top-right' : 'scale-90 origin-top-left md:origin-top-right'}`}>
              {['all', 'surf', 'bike', 'climb'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 ${isZH ? 'px-3 py-1.5 rounded-xl text-sm' : 'px-8 py-3 rounded-2xl md:text-lg'} font-bold transition-all capitalize whitespace-nowrap ${activeTab === tab ? 'bg-white shadow-sm text-orange-600' : 'text-stone-400 hover:text-stone-600'}`}
                >
                  {t(`common.${tab}`)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredDestinations.map((dest) => (
              <motion.div
                layout
                key={dest.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-stone-100 ${isZH ? 'flex flex-col h-full' : ''}`}
              >
                <div className={`aspect-[4/5] overflow-hidden relative ${isZH ? 'shrink-0' : ''}`}>
                  <img 
                    src={dest.image} 
                    alt={dest.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2 text-xs font-bold">
                    {getActivityIcon(dest.id)}
                    {dest.activity}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <div className="flex items-center gap-2 text-xs font-medium opacity-80 mb-2">
                      <MapPin className="w-3 h-3" /> {dest.location}
                    </div>
                    <h3 className="text-2xl font-display font-bold leading-tight">{dest.title}</h3>
                  </div>
                </div>
                
                <div className={`p-8 ${isZH ? 'flex-1 flex flex-col' : ''}`}>
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2 text-stone-500 text-base">
                      <Calendar className="w-4 h-4" /> {dest.days} {t('common.days')}
                    </div>
                    <div className="text-3xl font-display font-bold text-orange-600">
                      ${dest.price}<span className="text-sm text-stone-400 font-sans font-normal ml-1">{t('common.perPerson')}</span>
                    </div>
                  </div>
                  
                  <p className="text-stone-600 text-base leading-relaxed mb-8 whitespace-pre-line">
                    {dest.shortDescription}
                  </p>

                  <div className={`space-y-3 mb-8 ${isZH ? 'mt-auto' : ''}`}>
                    {dest.highlights.slice(0, 3).map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm font-medium text-stone-500">
                        <CheckCircle2 className="w-4 h-4 text-green-500" /> {h}
                      </div>
                    ))}
                  </div>

                  <Link to={`/destination/${dest.id}`} className={`w-full ${isZH ? 'py-5 text-lg' : 'py-4'} rounded-2xl bg-stone-50 text-stone-900 font-bold flex items-center justify-center gap-2 hover:bg-stone-900 hover:text-white transition-all group/btn`}>
                    {dest.buttonText} <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-stone-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10 rounded-3xl overflow-hidden aspect-square"
            >
              <img 
                src={t('images.guide')} 
                alt="Our Guide" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-orange-600 rounded-3xl -z-0 hidden md:block" />
            <div className="absolute -top-10 -left-10 w-32 h-32 border-4 border-white/20 rounded-full -z-0" />
          </div>

          <div>
            <span className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-6 block">{t('common.ourPhilosophy')}</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
              <Trans 
                i18nKey="common.guideTitle"
                components={{
                  br: <br />
                }}
              />
            </h2>
            <p className="text-stone-400 text-lg md:text-xl leading-relaxed mb-8 whitespace-pre-line">
              {t('common.guideSubtitle')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {(t('common.philosophyItems', { returnObjects: true }) as string[]).map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-600/20 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" />
                  </div>
                  <span className="font-medium text-stone-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="glass-card rounded-[40px] p-8 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">{t('common.readyToStart')}</h2>
            <p className="text-stone-500 text-lg md:text-xl mb-12 whitespace-pre-line">
              <Trans 
                i18nKey="common.contactSubtitle"
                components={{
                  strong: <strong className="text-stone-900 font-bold" />
                }}
              />
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-stone-400 font-bold">{t('common.emailUs')}</div>
                  <div className="text-xl font-bold">{appData.company.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-stone-400 font-bold">{t('common.callUs')}</div>
                  <div className="text-xl font-bold">{t('company.phone')}</div>
                </div>
              </div>
            </div>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {isZH ? (
                <>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-400">{t('common.lastName')}</label>
                    <input type="text" className="w-full bg-stone-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-orange-500 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-400">{t('common.firstName')}</label>
                    <input type="text" className="w-full bg-stone-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-orange-500 transition-all" />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-400">{t('common.firstName')}</label>
                    <input type="text" placeholder="John" className="w-full bg-stone-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-orange-500 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-400">{t('common.lastName')}</label>
                    <input type="text" placeholder="Doe" className="w-full bg-stone-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-orange-500 transition-all" />
                  </div>
                </>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-stone-400">{t('common.emailAddress')}</label>
              <input type="email" placeholder={isZH ? undefined : "john@example.com"} className="w-full bg-stone-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-orange-500 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-stone-400">{t('common.selectAdventure')}</label>
              <select className="w-full bg-stone-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-orange-500 transition-all appearance-none">
                {translatedDestinations.map(d => (
                  <option key={d.id}>{d.activity} - {d.title}</option>
                ))}
                <option>{isZH ? '定制探险行程' : 'Custom Adventure'}</option>
              </select>
            </div>
            <button className={`w-full bg-orange-600 text-white ${isZH ? 'py-5 text-lg' : 'py-4'} rounded-2xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20`}>
              {t('common.sendInquiry')}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
