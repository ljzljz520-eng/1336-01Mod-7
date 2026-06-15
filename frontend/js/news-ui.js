/* =========================================
   新闻公告模块 - UI渲染与路由
   ========================================= */

var newsState = {
    category: 'all',
    year: 'all',
    tag: 'all'
};

function getHomeSectionHTML() {
    var list = getEffectiveNews().slice(0, 4);
    var itemsHTML = list.map(function (item) {
        var cat = NEWS_CATEGORIES[item.category];
        return '\
            <li class="home-news__item">\
                <a href="#/news/' + item.id + '" class="home-news__link">\
                    <span class="home-news__cat" style="background:' + cat.color + '">' + cat.icon + ' ' + cat.label + '</span>\
                    <span class="home-news__title">' + item.title + '</span>\
                    <span class="home-news__date">' + formatDate(item.date) + '</span>\
                </a>\
            </li>';
    }).join('');

    return '\
    <section class="card card--news">\
        <div class="card--news__header">\
            <h2 class="card__title" style="border:none;margin:0;padding:0;">📢 新闻公告</h2>\
            <a href="#/news" class="card--news__more">查看全部 →</a>\
        </div>\
        <div class="card__content">\
            <ul class="home-news__list">' + itemsHTML + '</ul>\
        </div>\
    </section>';
}

function getCategoryTabsHTML() {
    var cats = [{ key: 'all', label: '全部', icon: '📋', color: '#666' }];
    Object.keys(NEWS_CATEGORIES).forEach(function (k) {
        cats.push({ key: k, label: NEWS_CATEGORIES[k].label, icon: NEWS_CATEGORIES[k].icon, color: NEWS_CATEGORIES[k].color });
    });
    return cats.map(function (c) {
        var active = newsState.category === c.key ? ' news-filter__tab--active' : '';
        return '\
            <button class="news-filter__tab' + active + '" \
                    data-category="' + c.key + '"\
                    style="--tab-color:' + c.color + '">\
                <span>' + c.icon + '</span> ' + c.label + '\
            </button>';
    }).join('');
}

function getYearOptionsHTML() {
    var years = getYears();
    var options = '<option value="all">全部年份</option>';
    years.forEach(function (y) {
        var sel = newsState.year === y ? ' selected' : '';
        options += '<option value="' + y + '"' + sel + '>' + y + '年</option>';
    });
    return options;
}

function getTagCloudHTML() {
    var tags = getAllTags();
    var html = '<div class="news-filter__tag-label">🏷️ 标签筛选：</div>\
                <div class="news-filter__tags">';
    html += '<button class="news-filter__tag ' + (newsState.tag === 'all' ? 'news-filter__tag--active' : '') + '" data-tag="all">全部</button>';
    tags.forEach(function (t) {
        var active = newsState.tag === t ? ' news-filter__tag--active' : '';
        html += '<button class="news-filter__tag' + active + '" data-tag="' + t + '">' + t + '</button>';
    });
    html += '</div>';
    return html;
}

function getNewsListHTML() {
    var all = getEffectiveNews();
    var filtered = filterNews(all, newsState.category, newsState.year, newsState.tag);

    if (filtered.length === 0) {
        return '\
        <div class="news-empty">\
            <div class="news-empty__icon">🔍</div>\
            <div class="news-empty__text">暂无符合条件的新闻公告</div>\
            <button class="news-empty__reset" onclick="resetNewsFilter()">重置筛选条件</button>\
        </div>';
    }

    var pinnedItems = filtered.filter(function (i) { return i.pinned; });
    var normalItems = filtered.filter(function (i) { return !i.pinned; });

    var html = '';

    if (pinnedItems.length > 0) {
        html += '<div class="news-pinned">\
                    <div class="news-pinned__header">📌 置顶公告</div>\
                    <div class="news-pinned__list">';
        pinnedItems.forEach(function (item) {
            html += renderNewsItem(item, true);
        });
        html += '</div></div>';
    }

    html += '<div class="news-normal">\
                <div class="news-normal__header">📋 全部公告 <span class="news-normal__count">共 ' + filtered.length + ' 条</span></div>\
                <div class="news-normal__list">';
    (pinnedItems.length > 0 ? pinnedItems.concat(normalItems) : normalItems).forEach(function (item) {
        html += renderNewsItem(item, false);
    });
    html += '</div></div>';

    return html;
}

