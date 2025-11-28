import { Link } from 'react-router-dom';
import { ConnectKitButton } from 'connectkit';
import { ThemeToggle } from './ThemeToggle';
import { useTranslation } from 'react-i18next';
import { Package, Settings } from 'lucide-react';

export function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-semibold text-xl">
            <Package className="h-6 w-6" />
            <span>Lost & Found</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/lost"
              className="text-foreground hover:text-primary transition-colors"
            >
              {t('nav.reportLost')}
            </Link>
            <Link
              to="/found"
              className="text-foreground hover:text-primary transition-colors"
            >
              {t('nav.reportFound')}
            </Link>
            <Link
              to="/matching"
              className="text-foreground hover:text-primary transition-colors"
            >
              {t('nav.matches')}
            </Link>
            <Link
              to="/dashboard"
              className="text-foreground hover:text-primary transition-colors"
            >
              {t('nav.dashboard')}
            </Link>
            <Link
              to="/settings"
              className="text-foreground hover:text-primary transition-colors"
            >
              <Settings className="h-5 w-5" />
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <ConnectKitButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
