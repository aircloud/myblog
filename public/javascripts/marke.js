/**
 * Created by hh on 16/8/2016.
 */
$.fn.marke = function(options) {
    var defaults = {
        foreground: '#407979',
        background: 'white',
        lineHeight: '30px'
    };
    var opts = $.extend(defaults, options);

    var source_tag=$(opts.source),
        return_text,
        source_text = source_tag.val()||source_tag.html(),
        exp1 = new RegExp("(#){2}(.*)\n","g"),
        exp2 = new RegExp("#{3}(.*)\n","g"),
        exp3 = new RegExp("####(.*)\n","g"),
        exp4 = new RegExp("#####*(.*)\n","g"),
        exp4_1=/<(.*?)\n/g;
        exp5 = /\*\*(.*?)\*\*/g,
        exp6 = /\n/g,
        exp7 = /^(.*?)</g,
        exp8 = /\*(.*?)\*/g,
        exp9 = /```(.*?)```/g,
        exp10 = /`(.*?)`/g,
        exp11 = /(<br\/>(\s)*)+/g,
        exp13 = /<\/p>(<br\/>)+/g,
        exp12 = /(<\/p>)+/g;

        // console.log(source_text);
    return_text=source_text.replace(exp4,"<p style='line-height:"+opts.lineHeight+";font-size: 16px;color:'"+opts.foreground+">$1</p>");
    return_text=return_text.replace(exp3,"<p style='line-height:"+opts.lineHeight+";font-size: 19px;font-weight:500;color:'"+opts.foreground+">$1</p>");
    return_text=return_text.replace(exp2,"<p style='line-height:"+opts.lineHeight+";font-size: 22px;font-weight:600;color:'"+opts.foreground+">$1</p>");
    return_text=return_text.replace(exp1,"<p style='line-height:"+opts.lineHeight+";border-bottom:1px solid "+opts.foreground+";font-size: 25px;font-weight:600;color:'"+opts.foreground+">$2</p>");
    return_text=return_text.replace(exp4_1,"<div style='background-color: #F3F4F8;padding: 10px;line-height:'"+opts.lineHeight+"'>$1</div>");
    return_text=return_text.replace(exp5,"<b>$1</b>");
    return_text=return_text.replace(exp6,"<br/>");
    return_text=return_text.replace(exp7,"<p>$1</p><");
    return_text=return_text.replace(exp8,"<i>$1</i>");
    return_text=return_text.replace(exp9,"<pre><code>$1</code></pre>");
    return_text=return_text.replace(exp10,"<span style='background-color: lightgrey'>$1</span>");
    return_text=return_text.replace(exp11,"<br/>");
    return_text=return_text.replace(exp12,"</p><br/>");
    return_text=return_text.replace(exp13,"</p><br/>");
    return_text=return_text.replace(/(\s)+/g," ");
    return_text="<div style='line-height:"+opts.lineHeight+"'>"+return_text+"</div>";

    console.log(return_text);

    $(this).html(return_text);

    // hljs.initHighlightingOnLoad();
    return $(this);
    // Extend our default options with those provided.

    // Our plugin implementation code goes here.
};