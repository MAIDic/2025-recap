import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, Music, ChevronRight, ChevronLeft, 
  MapPin, Camera, Star, Heart, Quote, Calendar, Utensils,
  Volume2, VolumeX, Sparkles 
} from 'lucide-react';

// --- 資料內容設定 (在此處修改文字與圖片) ---

const SLIDES_DATA = [
  {
    type: 'cover',
    title: '歐劍諮商所',
    subtitle: '2025 年度回顧',
    keywords: ['變動', '覺察', '陪伴'],
    description: '這一年大家都在尋找更適合自己的位置，無論是工作、學業還是心理狀態。雖然充滿了迷惘與焦慮，但你們始終是彼此最穩固的安全堡壘。',
    bgColor: 'from-purple-900 via-indigo-900 to-black',
    image: null 
  },
  {
    type: 'member',
    name: '🐫 駱彤',
    role: '帽子大王',
    themeColor: 'text-yellow-400',
    bgColor: 'from-yellow-900 via-orange-900 to-black',
    imagePlaceholder: '放入駱彤的帽子造型照',
    content: {
      main: '年度主軸：掙扎與尋找方向',
      sections: [
        { title: '工作', text: '在診所與鬼殺隊奮鬥了一整年。經歷了同事離職、人力短缺、崩潰值班，以及面對「無慘」與「琵琶女」的各種雷事。' },
        { title: '學業', text: '毅然決然踏上心理諮商研究所推甄。從輔大、實踐未果，到年底挑戰銘傳、淡江、玄奘。' },
        { title: '自我突破', text: '參與藝術治療、薩提爾、攝影與影像發聲。即便在低潮期也努力尋求協助並好轉。' },
        { title: '經典造型', text: '「帽子大王」——在信義區一口氣戴上所有收藏的帽子。' }
      ]
    }
  },
  {
    type: 'member',
    name: '📷 徐秉琛',
    role: '自由人 ➔ 軟體工程師',
    themeColor: 'text-blue-400',
    bgColor: 'from-blue-900 via-cyan-900 to-black',
    imagePlaceholder: '放入秉琛的表演或旅遊照',
    content: {
      main: '年度主軸：自由與重塑',
      sections: [
        { title: '工作 (贖身成功)', text: '上半年從前公司贖身成為自由人。8月轉職「三竹資訊」重回社畜行列但適應良好。' },
        { title: '生活 (自我覺察)', text: '名古屋孝親、新加坡自由行。開始上表演課，從「被動等待」轉變為「主動表達」。' },
        { title: '健康 (破病王)', text: '年初諾羅病毒、年中確診、練舉重撞到牙齒。' }
      ]
    }
  },
  {
    type: 'member',
    name: '🌎 張適',
    role: '公關核心 / 諮商師',
    themeColor: 'text-green-400',
    bgColor: 'from-green-900 via-emerald-900 to-black',
    imagePlaceholder: '放入張適的沖繩或攝影照',
    content: {
      main: '年度主軸：穩定的支持者',
      sections: [
        { title: '工作 (師大核心)', text: '經歷女足事件公關危機、記者會與校慶轟炸。' },
        { title: '角色 (GPT分析師)', text: '群組裡的「諮商師」，總是給予精準同理與建議。' },
        { title: '成就', text: '為了升職努力備考中級英檢。' },
        { title: '旅遊', text: '年初沖繩之旅 (大浴池與咖啡牛奶)。' }
      ]
    }
  },
  {
    type: 'list',
    title: '🍽️ 歐劍吃貨日記',
    subtitle: '吃是我們最重要的儀式感',
    bgColor: 'from-red-900 via-rose-900 to-black',
    items: [
      { date: '1/15', title: '好時多涮涮鍋', desc: '駱彤生日慶生，送一堆蝦子根本吃不完' },
      { date: '1/27', title: '和牛涮', desc: '俞祥約社團大聚餐含教練、師母等共 12 人 ' },
      { date: '3/9', title: '1010 湘餐廳', desc: '攝影展當天的午餐聚會' },
      { date: '3/31', title: 'CityLink 港式飲茶', desc: '慶祝秉琛離職' },
      { date: '5/15', title: '六品小館', desc: '張適生日，吃完到張適家小坐 ' },
      { date: '5/30', title: '樹懶國秉琛家', desc: '端午包南部粽大會' },
      { date: '7/16', title: '岡心食堂', desc: '慶祝秉琛生日，吃日式料理' },
      { date: '8/11', title: '史坦利美式牛排', desc: '慶祝秉琛新工作上工' }
    ]
  },
  {
    type: 'memories',
    title: '🗺️ 年度共同回憶',
    bgColor: 'from-pink-900 via-purple-900 to-black',
    items: [
      { month: '3月', title: '信義區攝影企劃', desc: '駱彤帽子大王 vs 秉琛推箱子服務', icon: 'camera' },
      { month: '5月', title: '秉琛家包粽子', desc: '體驗南部粽製作、蹭好料', icon: 'star' },
      { month: '7月', title: '宜蘭兩天一夜', desc: '羅東夜市、梅花湖。確立了「鬆散隨緣」的旅行風格', icon: 'map' },
      { month: '10月', title: '六福村萬聖節', desc: '墓碑鎮遊行、住汽車旅館', icon: 'ghost' },
      { month: '10月', title: '秉琛戲劇成發', desc: '全員到齊支持，專業錄影攝影', icon: 'video' }
    ]
  },
  {
    type: 'quotes',
    title: '💬 金句與梗圖',
    bgColor: 'from-gray-800 via-gray-900 to-black',
    items: [
      { phrase: '5G傳播病毒', desc: '秉琛得諾羅後，駱彤用 LINE 被傳染？' },
      { phrase: '無慘與琵琶女', desc: '象徵慣老闆與雷主管' },
      { phrase: '所長', desc: '秉琛送駱彤的玩偶，情緒代言人' },
      { phrase: '社畜(3) 自由身(0)', desc: '群組名稱變遷史' },
      { phrase: '不要問，問了要罰錢', desc: '駱彤爸爸的經典迴避台詞' }
    ]
  },
  {
    type: 'future',
    title: '🔮 給 2026 的展望',
    bgColor: 'from-indigo-900 via-blue-900 to-black',
    sections: [
      { name: '駱彤', text: '研究所金榜題名，脫離無限城！' },
      { name: '秉琛', text: 'Coding 與表演平衡，保持健康不再破病。' },
      { name: '張適', text: '工作順利少公關危機，英檢通過。' },
      { name: '共同目標', text: '維持運作、台南/嘉義/高雄之旅、密室逃脫、回輔大拍照。' }
    ]
  },
  {
    type: 'interactive',
    title: '🎤 互動時間',
    bgColor: 'from-fuchsia-900 via-purple-900 to-black',
    questions: [
      '今年最讓你印象深刻的一件事是？',
      '今年最想感謝自己的一件事？',
      '明年最想一起做的一件事（許願池）？'
    ]
  }
];

