$( document ).ready(function() {

    $("[data-toggle=popover]").popover();

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

    $(document).on("click", "#collapsecontroller", function() {
      if(!$('#collapsable').hasClass('in')){
        $('.collapsearrow').toggleClass('fa-caret-down');
        $('.collapsearrow').toggleClass('fa-caret-right');
      }else{
        $('.collapsearrow').toggleClass('fa-caret-down');
        $('.collapsearrow').toggleClass('fa-caret-right');

      }

    });

    $('.togglefolder').click(function(event){
      event.preventDefault();
      $(this).parent().next(".list-group").toggleClass('collapsedsection');
    });
    $('.rowselection').click(function(event){
      $(this).parent().parent().toggleClass('rowselected');
    });


        //select all checkboxes
        $(".checkall").change(function(){  //"select all" change
            $(".rowselection").prop('checked', $(this).prop("checked")); //change all ".checkbox" checked status
            $(".rowselection").parent().parent().toggleClass('rowselected');

        });

        //".checkbox" change
        $('.checkbox').change(function(){
            //uncheck "select all", if one of the listed checkbox item is unchecked
            if(false == $(this).prop("checked")){ //if this item is unchecked
                $(".checkall").prop('checked', false); //change "select all" checked status to false
            }
            //check "select all" if all checkbox items are checked
            if ($('.checkbox:checked').length == $('.checkbox').length ){
                $(".checkall").prop('checked', true);
            }
        });




  var sortby = "nothing";

  $( '.sortby' ).click(function() {
    sortby = $(this).text();

    $('.sortby').removeClass("activeSort");

    $(this).toggleClass('activeSort');
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

});


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