function renderNewsItem(item, isPinnedGroup) {
    var cat = NEWS_CATEGORIES[item.category];
    var pinHTML = item.pinned && !isPinnedGroup ? '<span class="news-item__pin">📌 置顶</span>' : '';
    var expireHTML = item.pinned && item.pinExpire ? '<span class="news-item__expire">置顶至 ' + formatDate(item.pinExpire) + '</span>' : '';
    var tagsHTML = (item.tags || []).map(function (t) {
        return '<span class="news-item__tag">' + t + '</span>';
    }).join('');

    return '\
    <a href="#/news/' + item.id + '" class="news-item" data-id="' + item.id + '">\
        <div class="news-item__left">\
            <div class="news-item__head">\
                <span class="news-item__cat" style="background:' + cat.color + '15;color:' + cat.color + ';border:1px solid ' + cat.color + '30;">\
                    ' + cat.icon + ' ' + cat.label + '\
                </span>\
                ' + pinHTML + '\
                <span class="news-item__date">📅 ' + formatDate(item.date) + '</span>\
                ' + expireHTML + '\
            </div>\
            <h3 class="news-item__title">' + item.title + '</h3>\
            <p class="news-item__summary">' + item.summary + '</p>\
            <div class="news-item__tags">' + tagsHTML + '</div>\
        </div>\
        <div class="news-item__arrow">→</div>\
    </a>';
}

function renderNewsListPage() {
    return '\
    <div class="news-page">\
        <div class="news-page__header">\
            <div class="news-page__breadcrumb">\
                <a href="#" onclick="navigateToHome();return false;" class="news-page__breadcrumb-link">← 返回首页</a>\
            </div>\
            <h1 class="news-page__title">📢 新闻公告中心</h1>\
            <p class="news-page__subtitle">了解公司动态、行业资讯、产品更新与活动信息</p>\
        </div>\
        \
        <div class="news-filter">\
            <div class="news-filter__section">\
                <div class="news-filter__label">📂 分类筛选：</div>\
                <div class="news-filter__tabs">' + getCategoryTabsHTML() + '</div>\
            </div>\
            <div class="news-filter__section news-filter__section--row">\
                <div class="news-filter__label">📆 年份筛选：</div>\
                <select class="news-filter__select" id="yearSelect">' + getYearOptionsHTML() + '</select>\
            </div>\
            <div class="news-filter__section">' + getTagCloudHTML() + '</div>\
        </div>\
        \
        <div class="news-list-container" id="newsListContainer">\
            ' + getNewsListHTML() + '\
        </div>\
    </div>';
}

function renderNewsDetailPage(id) {
    var result = getNewsById(id);
    if (!result) {
        return '\
        <div class="news-page">\
            <div class="news-page__breadcrumb">\
                <a href="#/news" class="news-page__breadcrumb-link">← 返回新闻列表</a>\
            </div>\
            <div class="news-empty">\
                <div class="news-empty__icon">❌</div>\
                <div class="news-empty__text">新闻不存在或已被删除</div>\
            </div>\
        </div>';
    }

    var item = result.item;
    var index = result.index;
    var list = result.list;
    var cat = NEWS_CATEGORIES[item.category];

    var prevNews = index > 0 ? list[index - 1] : null;
    var nextNews = index < list.length - 1 ? list[index + 1] : null;

    var prevHTML = prevNews
        ? '<a href="#/news/' + prevNews.id + '" class="news-nav__link news-nav__link--prev">\
             <div class="news-nav__label">← 上一篇</div>\
             <div class="news-nav__title">' + prevNews.title + '</div>\
           </a>'
        : '<div class="news-nav__link news-nav__link--disabled">\
             <div class="news-nav__label">← 上一篇</div>\
             <div class="news-nav__title">没有更多了</div>\
           </div>';

    var nextHTML = nextNews
        ? '<a href="#/news/' + nextNews.id + '" class="news-nav__link news-nav__link--next">\
             <div class="news-nav__label">下一篇 →</div>\
             <div class="news-nav__title">' + nextNews.title + '</div>\
           </a>'
        : '<div class="news-nav__link news-nav__link--disabled">\
             <div class="news-nav__label">下一篇 →</div>\
             <div class="news-nav__title">没有更多了</div>\
           </div>';

    var tagsHTML = (item.tags || []).map(function (t) {
        return '<span class="news-detail__tag">' + t + '</span>';
    }).join('');

    var pinHTML = item.pinned ? '<span class="news-detail__pin">📌 置顶公告</span>' : '';

    return '\
    <div class="news-page">\
        <div class="news-page__breadcrumb">\
            <a href="#/news" class="news-page__breadcrumb-link">← 返回新闻列表</a>\
        </div>\
        \
        <article class="news-detail">\
            <header class="news-detail__header">\
                <div class="news-detail__meta">\
                    <span class="news-detail__cat" style="background:' + cat.color + '15;color:' + cat.color + ';border:1px solid ' + cat.color + '30;">\
                        ' + cat.icon + ' ' + cat.label + '\
                    </span>\
                    ' + pinHTML + '\
                    <span class="news-detail__date">📅 ' + formatDate(item.date) + '</span>\
                </div>\
                <h1 class="news-detail__title">' + item.title + '</h1>\
                <div class="news-detail__tags">' + tagsHTML + '</div>\
            </header>\
            \
            <div class="news-detail__content">' + item.content + '</div>\
            \
            <div class="news-detail__divider"></div>\
            \
            <nav class="news-nav">\
                ' + prevHTML + '\
                ' + nextHTML + '\
            </nav>\
        </article>\
    </div>';
}

