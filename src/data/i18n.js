export const languages = { ps: 'پښتو', prs: 'دری', en: 'EN' };

const ps = {
  lang: 'ps', dir: 'rtl', name: 'ډاکټر جمشید رسا', englishName: 'DR. JAMSHID RASA',
  nav: ['کور', 'ویډیوګانې', 'مشوره', 'د ډاکټر رسا په اړه', 'اړیکه'],
  book: 'مشوره واخلئ', bookLong: 'د مشورې وخت واخلئ', watch: 'ویډیوګانې وګورئ',
  roles: 'ارواپوه · ښوونکی · هڅوونکی وینا وال', hope: 'د راتلونکي لپاره هیله',
  tagline: 'د امید، پوهې او رواني سوکالۍ لپاره', heroTitle: ['د امید، پوهې او', 'رواني سوکالۍ لپاره'],
  heroBody: 'د روانې روغتیا، کورنۍ، زده کړې او شخصي ودې په اړه ګټورې ویډیوګانې، مشورې او سیمینارونه یو ځای وګورئ.',
  hello: 'ښه راغلاست،', helloTitle: 'ښه ژوند له یوې وړې خبرې پیلېږي.',
  helloBody: 'ستاسو د زده کړې، ودې او هوساینې په سفر کې، دلته له تاسو سره یو.',
  heroNote: 'واورئ. زده کړئ. وده وکړئ.', explore: 'له همدې ځایه یې پیل کړئ',
  quote: 'هره نوې ورځ، د یوه نوي پیل فرصت دی.', quoteLabel: 'د هیله‌من ژوند په لور',
  scroll: 'نور وګورئ', videoKicker: 'پوهه د ښه ژوند لپاره', videosTitle: 'ویډیوګانې او درسونه',
  videosBody: 'د روانې روغتیا، کورنۍ، زده کړې او ژوند په اړه د ډاکټر رسا ګټورې ویډیوګانې.',
  filters: ['ټول', 'روانه روغتیا', 'کورنۍ او اړیکې', 'زده کړه او کانکور', 'شخصي وده او مالي فکر'],
  videoTitles: ['[د روانې روغتیا ویډیو]', '[د کورنۍ او اړیکو ویډیو]', '[د زده کړې او کانکور ویډیو]', '[د شخصي ودې ویډیو]'],
  videoDescription: '[د ویډیو لنډه تشریح]', demo: 'بېلګه', watchOne: 'ګورئ',
  allVideos: 'د ټولو ویډیوګانو لپاره یوټیوب ته لاړ شئ',
  videoPending: 'دا د ویډیو بېلګه ده. اصلي ویډیو به ژر ورزیاته شي.', close: 'وتړئ',
  pillarKicker: 'یو هدف، درې لارې', pillarsTitle: 'زموږ درې اصلي برخې',
  pillarsIntro: 'د زده کړې، مرستې او لارښوونې له لارې، د یوه روښانه راتلونکي لپاره.',
  pillars: [
    { title: 'خصوصي عالي لیسه', body: 'د کابل ځوانو زده کوونکو ته معیاري زده کړې، په ځانګړې توګه په ریاضي او ساینسي مضامینو کې.', more: '[د لیسې نوم، پته او د نوم‌لیکنې معلومات به دلته ورزیات شي.]' },
    { title: 'خیریه بنسټ', body: 'د روغتیا، زده کړې او ټولنیز ملاتړ په برخو کې د اړمنو کسانو سره مرسته.', more: '[د بنسټ نوم، پروګرامونه او د مرستې معلومات به دلته ورزیات شي.]' },
    { title: 'مشوره او سیمینارونه', body: 'ځانګړې مشورې، د کورنۍ لارښوونه او عامه ورکشاپونه د ښه ژوند لپاره.', more: '[د مشورو او راتلونکو سیمینارونو مهالوېش به دلته ورزیات شي.]' }
  ], more: 'نور ولولئ', less: 'لږ ولولئ',
  bookingKicker: 'ستاسو خبرې، زموږ پام', bookingTitle: 'د خبرو لپاره یو خوندي ځای.',
  bookingBody: 'ستاسو ستونزې مهمې دي. خپل مشکل له موږ سره شریک کړئ او د مشورې لپاره وخت واخلئ.',
  fields: { name: 'بشپړ نوم', phone: 'د تلیفون شمېره', topic: 'د مشورې موضوع', message: 'لنډ پیغام', email: 'برېښنالیک', optional: '(اختیاري)' },
  namePlaceholder: 'ستاسو نوم', phonePlaceholder: '+93 …', messagePlaceholder: 'څنګه درسره مرسته کولای شو؟', select: 'موضوع وټاکئ',
  topics: ['خپګان', 'اندیښنه او فشار', 'د خوب ستونزې', 'کورنۍ او واده', 'زده کړه او کانکور', 'بل'],
  send: 'پیغام ولېږئ', privacy: 'ستاسو معلومات محفوظ او محرم پاتې کیږي.',
  error: 'مهرباني وکړئ ټول اړین ځایونه په سمه توګه ډک کړئ.',
  demoNote: 'دا یوه ازمایښتي فورمه ده؛ معلومات نه لېږل کېږي.',
  success: 'مننه! ازمایښتي فورمه مو بشپړه کړه. پیغام نه دی لېږل شوی او د مشورې وخت نه دی ټاکل شوی.',
  whatsapp: 'د واټسپ له لارې اړیکه', phonePending: 'د واټسپ او تلیفون تایید شوې شمېره به ژر ورزیاته شي.',
  notice: 'دا ویب پاڼه ښوونیزه ده او د مسلکي درملنې ځای نه نیسي. که حالت جدي وي، مهرباني وکړئ له متخصص ډاکټر سره اړیکه ونیسئ.',
  aboutKicker: 'د دې سفر تر شا', aboutTitle: 'د ډاکټر جمشید رسا په اړه',
  about: [ 'ډاکټر جمشید رسا په افغانستان کې یو پېژندل شوی ارواپوه، ښوونکی او هڅوونکی وینا وال دی. هغه د ځوانانو، کورنیو او زده کوونکو سره د روانې روغتیا، زده کړې او شخصي ودې په برخو کې کار کوي.', 'هغه د ریاضي یو ځانګړی ښوونکی هم دی او ډېرو زده کوونکو ته یې د کانکور ازموینې لپاره په چمتووالي کې مرسته کړې ده.' ],
  story: '[دلته د هغه لنډه شخصي کیسه ولیکئ]', featured: 'په دې رسنیو کې ښکاره شوی',
  contact: 'اړیکه', contactKicker: 'خبرې له دې ځایه پیلېږي', contactTitle: 'راځئ، اړیکه ونیسو.',
  contactBody: 'د مشورې، زده کړې او ګډ کار لپاره خپل پیغام راسره شریک کړئ.',
  addressLabel: 'زموږ پته', address: 'کابل، افغانستان، د دارالامان سړک، کارته سه، د تجارت وزارت کوڅه، کور نمبر ۱۰',
  map: 'په نقشه کې وګورئ', follow: 'موږ تعقیب کړئ', socialsNote: 'ټولنیزې پتې د تایید په تمه دي.',
  footerTitle: 'د یوه روښانه راتلونکي لپاره، یو ځای.', copyright: '© ۲۰۲۶ ډاکټر جمشید رسا. ټول حقونه خوندي دي.',
  home: 'بېرته کور ته', skip: 'اصلي منځپانګې ته لاړ شئ', openMenu: 'مېنو پرانیزئ', closeMenu: 'مېنو وتړئ',
  portraitAlt: 'ډاکټر جمشید رسا، له تودې موسکا سره او لاس تر زنې لاندې', portraitLabel: 'ښوونه · لارښوونه · هیله',
  pageTitle: 'ډاکټر جمشید رسا | ارواپوه، ښوونکی او هڅوونکی وینا وال'
};

