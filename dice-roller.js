// TODO
// - Sum
// - Design

var Dices = new Meteor.Collection('dices');
var DiceFactory = {
  create: function(faces,values){
    return {
      faces: faces,
      values: values
    }
  }
};

if (Meteor.isClient) {
  var allDices = Dices.find({});

  Template.table.helpers({
    allDices: allDices
  });

  Template.table.events({
    'click .roll-butt': function(e,t){
      allDices.forEach(function(dice){
        var diceID = dice._id;
        var newValues = [];
        for (var j in dice.values) {
          newValues.push(Math.floor(Math.random()*dice.faces)+1);
        }
        Dices.update({_id:diceID}, {$set:{'values':newValues}});
      });
    }
  })

  Template.diceType.events({
    'click .more': function(e,t){
      Dices.update({_id:t.data._id},{$push: {values: t.data.faces}});
    },
    'click .less': function(e,t){
      Dices.update({_id:t.data._id},{$pop: {values: 1}});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Dices.remove({});

    Dices.insert(DiceFactory.create(4,[]));
    Dices.insert(DiceFactory.create(6,[]));
    Dices.insert(DiceFactory.create(8,[]));
    Dices.insert(DiceFactory.create(10,[]));
    Dices.insert(DiceFactory.create(12,[]));
    Dices.insert(DiceFactory.create(20,[]));
  });
}