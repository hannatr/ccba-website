-- Idempotent seed for lost_will_custodians (run after pnpm db:push)
DELETE FROM lost_will_custodians;

INSERT INTO lost_will_custodians (firm_name, phone, holding_for, sort_key) VALUES
  (
    'Law Office of Dennis P. Sedor',
    '(315) 255-1195',
    ARRAY['Dale Yates'],
    1
  ),
  (
    'Contiguglia Law Offices, LLP',
    '(315) 252-7515',
    ARRAY['Ann Bunker'],
    2
  ),
  (
    'Norman J. Chirco Law',
    '(315) 252-1563',
    ARRAY['Earle Thurston'],
    3
  ),
  (
    'Johnston Ganetis, PLLC',
    '(315) 930-2525',
    ARRAY['Patrick Hennessy'],
    4
  ),
  (
    'Boyle & Anderson, P.C.',
    '(315) 253-0326',
    ARRAY[
      'Laurie Michelman',
      'Karpinski & Stapleton (John A. Karpinski & T. David Stapleton)',
      'George R. Iocolano',
      'Peter E. Corning',
      'Joseph R. Rooney',
      'Richard A. & Harry A. Gleason',
      'Paul Magill',
      'John Doyle',
      'Leon Goldman & Henry Goldman',
      'Thomas Stopyra',
      'William Mayer'
    ],
    5
  );