const prs = {
  lang: 'fa-AF', dir: 'rtl', name: 'داکتر جمشید رسا', englishName: 'DR. JAMSHID RASA',
  nav: ['خانه', 'ویدیوها', 'مشاوره', 'دربارهٔ داکتر رسا', 'تماس'],
  book: 'مشاوره بگیرید', bookLong: 'وقت مشاوره بگیرید', watch: 'دیدن ویدیوها',
  roles: 'روان‌شناس · آموزگار · سخنران انگیزشی', hope: 'امید به آینده',
  tagline: 'برای امید، دانش و آرامش روانی', heroTitle: ['برای امید، دانش و', 'آرامش روانی'],
  heroBody: 'ویدیوها، مشاوره‌ها و سیمینارهای سودمند دربارهٔ سلامت روان، خانواده، آموزش و رشد فردی را یکجا ببینید.',
  hello: 'خوش آمدید،', helloTitle: 'زندگی بهتر با یک گفت‌وگوی کوچک آغاز می‌شود.',
  helloBody: 'در مسیر یادگیری، رشد و آرامش، در کنار شما هستیم.', heroNote: 'بشنوید. بیاموزید. رشد کنید.', explore: 'از همین‌جا آغاز کنید',
  quote: 'هر روز تازه، فرصتی برای آغاز دوباره است.', quoteLabel: 'به سوی زندگی امیدوارانه', scroll: 'بیشتر ببینید',
  videoKicker: 'دانش برای زندگی بهتر', videosTitle: 'ویدیوها و درس‌ها', videosBody: 'ویدیوهای سودمند داکتر رسا دربارهٔ سلامت روان، خانواده، آموزش و زندگی.',
  filters: ['همه', 'سلامت روان', 'خانواده و روابط', 'آموزش و کانکور', 'رشد فردی و مالی'],
  videoTitles: ['[ویدیوی سلامت روان]', '[ویدیوی خانواده و روابط]', '[ویدیوی آموزش و کانکور]', '[ویدیوی رشد فردی]'], videoDescription: '[توضیح کوتاه ویدیو]', demo: 'نمونه', watchOne: 'ببینید', allVideos: 'همهٔ ویدیوها در یوتیوب',
  videoPending: 'این یک ویدیوی نمونه است. ویدیوی اصلی به‌زودی اضافه می‌شود.', close: 'بستن',
  pillarKicker: 'یک هدف، سه مسیر', pillarsTitle: 'سه بخش اصلی ما', pillarsIntro: 'با آموزش، کمک و راهنمایی، برای آینده‌ای روشن‌تر.',
  pillars: [
    {title:'لیسهٔ خصوصی', body:'آموزش باکیفیت برای شاگردان جوان کابل، به‌ویژه در ریاضی و علوم.',more:'[نام، آدرس و معلومات ثبت‌نام لیسه اینجا اضافه می‌شود.]'},
    {title:'بنیاد خیریه',body:'کمک به نیازمندان در بخش‌های صحت، آموزش و حمایت اجتماعی.',more:'[نام بنیاد، برنامه‌ها و معلومات کمک اینجا اضافه می‌شود.]'},
    {title:'مشاوره و سیمینارها',body:'مشاورهٔ فردی، راهنمایی خانواده و کارگاه‌های عمومی برای زندگی بهتر.',more:'[برنامهٔ مشاوره‌ها و سیمینارهای آینده اینجا اضافه می‌شود.]'}
  ], more:'بیشتر بخوانید',less:'کمتر بخوانید',
  bookingKicker:'حرف‌های شما، توجه ما',bookingTitle:'فضایی امن برای گفت‌وگو.',bookingBody:'نگرانی‌های شما مهم است. مشکل خود را با ما شریک کنید و وقت مشاوره بگیرید.',
  fields:{name:'نام کامل',phone:'شمارهٔ تلفن',topic:'موضوع مشاوره',message:'پیام کوتاه',email:'ایمیل',optional:'(اختیاری)'},namePlaceholder:'نام شما',phonePlaceholder:'+93 …',messagePlaceholder:'چگونه می‌توانیم کمک کنیم؟',select:'موضوع را انتخاب کنید',topics:['افسردگی','اضطراب و فشار','مشکلات خواب','خانواده و ازدواج','آموزش و کانکور','سایر'],
  send:'فرستادن پیام',privacy:'معلومات شما محفوظ و محرمانه می‌ماند.',error:'لطفاً تمام بخش‌های ضروری را درست تکمیل کنید.',demoNote:'این فورم آزمایشی است؛ معلومات فرستاده نمی‌شود.',success:'سپاس! فورم آزمایشی تکمیل شد. پیام فرستاده نشده و وقت مشاوره تعیین نشده است.',
  whatsapp:'تماس از طریق واتساپ',phonePending:'شمارهٔ تأییدشدهٔ واتساپ و تلفن به‌زودی اضافه می‌شود.',notice:'این وب‌سایت آموزشی است و جایگزین مراقبت مسلکی نیست. در صورت جدی بودن وضعیت، لطفاً با داکتر متخصص تماس بگیرید.',
  aboutKicker:'پشت این سفر',aboutTitle:'دربارهٔ داکتر جمشید رسا',about:['داکتر جمشید رسا روان‌شناس، آموزگار و سخنران انگیزشی شناخته‌شده در افغانستان است. او با جوانان، خانواده‌ها و شاگردان در زمینهٔ سلامت روان، آموزش و رشد فردی کار می‌کند.','او آموزگار متعهد ریاضی نیز است و به شاگردان بسیاری برای آمادگی امتحان کانکور کمک کرده است.'],story:'[داستان کوتاه شخصی او اینجا نوشته شود]',featured:'حضور در رسانه‌ها',
  contact:'تماس',contactKicker:'گفت‌وگو از اینجا آغاز می‌شود',contactTitle:'بیایید در تماس باشیم.',contactBody:'برای مشاوره، آموزش و همکاری، پیام خود را با ما شریک کنید.',addressLabel:'آدرس ما',address:'کابل، افغانستان، سرک دارالامان، کارته سه، کوچهٔ وزارت تجارت، خانهٔ شمارهٔ ۱۰',map:'دیدن روی نقشه',follow:'ما را دنبال کنید',socialsNote:'آدرس‌های شبکه‌های اجتماعی در انتظار تأیید است.',
  footerTitle:'برای آینده‌ای روشن‌تر، در کنار هم.',copyright:'© ۲۰۲۶ داکتر جمشید رسا. تمام حقوق محفوظ است.',home:'بازگشت به خانه',skip:'رفتن به محتوای اصلی',openMenu:'باز کردن منو',closeMenu:'بستن منو',portraitAlt:'داکتر جمشید رسا با لبخند و دست زیر چانه',portraitLabel:'آموزش · راهنمایی · امید',pageTitle:'داکتر جمشید رسا | روان‌شناس، آموزگار و سخنران انگیزشی'
};

