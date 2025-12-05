import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Play, Pause, Music, ChevronRight, ChevronLeft, 
  MapPin, Camera, Star, Heart, Quote, Calendar, Utensils,
  Volume2, VolumeX, Sparkles, Trophy, Award, Medal,
  MessageCircle, Phone, Video, MoreVertical, ArrowLeft, Search, Menu, Send, X, Users, Copy, Check, RotateCcw,
  Image as ImageIcon, Mic, Sticker, Smile
} from 'lucide-react';

// --- 資料內容設定 ---

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
      { date: '1/15 18:30', title: '📍 好時多涮涮鍋', desc: '駱彤生日慶生，送一堆蝦子根本吃不完', image: null }, 
      { date: '1/27 19:00', title: '📍 和牛涮', desc: '俞祥約歐劍大聚餐，教練、師母也來了!', image: null },
      { date: '3/9 12:30', title: '📍 1010 湘餐廳', desc: '攝影展當天的午餐聚會', image: null },
      { date: '3/31 13:00', title: '📍 CityLink 港式飲茶', desc: '到南港慶祝秉琛離職', image: null },
      { date: '5/15 18:45', title: '📍 六品小館', desc: '張適生日，吃完到張適家聊天小坐', image: null },
      { date: '7/16 19:15', title: '📍 岡心食堂', desc: '慶祝秉琛生日，吃完還去參觀無限城', image: null },
      { date: '8/11 12:00', title: '📍 史坦利美式牛排', desc: '慶祝秉琛新工作上工', image: null }
    ]
  },
  {
    type: 'memory-story', 
    title: '🗺️ 年度共同回憶',
    bgColor: 'from-pink-900 via-purple-900 to-black',
    items: [
      { month: '3月 14:00', title: '信義區攝影企劃', desc: '駱彤帽子大王 vs 秉琛推箱子服務', icon: 'camera', image: null }, 
      { month: '5月 10:30', title: '秉琛家包粽子', desc: '體驗南部粽製作、蹭好料', icon: 'star', image: null },
      { month: '7月 16:20', title: '宜蘭兩天一夜', desc: '羅東夜市、梅花湖。確立了「鬆散隨緣」的旅行風格', icon: 'map', image: null },
      { month: '10月 19:00', title: '六福村萬聖節', desc: '墓碑鎮遊行，芮妮恐怖又可愛<3', icon: 'ghost', image: null },
      { month: '10月 15:45', title: '秉琛戲劇成發', desc: '全員到齊支持，專業錄影攝影', icon: 'video', image: null }
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

// --- 共用組件 ---

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

const ImagePlaceholder = ({ src, label, height = "h-40", className = "" }) => {
  if (src) {
    return (
      <img 
        src={src} 
        alt={label || "image"} 
        className={`w-full ${height} object-cover ${className}`} 
      />
    );
  }
  return (
    <div className={`w-full ${height} bg-gray-800 flex flex-col items-center justify-center text-gray-500 ${className}`}>
      <Camera className="w-8 h-8 mb-1" />
      <span className="text-xs">{label}</span>
    </div>
  );
};

const ProgressBar = ({ count, current, isPaused, currentDuration }) => {
  return (
    <div className="absolute top-0 left-0 w-full flex gap-1 p-2 z-[60] safe-top pointer-events-none">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
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

// --- 共用 Chat Layout (模擬通訊軟體外框) ---
const ChatLayout = ({ title, children, showInput = true }) => {
  const scrollRef = useRef(null);

  // 當 children (內容) 改變時，自動捲動到底部
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  });

  return (
    <div className="flex flex-col h-full relative z-10 bg-[#1e1e1e] font-sans">
      {/* Header */}
      <div className="h-16 bg-[#2b2b2b]/90 backdrop-blur-md flex items-center justify-between px-4 border-b border-gray-700 pt-safe mt-6 md:mt-0 z-30 shrink-0">
        <div className="flex items-center gap-3">
          <ArrowLeft className="text-white w-6 h-6" />
          <div>
            <h1 className="text-white font-bold text-lg flex items-center gap-2">
              {title} <span className="text-sm font-normal text-gray-400">(3)</span>
            </h1>
          </div>
        </div>
        <div className="flex gap-4 text-white">
          <Search className="w-5 h-5" />
          <Phone className="w-5 h-5" />
          <Menu className="w-5 h-5" />
        </div>
      </div>

      {/* Content Area (Chat Messages) */}
      <div className="flex-1 overflow-y-auto bg-gray-900/50 relative" ref={scrollRef}>
        <div className="p-4 pb-24 min-h-full">
          {children}
        </div>
      </div>

      {/* Footer (Input Bar) */}
      {showInput && (
        <div className="absolute bottom-0 left-0 w-full bg-[#2b2b2b] border-t border-gray-700 p-3 z-30 flex items-center gap-3 pb-safe-bottom">
           <div className="p-2 text-gray-400"><RotateCcw size={24} /></div>
           <div className="flex-1 h-10 bg-[#1e1e1e] rounded-full px-4 flex items-center text-gray-500 text-sm cursor-not-allowed">
             Aa
           </div>
           <div className="p-2 text-[#00a884]"><Send size={24} /></div>
        </div>
      )}
    </div>
  );
};

// --- Page Components ---

const CoverSlide = ({ data, onNext }) => (
  <ChatLayout title={data.title} showInput={false}>
    {/* System Messages */}
    <div className="flex flex-col gap-4">
      <div className="flex justify-center">
        <span className="bg-gray-800 text-gray-400 text-xs px-3 py-1 rounded-full">Today</span>
      </div>
      <div className="flex justify-center">
        <span className="bg-gray-800 text-gray-400 text-xs px-3 py-1 rounded-full text-center leading-relaxed">
          2025 年度回顧已建立。<br/>群組成員：駱彤、徐秉琛、張適
        </span>
      </div>

      {/* Message 1: Keywords */}
      <div className="flex gap-2 items-end animate-fade-in-up">
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white shrink-0">Sys</div>
        <div className="bg-[#2b2b2b] p-3 rounded-2xl rounded-bl-none text-white border border-gray-700 max-w-[80%]">
          <p className="font-bold text-[#64b5f6] mb-2 text-sm">年度關鍵字</p>
          <div className="flex flex-wrap gap-2">
            {data.keywords.map((kw, i) => (
              <span key={i} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">#{kw}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Message 2: Image */}
      <div className="flex gap-2 items-end animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white shrink-0">Sys</div>
        <div className="max-w-[70%]">
           <ImagePlaceholder src={data.image} height="h-48" className="rounded-xl border border-gray-700 !mb-0" />
        </div>
      </div>

      {/* Message 3: Description */}
      <div className="flex gap-2 items-end animate-fade-in-up" style={{ animationDelay: '400ms' }}>
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white shrink-0">Sys</div>
        <div className="bg-[#2b2b2b] p-3 rounded-2xl rounded-bl-none text-white border border-gray-700 max-w-[85%] text-sm leading-relaxed">
          {data.description}
          <div className="text-[10px] text-gray-500 text-right mt-1">10:00 AM</div>
        </div>
      </div>
    </div>

    {/* Enter Button */}
    <div className="mt-8 flex justify-center pb-8">
       <button 
         onClick={(e) => { e.stopPropagation(); onNext(); }}
         className="bg-[#00a884] hover:bg-[#008f6f] text-black font-bold py-3 px-8 rounded-full flex items-center gap-2 shadow-lg transition-transform active:scale-95 border border-[#00a884]"
       >
         進入群組回顧 <ChevronRight className="w-5 h-5" />
       </button>
    </div>
  </ChatLayout>
);

const MemberSlide = ({ data }) => (
  // Member Slide 保持全螢幕個人頁面風格 (Profile View)
  <div className="flex flex-col h-full relative z-10 bg-black font-sans">
    <div className="absolute top-0 left-0 w-full z-20 flex justify-end p-4 pt-10">
      <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-md cursor-pointer">
        <X className="w-5 h-5 text-white" />
      </div>
    </div>

    {/* 修改：縮小 Banner 高度 (40% -> 30%) */}
    <div className="h-[30%] w-full relative overflow-hidden">
      {data.image ? (
        <img src={data.image} alt="banner" className="w-full h-full object-cover opacity-80" />
      ) : (
        <div className={`w-full h-full bg-gradient-to-br ${data.bgColor}`}></div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
    </div>

    <div className="flex-1 bg-black -mt-10 rounded-t-3xl px-6 relative z-10 animate-slide-up">
      <div className="absolute -top-16 left-1/2 -translate-x-1/2">
        <div className="w-32 h-32 rounded-full border-4 border-black bg-gray-800 overflow-hidden shadow-2xl">
           <ImagePlaceholder src={data.image} height="h-full" />
        </div>
        <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-black"></div>
      </div>

      <div className="mt-20 text-center">
        <h2 className="text-3xl font-bold text-white mb-1">{data.name}</h2>
        <p className="text-gray-400 text-sm">{data.role}</p>
        <div className="mt-3 inline-block px-4 py-1.5 rounded-full bg-gray-900 border border-gray-800 text-yellow-300 text-xs font-medium">
           {data.content.main}
        </div>
      </div>

      <div className="flex justify-center gap-8 mt-6 border-b border-gray-800 pb-6">
        {['Chat', 'Call', 'Video'].map((action, i) => (
          <div key={i} className="flex flex-col items-center gap-1 group cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-[#64b5f6] group-hover:bg-gray-800 transition-colors">
              {i === 0 ? <MessageCircle size={20} /> : i === 1 ? <Phone size={20} /> : <Video size={20} />}
            </div>
            <span className="text-xs text-gray-500">{action}</span>
          </div>
        ))}
      </div>

      {/* 修改：增加文字區域的最大高度 (30vh -> 50vh) */}
      <div className="mt-4 space-y-4 pb-20 overflow-y-auto max-h-[50vh] hide-scrollbar">
        {data.content.sections.map((section, idx) => (
          <div key={idx} className="flex gap-3 animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center shrink-0 text-gray-400">
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

const FoodStorySlide = ({ data, subIndex }) => {
  const items = data.items;
  
  return (
    <ChatLayout title={data.title}>
      {/* Intro Message */}
      <div className="flex justify-center mb-6">
        <span className="bg-gray-800 text-gray-400 text-xs px-3 py-1 rounded-full">
          {data.subtitle}
        </span>
      </div>

      {/* Messages Stream */}
      <div className="flex flex-col gap-6">
        {items.map((item, idx) => {
          // 只顯示到目前的進度
          if (idx > subIndex && subIndex < items.length) return null;
          
          return (
            <div key={idx} className="animate-fade-in-up flex flex-col gap-1 w-full">
              {/* LINE Style Date Center Badge */}
              <div className="flex justify-center mb-2">
                <span className="bg-gray-900/50 text-gray-400 text-[10px] px-2 py-0.5 rounded-full border border-gray-800">
                  {item.date}
                </span>
              </div>

              <div className="flex gap-3 items-end group w-full">
                <div className="w-8 h-8 rounded-full bg-yellow-600 flex items-center justify-center text-xs text-white shrink-0">
                  <Utensils size={14} />
                </div>
                <div className="max-w-[80%] flex flex-col gap-1">
                  <span className="text-xs text-gray-400 ml-1">Member</span>
                  <div className="bg-[#2b2b2b] p-2 rounded-2xl rounded-bl-none border border-gray-700 overflow-hidden">
                    <div className="relative">
                      <ImagePlaceholder src={item.image} height="h-48" className="rounded-lg w-full" />
                    </div>
                    <div className="mt-2 px-1 pb-1">
                      <h3 className="font-bold text-white text-base">{item.title}</h3>
                      <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Summary List (Show at the end) */}
        {subIndex >= items.length && (
          <div className="flex justify-center mt-4 animate-fade-in">
             <div className="bg-gray-800/80 px-4 py-2 rounded-full text-xs text-gray-300 flex items-center gap-2">
               <Check size={12} /> 2025 美食清單已彙整完畢
             </div>
          </div>
        )}
      </div>
    </ChatLayout>
  );
};

const MemoryStorySlide = ({ data, subIndex }) => {
  const items = data.items;

  return (
    <ChatLayout title={data.title}>
      <div className="flex justify-center mb-6">
        <span className="bg-gray-800 text-gray-400 text-xs px-3 py-1 rounded-full">
          Shared an album: 2025 Memories
        </span>
      </div>

      <div className="flex flex-col gap-6">
        {items.map((item, idx) => {
          if (idx > subIndex && subIndex < items.length) return null;

          return (
            <div key={idx} className="animate-fade-in-up flex flex-col gap-1 w-full">
              {/* LINE Style Date Center Badge */}
              <div className="flex justify-center mb-2">
                <span className="bg-gray-900/50 text-gray-400 text-[10px] px-2 py-0.5 rounded-full border border-gray-800">
                  {item.month}
                </span>
              </div>

              <div className="flex gap-3 items-end w-full">
                <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center text-xs text-white shrink-0">
                  <Camera size={14} />
                </div>
                <div className="max-w-[80%] flex flex-col gap-1">
                  <span className="text-xs text-gray-400 ml-1">Admin</span>
                  <div className="bg-[#2b2b2b] p-3 rounded-2xl rounded-bl-none border border-gray-700 relative overflow-hidden">
                    {/* Polaroid Style Message */}
                    <div className="bg-white p-2 pb-8 rounded shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-300">
                        <ImagePlaceholder src={item.image} height="h-40" className="bg-gray-100" />
                        <div className="mt-2 text-center">
                          <p className="text-black font-bold font-serif text-sm">{item.title}</p>
                        </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-300">
                      {item.desc}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
        {subIndex >= items.length && (
          <div className="flex justify-center mt-4 animate-fade-in">
             <div className="bg-gray-800/80 px-4 py-2 rounded-full text-xs text-gray-300">
               以上是 2025 的精選回憶
             </div>
          </div>
        )}
      </div>
    </ChatLayout>
  );
};

const KeywordCloudSlide = ({ data }) => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const cloudWords = useMemo(() => {
    return data.cloud.map((word, idx) => ({
      text: word,
      style: {
        top: `${Math.random() * 50 + 25}%`, // 集中在 25%~75% 高度
        left: `${Math.random() * 50 + 25}%`, // 集中在 25%~75% 寬度
        fontSize: `${Math.random() * 1.2 + 0.8}rem`,
        animationDelay: `${idx * 0.5}s`,
        animationDuration: `${Math.random() * 5 + 5}s`,
        opacity: Math.random() * 0.4 + 0.4
      }
    }));
  }, [data.cloud]);

  useEffect(() => {
    const interval = setInterval(() => {
      // 邏輯修改：我們不再循環切換顯示單一金句，而是讓 currentQuoteIndex 增加，
      // 以便渲染出列表中的更多金句 (堆疊顯示)
      setCurrentQuoteIndex(prev => {
        if (prev < data.quotes.length - 1) {
          return prev + 1;
        }
        return prev; // 停在最後一個，或者如果您希望循環顯示也可以，但"不要消失"通常意味著堆疊
      });
    }, 2500); // 每 2.5 秒顯示下一句
    return () => clearInterval(interval);
  }, [data.quotes.length]);

  return (
    <ChatLayout title={data.title}>
      {/* Background Cloud (Absolute within Chat Content) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-60">
         {cloudWords.map((item, idx) => (
            <span 
              key={idx}
              className="absolute text-gray-500 font-bold animate-float-slow whitespace-nowrap blur-[1px] hover:blur-none transition-all"
              style={item.style}
            >
              {item.text}
            </span>
         ))}
      </div>

      {/* Quote Message Stream (Stacking up) */}
      <div className="flex flex-col h-full justify-end relative z-10 space-y-4">
         {data.quotes.map((quote, idx) => {
            // 只顯示到目前的 index
            if (idx > currentQuoteIndex) return null;

            const quoteParts = quote.split('——');
            const quoteText = quoteParts[0];
            const quoteAuthor = quoteParts[1] ? quoteParts[1].trim() : '';

            return (
              <div key={idx} className="flex gap-3 items-end animate-fade-in-up">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white shrink-0 text-xs font-bold">
                    {quoteAuthor ? quoteAuthor[0] : 'Q'}
                  </div>
                  <div className="max-w-[85%] flex flex-col gap-1">
                    <span className="text-xs text-gray-400 ml-1">{quoteAuthor || 'Unknown'}</span>
                    <div className="bg-[#2b2b2b] px-4 py-3 rounded-2xl rounded-bl-none text-white border border-gray-700 shadow-lg">
                        <p className="text-lg font-medium">{quoteText}</p>
                    </div>
                  </div>
              </div>
            );
         })}
         
         {/* Fake typing indicator (只有當還有金句沒顯示時才出現) */}
         {currentQuoteIndex < data.quotes.length - 1 && (
           <div className="h-6 ml-12 text-xs text-gray-500 flex items-center gap-1">
              <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce"></span>
              <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce delay-100"></span>
              <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce delay-200"></span>
           </div>
         )}
      </div>
    </ChatLayout>
  );
};

const AwardsSlide = ({ data, subIndex }) => {
  const items = data.items;
  const safeIndex = subIndex >= items.length ? 0 : subIndex;
  const currentItem = items[safeIndex];

  return (
    <ChatLayout title={data.title}>
      <div className="flex justify-center mb-4">
        <span className="bg-yellow-900/50 text-yellow-500 border border-yellow-700/50 text-xs px-3 py-1 rounded-full flex items-center gap-1">
          <Trophy size={12} /> 年度頒獎典禮進行中...
        </span>
      </div>

      <div className="flex flex-col items-center justify-center h-full pb-20">
        {/* Award Card as a "System Red Envelope/Gift" Message */}
        <div key={safeIndex} className="w-full max-w-sm animate-zoom-in-up">
           <div className="bg-[#b45309] rounded-2xl overflow-hidden shadow-2xl border border-yellow-600/50">
              {/* Header */}
              <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 p-6 text-center text-white relative">
                 <Sparkles className="absolute top-2 left-2 text-yellow-200 opacity-50 animate-pulse" />
                 <Sparkles className="absolute bottom-2 right-2 text-yellow-200 opacity-50 animate-pulse delay-700" />
                 <Award className="w-12 h-12 mx-auto mb-2 text-white drop-shadow-md" />
                 <h3 className="text-xl font-bold drop-shadow-sm">{currentItem.award}</h3>
              </div>
              
              {/* Body */}
              <div className="p-5 bg-[#2b2b2b] text-center">
                 <p className="text-gray-400 text-xs mb-1">獲獎者</p>
                 <p className="text-2xl font-bold text-white mb-4">{currentItem.winner}</p>
                 
                 <div className="text-left bg-black/30 p-3 rounded-lg mb-3">
                   <p className="text-yellow-500 text-xs font-bold mb-1">頒獎詞</p>
                   <p className="text-gray-300 text-sm leading-relaxed">{currentItem.reason}</p>
                 </div>

                 <div className="text-left bg-black/30 p-3 rounded-lg">
                   <p className="text-yellow-500 text-xs font-bold mb-1">經典時刻</p>
                   <p className="text-gray-300 text-sm leading-relaxed">{currentItem.moment}</p>
                 </div>
              </div>
              
              {/* Footer Removed based on request */}
           </div>
        </div>
      </div>
    </ChatLayout>
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
    <div className="flex flex-col h-full relative z-10 bg-[#1e1e1e] font-sans">
       {/* Fake Navigation for Notes */}
       <div className="h-16 bg-[#2b2b2b] flex items-center justify-between px-4 border-b border-gray-700 pt-safe mt-6 md:mt-0">
          <div className="flex items-center gap-3 text-white">
             <ArrowLeft className="w-6 h-6" />
             <span className="font-bold text-lg">記事本</span>
          </div>
          <div className="flex gap-4 text-white">
             <Search className="w-5 h-5" />
             <Menu className="w-5 h-5" />
          </div>
       </div>

       <div className="flex-1 bg-[#1e1e1e] p-4 overflow-y-auto">
          {/* Note Card */}
          <div className="bg-[#2b2b2b] rounded-xl p-5 border border-gray-700 shadow-lg mb-6">
             <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold">歐</div>
                <div>
                   <p className="text-white font-bold text-sm">歐劍諮商所</p>
                   <p className="text-gray-500 text-xs">Today, 12:00 PM</p>
                </div>
             </div>
             
             <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-600 pb-2">{data.title}</h2>
             
             <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
                <div>
                  <p className="text-[#64b5f6] font-bold mb-1">【關於 2025】</p>
                  <ul className="list-decimal list-inside space-y-1 pl-1">
                    <li>今年最讓你印象深刻的一件事是？</li>
                    <li>今年最想感謝自己的一件事？</li>
                    <li>用一個詞形容你的 2025：</li>
                  </ul>
                </div>
                <div>
                  <p className="text-[#64b5f6] font-bold mb-1">【關於 2026】</p>
                  <ul className="list-decimal list-inside space-y-1 pl-1">
                    <li>給「歐劍諮商所」還有自己的一句話</li>
                    <li>對 2026 有甚麼期待</li>
                    <li>明年十周年的特別活動想法</li>
                  </ul>
                </div>
             </div>

             <div className="mt-6 pt-4 border-t border-gray-600 flex justify-between items-center text-gray-400 text-xs">
                <div className="flex gap-2">
                   <span className="flex items-center gap-1"><Heart size={14} /> 3</span>
                   <span className="flex items-center gap-1"><MessageCircle size={14} /> 0</span>
                </div>
             </div>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              onClick={(e) => { e.stopPropagation(); handleCopy(); }}
              className="w-full bg-[#00a884] text-black font-bold py-3 rounded-lg shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
               <Copy size={18} /> 複製題目
            </button>

            <button 
              onClick={(e) => { e.stopPropagation(); onRestart(); }}
              className="w-full bg-gray-700 text-white font-bold py-3 rounded-lg shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
               <RotateCcw size={18} /> 重新播放
            </button>
          </div>
       </div>
    </div>
  );
};

// --- 主程式 ---

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [subSlideIndex, setSubSlideIndex] = useState(0); 
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const totalSlides = SLIDES_DATA.length;
  const currentData = SLIDES_DATA[currentSlide];

  // 判斷當前是否為封面
  const isCover = currentSlide === 0;

  useEffect(() => {
    setSubSlideIndex(0);
  }, [currentSlide]);

  const getCurrentStepDuration = () => {
    if (currentData.type === 'food-story' || currentData.type === 'memory-story') {
      return subSlideIndex < currentData.items.length ? 1000 : 10000;
    }
    if (currentData.type === 'awards') {
      return 5000;
    }
    return currentData.duration || 0;
  };

  useEffect(() => {
    let timer;
    const duration = getCurrentStepDuration();

    if (!isPaused && duration > 0) {
      timer = setTimeout(() => {
        handleNext();
      }, duration);
    }
    return () => clearTimeout(timer);
  }, [currentSlide, subSlideIndex, isPaused]); 

  const handleNext = () => {
    let maxSubSteps = 0;
    if (currentData.type === 'food-story' || currentData.type === 'memory-story') {
      maxSubSteps = currentData.items.length; 
    } else if (currentData.type === 'awards') {
      maxSubSteps = currentData.items.length - 1;
    }

    if (subSlideIndex < maxSubSteps) {
      setSubSlideIndex(prev => prev + 1);
    } else {
      if (currentSlide < totalSlides - 1) {
        setCurrentSlide(prev => prev + 1);
      }
    }
  };

  const handlePrev = () => {
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
        
        {/* 背景漸層與動畫 */}
        {!isCover && currentData.type !== 'member' && currentData.type !== 'interactive' && (
           <div className={`absolute inset-0 bg-gradient-to-br ${currentData.bgColor} transition-colors duration-1000 ease-in-out animate-gradient-move`}></div>
        )}
        
        {/* 漂浮粒子 */}
        {!isCover && currentData.type !== 'member' && currentData.type !== 'interactive' && <FloatingParticles />}

        {/* 只有在非 Cover 頁面才顯示進度條 */}
        {!isCover && (
          <ProgressBar 
            count={totalSlides} 
            current={currentSlide} 
            isPaused={isPaused} 
            currentDuration={getCurrentStepDuration()} 
          />
        )}

        <button 
             onClick={(e) => { e.stopPropagation(); togglePlay(); }}
             className={`absolute top-8 right-4 z-[60] p-3 rounded-full backdrop-blur-md border border-white/20 shadow-lg transition-all active:scale-95 hover:bg-white/10 ${isPlaying ? 'bg-white/20 text-white animate-pulse-glow' : 'bg-black/20 text-white/50'}`}
           >
             {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>

        <div className="relative h-full w-full pt-safe">
          {renderSlideContent()}
        </div>

        {/* 只有在非 Cover 頁面才顯示左右導航點擊區 */}
        {!isCover && (
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
        )}

        <audio ref={audioRef} loop>
             <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
        </audio>

      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .pt-safe { padding-top: env(safe-area-inset-top, 20px); }
        .safe-top { top: env(safe-area-inset-top, 0px); }
        .pb-safe-bottom { padding-bottom: env(safe-area-inset-bottom, 20px); }

        /* 背景流動動畫 */
        @keyframes gradient-xy {
            0% { background-position: 0% 50%; background-size: 150% 150%; }
            50% { background-position: 100% 50%; background-size: 200% 200%; }
            100% { background-position: 0% 50%; background-size: 150% 150%; }
        }
        .animate-gradient-move {
            animation: gradient-xy 15s ease infinite;
        }

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
