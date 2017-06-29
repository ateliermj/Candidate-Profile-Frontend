$( document ).ready(function() {

  $(".savechanges").hide();

setAccessesWidth();

$( window ).resize(function() {
  setAccessesWidth();
});


  var height = $('.headerDescription').height();
  if(height > 22){
    $('.headerDescription').toggleClass('collapseddescription');
  }
  $('.headerDescriptionToggle').click(function(){
    $('.headerDescription').toggleClass('collapseddescription');
    $('.headerDescriptionToggle').toggleClass('descriptiontoggled');
    //$(this).hide();
  });

  selections=0;
  if(selections > 0){
    $('.multiplefileoptions').show();
  }else{
    $('.multiplefileoptions').hide();
}

    $("[data-toggle=popover]").popover();
    resetMarkNew();

    $(document).on('click', function (e) {
        $('[data-toggle="popover"],[data-original-title]').each(function () {
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                (($(this).popover('hide').data('bs.popover')||{}).inState||{}).click = false  // fix for BS 3.3.6
            }

        });
    });


    $('#searchbox').keypress(function(event){

    	var keycode = (event.keyCode ? event.keyCode : event.which);
    	if(keycode == '13'){
        window.location.replace("search.html");
    	}
    	event.stopPropagation();
    });


     $('#assets .item').addClass('grid-group-item');

      $('#list').click(function(event){
      event.preventDefault();
      $('#assets .item').removeClass('grid-group-item');
      $('#assets .item').addClass('list-group-item');
      $('#list').addClass('listgridactive');
      $('#grid').removeClass('listgridactive');
    });

    $('#grid').click(function(event){
      event.preventDefault();
      $('#assets .item').removeClass('list-group-item');
      $('#assets .item').addClass('grid-group-item');
      $('#grid').addClass('listgridactive');
      $('#list').removeClass('listgridactive');
    });


    $(document).on("click", ".collapsearrow", function() {

      console.log($(this));
      $(this).toggleClass('fa-caret-right', 'fa-caret-down');

    });

    $('.togglefolder').click(function(event){
      event.preventDefault();
      $(this).children('i').toggleClass('fa fa-minus-square-o');
      $(this).children('i').toggleClass('fa fa-plus-square-o');
      $(this).parent().next(".list-group").toggleClass('collapsedsection');
    });


    $('.rowselection').click(function(event){
      $(this).parent().parent().toggleClass('rowselected');
      selections = $('.rowselected').length;
      if(selections > 0){
        $('.multiplefileoptions').show();
        checkMultipleSelect();
      }else{
        $('.multiplefileoptions').hide();
    }

    });

    $('.fa-caret-down').click(function() {
      var breadcrumb_width = $('.course-breadcrumb').children()[0].offsetWidth;
      console.log(breadcrumb_width);
      var caret_width = $('.course-breadcrumb > .fa-caret-down')[0].offsetWidth;
      console.log(caret_width);
      var breadcrumb_total_width = breadcrumb_width + caret_width;
      var popover_width = $('.course-breadcrumb > .popover')[0].offsetWidth;
      console.log(popover_width);
      var delta = breadcrumb_total_width - popover_width;
      console.log(delta);
       console.log(delta > 0);
       $('.course-breadcrumb > .popover')[0].style.left = (delta > 0) ? (breadcrumb_total_width/2 + 15) + "px": 0 + "px";
      $('.course-breadcrumb > .popover > .arrow')[0].style.left = (delta > 0) ? "50%" : breadcrumb_total_width + 10 + "px";
});



        //select all checkboxes
        $(".checkall").click(function(){  //"select all" change
        if ($('.checkall').is(':checked')) {
          console.log('checked');
          $(".checkall").prop('checked', true);
          $(".rowselection").prop('checked', true); //change all ".checkbox" checked status
          $(".rowselection").parent().parent().addClass('rowselected');
          selections = $('.rowselected').length;
          console.log(selections);

          if(selections > 0){
            $('.multiplefileoptions').show();
            checkMultipleSelect();
          }else{
            $('.multiplefileoptions').hide();
          }

        }else{
          console.log('unchecked');
          $(".checkall").prop('checked', false);
          $(".rowselection").prop('checked', false); //change all ".checkbox" checked status
          $(".rowselection").parent().parent().removeClass('rowselected');
          selections = $('.rowselected').length;
          console.log(selections);
          if(selections > 0){
            $('.multiplefileoptions').show();
            checkMultipleSelect();
          }else{
            $('.multiplefileoptions').hide();
          }
        }
        });


function checkMultipleSelect(){
  numberofnew = 0;
  $(".rowselected").each(function() {
    if($(this).hasClass('newasset') ){
      numberofnew +=1;
    }
    else{
    }
  });
  if( numberofnew > 0 ){
    $('.multipleFileOptionsMarkNew').addClass('greyedout');
  }else{
    $('.multipleFileOptionsMarkNew').removeClass('greyedout');

  }

}


  sortby = '';

  $( '.sortby' ).click(function() {

    if($(this).hasClass("activeSort")){
      sortby = '';
      $(this).removeClass("activeSort");
    }else{
      $('.sortby').removeClass("activeSort");
      $(this).addClass('activeSort');
      sortby = $(this).text();

    }

  });


  $( '.applyfilters' ).click(function() {
    toggleFilter();

    var totalfilters = $('input[name="filterchecks"]:checked').length;

    if(totalfilters > 1){
      $('.filtertext').html('<b>' + totalfilters + ' Filters </b>/ Sort By <b>' + sortby + '</b> <a href="#" class="clearFilter" onclick="clearFilter()">Clear</a> ');
    }else if(totalfilters == '1'){
      $('.filtertext').html('<b>' + totalfilters + ' Filter </b>/ Sort By <b>' + sortby + '</b> <a href="#" class="clearFilter" onclick="clearFilter()">Clear</a> ');

    }else if( (totalfilters == '0') && (sortby == '')){
      $('.filtertext').html(' Filter / Sort By ');
    }else{
      $('.filtertext').html( 'Filter / Sort By <b>' + sortby + '</b> <a href="#" class="clearFilter" onclick="clearFilter()">Clear</a>');
    }

    });



  $( '.folderlist li' ).click(function() {
    $(".folderlist li").removeClass("selected");
    $(this).toggleClass('selected');
  });

  $( '.publishcollabsablecontroller' ).click(function() {
    if($(this).hasClass('fa-minus-square-o')){
      $(this).removeClass('fa-minus-square-o');
      $(this).addClass('fa-plus-square-o');
    }else{
      $(this).removeClass('fa-plus-square-o');
      $(this).addClass('fa-minus-square-o');
    }
    $(this).parent().next().toggleClass('open');
  });



  $( '.markasnew' ).click(function() {
    if($(this).children('a').hasClass('alreadyNew')){

    }else{
      $(this).parents('.mediainbox').toggleClass('newasset');
      resetMarkNew();
      return false;
    }
  });






  $('.navbar li').click(function() {
    $('li.activeitem').removeClass('activeitem');
    $(this).addClass('activeitem');
  });


  $( '.fa-star-o' ).click(function() {
     $(this).toggleClass('fa-star-o fa-star');
      $(this).toggleClass('activestar');
  });

  $( '.searchicon' ).click(function() {
      $('.searchbox').toggleClass('activesearch');
      $('.cancelsearch').toggleClass('activesearch');
      $('.searchicon').hide();
      $('#filtertoggle').hide();
      $('#grid').hide();
      $('#list').hide();

  });
  $( '.cancelsearch' ).click(function() {
      $('.searchbox').toggleClass('activesearch');
      $('.cancelsearch').toggleClass('activesearch');
      $('.searchicon').show();
      $('#filtertoggle').show();
      $('#grid').show();
      $('#list').show();

  });
  $( '#filtertoggle' ).click(function() {
    toggleFilter();
  });
  $( '.closefilter' ).click(function() {
    toggleFilter();
  });
  $( '.fa-camera' ).hover(function() {
  });
  $( '.fa-folder' ).hover(function() {
      console.log('folder');
  });


  $( '.publish' ).click(function() {
    $('.savechanges').show();
  });



$(function () {

    $('.button-checkbox').each(function () {

        // Settings
        var $widget = $(this),
            $button = $widget.find('button'),
            $checkbox = $widget.find('input:checkbox'),
            color = $button.data('color'),
            settings = {
                on: {
                    icon: 'fa fa-check-square '
                },
                off: {
                    icon: 'fa fa-square-o'
                }
            };

        // Event Handlers
        $button.on('click', function () {
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });
        $checkbox.on('change', function () {
            updateDisplay();
        });

        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');

            // Set the button's state
            $button.data('state', (isChecked) ? "on" : "off");

            // Set the button's icon
            $button.find('.state-icon')
                .removeClass()
                .addClass('state-icon ' + settings[$button.data('state')].icon);

            // Update the button's color
            if (isChecked) {
                $button
                    .removeClass('btn-default')
                    .addClass('btn-' + color + ' active');
            }
            else {
                $button
                    .removeClass('btn-' + color + ' active')
                    .addClass('btn-default');
            }
        }

        // Initialization
        function init() {

            updateDisplay();

            // Inject the icon if applicable
            if ($button.find('.state-icon').length == 0) {
                $button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon + '"></i> ');
            }
        }
        init();
    });
});

