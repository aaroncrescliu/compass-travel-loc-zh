import { Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-stone-50 border-t border-stone-200 py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-stone-900 p-2 rounded-lg">
            <Compass className="text-white w-6 h-6" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">
            {t('company.name').toUpperCase()}
          </span>
        </Link>

        <div className="flex gap-8 text-sm font-medium text-stone-500">
          <Link to="/#destinations" className="hover:text-orange-600 transition-colors">{t('nav.destinations')}</Link>
          <Link to="/#about" className="hover:text-orange-600 transition-colors">{t('nav.about')}</Link>
          <Link to="/#contact" className="hover:text-orange-600 transition-colors">{t('nav.contact')}</Link>
        </div>

        <div className="text-stone-400 text-sm">
          © {new Date().getFullYear()} {t('company.name')}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
