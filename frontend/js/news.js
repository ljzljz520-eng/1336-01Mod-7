/* =========================================
   新闻公告模块 - 数据与核心逻辑
   ========================================= */

var NEWS_CATEGORIES = {
    company: { label: '公司新闻', icon: '🏢', color: '#1E88E5' },
    media:   { label: '媒体报道', icon: '📰', color: '#E53935' },
    product: { label: '产品更新', icon: '🚀', color: '#43A047' },
    event:   { label: '活动通知', icon: '🎉', color: '#FB8C00' }
};

var NEWS_DATA = [
    {
        id: 1,
        category: 'company',
        title: '完成B轮融资5亿元，加速AI旅游技术落地',
        summary: '公司宣布完成B轮融资，由知名领投机构联合投资，资金将用于核心技术研发与市场拓展。',
        content: '<p>近日，智慧旅游科技有限公司正式宣布完成B轮融资，融资金额达5亿元人民币。</p><p>本轮融资由红杉资本中国基金领投，高瓴创投、IDG资本跟投，老股东腾讯投资持续加码。</p><h3>资金用途</h3><ul><li>40%用于AI大模型训练与核心算法研发</li><li>30%用于全国景区市场拓展</li><li>20%用于人才引进与团队建设</li><li>10%用于生态合作伙伴建设</li></ul><p>公司创始人兼CEO表示，本轮融资将加速公司在AI旅游赛道的领先布局，推动智慧景区解决方案在更多5A景区落地。</p>',
        date: '2026-05-20',
        tags: ['融资', '发展战略', 'AI'],
        pinned: true,
        pinExpire: '2026-12-31'
    },
    {
        id: 2,
        category: 'product',
        title: 'AR实景导航3.0上线，支持厘米级定位',
        summary: '全新升级的AR导航系统，集成北斗高精度定位，在室内外景区均可实现流畅导航体验。',
        content: '<p>经过6个月的研发迭代，AR实景导航3.0版本正式上线。</p><h3>核心升级点</h3><ul><li><strong>厘米级定位：</strong>集成北斗RTK高精度定位模块</li><li><strong>3D路标：</strong>采用PBR渲染，路牌更具立体感</li><li><strong>室内导航：</strong>支持博物馆、展览馆等室内场景</li><li><strong>低功耗模式：</strong>续航提升40%</li></ul><p>目前已在故宫博物院、黄山风景区等20家头部景区完成部署。</p>',
        date: '2026-05-10',
        tags: ['产品发布', 'AR', '导航'],
        pinned: true,
        pinExpire: '2026-06-30'
    },
    {
        id: 3,
        category: 'media',
        title: '央视《新闻联播》报道：AI赋能文旅产业数字化转型',
        summary: '公司智慧景区解决方案作为典型案例，登上央视新闻联播头条报道。',
        content: '<p>5月8日，央视《新闻联播》以"数字技术赋能文旅产业高质量发展"为题，报道了AI技术在文旅行业的应用成果。</p><p>我司与黄山风景区联合打造的"智慧黄山"项目作为典型案例入选。</p><h3>报道亮点</h3><ul><li>AI客流预测系统助力景区错峰管理</li><li>智能客服7×24小时响应游客需求</li><li>个性化推荐提升游客二次消费35%</li></ul><p>公司CTO接受央视记者专访时表示，AI技术正在深刻改变旅游行业的服务模式。</p>',
        date: '2026-05-08',
        tags: ['央视', '媒体报道', '数字化'],
        pinned: false,
        pinExpire: null
    },
    {
        id: 4,
        category: 'event',
        title: '2026智慧旅游生态大会即将召开',
        summary: '一年一度的行业盛会，汇聚500+景区管理者、技术专家，共话AI旅游新未来。',
        content: '<p>由我司主办的"2026智慧旅游生态大会"将于6月15日在北京国家会议中心举办。</p><h3>大会议程</h3><ul><li>09:00-09:30 开幕致辞</li><li>09:30-11:30 主题演讲：AI大模型时代的旅游变革</li><li>13:30-15:30 圆桌论坛：景区数字化实践</li><li>15:30-17:00 产品发布会</li></ul><p>报名截止日期：2026年6月10日。参会名额有限，先到先得。</p>',
        date: '2026-04-28',
        tags: ['大会', '活动', '生态'],
        pinned: false,
        pinExpire: null
    },
    {
        id: 5,
        category: 'company',
        title: '与故宫博物院签署战略合作协议',
        summary: '双方将在文物数字化、智能导览、文化IP开发等领域开展深度合作。',
        content: '<p>公司与故宫博物院在北京签署全面战略合作协议。</p><p>根据协议，双方将发挥各自优势，在以下领域开展深度合作：</p><ul><li>文物三维数字化采集与AI修复</li><li>AI智能导览系统定制开发</li><li>文创IP智能化设计</li><li>数字化展览联合打造</li></ul><p>故宫博物院院长表示，期待AI技术为传统文化注入新活力。</p>',
        date: '2026-04-15',
        tags: ['战略合作', '故宫', '文化'],
        pinned: false,
        pinExpire: null
    },
    {
        id: 6,
        category: 'product',
        title: '智能客服新增20种小语种支持',
        summary: '助力入境游市场复苏，智能客服系统新增多语种实时翻译功能。',
        content: '<p>智能客服系统完成语言能力升级，新增支持泰语、越南语、阿拉伯语等20种小语种。</p><h3>新增语言列表</h3><ul><li>东南亚：泰语、越南语、印尼语、马来语</li><li>中东：阿拉伯语、希伯来语、土耳其语</li><li>欧洲：荷兰语、瑞典语、挪威语、丹麦语</li><li>其他：韩语、日语、葡萄牙语等</li></ul><p>至此系统已支持全球50+种语言，基本覆盖主要入境游客源国。</p>',
        date: '2026-04-02',
        tags: ['功能更新', '多语言', '客服'],
        pinned: false,
        pinExpire: null
    },
    {
        id: 7,
        category: 'media',
        title: '36氪专访：AI旅游的下一个十年',
        summary: '36氪深度专访公司创始人，探讨AI技术在旅游行业的应用前景与挑战。',
        content: '<p>近日，36氪刊发长篇专访文章《AI旅游的下一个十年》，对公司创始人进行了深度对话。</p><h3>专访核心观点</h3><ul><li>大模型将重塑旅游信息获取方式</li><li>个性化推荐进入"千人千面"3.0时代</li><li>虚实融合成为景区体验新标配</li><li>数据安全与隐私保护是行业基石</li></ul><p>文章在36氪网站阅读量突破10万，引发行业广泛讨论。</p>',
        date: '2026-03-25',
        tags: ['36氪', '专访', '行业洞察'],
        pinned: false,
        pinExpire: null
    },
    {
        id: 8,
        category: 'event',
        title: '春季校园招聘正式启动',
        summary: '面向2026届应届毕业生，开放算法、产品、运营等50+岗位。',
        content: '<p>公司2026春季校园招聘正式启动！</p><h3>招聘岗位</h3><ul><li>算法工程师（NLP/CV/推荐）</li><li>前端/后端/客户端开发工程师</li><li>产品经理/产品运营</li><li>景区解决方案顾问</li></ul><h3>招聘流程</h3><p>网申 → 笔试 → 技术面试 → HR面试 → Offer</p><p>网申截止：2026年4月30日</p>',
        date: '2026-03-10',
        tags: ['招聘', '校招', '人才'],
        pinned: false,
        pinExpire: null
    },
    {
        id: 9,
        category: 'company',
        title: '入选国家级专精特新"小巨人"企业',
        summary: '公司凭借在AI+旅游垂直领域的技术创新，成功入选国家级专精特新名单。',
        content: '<p>工信部公布第四批国家级专精特新"小巨人"企业名单，我司成功入选。</p><p>专精特新"小巨人"企业是指具有"专业化、精细化、特色化、新颖化"特征的中小企业，是优质中小企业的核心力量。</p><h3>入选意义</h3><ul><li>体现公司在AI旅游赛道的技术硬实力</li><li>将获得税收优惠、研发补贴等政策支持</li><li>有助于提升公司品牌影响力与行业地位</li></ul>',
        date: '2025-12-28',
        tags: ['荣誉', '资质', '国家认证'],
        pinned: false,
        pinExpire: null
    },
    {
        id: 10,
        category: 'product',
        title: 'AI推荐引擎V2.0上线，转化率提升28%',
        summary: '基于深度学习的全新推荐算法，实时学习用户偏好，推荐更精准。',
        content: '<p>AI个性化推荐引擎完成2.0版本升级。</p><h3>技术亮点</h3><ul><li>采用双塔+多兴趣召回模型</li><li>支持实时特征更新，毫秒级响应</li><li>引入图神经网络挖掘隐含关联</li><li>多目标排序优化CTR/CVR/GMV</li></ul><h3>上线效果</h3><ul><li>点击率提升28%</li><li>转化率提升22%</li><li>人均浏览深度增加35%</li></ul>',
        date: '2025-11-18',
        tags: ['产品发布', '推荐算法', 'AI'],
        pinned: false,
        pinExpire: null
    },
    {
        id: 11,
        category: 'media',
        title: '人民日报：智慧旅游助力乡村振兴',
        summary: '我司参与的"智慧乡村旅游"项目被人民日报作为典型案例报道。',
        content: '<p>人民日报刊发专题报道，聚焦数字技术助力乡村振兴成果，我司"智慧乡村旅游"项目入选案例。</p><p>项目通过AI技术帮助乡村景区：</p><ul><li>搭建线上营销平台，打通客源渠道</li><li>标准化服务流程，提升游客体验</li><li>数据分析指导经营决策</li></ul><p>项目落地一年，带动当地旅游收入增长60%。</p>',
        date: '2025-10-12',
        tags: ['人民日报', '乡村振兴', '社会责任'],
        pinned: false,
        pinExpire: null
    },
    {
        id: 12,
        category: 'event',
        title: '用户满意度调研：好评率96.8%',
        summary: '2025年度用户满意度调研结果出炉，产品服务质量持续获得用户认可。',
        content: '<p>2025年度用户满意度调研结果正式发布。</p><h3>核心数据</h3><ul><li>整体满意度：96.8%（同比+1.2%）</li><li>景区B端客户续费率：92%</li><li>NPS净推荐值：68</li></ul><h3>用户评价高频词</h3><p>好用、智能、服务好、响应快、专业</p><p>感谢所有用户的支持与信任，我们会继续努力！</p>',
        date: '2025-09-20',
        tags: ['用户调研', '满意度', '里程碑'],
        pinned: false,
        pinExpire: null
    }
];

