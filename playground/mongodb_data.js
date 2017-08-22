// 
// users
db.users.insert({name: 'admin', email: 'admin@nodeblog.io', password: '12345'});

// categories
db.categories.insert({name: 'Javascript', slug: 'javascript', created: new Date()});
db.categories.insert({name: 'CSS', slug: 'css', created: new Date()});
db.categories.insert({name: 'HTML', slug: 'html', created: new Date()});
db.categories.insert({name: 'Tools', slug: 'tools', created: new Date()});


// posts
db.posts.insert({
    title: 'JavaScript資源大全中文版',
    content: '很多程序員應該記得 GitHub 上有一個 Awesome - XXX 系列的資源整理。 awesome-javascript 是 sorrycc 發起維護的 JS 資源列表，內容包括：包管理器、加載器、測試框架、運行器、QA、MVC框架和庫、模板引擎、數據可視化、時間軸、編輯器等等',
    category: ObjectId("599bebf8774645b4cded18ad"),
    author: ObjectId("599bea67774645b4cded18ac"),
    slug: 'first-post-in-javascript',
    published: true,
    meta: {favorites: 0},
    comments: [],
    created: new Date()
});

db.posts.insert({
    title: 'CSS入門筆記 － 初識CSS',
    content: 'CSS全稱為“層疊樣式表 (Cascading Style Sheets)”，它主要是用於定義HTML內容在瀏覽器內的顯示樣式，如文字大小、顏色、字體加粗等用於設置頁面的表現。 CSS3 並不是一個完整的獨立版本而是將不同的功能拆分成獨立模塊（例如，選擇器模塊，盒模型模塊），這有利於不同功能的及時更新與發布也利於瀏覽器廠商的實際使用。',
    category: ObjectId("599bec36774645b4cded18ae"),
    author: ObjectId("599bea67774645b4cded18ac"),
    slug: 'first-post-in-css',
    published: true,
    meta: {favorites: 0},
    comments: [],
    created: new Date()
});


db.posts.insert({
    title: '寫給技術小白的HTML初級教程',
    content: 'HTML的英文全稱是Hypertext Marked Language，中文叫做“超文本標記語言”。和一般文本的不同的是，一個HTML文件不僅包含文本內容，還包含一些Tag，中文稱“標記”。一個HTML文件的後綴名是.htm或者是.html。用文本編輯器就可以編寫HTML文件。',
    category: ObjectId("599bec38774645b4cded18af"),
    author: ObjectId("599bea67774645b4cded18ac"),
    slug: 'first-post-in-html',
    published: true,
    meta: {favorites: 0},
    comments: [],
    created: new Date()
});