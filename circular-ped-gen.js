//GLOBAL
Dogs = new Meteor.Collection("Dogs");
Peds = new Meteor.Collection("Peds");

var currentPedigree;

var getCurrentUserEmail = function(){
  return Meteor.user() &&
    Meteor.user().emails &&
    Meteor.user().emails[0].address;
};


if (Meteor.isClient) {
  Template.pedigree.editActive = function(){
    return Session.get("currentPedigree");
  };

  Template.pedigree.currentPedigree = function(){
    currentPedigree = Peds.find({_id: Session.get('currentPedigree')}).fetch();
    dog = Dogs.find({"dogName": currentPedigree[0].startingDog});
    return "Working on Pedigree for " + dog[0].dogName;
  };

  Template.pedigree.allPeds = function() {
    return Peds.find({'user':getCurrentUserEmail()}).fetch();

  };

  Template.pedigree.userId = function() {
    return Meteor.userId();
  };

  Template.pedigree.events({
    "click #start" : function(evt, templ){
        var prefixes = templ.find("#prefixTitles").value;
        var dogname = templ.find("#dogName").value;
        var suffixes = templ.find("#suffixTitles").value;
        console.log(prefixes);
        console.log(dogname);
        console.log(suffixes);
        var dogId = Dogs.insert({
          'prefixTitles':prefixes,
          'dogName':dogname,
          'suffixTitles':suffixes
        });
        var curPedId = Peds.insert({
          'startingDog':dogname,
          'user':getCurrentUserEmail(),
        });
        Session.set("currentPedigree", curPedId);
    },
    "click #new" : function(evt, templ){
        Session.set("currentPedigree", null);
        templ.find("#newPed").className="show";

    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
