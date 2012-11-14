/* Copyright (C) YOOtheme GmbH, http://www.gnu.org/licenses/gpl.html GNU/GPL */

(function(b){var a=function(){};b.extend(a.prototype,{name:"BrowseTags",options:{msgSave:"Save",msgCancel:"Cancel"},initialize:function(a,d){this.options=b.extend({},this.options,d);var c=this;this.input=a;a.find("span.edit-tag a").bind("click",function(){var a=b(this);c.removePanel();a.hide();var d=b("<span>").addClass("edit-tag-panel").insertAfter(a);b('<input class="text" type="text" name="new">').val(a.text()).appendTo(d).focus().bind("keydown",function(a){13==a.which&&(a.stopPropagation(),c.submit());
27==a.which&&(a.stopPropagation(),c.removePanel())});b('<input type="hidden" name="old">').val(a.text()).appendTo(d);b("<button>").addClass("save").text(c.options.msgSave).appendTo(d).bind("click",function(){c.submit()});b("<a>").addClass("cancel").text(c.options.msgCancel).appendTo(d).bind("click",function(){c.removePanel()})})},removePanel:function(){this.input.find("span.edit-tag-panel").each(function(){b(this).parent().find("a").show();b(this).remove()})},submit:function(){this.input.find('input[name="task"]').val("update");
this.input.submit()}});b.fn[a.prototype.name]=function(){var e=arguments,d=e[0]?e[0]:null;return this.each(function(){var c=b(this);if(a.prototype[d]&&c.data(a.prototype.name)&&"initialize"!=d)c.data(a.prototype.name)[d].apply(c.data(a.prototype.name),Array.prototype.slice.call(e,1));else if(!d||b.isPlainObject(d)){var f=new a;a.prototype.initialize&&f.initialize.apply(f,b.merge([c],e));c.data(a.prototype.name,f)}else b.error("Method "+d+" does not exist on jQuery."+a.name)})}})(jQuery);
(function(b){var a=function(){};b.extend(a.prototype,{name:"Tag",options:{url:"",addButtonText:"Add Tag"},initialize:function(a,d){this.options=b.extend({},this.options,d);var c=this,f={},g;this.tagArea=a;this.tagInput=a.find('input[type="text"]');this.tagInput.autosuggest(b.extend({allowDuplicates:!1,inputName:"tags[]",prefill:this.tagInput.val()!=this.tagInput.attr("placeholder")?this.tagInput.val():"",source:function(a,d){var e=a.term;e in f?d(f[e]):g=b.getJSON(c.options.url,{tag:e},function(a,
b,c){f[e]=a;c===g&&d(a)})}},this.options)).bind("keydown",function(a){switch(a.which){case 13:a.preventDefault(),c.tagInput.autosuggest("addItem",c.tagInput.val())}}).placeholder();a.delegate("div.tag-cloud a","click",function(){c.tagInput.autosuggest("addItem",b(this).text());c.tagInput.trigger("blur.placeholder")})}});b.fn[a.prototype.name]=function(){var e=arguments,d=e[0]?e[0]:null;return this.each(function(){var c=b(this);if(a.prototype[d]&&c.data(a.prototype.name)&&"initialize"!=d)c.data(a.prototype.name)[d].apply(c.data(a.prototype.name),
Array.prototype.slice.call(e,1));else if(!d||b.isPlainObject(d)){var f=new a;a.prototype.initialize&&f.initialize.apply(f,b.merge([c],e));c.data(a.prototype.name,f)}else b.error("Method "+d+" does not exist on jQuery."+a.name)})}})(jQuery);