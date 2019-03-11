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
      const poi = await Poi.find().populate('donor');
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
        console.log(data)
        /*const newPoi = new Poi({
          amount: data.amount,
          method: data.method,
          donor: user._id
          });
        await newDonation.save();*/
        return h.redirect('/report');
    }catch(err){
        return h.view('main', {errors: [{ message:err.message}]});

    }
    }
  }
};

module.exports = Pois;