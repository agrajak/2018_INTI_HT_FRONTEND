function movieSearch(pageDirection) {
}

function makeSelectLink(movieInfo) {
    var title = movieInfo.movieNm;
    var director = "None";
    var titleEn = movieInfo.movieNmEn;

    if(movieInfo.directors.length > 0) {
        director = movieInfo.directors[0].peopleNm;
    }

    var tag = "<div><a href='javascript:void(0);' onclick='selectLink(\"" + title + "\",\"" + director + "\", \"" + titleEn + "\")'>";
    tag += title;
    tag += "</a></div>";
    return tag;
}

function selectLink(title, director, titleEn) {
    if(titleEn == "") {
        alert("야한거 보지마! 병시나");
        return;
    }

    $('#movie-list').html("");
    $("#pagination").css("display", "none");

    $('#title').text(title);
    $('#director').text(director);
    $('#titleEn').text(titleEn);
}
