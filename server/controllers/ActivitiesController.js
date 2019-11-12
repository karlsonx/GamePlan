const Event = require('../models/EventModel');

const ActivitiesController = {};

ActivitiesController.addItem = (req, res, next) => {
  console.log('in ActivitiesController.addItem');
  const { item, event_id } = req.body;
  console.log(req.body);

  item['activityLikes'] = 0;
  item['activityClaimed'] = false;
  item['activityClaimedBy'] = '';
  console.log(item)

  Event.findOneAndUpdate(
    { _id: event_id },
    { $push: { activity: item } },
      { new: true },
      (err, data) => {
      console.log('MY DATA ---> ', data);
      if (err) {
        res.locals.error = err;
        res.locals.success = false;
        return next();
      }
      console.log('ITS NOT IN ERROR ');
      res.locals.activity = data;
      res.locals.success = true;
      return next();
    }
  );
};

ActivitiesController.getItems = (req, res, next) => {
  const { event_id } = req.body;
  Event.findOne({ _id: event_id }, (err, data) => {
    if (err) {
      res.locals.error = err;
      res.locals.success = false;
      return next();
    }
    console.log('MY DATA ---> ', data.activity);
    res.locals.activity = data.activity;
    res.locals.success = true;
    return next();
  });
};

ActivitiesController.deleteItem = (req, res, next) => {
  const { event_id, item } = req.body;
  Event.findOneAndUpdate(
    { _id: event_id },
    { $pull: { activity: item } },
      { new: true },
      (err, data) => {
      console.log('MY DATA ---> ', data);
      if (err) {
        res.locals.error = err;
        res.locals.success = false;
        return next();
      }
      console.log('ITS NOT IN ERROR ');
      res.locals.activity = data;
      res.locals.success = true;
      return next();
    }
  );
};

ActivitiesController.updateItem = (req, res, next) => {
    console.log('in ActivitiesController.updateItem');
    const {event_id, item} = req.body;

    console.log(item);

    const tempItem = {};
    tempItem['activityName'] = item.activityName;
    tempItem['activityClaimedBy'] = '';
    tempItem['activityClaimed'] = false;

    console.log('tempItem ------->', tempItem);
    Event.findOneAndUpdate(
        {_id: event_id},
        {$pull: {activity: tempItem}},
        {new: true},
        (err, data) => {
            if (err) {
                res.locals.error = err;
                res.locals.success = false;
                return next();
            }
            Event.findOneAndUpdate(
                {_id: event_id},
                {$push: {activity: item}},
                {new: true},
                (err, data) => {
                    if (err) {
                        res.locals.error = err;
                        res.locals.success = false;
                        return next();
                    }
                    res.locals.items = data.activity;
                    res.locals.success = true;
                    return next();
                }
            );
        }
    );
    console.log('item ------->', item);
}

// ----UPDATE-ITEMS----------------------------------------

// ActivitiesController.updateItem = (req, res, next) => {
//   const curAssignee = req.params.name;
//   const newAssignee = req.params.claimedBy;
//   Event.findOneAndUpdate(
//     { itemClaimedBy: curAssignee },
//     { itemClaimedBy: newAssignee },
//     (err, data) => {
//       if (data) {
//         res.itemClaimedBy = req.body;
//         res.status(200).send(data);
//       } else {
//         res.status(418);
//       }
//     }
//   );
// };

module.exports = ActivitiesController;
