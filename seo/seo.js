(function() {
    function addMeta(name, content, property = false) {
        var meta = document.createElement('meta');
        if (property) meta.setAttribute('property', name);
        else meta.setAttribute('name', name);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
    }

    function addLink(rel, href) {
        var link = document.createElement('link');
        link.setAttribute('rel', rel);
        link.setAttribute('href', href);
        document.head.appendChild(link);
    }

    var shortDescription = "Графический и UI/UX дизайнер, фотограф, ретушёр. Александр Кравви (Kravvi).";
    var pageUrl = "https://kravvi.github.io/";
    
    // 1. Базовые мета-теги
    addMeta('keywords', 'kravvi, кравви, alexandr kravvi, alexander kravvi, александр кравви, фотограф, дизайнер, ui/ux, ретушер');
    addMeta('description', shortDescription);
    addMeta('author', 'Александр Кравви');
    
    // 2. Индексация и канонический URL (защита от дублей)
    addMeta('robots', 'index, follow');
    addLink('canonical', pageUrl);
    
    // 3. Open Graph (для соцсетей)
    addMeta('og:title', 'Александр Кравви (Kravvi) — Дизайнер и Фотограф', true);
    addMeta('og:description', shortDescription, true);
    addMeta('og:url', pageUrl, true);
    addMeta('og:type', 'profile', true);
    addMeta('og:locale', 'ru_RU', true);
    
    // 4. Twitter Cards (для Twitter/X)
    addMeta('twitter:card', 'summary_large_image');
    addMeta('twitter:title', 'Александр Кравви (Kravvi) — Дизайнер и Фотограф');
    addMeta('twitter:description', shortDescription);
})();
