L.TileLayer.BetterWMS = L.TileLayer.WMS.extend({
  onAdd: function (map) {
    // Triggered when the layer is added to a map.
    //   Register a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onAdd.call(this, map);
    map.on('click', this.getFeatureInfo, this);
  },
  onRemove: function (map) {
    // Triggered when the layer is removed from a map.
    //   Unregister a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onRemove.call(this, map);
    map.off('click', this.getFeatureInfo, this);
  },
  getFeatureInfo: function (evt) {
    // Make an AJAX request to the server and hope for the best
    const url = this.getFeatureInfoUrl(evt.latlng);
    const showResults = L.Util.bind(this.showGetFeatureInfo, this);
    // $.ajax({
    fetch(url).then((response) => response.text()).then((data, status, xhr) => {
      let err = null;
      if (data) {
        if (typeof data !== 'string' || data.match(/ServiceException/) != null) {
          err = data;
        }
      } else {
        err = "no data";
      }
      showResults(err, evt.latlng, data);
    }, (xhr, status, error) => {
      showResults(error);
    });
  },
  getFeatureInfoUrl: function (latlng) {
    // Construct a GetFeatureInfo request URL given a point
    const point = this._map.latLngToContainerPoint(latlng, this._map.getZoom());
    const size = this._map.getSize();
    const bounds = this._map.getBounds();
    // this crs is used to show layer added to map
    const crs = this.options.crs || this._map.options.crs;
    // these are the SouthWest and NorthEast points 
    // projected from LatLng into used crs
    const sw = crs.project(bounds.getSouthWest());
    const ne = crs.project(bounds.getNorthEast());
    const params = {
      request: 'GetFeatureInfo',
      service: 'WMS',
      // this is the code of used crs
      srs: crs.code,
      styles: this.wmsParams.styles,
      transparent: this.wmsParams.transparent,
      version: this.wmsParams.version,
      format: this.wmsParams.format,
      // these are bbox defined by SouthWest and NorthEast coords
      bbox: sw.x + ',' + sw.y + ',' + ne.x + ',' + ne.y,
      height: size.y,
      width: size.x,
      layers: this.wmsParams.layers,
      query_layers: this.wmsParams.layers,
      info_format: 'text/html'
    };
    params[params.version === '1.3.0' ? 'i' : 'x'] = point.x;
    params[params.version === '1.3.0' ? 'j' : 'y'] = point.y;
    return this._url + L.Util.getParamString(params, this._url, true);
  },
  showGetFeatureInfo: function (err, latlng, content) {
    if (err) {
      console.log(err);
      return;
    } // do nothing if there's an error
    // Otherwise show the content in a popup, or something.
    L.popup({
      maxWidth: 430
    }).setLatLng(latlng).setContent(content).openOn(this._map);
  }
});
L.tileLayer.betterWms = (url, options) => {
  return new L.TileLayer.BetterWMS(url, options);
};
