import { getTranslations } from 'next-intl/server';
import { MenuSection } from "./menu-section";
import { POWER_BOXES, GREEN_FRESH, PROTEIN_DESSERTS } from "@/lib/consts";

export async function Menu() {
  const t = await getTranslations('menu');
  
  return (
    <section id="menu" className="py-16 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-2">
            {t('title')}
          </h2>
          <p className="text-muted-foreground font-medium">
            {t('subtitle')}
          </p>
        </div>

        <MenuSection titleKey="menu.categories.powerBoxes" items={POWER_BOXES} />
        <MenuSection titleKey="menu.categories.greenFresh" items={GREEN_FRESH} />
        <MenuSection titleKey="menu.categories.proteinDesserts" items={PROTEIN_DESSERTS} />
      </div>
    </section>
  );
}