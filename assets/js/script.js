		$(document).ready(function(){
			var socket = io.connect();

            socket.on('search result', function(data){
                if(data.tweet.text){
                    $('.tweet').prepend('<li class="left clearfix tweet">' +
                    	'<span class="chat-img pull-left">' +
                            	'<img src='+ data.tweet.user.profile_image_url +' alt="User Avatar" class="img-circle" />' +
                        	'</span>' +
                            '<div class="chat-body clearfix">' +
                                '<div class="header">' +
                                    '<strong class="primary-font">' + data.tweet.user.name + '</strong> @' + data.tweet.user.screen_name + '<small class="pull-right text-muted">' +
                                        '<span class="glyphicon glyphicon-heart"></span>'+ data.tweet.favorite_count +'</small>' +
                                '</div>' +
                                '<p>'+ data.tweet.text +'</p>' +
                            '</div>' +
                        '</li>').hide().fadeIn();
                }
            });

            $('#hashtag').keypress(function(event) {
                if(event.keyCode == 13) {
                    var hashtag = $(this).val();

                    if(hashtag) {
                        socket.emit('search tweet', {'hashtag': hashtag, 'status': true});
                    }
                }
            });  

		});