const en = {
  lang:'en',dir:'ltr',name:'Dr. Jamshid Rasa',englishName:'DR. JAMSHID RASA',nav:['Home','Videos','Consultation','About','Contact'],book:'Get consultation',bookLong:'Book a consultation',watch:'Watch videos',roles:'Psychologist · Educator · Motivational Speaker',hope:'Hope for the future',tagline:'For hope, knowledge and mental well-being',heroTitle:['A little hope.', 'A brighter tomorrow.'],heroBody:'Helpful videos, consultations and seminars on mental health, family, education and personal growth. All in one place.',
  hello:'Welcome,',helloTitle:'A better life begins with a conversation.',helloBody:'Here with you, on your journey of learning, growth and well-being.',heroNote:'Listen. Learn. Grow.',explore:'Your next chapter starts here',quote:'Every new day is a chance to begin again.',quoteLabel:'Towards a hopeful life',scroll:'Discover more',videoKicker:'KNOWLEDGE FOR A BETTER LIFE',videosTitle:'A little learning. A lasting change.',videosBody:'Thoughtful lessons on the mind, relationships, education and everyday life.',filters:['All videos','Mental Health','Family & Relationships','Study & Kankor','Growth & Finance'],videoTitles:['[Mental health video]','[Family & relationships video]','[Study & Kankor video]','[Personal growth video]'],videoDescription:'[Short video description]',demo:'SAMPLE',watchOne:'Watch',allVideos:'Explore all videos on YouTube',videoPending:'This is a sample video card. The real video will be added here.',close:'Close',
  pillarKicker:'ONE PURPOSE. THREE PATHS.',pillarsTitle:'Helping people move forward.',pillarsIntro:'Through education, compassion and guidance, towards a brighter future.',pillars:[{title:'Private High School',body:'Quality education for young students in Kabul, especially in mathematics and science.',more:'[School name, address and enrollment information to be added.]'},{title:'Charity Foundation',body:'Supporting people in need through healthcare, education and community care.',more:'[Foundation name, programs and donation information to be added.]'},{title:'Counseling & Seminars',body:'Personal consultations, family guidance and public workshops for a better life.',more:'[Consultation availability and upcoming seminar details to be added.]'}],more:'Learn more',less:'Show less',
  bookingKicker:'YOUR WORDS. OUR ATTENTION.',bookingTitle:'A safe space to start talking.',bookingBody:'Your concerns matter. Share what is on your mind and take the first step towards a consultation.',fields:{name:'Full name',phone:'Phone number',topic:'Consultation topic',message:'Short message',email:'Email',optional:'(optional)'},namePlaceholder:'Your name',phonePlaceholder:'+93 …',messagePlaceholder:'How can we help you?',select:'Choose a topic',topics:['Depression','Anxiety & stress','Sleep problems','Family & marriage','Study & Kankor','Other'],send:'Send message',privacy:'Your information stays safe and private.',error:'Please complete all required fields correctly.',demoNote:'Prototype form. Information is not sent or stored.',success:'Thank you! You completed the demo form. No message was sent and no consultation has been booked.',whatsapp:'Contact on WhatsApp',phonePending:'A verified WhatsApp and phone number will be added soon.',notice:'The content on this site is educational and is not a substitute for professional care. If your condition is serious, please contact a specialist.',
  aboutKicker:'THE PERSON BEHIND THE PURPOSE',aboutTitle:'An educator at heart. A guide by your side.',about:['Dr. Jamshid Rasa is a well-known Afghan psychologist, educator and motivational speaker. He works with young people, families and students on mental health, education and personal growth.','A dedicated mathematics teacher, he has also helped many students prepare for the Kankor examination.'],story:'[His personal story will be added here]',featured:'FEATURED ON',contact:'Contact',contactKicker:'EVERY CONVERSATION STARTS SOMEWHERE',contactTitle:'Let’s start a conversation.',contactBody:'For consultations, learning and working together, share your message with us.',addressLabel:'FIND US',address:'House No. 10, Ministry of Commerce Street, Karte-e-Seh, Darulaman Road, Kabul, Afghanistan',map:'Open in Maps',follow:'FOLLOW ALONG',socialsNote:'Social handles are awaiting verification.',footerTitle:'A brighter future begins together.',copyright:'© 2026 Dr. Jamshid Rasa. All rights reserved.',home:'Back to home',skip:'Skip to content',openMenu:'Open menu',closeMenu:'Close menu',portraitAlt:'Dr. Jamshid Rasa smiling warmly with his hand under his chin',portraitLabel:'EDUCATION · GUIDANCE · HOPE',pageTitle:'Dr. Jamshid Rasa | Psychologist, Educator & Motivational Speaker'
};
export const translations = { ps, prs, en };
