export type ResourceLink = { label: string; href: string }

export const publicResourceSections: Array<{ heading: string; links: Array<ResourceLink> }> = [
  {
    heading: 'Courts & attorneys',
    links: [
      {
        label: 'Attorney-client relationship (NYS Courts)',
        href: 'https://www.nycourts.gov/attorneys/clientattorneyrel.shtml',
      },
      {
        label: 'Bankruptcy Court — U.S. Western District of NY',
        href: 'https://www.nywb.uscourts.gov/',
      },
      {
        label: 'Bar associations in New York State',
        href: 'https://www.nycourts.gov/attorneys/nybarassociations.shtml',
      },
      {
        label: 'Court interpreting services (NYS)',
        href: 'https://www.nycourts.gov/courtinterpreter/',
      },
      {
        label: 'NYS directory of registered attorneys',
        href: 'https://iapps.courts.state.ny.us/attorney/AttorneySearch',
      },
      {
        label: 'New York State Bar Association — Lawyer Referral Service',
        href: 'https://www.nysba.org/lawyerreferral/',
      },
    ],
  },
  {
    heading: 'Legal help & consumer',
    links: [
      {
        label: 'LawHelpNY — free legal information',
        href: 'https://www.lawhelpny.org/',
      },
      {
        label: 'Legal Assistance of Western New York',
        href: 'https://lawny.org/',
      },
      {
        label: 'Consumer protection (FTC)',
        href: 'https://www.ftc.gov/bcp/consumer.shtm',
      },
      {
        label: 'Annual credit report (official)',
        href: 'https://www.annualcreditreport.com/',
      },
      {
        label: 'Benefits check-up (National Council on Aging)',
        href: 'https://www.benefitscheckup.org/',
      },
    ],
  },
  {
    heading: 'Family, housing & records',
    links: [
      {
        label: 'Helping children cope with divorce or separation (NYS Courts)',
        href: 'https://www.nycourts.gov/ip/parent-ed/',
      },
      {
        label: 'NYS Office of Children & Family Services',
        href: 'https://ocfs.ny.gov/',
      },
      {
        label: 'NYS child support services',
        href: 'https://www.childsupport.ny.gov/dcse/home.html',
      },
      {
        label: 'HUD — avoiding foreclosure',
        href: 'https://www.hud.gov/topics/avoiding_foreclosure',
      },
      {
        label: 'HUD — rental assistance',
        href: 'https://www.hud.gov/topics/rental_assistance',
      },
      {
        label: 'NYS vital records',
        href: 'https://www.health.ny.gov/vital_records/',
      },
    ],
  },
  {
    heading: 'Government & safety',
    links: [
      {
        label: 'New York State DMV',
        href: 'https://dmv.ny.gov/',
      },
      {
        label: 'NYS Assembly — laws and your representatives',
        href: 'https://assembly.state.ny.us/',
      },
      {
        label: 'NYS Office for the Prevention of Domestic Violence',
        href: 'https://opdv.ny.gov/',
      },
      {
        label: 'NYS sex offender registry',
        href: 'https://www.criminaljustice.ny.gov/SomsSUBDirectory/search_index.jsp',
      },
      {
        label: 'U.S. Attorney — Western District of NY',
        href: 'https://www.justice.gov/usao/nyw',
      },
      {
        label: 'VINE victim notification',
        href: 'https://www.vinelink.com/',
      },
    ],
  },
]