/* =========================================
   路由与交互逻辑
   ========================================= */

function parseHash() {
    var hash = location.hash.slice(1) || '/';
    var parts = hash.split('/').filter(Boolean);
    return parts;
}

function renderApp() {
    var parts = parseHash();
    var mainContainer = document.querySelector('.main__container');
    if (!mainContainer) return;

    if (parts.length === 0 || (parts.length === 1 && parts[0] === '')) {
        renderHome(mainContainer);
    } else if (parts[0] === 'news') {
        if (parts.length >= 2 && parts[1] !== '') {
            mainContainer.className = 'main__container main__container--single';
            mainContainer.innerHTML = renderNewsDetailPage(parts[1]);
            window.scrollTo(0, 0);
        } else {
            mainContainer.className = 'main__container main__container--single';
            mainContainer.innerHTML = renderNewsListPage();
            bindNewsFilterEvents();
            window.scrollTo(0, 0);
        }
    } else {
        renderHome(mainContainer);
    }
}

function renderHome(container) {
    container.className = 'main__container';
    container.innerHTML = getHomeSectionsHTML();
    bindHomeEvents();
}

function getHomeSectionsHTML() {
    var guideHTML = '\
    <section class="card card--guide">\
        <h2 class="card__title">智能导览</h2>\
        <div class="card__content">\
            <ul class="card__list">\
                <li class="card__item">\
                    <div class="card__item-header">\
                        <span class="card__icon">🎙️</span>\
                        <strong class="card__item-title">AI语音讲解</strong>\
                    </div>\
                    <p class="card__item-desc">结合定位技术，自动识别当前景点，提供生动有趣的语音解说，如同私人导游在侧。</p>\
                </li>\
                <li class="card__item" title="基于AI的AR技术，实时匹配景区实景与讲解内容">\
                    <div class="card__item-header">\
                        <span class="card__icon">👓</span>\
                        <strong class="card__item-title highlight">AR实景导航</strong>\
                    </div>\
                    <p class="card__item-desc">通过手机摄像头将虚拟路标叠加在真实场景中，轻松寻找洗手间、出口及热门打卡点。</p>\
                </li>\
                <li class="card__item">\
                    <div class="card__item-header">\
                        <span class="card__icon">🤖</span>\
                        <strong class="card__item-title">景区智能导览机器人</strong>\
                    </div>\
                    <p class="card__item-desc">实体机器人巡逻，提供问路咨询、安防巡检及简单的互动娱乐服务。</p>\
                </li>\
            </ul>\
        </div>\
    </section>';

    var recommendHTML = '\
    <section class="card card--recommend">\
        <h2 class="card__title">个性化推荐</h2>\
        <div class="card__content">\
            <ul class="card__list">\
                <li class="card__item">\
                    <div class="card__item-header">\
                        <span class="card__icon">🗺️</span>\
                        <strong class="card__item-title">旅游路线定制</strong>\
                    </div>\
                    <p class="card__item-desc">分析用户偏好与历史行为，智能生成"特种兵式"或"慢节奏"等专属游玩路线。</p>\
                </li>\
                <li class="card__item">\
                    <div class="card__item-header">\
                        <span class="card__icon">🏨</span>\
                        <strong class="card__item-title">精准推荐</strong>\
                    </div>\
                    <p class="card__item-desc">根据预算、评分及距离等多维度数据，为您精选最合适的住宿与必游景点。</p>\
                </li>\
            </ul>\
        </div>\
    </section>';

    var serviceHTML = '\
    <section class="card card--service">\
        <h2 class="card__title">智能客服</h2>\
        <div class="card__content">\
            <ul class="card__list">\
                <li class="card__item">\
                    <div class="card__item-header">\
                        <span class="card__icon">💬</span>\
                        <strong class="card__item-title">7×24小时智能问答</strong>\
                    </div>\
                    <p class="card__item-desc">全天候在线，秒级响应票务查询、入园须知等常见问题，服务不打烊。</p>\
                </li>\
                <li class="card__item">\
                    <div class="card__item-header">\
                        <span class="card__icon">🌐</span>\
                        <strong class="card__item-title">多语言实时翻译</strong>\
                    </div>\
                    <p class="card__item-desc">支持几十种语言互译，帮助外籍游客无障碍交流，提升国际化服务水平。</p>\
                </li>\
                <li class="card__item">\
                    <div class="card__item-header">\
                        <span class="card__icon">⚙️</span>\
                        <strong class="card__item-title">投诉自动处理</strong>\
                    </div>\
                    <p class="card__item-desc">智能识别投诉内容并分类工单，加速处理流程，提升游客满意度。</p>\
                </li>\
            </ul>\
        </div>\
    </section>';

    var analysisHTML = '\
    <section class="card card--analysis">\
        <h2 class="card__title">数据分析</h2>\
        <div class="card__content">\
            <ul class="card__list">\
                <li class="card__item">\
                    <div class="card__item-header">\
                        <span class="card__icon">📊</span>\
                        <strong class="card__item-title">景区客流预测</strong>\
                    </div>\
                    <p class="card__item-desc">利用大数据模型预测未来客流高峰，辅助管理部门进行限流与疏导。</p>\
                </li>\
                <li class="card__item">\
                    <div class="card__item-header">\
                        <span class="card__icon">🛍️</span>\
                        <strong class="card__item-title">消费行为分析</strong>\
                    </div>\
                    <p class="card__item-desc">深入挖掘游客消费习惯，助力商家优化商品结构与营销策略。</p>\
                </li>\
                <li class="card__item">\
                    <div class="card__item-header">\
                        <span class="card__icon">📢</span>\
                        <strong class="card__item-title">旅游舆情监测</strong>\
                    </div>\
                    <p class="card__item-desc">全网实时监控景区评价与热点事件，及时预警并引导舆论导向。</p>\
                </li>\
            </ul>\
        </div>\
    </section>';

    return guideHTML + recommendHTML + serviceHTML + getHomeSectionHTML() + analysisHTML;
}

