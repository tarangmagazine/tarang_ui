const strapiReadOnlyToken = '544ef18cfe22027276bd3f771bad300dc333fe23a4477efcb2f99f8248d54df23aa99ab8f4734ef7594e061dc892b161538fe11b749a421c472c57ed39a7d8600f7b5936d7db8a70e458795ceb7d5c66edd2a894b98d28c9681b7c252d01e86900b7ac148ac33001a7c35a2eb233000ead8fa8a97d4a766e1e72f17117ef86d3';
const numArticlesOnMainPage = 6;

const images = [
    { path: '/carousel/test1.jpeg', id: 'image1', init: 2, end: 1, anim: 'animate-zoom', initPos: 'object-left-top', endPos: 'object-right-bottom' },
    { path: '/carousel/test2.jpeg', id: 'image2', init: 1.5, end: 1, anim: 'animate-move', initPos: '0% 0%', endPos: '50% 50%' },
    { path: '/carousel/test3.jpeg', id: 'image3', init: 2, end: 1, anim: 'animate-zoom', initPos: 'object-left-top', endPos: 'object-right-bottom' },
    { path: '/carousel/test4.jpeg', id: 'image4', init: 1.2, end: 1, anim: 'animate-move', initPos: '0% 0%', endPos: '50% 50%' },
    { path: '/carousel/test5.jpeg', id: 'image5', init: 1.5, end: 1, anim: 'animate-zoom', initPos: 'object-left-top', endPos: 'object-right-bottom' },
    { path: '/carousel/test2.jpeg', id: 'image2', init: 1.5, end: 1, anim: 'animate-move', initPos: '0% 0%', endPos: '50% 50%' },
];


async function getMainEdition() {
    const response = await fetch(
        'http://127.0.0.1:1337/api/editions?filters[is_latest][$eq]=true',
        {
            headers: { Authorization: `Bearer ${strapiReadOnlyToken}` }
        }
    );
    return await response.json();
}

async function getMainPageArticles() {
    const response = await fetch(
        'http://127.0.0.1:1337/api/articles?filters[ShouldPromote][$eq]=true',
        {
            headers: { Authorization: `Bearer ${strapiReadOnlyToken}` }
        }
    );
    const responseJson = await response.json();
    const result = responseJson['data'].slice(0, numArticlesOnMainPage);
    return result;
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const mainEditionJson = await getMainEdition();
    const mainPageArticles = getMainPageArticles();
    return {
        /* article: responseJson['data']['attributes']*/
        release_date: mainEditionJson['data'][0]['attributes']['release_date'],
        edition_id: mainEditionJson['data'][0]['attributes']['edition_id'],
        issuu_link: mainEditionJson['data'][0]['attributes']['issuu_link'],
        articles: mainPageArticles,
        images: images,
    };
}