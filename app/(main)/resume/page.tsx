import Image from "next/image";
import Link from "next/link";
import "boxicons/css/boxicons.min.css";
import { SectionTitle } from "./components/SectionTitle";
import DownloadButton from "./components/downloadButton";

// 工作、學歷
interface infoCardProp {
  date: string;
  imageSrc?: string;
  label: string;
  content?: string;
}
function InfoCard({ date, imageSrc, label, content }: infoCardProp) {
  return (
    <div className="mb-5 flex justify-around">
      <div className="w-1/3 px-10 text-right text-lg font-medium italic text-gray-600">
        {date}
      </div>
      <div className="flex w-3/5 gap-5">
        {imageSrc && (
          <Image
            src={imageSrc}
            width={96}
            height={96}
            alt="圖標"
            className="h-24 w-24 object-contain"
          />
        )}
        <div className="flex max-w-2xl flex-col justify-center">
          <div className="text-lg font-semibold">{label}</div>
          <div className={`py-2 pr-10 text-base ${imageSrc ? "" : "indent-8"}`}>
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}

// 技能
interface skillCardProp {
  label: string;
  iconClass: string;
}
function SkillCard({ label, iconClass }: skillCardProp) {
  return (
    <div className="flex h-14 w-14 flex-col justify-center rounded-full text-center align-middle">
      <i className={`bx md:bx-md bx-lg ${iconClass}`}></i>
      <div className="hidden text-xs leading-[10px] md:block">{label}</div>
    </div>
  );
}

// 專案
interface ProjectCardProp {
  src: string;
  imageSrc: string;
  title: string;
  content: string;
  frontend?: string;
  backend?: string;
  other?: string;
  children?: React.ReactNode;
}
function ProjectCard({ children, ...arg }: ProjectCardProp) {
  return (
    <Link
      href={arg.src}
      target="_blank"
      className="group flex flex-row gap-5 lg:flex-col lg:gap-0"
    >
      <div className="w-1/2 lg:w-full">
        <Image
          src={arg.imageSrc}
          width={500}
          height={300}
          className="mb-0 h-52 w-full max-w-5xl rounded-lg object-cover transition duration-300 group-hover:scale-105 md:h-60 lg:mb-5 xl:h-80 xl:object-none xl:object-center"
          alt={arg.title}
        />
      </div>
      <div className="w-1/2 transition duration-300 group-hover:scale-[1.03] lg:w-full">
        <h2 className="mb-2 text-2xl font-bold">{arg.title}</h2>
        <p className="mb-4 text-gray-700">{arg.content}</p>
        <div className="md:mb-4">
          <div className="text-md hidden font-semibold lg:block">
            所使用技術：
          </div>
          <div className="flex flex-col flex-wrap">
            {[arg.frontend, arg.backend, arg.other].map(
              (key, index) =>
                key && (
                  <div key={index}>
                    <div className="hidden lg:block">
                      <span className="font-medium">
                        {["前端", "後端", "其他"][index]}：
                      </span>
                      <span className="text-gray-700">{key}</span>
                    </div>

                    <span className="flex flex-wrap lg:hidden">
                      {key.split("、").map((tags, i) => (
                        <span
                          key={i}
                          className="m-1 rounded-full border border-orange-400 px-3 py-1 text-xs text-orange-400"
                        >
                          {tags}
                        </span>
                      ))}
                    </span>
                  </div>
                ),
            )}
          </div>
        </div>
        {children && (
          <div className="mb-4 hidden md:block">
            <p className="text-md font-semibold">網站詳細功能：</p>
            {children}
          </div>
        )}
      </div>
    </Link>
  );
}

export default function Resume() {
  return (
    <div className="mx-4 my-8 min-h-screen rounded-2xl bg-white p-14 xl:mx-20">
      {/* 自我介紹 */}
      <section className="flex flex-col items-center justify-center lg:flex-row lg:gap-16">
        <Image
          src="/image/headshot.jpg"
          width={144} // 圖片解析度
          height={144} // 圖片解析度
          alt="大頭照"
          className="h-64 w-64 rounded-full object-cover"
        />
        <div className="flex flex-col justify-center p-5">
          <h1 className="mb-2 text-2xl font-bold">周哲緯</h1>
          <p className="leading-relaxed text-gray-700">
            您好，我是周哲緯，畢業於中興大學。
            <br />
            自我要求高，善於觀察、聆聽他人意見，邏輯清晰且做事細心謹慎。
            <br />
            樂於接觸新事物，配合度及抗壓性高。
          </p>

          <div className="mt-4 flex flex-col gap-3 text-gray-700 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex items-center gap-2">
              <i className="bx bx-sm bxl-gmail"></i>
              <span>zzhe828@gmail.com</span>
            </div>
            {/* <span className="hidden text-gray-400 sm:block">|</span>
            <div className="flex items-center gap-2">
              <i className="bx bx-sm bx-mobile"></i>
              <span>0963912230</span>
            </div> */}
          </div>
        </div>
      </section>

      {/* 工作經歷 */}
      <section className="mt-16 border-b-2 border-gray-400 pb-10 pt-5">
        <SectionTitle label="工作經驗" />
        <InfoCard
          date="7/2024-11/2024"
          // imageSrc="/image/ispan.jpeg"
          label="前端工程師養成班 / iSpan資展國際"
          content="參加資展國際(原資策會)前端工程師養成班，並於2個月內團體完成專案-寵物服務及購物平台，在團體中擔任組長一職，完成網站結構架設、領養功能、組員檔案合併及協助組員解決問題。"
        />
        <InfoCard
          date="12/2022-6/2024"
          label="土木工程師 / 宜順工程顧問股份有限公司"
          content="檢測河堤安全危害狀況、協助內業報告製作、與政府機關人員合作並報告業務內容以及檢測成果。"
        />
        <InfoCard
          date="10/2018-6/2019"
          // imageSrc="/image/FamilyMart.png"
          label="門市店員 / 全家便利商店股份有限公司"
          content="處理門市店內結帳、貨物管理等服務。"
        />
      </section>

      {/* 學歷 */}
      <section className="mt-16 border-b-2 border-gray-400 pb-10 pt-5">
        <SectionTitle label="學歷" />
        <InfoCard
          date="9/2017-6/2021"
          imageSrc="/image/Chung-Hsing.jpg"
          label="國立中興大學"
          content="土木工程學系 / 學士"
        />
      </section>

      {/* 技能 */}
      <section className="mt-16 border-b-2 border-gray-400 pb-10 pt-5 select-none">
        <SectionTitle label="技能" />
        <div className="mb-10 flex flex-row">
          <div className="w-1/2 px-5 sm:px-20">
            <div className="mb-5 inline-block border-b-2 border-orange-400 text-xl">
              前端工具
            </div>
            <div className="flex flex-row flex-wrap gap-5">
              <SkillCard label="CSS" iconClass="bxl-css3" />
              <SkillCard label="HTML" iconClass="bxl-html5" />
              <SkillCard label="JavaScript" iconClass="bxl-javascript" />
              <SkillCard label="TypeScript" iconClass="bxl-typescript" />
              <SkillCard label="React" iconClass="bxl-react" />
              <SkillCard label="Bootstrap" iconClass="bxl-bootstrap" />
              <SkillCard label="Tailwind" iconClass="bxl-tailwind-css" />
              <SkillCard label="jQuery" iconClass="bxl-jquery" />
            </div>
          </div>
          <div className="w-1/2 px-5 sm:px-20">
            <div className="mb-5 inline-block border-b-2 border-orange-400 text-xl">
              其他工具
            </div>
            <div className="flex flex-row flex-wrap gap-5">
              <SkillCard label="Nodejs" iconClass="bxl-nodejs" />
              <SkillCard label="Figma" iconClass="bxl-figma" />
              <SkillCard label="Git" iconClass="bxl-git" />
              <SkillCard label="PHP" iconClass="bxl-php" />
            </div>
          </div>
        </div>
      </section>

      {/* 自傳 */}
      <section className="mt-16 border-b-2 border-gray-400 pb-10 pt-5">
        <SectionTitle label="自傳" />
        <div className="mx-auto max-w-7xl px-5 leading-relaxed sm:px-24">
          <p>
            我是周哲緯，畢業於中興大學。善於溝通且冷靜客觀，認真負責。熱情接觸新事物，對於交辦事項總是有規劃且盡力完成。
          </p>

          <h2 className="mt-6 font-bold">【社團經驗】</h2>
          <p>
            就學期間不忘學生本業，努力學習且成績也維持一定水準。課餘之時積極參與社團活動，並且擔任社團幹部，於活動期間負責財務相關事項。
          </p>

          <h2 className="mt-6 font-bold">【職場經驗】</h2>
          <ul className="list-disc space-y-4 pl-6">
            <li>
              <span className="font-medium">便利商店兼職（大學期間）：</span>
              <p className="pl-6">
                學習以圓融態度應對各種情況，提升與客戶互動的能力，處理多樣化的工作內容，培養快速應變與多工處理的能力。
              </p>
            </li>
            <li>
              <span className="font-medium">校內藝文展場助理：</span>
              <p className="pl-6">
                負責場地佈置與活動紀錄，養成細心觀察與謹慎執行工作的習慣。
              </p>
            </li>
            <li>
              <span className="font-medium">宜順工程顧問（畢業後）：</span>
              <p className="pl-6">
                與政府機構接洽，熟練正式文件的處理，並能有效規劃工作時程與案件優先順序，最大化工作效率。
              </p>
            </li>
          </ul>

          <h2 className="mt-6 font-bold">【轉職契機】</h2>
          <p>
            畢業後對程式語言產生興趣，除自學線上資源外，也報名了資展國際的課程，深入學習後更加確定對程式語言的喜愛。於網路中自己探索、尋找問題的解答，並利用各種不同的技術實現更有效率解決方案，對此我感到樂此不疲。
          </p>

          <p className="mt-6">
            感謝撥空閱讀我的履歷，我會把握每次機會並以最優良的態度對待每一份工作。
          </p>
        </div>
      </section>

      {/* 專案 */}
      <section className="mt-16 border-b-2 border-gray-400 pb-10 pt-5">
        <SectionTitle label="專案" />
        <div className="grid grid-cols-1 gap-12 px-14 lg:grid-cols-2">
          <ProjectCard
            src="https://github.com/zhouzzhe/PetLove"
            imageSrc="/image/petlove.png"
            title="寵物服務及購物平台-寵樂(PetLove)"
            content="於資展國際上課期間團體完成的專案，而我在團體中擔任組長一職，主要負責領養及保母前後端頁面及功能、網站結構架設以及所有網頁整合等。"
            frontend="HTML、CSS、JavaScript、React"
            backend="Node.js"
            other="MySQL、Figma"
          >
            <ul className="list-inside list-disc space-y-1 text-gray-700">
              <li>後台架設 - 方便管理商品上下架及數量價格更改。</li>
              <li>
                表單設計 - 確認使用者資訊及需求並傳入資料庫中，集中管理資料。
              </li>
              <li>篩選功能 - 協助使用者快速找到符合條件的品項。</li>
            </ul>
          </ProjectCard>
          <ProjectCard
            src="https://zhouzzhe.github.io/Home.html"
            imageSrc="/image/magazine.png"
            title="個人生活記錄網站"
            content="課程初期利用基本的HTML、CSS、JavaScript完成的個人生活紀錄網站，並未使用到任何框架，主要是為了熟悉最基本的三種程式語言。"
            frontend="HTML、CSS、JavaScript"
          ></ProjectCard>
        </div>
      </section>
      <DownloadButton />
    </div>
  );
}
