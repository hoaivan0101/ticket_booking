$(document).ready(function() {
    $('#videoModal').on('hidden.bs.modal', function() {
      var $this = $(this).find('iframe'),
        tempSrc = $this.attr('src');
      $this.attr('src', "");
      $this.attr('src', tempSrc);
    });
  });