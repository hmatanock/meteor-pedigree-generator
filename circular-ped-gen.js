//GLOBAL
Dogs = new Meteor.Collection("Dogs");
Peds = new Meteor.Collection("Peds");


if (Meteor.isClient) {

  Template.pedigree.currentPedigree = function(){
    return Peds.find({_id: Session.get('currentPedigree')});
  };

  Template.pedigree.getDog = function(dogName) {

  };

  Template.pedigree.userId = function() {
    return Meteor.userId();
  };

  Template.pedigree.events({
    "click #start" : function(evt, templ){
        var startingDog = templ.find("#startingDog").value;
        var curPed = Peds.insert({'startingDog':startingDog});
        Session.set("currentPedigree", curPed._id);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
