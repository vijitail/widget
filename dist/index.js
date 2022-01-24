var react = require('react');

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var useCryptoData = function useCryptoData() {
  var _useState = react.useState([]),
      cryptoData = _useState[0],
      setCryptoData = _useState[1];

  var _useState2 = react.useState(true),
      isLoading = _useState2[0],
      setLoading = _useState2[1];

  react.useEffect(function () {
    setLoading(true);
    fetch('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=11&tsym=USD').then(function (res) {
      return res.json();
    }).then(function (data) {
      console.log(data);
      var preparedData = [];
      data.Data.forEach(function (d) {
        var _d$DISPLAY;

        var _d$CoinInfo = d.CoinInfo,
            Id = _d$CoinInfo.Id,
            Name = _d$CoinInfo.Name,
            FullName = _d$CoinInfo.FullName,
            ImageUrl = _d$CoinInfo.ImageUrl,
            Url = _d$CoinInfo.Url;
        if (Name === 'USDT') return;
        var Price, Change24hr;

        if ((_d$DISPLAY = d.DISPLAY) !== null && _d$DISPLAY !== void 0 && _d$DISPLAY.USD) {
          var _d$DISPLAY$USD = d.DISPLAY.USD,
              PRICE = _d$DISPLAY$USD.PRICE,
              CHANGEPCT24HOUR = _d$DISPLAY$USD.CHANGEPCT24HOUR;
          Price = PRICE;
          Change24hr = CHANGEPCT24HOUR;
        }

        preparedData.push({
          Id: Id,
          Name: Name,
          FullName: FullName,
          ImageUrl: "https://www.cryptocompare.com" + ImageUrl,
          Url: "https://www.cryptocompare.com" + Url,
          Price: Price,
          Change24hr: Change24hr
        });
      });
      setCryptoData(preparedData);
    })["finally"](function () {
      return setLoading(false);
    });
  }, []);
  return {
    cryptoData: cryptoData,
    isLoading: isLoading
  };
};

var CryptoItem = function CryptoItem(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "item"
  }, /*#__PURE__*/React.createElement("img", {
    src: props.ImageUrl,
    className: "icon",
    alt: props.Name
  }), /*#__PURE__*/React.createElement("div", {
    className: "display-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "name"
  }, props.Name), /*#__PURE__*/React.createElement("div", {
    className: "fullname"
  }, props.FullName)), /*#__PURE__*/React.createElement("div", {
    className: "price-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "price"
  }, props.Price), /*#__PURE__*/React.createElement("div", {
    className: "price-change " + (parseInt(props.Change24hr) < 0 ? 'danger' : 'success')
  }, props.Change24hr && props.Change24hr + "%")));
};

var CryptoList = function CryptoList() {
  var _useCryptoData = useCryptoData(),
      cryptoData = _useCryptoData.cryptoData,
      isLoading = _useCryptoData.isLoading;

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, !isLoading ? cryptoData.map(function (itemData) {
    return /*#__PURE__*/React.createElement(CryptoItem, _extends({
      key: itemData.Id
    }, itemData));
  }) : /*#__PURE__*/React.createElement("p", {
    className: "loading-text"
  }, "Loading Data...")));
};

module.exports = CryptoList;
//# sourceMappingURL=index.js.map
