import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Music, ChevronRight, ChevronLeft, MapPin, Camera, Star, Heart, Quote, Calendar, Utensils } from 'lucide-react';

// --- 資料內容設定 (在此處修改文字與圖片) ---
// 使用說明：
// 1. 搜尋 "https://via.placeholder.com" 並將其替換為你真實照片的 URL (例如: ./images/photo1.jpg)
// 2. 音樂部分在程式碼最下方，搜尋 "audio" 標籤進行設定。

const SLIDES_DATA = [
  {
    type: 'cover',
    title: '歐劍諮商所',
    subtitle: '社畜與自由身的 2025 年度回顧',
    keywords: ['變動', '覺察', '陪伴'],
    description: '這一年大家都在尋找更適合自己的位置，無論是工作、學業還是心理狀態。雖然充滿了迷惘與焦慮，但你們始終是彼此最穩固的安全堡壘。',
    bgColor: 'from-purple-900 via-indigo-900 to-black',
    image: null // 首頁背景圖可在此加入
  },
  {
    type: 'member',
    name: '🐫 駱彤',
    role: '帽子大王 / 準研究生',
    themeColor: 'text-yellow-400',
    bgColor: 'from-yellow-900 via-orange-900 to-black',
    imagePlaceholder: '放入駱彤的帽子造型照',
    content: {
      main: '年度主軸：掙扎與尋找方向',
      sections: [
        { title: '工作 (無限城)', text: '在診所與鬼殺隊奮鬥了一整年。經歷了同事離職、人力短缺、崩潰值班，以及面對「無慘」(院長) 與「琵琶女」(督導) 的各種雷事。' },
        { title: '學業 (推甄之路)', text: '毅然決然踏上心理諮商研究所推甄。從輔大、實踐未果，到年底挑戰銘傳、淡江、玄奘。' },
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
      { date: '1/15', title: '好時多涮涮鍋', desc: '駱彤生日，蝦子多到吃不完' },
      { date: '1/27', title: '和牛涮', desc: '俞祥約社團大聚餐 12人' },
      { date: '3/9', title: '1010 湘餐廳', desc: '信義區攝影展午餐' },
      { date: '3/31', title: 'CityLink 港式飲茶', desc: '慶祝秉琛離職自由身' },
      { date: '5/15', title: '六品小館', desc: '張適生日' },
      { date: '7/16', title: '岡心食堂', desc: '秉琛生日日式料理' },
      { date: '8/11', title: '史坦利美式牛排', desc: '秉琛新工作上工慶祝' }
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

const ImagePlaceholder = ({ label, height = "h-64" }) => (
  <div className={`w-full ${height} bg-white/10 border-2 border-dashed border-white/30 rounded-xl flex flex-col items-center justify-center text-white/50 mb-4 overflow-hidden relative group`}>
    <Camera className="w-10 h-10 mb-2 group-hover:scale-110 transition-transform" />
    <span className="text-sm font-medium">{label}</span>
    <span className="text-xs mt-1 text-white/30">請替換為真實照片 (img src)</span>
    {/* 實際使用時，請取消下方註釋並放入真實圖片 URL */}
    {/* <img src="your-image-url.jpg" alt={label} className="absolute inset-0 w-full h-full object-cover opacity-80" /> */}
  </div>
);

const ProgressBar = ({ count, current, isPaused }) => {
  return (
    <div className="absolute top-0 left-0 w-full flex gap-1 p-2 z-50">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-white transition-all duration-300 ease-linear ${
              idx < current ? 'w-full' : idx === current ? 'animate-progress' : 'w-0'
            }`}
            style={{ 
              width: idx < current ? '100%' : idx === current ? 'auto' : '0%',
              animationDuration: '8s', // 每頁停留時間
              animationPlayState: isPaused || idx !== current ? 'paused' : 'running'
            }}
          />
        </div>
      ))}
    </div>
  );
};

const CoverSlide = ({ data }) => (
  <div className="flex flex-col items-center justify-center h-full text-center px-6 animate-fade-in">
    <div className="mb-8 relative">
      <Star className="w-16 h-16 text-yellow-400 absolute -top-8 -right-8 animate-pulse" />
      <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200 mb-2">
        {data.title}
      </h1>
      <h2 className="text-xl text-white/80 font-bold">{data.subtitle}</h2>
    </div>
    
    <div className="flex flex-wrap gap-3 justify-center mb-8">
      {data.keywords.map((kw, i) => (
        <span key={i} className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white font-bold text-lg border border-white/30 shadow-lg transform hover:scale-105 transition-transform">
          #{kw}
        </span>
      ))}
    </div>

    <ImagePlaceholder label="合照放置處" height="h-60" />

    <p className="text-white/80 leading-relaxed max-w-sm text-sm bg-black/20 p-4 rounded-xl backdrop-blur-sm">
      {data.description}
    </p>
  </div>
);

const MemberSlide = ({ data }) => (
  <div className="flex flex-col h-full px-5 pt-16 pb-20 animate-slide-up overflow-y-auto hide-scrollbar">
    <div className="flex items-center gap-4 mb-6">
      <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${data.bgColor} border-4 border-white/20 flex items-center justify-center shadow-2xl shrink-0`}>
        <span className="text-3xl">👤</span>
      </div>
      <div>
        <h2 className={`text-4xl font-bold ${data.themeColor} drop-shadow-md`}>{data.name}</h2>
        <p className="text-white/70 font-medium mt-1">{data.role}</p>
      </div>
    </div>

    <ImagePlaceholder label={data.imagePlaceholder} />

    <div className="space-y-4">
      <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
        <h3 className="text-xl font-bold text-white mb-1">🌟 {data.content.main}</h3>
      </div>
      
      {data.content.sections.map((section, idx) => (
        <div key={idx} className="bg-black/20 p-4 rounded-xl border-l-4 border-white/50 hover:bg-black/30 transition-colors">
          <h4 className={`font-bold text-lg mb-1 ${data.themeColor}`}>{section.title}</h4>
          <p className="text-white/80 text-sm leading-relaxed">{section.text}</p>
        </div>
      ))}
    </div>
  </div>
);

const ListSlide = ({ data }) => (
  <div className="flex flex-col h-full px-5 pt-16 pb-20 animate-fade-in overflow-y-auto hide-scrollbar">
    <h2 className="text-3xl font-bold text-white mb-1 flex items-center gap-2">
      {data.title}
    </h2>
    <p className="text-white/60 mb-6 text-sm">{data.subtitle}</p>

    <div className="space-y-3 relative">
      <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-white/20"></div>
      {data.items.map((item, idx) => (
        <div key={idx} className="flex gap-4 items-start relative group">
          <div className="w-10 h-10 rounded-full bg-white/20 border border-white/40 flex items-center justify-center shrink-0 z-10 text-xs font-bold text-white shadow-lg group-hover:scale-110 transition-transform">
            {item.date}
          </div>
          <div className="flex-1 bg-white/10 p-3 rounded-lg border border-white/5 backdrop-blur-sm hover:bg-white/20 transition-colors">
            <h3 className="font-bold text-white text-lg">{item.title}</h3>
            <p className="text-white/70 text-sm">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
    
    <div className="mt-8">
      <ImagePlaceholder label="美食拼盤照片" height="h-48" />
    </div>
  </div>
);

const MemoriesSlide = ({ data }) => (
  <div className="flex flex-col h-full px-5 pt-16 pb-20 animate-slide-up overflow-y-auto hide-scrollbar">
    <h2 className="text-3xl font-bold text-white mb-6 text-center shadow-text">{data.title}</h2>
    
    <div className="grid grid-cols-1 gap-4">
      {data.items.map((item, idx) => (
        <div key={idx} className="bg-gradient-to-r from-white/10 to-transparent p-4 rounded-xl border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity">
            {item.icon === 'camera' && <Camera size={40} />}
            {item.icon === 'map' && <MapPin size={40} />}
            {item.icon === 'star' && <Star size={40} />}
            {item.icon === 'video' && <Play size={40} />}
            {item.icon === 'ghost' && <div className="text-4xl">👻</div>}
          </div>
          <div className="relative z-10">
            <span className="inline-block px-2 py-1 bg-pink-500/50 rounded text-xs font-bold mb-2">{item.month}</span>
            <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
            <p className="text-white/70 text-sm">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-6 grid grid-cols-2 gap-2">
       <ImagePlaceholder label="回憶照1" height="h-32" />
       <ImagePlaceholder label="回憶照2" height="h-32" />
    </div>
  </div>
);

const QuotesSlide = ({ data }) => (
  <div className="flex flex-col h-full px-6 pt-16 pb-20 justify-center animate-zoom-in">
    <h2 className="text-3xl font-bold text-white mb-8 text-center">{data.title}</h2>
    
    <div className="space-y-6">
      {data.items.map((item, idx) => (
        <div key={idx} className="text-center group">
          <div className="inline-block relative">
             <Quote className="absolute -top-3 -left-4 w-6 h-6 text-white/30 transform rotate-180" />
             <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 font-serif italic mb-1 group-hover:scale-105 transition-transform">
               "{item.phrase}"
             </h3>
             <Quote className="absolute -bottom-3 -right-4 w-6 h-6 text-white/30" />
          </div>
          <p className="text-white/50 text-sm mt-2 font-light">{item.desc}</p>
        </div>
      ))}
    </div>
    
    <div className="mt-12 mx-auto w-3/4">
       <ImagePlaceholder label="梗圖或截圖" height="h-40" />
    </div>
  </div>
);

const FutureSlide = ({ data }) => (
  <div className="flex flex-col h-full px-5 pt-16 pb-20 animate-fade-in overflow-y-auto hide-scrollbar">
    <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
       <Star className="text-yellow-400 fill-current" /> {data.title}
    </h2>

    <div className="space-y-5">
      {data.sections.map((section, idx) => (
        <div key={idx} className={`p-5 rounded-2xl ${section.name === '共同目標' ? 'bg-gradient-to-r from-pink-600/40 to-purple-600/40 border border-pink-500/30' : 'bg-white/10'}`}>
          <div className="flex items-center gap-2 mb-2">
             {section.name === '共同目標' ? <Heart className="w-5 h-5 text-pink-400 fill-current" /> : <div className="w-2 h-2 rounded-full bg-white"></div>}
             <h3 className="font-bold text-xl text-white">{section.name}</h3>
          </div>
          <p className="text-white/80 leading-relaxed">{section.text}</p>
        </div>
      ))}
    </div>
    <div className="mt-8">
        <ImagePlaceholder label="夢想願景圖" height="h-40" />
    </div>
  </div>
);

const InteractiveSlide = ({ data }) => (
  <div className="flex flex-col h-full px-5 pt-16 pb-20 animate-slide-up">
    <h2 className="text-3xl font-bold text-white mb-2 text-center">{data.title}</h2>
    <p className="text-white/50 text-center mb-8 text-sm">截圖此頁面，寫下你的答案分享到群組！</p>

    <div className="space-y-6 flex-1">
      {data.questions.map((q, idx) => (
        <div key={idx} className="bg-white p-5 rounded-2xl shadow-xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
          <p className="text-black font-bold text-lg mb-4">{q}</p>
          <div className="w-full h-12 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center px-4 text-gray-400 text-sm">
            點擊輸入你的答案...
          </div>
        </div>
      ))}
    </div>
    
    <div className="text-center mt-4">
      <button className="bg-white text-black px-8 py-3 rounded-full font-bold shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2 mx-auto">
         <Camera className="w-5 h-5" /> 截圖分享
      </button>
    </div>
  </div>
);

// --- 主程式 ---

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // Music state
  const audioRef = useRef(null);

  const totalSlides = SLIDES_DATA.length;

  useEffect(() => {
    let timer;
    if (!isPaused && currentSlide < totalSlides) {
      timer = setTimeout(() => {
        handleNext();
      }, 8000); // 8 seconds per slide
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

  const currentData = SLIDES_DATA[currentSlide];

  // 動態渲染對應類型的 Slide
  const renderSlideContent = () => {
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
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 font-sans text-white">
      {/* 手機外框模擬 (在電腦上看起來更好) */}
      <div className="w-full max-w-md h-[100dvh] md:h-[850px] md:rounded-3xl relative overflow-hidden shadow-2xl bg-black">
        
        {/* 背景漸層 */}
        <div className={`absolute inset-0 bg-gradient-to-br ${currentData.bgColor} transition-colors duration-1000 ease-in-out`}></div>
        
        {/* 雜訊質感 (Noise Overlay) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}></div>

        {/* 頂部進度條 */}
        <ProgressBar count={totalSlides} current={currentSlide} isPaused={isPaused} />

        {/* 主要內容區域 */}
        <div 
          className="relative h-full w-full z-10"
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          onMouseDown={() => setIsPaused(true)}
          onMouseUp={() => setIsPaused(false)}
        >
          {renderSlideContent()}
        </div>

        {/* 導航點擊區域 (隱形) */}
        <div className="absolute inset-0 z-20 flex">
          <div className="w-1/3 h-full" onClick={handlePrev}></div>
          <div className="w-2/3 h-full" onClick={handleNext}></div>
        </div>

        {/* 底部控制器 */}
        <div className="absolute bottom-6 right-6 z-30 flex gap-4">
           {/* 音樂按鈕 */}
           <button 
             onClick={(e) => { e.stopPropagation(); togglePlay(); }}
             className={`p-3 rounded-full backdrop-blur-md border border-white/20 shadow-lg transition-all ${isPlaying ? 'bg-green-500/80 text-white animate-spin-slow' : 'bg-black/40 text-white/70'}`}
           >
             {isPlaying ? <Music size={20} /> : <Play size={20} />}
           </button>
           
           {/* 隱藏的音訊標籤 - 請在此處 src 填入音樂 URL */}
           <audio ref={audioRef} loop>
             <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
           </audio>
        </div>

      </div>

      {/* CSS 動畫定義 */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes progress { from { width: 0%; } to { width: 100%; } }
        .animate-progress { animation-name: progress; animation-timing-function: linear; }
        
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        
        @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.6s ease-out; }
        
        @keyframes zoom-in { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        .animate-zoom-in { animation: zoom-in 0.8s ease-out; }
        
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 4s linear infinite; }
      `}</style>
    </div>
  );
}
