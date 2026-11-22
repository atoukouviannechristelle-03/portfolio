$(function () {
  // Préchargeur : compteur de 0 à 100 %, puis l'accueil s'anime
  var duree = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 500 : 3200;
  $({ n: 0 }).animate({ n: 100 }, {
    duration: duree, easing: "swing",
    step: function (n) { var v = Math.round(n); $("#pourcent").text(v); $("#barre").css("width", v + "%"); },
    complete: function () {
      $("#pourcent").text(100); $("#barre").css("width", "100%");
      setTimeout(function () { $("html").addClass("pret"); }, 350);
    }
  });

  // Menu mobile
  $("#menu-btn").on("click", function () {
    var ouvert = $("#menu").toggleClass("hidden").is(":visible");
    $(this).attr("aria-expanded", ouvert);
  });
  $("#menu a").on("click", function () {
    if (window.innerWidth < 768) $("#menu").addClass("hidden");
  });

  // Scrollspy + apparition au défilement + ombre de l'en-tête
  function maj() {
    var y = $(window).scrollTop(), h = $(window).height();
    $("#entete").toggleClass("shadow-lg shadow-black/10", y > 10);
    $(".reveal").each(function () {
      if ($(this).offset().top < y + h - 60) $(this).addClass("vu");
    });
    var courant = "accueil";
    $("main section").each(function () {
      if ($(this).offset().top - 120 <= y) courant = this.id;
    });
    $(".lien").removeClass("actif").filter('[href="#' + courant + '"]').addClass("actif");
  }
  $(window).on("scroll resize load", maj);
  maj();

});
