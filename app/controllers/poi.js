'use strict';

const Poi = require('../models/poi')
const User = require('../models/user')


const Pois = {
  home: {
    handler: function(request, h) {
      return h.view('home', { title: 'Enter a Point of Interest' });
    }
  },
  report: {
    handler: async function(request, h) {
      const pois = await Poi.find().populate('user');
      //var decodedImage = new Buffer(pois.image64, 'base64');
      //console.log(pois.image64)
      return h.view('report', {
        title: 'Point Of Interests',
        pois: pois
      });
    }
  },
  addpoi: {
    handler: async function(request, h) {
      try{
        const id = request.auth.credentials.id;
        const user = await User.findById(id)
        const data = request.payload;
        const newPoi = new Poi({
          poi: data.poi,
          name: data.name,
          rating: data.rating,
          description: data.description,
          long: data.long,
          lat: data.lat,
          image64: data.filename,
          user: user._id
          });
        
        await newPoi.save();
        return h.redirect('/report');
    }catch(err){
        return h.view('main', {errors: [{ message:err.message}]});

    }
    }
  }
};

module.exports = Pois;