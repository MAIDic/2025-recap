import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Play, Pause, Music, ChevronRight, ChevronLeft, 
  MapPin, Camera, Star, Heart, Quote, Calendar, Utensils,
  Volume2, VolumeX, Sparkles, Trophy, Award, Medal,
  MessageCircle, Phone, Video, MoreVertical, ArrowLeft, Search, Menu, Send, X, Users, Copy, Check, RotateCcw
} from 'lucide-react';

// --- 資料內容設定 (在此處修改文字與圖片) ---

const SLIDES_DATA = [
  {
    type: 'cover',
    duration: 0, 
    title: '歐劍諮商所',
    subtitle: '2025 年度回顧',
    keywords: ['變動', '覺察', '陪伴'],
    description: '這一年大家都在尋找更適合自己的位置，無論是工作、學業還是心理狀態。雖然充滿了迷惘與焦慮，但你們始終是彼此最穩固的安全堡壘。',
    bgColor: 'from-gray-900 to-black', 
    image: '/cover.jpg' 
  },
  {
    type: 'member',
    duration: 10000,
    name: '🐫 駱彤',
    role: '帽子大王',
    themeColor: 'text-yellow-400',
    bgColor: 'from-gray-800 to-black',
    image: '/camel.jpg', 
    imagePlaceholder: '放入駱彤的帽子造型照',
    content: {
      main: '年度主軸：掙扎與尋找方向',
      sections: [
        { title: '工作', text: '在診所與鬼殺隊奮鬥了一整年。經歷了同事離職、人力短缺、崩潰值班，以及面對「無慘」與「琵琶女」的各種雷事。' },
        { title: '學業', text: '毅然決然踏上心理諮商研究所推甄之路。' },
        { title: '自我突破', text: '參與藝術治療、薩提爾、攝影與影像發聲。即便在低潮期也努力尋求協助並好轉。' },
        { title: '經典造型', text: '「帽子大王」——一口氣戴上所有收藏的帽子。' }
      ]
    }
  },
  {
    type: 'member',
    duration: 10000,
    name: '📷 徐秉琛',
    role: '斜槓軟體工程師',
    themeColor: 'text-blue-400',
    bgColor: 'from-gray-800 to-black',
    image: '/bill.jpg',
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
    duration: 10000,
    name: '🌎 張適',
    role: '公關核心 / 諮商師',
    themeColor: 'text-green-400',
    bgColor: 'from-gray-800 to-black',
    image: '/yuyu.jpg',
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
    type: 'food-story', 
    title: '🍽️ 歐劍吃貨日記',
    subtitle: '吃是我們最重要的儀式感',
    bgColor: 'from-red-900 via-rose-900 to-black',
    items: [
      { date: '📅 1/15', title: '📍 好時多涮涮鍋', desc: '駱彤生日慶生，送一堆蝦子根本吃不完', image: null }, 
      { date: '📅 1/27', title: '📍 和牛涮', desc: '俞祥約歐劍大聚餐，教練、師母也來了!', image: null },
      { date: '📅 3/9', title: '📍 1010 湘餐廳', desc: '攝影展當天的午餐聚會', image: null },
      { date: '📅 3/31', title: '📍 CityLink 港式飲茶', desc: '到南港慶祝秉琛離職', image: null },
      { date: '📅 5/15', title: '📍 六品小館', desc: '張適生日，吃完到張適家聊天小坐', image: null },
      { date: '📅 7/16', title: '📍 岡心食堂', desc: '慶祝秉琛生日，吃完還去參觀無限城', image: null },
      { date: '📅 8/11', title: '📍 史坦利美式牛排', desc: '慶祝秉琛新工作上工', image: null }
    ]
  },
  {
    type: 'memory-story', 
    title: '🗺️ 年度共同回憶',
    bgColor: 'from-pink-900 via-purple-900 to-black',
    items: [
      { month: '3月', title: '信義區攝影企劃', desc: '駱彤帽子大王 vs 秉琛推箱子服務', icon: 'camera', image: null }, 
      { month: '5月', title: '秉琛家包粽子', desc: '體驗南部粽製作、蹭好料', icon: 'star', image: null },
      { month: '7月', title: '宜蘭兩天一夜', desc: '羅東夜市、梅花湖。確立了「鬆散隨緣」的旅行風格', icon: 'map', image: null },
      { month: '10月', title: '六福村萬聖節', desc: '墓碑鎮遊行，芮妮恐怖又可愛<3', icon: 'ghost', image: null },
      { month: '10月', title: '秉琛戲劇成發', desc: '全員到齊支持，專業錄影攝影', icon: 'video', image: null }
    ]
  },
  {
    type: 'keywords',
    duration: 12000,
    title: '這一年的我們，都在說什麼？',
    bgColor: 'from-gray-800 via-slate-900 to-black',
    image: null,
    cloud: ['無限城', '照片', '無慘', '琵琶女', '所長', '研究所', '推甄', '覺察', '寶可夢','家庭','今天','情緒','學長'],
    quotes: [
      '「我們歐劍諮商所可是成立了N年ㄋ！」 —— 張適',
      '「咕嚕咕嚕」 —— 群組全員',
      '「駱彤不嘻嘻」 —— 駱彤',
      '「我是紙糊的，下水會爛掉」 —— 駱彤',
      '「好想離職」 —— 駱彤、秉琛'
    ]
  },
  {
    type: 'awards', 
    title: '🏆 年度個人獎項',
    bgColor: 'from-yellow-900 via-amber-900 to-black',
    image: null,
    items: [
      {
        award: '年度最佳成長獎',
        winner: '徐秉琛',
        reason: '今年是你自我覺察突飛猛進的一年。從一開始的不確定，到後來去上表演課、舞蹈治療，你能清楚分析自己。你學會了接納自己的狀態，不再強迫自己當個「好小孩」。',
        moment: '經典時刻：在舞蹈治療課上，用十元硬幣探索身體，並寫下深刻的心得。'
      },
      {
        award: '年度最佳韌性獎',
        winner: '駱彤',
        reason: '你是今年最辛苦的戰士。面對高壓的診所環境、混亂的排班、不講理的主管，以及研究所推甄的壓力，你雖然崩潰大哭過，但你依然堅持住了。',
        moment: '經典時刻：雖然很累，但還是完成了所有研究所的書審資料，並在截止前一刻壓線送出。'
      },
      {
        award: '年度最佳守護者獎',
        winner: '張適 (學長)',
        reason: '你是這個群組的定海神針與最強輔助。無論是宜蘭行程的規劃、幫大家拍照紀錄、還是用 GPT 幫駱彤分析性格優勢，你總是溫柔地接住大家的情緒。',
        moment: '經典時刻：用 AI 分析告訴駱彤：「妳想成為一個對自己負責的人」，給予了極大的安慰。'
      }
    ]
  },
  {
    type: 'interactive',
    duration: 0, 
    title: '🎤 互動時間',
    bgColor: 'from-fuchsia-900 via-purple-900 to-black',
    questions: [
      '2025 回顧與 2026 展望',
      '關於 2025：印象深刻的事 / 感謝的事 / 關鍵詞',
      '關於 2026：一句話 / 期待 / 十周年活動'
    ]
  }
];