/* =========================================
   新闻工具函数
   ========================================= */

function isPinnedValid(news) {
    if (!news.pinned) return false;
    if (!news.pinExpire) return true;
    return new Date(news.pinExpire) >= new Date();
}

function getEffectiveNews() {
    return NEWS_DATA.map(function (item) {
        return Object.assign({}, item, {
            pinned: isPinnedValid(item)
        });
    }).sort(function (a, b) {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
        return new Date(b.date) - new Date(a.date);
    });
}

function getNewsById(id) {
    var news = getEffectiveNews();
    for (var i = 0; i < news.length; i++) {
        if (String(news[i].id) === String(id)) return { item: news[i], index: i, list: news };
    }
    return null;
}

function getYears() {
    var years = {};
    NEWS_DATA.forEach(function (item) {
        var y = item.date.substring(0, 4);
        years[y] = true;
    });
    return Object.keys(years).sort().reverse();
}

function getAllTags() {
    var tags = {};
    NEWS_DATA.forEach(function (item) {
        (item.tags || []).forEach(function (t) { tags[t] = true; });
    });
    return Object.keys(tags);
}

function filterNews(list, category, year, tag) {
    return list.filter(function (item) {
        if (category && category !== 'all' && item.category !== category) return false;
        if (year && year !== 'all' && item.date.substring(0, 4) !== year) return false;
        if (tag && tag !== 'all' && (!item.tags || item.tags.indexOf(tag) === -1)) return false;
        return true;
    });
}

function formatDate(dateStr) {
    var d = new Date(dateStr);
    return d.getFullYear() + '-' +
        String(d.getMonth() + 1).padStart(2, '0') + '-' +
        String(d.getDate()).padStart(2, '0');
}
