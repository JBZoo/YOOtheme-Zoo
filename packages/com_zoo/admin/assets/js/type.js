/* Copyright (C) YOOtheme GmbH, http://www.gnu.org/licenses/gpl.html GNU/GPL */

(function(a){var b=function(){};a.extend(b.prototype,{name:"EditElements",options:{url:"index.php?option=com_zoo&controller=manager",msgNoElements:"No elements defined for this type",msgDeletelog:"Are you sure you want to delete the element?"},initialize:function(b,c){this.options=a.extend({},this.options,c);var d=this;this.list=b;this.count=0;this.noElements();this.list.delegate("div.edit-event","click",function(){a(this).parent("li.element").toggleClass("hideconfig")}).delegate("div.delete-event",
"click",function(){confirm(d.options.msgDeletelog)&&a(this).parent("li.element").fadeOut(200,function(){a(this).remove();d.noElements()})}).sortable({handle:"div.sort-event",placeholder:"element dragging",axis:"y",delay:100,tolerance:"pointer",scroll:false,start:function(c,b){d.list.children("li.element").each(function(){a(this).data("showconfig",!a(this).hasClass("hideconfig"));a(this).addClass("hideconfig")});var e=a("div.name",b.item).height();b.helper.height(e);b.placeholder.height(e);a(this).sortable("refreshPositions")},
stop:function(){d.list.children("li.element").each(function(){a(this).data("showconfig")&&a(this).removeClass("hideconfig")})}});a("#add-element ul.elements li").bind("click",function(){var b=a("<li>").addClass("element loading").prependTo(d.list);a.ajax({url:d.options.url,data:{format:"raw",task:"addelement",element:a(this).attr("class"),count:d.count++},dataType:"html",success:function(a){b.removeClass("loading").html(a);new Tips(b.find(".hasTip").get(),{maxTitleChars:50,fixed:false});d.noElements();
d.list.trigger("element.added",b);b.slideDown(200).effect("highlight",{},1E3)}})});a(".core-element-configuration > ul").hide();a(".core-element-configuration > .toggler").bind("click",function(b){b.preventDefault();a(".core-element-configuration > ul").toggle()});a(".core-element-configuration").delegate("div.edit-event","click",function(){a(this).parent("li.element").toggleClass("hideconfig")})},noElements:function(){this.list.find("li.no-elements").remove();this.list.children("li.element").length==
0&&a("<li>").addClass("no-elements").text(this.options.msgNoElements).appendTo(this.list)}});a.fn[b.prototype.name]=function(){var e=arguments,c=e[0]?e[0]:null;return this.each(function(){var d=a(this);if(b.prototype[c]&&d.data(b.prototype.name)&&c!="initialize")d.data(b.prototype.name)[c].apply(d.data(b.prototype.name),Array.prototype.slice.call(e,1));else if(!c||a.isPlainObject(c)){var f=new b;b.prototype.initialize&&f.initialize.apply(f,a.merge([d],e));d.data(b.prototype.name,f)}else a.error("Method "+
c+" does not exist on jQuery."+b.name)})}})(jQuery);
(function(a){var b=function(){};a.extend(b.prototype,{name:"AssignElements",initialize:function(b){var c=this;a("ul.element-list").delegate("div.sort-event","mousedown",function(){a("li.element").not(".hideconfig").addClass("hideconfig")});a("ul.element-list:not(.unassigned)").sortable({handle:"div.sort-event",connectWith:"ul.element-list:not(.unassigned)",placeholder:"element hideconfig dragging",forcePlaceholderSize:true,cursorAt:{top:16},tolerance:"pointer",scroll:false,change:function(){c.emptyList()},
update:function(d,f){f.item.hasClass("assigning")&&(b.find("li.assigning").each(function(){if(a(this).data("config")){var b=a(this).data("config").clone();b.find("input:radio").each(function(){a(this).attr("name",a(this).attr("name").replace(/^elements\[[\w_-]+\]/,"elements[_temp]"))});f.item.append(b)}}),f.item.removeClass("assigning"));c.emptyList()},start:function(a,b){b.helper.addClass("ghost")},stop:function(a,b){b.item.removeClass("ghost");c.emptyList().sanatizeList()}});a("ul.element-list.unassigned li.element").draggable({handle:"div.sort-event",
scroll:false,zIndex:1E3,helper:function(){var b=a(this).clone();b.find("div.config").remove();return b},connectToSortable:"ul.element-list:not(.unassigned)",drag:function(){c.emptyList()},start:function(b,c){a(this).addClass("assigning");a(this).data("config",a(this).find("div.config").remove());c.helper.addClass("ghost")},stop:function(b,e){a(this).removeClass("assigning");e.helper.removeClass("ghost");a(this).append(a(this).data("config"));c.emptyList().sanatizeList()}});this.emptyList().sanatizeList();
b.delegate("div.edit-event","click",function(){a(this).closest("li").toggleClass("hideconfig")}).delegate("div.delete-event","click",function(){a(this).closest("li").fadeOut(200,function(){a(this).remove();c.emptyList().sanatizeList()})})},emptyList:function(){a("ul.element-list:not(.unassigned)").each(function(){var b=a(this).hasClass("empty-list"),c=a(this).children(":not(.ui-sortable-helper)").length;(b&&c||!b&&!c)&&a(this).toggleClass("empty-list")});return this},sanatizeList:function(){var b=
RegExp(/(elements\[[a-z0-9_-]+\])|(positions\[[a-z0-9_-]+\]\[[0-9]+\])/);a("ul.element-list:not(.unassigned)").each(function(){var c="positions["+a(this).data("position")+"]";a(this).children().each(function(d){a(this).find("[name^=positions], [name^=elements]").each(function(){a(this).attr("name","tmp"+a(this).attr("name").replace(b,c+"["+d+"]"))})})});b=RegExp(/^tmp/);a("ul.element-list").find("[name^=tmp]").each(function(){a(this).attr("name",a(this).attr("name").replace(b,""))});return this}});
a.fn[b.prototype.name]=function(){var e=arguments,c=e[0]?e[0]:null;return this.each(function(){var d=a(this);if(b.prototype[c]&&d.data(b.prototype.name)&&c!="initialize")d.data(b.prototype.name)[c].apply(d.data(b.prototype.name),Array.prototype.slice.call(e,1));else if(!c||a.isPlainObject(c)){var f=new b;b.prototype.initialize&&f.initialize.apply(f,a.merge([d],e));d.data(b.prototype.name,f)}else a.error("Method "+c+" does not exist on jQuery."+b.name)})}})(jQuery);
(function(a){var b=function(){};a.extend(b.prototype,{name:"AssignSubmission",initialize:function(b){var c=this;a("ul.element-list").delegate("div.sort-event","mousedown",function(){a("li.element").not(".hideconfig").addClass("hideconfig")}).sortable({handle:"div.sort-event",connectWith:'ul.element-list:not([data-position="unassigned"])',placeholder:"element hideconfig dragging",forcePlaceholderSize:true,cursorAt:{top:16},tolerance:"pointer",scroll:false,start:function(a,b){b.helper.addClass("ghost")},
stop:function(a,b){b.item.removeClass("ghost")},change:function(){c.emptyList()},update:function(){c.emptyList()}});this.emptyList();b.delegate("div.edit-event","click",function(){a(this).closest("li").toggleClass("hideconfig")}).delegate("div.delete-event","click",function(){a(this).closest("li").appendTo(a("ul.element-list[data-position=unassigned]")).addClass("hideconfig").effect("highlight",{},1E3);c.emptyList()});a.each(["apply","save","save-new"],function(b,c){a("#toolbar-"+c+" a, #toolbar-"+
c+" button").bind("validate.adminForm",function(){a('ul.element-list:not([data-position="unassigned"])').each(function(){var b=a(this).data("position");a(this).children().each(function(c){var d=a(this).data("element");a(this).find('[name^="'+d+'"]').each(function(){a(this).attr("name","positions["+b+"]["+c+"]"+a(this).attr("name").replace(RegExp(d),""))})})})})})},emptyList:function(){a("ul.element-list").each(function(){a(this).removeClass("empty-list");a(this).children(":not(.ui-sortable-helper)").length==
0&&a(this).addClass("empty-list")});return this}});a.fn[b.prototype.name]=function(){var e=arguments,c=e[0]?e[0]:null;return this.each(function(){var d=a(this);if(b.prototype[c]&&d.data(b.prototype.name)&&c!="initialize")d.data(b.prototype.name)[c].apply(d.data(b.prototype.name),Array.prototype.slice.call(e,1));else if(!c||a.isPlainObject(c)){var f=new b;b.prototype.initialize&&f.initialize.apply(f,a.merge([d],e));d.data(b.prototype.name,f)}else a.error("Method "+c+" does not exist on jQuery."+b.name)})}})(jQuery);
(function(a){var b=function(){};a.extend(b.prototype,{name:"EditType",initialize:function(b){a.each(["apply","save"],function(c,d){a("#toolbar-"+d+" a").removeAttr("onclick").bind("click",function(){b.find('input[name="name"]').val()==""?b.find("span.message-name").css("display","block"):submitbutton(d+"type")})})}});a.fn[b.prototype.name]=function(){var e=arguments,c=e[0]?e[0]:null;return this.each(function(){var d=a(this);if(b.prototype[c]&&d.data(b.prototype.name)&&c!="initialize")d.data(b.prototype.name)[c].apply(d.data(b.prototype.name),
Array.prototype.slice.call(e,1));else if(!c||a.isPlainObject(c)){var f=new b;b.prototype.initialize&&f.initialize.apply(f,a.merge([d],e));d.data(b.prototype.name,f)}else a.error("Method "+c+" does not exist on jQuery."+b.name)})}})(jQuery);
