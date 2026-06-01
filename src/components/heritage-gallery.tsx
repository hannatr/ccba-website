import { SectionHeading } from '@/components/section-heading'
import { heritageGallery } from '@/content/images'

export function HeritageGallery() {
  return (
    <section className="space-y-4" aria-labelledby="heritage-heading">
      <SectionHeading id="heritage-heading">Local Heritage</SectionHeading>
      <p className="text-muted-foreground max-w-prose text-sm leading-relaxed">
        The bar association serves lawyers practicing in Cayuga County and Auburn - a community with a long tradition and nationally
        significant history.
      </p>
      <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {heritageGallery.map((item) => (
          <li key={item.src}>
            <figure className="overflow-hidden rounded-lg border bg-card shadow-sm">
              <img src={item.src} alt={item.alt} className="aspect-[4/3] w-full object-cover" loading="lazy" width={640} height={480} />
              <figcaption className="text-muted-foreground border-t px-3 py-2 text-xs leading-snug">{item.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}
