app.modules.flocktory = (function(self) {

  const _prepareItems = (items) => items.map((item) => ({
      id: item.id,
      title: item.name,
      price: item.price || 0,
      image: item.image && item.image['image_styles'][0].url,
      count: item.quantity
    })
  );

  const _requestOrders = () => $.get(app.config.api.customerCartOrdersURL);

  function _getOrdersItems(orders) {
    if (!orders) { return; }

    const items = [];

    $.each(orders, (id, order) => {
      $.merge(items, order.items);
    });

    return _prepareItems(items);
  }

  function _getUserEmail(user) {
    if (!user) { return ''; }
    let email = '';

    if (user.email) {
      email = user.email;
    } else if (user.phone) {
      email = user.phone.replace('+', '') + '@unknown.email';
    } else if (user.id) {
      email = user.id + '@unknown.email';
    }

    return email;
  }

  function _getOrderSum(order) {
    if (!order) { return 0; }

    const total = order['items_total_price'];
    switch (total.type) {
      case 'exact':
        return total['exact_value'];
      case 'interval':
      case 'from':
        return total.from;
      case 'to':
        return total.to;
      default:
        return null;
    }
  }

  function _getUserData(order) {
    if (!order) { return; }

    const user = {
      email: _getUserEmail(order.user)
    };
    const userName = order.user.profile.name;
    userName && (user.name = userName);

    return user;
  }

  function _getOrderData(order) {
    const result = {
      id: order.id,
      items: _prepareItems(order.items)
    };
    const sum = _getOrderSum(order);
    sum && (result.price = sum);
    return result;
  }

  function _listener() {
    $doc
      .on('checkout:ordersItem', function(event, data) {
        window.flocktory.push(['postcheckout', {
          user: _getUserData(data),
          order: _getOrderData(data)
        }]);
      })
      .on('update:ordersItem', function() {
        _requestOrders().done(function(response) {
          window.flocktory.push(['updateCart', {
            cart: { items: _getOrdersItems(response.orders) }
          }]);
        });
      })
      .on('click', '.js-flocktory-event', function() {
        window.flocktory.push(['fireEvent', {event: $(this).data('flocktory-event-name')}]);
      });
  }

  function _init() {
    window.flocktory = window.flocktory || [];
    const script = document.createElement('script');

    script.async = true;
    script.type = 'text/javascript';
    script.src = 'https://api.flocktory.com/v2/loader.js?site_id=2459';
    script.id = 'flocktory-source';
    document.body.appendChild(script);
  }

  self.load = function() {
    if (app.config.flocktory && app.config.flocktory.isDisabled) {
      return;
    }

    _init();
    _listener();
  };

  return self;
})(app.modules.flocktory || {});