// --- 組件開始 ---

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

// 通用圖片/佔位符組件
const ImagePlaceholder = ({ src, label, height = "h-64", delay = "0ms", className = "" }) => {
  if (src) {
    return (
      <div 
        className={`w-full ${height} rounded-xl mb-4 overflow-hidden relative group animate-fade-in-up shadow-2xl border border-white/10 ${className}`}
        style={{ animationDelay: delay }}
      >
        <img 
          src={src} 
          alt={label || "image"} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
      </div>
    );
  }

  return (
    <div 
      className={`w-full ${height} bg-white/10 border-2 border-dashed border-white/30 rounded-xl flex flex-col items-center justify-center text-white/50 mb-4 overflow-hidden relative group animate-fade-in-up ${className}`}
      style={{ animationDelay: delay }}
    >
      <Camera className="w-10 h-10 mb-2 group-hover:scale-110 transition-transform duration-500" />
      <span className="text-sm font-medium">{label}</span>
      <span className="text-xs mt-1 text-white/30">請替換為真實照片 (img src)</span>
    </div>
  );
};

const ProgressBar = ({ count, current, isPaused, currentDuration }) => {
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
              animationDuration: idx === current && currentDuration > 0 ? `${currentDuration}ms` : '0ms', 
              animationPlayState: isPaused || idx !== current ? 'paused' : 'running'
            }}
          />
        </div>
      ))}
    </div>
  );
};

