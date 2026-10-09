export const TYPE_COLORS = {
  normal:   '#A8A77A',
  fire:     '#EE8130',
  water:    '#6390F0',
  electric: '#F7D02C',
  grass:    '#7AC74C',
  ice:      '#96D9D6',
  fighting: '#C22E28',
  poison:   '#A33EA1',
  ground:   '#E2BF65',
  flying:   '#A98FF3',
  psychic:  '#F95587',
  bug:      '#A6B91A',
  rock:     '#B6A136',
  ghost:    '#735797',
  dragon:   '#6F35FC',
  dark:     '#705746',
  steel:    '#B7B7CE',
  fairy:    '#D685AD',
};

export const TYPE_EMOJIS = {
  normal:   'O',
  fire:     'F',
  water:    'W',
  electric: 'E',
  grass:    'G',
  ice:      'I',
  fighting: 'L',
  poison:   'P',
  ground:   'T',
  flying:   'Y',
  psychic:  'S',
  bug:      'B',
  rock:     'R',
  ghost:    'H',
  dragon:   'D',
  dark:     'K',
  steel:    'M',
  fairy:    'X',
};

export const STAT_LABELS = {
  hp:                'HP',
  attack:            'Ataque',
  defense:           'Defensa',
  'special-attack':  'At. Esp.',
  'special-defense': 'Def. Esp.',
  speed:             'Velocidad',
};

/** Metadata estatica de cada generacion (fuente: Pokemon oficial). */
export const GENERATION_DATA = {
  1: { region: 'Kanto',  roman: 'I',    years: '1996 - 1999', games: 'Rojo / Verde / Azul / Amarillo', mascot: 150 },
  2: { region: 'Johto',  roman: 'II',   years: '1999 - 2002', games: 'Oro / Plata / Cristal',           mascot: 249 },
  3: { region: 'Hoenn',  roman: 'III',  years: '2002 - 2006', games: 'Rubi / Zafiro / Esmeralda',       mascot: 384 },
  4: { region: 'Sinnoh', roman: 'IV',   years: '2006 - 2010', games: 'Diamante / Perla / Platino',      mascot: 493 },
  5: { region: 'Teselia',roman: 'V',    years: '2010 - 2013', games: 'Negro / Blanco',                  mascot: 646 },
  6: { region: 'Kalos',  roman: 'VI',   years: '2013 - 2016', games: 'X / Y',                           mascot: 717 },
  7: { region: 'Alola',  roman: 'VII',  years: '2016 - 2019', games: 'Sol / Luna',                      mascot: 791 },
  8: { region: 'Galar',  roman: 'VIII', years: '2019 - 2022', games: 'Espada / Escudo',                 mascot: 888 },
  9: { region: 'Paldea', roman: 'IX',   years: '2022 - hoy',  games: 'Escarlata / Purpura',             mascot: 1007 },
};
