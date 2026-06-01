/** Public image paths and alt text for heroes, gallery, and in-page figures. */

export type SiteImage = {
  src: `/${string}`
  alt: string
  /** Pin wide photos to the roofline when used as heroes. */
  objectPosition?: 'top' | 'center'
}

export type HeritageImage = SiteImage & {
  caption: string
}

export const defaultHero: SiteImage = {
  src: '/images/hero/courthouse.jpg',
  alt: 'Upper facade of the Cayuga County Courthouse, Auburn, New York',
}

const buildingHero: SiteImage = {
  src: '/images/hero/building.jpg',
  alt: 'Upper stories and tower of the United States Post Office and Courthouse on Genesee Street, Auburn, New York',
  objectPosition: 'top',
}

/** Per-route banner overrides. */
export const heroByPath: Record<string, SiteImage> = {
  '/committees': buildingHero,
  '/join-renew': buildingHero,
  '/lost-wills': buildingHero,
}

export function heroForPath(pathname: string): SiteImage {
  return heroByPath[pathname] ?? defaultHero
}

export const heritageGallery: Array<HeritageImage> = [
  {
    src: '/images/courthouse.jpg',
    alt: 'Vintage postcard of the Cayuga County Courthouse with columned portico, Auburn, New York',
    caption: 'Cayuga County Courthouse — early view',
  },
  {
    src: '/images/courthouse2.jpg',
    alt: 'Vintage hand-colored postcard of the Cayuga County Courthouse with a green dome, Auburn, New York',
    caption: 'Courthouse with dome — historic postcard',
  },
  {
    src: '/images/courthouse3.jpg',
    alt: 'Mid-century postcard of the Cayuga County Courthouse covered in ivy, Auburn, New York',
    caption: 'Courthouse on Genesee Street — circa 1950s',
  },
]

export const tubmanMemorial: SiteImage = {
  src: '/images/tubman.jpg',
  alt: 'Memorial plaque for Harriet Tubman erected by the citizens of Auburn in 1914',
}

export const serenoPayne: SiteImage = {
  src: '/images/sereno-payne.png',
  alt: 'Black and white historical portrait of Sereno Elisha Payne, a founder of the Cayuga County Bar Association, wearing a formal suit and bow tie',
}

export const serenoPayneBio =
  "Sereno Elisha Payne was one of the founders of the Cayuga County Bar Association. He practiced law in Auburn and served as one of New York's congressmen from 1883 to 1887 and then again from 1889 to his death in 1914. He was the first ever chairman of the House Ways and Means Committee. He, along with other Cayuga County lawyers, signed our Certificate of Incorporation in 1903."
