
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';

export async function Header() {
  const t = await getTranslations('header');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-secondary backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-primary shrink-0" />
          <span className="text-2xl font-bold text-primary">
            Sa7a Box
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <Button
            size="default"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link href="#order-form">
              {t('order')}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}