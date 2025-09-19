/assets/*
  Access-Control-Allow-Origin: *
  Cache-Control: public, max-age=31536000
<script>
    // Create meta tags
    const metaCacheControl = document.createElement('meta');
    metaCacheControl.setAttribute('http-equiv', 'Cache-Control');
    metaCacheControl.setAttribute('content', 'public, max-age=30d');

    const metaPragma = document.createElement('meta');
    metaPragma.setAttribute('http-equiv', 'Pragma');
    metaPragma.setAttribute('content', 'cache');

    const metaExpires = document.createElement('meta');
    metaExpires.setAttribute('http-equiv', 'Expires');
    metaExpires.setAttribute('content', 'Thu, 21 Oct 2027 07:28:00 GMT');

    // Append meta tags to the head
    document.head.appendChild(metaCacheControl);
    document.head.appendChild(metaPragma);
    document.head.appendChild(metaExpires);
</script>
