import Ember from 'ember';

var selectorForMonthSelect = '.pika-select-month';
var selectorForYearSelect = '.pika-select-year';

var interactor = {
  selectedDay: function() {
    return Ember.$('.pika-single td.is-selected button').html();
  },
  selectedMonth: function() {
    return Ember.$(selectorForMonthSelect + ' option:selected').val();
  },
  selectedYear: function() {
    return Ember.$(selectorForYearSelect + ' option:selected').val();
  },
  minimumYear: function() {
    return Ember.$(selectorForYearSelect).children().first().val();
  },
  maximumYear: function() {
    return Ember.$(selectorForYearSelect).children().last().val();
  }
};

var triggerNativeEvent = function(element, eventName) {
  if (element.fireEvent) {
    element.fireEvent('on' + eventName);
  } else {
    var event = document.createEvent('Events');
    event.initEvent(eventName, true, false);
    element.dispatchEvent(event);
  }
};

var openDatepicker = function(app, element) {
  /*jshint unused: false */

  return Ember.Test.promise(function(resolve, reject) {
    Ember.Test.adapter.asyncStart();

    Ember.$(element).click();

    var startTimestamp = new Date().getTime();
    var interval = setInterval(function() {
      if (Ember.$('.pika-single table tbody').html() && Ember.$('.pika-single table tbody').html().length > 1) {
        clearInterval(interval);
        Ember.Test.adapter.asyncEnd();
        resolve();
      }

      if (new Date().getTime() > startTimestamp + 1000) {
        clearInterval(interval);
      }
    }, 20);
  });
};

var selectDate = function(app, date) {
  /*jshint unused: false */

  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();

  selectYear(app, year).selectMonth(month).selectDay(day);

  return app.testHelpers.wait();
};

var selectYear = function(app, year) {
  /*jshint unused: false */

  return Ember.Test.promise(function(resolve) {
    Ember.Test.adapter.asyncStart();

    Ember.$(selectorForYearSelect).val(year);
    triggerNativeEvent(Ember.$(selectorForYearSelect)[0], 'change');

    var startTimestamp = new Date().getTime();
    var interval = setInterval(function() {
      if (Ember.$('.pika-single table tbody').html().length > 1) {
        clearInterval(interval);
        Ember.Test.adapter.asyncEnd();
        resolve();
      }

      if (new Date().getTime() > startTimestamp + 1000) {
        clearInterval(interval);
      }
    }, 20);
  });
};

var selectMonth = function(app, month) {
  /*jshint unused: false */

  return Ember.Test.promise(function(resolve) {
    Ember.Test.adapter.asyncStart();

    Ember.$(selectorForMonthSelect).val(month);
    triggerNativeEvent(Ember.$(selectorForMonthSelect)[0], 'change');

    var startTimestamp = new Date().getTime();
    var interval = setInterval(function() {
      if (Ember.$('.pika-single table tbody').html().length > 1) {
        clearInterval(interval);
        Ember.Test.adapter.asyncEnd();
        resolve();
      }

      if (new Date().getTime() > startTimestamp + 1000) {
        clearInterval(interval);
      }
    }, 20);
  });
};

var selectDay = function(app, day) {
  /*jshint unused: false */

  return Ember.Test.promise(function(resolve) {
    triggerNativeEvent(Ember.$('td[data-day="' + day + '"] button')[0], 'mousedown');
    resolve();
  });
};

export default function() {
  Ember.Test.registerAsyncHelper('openDatepicker', openDatepicker);
  Ember.Test.registerAsyncHelper('selectDate', selectDate);
  Ember.Test.registerAsyncHelper('selectYear', selectYear);
  Ember.Test.registerAsyncHelper('selectMonth', selectMonth);
  Ember.Test.registerAsyncHelper('selectDay', selectDay);
}

export { interactor };