function navigateToHome() {
    location.hash = '';
}

function resetNewsFilter() {
    newsState = { category: 'all', year: 'all', tag: 'all' };
    renderApp();
}

function bindNewsFilterEvents() {
    document.querySelectorAll('.news-filter__tab').forEach(function (btn) {
        btn.addEventListener('click', function () {
            newsState.category = this.getAttribute('data-category');
            renderApp();
        });
    });

    var yearSelect = document.getElementById('yearSelect');
    if (yearSelect) {
        yearSelect.addEventListener('change', function () {
            newsState.year = this.value;
            renderApp();
        });
    }

    document.querySelectorAll('.news-filter__tag').forEach(function (btn) {
        btn.addEventListener('click', function () {
            newsState.tag = this.getAttribute('data-tag');
            renderApp();
        });
    });
}

function bindHomeEvents() {
    var modal = document.querySelector('.modal');
    var modalTitle = document.querySelector('.modal__title');
    var modalBody = document.querySelector('.modal__body');
    var modalClose = document.querySelector('.modal__close');
    if (!modal) return;

    var modalConfig = {
        guide: {
            title: '智能导览',
            body: '\
<ul class="card__list">\
    <li class="card__item">\
        <div class="card__item-header"><span class="card__icon">🎙️</span><strong class="card__item-title">AI语音讲解</strong></div>\
        <p class="card__item-desc">结合定位技术，自动识别当前景点，提供生动有趣的语音解说，如同私人导游在侧。</p>\
    </li>\
    <li class="card__item"><div class="card__item-header"><span class="card__icon">👓</span><strong class="card__item-title highlight">AR实景导航</strong></div>\
        <p class="card__item-desc">通过手机摄像头将虚拟路标叠加在真实场景中，轻松寻找洗手间、出口及热门打卡点。</p>\
    </li>\
    <li class="card__item"><div class="card__item-header"><span class="card__icon">🤖</span><strong class="card__item-title">景区智能导览机器人</strong></div>\
        <p class="card__item-desc">实体机器人巡逻，提供问路咨询、安防巡检及简单的互动娱乐服务。</p>\
    </li>\
</ul>'
        },
        recommend: {
            title: '个性化推荐',
            body: '\
<ul class="card__list">\
    <li class="card__item"><div class="card__item-header"><span class="card__icon">🗺️</span><strong class="card__item-title">旅游路线定制</strong></div>\
        <p class="card__item-desc">分析用户偏好与历史行为，智能生成"特种兵式"或"慢节奏"等专属游玩路线。</p>\
    </li>\
    <li class="card__item"><div class="card__item-header"><span class="card__icon">🏨</span><strong class="card__item-title">精准推荐</strong></div>\
        <p class="card__item-desc">根据预算、评分及距离等多维度数据，为您精选最合适的住宿与必游景点。</p>\
    </li>\
</ul>'
        },
        service: {
            title: '智能客服',
            body: '\
<ul class="card__list">\
    <li class="card__item"><div class="card__item-header"><span class="card__icon">💬</span><strong class="card__item-title">7×24小时智能问答</strong></div>\
        <p class="card__item-desc">全天候在线，秒级响应票务查询、入园须知等常见问题，服务不打烊。</p>\
    </li>\
    <li class="card__item"><div class="card__item-header"><span class="card__icon">🌐</span><strong class="card__item-title">多语言实时翻译</strong></div>\
        <p class="card__item-desc">支持几十种语言互译，帮助外籍游客无障碍交流，提升国际化服务水平。</p>\
    </li>\
    <li class="card__item"><div class="card__item-header"><span class="card__icon">⚙️</span><strong class="card__item-title">投诉自动处理</strong></div>\
        <p class="card__item-desc">智能识别投诉内容并分类工单，加速处理流程，提升游客满意度。</p>\
    </li>\
</ul>'
        },
        analysis: {
            title: '数据分析',
            body: '\
<ul class="card__list">\
    <li class="card__item"><div class="card__item-header"><span class="card__icon">📊</span><strong class="card__item-title">景区客流预测</strong></div>\
        <p class="card__item-desc">利用大数据模型预测未来客流高峰，辅助管理部门进行限流与疏导。</p>\
    </li>\
    <li class="card__item"><div class="card__item-header"><span class="card__icon">🛍️</span><strong class="card__item-title">消费行为分析</strong></div>\
        <p class="card__item-desc">深入挖掘游客消费习惯，助力商家优化商品结构与营销策略。</p>\
    </li>\
    <li class="card__item"><div class="card__item-header"><span class="card__icon">📢</span><strong class="card__item-title">旅游舆情监测</strong></div>\
        <p class="card__item-desc">全网实时监控景区评价与热点事件，及时预警并引导舆论导向。</p>\
    </li>\
</ul>'
        }
    };

    function openModal(key) {
        var config = modalConfig[key];
        if (!config) return;
        modalTitle.textContent = config.title;
        modalBody.innerHTML = config.body;
        modal.classList.add('modal--visible');
    }
    function closeModal() {
        modal.classList.remove('modal--visible');
    }

    document.querySelectorAll('.nav__link[data-modal]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            var key = this.getAttribute('data-modal');
            if (key && key !== 'home' && key !== 'news') {
                e.preventDefault();
                openModal(key);
            }
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    modal.addEventListener('click', function (e) {
        if (e.target.classList.contains('modal__mask')) closeModal();
    });
}

window.addEventListener('hashchange', renderApp);
document.addEventListener('DOMContentLoaded', function () {
    var navToggle = document.querySelector('.nav__toggle');
    var navList = document.querySelector('.nav__list');
    if (navToggle && navList) {
        navToggle.addEventListener('click', function () {
            navList.classList.toggle('nav__list--active');
        });
    }
    renderApp();
});