// --- CoverSlide: 仿通訊軟體群組介面 ---
const CoverSlide = ({ data, onNext }) => (
  <div className="flex flex-col h-full relative z-10 bg-[#1e1e1e] font-sans">
    {/* 頂部導航列 */}
    <div className="h-16 bg-[#2b2b2b] flex items-center justify-between px-4 border-b border-gray-700 pt-safe mt-6 md:mt-0">
      <div className="flex items-center gap-3">
        <ArrowLeft className="text-white w-6 h-6" />
        <div>
          <h1 className="text-white font-bold text-lg flex items-center gap-2">
            {data.title} <span className="text-sm font-normal text-gray-400">(3)</span>
          </h1>
        </div>
      </div>
      <div className="flex gap-4 text-white">
        <Search className="w-5 h-5" />
        <Phone className="w-5 h-5" />
        <Menu className="w-5 h-5" />
      </div>
    </div>

    {/* 聊天內容區 */}
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900/50 pb-20">
      
      {/* 系統訊息：日期 */}
      <div className="flex justify-center">
        <span className="bg-gray-700/50 text-gray-400 text-xs px-3 py-1 rounded-full">Today</span>
      </div>

      {/* 系統訊息：群組建立 */}
      <div className="flex justify-center">
        <span className="bg-gray-700/50 text-gray-400 text-xs px-3 py-1 rounded-full text-center">
          2025 年度回顧已建立。<br/>群組成員：駱彤、徐秉琛、張適
        </span>
      </div>

      {/* 關鍵字氣泡 (對方傳送的訊息) */}
      <div className="flex gap-2 items-end animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-xs">Sys</div>
        <div className="flex flex-col gap-1 max-w-[80%]">
          <div className="text-gray-400 text-xs ml-1">System</div>
          <div className="bg-[#2b2b2b] p-3 rounded-2xl rounded-bl-none text-white border border-gray-700">
            {data.subtitle}
            <div className="flex flex-wrap gap-2 mt-2">
              {data.keywords.map((kw, i) => (
                <span key={i} className="text-[#64b5f6] font-bold">#{kw}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 圖片訊息 */}
      <div className="flex gap-2 items-end animate-fade-in-up" style={{ animationDelay: '500ms' }}>
        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-xs">Sys</div>
        <div className="max-w-[70%]">
           <ImagePlaceholder src={data.image} label="封面照" height="h-40" className="rounded-xl border border-gray-700 !mb-0" />
        </div>
      </div>

      {/* 長文字訊息 */}
      <div className="flex gap-2 items-end animate-fade-in-up" style={{ animationDelay: '800ms' }}>
        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-xs">Sys</div>
        <div className="bg-[#2b2b2b] p-3 rounded-2xl rounded-bl-none text-white border border-gray-700 max-w-[85%] text-sm leading-relaxed">
          {data.description}
          <div className="text-[10px] text-gray-500 text-right mt-1">10:00 AM</div>
        </div>
      </div>

      {/* 空白填充，確保按鈕不會遮住內容 */}
      <div className="h-10"></div>
    </div>

    {/* 底部按鈕區 (覆蓋輸入框) */}
    <div className="absolute bottom-0 left-0 w-full p-4 bg-[#1e1e1e] border-t border-gray-700 z-50">
       <button 
         onClick={(e) => { e.stopPropagation(); onNext(); }}
         className="w-full bg-[#00a884] hover:bg-[#008f6f] text-black font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg"
       >
         進入群組開始回顧 <ChevronRight className="w-5 h-5" />
       </button>
    </div>
  </div>
);

// --- MemberSlide: 仿通訊軟體個人頁面 ---
const MemberSlide = ({ data }) => (
  <div className="flex flex-col h-full relative z-10 bg-black font-sans">
    {/* 頂部控制列 (模擬彈窗關閉) */}
    <div className="absolute top-0 left-0 w-full z-20 flex justify-end p-4 pt-10">
      <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-md">
        <X className="w-5 h-5 text-white" />
      </div>
    </div>

    {/* 背景大圖 (Banner) */}
    <div className="h-[35%] w-full relative overflow-hidden">
      {data.image ? (
        <img src={data.image} alt="banner" className="w-full h-full object-cover opacity-80" />
      ) : (
        <div className={`w-full h-full bg-gradient-to-br ${data.bgColor}`}></div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
    </div>

    {/* 個人資訊區 (卡片式) */}
    <div className="flex-1 bg-black -mt-10 rounded-t-3xl px-6 relative z-10 animate-slide-up">
      {/* 頭貼 */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2">
        <div className="w-32 h-32 rounded-full border-4 border-black bg-gray-800 overflow-hidden shadow-2xl">
           {data.image ? (
             <img src={data.image} alt="avatar" className="w-full h-full object-cover" />
           ) : (
             <div className="w-full h-full flex items-center justify-center text-4xl">👤</div>
           )}
        </div>
        <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-black"></div>
      </div>

      {/* 姓名與狀態 */}
      <div className="mt-20 text-center">
        <h2 className="text-3xl font-bold text-white mb-1">{data.name}</h2>
        <p className="text-gray-400 text-sm">{data.role}</p>
        <div className="mt-3 inline-block px-4 py-1.5 rounded-full bg-gray-900 border border-gray-800 text-yellow-300 text-xs font-medium">
           Status: {data.content.main}
        </div>
      </div>

      {/* 功能按鈕 */}
      <div className="flex justify-center gap-6 mt-6 border-b border-gray-800 pb-6">
        <div className="flex flex-col items-center gap-1 group">
          <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-[#64b5f6] group-hover:bg-gray-800 transition-colors">
            <MessageCircle className="w-6 h-6" />
          </div>
          <span className="text-xs text-gray-500">Chat</span>
        </div>
        <div className="flex flex-col items-center gap-1 group">
          <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-[#64b5f6] group-hover:bg-gray-800 transition-colors">
            <Phone className="w-6 h-6" />
          </div>
          <span className="text-xs text-gray-500">Call</span>
        </div>
        <div className="flex flex-col items-center gap-1 group">
          <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-[#64b5f6] group-hover:bg-gray-800 transition-colors">
            <Video className="w-6 h-6" />
          </div>
          <span className="text-xs text-gray-500">Video</span>
        </div>
      </div>

      {/* 下方動態/詳細資訊 */}
      <div className="mt-6 space-y-4 pb-20 overflow-y-auto max-h-[30vh] hide-scrollbar">
        <h3 className="text-white font-bold text-lg mb-2">Updates</h3>
        {data.content.sections.map((section, idx) => (
          <div key={idx} className="flex gap-3 animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center shrink-0">
               {idx === 0 ? <Users size={18} /> : <Star size={18} />}
            </div>
            <div>
              <h4 className={`text-sm font-bold ${data.themeColor}`}>{section.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed mt-1">{section.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// 修改：接收 subIndex 作為 props，移除內部 timer
const FoodStorySlide = ({ data, subIndex }) => {
  const items = data.items;
  
  // 狀態：輪播單一項目 (Focus Mode)
  if (subIndex < items.length) {
    const item = items[subIndex];
    return (
      <div className="flex flex-col items-center justify-center h-full relative z-10 overflow-hidden">
        {/* 背景：模糊的美食圖或顏色 */}
        <div className="absolute inset-0 z-0">
          {item.image ? (
            <img src={item.image} alt="bg" className="w-full h-full object-cover blur-md opacity-40 scale-110 animate-ken-burns" />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${data.bgColor} opacity-80 animate-pulse-glow`}></div>
          )}
        </div>

        <div className="relative z-10 px-4 text-center w-full h-full flex flex-col justify-center animate-zoom-in-up" key={subIndex}>
           <div className="shrink-0 inline-block px-3 py-1 bg-red-500 text-white font-bold rounded-full mb-4 text-sm shadow-lg self-center">
             {item.date}
           </div>
           
           <div className="shrink-0 mb-4 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 mx-auto w-full h-[55vh] bg-black/30 flex items-center justify-center">
             {item.image ? (
               <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
             ) : (
               <Utensils className="w-20 h-20 text-white/40" />
             )}
           </div>

           <h2 className="shrink-0 text-3xl font-black text-white mb-2 drop-shadow-lg">{item.title}</h2>
           <p className="shrink-0 text-white/90 text-md font-medium leading-relaxed bg-black/40 p-3 rounded-xl backdrop-blur-sm line-clamp-2">
             {item.desc}
           </p>
        </div>
        
        {/* 進度指示點 */}
        <div className="absolute bottom-10 flex gap-2">
          {items.map((_, i) => (
             <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === subIndex ? 'bg-white w-4' : 'bg-white/30'}`} />
          ))}
        </div>
      </div>
    );
  }

  // 狀態：總結清單 (Summary List)
  return (
    <div className="flex flex-col h-full px-5 pt-20 pb-20 overflow-y-auto hide-scrollbar relative z-10 animate-fade-in">
      <h2 className="text-3xl font-bold text-white mb-1 flex items-center gap-2">
        {data.title}
      </h2>
      <p className="text-white/60 mb-6 text-sm">{data.subtitle}</p>

      <div className="space-y-3 relative">
        <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-white/20 animate-grow-height"></div>
        {data.items.map((item, idx) => (
          <div 
            key={idx} 
            className="flex gap-4 items-start relative group animate-slide-in-right"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="w-10 h-10 rounded-full bg-white/20 border border-white/40 flex items-center justify-center shrink-0 z-10 text-xs font-bold text-white shadow-lg group-hover:scale-110 group-hover:bg-white/40 transition-all duration-300">
              {item.date.split(' ')[1] || item.date}
            </div>
            <div className="flex-1 bg-white/10 p-3 rounded-lg border border-white/5 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <h3 className="font-bold text-white text-lg">{item.title}</h3>
              <p className="text-white/70 text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 修改：接收 subIndex 作為 props，移除內部 timer
const MemoryStorySlide = ({ data, subIndex }) => {
  const items = data.items;

  // 狀態：拍立得輪播 (Polaroid Mode)
  if (subIndex < items.length) {
    const item = items[subIndex];
    // 隨機旋轉角度 (-3 ~ 3 deg)
    const rotate = (subIndex % 2 === 0 ? 'rotate-2' : '-rotate-2');

    return (
      <div className="flex flex-col items-center justify-center h-full relative z-10">
        {/* 背景閃光特效 */}
        <div className="absolute inset-0 bg-white animate-flash pointer-events-none" key={`flash-${subIndex}`}></div>

        <div 
          key={subIndex} 
          className={`relative bg-white p-4 pb-12 shadow-2xl transform ${rotate} animate-polaroid-drop max-w-[300px] w-full`}
        >
          {/* 膠帶效果 */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/30 backdrop-blur-sm rotate-1 shadow-sm border border-white/20"></div>

          <div className="aspect-square bg-gray-100 mb-4 overflow-hidden relative border border-gray-200">
            {item.image ? (
               <img src={item.image} alt={item.title} className="w-full h-full object-cover sepia-[0.3]" />
            ) : (
               <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-100">
                  {item.icon === 'camera' && <Camera size={60} />}
                  {item.icon === 'map' && <MapPin size={60} />}
                  {item.icon === 'star' && <Star size={60} />}
                  {item.icon === 'video' && <Play size={60} />}
                  {item.icon === 'ghost' && <div className="text-6xl">👻</div>}
               </div>
            )}
          </div>
          
          <div className="text-center font-serif">
             <div className="text-gray-400 text-xs tracking-widest uppercase mb-1">{item.month} • MEMORY</div>
             <h2 className="text-2xl font-bold text-gray-800 handwritten">{item.title}</h2>
             <p className="text-gray-500 text-sm mt-2 font-medium">{item.desc}</p>
          </div>
        </div>
      </div>
    );
  }

  // 狀態：回憶總覽 (Memory List)
  return (
    <div className="flex flex-col h-full px-5 pt-20 pb-20 overflow-y-auto hide-scrollbar relative z-10 animate-fade-in">
      <h2 className="text-3xl font-bold text-white mb-6 text-center shadow-text">{data.title}</h2>
      
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
    </div>
  );
};

const KeywordCloudSlide = ({ data }) => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // 優化：使用 useMemo 緩存文字雲樣式，避免因 state 改變而重渲染位置
  const cloudWords = useMemo(() => {
    return data.cloud.map((word, idx) => ({
      text: word,
      style: {
        // 修改：讓文字雲集中在中間 60% 區域 (top 15%~75%, left 10%~70%)
        top: `${Math.random() * 60 + 15}%`, 
        left: `${Math.random() * 60 + 10}%`, 
        fontSize: `${Math.random() * 1.5 + 1.2}rem`, 
        animationDelay: `${idx * 0.5}s`,
        animationDuration: `${Math.random() * 5 + 5}s`,
        opacity: Math.random() * 0.4 + 0.6 
      }
    }));
  }, [data.cloud]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex(prev => (prev + 1) % data.quotes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [data.quotes.length]);

  const currentQuote = data.quotes[currentQuoteIndex];
  // 解析金句作者：假設格式為 "金句 —— 作者"
  const quoteParts = currentQuote.split('——');
  const quoteText = quoteParts[0];
  const quoteAuthor = quoteParts[1] ? quoteParts[1].trim() : '';

  return (
    // 使用 Flex Col 讓結構分層：上標題、中文字雲、下金句
    <div className="flex flex-col h-full pt-safe pb-safe relative z-10 overflow-hidden">
        {/* Header (固定高度/間距) */}
        <div className="mt-16 mb-4 px-6 shrink-0">
            <h2 className="text-3xl font-bold text-white text-center animate-fade-in-down">
                {data.title}
            </h2>
        </div>

        {/* 文字雲區域 (佔據剩餘空間，使用 relative 定位內部 absolute 元素) */}
        <div className="flex-1 relative w-full overflow-hidden">
            {cloudWords.map((item, idx) => (
                <span 
                key={idx}
                className="absolute text-white/80 font-bold animate-float-slow transition-colors hover:text-yellow-400 drop-shadow-md whitespace-nowrap"
                style={item.style}
                >
                {item.text}
                </span>
            ))}
        </div>

        {/* 底部金句 (固定高度/間距) */}
        <div className="mb-12 px-6 shrink-0 w-full z-20">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-center min-h-[140px] flex flex-col items-center justify-center relative overflow-hidden group">
                <Quote className="absolute top-2 left-2 text-white/20 w-8 h-8 rotate-180" />
                <div className="animate-pop-in key={currentQuoteIndex} flex flex-col items-center">
                    <p className="text-2xl font-bold text-yellow-300 leading-snug">
                    {quoteText}
                    </p>
                    {quoteAuthor && (
                    <p className="text-sm text-gray-400 font-serif mt-2 italic tracking-wider">
                        —— {quoteAuthor}
                    </p>
                    )}
                </div>
                <Quote className="absolute bottom-2 right-2 text-white/20 w-8 h-8" />
                
                {/* 進度條 */}
                <div className="absolute bottom-0 left-0 h-1 bg-yellow-400 animate-progress w-full origin-left" style={{animationDuration: '3000ms'}}></div>
            </div>
        </div>
    </div>
  );
};

// 修改：接收 subIndex 作為 props，移除內部 timer
const AwardsSlide = ({ data, subIndex }) => {
  const items = data.items;
  // 安全檢查，確保 subIndex 不會超出範圍 (雖然 App 會控制)
  const safeIndex = subIndex >= items.length ? 0 : subIndex;
  const currentItem = items[safeIndex];

  return (
    <div className="flex flex-col h-full px-5 pt-20 pb-20 justify-center relative z-10">
      <h2 className="text-3xl font-bold text-white mb-4 text-center animate-fade-in-down flex items-center justify-center gap-2">
        <Trophy className="text-yellow-400 w-8 h-8 animate-bounce-slow" /> {data.title}
      </h2>

      {/* 獎項卡片切換 */}
      <div className="flex-1 flex items-center justify-center">
        <div 
          key={safeIndex}
          className="bg-gradient-to-b from-white/10 to-black/40 border-2 border-yellow-500/50 p-6 rounded-2xl text-center w-full max-w-sm relative overflow-hidden animate-zoom-in-up"
        >
          {/* 光效 */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-500/20 blur-3xl rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-yellow-400/5 blur-3xl pointer-events-none animate-pulse"></div>

          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-500 text-black mb-4 shadow-[0_0_20px_rgba(234,179,8,0.6)]">
             <Award className="w-10 h-10" />
          </div>

          <h3 className="text-2xl font-black text-yellow-300 mb-1">{currentItem.award}</h3>
          <p className="text-xl font-bold text-white mb-4">得主：{currentItem.winner}</p>

          <div className="text-left bg-black/30 p-4 rounded-xl border border-white/10 mb-3">
            <h4 className="text-yellow-500 text-xs font-bold mb-1 uppercase tracking-wider">獲獎理由</h4>
            <p className="text-sm text-gray-200 leading-relaxed">{currentItem.reason}</p>
          </div>

          <div className="text-left bg-black/30 p-4 rounded-xl border border-white/10">
            <h4 className="text-yellow-500 text-xs font-bold mb-1 uppercase tracking-wider">經典時刻</h4>
            <p className="text-sm text-gray-200 leading-relaxed">{currentItem.moment}</p>
          </div>
        </div>
      </div>

      {/* 指示點 */}
      <div className="flex justify-center gap-2 mt-4">
        {items.map((_, idx) => (
          <div 
            key={idx} 
            className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === safeIndex ? 'bg-yellow-400 w-6' : 'bg-white/30'}`}
          />
        ))}
      </div>
    </div>
  );
};

const InteractiveSlide = ({ data, onRestart }) => {
  const handleCopy = () => {
    const textToCopy = `2025 回顧與 2026 展望\n【關於 2025】\n1.今年最讓你印象深刻的一件事是？\n2.今年最想感謝自己的一件事？\n3.用一個詞形容你的 2025：\n【關於 2026】\n1.給「歐劍諮商所」還有自己的一句話（也許是感謝，也許是期許）：\n2.對2026有甚麼期待：\n3.明年就是第四屆期初社大的十周年了，有甚麼特別想做的活動嗎：`;

    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    textArea.style.position = "fixed"; 
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      alert("題目已複製到剪貼簿！\n快去群組貼上並回答吧～");
    } catch (err) {
      console.error('Copy failed', err);
      alert("複製失敗，請手動複製。");
    }
    
    document.body.removeChild(textArea);
  };

  return (
    <div className="flex flex-col h-full px-5 pt-20 pb-20 relative z-10">
      <h2 className="text-3xl font-bold text-white mb-2 text-center animate-pop-in">{data.title}</h2>
      <p className="text-white/50 text-center mb-6 text-sm animate-fade-in" style={{animationDelay: '300ms'}}>
        分享你的故事！點擊下方按鈕複製題目
      </p>

      {/* 題目預覽區域 */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl overflow-y-auto max-h-[50vh] mb-6 flex-1">
         <div className="text-white/90 space-y-4 text-sm leading-relaxed">
            <h3 className="font-bold text-yellow-400 text-lg border-b border-white/10 pb-2 mb-3">2025 回顧與 2026 展望</h3>
            
            <div>
              <p className="font-bold text-pink-300 mb-1">【關於 2025】</p>
              <ul className="list-decimal list-inside space-y-1 text-gray-300">
                <li>今年最讓你印象深刻的一件事是？</li>
                <li>今年最想感謝自己的一件事？</li>
                <li>用一個詞形容你的 2025：</li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-blue-300 mb-1">【關於 2026】</p>
              <ul className="list-decimal list-inside space-y-1 text-gray-300">
                <li>給「歐劍諮商所」還有自己的一句話</li>
                <li>對 2026 有甚麼期待</li>
                <li>明年十周年的特別活動想法</li>
              </ul>
            </div>
         </div>
      </div>
      
      {/* 底部按鈕群：提升 z-index 確保不被擋住 */}
      <div className="flex flex-col gap-3 text-center relative z-50">
        <button 
          onClick={(e) => { e.stopPropagation(); handleCopy(); }}
          className="w-full bg-white text-black px-8 py-3 rounded-xl font-bold shadow-2xl active:scale-95 transition-transform flex items-center justify-center gap-2 mx-auto hover:bg-gray-200"
        >
           <Copy className="w-5 h-5" /> 複製題目到剪貼簿
        </button>

        <button 
          onClick={(e) => { e.stopPropagation(); onRestart(); }}
          className="w-full bg-gray-800 text-white border border-gray-600 px-8 py-3 rounded-xl font-bold shadow-xl active:scale-95 transition-transform flex items-center justify-center gap-2 mx-auto hover:bg-gray-700"
        >
           <RotateCcw className="w-5 h-5" /> 重新開始回顧
        </button>
      </div>
    </div>
  );
};

// --- 主程式 ---

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [subSlideIndex, setSubSlideIndex] = useState(0); // 新增：控制頁面內部的子步驟
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const totalSlides = SLIDES_DATA.length;
  const currentData = SLIDES_DATA[currentSlide];

  // 重置子步驟：當切換到新頁面時，將 subSlideIndex 歸零
  useEffect(() => {
    setSubSlideIndex(0);
  }, [currentSlide]);

  // 輔助函式：取得目前步驟的持續時間
  const getCurrentStepDuration = () => {
    if (currentData.type === 'food-story' || currentData.type === 'memory-story') {
      // 輪播單項: 1秒, 最後清單: 10秒
      // items 陣列長度為 N，索引 0 ~ N-1 是單項，索引 N 是清單
      return subSlideIndex < currentData.items.length ? 1000 : 10000;
    }
    if (currentData.type === 'awards') {
      // 每個獎項 5秒
      return 5000;
    }
    return currentData.duration || 0;
  };

  useEffect(() => {
    let timer;
    const duration = getCurrentStepDuration();

    // 只有當 duration > 0 時才啟動定時器
    if (!isPaused && duration > 0) {
      timer = setTimeout(() => {
        handleNext();
      }, duration);
    }
    return () => clearTimeout(timer);
  }, [currentSlide, subSlideIndex, isPaused]); // 監聽 subSlideIndex 變化

  const handleNext = () => {
    // 檢查當前頁面是否有子步驟
    let maxSubSteps = 0;
    if (currentData.type === 'food-story' || currentData.type === 'memory-story') {
      maxSubSteps = currentData.items.length; // 0~N-1是項目, N是清單，共 N+1 步
    } else if (currentData.type === 'awards') {
      maxSubSteps = currentData.items.length - 1; // 0~N-1 是項目，共 N 步 (最後一項播完就換頁)
    }

    // 如果還有子步驟沒播完，就進下一個子步驟
    if (subSlideIndex < maxSubSteps) {
      setSubSlideIndex(prev => prev + 1);
    } else {
      // 子步驟播完，進下一張投影片
      if (currentSlide < totalSlides - 1) {
        setCurrentSlide(prev => prev + 1);
      } else {
        // 如果是最後一張，回到第一張 (或停住)
        // 這裡因為有 Restart 按鈕，我們可以選擇停住或循環，這裡選擇停住(需手動點擊)
        // 但為了用戶體驗，若自動播放結束可以不做動作，依靠 Restart
      }
    }
  };

  const handlePrev = () => {
    // 簡單處理：回到上一張投影片 (reset subIndex 已由 useEffect 處理)
    // 如果想要更細緻的 "回到上一個子步驟"，可以在這裡實作類似 handleNext 的反向邏輯
    if (subSlideIndex > 0) {
      setSubSlideIndex(prev => prev - 1);
    } else {
      setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    }
  };

  const handleRestart = () => {
    setCurrentSlide(0);
    setSubSlideIndex(0);
    setIsPaused(false);
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

  const renderSlideContent = () => {
    // 傳遞 onNext, subIndex, onRestart 給所有 Slide
    const props = { 
      data: currentData, 
      onNext: handleNext, 
      subIndex: subSlideIndex,
      onRestart: handleRestart
    };

    const content = (() => {
      switch (currentData.type) {
        case 'cover': return <CoverSlide {...props} />;
        case 'member': return <MemberSlide {...props} />;
        case 'food-story': return <FoodStorySlide {...props} />;
        case 'memory-story': return <MemoryStorySlide {...props} />;
        case 'keywords': return <KeywordCloudSlide {...props} />;
        case 'awards': return <AwardsSlide {...props} />;
        case 'interactive': return <InteractiveSlide {...props} />;
        default: return <CoverSlide {...props} />;
      }
    })();

    return <div key={currentSlide} className="h-full">{content}</div>;
  };

  return (
    <div className="bg-black w-screen h-screen overflow-hidden md:flex md:items-center md:justify-center md:min-h-screen md:bg-gray-900 font-sans text-white">
      
      <div className="fixed inset-0 md:relative md:w-full md:max-w-md md:h-[850px] md:inset-auto md:rounded-3xl overflow-hidden shadow-2xl bg-black">
        
        {/* 背景漸層與動畫 (Cover & Member 頁面使用自己的背景，其他頁面使用共用漸層) */}
        {currentData.type !== 'cover' && currentData.type !== 'member' && (
           <div className={`absolute inset-0 bg-gradient-to-br ${currentData.bgColor} transition-colors duration-1000 ease-in-out animate-gradient-move`}></div>
        )}
        
        {/* 漂浮粒子 (僅在非通訊軟體介面顯示) */}
        {currentData.type !== 'cover' && currentData.type !== 'member' && <FloatingParticles />}

        {/* 雜訊質感 */}
        <div className="absolute inset-0 opacity-10 pointer-events-none z-0" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}></div>

        <ProgressBar 
          count={totalSlides} 
          current={currentSlide} 
          isPaused={isPaused} 
          currentDuration={getCurrentStepDuration()} // 使用動態計算的時間
        />

        <button 
             onClick={(e) => { e.stopPropagation(); togglePlay(); }}
             className={`absolute top-8 right-4 z-[60] p-3 rounded-full backdrop-blur-md border border-white/20 shadow-lg transition-all active:scale-95 hover:bg-white/10 ${isPlaying ? 'bg-white/20 text-white animate-pulse-glow' : 'bg-black/20 text-white/50'}`}
           >
             {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>

        {/* 內容區域：移除 z-10 以便讓內部元素可以正確處理堆疊 */}
        <div className="relative h-full w-full pt-safe">
          {renderSlideContent()}
        </div>

        {/* 導航觸控層：保持 z-20，位於背景與普通內容之上，但特定按鈕可通過 z-50 覆蓋 */}
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

        @keyframes slide-up { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }

        /* 特效：Zoom In Up (美食特寫) */
        @keyframes zoom-in-up {
          from { opacity: 0; transform: scale(0.8) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-zoom-in-up { animation: zoom-in-up 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }

        /* 特效：Ken Burns (背景緩慢放大移動) */
        @keyframes ken-burns {
          from { transform: scale(1.1); }
          to { transform: scale(1.3) translate(-2%, -2%); }
        }
        .animate-ken-burns { animation: ken-burns 10s ease-out forwards; }

        /* 特效：Polaroid Drop (拍立得掉落) */
        @keyframes polaroid-drop {
          from { opacity: 0; transform: scale(1.5) rotate(10deg); }
          to { opacity: 1; transform: scale(1) rotate(var(--rotate)); }
        }
        .animate-polaroid-drop { animation: polaroid-drop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }

        /* 特效：Flash (閃光燈) */
        @keyframes flash {
          0% { opacity: 0.8; }
          100% { opacity: 0; }
        }
        .animate-flash { animation: flash 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
}
