$( document ).ready(function() {

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
      $(this).children('i').toggleClass('fa-caret-down');
      $(this).children('i').toggleClass('fa-caret-right');
      $(this).parent().next(".list-group").toggleClass('collapsedsection');
    });


    $('.rowselection').click(function(event){
      $(this).parent().parent().toggleClass('rowselected');
    });


        //select all checkboxes
        $(".checkall").click(function(){  //"select all" change
        if ($('.checkall').is(':checked')) {
          console.log('checked');
          $(".checkall").prop('checked', true);

          $(".rowselection").prop('checked', true); //change all ".checkbox" checked status
          $(".rowselection").parent().parent().addClass('rowselected');
        }else{
          console.log('unchecked');
          $(".checkall").prop('checked', false);
          $(".rowselection").prop('checked', false); //change all ".checkbox" checked status
          $(".rowselection").parent().parent().removeClass('rowselected');
        }


        });





  var sortby = "nothing";

  $( '.sortby' ).click(function() {
    sortby = $(this).text();

    $('.sortby').removeClass("activeSort");

    $(this).toggleClass('activeSort');
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
    
    $(this).parents('.mediainbox').toggleClass('newasset');
    resetMarkNew();
    return false;
  });


  $( '.applyfilters' ).click(function() {
    toggleFilter();
    var totalfilters = $('input[name="filterchecks"]:checked').length;

    $('.filtertext').html('<b>' + totalfilters + ' Filters </b>/ Sort By <b>' +sortby + '</b>');
    });



  $('.navbar li').click(function() {
    $('li.activeitem').removeClass('activeitem');
    $(this).addClass('activeitem');
  });


  $( '.fa-star' ).click(function() {
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

function resetMarkNew() {
  $('.markasnew').each(function(){
  if( $(this).parents('.mediainbox').hasClass('newasset')) {
    $(this).children('a').children('.markasnewtext').text('Unmark As New');
    return;
  } else {
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

  $('.filtertext').html('Filter / Sort');
}

function toggleFilter() {
  $('#control-panel').toggleClass('filteractive');
  $('.filter').toggleClass('filteractive');
}
