
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('distilleries').del()
    .then(function () {
      return Promise.all([
        knex('distilleries').insert({
          id: 1,
          name: 'Leopold Bros',
          address: '4950 Nome St. Unit E',
          lat: 39.787223,
          lng: -104.851853,
          zip: 80239,
          email: 'sales@leopoldbros.com',
          picture: '',
          phone: '',
          website: 'www.leopoldbros.com',
          region: 'Denver',
          hood: 'dtwn',
          state: 'CO'
        }),
        knex('distilleries').insert({
          id: 2,
          name: 'Stranahan\'s Colorado Whiskey',
          address: '200 South Kalamath St',
          lat: 39.712539,
          lng: -104.99858,
          zip: 80223,
          email: '',
          picture: '',
          phone: '303-296-7440',
          website: 'www.stranahans.com',
          region: 'Denver',
          hood: 'dtwn',
          state: 'CO'
        }),
        knex('distilleries').insert({
          id: 3,
          name: 'Colorado Pure Distilling',
          address: '5609 West 6th Ave. Unit C Lakewood, CO ',
          lat: 39.726238,
          lng: -105.058769,
          zip: 80214,
          email: '',
          picture: '',
          phone: '',
          website: 'www.coloradopuredistilling.com',
          region: 'Denver',
          hood: 'dtwn',
          state: 'CO'
        })
      ]);
    });
};
