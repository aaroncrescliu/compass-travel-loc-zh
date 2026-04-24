import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useTranslation, Trans } from 'react-i18next';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Waves, 
  Mountain, 
  Aperture, 
  Compass,
  CheckCircle2,
  Hotel,
  Utensils,
  ShieldCheck
} from 'lucide-react';
import appDataRaw from '../data/destination_settings.json';
import { RawAppData, Destination } from '../types';

const appData = appDataRaw as RawAppData;

export default function DestinationDetail() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const isZH = i18n.language === 'xy';
  
  const rawDestination = appData.destinations.find(d => d.id === id);

  if (!rawDestination) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-display font-bold mb-4">{t('common.destinationNotFound')}</h1>
        <Link to="/" className="text-orange-600 font-bold flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" /> {t('common.backToHome')}
        </Link>
      </div>
    );
  }

  // Merge raw data with translations
  const destination: Destination = {
    ...rawDestination,
    title: t(`destinations.${rawDestination.id}.title`).replaceAll('<br/>', ''),
    activity: t(`destinations.${rawDestination.id}.activity`),
    location: t(`destinations.${rawDestination.id}.location`),
    shortDescription: t(`destinations.${rawDestination.id}.shortDescription`), // Added missing shortDescription
    fullDescription: t(`destinations.${rawDestination.id}.fullDescription`),
    buttonText: t(`destinations.${rawDestination.id}.buttonText`),
    lodging: t(`destinations.${rawDestination.id}.lodging`),
    foodDetails: t('common.gourmetDiningDetails'),
    guideDetails: t('common.expertLocalGuidanceDetails'),
    highlights: t(`destinations.${rawDestination.id}.highlights`, { returnObjects: true }) as string[]
  };

  const getActivityIcon = (id: string) => {
    if (id === 'surf') return <Waves className="w-6 h-6" />;
    if (id === 'bike') return <Aperture className="w-6 h-6" />;
    if (id === 'climb') return <Mountain className="w-6 h-6" />;
    return <Compass className="w-6 h-6" />;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-24 pb-32"
    >
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-orange-600 font-bold transition-colors mb-12 group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> {t('common.backToDestinations')}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 text-orange-600 font-bold uppercase tracking-widest text-sm mb-4">
              {getActivityIcon(destination.id)}
              {destination.activity}
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight">
              <Trans 
                i18nKey={`destinations.${id}.title`}
                components={{ br: <br /> }}
              />
            </h1>
            
            <div className="flex flex-wrap gap-8 mb-12">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center text-stone-600">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">{t('common.location')}</div>
                  <div className="font-bold">{destination.location}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center text-stone-600">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">{t('common.duration')}</div>
                  <div className="font-bold">{destination.days} {t('common.days')}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                  <span className="font-bold text-lg">$</span>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">{t('common.price')}</div>
                  <div className="font-bold">${destination.price}</div>
                </div>
              </div>
            </div>

            <div className="prose prose-stone max-w-none">
              <p className="text-xl text-stone-600 leading-relaxed mb-12 whitespace-pre-line">
                <Trans 
                  i18nKey={`destinations.${id}.fullDescription`}
                  components={{ 
                    wedgeLink: <a href={t(`destinations.${id}.wedgeUrl`)} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline" />,
                    hotelLink: <a href={t(`destinations.${id}.hotelUrl`)} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline" />,
                    silverRushLink: <a href={t(`destinations.${id}.silverRushUrl`)} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline" />,
                    cyclesOfLifeLink: <a href={t(`destinations.${id}.cyclesOfLifeUrl`)} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline" />
                  }}
                />
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className={`bg-white p-8 rounded-3xl border border-stone-100 shadow-sm ${isZH ? 'flex flex-col' : ''}`}>
                <Hotel className="w-8 h-8 text-orange-600 mb-4" />
                <h3 className="text-xl font-display font-bold mb-4">{t('common.lodging')}</h3>
                <p className="text-stone-500 text-base leading-relaxed whitespace-pre-line">
                  <Trans 
                    i18nKey="common.lodgingDetails" 
                    components={{ italic: <i /> }}
                  />
                </p>
                <img 
                  src="/images/jacuzzi-logo.png" 
                  alt="Jacuzzi Logo" 
                  className={`${isZH ? 'mt-auto translate-y-4' : 'mt-6'} w-full rounded-2xl block min-h-[200px] bg-stone-100 object-contain`}
                />
              </div>
              <div className={`bg-white p-8 rounded-3xl border border-stone-100 shadow-sm ${isZH ? 'flex flex-col' : ''}`}>
                <Utensils className="w-8 h-8 text-orange-600 mb-4" />
                <h3 className="text-xl font-display font-bold mb-4">{t('common.gourmetDining')}</h3>
                <p className="text-stone-500 text-base leading-relaxed whitespace-pre-line">
                  {destination.foodDetails}
                </p>
                <img 
                  src={t('images.clifBar')} 
                  alt="Clif Bar Logo" 
                  className={`${isZH ? 'mt-auto translate-y-4' : 'mt-6'} w-full rounded-2xl block min-h-[200px] bg-stone-100 object-contain`}
                />
              </div>
            </div>

            <div className="bg-stone-900 text-white p-8 md:p-12 rounded-[40px] mb-12">
              <div className="flex items-center gap-4 mb-6">
                <ShieldCheck className="w-10 h-10 text-orange-500" />
                <h3 className="text-2xl font-display font-bold">{t('common.expertLocalGuidance')}</h3>
              </div>
              <p className="text-stone-400 leading-relaxed mb-8 whitespace-pre-line">
                {destination.guideDetails}
              </p>
            </div>
          </motion.div>

          {/* Right: Media */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="sticky top-32 h-fit"
          >
            <div className="rounded-[40px] overflow-hidden shadow-2xl mb-8 aspect-[4/5]">
              <img 
                src={destination.image} 
                alt={destination.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="bg-orange-600 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-display font-bold mb-4">{t('common.readyToBook')}</h3>
              <p className="text-orange-100 mb-8">{t('common.secureYourSpot', { days: destination.days })}</p>
              <button className="w-full bg-white text-orange-600 py-4 rounded-2xl font-bold text-lg hover:bg-stone-900 hover:text-white transition-all">
                {t('common.bookThisTrip')}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
