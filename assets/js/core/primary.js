<script>
document.addEventListener(&quot;DOMContentLoaded&quot;, () =&gt; {
const bdis = document.body;
/* Header image link */
const hil = Attribution1.querySelector(&quot;div.image-attribution a&quot;);
if (hil) hil.setAttribute(&quot;rel&quot;, &quot;nofollow&quot;);
/* Floating button observer */
function mbtn(item, state) {
switch (state) {
case &#39;fadeout&#39;: <b:if cond='data:view.isSingleItem'>if (item.id === &quot;back_button&quot;) {
mbtn(summary_button, &#39;fadeout&#39;); sbtn(&#39;fadeout&#39;); } else if (item.id === &quot;comment_button&quot; &amp;&amp; !back_button.classList.contains(&quot;fadeout&quot;)) {
mbtn(summary_button, &#39;fadein&#39;); sbtn(&#39;fadein&#39;); }</b:if>
requestAnimationFrame(() =&gt; item.classList.add(&quot;fadeout&quot;)); break;
case &#39;fadein&#39;:<b:if cond='data:view.isSingleItem'>if (item.id === &quot;back_button&quot; &amp;&amp; comment_button.classList.contains(&quot;fadeout&quot;)) {
mbtn(summary_button, &#39;fadein&#39;); sbtn(&#39;fadein&#39;); } else if (item.id === &quot;comment_button&quot;) {
mbtn(summary_button, &#39;fadeout&#39;); sbtn(&#39;fadeout&#39;); }</b:if>
requestAnimationFrame(() =&gt; item.classList.remove(&quot;fadeout&quot;)); }}
<b:if cond='data:view.isSingleItem'>function sbtn(state) {
switch (state) {
case &#39;fadeout&#39;: if (!wfsc.classList.contains(&quot;hidden&quot;)) {
wfsc.classList.add(&quot;hidden&quot;); wfsc.classList.add(&quot;kept&quot;); }
break;
case &#39;fadein&#39;: if (wfsc.classList.contains(&quot;kept&quot;)) {
wfsc.classList.remove(&quot;hidden&quot;); wfsc.classList.remove(&quot;kept&quot;); }}}</b:if>
const floatButtonObserver = new IntersectionObserver(entries =&gt; {
entries.forEach(entry =&gt; {
const button = entry.target.id === &quot;header&quot; ? back_button : comment_button;
if (entry.isIntersecting) {
if (button === back_button) {
if (!button.classList.contains(&quot;fadeout&quot;)) {
mbtn(button, &#39;fadeout&#39;); fbt.style.width = &quot;0&quot;; }} else {
mbtn(button, &#39;fadein&#39;); }
return; } else if (pageYOffset !== 0) {
if (entry.rootBounds.bottom &gt; entry.boundingClientRect.bottom) {
if (button === back_button) {
mbtn(button, &#39;fadein&#39;); fbt.style.width = &quot;100%&quot;; return; } else {
mbtn(summary_button, &quot;fadeout&quot;); mbtn(comment_button, &quot;fadein&quot;); return; }} else {
mbtn(button, &#39;fadeout&#39;); }}}); });
/* Sub content observer */
function fxsb() {
sbct.classList.add(&quot;slider&quot;); sbct.classList.add(&quot;sidebar-invisible&quot;); hamburger_menu.style.transform = &quot;rotateZ(0)&quot;; sbct.ariaHidden = &quot;true&quot;; }
function rtsb() {
sbct.classList.remove(&quot;slider&quot;); sbct.classList.remove(&quot;sidebar-invisible&quot;); hamburger_menu.style.transform = &quot;rotateZ(90deg)&quot;; sbct.ariaHidden = &quot;false&quot;; }
const subContentObserver = new IntersectionObserver(entries =&gt; {
entries.forEach(entry =&gt; {
<b:if cond='data:view.isSingleItem'>
if (entry.target.id === &quot;comments&quot;) {
if (entry.isIntersecting) {
if (comments.querySelector(&quot;div.comment-thread&quot;)) comments.querySelectorAll(&quot;a.comment-reply&quot;).forEach(cmrl =&gt; cmrl.addEventListener(&quot;click&quot;, () =&gt; commentForm.style.height = &quot;90px&quot;));
const ifc = document.createElement(&quot;script&quot;);
ifc.insertAdjacentHTML(&quot;afterbegin&quot;, commentForm.dataset.script); commentForm.parentNode.appendChild(ifc);window.addEventListener(&quot;blur&quot;, () =&gt; {
if (commentform === document.activeElement) {
commentform.style.height = &quot;&quot;;
<b:if cond='data:blog.isMobileRequest'> back_button.classList.add(&quot;invisible&quot;); }});
window.addEventListener(&quot;focus&quot;, () =&gt; {
if (commentform !== document.activeElement) {
back_button.classList.remove(&quot;invisible&quot;);</b:if>}});
subContentObserver.unobserve(comments); }}</b:if>
<b:if cond='data:skin.vars.sidebar_width or data:skin.vars.content_margin'>
if (entry.target.id === &quot;sidebar_wrapper&quot;) {
if (entry.isIntersecting) {
if (sbct.classList.contains(&quot;slider&quot;) || Blog1.firstElementChild.classList.contains(&quot;no-posts-message&quot;) || !Blog1.firstElementChild.textContent) rtsb(); else hamburger_menu.style.transform = &quot;rotateZ(90deg)&quot;; } else if (entry.rootBounds.bottom &lt; entry.boundingClientRect.bottom || entry.boundingClientRect.bottom === 0 || Blog1.firstElementChild.className.indexOf(&quot;message&quot;) !== -1) {
fxsb(); }}</b:if>}); }, {
rootMargin: &quot;240px&quot;});
/* Back button */
floatButtonObserver.observe(header);
<b:if cond='data:skin.vars.sidebar_width or data:skin.vars.content_margin'>
const sbct = bdis.querySelector(&quot;section.sidebar-container&quot;);
if (getComputedStyle(main).width === &quot;<data:skin.vars.content_width/>&quot;) {
/* Sidebar for desktop */
<b:if cond='data:view.isMultipleItems'>if (bdis.classList.contains(&quot;no-sidebar&quot;)) sbct.style.display = &quot;none&quot;;</b:if>
function schb(event) {
bdis.animate([{opacity:0}, {opacity:1}], {duration: 300}); bdis.classList.toggle(&quot;no-sidebar&quot;);
switch (event.currentTarget.id) {
case &quot;sdbtn&quot;: <b:if cond='data:view.isMultipleItems'>if (getComputedStyle(attribution).display === &quot;none&quot;) sbct.style.display = &quot;none&quot;; </b:if>localStorage.setItem(&quot;content&quot;, &quot;no-sidebar&quot;); break;
case &quot;subtn&quot;: <b:if cond='data:view.isMultipleItems'>sbct.style.display = &quot;flex&quot;; </b:if>localStorage.setItem(&quot;content&quot;, &quot;&quot;); }}
sdbtn.addEventListener(&quot;click&quot;, schb); subtn.addEventListener(&quot;click&quot;, schb);
if (main.clientHeight + sub_main.clientHeight &gt; sidebar_wrapper.clientHeight &amp;&amp; sidebar_wrapper.clientHeight &gt; window.innerHeight) sidebar_wrapper.classList.add(&quot;stickybottom&quot;); else sidebar_wrapper.classList.add(&quot;stickytop&quot;); } else {
/* Sidebar for mobile */
subContentObserver.observe(sidebar_wrapper);
/* Hamburger menu */
const bcsd = document.createElement(&quot;div&quot;);
bcsd.classList.add(&quot;dim-overlay&quot;); bcsd.classList.add(&quot;fadeout&quot;); bdis.appendChild(bcsd);
function hbmb() {
if (sbct.classList.contains(&quot;slider&quot;)) {
bcsd.classList.remove(&quot;fadeout&quot;); requestAnimationFrame(() =&gt; sbct.classList.add(&quot;slidein&quot;)); sbct.ariaHidden = &quot;false&quot;; sbct.classList.remove(&quot;sidebar-invisible&quot;); bdis.classList.add(&quot;sidebar-visible&quot;); } else {
location.href = &quot;#attribution&quot;; }}
hamburger_menu.addEventListener(&quot;click&quot;, hbmb);
/* Close button */
function clsb() {
sbct.classList.remove(&quot;slidein&quot;); requestAnimationFrame(() =&gt; {
sbct.classList.add(&quot;slideout&quot;); bcsd.classList.add(&quot;fadeout&quot;); }); sbct.ariaHidden = &quot;true&quot;; bdis.classList.remove(&quot;sidebar-visible&quot;); }
close_button.addEventListener(&quot;click&quot;, clsb);
bcsd.addEventListener(&quot;click&quot;, clsb);
sbct.addEventListener(&quot;transitionend&quot;, () =&gt; {
if (sbct.classList.contains(&quot;slideout&quot;)) {
sbct.classList.add(&quot;sidebar-invisible&quot;); sbct.classList.remove(&quot;slideout&quot;); }});
/* Search button */
<b:if cond='data:widgets.BlogSearch.first.id == &quot;BlogSearch1&quot;'>
const scsp = search_top.querySelector(&quot;input.search-space&quot;), shrb = main.querySelector(&quot;div.share-buttons&quot;);
swc.ariaHidden = &quot;true&quot;; search_expand.addEventListener(&quot;click&quot;, () =&gt; {
search_expand.classList.toggle(&quot;reverse&quot;);
if (getComputedStyle(search_top).display === &quot;none&quot;) {
if (getComputedStyle(fbt).width !== &quot;0&quot; &amp;&amp; getComputedStyle(sis).display === &quot;none&quot;) fbt.classList.add(&quot;hidden&quot;);  search_top.style.display = &quot;inline&quot;; floating_share.style.display = &quot;none&quot;; swc.ariaHidden = &quot;false&quot;; scsp.focus(); return; }
if (getComputedStyle(fbt).width !== &quot;0&quot; &amp;&amp; getComputedStyle(sis).display === &quot;none&quot;) fbt.classList.remove(&quot;hidden&quot;); 
search_top.style.display = &quot;none&quot;; floating_share.style.display = &quot;flex&quot;; swc.ariaHidden = &quot;true&quot;; });
</b:if>}
/* Share menu */
const spgu = &quot;<data:view.url.canonical/>&quot;, spgt = document.title;
shbtn.addEventListener(&quot;click&quot;, () =&gt; {
shbtn.classList.toggle(&quot;reverse&quot;);
if (getComputedStyle(sis).display === &quot;none&quot;) {
sis.style.display = &quot;flex&quot;; fbt.classList.add(&quot;hidden&quot;);
if (cbcp.classList.contains(&quot;hidden&quot;)) {
if (getComputedStyle(translate_top).width !== 0) translate_top.classList.add(&quot;hidden&quot;);
tlbtn.classList.add(&quot;hidden&quot;); }} else {
sis.style.display = &quot;none&quot;; fbt.classList.remove(&quot;hidden&quot;);
if (cbcp.classList.contains(&quot;hidden&quot;)) {
if (getComputedStyle(translate_top).width === &quot;auto&quot;) translate_top.classList.remove(&quot;hidden&quot;);
tlbtn.classList.remove(&quot;hidden&quot;); }}});
<b:if cond='!data:blog.isPrivateBlog and !data:view.isPreview'>fbbtn.addEventListener(&quot;click&quot;, () =&gt; {
location.href = &quot;https://www.facebook.com/sharer/sharer.php?u=&quot; + spgu; });
xbtn.addEventListener(&quot;click&quot;, () =&gt; {
location.href = &quot;https://x.com/intent/post?url=&quot; + spgu + &quot;&amp;text=&quot; + encodeURIComponent(spgt); });
prbtn.addEventListener(&quot;click&quot;, () =&gt; {
location.href = &quot;https://pinterest.com/pin/create/button/?url=&quot; + spgu; });
rdbtn.addEventListener(&quot;click&quot;, () =&gt; location.href = &quot;https://www.reddit.com/submit?url=&quot; + spgu + &quot;&amp;title=&quot; + encodeURIComponent(spgt));
mlbtn.addEventListener(&quot;click&quot;, () =&gt; {
location.href = &quot;<b:eval expr='&quot;https://www.blogger.com/email-post.g?blogID=&quot; + data:blog.blogId + &quot;&amp;postID=&quot; + data:blog.postId'/>&quot;; });
cbcp.addEventListener(&quot;click&quot;, () =&gt; {
window.navigator.clipboard.writeText(spgu).then(() =&gt; {
alert (cbcp.dataset.cbms); }); });</b:if>
<b:else/>
/* Feed button */
<b:if cond='!data:blog.isPrivateBlog and !data:view.isPreview'>febtn.addEventListener(&quot;click&quot;, () =&gt; location.href = &quot;<b:eval expr='data:blog.homepageUrl.canonical path &quot;feeds/posts/default?alt=rss&quot;'/>&quot;);</b:if>
</b:if>
/* Expand button */
const rits = bdis.querySelectorAll(&quot;div.remaining-items&quot;);
if (rits[0]) {
rits.forEach(rit =&gt; {
const rith = rit.clientHeight;
rit.style.height = &quot;0&quot;; rit.nextElementSibling.addEventListener(&quot;click&quot;, event =&gt; {
event.target.classList.add(&quot;hidden&quot;); rit.style.height = rith + &quot;px&quot;; event.target.nextElementSibling.classList.remove(&quot;hidden&quot;); }); rit.nextElementSibling.nextElementSibling.addEventListener(&quot;click&quot;, event =&gt; {
event.target.parentElement.scrollIntoView({behavior: &quot;smooth&quot;, block: &quot;center&quot;}); event.target.classList.add(&quot;hidden&quot;); rit.style.height = &quot;0&quot;; event.target.previousElementSibling.classList.remove(&quot;hidden&quot;); }); }); }
/* Contact form */
<b:if cond='data:blog.isMobileRequest and data:widgets.ContactForm.first'>
const fcpts = <b:eval expr='data:widgets.ContactForm.length == 1 ? &quot;ContactForm1&quot; : &quot;bdis&quot;'/>.querySelectorAll(&quot;input.contact-form-name, input.contact-form-email, textarea.contact-form-email-message&quot;);
fcpts.forEach(fcpt =&gt; {
fcpt.addEventListener(&quot;focus&quot;, () =&gt; {
if (!sbct.classList.contains(&quot;slider&quot;)) {
if (comment_button) comment_button.classList.add(&quot;invisible&quot;);
back_button.classList.add(&quot;invisible&quot;); }});
fcpt.addEventListener(&quot;blur&quot;, () =&gt; {
if (!sbct.classList.contains(&quot;slider&quot;)) {
if (comment_button) comment_button.classList.remove(&quot;invisible&quot;);
back_button.classList.remove(&quot;invisible&quot;); }}); });</b:if>
<b:if cond='data:view.isMultipleItems'>
/* Infinite scroll */
const bpct = Blog1.firstElementChild;
if (bpct.classList.contains(&quot;hfeed&quot;) &amp;&amp; bpct.textContent) {
const bpg = bpct.querySelector(&quot;nav.blog-pager&quot;), smwds = sub_main.querySelectorAll(&quot;div.widget&quot;), bthg = floating_bar.clientHeight;
let npl = bpg.firstElementChild;
if (smwds[0]) smwds.forEach(smwd =&gt; smwd.style.display = &quot;none&quot;);
attribution.style.display = &quot;none&quot;;
if (npl) sidebar_wrapper.classList.add(&quot;swcn&quot;); else bpg.remove();
function scrollStop(event) {
event.preventDefault(); }
function lsch() {
if (getComputedStyle(sbct).display === &quot;none&quot;) sbct.style.display = &quot;flex&quot;;
if (sbct.classList.contains(&quot;slider&quot;)) sidebar_wrapper.style.display = &quot;block&quot;;
if (smwds[0]) smwds.forEach(smwd =&gt; smwd.style.display = &quot;block&quot;);
attribution.style.display = &quot;block&quot;; sidebar_wrapper.classList.remove(&quot;swcn&quot;); rmmg(&#39;end&#39;); }
function rmmg(state) {
if (sub_main.style.marginTop) sub_main.style.marginTop = &quot;&quot;;
if (bdis.style.marginBottom) bdis.style.marginBottom = &quot;&quot;
if (state !== &#39;end&#39;) sub_main.style.marginTop = bthg + &quot;px&quot;;
if (state !== &#39;pass&#39;) nextIndexObserver.disconnect(); }
function isac(state, scroll) {
switch (state) {
case 0: sub_main.style.marginTop = scroll + bthg + &quot;px&quot;; bdis.style.marginBottom = bthg + &quot;px&quot;; break;
case 1: sub_main.style.marginTop = bthg + &quot;px&quot;; break;
case 2: if (sub_main.style.marginTop) {
sub_main.style.marginTop = &quot;&quot;; }
if (!bdis.style.marginBottom) {
bdis.style.marginBottom = bthg + &quot;px&quot;; }
default: if (scroll !== &#39;on&#39;) return; }
new Promise ((resolve, reject) =&gt; {
if (add_button.classList.contains(&quot;fadeout&quot;)) {
add_button.classList.remove(&quot;fadeout&quot;); document.addEventListener(&quot;mousewheel&quot;, scrollStop, {passive: false}); document.addEventListener(&quot;touchmove&quot;, scrollStop, {passive: false}); bpct.ariaBusy = &quot;true&quot;; resolve(); } else {
reject(&#39;Too fast&#39;); }}).then(async () =&gt; {
const response = await fetch(npl.href);
if (!response.ok) throw &#39;Connection failed&#39;;
const text = await response.text(), file = new DOMParser().parseFromString(text, &quot;text/html&quot;), bats = file.querySelectorAll(&quot;div.hfeed&gt;*&quot;);
npl = file.querySelector(&quot;a.older-link&quot;);
if (npl) npl.parentNode.remove(); else if (!bats[0]) throw &#39;cut&#39;; else bats[bats.length - 1].lastElementChild.remove();
Promise.all([...bats].map(bat =&gt; {
const nbat = document.adoptNode(bat), pssc = nbat.querySelector(&quot;p.summary&gt;script&quot;);
if (pssc) pssc.parentElement.insertAdjacentHTML(&quot;afterbegin&quot;, /`([^]+)`/.exec(pssc.textContent)[1].replace(/(&lt;([^&gt;]+)&gt;)/g, &#39;&#39;));
return nbat; })).then(results =&gt; results.forEach(result =&gt; bpct.appendChild(result))); }).catch(error =&gt; {
switch (error) {
case &#39;Too fast&#39;: rmmg(&#39;pass&#39;); throw &#39;&#39;;
case &#39;Connection failed&#39;: bpct.after(bpg); rmmg(&#39;stop&#39;); break;
case &#39;cut&#39;: return lsch();
default: bpct.after(bpg); rmmg(&#39;others&#39;); }}).then(() =&gt; {
document.removeEventListener(&quot;mousewheel&quot;, scrollStop, {passive: false}); document.removeEventListener(&quot;touchmove&quot;, scrollStop, {passive: false}); bpct.ariaBusy = &quot;false&quot;; add_button.classList.add(&quot;fadeout&quot;); });
if (bpg) bpg.remove(); }
const nextIndexObserver = new IntersectionObserver(entries =&gt; {
entries.forEach(entry =&gt; {
if (npl) {
const sgtm = entry.rootBounds.height - entry.boundingClientRect.top - bthg;
if (window.pageYOffset === 0) {
const iolm = window.innerHeight - entry.boundingClientRect.top + bthg;
if (iolm &gt; 0) {
isac(0, iolm); } else if (parseInt(sub_main.style.marginTop) &gt;= bthg) {
isac(1, 0); } else {
isac(2, 0); }
return; } else if (sgtm &gt; 0) {
isac(2, &#39;on&#39;); }
return; }
lsch(); }); }, {
rootMargin: bthg + &quot;px&quot;});
nextIndexObserver.observe(sub_main); }
<b:elseif cond='data:view.isSingleItem'/>
/* Comment */
if (Blog1.querySelector(&quot;section#comments&quot;)) {
const commentForm = Blog1.querySelector(&quot;iframe#comment-editor&quot;);
if (commentForm) {
const avics = comments.querySelectorAll(&quot;div.avatar-image-container&quot;);
if (avics[0]) {
avics.forEach(avic =&gt; {
if (/resources.blogblog\.com\/img\/blank\.gif/.test(avic.firstElementChild.src)) {
avic.insertAdjacentHTML(&quot;afterbegin&quot;, &quot;<svg aria-label='Avatar' class='avatarIcon' role='img'><use href='/responsive/sprite_v1_6.css.svg#ic_person_black_24dp'/></svg>&quot;); } else {
avic.firstElementChild.alt = &quot;Avatar&quot;; }}); }
subContentObserver.observe(comments); }
<b:if cond='!data:view.isPreview'>floatButtonObserver.observe(comments);</b:if> }
/* Summary button */
const pb = Blog1.querySelector(&quot;div.entry-content&quot;), hdgs = pb.querySelectorAll(&quot;h1, h2, h3&quot;);
if (hdgs[0]) {
const dts = document.createElement(&quot;details&quot;), smr = document.createElement(&quot;summary&quot;), fid = document.createElement(&quot;ol&quot;);
dts.open = true; smr.insertAdjacentHTML(&quot;afterbegin&quot;, &quot;Headings&quot;); fid.className = &quot;mdr&quot;; dts.appendChild(smr); dts.appendChild(fid);
let n;
hdgs.forEach((hdg, i) =&gt; {
const tci = document.createElement(&quot;li&quot;), tcl = document.createElement(&quot;a&quot;), tn = Number(hdg.tagName.substring(1));
if (!hdg.id) hdg.id = `content_${i + 1}`; tcl.href = `#${hdg.id}`; tcl.textContent = hdg.textContent; tci.appendChild(tcl);
if (i !== 0 &amp;&amp; tn &gt; 1) {
const fis = fid.querySelectorAll(&quot;li&quot;), lid = fis[fis.length - 1], dr = tn - n;
if (dr &gt; 0) {
const idx = document.createElement(&quot;ol&quot;);
idx.appendChild(tci); lid.appendChild(idx); } else if (dr === 0) {
lid.after(tci); } else {
lid.closest(&quot;ol&quot;).parentElement.after(tci); }} else {
fid.appendChild(tci); }
n = tn; });
wfsc.firstElementChild.insertAdjacentElement(&quot;afterbegin&quot;, dts); summary_button.firstElementChild.classList.add(&quot;original-icon&quot;); summary_button.firstElementChild.setAttribute(&quot;viewBox&quot;, &quot;0 0 24 24&quot;); summary_button.firstElementChild.innerHTML = &quot;&lt;path d=&#39;M2 4 H22 M7.3 9.4 H22 M7.3 14.7 H22 M7.3 20 H22&#39;/&gt;&lt;circle cx=&#39;3.5&#39; cy=&#39;9.4&#39; r=&#39;0.5&#39;/&gt;&lt;circle cx=&#39;3.5&#39; cy=&#39;14.7&#39; r=&#39;0.5&#39;/&gt;&lt;circle cx=&#39;3.5&#39; cy=&#39;20&#39; r=&#39;0.5&#39;/&gt;&quot;; }
const aab = wfsc.querySelector(&quot;div.smtx&quot;).lastElementChild, pau = aab.previousElementSibling;
pau.textContent = `${Blog1.querySelector(&quot;a.published&gt;time&quot;).textContent} / ${Blog1.querySelector(&quot;li.updated&gt;time&quot;).textContent}`;
if (Blog1.querySelector(&quot;.fn&quot;)) aab.insertAdjacentHTML(&quot;afterbegin&quot;, `${Blog1.querySelector(&quot;.fn&quot;).textContent} - `);
const cpps = wfsc.querySelectorAll(&quot;ol.mdr a&quot;);
function scpp() {
wfsc.classList.add(&quot;hidden&quot;); cpps.forEach(cpp =&gt; cpp.removeEventListener(&quot;click&quot;, scpp)); }
summary_button.addEventListener(&quot;click&quot;, () =&gt; {
wfsc.classList.toggle(&quot;hidden&quot;);
if (cpps[0]) cpps.forEach(cpp =&gt; cpp.addEventListener(&quot;click&quot;, scpp)); }); </b:if>});</script>
