import { ProposalData } from './types';

export const INITIAL_PROPOSAL: ProposalData = {
  title: "Cloud Sanctuary",
  subtitle: "菁英的雲端聖所 (Cloud Sanctuary for the Elite)",
  author: "Strategy & Planning Team",
  date: new Date().toLocaleDateString('zh-TW'),
  sections: [
    {
      id: "section-1",
      title: "一、 品牌重新定位：從「露營」到「雲端行館」",
      content: "**核心概念：** Cloud sanctuary for the Elite（菁英的雲端聖所）。\n\n**關鍵字：** 隱世（Secluded）、訂製（Bespoke）、靈性修復（Spiritual Recharging）。\n\n**目標客群：**\n\n*   **B2B：** 跨國企業高管、科技業董事會（新竹地利之便）、私董會、高端培訓機構。\n*   **B2C：** 國內外富豪、隱形冠軍企業主、尋求隱私的公眾人物。"
    },
    {
      id: "section-2",
      title: "二、 會員制度設計：打造「階級」與「歸屬感」",
      content: "對於富人來說，能用錢買到的東西不稀奇，「買不到的資格」才珍貴。建議採用邀請制（Invitation Only）或高門檻會籍。",
      subsections: [
        {
          id: "tier-1",
          title: "Tier 1: The Zenith Club（天頂黑卡 - 限量 50 席）",
          content: "**入會費：** 高額（例如 300-500 萬台幣），可抵扣消費，甚至具備債券性質（數年後可退）。\n\n**核心權益：**\n\n*   **「星空艙」優先預訂權：** 保證在熱門節日（如櫻花季、跨年）有入住資格。\n*   **封館權益：** 每年一次優先封館權（舉辦私人派對或家族聚會）。\n*   **專屬直升機/保母車接送：** 解決山路交通痛點，從桃園機場或台北直接接駁。\n*   **客製化餐飲：** 米其林主廚到府（Villa）服務。"
        },
        {
          id: "tier-2",
          title: "Tier 2: Corporate Retreat Member（企業領袖卡）",
          content: "**目標：** 竹科大廠、外商銀行、高端管顧公司。\n\n**核心權益：**\n\n*   針對「策略會議」設計的套裝（包含會議設備、保密協議簽署服務、團隊建立課程）。\n*   平日（週一至週四）優先訂房與折扣。\n*   提供講師與課程資源對接（如冥想大師、領導力教練）。"
        },
        {
          id: "tier-3",
          title: "Tier 3: Season Pass（季節通行證 - 訂閱制）",
          content: "**目標：** 講究生活品味的都會新貴。\n\n**權益：** 享有每季一次的入住權益與專屬活動邀請（如品酒會、高山音樂會）。"
        },
        {
          id: "star-cabin",
          title: "針對「星空艙（The Star Cabin）」的特殊操作",
          content: "*   **競標制：** 最熱門的日期（如流星雨極大期），不直接販售，開放會員「競標」，將其打造為身份象徵。\n*   **命名權：** 針對頂級會員，甚至可以短期擁有該艙的「冠名權」。"
        }
      ]
    },
    {
      id: "section-3",
      title: "三、 行銷策略：海內外分進合擊",
      content: "要打造成國際性 Villa，不能只在 Agoda 或 Booking.com 上架，必須走**「渠道行銷」與「圈層行銷」**。",
      subsections: [
        {
          id: "domestic",
          title: "1. 國內行銷：深耕「竹科」與「信義區」",
          content: "**異業結盟（Luxury Partnerships）：**\n\n*   **超跑俱樂部：** 與 Ferrari、Porsche 台灣代理商合作，舉辦「山道試駕 x 雲端午宴」。\n*   **私人銀行與家族辦公室：** 與 UBS、中信私銀合作，將喜翁作為他們招待頂級客戶（VVIP）的秘密基地。\n\n**B2B 企業行程推廣：**\n\n*   直接針對竹科高階人資（HR）與執行長辦公室推廣「高管靈修之旅」或「封閉式決策會議」。\n*   強調資安與隱私（例如：提供無線電波屏蔽會議室，確保商業機密不外洩）。\n\n**KOL/KOC 策略：**\n\n*   不找大眾網紅，找**「品味型」與「知識型」**KOL（如知名建築師、創業家導師）。請他們來體驗「在星空下思考商業佈局」。"
        },
        {
          id: "international",
          title: "2. 國際行銷：台灣的「阿爾卑斯山」替代方案",
          content: "**定位論述：** 針對香港、新加坡、日本及歐美客群，將喜翁包裝為 **\"The Hidden Gem above the Clouds in Taiwan\"**。強調台灣的高山美景不輸瑞士，但性價比與服務更具亞洲細緻感。\n\n**具體操作：**\n\n*   **加入國際奢華聯盟：** 申請加入 SLH (Small Luxury Hotels of the World) 或 Relais & Châteaux (羅萊夏朵)。這是國際富豪挑選飯店的指南，掛上這個認證等於拿到國際入場券。\n*   **香港/新加坡：** 主打「週末逃離城市（Weekend Escape）」，週五飛台灣，專車接送上山，週日回程。\n*   **日本：** 主打「台灣原民文化 x 奢華體驗」。結合五峰鄉泰雅族文化（如精緻化的原民料理、古調吟唱），日本人對台灣原鄉文化極具興趣。\n*   **數位遊牧的頂層（Executive Nomads）：** 宣傳擁有全山區最快的專線網路（Leased Line），將星空艙包裝成「全球最美的 Zoom Meeting 背景」。"
        }
      ]
    },
    {
      id: "section-4",
      title: "四、 產品與服務升級建議（硬體與軟體）",
      content: "要支撐高價位，服務必須跟上。",
      subsections: [
        {
          id: "hardware",
          title: "星空艙的極致化",
          content: "*   不僅是看風景，要有智能控制（一鍵霧化玻璃保證隱私）。\n*   配備高規格望遠鏡與專屬天文導覽員。\n*   艙內 Mini Bar 提供台灣在地頂級酒水（如葛瑪蘭威士忌原酒、威石東葡萄酒）。"
        },
        {
          id: "content",
          title: "課程與內容 (Content is King)",
          content: "*   **大師講座：** 邀請經濟學家、哲學家上山，舉辦僅限 10 人的爐邊談話。\n*   **身心靈療癒：** 高海拔瑜珈、頌缽音療、森林呼吸法（利用杉木林的芬多精）。"
        },
        {
          id: "service",
          title: "管家服務 (Butler Service)",
          content: "*   每一組客人都配有一位專屬管家（24小時待命）。\n*   管家需具備多語言能力，並能安排周邊秘境導覽。"
        },
        {
          id: "dining",
          title: "餐飲升級",
          content: "*   不僅是 BBQ，而是**「產地到餐桌（Farm to Table）」的法式/原民融合料理**（Fine Dining）。"
        }
      ]
    }
  ]
};