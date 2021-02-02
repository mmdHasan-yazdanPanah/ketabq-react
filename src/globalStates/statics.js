export const colors = {
    linkHover: 'hsl(217, 71%,  53%)',
    background: '#fcfcfc',
    background_dark: '#212121',
    primary: '#ffc107',
    white: '#ffffff',
    dark: '#000000',
};

const shortTitle = 'کتاب کیو';
export const pageTitles = {
    start: `شروع - ${shortTitle}`,
    login: `ورود یا ثبت نام – ${shortTitle}`,
    main: `دانلود رایگان کتاب صوتی با ${shortTitle}`,
    catagory: `ژانر و موضوعات در ${shortTitle}`,
    authorsPage: `نویسندگان در ${shortTitle}`,
    narratorsPage: `گویندگان در ${shortTitle}`,
    translatorsPage: `نویسندگان در ${shortTitle}`,
    publishersPage: `انتشارات در ${shortTitle}`,
    search: (searchTitle) => `دانلود کتاب صوتی ${searchTitle} - ${shortTitle}`,
    bookPage: (bookName) => `دانلود کتاب صوتی ${bookName} - ${shortTitle}`,
    hear: (bookName) => `شنیدن ${bookName} - ${shortTitle}`,
    commentPage: (bookName) =>
        `نظرات کابران درباره ${bookName} - ${shortTitle}`,
    myBooks: `کتاب های من – ${shortTitle}`,
    bookmark: `کتاب های نشان شده – ${shortTitle}`,
    buy: (bookName) => `خرید کتاب صوتی ${bookName} - ${shortTitle}`,
    buyPackage: (packName) =>
        `خرید پکیج کتاب های صوتی ${packName} - ${shortTitle}`,
    guidePage: `راهنما – ${shortTitle}`,
    guideItem: (title) => `${title} – ${shortTitle}`,
    profilePage: `ویرایش اطلاعات – ${shortTitle}`,
    myComments: `نظرات من – ${shortTitle}`,
    creditPage: `کیف پول – ${shortTitle}`,
    addCreditPage: `افزایش اعتبار – ${shortTitle}`,
    invite: `دعوت از دوستان – ${shortTitle}`,
    allPackages: `تمامی پکیج ها – ${shortTitle}`,
    noMatch: `404 – ${shortTitle}`,
};

export const rotesPath = {
    book: (bookId, ref) => {
        let res = '/product/book';
        if (bookId) {
            res += `/${bookId}`;
            if (ref) {
                res += `/${ref}`;
            }
        }
        return res;
    },

    search: (searchTitle, disableSort, fromGeneral) => {
        let res = '/search';
        if (searchTitle) {
            res += `/${searchTitle}`;
            if (disableSort) {
                res += `/true`;
            } else {
                res += `/false`;
            }
            if (fromGeneral) {
                res += `/true`;
            }
        }
        return res;
    },
};
