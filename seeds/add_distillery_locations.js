
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('distillery_locations').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('distillery_locations').insert({
            id: 1, state: 'Alabama',
            abbr: 'AL',
            slug: 'alabama',
            lat: 33.47942,
            lng: -86.819458,
            country_code: 'US'
          }),
        knex('distillery_locations').insert({
            id: 2,
            state: 'Alaska',
            abbr: 'AK',
            slug: 'alaska',
            lat: 65.338774,
            lng: -151.567383,
            country_code: 'US'
          }),
        knex('distillery_locations').insert({
            id: 3,
            state: 'Arizona',
            abbr: 'AZ',
            slug: 'arizona',
            lat: 34.093326,
            lng: -111.676025,
            country_code: 'US'
          }),
        knex('distillery_locations').insert({
            id: 4,
            state: 'Arkansas',
            abbr: 'AR',
            slug: 'arkansas',
            lat: 34.677829,
            lng: -92.39502,
            country_code: 'US'
          }),
        knex('distillery_locations').insert({
            id: 5,
            state: 'California',
            abbr: 'CA',
            slug: 'california',
            lat: 36.67668,
            lng: -120.168457,
            country_code: 'US'
          }),
        knex('distillery_locations').insert({
            id: 6,
            state: 'Colorado',
            abbr: 'CO',
            slug: 'colorado',
            lat: 39.582275,
            lng: -106.303711,
            country_code: 'US'
          }),
        knex('distillery_locations').insert({
            id: 7,
            state: 'Connecticut',
            abbr: 'CT',
            slug: 'connecticut',
            lat: 41.4175,
            lng: -72.751465,
            country_code: 'US'
          }),
        knex('distillery_locations').insert({
            id: 8,
            state: 'Delaware',
            abbr: 'DE',
            slug: 'delaware',
            lat: 38.826603,
            lng: -75.39917,
            country_code: 'US'
          }),
        knex('distillery_locations').insert({
            id: 9,
            state: 'Florida',
            abbr: 'FL',
            slug: 'florida',
            lat: 28.622501,
            lng: -81.716309,
            country_code: 'US'
          }),
        knex('distillery_locations').insert({
            id: 10,
            state: 'Georgia',
            abbr: 'GA',
            slug: 'georgia',
            lat: 33.74879,
            lng: -84.387832,
            country_code: 'US'
          }),
        knex('distillery_locations').insert({
            id: 11,
            state: 'Hawaii',
            abbr: 'HI',
            slug: 'hawaii',
            lat: 19.769127,
            lng: -155.418091,
            country_code: 'US'
          }),
        knex('distillery_locations').insert({
            id: 12,
            state: 'Idaho',
            abbr: 'ID',
            slug: 'idaho',
            lat: 43.741212,
            lng: -115.488281,
            country_code: 'US'
          }),
        knex('distillery_locations').insert({
            id: 13,
            state: 'Illinois',
            abbr: 'IL',
            slug: 'illinois',
            lat: 41.877981,
            lng: -87.629571,
            country_code: 'US'
          }),
        knex('distillery_locations').insert({
            id: 14,
            state: 'Indiana',
            abbr: 'IN',
            slug: 'indiana',
            lat: 39.883923,
            lng: -86.19873,
            country_code: 'US'
          }),
        knex('distillery_locations').insert({
            id: 15,
            state: 'Iowa',
            abbr: 'IA',
            slug: 'iowa',
            lat: 41.844501,
            lng: -93.669434,
            country_code: 'US'
          }),
        knex('distillery_locations').insert({
            id: 16,
            state: 'Kansas',
            abbr: 'KS',
            slug: 'kansas',
            lat: 38.981701,
            lng: -94.670691,
            country_code: 'US'
          }),
        knex('distillery_locations').insert({
            id: 17,
            state: 'Kentucky',
            abbr: 'KY',
            slug: 'kentucky',
            lat: 38.249568,
            lng: -85.757561,
            country_code: 'US'
          }),
        knex('distillery_locations').insert({
            id: 18,
            state: 'Louisiana',
            abbr: 'LA',
            slug: 'louisiana',
            lat: 29.946378,
            lng: -90.073471,
            country_code: 'US'
          }),
        knex('distillery_locations').insert({
            id: 19,
            state: 'Maine',
            abbr: 'ME',
            slug: 'maine',
            lat: 43.913433,
            lng: -69.967632,
            country_code: 'US'}),
        knex('distillery_locations').insert({
            id: 20,
            state: 'Maryland',
            abbr: 'MD',
            slug: 'maryland',
            lat: 39.082906,
            lng: -76.607666,
            country_code: 'US'}),
        knex('distillery_locations').insert({
            id: 21,
            state: 'Massachusetts',
            abbr: 'MA',
            slug: 'massachusetts',
            lat: 42.232331,
            lng: -72.081299,
            country_code: 'US'}),
        knex('distillery_locations').insert({
            id: 22,
            state: 'Michigan',
            abbr: 'MI',
            slug: 'michigan',
            lat: 42.944109,
            lng: -84.869385,
            country_code: 'US'}),
        knex('distillery_locations').insert({
            id: 23,
            state: 'Minnesota',
            abbr: 'MN',
            slug: 'minnesota',
            lat: 45.621241,
            lng: -94.592285,
            country_code: 'US'}),
        knex('distillery_locations').insert({
            id: 24,
            state: 'Mississippi',
            abbr: 'MS',
            slug: 'mississippi',
            lat: 40.721762,
            lng: -77.497559,
            country_code: 'US'}),
        knex('distillery_locations').insert({
            id: 25,
            state: 'Missouri',
            abbr: 'MO',
            slug: 'missouri',
            lat: 38.453051,
            lng: -92.702637,
            country_code: 'US'}),
        knex('distillery_locations').insert({
            id: 26,
              state: 'Montana',
              abbr: 'MT',
              slug: 'montana',
              lat: 47.69025,
              lng: -114.162197,
              country_code: 'US'}),
        knex('distillery_locations').insert({
            id: 27,
            state: 'Nebraska',
            abbr: 'NE',
            slug: 'nebraska',
            lat: 41.252165,
            lng: -95.997806,
            country_code: 'US'}),
        knex('distillery_locations').insert({
            id: 28,
            state: 'Nevada',
            abbr: 'NV',
            slug: 'nevada',
            lat: 36.169897,
            lng: -115.139594,
            country_code: 'US'}),
        knex('distillery_locations').insert({
            id: 29,
            state: 'New Hampshire',
            abbr: 'NH',
            slug: 'new-hampshire',
            lat: 43.121993,
            lng: -71.01202,
            country_code: 'US'}),
        knex('distillery_locations').insert({
            id: 30,
            state: 'New Jersey',
            abbr: 'NJ',
            slug: 'new-jersey',
            lat: 39.677334,
            lng: -74.498291,
            country_code: 'US'}),
        knex('distillery_locations').insert({
            id: 31,
            state: 'New Mexico',
            abbr: 'NM',
            slug: 'new-mexico',
            lat: 35.686899,
            lng: -105.937815,
            country_code: 'US'}),
        knex('distillery_locations').insert({
            id: 32,
            state: 'New York',
            abbr: 'NY',
            slug: 'new-york',
            lat: 40.712415,
            lng: -74.005601,
            country_code: 'US'}),
        knex('distillery_locations').insert({
            id: 33,
            state: 'North Carolina',
            abbr: 'NC',
            slug: 'north-carolina',
            lat: 35.43326,
            lng: -79.211426,
            country_code: 'US'}),
        knex('distillery_locations').insert({
            id: 34,
            state: 'North Dakota',
            abbr: 'ND',
            slug: 'north-dakota',
            lat: 46.808082,
            lng: -100.783617,
            country_code: 'US'}),
        knex('distillery_locations').insert({
            id: 35,
            state: 'Ohio',
            abbr: 'OH',
            slug: 'ohio',
            lat: 40.052322,
            lng: -82.595215,
            country_code: 'US'}),
        knex('distillery_locations').insert({
            id: 36,
            state: 'Oklahoma',
            abbr: 'OK',
            slug: 'oklahoma',
            lat: 35.182227,
            lng: -97.404785,
            country_code: 'US'}),
        knex('distillery_locations').insert({
            id: 37,
            state: 'Oregon',
            abbr: 'OR',
            slug: 'oregon',
            lat: 45.523116,
            lng: -122.677782,
            country_code: 'US'}),
        knex('distillery_locations').insert({
            id: 38,
            state: 'Pennsylvania',
            abbr: 'PA',
            slug: 'pennsylvania',
            lat: 40.721762,
            lng: -77.497559,
            country_code: 'US'}),
        knex('distillery_locations').insert({
            id: 39,
            state: 'Rhode Island',
            abbr: 'RI',
            slug: 'rhode-island',
            lat: 41.633792,
            lng: -71.141968,
            country_code: 'US'}),
        knex('distillery_locations').insert({
            id: 40,
            state: 'South Carolina',
            abbr: 'SC',
            slug: 'south-carolina',
            lat: 33.805967,
            lng: -80.705566,
            country_code: 'US'}),
        knex('distillery_locations').insert({
            id: 41,
            state: 'South Dakota',
            abbr: 'SD',
            slug: 'south-dakota',
            lat: 44.284045,
            lng: -100.305176,
            country_code: 'US'}),
        knex('distillery_locations').insert({
            id: 42,
            state: 'Tennessee',
            abbr: 'TN',
            slug: 'tennessee',
            lat: 35.469059,
            lng: -86.11084,
            country_code: 'US'}),
        knex('distillery_locations').insert({
            id: 43,
            state: 'Texas',
            abbr: 'TX',
            slug: 'texas',
            lat: 31.399949,
            lng: -99.338379,
            country_code: 'US'}),
        knex('distillery_locations').insert({
            id: 44,
            state: 'Utah',
            abbr: 'UT',
            slug: 'utah',
            lat: 40.76059,
            lng: -111.891117,
            country_code: 'US'}),
        knex('distillery_locations').insert({
            id: 45,
            state: 'Vermont',
            abbr: 'VT',
            slug: 'vermont',
            lat: 43.860153,
            lng: -72.680054,
            country_code: 'US'}),
        knex('distillery_locations').insert({
            id: 46,
            state: 'Virginia',
            abbr: 'VA',
            slug: 'virginia',
            lat: 38.472074,
            lng: -77.99572,
            country_code: 'US'}),
        knex('distillery_locations').insert({
            id: 47,
            state: 'Washington',
            abbr: 'WA',
            slug: 'washington',
            lat: 47.605776,
            lng: -122.332098,
            country_code: 'US'}),
        knex('distillery_locations').insert({
            id: 48,
            state: 'West Virginia',
            abbr: 'WV',
            slug: 'west-virginia',
            lat: 38.315262,
            lng: -80.749512,
            country_code: 'US'}),
        knex('distillery_locations').insert({
            id: 49,
            state: 'Wisconsin',
            abbr: 'WI',
            slug: 'wisconsin',
            lat: 43.038662,
            lng: -87.906246,
            country_code: 'US'}),
        knex('distillery_locations').insert({
            id: 50,
            state: 'Wyoming',
            abbr: 'WY',
            lat: 43.80434,
            lng: -108.181343,
            slug: 'wyoming',
            country_code: 'US'})
      ]);
    });
};