// --- 組件開始 ---

// 新增：漂浮粒子背景效果
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float-slower delay-700" />
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl animate-float-fast" />
      <div className="absolute top-10 right-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse" />
    </div>
  );
};

const ImagePlaceholder = ({ label, height = "h-64", delay = "0ms" }) => (
  <div 
    className={`w-full ${height} bg-white/10 border-2 border-dashed border-white/30 rounded-xl flex flex-col items-center justify-center text-white/50 mb-4 overflow-hidden relative group animate-fade-in-up`}
    style={{ animationDelay: delay }}
  >
    <Camera className="w-10 h-10 mb-2 group-hover:scale-110 transition-transform duration-500" />
    <span className="text-sm font-medium">{label}</span>
    <span className="text-xs mt-1 text-white/30">請替換為真實照片 (img src)</span>
    {/* 實際使用時，請取消下方註釋並放入真實圖片 URL */}
    {/* <img src="/cover.jpg" alt={label} className="absolute inset-0 w-full h-full object-cover opacity-80" /> */}
  </div>
);

const ProgressBar = ({ count, current, isPaused }) => {
  return (
    <div className="absolute top-0 left-0 w-full flex gap-1 p-2 z-[60] safe-top">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-white transition-all duration-300 ease-linear ${
              idx < current ? 'w-full' : idx === current ? 'animate-progress' : 'w-0'
            }`}
            style={{ 
              width: idx < current ? '100%' : idx === current ? 'auto' : '0%',
              animationDuration: '8s', 
              animationPlayState: isPaused || idx !== current ? 'paused' : 'running'
            }}
          />
        </div>
      ))}
    </div>
  );
};

const CoverSlide = ({ data }) => (
  <div className="flex flex-col items-center justify-center h-full text-center px-6 pt-10 relative z-10">
    <div className="mb-8 relative animate-fade-in-down">
      <Star className="w-16 h-16 text-yellow-400 absolute -top-8 -right-8 animate-spin-slow" />
      <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-200 to-yellow-200 animate-gradient-text bg-300% mb-2">
        {data.title}
      </h1>
      <h2 className="text-xl text-white/80 font-bold tracking-widest">{data.subtitle}</h2>
    </div>
    
    <div className="flex flex-wrap gap-3 justify-center mb-8">
      {data.keywords.map((kw, i) => (
        <span 
          key={i} 
          className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white font-bold text-lg border border-white/30 shadow-lg transform hover:scale-110 transition-all duration-300 animate-pop-in"
          style={{ animationDelay: `${i * 200 + 500}ms` }}
        >
          #{kw}
        </span>
      ))}
    </div>

    <ImagePlaceholder label="合照放置處" height="h-60" delay="800ms" />

    <p className="text-white/80 leading-relaxed max-w-sm text-sm bg-black/20 p-4 rounded-xl backdrop-blur-sm animate-fade-in-up border border-white/5" style={{ animationDelay: '1000ms' }}>
      {data.description}
    </p>
  </div>
);

const MemberSlide = ({ data }) => (
  <div className="flex flex-col h-full px-5 pt-20 pb-20 overflow-y-auto hide-scrollbar relative z-10">
    <div className="flex items-center gap-4 mb-6 animate-fade-in-right">
      <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${data.bgColor} border-4 border-white/20 flex items-center justify-center shadow-2xl shrink-0 relative overflow-hidden group`}>
        <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
        <span className="text-3xl relative z-10 group-hover:scale-110 transition-transform">👤</span>
      </div>
      <div>
        <h2 className={`text-4xl font-bold ${data.themeColor} drop-shadow-md`}>{data.name}</h2>
        <p className="text-white/70 font-medium mt-1 flex items-center gap-1">
          <Sparkles size={14} className="text-yellow-200" /> {data.role}
        </p>
      </div>
    </div>

    <ImagePlaceholder label={data.imagePlaceholder} delay="200ms" />

    <div className="space-y-4">
      <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: '300ms' }}>
        <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
          <span className="animate-bounce-custom">🌟</span> {data.content.main}
        </h3>
      </div>
      
      {data.content.sections.map((section, idx) => (
        <div 
          key={idx} 
          className="bg-black/20 p-4 rounded-xl border-l-4 border-white/50 hover:bg-black/40 transition-all duration-300 transform hover:translate-x-1 animate-fade-in-up"
          style={{ animationDelay: `${idx * 150 + 400}ms` }}
        >
          <h4 className={`font-bold text-lg mb-1 ${data.themeColor}`}>{section.title}</h4>
          <p className="text-white/80 text-sm leading-relaxed">{section.text}</p>
        </div>
      ))}
    </div>
  </div>
);

