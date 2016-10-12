var cameras = [];

$(function() {
	//var vlc = getVLC("vlc");

	/*
	$.each(navigator.plugins, function() {
    	$('body').append(this.name);
    	$('body').append('<br/>');    
	});
	*/

	//if (vlc == undefined)	
    load_cameras();

    //setTimeout(refresh_secs, 1000);

    //$('#map-div').loadingOverlay();
    //$('#video-div').loadingOverlay();

    //var player = videojs('my_video_1');
 
	//player.src({
	//  src: "http://10.197.0.18/video/test.m3u8",
	//  type: 'application/x-mpegURL',
	  //withCredentials: true
	//});
});

function play_buttons() {
	$('.play-button').on('click', function(e) {
        e.preventDefault();
        console.log('play ' + $(this).attr('camera-id'));

        var camera = null;

        for (var i = 0; i < cameras.length; i++) {
        	if (cameras[i].id == $(this).attr('camera-id')) {
        		camera = cameras[i];
        		break;
        	}
        }

        var player = videojs('my_video_1');
 
		player.src({
		  src: "/ipcam/video/" + camera.id + ".m3u8",
		  type: 'application/x-mpegURL',
		  //withCredentials: true
		});

		player.ready(function(){
			var myPlayer = this;
			myPlayer.play();
		});
    });
}

function load_cameras() {
	$.ajax({
        url: '/cgi-bin/ipcam?action=cameras',
        type: "GET",
        dataType: "json",
        context: this,
        success: function(data, textStatus, jqXHR)
        {
            console.log(data);            
            cameras = data;
            var html = '';

			for (var i = 0; i < cameras.length; i++) {
            	html += '<tr><td>' + cameras[i].name + '</td><td><button camera-id="' + cameras[i].id + '" class="btn btn-primary play-button">Play</button></td></tr>';
            }

            $('#cameras-table').html(html);
			play_buttons();
        },
        complete: function(jqXHR, textStatus) {
            //console.log( "messages complete" );
            //messages_updating = false;
        }
    });
}

function epoch() {
    return Math.floor(new Date() / 1000);
}
