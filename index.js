
//end music
$(function () {
  var audio = document.querySelector("audio");
  var volumeX=1;
  let songIndex = listSongs.length - 1;
  // console.log(listSongs);

  loadSong(listSongs[songIndex], listImg[songIndex]);

  function loadSong(song, musician) {
    let detailSong = song.split(".");
    $("h5.Name").html(detailSong[1]);
    $("audio").attr("src", `music/${song}`);
    $(".imgMusic").attr("src", `music/${musician}`);
    $(".musician").html(detailSong[0]);
    // define minutes duration
    $(audio).on("loadedmetadata", function () {
      // define minutes duration
      let min_d =
        isNaN(this.duration) === true ? "0" : Math.floor(this.duration / 60);
      min_d = min_d < 10 ? "0" + min_d : min_d;

      function get_sec_d(x) {
        if (Math.floor(x) >= 60) {
          for (var i = 1; i <= 60; i++) {
            if (Math.floor(x) >= 60 * i && Math.floor(x) < 60 * (i + 1)) {
              sec_d = Math.floor(x) - 60 * i;
              sec_d = sec_d < 10 ? "0" + sec_d : sec_d;
            }
          }
        } else {
          sec_d = isNaN(this.duration) === true ? "0" : Math.floor(x);
          sec_d = sec_d < 10 ? "0" + sec_d : sec_d;
        }
      }

      // define seconds duration

      get_sec_d(this.duration);

      // change duration DOM
      $(".time").html("00:00/" + min_d + ":" + sec_d);
    });
  }

  $(".play").click(function (e) {
    e.preventDefault();
    audio.play();
    this.style.display = "none";
    $(".pause").css({ display: "block" });
  });

  $(".pause").click(function (e) {
    e.preventDefault();
    audio.pause();
    this.style.display = "none";
    $(".play").css({ display: "block" });
  });

  $(".next").click(function (e) {
    e.preventDefault();
    songIndex++;
    if (songIndex > listSongs.length - 1) {
      songIndex = 0;
    }
    loadSong(listSongs[songIndex], listImg[songIndex]);
    audio.play();
  });

  $(".previous").click(function (e) {
    e.preventDefault();
    songIndex--;
    if (songIndex < 0) {
      songIndex = listSongs.length - 1;
    }
    loadSong(listSongs[songIndex], listImg[songIndex]);
    audio.play();
  });

  $(audio).bind("timeupdate", function (e) {
    var widthOfProgressBar = Math.floor(
      (100 / this.duration) * this.currentTime
    );
    $("#progress").css("width", widthOfProgressBar + "%");
    var sec;
    var sec_d;

    // define minutes currentTime
    let min = this.currentTime == null ? 0 : Math.floor(this.currentTime / 60);
    min = min < 10 ? "0" + min : min;

    // define seconds currentTime
    function get_sec(x) {
      if (Math.floor(x) >= 60) {
        for (var i = 1; i <= 60; i++) {
          if (Math.floor(x) >= 60 * i && Math.floor(x) < 60 * (i + 1)) {
            sec = Math.floor(x) - 60 * i;
            sec = sec < 10 ? "0" + sec : sec;
          }
        }
      } else {
        sec = Math.floor(x);
        sec = sec < 10 ? "0" + sec : sec;
      }
    }

    get_sec(this.currentTime, sec);

    // change currentTime DOM
    // currTime.innerHTML = min +':'+ sec;

    // define minutes duration
    let min_d =
      isNaN(this.duration) === true ? "0" : Math.floor(this.duration / 60);
    min_d = min_d < 10 ? "0" + min_d : min_d;

    function get_sec_d(x) {
      if (Math.floor(x) >= 60) {
        for (var i = 1; i <= 60; i++) {
          if (Math.floor(x) >= 60 * i && Math.floor(x) < 60 * (i + 1)) {
            sec_d = Math.floor(x) - 60 * i;
            sec_d = sec_d < 10 ? "0" + sec_d : sec_d;
          }
        }
      } else {
        sec_d = isNaN(this.duration) === true ? "0" : Math.floor(x);
        sec_d = sec_d < 10 ? "0" + sec_d : sec_d;
      }
    }

    // define seconds duration

    get_sec_d(this.duration);

    // change duration DOM
    $(".time").html(min + ":" + sec + "/" + min_d + ":" + sec_d);
  });

  // Set progress bar
  $(".progressTime").click(function (e) {
    e.preventDefault();
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
    $(".play").css({ display: "none" });
    $(".pause").css({ display: "block" });
    audio.play();
  });
  $(".btnVolume").click(function (e) {
    e.preventDefault();
    this.style.display = "none";
    $(".btnVolumeX").css({ display: "block" });
    $("#progressVolume").css("width", 0 + "%");
    audio.volume = 0;
  });

  $(".btnVolumeX").click(function (e) {
    e.preventDefault();
    this.style.display = "none";
    $(".btnVolume").css({ display: "block" });
    $("#progressVolume").css("width", volumeX*100 + "%");
    audio.volume = volumeX;
  });

  $(".progressVolume").click(function (e) {
    e.preventDefault();
    const width = this.clientWidth;
    const clickX = e.offsetX;
    $(".btnVolume").css({ display: "block" });
    $(".btnVolumeX").css({ display: "none" });
    volumeX = clickX / width;
    audio.volume = clickX / width;
    $("#progressVolume").css("width", (clickX / width) * 100 + "%");
  });
  $(audio).bind("ended", function (e) {
    $(".next").trigger("click");
  });
});
