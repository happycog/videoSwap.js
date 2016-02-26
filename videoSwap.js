function videoSwap() {
  if ( $('[data-video-swap]').length ) {
    $(document).on('click', '[data-video-swap]', function(event) {
        var el = $(this);
        var parent = el.parent();
        var url = el.data('video-swap');
        var pieces = url.split(/:\/\//);
        var source = pieces[0];
        if (!source) return;

        pieces = pieces[1].split(/\?/);
        var id = pieces[0];
        if (!id) return;

        var queryString = pieces[1];

        switch (source) {
            case 'youtube':
                el.replaceWith('<iframe width="560" height="315" src="https://www.youtube.com/embed/'+id+'?'+queryString+'" frameborder="0" allowfullscreen></iframe>');
                parent.fitVids();
                event.preventDefault();
                break;

            case 'youku':
                el.replaceWith('<iframe width="500" height="281" src="http://player.youku.com/embed/'+id+'?'+queryString+'" frameborder="0" allowfullscreen></iframe>');
                parent.fitVids({customSelector: "iframe[src^='http://player.youku.com']"});
                event.preventDefault();
                break;

            case 'brainshark':
                el.replaceWith('<iframe width="840" height="518" src="https://www.brainshark.com/wlgore/vu?pi='+id+'&amp;pause=1&amp;nrs=1&amp;'+queryString+'" frameborder="0" scrolling="no"></iframe>');
                parent.fitVids({customSelector: "iframe[src^='http://www.brainshark.com']"});
                event.preventDefault();
                break;

            case 'vimeo':
                el.replaceWith('<iframe width="500" height="281" src="https://player.vimeo.com/video/'+id+'?'+queryString+'"  frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
                parent.fitVids();
                event.preventDefault();
                break;

            case 'brightcove':
                var objectEl = '<object id="myExperience'+id+'" class="BrightcoveExperience">';
                objectEl += '<param name="playerID" value="'+id+'" />';
                objectEl += '<param name="@videoPlayer" value="'+id+'" />';
                objectEl += '<param name="width" value="500" />';
                objectEl += '<param name="height" value="281.25" />';
                objectEl += '<param name="bgcolor" value="#FFFFFF" />';
                objectEl += '<param name="playerKey" value="AQ~~,AAAAyT9nKcE~,EgqWlWONo6mRaB32CrklsYQrJBisK0FS" />';
                objectEl += '<param name="isVid" value="true" />';
                objectEl += '<param name="isUI" value="true" />';
                objectEl += '<param name="dynamicStreaming" value="true" />';
                objectEl += '<param name="includeAPI" value="true" />';
                if (queryString) {
                    var queryVariables = queryString.split(/&(?:amp;)?/);
                    $(queryVariables).each(function() {
                        var keyValue = this.split(/=/);
                        if (keyValue.length == 2) {
                            objectEl += '<param name="'+keyValue[0]+'" value="'+keyValue[1]+'" />';
                        }
                    });
                }
                objectEl += '</object>';
                el.replaceWith(objectEl);
                brightcove.createExperiences();
                parent.fitVids();
                event.preventDefault();
                break;
        }

        return;
    });

  }
}
