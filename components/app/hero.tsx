import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { DumbbellIcon, ClockIcon, TruckIcon } from 'lucide-react';

export async function Hero() {
  const t = await getTranslations('hero');

  return (
    <section className="relative w-full px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <div className="container mx-auto max-w-6xl">
        {/* Category Tag */}
        <div className="mb-4 sm:mb-6">
          <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary">
            {t('category')}
          </span>
        </div>

        {/* Headline */}
        <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block">{t('headlinePart1')}</span>
          <span className="block text-primary">{t('headlinePart2')}</span>
        </h1>

        {/* Description */}
        <p className="mb-8 max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl">
          {t('description')}
        </p>

        {/* CTAs */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:gap-4">
          <Button
            size="lg"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto sm:px-8"
          >
            <Link href="#order-form">
              {t('orderNow')}
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full border-2 border-foreground bg-background text-foreground hover:bg-muted sm:w-auto sm:px-8"
          >
            <Link href="#locations">
              {t('findUs')}
            </Link>
          </Button>
        </div>

        {/* Feature Chips */}
        <div className="flex flex-wrap gap-3 sm:gap-4">
          {/* Gym Pickup */}
          <div className="flex items-center gap-2 rounded-lg bg-background px-4 py-2.5 shadow-sm">
            <DumbbellIcon className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-foreground">
              {t('features.gymPickup')}
            </span>
          </div>

          {/* Fresh Daily */}
          <div className="flex items-center gap-2 rounded-lg bg-background px-4 py-2.5 shadow-sm">
            <ClockIcon className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-foreground">
              {t('features.freshDaily')}
            </span>
          </div>

          {/* Delivery */}
          <div className="flex items-center gap-2 rounded-lg bg-background px-4 py-2.5 shadow-sm">
            <TruckIcon className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-foreground">
              {t('features.delivery')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}