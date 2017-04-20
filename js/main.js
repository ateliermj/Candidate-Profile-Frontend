$( document ).ready(function() {

  $(function(){
      // Enables popover
      $("[data-toggle=popover]").popover();
  });

  $( '.applyfilters' ).click(function() {
    var totalfilters = $('input[name="filterchecks"]:checked').length;
    var sortby = $('input[name="sortby"]:checked').parent().text();
    //$(this).find('input[name="filterchecks"]:checked').length;
    console.log(sortby);
    if($('input[name="sortby"]:checked').length > 1){
      sortby = 'multiple';
    }
    $('.filtertext').html('<b>' + totalfilters + ' Filters </b>/ Sort By <b>' +sortby + '</b>');
    $('.filter').toggleClass('filteractive')
  });



  $( '.fa-star' ).click(function() {
      $(this).toggleClass('activestar')
  });
  $( '.searchicon' ).click(function() {
      $('.searchbox').toggleClass('activesearch')
      $('.cancelsearch').toggleClass('activesearch')
      $('.searchicon').hide()
      $('#filtertoggle').hide()

  });
  $( '.cancelsearch' ).click(function() {
      $('.searchbox').toggleClass('activesearch')
      $('.cancelsearch').toggleClass('activesearch')
      $('.searchicon').show()
      $('#filtertoggle').show()

  });
  $( '#filtertoggle' ).click(function() {
      $('.filter').toggleClass('filteractive')
  });
  $( '.fa-camera' ).hover(function() {
  });
  $( '.fa-folder' ).hover(function() {
      console.log('folder');
  });


  $(document).ready(function() {
    $('#list').click(function(event){
      event.preventDefault();
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
                    icon: 'glyphicon glyphicon-check'
                },
                off: {
                    icon: 'glyphicon glyphicon-unchecked'
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
