/* Copyright (C) YOOtheme GmbH, http://www.gnu.org/licenses/gpl.html GNU/GPL */

/*
 MIT License <http://www.opensource.org/licenses/mit-license.php>
*/
(function(b,k,l,i){function e(a,c){this.options=b.extend(!0,{},g,c);this.input=a;this.$input=b(a);this._defaults=g;this._name="geocomplete";this.init()}var g={bounds:!0,country:null,map:!1,details:!1,detailsAttribute:"name",location:!1,mapOptions:{zoom:14,scrollwheel:!1,mapTypeId:"roadmap"},markerOptions:{draggable:!1},maxZoom:16,types:["geocode"]},j="street_address route intersection political country administrative_area_level_1 administrative_area_level_2 administrative_area_level_3 colloquial_area locality sublocality neighborhood premise subpremise postal_code natural_feature airport park point_of_interest post_box street_number floor room lat lng viewport location formatted_address location_type bounds".split(" "),
h="id url website vicinity reference name rating international_phone_number icon formatted_phone_number".split(" ");b.extend(e.prototype,{init:function(){this.initMap();this.initMarker();this.initGeocoder();this.initDetails();this.initLocation()},initMap:function(){this.options.map&&(this.map="function"==typeof this.options.map.setCenter?this.options.map:new google.maps.Map(b(this.options.map)[0],this.options.mapOptions))},initMarker:function(){if(this.map){var a=b.extend(this.options.markerOptions,
{map:this.map});a.disabled||(this.marker=new google.maps.Marker(a),google.maps.event.addListener(this.marker,"dragend",b.proxy(this.markerDragged,this)))}},initGeocoder:function(){var a={types:this.options.types,bounds:!0===this.options.bounds?null:this.options.bounds,componentRestrictions:this.options.componentRestrictions};this.options.country&&(a.componentRestrictions={country:this.options.country});this.autocomplete=new google.maps.places.Autocomplete(this.input,a);this.geocoder=new google.maps.Geocoder;
this.map&&!0===this.options.bounds&&this.autocomplete.bindTo("bounds",this.map);google.maps.event.addListener(this.autocomplete,"place_changed",b.proxy(this.placeChanged,this));this.$input.keypress(function(a){if(a.keyCode===13)return false});this.$input.bind("geocode",b.proxy(function(){this.find()},this))},initDetails:function(){function a(a){f[a]=c.find("["+d+"="+a+"]")}if(this.options.details){var c=b(this.options.details),d=this.options.detailsAttribute,f={};b.each(j,function(c,b){a(b);a(b+"_short")});
b.each(h,function(c,b){a(b)});this.$details=c;this.details=f}},initLocation:function(){var a=this.options.location,c;a&&("string"==typeof a?this.find(a):(a instanceof Array&&(c=new google.maps.LatLng(a[0],a[1])),a instanceof google.maps.LatLng&&(c=a),c&&this.map&&this.map.setCenter(c)))},find:function(a){this.geocode({address:a||this.$input.val()})},geocode:function(a){this.options.bounds&&!a.bounds&&(a.bounds=!0===this.options.bounds?this.map&&this.map.getBounds():this.options.bounds);this.options.country&&
(a.region=this.options.country);this.geocoder.geocode(a,b.proxy(this.handleGeocode,this))},handleGeocode:function(a,c){if(c===google.maps.GeocoderStatus.OK){var b=a[0];this.$input.val(b.formatted_address);this.update(b);1<a.length&&this.trigger("geocode:multiple",a)}else this.trigger("geocode:error",c)},trigger:function(a,c){this.$input.trigger(a,[c])},center:function(a){a.viewport?(this.map.fitBounds(a.viewport),this.map.getZoom()>this.options.maxZoom&&this.map.setZoom(this.options.maxZoom)):(this.map.setZoom(this.options.maxZoom),
this.map.setCenter(a.location));this.marker&&(this.marker.setPosition(a.location),this.marker.setAnimation(this.options.markerOptions.animation))},update:function(a){this.map&&this.center(a.geometry);this.$details&&this.fillDetails(a);this.trigger("geocode:result",a)},fillDetails:function(a){var c={},d=a.geometry,f=d.viewport,e=d.bounds;b.each(a.address_components,function(a,b){var d=b.types[0];c[d]=b.long_name;c[d+"_short"]=b.short_name});b.each(h,function(b,d){c[d]=a[d]});b.extend(c,{formatted_address:a.formatted_address,
location_type:d.location_type||"PLACES",viewport:f,bounds:e,location:d.location,lat:d.location.lat(),lng:d.location.lng()});b.each(this.details,b.proxy(function(a,b){this.setDetail(b,c[a])},this));this.data=c},setDetail:function(a,b){b===i?b="":"function"==typeof b.toUrlValue&&(b=b.toUrlValue());a.is(":input")?a.val(b):a.text(b)},markerDragged:function(a){this.trigger("geocode:dragged",a.latLng)},resetMarker:function(){this.marker.setPosition(this.data.location);this.setDetail(this.details.lat,this.data.location.lat());
this.setDetail(this.details.lng,this.data.location.lng())},placeChanged:function(){var a=this.autocomplete.getPlace();a.geometry?this.update(a):this.find(a.name)}});b.fn.geocomplete=function(a){if("string"==typeof a){var c=b(this).data("plugin_geocomplete")||b(this).geocomplete().data("plugin_geocomplete"),d=c[a];if("function"==typeof d)return d.apply(c,Array.prototype.slice.call(arguments,1)),b(this);2==arguments.length&&(d=arguments[1]);return d}return this.each(function(){var c=b.data(this,"plugin_geocomplete");
c||(c=new e(this,a),b.data(this,"plugin_geocomplete",c))})}})(jQuery,window,document);