var Pokemons = function () {
    let pokemons = [];
    let offset = 0;
    let limit = 20;
    let currentPage = 0;
    let isLoading = false;
    let isFirstPage = false;

    function getData(page) {
        isLoading = true;
        currentPage = page;
        m.request({
            method: "GET",
            url: `${API_URL}/pokemon?offset=${offset + (currentPage * limit)}&limit=${limit}`,
        })
            .then(function (data) {
                console.log(data);
                pokemons = data.results;
                isLoading = false;
                isFirst();
            })
    }

    function isFirst(){
        if(currentPage == 0) isFirstPage = true;
        else isFirstPage = false;
    }

    getData(currentPage);

    return {
        view: function () {
            return [
                m(Header),
                m('.content',
                    [
                        m('h2', { class: 'content-subhead' }, 'Pokemon List'),
                        m('button', { disabled: isFirstPage,class: 'pure-button', onclick: () => getData(currentPage - 1) }, 'prev'),
                        m('span', ' '),
                        m('span', `Page : ${currentPage+1}`),
                        m('span', ' '),
                        m('button', { class: 'pure-button', onclick: () => getData(currentPage + 1) }, 'next'),
                        isLoading ? m('p', 'Loading ...') :
                            m('ul',
                                pokemons.map(p => m('li', m('a', {href: `#!/pokemons-detail/${getPokemonIdFromUrl(p.url)}`}, p.name)))
                            )
                    ]
                )
            ]
        }
    }
}

function getPokemonIdFromUrl(url){
    return url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/','');
}