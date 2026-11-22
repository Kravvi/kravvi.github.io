(function() {
    function addMeta(name, content, property = false) {
        var meta = document.createElement('meta');
        if (property) meta.setAttribute('property', name);
        else meta.setAttribute('name', name);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
    }

    var shortDescription = "Графический и UI/UX дизайнер, фотограф, ретушёр. Александр Кравви (Kravvi).";
    
    addMeta('keywords', 'kravvi, кравви, alexandr kravvi, alexander kravvi, александр кравви, фотограф, дизайнер, ui/ux, ретушер');
    addMeta('description', shortDescription);
    addMeta('author', 'Александр Кравви');
    
    addMeta('og:title', 'Александр Кравви (Kravvi) — Дизайнер и Фотограф', true);
    addMeta('og:description', shortDescription, true);
    addMeta('og:url', 'https://kravvi.github.io/', true);
    addMeta('og:type', 'profile', true);

    var fullText = "Александр Кравви, графический и UI/UX дизайнер, фотограф, ретушёр. Профессионально занимался фотографией в период с 2015 по 2022 год. Специализировался на художественном портрете, где классическая эстетика сочетается с глубокой авторской постобработкой, наряду с этим Александр активно работал в коммерческих и частных жанрах: от рекламных и репортажных съемок до семейных историй, love story и макрофотографии. Так же Александр активно сотрудничал с многочисленными модельными агентствами, преподавал фотопозирование и фотопластику. Фото работы нередко дополнялись авторскими стихами, которые сейчас можно прочесть в архиве мыслей https://archive.gallery.photo/gallery/thoughts. Профессиональные достижения Александра Кравви отмечены на международном уровне: по итогам престижной фотопремии 35AWARDS (2016, 2017) Александр дважды входил в официальные списки лучших фотографов Республики Беларусь и родного города Гомель. Личное архивное портфолио фоторабот за период с 2015 по 2022 год Александра Кравви находиться в Архиве по этой ссылке https://kravvi.github.io/archive а так же результаты творчества тех лет сохранились в авторском сообществе ВКонтакте https://vk.ru/kravviphotographer. В настоящее время Александр Кравви фокусируется в профессии ui/ux дизайн занимаясь комплексным проектированием и создании цифровых продуктов а так же развивается в сфере высоких технологий используя их в своей работе";

    // ИСПРАВЛЕННАЯ СТРУКТУРА: ProfilePage с вложенным Person
    var schema = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "dateCreated": "2024-01-01T00:00:00+03:00", // Укажите реальную дату создания профиля
        "dateModified": new Date().toISOString(), // Автоматически подставляется текущая дата
        "mainEntity": {
            "@type": "Person",
            "name": "Александр Кравви",
            "alternateName": ["Kravvi", "Alexandr Kravvi", "Кравви"],
            "jobTitle": ["Графический дизайнер", "UI/UX дизайнер", "Фотограф", "Ретушер"],
            "description": fullText,
            "url": "https://kravvi.github.io/",
            "sameAs": [
                "https://kravvi.github.io/archive/",
                "https://vk.ru/kravviphotographer",
                "https://archive.gallery.photo/gallery/thoughts"
            ],
            "award": [
                "35AWARDS 2016 - Лучший фотограф Республики Беларусь и города Гомель",
                "35AWARDS 2017 - Лучший фотограф Республики Беларусь и города Гомель"
            ]
        }
    };

    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
})();
