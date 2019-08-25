var PokemonDetail = function () {
    const pokemonId = m.route.param('id');
    let pokemonName = '';
    let pokemonAbilities = [];
    let pokemonHeight = '';
    let pokemonWeight = '';
    let pokemonTypes = [];
    let pokemonMoves = [];
    let pokemonStats = [];

    function getData() {
        isLoading = true;
        m.request({
            method: "GET",
            url: `${API_URL}/pokemon/${pokemonId}/`,
        })
            .then(function (data) {
                console.log(data);
                const {
                    name, 
                    abilities, 
                    height, 
                    weight,
                    types,
                    stats, 
                    moves
                } = data
                pokemonName = name;
                pokemonAbilities = abilities;
                pokemonHeight = height;
                pokemonWeight = weight;
                pokemonTypes = types;
                pokemonStats = stats;
                pokemonMoves = moves;
                isLoading = false;
                
            })
    }

    getData();

    return {
        view: function () {
            return [
                m(Header),
                m('.content',
                    [
                        m('h2', { class: 'content-subhead' }, `Pokemon Detail : ${pokemonName}`),
                        m('a', { class : 'pure-button', href:"#!/pokemons"}, 'Back to List'),
                        isLoading? m('p', 'Loading ...') :[
                            m('p', `Id : ${pokemonId}`),
                            m('p', `Name : ${pokemonName}`),
                            m('p', `Height : ${pokemonHeight}`),
                            m('p', `Weight : ${pokemonWeight}`),
                            m('p', [
                                m('span', 'Types :' ),
                                m('ul', 
                                    pokemonTypes.map(item => m('li', item.type.name))
                                )
                            ]),
                            m('p', [
                                m('span', 'Abilities :' ),
                                m('ul', 
                                    pokemonAbilities.map(item => m('li', item.ability.name))
                                )
                            ]),
                            m('p', [
                                m('span', 'Stats :' ),
                                m('ul', 
                                    pokemonStats.map(item => m('li', `${item.stat.name} : ${item.base_stat}`))
                                )
                            ]),
                            m('p', [
                                m('span', 'Moves :' ),
                                m('ul', 
                                    pokemonMoves.map(item => m('li', item.move.name))
                                )
                            ]),
                        ]
                    ]
                )
            ]
        }
    }
}