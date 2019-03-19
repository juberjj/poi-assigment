'use strict';

const Poi = require('../models/poi')
const User = require('../models/user')
var Handlebars = require("handlebars");


const Pois = {
  home: {
    handler: function(request, h) {
      return h.view('home', { title: 'Enter a Point of Interest' });
    }
  },
  report: {
    handler: async function(request, h) {
      var pois = await Poi.find().populate('user');

      const cat = request.query.cat
      console.log("report route  " + cat)

      if(cat!==undefined){
        console.log("true")
         pois =  pois.filter(function(item){
         return item.poi=="Movies"
      });
      

      }
     
     console.log(pois.length)
     
      return h.view('report', {
        title: 'Point Of Interests',
        pois: pois
      
        //pois: encodeURIComponent(JSON.stringify(pois))
      });
    }
  },
  listcoffee: {
    handler: async function(request, h) {
      const poiss = await Poi.find().populate('user');
      const poiscat = await Poi.find().populate('');
      const item = request.param

      console.log('View coffee route')
      console.log(item)
      const pois =  poiss.filter(function(item){
         return item.poi=="coffee"
      });

      return h.view('report', {
        title: 'Point Of Interests coffee',
        pois: pois
      });
      
    }
  },
  updateview: {
    handler: async function(request, h) {

      console.log('updateview route')
      //const cat = request.payload.cat
      const cat = request.query.cat
      console.log(cat)


      const pois = await Poi.find().populate('user');

      //const poiscat = await Poi.find().populate('');*/
      //const item = request.query.cat

      
      const poisc =  pois.filter(function(item){
         return item.poi==cat
      });

     // console.log(h.response().request.raw)

      //return h.redirect('/report')
      
      return h.view('report', {
        title: 'Point Of Interests coffee',
        pois: poisc
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
  },

  showupdatepoi: {
    handler: async function(request, h) {
      try{
        const id = request.params;
        const poi = await Poi.findById(id);
        //console.log(poi.name)
      return h.view('poiedit', { title: 'Update Point of Interests', poi: poi, id:id});
      } catch (err){
      return h.view('report',{errors: [{ message: err.message }]})
      } 
    }
  },

  updatepoi: {
      handler: async function(request, h) {
        console.log('updatepoi')
      try {
        const id = request.params
      
        const poiEdit = request.payload;
      
        const updatedata = {

        'poi.name': poiEdit.name,
        'poi.rating': poiEdit.rating,
        'poi.description':poiEdit.description,
        'poi.long': poiEdit.long,
        'poi.lat': poiEdit.lat,
        'poi.image64': poiEdit.filename,
  
        }

        const poi = await Poi.findById(id._id);

        if(!poiEdit.filename){
          poiEdit.filename = poi.image64
        }
        poi.name = poiEdit.name;
        poi.rating = poiEdit.rating;
        poi.description = poiEdit.description;
        poi.long = poiEdit.long;
        poi.lat = poiEdit.lat;
        poi.image64 = poiEdit.filename;

        await poi.save();
        return h.redirect('/report');
      } catch (err) {
        return h.view('main', { errors: [{ message: err.message }] });
      }
    }
  },

  viewpoi: {
        handler: async function(request, h) {
          console.log('view poi route')
            try {
                const id = request.params._id;
                const poi = await Poi.findById(id);
                //Log the id to ensure the right poi is being called
                //console.log(request._route.public);
                return h.view('poiview', {
                    title: 'View Point of Interest',
                    poi: poi
               });
            }
            catch(err){
                return h.view('main', {errors: [{message: err.message }]});
            }
        }
    },

  delpoi: {

        handler: async function(request, h){
          console.log(request.params.id)
            await Poi.findOneAndDelete(request.params.id);
            return h.redirect('/report');
        }

    }
};

module.exports = Pois;