const ListSlide = ({ data }) => (
  <div className="flex flex-col h-full px-5 pt-20 pb-20 overflow-y-auto hide-scrollbar relative z-10">
    <h2 className="text-3xl font-bold text-white mb-1 flex items-center gap-2 animate-fade-in-down">
      {data.title}
    </h2>
    <p className="text-white/60 mb-6 text-sm animate-fade-in" style={{ animationDelay: '200ms' }}>{data.subtitle}</p>

    <div className="space-y-3 relative">
      <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-white/20 animate-grow-height"></div>
      {data.items.map((item, idx) => (
        <div 
          key={idx} 
          className="flex gap-4 items-start relative group animate-slide-in-right"
          style={{ animationDelay: `${idx * 100 + 300}ms` }}
        >
          <div className="w-10 h-10 rounded-full bg-white/20 border border-white/40 flex items-center justify-center shrink-0 z-10 text-xs font-bold text-white shadow-lg group-hover:scale-110 group-hover:bg-white/40 transition-all duration-300">
            {item.date}
          </div>
          <div className="flex-1 bg-white/10 p-3 rounded-lg border border-white/5 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <h3 className="font-bold text-white text-lg">{item.title}</h3>
            <p className="text-white/70 text-sm">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
    
    <div className="mt-8">
      <ImagePlaceholder label="美食拼盤照片" height="h-48" delay="1200ms" />
    </div>
  </div>
);

const MemoriesSlide = ({ data }) => (
  <div className="flex flex-col h-full px-5 pt-20 pb-20 overflow-y-auto hide-scrollbar relative z-10">
    <h2 className="text-3xl font-bold text-white mb-6 text-center shadow-text animate-pop-in">{data.title}</h2>
    
    <div className="grid grid-cols-1 gap-4">
      {data.items.map((item, idx) => (
        <div 
          key={idx} 
          className="bg-gradient-to-r from-white/10 to-transparent p-4 rounded-xl border border-white/10 relative overflow-hidden group animate-fade-in-up hover:border-white/40 transition-colors"
          style={{ animationDelay: `${idx * 150}ms` }}
        >
          <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
            {item.icon === 'camera' && <Camera size={40} />}
            {item.icon === 'map' && <MapPin size={40} />}
            {item.icon === 'star' && <Star size={40} />}
            {item.icon === 'video' && <Play size={40} />}
            {item.icon === 'ghost' && <div className="text-4xl">👻</div>}
          </div>
          <div className="relative z-10">
            <span className="inline-block px-2 py-1 bg-pink-500/50 rounded text-xs font-bold mb-2 group-hover:bg-pink-500/80 transition-colors">{item.month}</span>
            <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
            <p className="text-white/70 text-sm">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-6 grid grid-cols-2 gap-2">
       <ImagePlaceholder label="回憶照1" height="h-32" delay="800ms" />
       <ImagePlaceholder label="回憶照2" height="h-32" delay="900ms" />
    </div>
  </div>
);

const QuotesSlide = ({ data }) => (
  <div className="flex flex-col h-full px-6 pt-20 pb-20 justify-center relative z-10">
    <h2 className="text-3xl font-bold text-white mb-8 text-center animate-fade-in-down">{data.title}</h2>
    
    <div className="space-y-6">
      {data.items.map((item, idx) => (
        <div 
          key={idx} 
          className="text-center group animate-fade-in-up"
          style={{ animationDelay: `${idx * 300}ms` }}
        >
          <div className="inline-block relative">
             <Quote className="absolute -top-3 -left-4 w-6 h-6 text-white/30 transform rotate-180 transition-transform group-hover:-translate-y-1" />
             <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 font-serif italic mb-1 group-hover:scale-105 transition-transform duration-300 cursor-default">
               "{item.phrase}"
             </h3>
             <Quote className="absolute -bottom-3 -right-4 w-6 h-6 text-white/30 transition-transform group-hover:translate-y-1" />
          </div>
          <p className="text-white/50 text-sm mt-2 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
    
    <div className="mt-12 mx-auto w-3/4">
       <ImagePlaceholder label="梗圖或截圖" height="h-40" delay="1500ms" />
    </div>
  </div>
);

const FutureSlide = ({ data }) => (
  <div className="flex flex-col h-full px-5 pt-20 pb-20 overflow-y-auto hide-scrollbar relative z-10">
    <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2 animate-slide-in-right">
       <Star className="text-yellow-400 fill-current animate-spin-slow" /> {data.title}
    </h2>

    <div className="space-y-5">
      {data.sections.map((section, idx) => (
        <div 
          key={idx} 
          className={`p-5 rounded-2xl animate-fade-in-up transition-all duration-300 hover:scale-[1.02] ${section.name === '共同目標' ? 'bg-gradient-to-r from-pink-600/40 to-purple-600/40 border border-pink-500/30 shadow-lg shadow-pink-900/20' : 'bg-white/10 hover:bg-white/20'}`}
          style={{ animationDelay: `${idx * 200}ms` }}
        >
          <div className="flex items-center gap-2 mb-2">
             {section.name === '共同目標' ? <Heart className="w-5 h-5 text-pink-400 fill-current animate-pulse" /> : <div className="w-2 h-2 rounded-full bg-white"></div>}
             <h3 className="font-bold text-xl text-white">{section.name}</h3>
          </div>
          <p className="text-white/80 leading-relaxed">{section.text}</p>
        </div>
      ))}
    </div>
    <div className="mt-8">
        <ImagePlaceholder label="夢想願景圖" height="h-40" delay="1000ms" />
    </div>
  </div>
);

const InteractiveSlide = ({ data }) => (
  <div className="flex flex-col h-full px-5 pt-20 pb-20 relative z-10">
    <h2 className="text-3xl font-bold text-white mb-2 text-center animate-pop-in">{data.title}</h2>
    <p className="text-white/50 text-center mb-8 text-sm animate-fade-in" style={{animationDelay: '300ms'}}>截圖此頁面，寫下你的答案分享到群組！</p>

    <div className="space-y-6 flex-1">
      {data.questions.map((q, idx) => (
        <div 
          key={idx} 
          className="bg-white p-5 rounded-2xl shadow-xl transform rotate-1 hover:rotate-0 transition-transform duration-300 animate-fade-in-up"
          style={{ animationDelay: `${idx * 200 + 500}ms` }}
        >
          <p className="text-black font-bold text-lg mb-4">{q}</p>
          <div className="w-full h-12 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center px-4 text-gray-400 text-sm hover:bg-gray-50 transition-colors">
            點擊輸入你的答案...
          </div>
        </div>
      ))}
    </div>
    
    <div className="text-center mt-4 animate-bounce-slow">
      <button className="bg-white text-black px-8 py-3 rounded-full font-bold shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2 mx-auto hover:bg-gray-200">
         <Camera className="w-5 h-5" /> 截圖分享
      </button>
    </div>
  </div>
);

// --- 主程式 ---

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const totalSlides = SLIDES_DATA.length;

  useEffect(() => {
    let timer;
    if (!isPaused && currentSlide < totalSlides) {
      timer = setTimeout(() => {
        handleNext();
      }, 10000); // 延長至 10 秒讓動畫有時間跑完
    }
    return () => clearTimeout(timer);
  }, [currentSlide, isPaused]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePause = () => setIsPaused(true);
  const handleResume = () => setIsPaused(false);

  const currentData = SLIDES_DATA[currentSlide];

  const renderSlideContent = () => {
    // 透過 key 屬性強制重新渲染動畫，每次切換頁面時動畫都會重跑
    const content = (() => {
      switch (currentData.type) {
        case 'cover': return <CoverSlide data={currentData} />;
        case 'member': return <MemberSlide data={currentData} />;
        case 'list': return <ListSlide data={currentData} />;
        case 'memories': return <MemoriesSlide data={currentData} />;
        case 'quotes': return <QuotesSlide data={currentData} />;
        case 'future': return <FutureSlide data={currentData} />;
        case 'interactive': return <InteractiveSlide data={currentData} />;
        default: return <CoverSlide data={currentData} />;
      }
    })();

    return <div key={currentSlide} className="h-full">{content}</div>;
  };

  return (
    <div className="bg-black w-screen h-screen overflow-hidden md:flex md:items-center md:justify-center md:min-h-screen md:bg-gray-900 font-sans text-white">
      
      <div className="fixed inset-0 md:relative md:w-full md:max-w-md md:h-[850px] md:inset-auto md:rounded-3xl overflow-hidden shadow-2xl bg-black">
        
        {/* 背景漸層與動畫 */}
        <div className={`absolute inset-0 bg-gradient-to-br ${currentData.bgColor} transition-colors duration-1000 ease-in-out animate-gradient-move`}></div>
        
        {/* 漂浮粒子 */}
        <FloatingParticles />

        {/* 雜訊質感 */}
        <div className="absolute inset-0 opacity-10 pointer-events-none z-0" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}></div>

        <ProgressBar count={totalSlides} current={currentSlide} isPaused={isPaused} />

        <button 
             onClick={(e) => { e.stopPropagation(); togglePlay(); }}
             className={`absolute top-8 right-4 z-[60] p-3 rounded-full backdrop-blur-md border border-white/20 shadow-lg transition-all active:scale-95 hover:bg-white/10 ${isPlaying ? 'bg-white/20 text-white animate-pulse-glow' : 'bg-black/20 text-white/50'}`}
           >
             {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>

        <div className="relative h-full w-full z-10 pt-safe">
          {renderSlideContent()}
        </div>

        <div 
          className="absolute inset-0 z-20 flex"
          onTouchStart={handlePause}
          onTouchEnd={handleResume}
          onMouseDown={handlePause}
          onMouseUp={handleResume}
        >
          <div className="w-[30%] h-full" onClick={(e) => { e.stopPropagation(); handlePrev(); }}></div>
          <div className="w-[70%] h-full" onClick={(e) => { e.stopPropagation(); handleNext(); }}></div>
        </div>

        <audio ref={audioRef} loop>
             <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
        </audio>

      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .pt-safe { padding-top: env(safe-area-inset-top, 20px); }
        .safe-top { top: env(safe-area-inset-top, 0px); }

        /* 背景流動動畫 */
        @keyframes gradient-xy {
            0% { background-position: 0% 50%; background-size: 150% 150%; }
            50% { background-position: 100% 50%; background-size: 200% 200%; }
            100% { background-position: 0% 50%; background-size: 150% 150%; }
        }
        .animate-gradient-move {
            animation: gradient-xy 15s ease infinite;
        }

        /* 漸層文字流動 */
        @keyframes gradient-text {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-text {
           background-size: 300% 300%;
           animation: gradient-text 3s ease infinite;
        }
        .bg-300% { background-size: 300% 300%; }

        /* 漂浮動畫 */
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        .animate-float-slow { animation: float 6s ease-in-out infinite; }
        .animate-float-slower { animation: float 8s ease-in-out infinite; }
        .animate-float-fast { animation: float 4s ease-in-out infinite; }
        
        /* 進度條 */
        @keyframes progress { from { width: 0%; } to { width: 100%; } }
        .animate-progress { animation-name: progress; animation-timing-function: linear; }
        
        /* 進入動畫 */
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; opacity: 0; }
        
        @keyframes fade-in-up { 
          from { opacity: 0; transform: translateY(20px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        .animate-fade-in-up { animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        
        @keyframes fade-in-down { 
          from { opacity: 0; transform: translateY(-20px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        .animate-fade-in-down { animation: fade-in-down 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }

        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in-right { animation: slide-in-right 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }

        @keyframes pop-in {
          0% { opacity: 0; transform: scale(0.5); }
          70% { transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-pop-in { animation: pop-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; opacity: 0; }

        @keyframes grow-height { from { height: 0; } to { height: 100%; } }
        .animate-grow-height { animation: grow-height 1s ease-out forwards; }
        
        /* 循環動畫 */
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }

        @keyframes bounce-custom {
          0%, 100% { transform: translateY(-15%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); }
          50% { transform: translateY(0); animation-timing-function: cubic-bezier(0, 0, 0.2, 1); }
        }
        .animate-bounce-custom { animation: bounce-custom 1s infinite; }
        
        .animate-bounce-slow { animation: bounce-custom 2s infinite; }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer { animation: shimmer 2s infinite; }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0px rgba(255, 255, 255, 0.2); }
          50% { box-shadow: 0 0 0 10px rgba(255, 255, 255, 0); }
        }
        .animate-pulse-glow { animation: pulse-glow 2s infinite; }
      `}</style>
    </div>
  );
}