$('.file-title .fa').click(function() {
  if($(this).hasClass('fa-angle-double-down')) {
    $(this).removeClass('fa-angle-double-down').addClass('fa-angle-double-right');
  } else if ($(this).hasClass('fa-angle-double-right')) {
    $(this).removeClass('fa-angle-double-right').addClass('fa-angle-double-down');
  } else if ($(this).hasClass('fa-angle-down')) {
    $(this).removeClass('fa-angle-down').addClass('fa-angle-right');
  } else if ($(this).hasClass('fa-angle-right')) {
    $(this).removeClass('fa-angle-right').addClass('fa-angle-down');
  }
});




});


function setAccessesWidth() {
	$('.metadataaccesses').each(function() {
  	var meta_width = $(this).parent()[0].offsetWidth;
    while($(this).width() > meta_width ){
      accesses = $(this).children().html().slice(0,-4);
      accesses = accesses + '...'
      $(this).children().html(accesses)
    }
  });
}

function resetMarkNew() {
  $('.markasnew').each(function(){
  if( $(this).parents('.mediainbox').hasClass('newasset')) {
    //$(this).children('a').children('.markasnewtext').text('Unmark As New');
    $(this).children('a').addClass('alreadyNew');
    return;
  }else{
    $(this).children('a').children('.markasnewtext').text('Mark As New');
    return
  }
  });
}


function resetFilter() {
  $('input[name="filterchecks"]:checked').each(function() {
    $(this).trigger('click');
  });

  $('.activeSort').each(function() {
    $(this).removeClass('activeSort');
  })
  $('.filtertext').html( 'Filter / Sort By');

  sortby = '';
}

function clearFilter() {
  $('input[name="filterchecks"]:checked').each(function() {
    $(this).trigger('click');
  });

  $('.activeSort').each(function() {
    $(this).removeClass('activeSort');
  })
  $('.filtertext').html( 'Filter / Sort By');

  sortby = '';
  toggleFilter()
}

function toggleFilter() {
  $('#control-panel').toggleClass('filteractive');
  $('.filter').toggleClass('filteractive');
}
