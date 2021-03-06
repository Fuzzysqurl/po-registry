$(function() {
  $(document).on("click", ".banned .btn", function(event) {
    $.ajax({
      url: "unban",
      type: "GET",
      data: {"ip": $(this).attr('ip')}
    });
  });

  $(document).on("click", ".ban-btn", function(event) {
    $.ajax({
      url: "ban",
      type: "GET",
      data: {"ip": $(this).attr('ip')}
    });
  });

  $(document).on("click", ".server", function(event) {
    $('#relay').val($(this).attr('ip'));
    $('#port').val($(this).attr('port'));
    $('#server-name').val($(this).attr('name'));
    $(".server").removeClass("active");
    $(this).addClass("active");
    var desc = $(this).attr("description");
    //console.log("hovered, desc:" + desc);
    //$(".server-description").contents().find("body").html(desc);
    $(".server-description")[0].src = "data:text/html;charset=utf-8,<html><head></head><body style='font-family:\"Helvetica Neue\",Helvetica,Arial,sans-serif'>"
       +desc + "</body></html>";
    //submitConnectForm();
    window.scrollTo(0, $("#connect-form").offset().top);
    return false;
  });

  $("#connect-form").submit(function(event) {
    event.preventDefault();
    submitConnectForm();
  });
});

function submitConnectForm() {
  localStorage.setItem("po.username", $("#user").val());

  var action = $("#connect-form").attr("action");
  var newAction = action.substring(0, action.lastIndexOf("/")+1) + "?relay=" + $("#relay").val() + "&port=" + $("#port").val()
    + "&user=" + $("#user").val();

  $("#connect-form").attr("action", newAction);

  document.location.href = newAction;
  //document.forms["connect"].submit();
}

$(function() {
  $("#user").val(localStorage.getItem("po.username") || "");
});