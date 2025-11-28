import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { AnimatedCard } from '@/components/AnimatedCard';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Search, Package, Shield, Zap } from 'lucide-react';

export default function Index() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          className="text-center max-w-3xl mx-auto space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t('hero.subtitle')}
          </p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link to="/lost">
              <Button size="lg" className="w-full sm:w-auto">
                {t('hero.reportLost')}
              </Button>
            </Link>
            <Link to="/found">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                {t('hero.reportFound')}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 border-t border-border">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t('features.howItWorks')}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatedCard delay={0.1}>
            <CardContent className="pt-6 text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">{t('features.reportItems')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('features.reportItemsDesc')}
              </p>
            </CardContent>
          </AnimatedCard>

          <AnimatedCard delay={0.2}>
            <CardContent className="pt-6 text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">{t('features.blockchainVerified')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('features.blockchainVerifiedDesc')}
              </p>
            </CardContent>
          </AnimatedCard>

          <AnimatedCard delay={0.3}>
            <CardContent className="pt-6 text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">{t('features.aiMatching')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('features.aiMatchingDesc')}
              </p>
            </CardContent>
          </AnimatedCard>

          <AnimatedCard delay={0.4}>
            <CardContent className="pt-6 text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">{t('features.easyRecovery')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('features.easyRecoveryDesc')}
              </p>
            </CardContent>
          </AnimatedCard>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 border-t border-border">
        <AnimatedCard delay={0.5} className="bg-primary text-primary-foreground">
          <CardContent className="py-12 text-center space-y-4">
            <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Connect your wallet and start reporting lost or found items. Help build a more honest and connected community.
            </p>
            <div className="pt-4">
              <Link to="/dashboard">
                <Button size="lg" variant="secondary">
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </AnimatedCard>
      </section>
    </div>
  );
}
