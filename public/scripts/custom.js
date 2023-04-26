$(window).load(function() {
    $(".filter-btn").click(function() {
        var filterClass = $(this).attr("data-filter");
        $(".country").hide();
        $(filterClass).show();

        $(".filter-btn").removeClass("active");
        $(this).addClass("active");
    });
});