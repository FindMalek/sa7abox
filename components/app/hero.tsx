import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { DumbbellIcon, ClockIcon, TruckIcon } from 'lucide-react';

export async function Hero() {
  const t = await getTranslations('hero');

  return (
    <section className="w-full px-4 pt-12 pb-8 sm:px-6 sm:pt-16 lg:px-8 bg-secondary">
      <div className="container mx-auto max-w-xl">
        {/* Category Tag */}
        <div className="mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            {t('category')}
          </span>
        </div>

        {/* Headline */}
        <h1 className="mb-4 text-[42px] font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-6xl">
          {t('headlinePart1')}<br />
          <span className="text-primary">{t('headlinePart2')}</span>
        </h1>

        {/* Description */}
        <p className="mb-8 text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {t('description')}
        </p>

        {/* CTAs */}
        <div className="mb-10 grid grid-cols-2 gap-4">
          <Button
            size="lg"
            className="h-14 rounded-xl bg-primary text-lg font-bold text-primary-foreground hover:bg-primary/90"
          >
            <Link href="#order-form">
              {t('orderNow')}
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-14 rounded-xl border-2 border-foreground bg-transparent text-lg font-bold text-foreground hover:bg-foreground/5"
          >
            <Link href="#locations">
              {t('findUs')}
            </Link>
          </Button>
        </div>

        {/* Feature Chips */}
        <div className="mb-12 flex flex-wrap gap-3">
          {/* Gym Pickup */}
          <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 shadow-sm">
            <DumbbellIcon className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">
              {t('features.gymPickup')}
            </span>
          </div>

          {/* Fresh Daily */}
          <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 shadow-sm">
            <ClockIcon className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-black">
              {t('features.freshDaily')}
            </span>
          </div>

          {/* Delivery */}
          <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 shadow-sm">
            <TruckIcon className="h-4 w-4 text-[#e86b2c]" />
            <span className="text-sm font-semibold text-foreground">
              {t('features.delivery')}
            </span>
          </div>
        </div>

        {/* Main Image */}
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl shadow-xl">
          <Image
            src="/placeholder.png"
            alt="Sa7a Box Premium Meal"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}